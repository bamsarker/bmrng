import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset, bgAsset, boomerang}) {
        super(game, x, y, asset)

        this.bg = new Phaser.Sprite(game, x, y, bgAsset)
        this.bg.anchor.setTo(0.5,1)

        this.origin = y;

        this.anchor.setTo(0.5,0.5)
        this.scale.y = 2

        this.throwKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.power = -1.5;
        this.sPower = 1 + Math.sin(this.power);

        this.boomerang = boomerang;
    }

    powerUp () {
        this.power += 5 / 60;
        this.sPower = 1 + Math.sin(this.power);
    }

    update() {
        this.position.y = this.origin - this.sPower * 128;

        if (this.throwKey.isDown) {
            this.powerUp();
            game.input.keyboard.onUpCallback = function (e) {
                if (e.keyCode === Phaser.Keyboard.SPACEBAR) {
                    this.boomerang.launch(this.sPower);
                    this.power = -1.5;
                }
            }.bind(this);
        }
    }
}
