import Phaser from 'phaser'
import Pointer from '../sprites/edgePointer'

let playerOffset = {
    x: 10,
    y: -10
}

let launchId = 0

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset, player}) {
        super(game, x, y, asset)
        this.anchor.setTo(0.5)
        this.player = player;
        this.state = 'inHand'
        game.physics.arcade.enable(this)

        this.bmd = game.add.bitmapData(800, 600);
        this.bmd.context.fillStyle = '#98E2C6';
        this.bg = game.add.sprite(0, 0, this.bmd);

        this.pointer = new Pointer({game: game, target: this, color: this.tint})
        game.add.existing(this.pointer)

    }

    launch(power) {
        if (this.state !== 'inHand') return;
        this.collisionCheck = function () {
        }
        this.state = 'flying'

        launchId++

        game.score.setLaunchId(launchId)

        this.bmd.cls()

        if (this.tween == undefined)
            this.tween = {}

        this.prevPos = {x:this.position.x, y: this.position.y};

        this.tween.x = game.add.tween(this.body.velocity);

        let xTime = 2100 * power;
        let xTarget = 790 * power;
        this.body.velocity.x = xTarget;
        this.tween.x.to({x: 0}, xTime / 4, 'Linear');
        this.tween.x.to({x: -xTarget}, xTime / 4, 'Linear');
        this.tween.x.to({x: 0}, xTime / 4, 'Linear');
        this.tween.x.to({x: xTarget}, xTime / 4, 'Linear');
        this.tween.x.to({x: 0}, xTime / 4);

        this.tween.x.start();

        this.tween.x.onComplete.add(function(){
            this.state = 'onFloor'

            this.collisionCheck = function () {
                if (this.game.checkOverlap(this, this.player)) {
                    this.putInHand();
                }
            }
        }, this)


        this.tween.y = game.add.tween(this.body.velocity);

        let yTime = 2000 * power;
        let yTarget = -800 * power;
        this.body.velocity.y = yTarget
        this.tween.y.to({y: 0}, yTime / 2, 'Linear');
        this.tween.y.to({y: -yTarget}, yTime / 2, 'Linear');
        this.tween.y.to({y: 0}, yTime / 4);

        this.tween.y.start();
    }

    putInHand() {
        this.state = 'inHand';
        this.tween.x.stop();
        this.tween.y.stop();
    }

    extendTrail() {
        //this.bmd.context.strokeStyle = 'rgba(0,' + Math.floor((this.tween.x.timeline.reduce(function(total,td){ return total + td.percent },0) / this.tween.x.timeline.length) * 255) + ',' + (255 - Math.floor((this.tween.y.timeline.reduce(function(total,td){ return total + td.percent },0) / this.tween.y.timeline.length) * 255)) + ', 0.25)'
        this.bmd.context.strokeStyle = 'rgba(100,100,100,0.1)'
        this.bmd.context.lineWidth = 3
        this.bmd.context.lineJoin = 'round'
        this.bmd.context.beginPath()
        this.bmd.context.moveTo(this.position.x,this.position.y)
        this.bmd.context.lineTo(this.prevPos.x,this.prevPos.y)
        this.bmd.context.stroke()
        this.bmd.dirty = true
    }

    update() {
        if (this.state === 'inHand') {
            this.position.x = this.player.position.x + playerOffset.x
            this.position.y = this.player.position.y + playerOffset.y
        } else if (this.state === 'flying') {
            this.angle -= 50
            this.extendTrail()
            this.prevPos = {x:this.position.x, y: this.position.y};
            this.collisionCheck()

            if (!this.game.checkOverlap(this, this.player)) {
                this.collisionCheck = function () {
                    if (this.game.checkOverlap(this, this.player)) {
                        this.putInHand();
                    }
                }
            }
            if (this.position.y > game.height + 32) {
                this.putInHand();
            }
        } else if (this.state === 'onFloor') {
            if (this.position.x > game.width || this.position.x < 0)
                this.putInHand()
            else
                this.collisionCheck()
        }
    }
}
