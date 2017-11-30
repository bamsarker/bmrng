/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Meter from '../sprites/Meter'
import Boomerang from '../sprites/Boomerang'
import Score from '../sprites/Score'
import EndGame from '../sprites/EndGame'
import Button from '../sprites/Button'
import LevelManager from '../sprites/LevelManager'
import ControlsUI from '../sprites/ControlsUI'

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

        this.game.gameOver = function(type) {
            if (!this.game.endMessage) {

                this.player.gameOver = true;
                this.game.score.gameOver = true;

                this.game.endMessage = new EndGame({
                    game: this.game,
                    x: this.world.centerX,
                    y: this.world.centerY,
                    type: type
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
        }.bind(this);

        this.game.delay = (delay) => {
            return new Promise((resolve) => {
                this.game.time.events.add(delay, resolve);
            })
        };

        this.levelManager.createLevel()
        this.levelManager.activateLevel()
    }

    addGameElements() {
        this.player = new Player({
            game: this.game,
            x: this.world.centerX,
            y: this.game.height - 50,
            asset: 'player'
        })
        this.controlsUI = new ControlsUI({
            game: this.game,
            player: this.player
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
            boomerang: this.boomerang,
            player: this.player
        })
        this.game.score = new Score({
            game: this.game,
            x: 10,
            y: 10
        })

        this.levelManager = new LevelManager({
            game: this.game,
            boomerang: this.boomerang
        });

        this.game.add.existing(this.player)
        this.game.add.existing(this.boomerang)
        this.game.add.existing(this.meter)
        this.game.add.existing(this.controlsUI)
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
