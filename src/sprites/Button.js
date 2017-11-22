import Phaser from 'phaser'

export default class extends Phaser.Button {
    constructor({game, x, y, asset, callback}) {
        super(game, x, y, asset, callback)
        this.anchor.setTo(0.5)
    }

    update() {

    }
}
