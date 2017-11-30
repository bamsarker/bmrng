import Phaser from "phaser-ce/build/custom/phaser-split";

const typeTexts = {
        boomerang:  'You lost your boomerang!',
        mole: 'Don\'t kill pandas.'
    },
    stdText = '\nBetter luck next time.';
let endGameText = '';

export default class {
    constructor({game, x, y, type}) {

        endGameText = typeTexts[type] + stdText;

        this.create(x, y)

    }

    create(x, y) {
        this.text = game.add.text(x, y, endGameText)
        this.text.font = 'Fugaz One'
        this.text.fontSize = 40
        this.text.align = 'center'
        this.text.fill = '#babb9d'
        this.text.smoothed = false
        this.text.anchor.setTo(0.5)
        this.throwKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.throwKey.onDown.add((e)=>{ window.location = window.location })
    }

    kill() {
        this.text.kill()
    }
}
