import Phaser from 'phaser'

const buttonOffset = 64,
    createButton = (game, player, offsetX, offsetY, asset) => {
        let button = new Phaser.Sprite(game, player.position.x + offsetX, player.position.y + offsetY, asset)
        button.updatePosition = ()=>{
            button.position.x = player.position.x + offsetX
            button.position.y = player.position.y + offsetY
        }
        return button;
    }

export default class extends Phaser.Sprite {
    constructor({game, player}) {
        super(game, player.position.x, player.position.y, null)

        this.leftArrow = createButton(game, player, -buttonOffset, 0, 'arrowButton')
        this.rightArrow = createButton(game, player, buttonOffset, 0, 'arrowButton')
        this.boomerButton = createButton(game, player, 0, -buttonOffset, 'boomerButton')

        this.leftArrow.anchor.setTo(0.5)
        this.leftArrow.scale.setTo(-1, 1)
        this.rightArrow.anchor.setTo(0.5)
        this.boomerButton.anchor.setTo(0.5)

        this.addChild(this.leftArrow)
        this.addChild(this.rightArrow)
        this.addChild(this.boomerButton)

        game.add.existing(this.leftArrow)
        game.add.existing(this.rightArrow)
        game.add.existing(this.boomerButton)

        this.throwKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.throwKey.onUp.add(function(e){
            if (e.keyCode === this.throwKey.keyCode) {
                this.leftArrow.visible =
                    this.rightArrow.visible =
                        this.boomerButton.visible = false
            }
        }.bind(this))
    }

    update() {
        if (!this.leftArrow.visible) return;
        this.leftArrow.updatePosition()
        this.rightArrow.updatePosition()
        this.boomerButton.updatePosition()
    }
}
