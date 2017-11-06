import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({game, target, color}) {
        super(game, 0, 0, 'edgePointer')
        this.anchor.setTo(0.5)
        this.target = target
        this.game = game
        this.alpha = 0
        this.tint = color || 0xffffff
    }

    targetIsOffScreen() {
        return this.target.position.x < 0 ||
                this.target.position.x > this.game.width ||
                this.target.position.y > this.game.height ||
                this.target.position.y < 0
    }

    setPosition() {
        this.position.x = Phaser.Math.clamp(this.target.position.x, this.width, this.game.width - this.width)
        this.position.y = Phaser.Math.clamp(this.target.position.y, this.height, this.game.height - this.height)
    }

    setRotation() {
        this.rotation = this.game.physics.arcade.angleBetween(this, this.target)
    }

    update() {
        if (this.targetIsOffScreen()) {
            this.alpha = 1
            this.setPosition()
            this.setRotation()
        } else {
            this.alpha = 0
        }
    }
}
