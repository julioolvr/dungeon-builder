import config from '../config.json';
import Level from '../models/Level';
import {
  name as characterImageName,
  path as characterImagePath
} from '../assets/images/character';
import {
  name as flagImageName,
  path as flagImagePath
} from '../assets/images/flag';

class PlayState extends Phaser.State {
  preload() {
    this.level = Level.load('/some/fake/level/path');

    // TODO: Probably some sort of assets pack would be useful here
    this.game.load.image(characterImageName, characterImagePath);
    this.game.load.image(flagImageName, flagImagePath);
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.flag = this.game.add.sprite(
      this.level.flagPosition.x,
      this.level.flagPosition.y,
      flagImageName
    );

    this.player = this.game.add.sprite(
      this.level.playerPosition.x,
      this.level.playerPosition.y,
      characterImageName
    );

    this.game.physics.enable(this.player);
    this.game.physics.enable(this.flag);

    this.player.body.gravity.y = config.gravity;
    this.player.body.collideWorldBounds = true;
  }

  update() {
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -config.playerSpeed;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = config.playerSpeed;
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.body.velocity.y = -config.playerJumpVelocity;
    }

    this.game.physics.arcade.overlap(
      this.player,
      this.flag,
      this.finishLevel,
      null,
      this
    );
  }

  finishLevel() {
    console.log('Finished!');
    this.flag.kill();
  }
}

export default PlayState;
