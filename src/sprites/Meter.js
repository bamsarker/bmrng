import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset, bgAsset, boomerang, player}) {
        super(game, x, y, asset)

        this.anchor.setTo(0.5)
        this.scale.setTo(5, 3)
        this.tint = 0xbbbbbb
        this.alpha = 0;

        this.throwKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);

        this.maxPower = 3;
        this.power = this.maxPower / 2;
        this.sPower = Math.abs((this.power % 4) - 2);

        this.boomerang = boomerang;
        this.player = player;
        this.chargeSound = game.add.audio('chargeMeter')
        this.chargePlayed = false
    }

    powerUp () {
        this.power += 1 / 60;
        this.sPower = Math.abs((this.power % this.maxPower) - (this.maxPower / 2));
    }

    update() {
        if (this.throwKey.isDown) {
            if (!this.chargePlayed) {
                this.chargeSound.play()
                this.chargePlayed = true
            }
            this.powerUp();
            this.alpha = 1;
            this.position.y = this.player.position.y - (1 + (this.sPower * this.sPower) * 410)
            this.position.x = this.player.position.x
            game.input.keyboard.onUpCallback = function (e) {
                if (e.keyCode === this.throwKey.keyCode) {
                    this.chargePlayed = false
                    this.chargeSound.pause()
                    game.add.tween(this).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
                    this.boomerang.launch(this.sPower);
                    this.power = this.maxPower / 2;
                }
            }.bind(this);
        }
    }
}
