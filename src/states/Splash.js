import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mole', 'assets/images/mole.png')
    this.load.image('moleWarn', 'assets/images/moleWarn.png')
    this.load.image('target', 'assets/images/target.png')
    this.load.image('meter', 'assets/images/meter.png')
    this.load.image('squareButton', 'assets/images/squareButton.png')
    this.load.image('targetParticle', 'assets/images/targetParticle.png')
    this.load.image('meterBG', 'assets/images/meterBG.png')
    this.load.image('boomerang', 'assets/images/boomerang.png')
    this.load.image('edgePointer', 'assets/images/edgePointer.png')
    this.load.image('player', 'assets/images/player.png');

    [
        'catchBoomerang',
        'chargeMeter',
        'spin',
        'targetHit',
        'launch',
        'count',
        'levelComplete'
        ].map(function(soundName){
        this.load.audio(soundName, 'assets/audio/'+soundName+'.wav');
    }, this)
  }

  create () {
    this.state.start('Game')
  }
}
