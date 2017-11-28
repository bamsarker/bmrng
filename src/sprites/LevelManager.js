import Phaser from 'phaser'
import Target from '../sprites/Target'
import Mole from '../sprites/Mole'
let level = 0,
    targetsPerLevel = 1,
    molesPerLevel = 1 / 2,
    targets = [],
    moles = [];

export default class {
    constructor({game, boomerang}) {

        this.game = game;
        this.boomerang = boomerang;
        this.completeSound = game.add.audio('levelComplete')

        //this.createLevel();
        //this.activateLevel();
    }

    activateLevel() {
        Promise.all(
            targets
                .map(function(obstacle, i) {
                    return obstacle.activate()
                })
        ).then(function() {
            this.completeSound.play()
            return this.game.delay(1000)
        }.bind(this)).then(function() {
            this.createLevel()
            this.activateLevel()
        }.bind(this))
    }

    createTarget() {
        let target = new Target({
            game: this.game,
            x: this.game.width / 2,
            y: this.game.height / 2,
            boomerang: this.boomerang
        })

        this.game.add.existing(target)
        return target;
    }

    createMole() {
        let mole = new Mole({
            game: this.game,
            x: this.game.width / 2,
            y: this.game.height / 2,
            boomerang: this.boomerang
        })

        this.game.add.existing(mole)
        return mole;
    }

    createLevel() {

        level++;

        let numberOfTargets = level * targetsPerLevel;

        if (numberOfTargets > 0) {
            while (targets.length < numberOfTargets) {
                targets.push(
                    this.createTarget()
                );
            }
        }

        let numberOfMoles = Math.floor(level * molesPerLevel);

        if (numberOfMoles > 0) {
            while(moles.length < numberOfMoles) {
                moles.push(
                    this.createMole()
                );
            }
        }
    }

    update() {

    }

}
