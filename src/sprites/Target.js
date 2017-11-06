import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({game, x, y, boomerang}) {
        super(game, x, y, 'target')
        this.anchor.setTo(0.5,1)
        this.boomerang = boomerang
        this.angle = -90

        this.scale.x = 0
        this.active = true

        this.emitter = game.add.emitter(0,0, 100);
        this.emitter.makeParticles('targetParticle')
        this.emitter.gravity = 400
        let spd = 200
        this.emitter.minParticleSpeed.setTo(-spd, -spd)
        this.emitter.maxParticleSpeed.setTo(spd, spd)
    }

    enter() {
        let self = this
        return new Promise(function(resolve){
            let dur = 250
            self.scaleTween = game.add.tween(self.scale)
            self.scaleTween.to({x: 1}, dur * 0.5)
            self.angleTween = game.add.tween(self)
            self.angleTween.to({angle: 0}, dur, 'Back.easeOut')

            self.angleTween.onComplete.add(resolve)

            self.scaleTween.start()
            self.angleTween.start()
        })
    }

    exit() {
        let self = this
        return new Promise(function(resolve){
            let dur = 250
            self.scaleTween = game.add.tween(self.scale)
            self.scaleTween.to({x: 0}, dur * 0.5, null, true, dur * 0.5)
            self.angleTween = game.add.tween(self)
            self.angleTween.to({angle: -90}, dur, 'Back.easeIn')

            self.angleTween.onComplete.add(resolve)

            self.scaleTween.start()
            self.angleTween.start()
        })
    }

    moveTo(pos) {
        this.position.x = pos.x
        this.position.y = pos.y
    }

    getRandomPosition() {
        let padding = 32
        return {
            x: game.rnd.integerInRange(padding, game.width - padding),
            y: game.rnd.integerInRange(padding, game.height - padding - (game.height / 4))
        }
    }

    emit() {
        this.emitter.x = this.position.x
        this.emitter.y = this.position.y - 20
        this.emitter.start(true, 350, null, 5)
    }

    update() {
        if (game.checkOverlap(this, this.boomerang) && this.boomerang.state === 'flying' && this.active) {
            this.active = false

            this.emit()

            this.exit()
                .then(function(){
                    this.moveTo(this.getRandomPosition())
                    return this.enter()
                }.bind(this))
                .then(function(){
                    this.active = true
                }.bind(this))
        }
    }
}
