/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Meter from '../sprites/Meter'
import Boomerang from '../sprites/Boomerang'
import Target from '../sprites/Target'
import Score from '../sprites/Score'
import Mole from '../sprites/Mole'
import EndGame from '../sprites/EndGame'
import Button from '../sprites/Button'

export default class extends Phaser.State {
    init() {
    }

    preload() {
    }

    create() {
        const bannerText = 'bmrng'
        let banner = this.add.text(this.world.centerX, this.world.centerY, bannerText)
        banner.font = 'Fugaz One'
        banner.padding.set(10, 16)
        banner.fontSize = 190
        banner.fill = '#e7e8c4'
        banner.smoothed = false
        banner.anchor.setTo(0.5)

        this.game.cursors = this.game.input.keyboard.createCursorKeys()

        this.addGameElements()

        this.game.gameOver = function() {
            if (!this.game.endMessage) {
                this.game.endMessage = new EndGame({
                    game: this.game,
                    x: this.world.centerX,
                    y: this.world.centerY
                })

                this.restartButton = new Button({
                    game: this.game,
                    x: this.world.centerX,
                    y: this.world.height * 0.75,
                    asset: 'squareButton',
                    callback: this.game.reset
                });
                this.game.add.existing(this.restartButton);
            }
        }.bind(this)

        this.game.reset = function() {
            window.location = window.location;
        }.bind(this)

        this.game.checkOverlap = function(spriteA, spriteB) {

            let boundsA = spriteA.getBounds();
            let boundsB = spriteB.getBounds();

            return Phaser.Rectangle.intersects(boundsA, boundsB);
        }

        this.game.getRandomTargetPosition = function() {
            let padding = 32
            return {
                x: this.game.rnd.integerInRange(padding, this.game.width - padding),
                y: this.game.rnd.integerInRange(padding, this.game.height - padding - (this.game.height / 4))
            }
        }.bind(this)
    }

    removeGameElements() {
        [
            this.player,
            this.boomerang,
            this.meter,
            this.game.score,
            this.mole,
            this.restartButton,
            this.game.endMessage
        ].concat(this.targets)
            .filter(element => { return !!element } )
            .map(element => { element.kill(true) })
    }

    addGameElements() {
        this.player = new Player({
            game: this.game,
            x: this.world.centerX,
            y: this.game.height - 50,
            asset: 'player'
        })
        this.boomerang = new Boomerang({
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY,
            asset: 'boomerang',
            player: this.player
        })
        this.meter = new Meter({
            game: this.game,
            x: 10,
            y: this.game.height - 2,
            asset: 'meter',
            bgAsset: 'meterBG',
            boomerang: this.boomerang
        })
        this.game.score = new Score({
            game: this.game,
            x: 10,
            y: 10
        })
        this.mole = new Mole({
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY,
            boomerang: this.boomerang
        })

        this.targets = Phaser.ArrayUtils.numberArray(0,2)
            .map((i) => {
                let target = new Target({
                    game: this.game,
                    x: this.game.width / 4 * (i + 1),
                    y: this.game.height / 4,
                    boomerang: this.boomerang
                })

                this.game.add.existing(target)


                this.game.time.events.add(500, function(){ target.enter() }, this)
            }, this)

        this.game.add.existing(this.player)
        this.game.add.existing(this.boomerang)
        this.game.add.existing(this.meter.bg)
        this.game.add.existing(this.meter)
        this.game.add.existing(this.mole)
    }

    update() {
        this.game.score.update()
    }

    render() {
        if (__DEV__) {
            //this.game.debug.spriteInfo(this.player, 32, 32)
        }
    }
}
