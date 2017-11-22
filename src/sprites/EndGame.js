const endGameText = 'You lost your boomerang!\nBetter luck next time.'

export default class {
    constructor({game, x, y}) {

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
    }

    update() {

    }

    kill() {
        this.text.kill()
    }
}
