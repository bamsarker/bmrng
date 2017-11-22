import Message from './Message'

const scoreLabel = 'Score: '
const amounts = {
    target: 20,
    mole: 50
}
let launchId;
let prevLaunchId;
let collected = 0;
let score = 0;
let scoreDisplay = 0;

export default class {
    constructor({game, x, y}) {

        this.create(x, y)
    }

    create(x, y) {
        this.text = game.add.text(x, y, scoreLabel + score)
        this.text.font = 'Fugaz One'
        this.text.fontSize = 30
        this.text.fill = '#babb9d'
        this.text.smoothed = false
    }

    createMessage(pos, type) {
        new Message({
            game: this.game,
            x: pos.x,
            y: pos.y,
            level: collected - 1,
            type: type
        })
    }

    add(type, pos) {
        collected++
        score += amounts[type] * ((launchId === prevLaunchId) ? collected : 1)
        prevLaunchId = launchId

        if (!!pos)
            this.createMessage(pos, type)
    }

    setLaunchId(_id) {
        launchId = _id
        collected = 0
    }

    update() {
        if (scoreDisplay < score) {
            scoreDisplay++;

            this.text.setText(scoreLabel + scoreDisplay);
        }
    }

    kill() {
        this.text.kill(true)
    }
}
