import Phaser from 'phaser'

let jumping = false

export default class extends Phaser.Sprite {
    constructor({game, x, y, boomerang}) {
        super(game, x, y, 'moleWarn')
        this.anchor.setTo(0.5, 1)
        this.scale.y = 0
        this.visible = false

        this.boomerang = boomerang

        this.mole = new Phaser.Sprite(game, x, y + 16, 'mole')
        this.mole.anchor.setTo(0.5, 1)
        this.mole.visible = false
        game.add.existing(this.mole)

        this.squareMask = new Phaser.Graphics(game, 0, 0);
        this.squareMask.beginFill(0xffffff)
        this.squareMask.drawRect(x - 16, y - 64, 32, 64)
        this.squareMask.endFill()
        game.add.existing(this.squareMask)

        this.mole.mask = this.squareMask;

        this.emitter = game.add.emitter(0,0, 100);
        this.emitter.makeParticles('targetParticle')
        this.emitter.tint = 0xFF0000;
        this.emitter.gravity = 400
        let spd = 200
        this.emitter.minParticleSpeed.setTo(-spd, -spd)
        this.emitter.maxParticleSpeed.setTo(spd, spd)

        this.moveTo(game.getRandomTargetPosition())
        this.wait()
    }

    warn() {
        let self = this
        self.visible = true
        return new Promise(function(resolve){
            let dur = 2000
            self.scaleTween = game.add.tween(self.scale)
            self.scaleTween.to({y: 1}, dur * 0.25, 'Back.easeOut')
            self.scaleTween.to({y: 1}, dur * 0.75)
            self.scaleTween.to({y: 0}, 1)
            self.scaleTween.onComplete.add(resolve)
            self.scaleTween.start()
        })
    }

    jump() {
        let self = this
        let originY = this.position.y
        self.visible = false
        self.mole.visible = true
        jumping = true
        return new Promise(function(resolve){
            let dur = 2000
            self.jumpTween = game.add.tween(self.mole.position)
            self.jumpTween.to({y: originY - 32}, dur * 0.5, Phaser.Easing.Quintic.Out)
            self.jumpTween.to({y: originY + 16}, dur * 0.5, Phaser.Easing.Quintic.In)
            self.jumpTween.onComplete.add(resolve)
            self.jumpTween.start()
        }).then(function(){
            self.mole.visible = false
            jumping = false
        })
    }

    activate() {
        return this.warn()
            .then(function(){
                return this.jump()
            }.bind(this))
    }

    moveTo(pos) {
        this.position.x = pos.x
        this.position.y = pos.y

        this.squareMask.clear()
        this.squareMask.beginFill(0xffffff)
        this.squareMask.drawRect(pos.x - 16, pos.y - 64, 32, 64)
        this.squareMask.endFill()

        this.mole.position.x = pos.x
        this.mole.position.y = pos.y + 16
    }

    wait() {
        game.time.events.add((Math.random() * 1500) + 1500, function(){
            this.activate()
                .then(function(){

                    this.moveTo(game.getRandomTargetPosition())

                    this.wait()

                }.bind(this))
        }, this)
    }

    emit() {
        this.emitter.x = this.position.x
        this.emitter.y = this.position.y - 20
        this.emitter.start(true, 1000, null, 50)

        this.emitter.setAll('tint', this.emitter.tint);
    }

    update() {
        if (jumping && game.checkOverlap(this.mole, this.boomerang)) {
            this.emit()
            game.score.add('mole', this.position)
            jumping = false
            this.mole.visible = false
            game.gameOver('mole')
        }
    }
}
