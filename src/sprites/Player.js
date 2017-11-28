import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset}) {
        super(game, x, y, asset)
        this.anchor.setTo(0.5)
        this.tint = 0xC4B7CB
        game.physics.arcade.enable(this)
        this.body.collideWorldBounds = true
        this.body.gravity.y = 0
        this.moveSpeed = 200
    }

    update() {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (this.gameOver) return;

        if (game.cursors.left.isDown)
        {
            this.body.velocity.x = -this.moveSpeed;
        }
        else if (game.cursors.right.isDown)
        {
            this.body.velocity.x = this.moveSpeed;
        }

        // if (game.cursors.up.isDown)
        // {
        //     this.body.velocity.y = -this.moveSpeed;
        // } else if (game.cursors.down.isDown)
        // {
        //     this.body.velocity.y = this.moveSpeed;
        // }
    }
}
