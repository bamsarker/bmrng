/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Meter from '../sprites/Meter'
import Boomerang from '../sprites/Boomerang'
import Target from '../sprites/Target'

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

        this.targets = Phaser.ArrayUtils.numberArray(0,2)
            .map(function(i){
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


        this.game.checkOverlap = function(spriteA, spriteB) {

            let boundsA = spriteA.getBounds();
            let boundsB = spriteB.getBounds();

            return Phaser.Rectangle.intersects(boundsA, boundsB);

        }
    }

    render() {
        if (__DEV__) {
            //this.game.debug.spriteInfo(this.player, 32, 32)
        }
    }
}
