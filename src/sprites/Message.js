const messages = [
    'nice',
    'combo',
    'and\nagain',
    'there\'s\nmore',
    'YES',
    'YASSSS',
    'BIG\nCOMBO'
],
    pandaMessages = ['oops!','dead\npanda',':('],
    getMessage = function(level, type) {
        if (type === 'mole')
            return (level === 0) ? Phaser.ArrayUtils.getRandomItem(pandaMessages) : `x${level + 1}\n${Phaser.ArrayUtils.getRandomItem(pandaMessages)}`
        if (level >= messages.length)
            level = messages.length - 1;
        return (level === 0) ? messages[level] : `x${level + 1}\n${messages[level]}`;
    }

export default class {
    constructor({game, x, y, level, type}) {
        this.create(x, y, getMessage(level, type))
    }

    create(x, y, message) {
        this.text = game.add.text(x, y, message)
        this.text.font = 'Fugaz One'
        this.text.fontSize = 70
        this.text.fill = '#babb9d'
        this.text.smoothed = false
        this.text.anchor.setTo(0.5)
        this.text.align = 'center'
        this.text.lineSpacing = -50
        this.text.scale = {x: 0, y: 0};
        this.scaleTween = game.add.tween(this.text.scale)
        this.scaleTween.to({x: 1, y: 1}, 150, 'Back.easeOut')
        this.scaleTween.to({x: 1, y: 1}, 150, 'Back.easeOut')
        this.scaleTween.to({x: 0, y: 0}, 250, 'Back.easeIn')
        this.scaleTween.start();
    }

    update() {

    }
}
