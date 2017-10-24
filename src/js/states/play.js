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
import {
  name as spikeImageName,
  path as spikeImagePath
} from '../assets/images/spike';
import {
  name as blocksSpritesheetName,
  path as blocksSpritesheet,
  width as blocksSpritesheetWidth,
  height as blocksSpritesheetHeight
} from '../assets/spritesheets/blocks';

class PlayState extends Phaser.State {
  preload() {
    this.level = Level.load('/some/fake/level/path');

    // TODO: Probably some sort of assets pack would be useful here
    this.game.load.image(characterImageName, characterImagePath);
    this.game.load.image(flagImageName, flagImagePath);
    this.game.load.image(spikeImageName, spikeImagePath);
    this.game.load.spritesheet(
      blocksSpritesheetName,
      blocksSpritesheet,
      blocksSpritesheetHeight,
      blocksSpritesheetWidth
    );
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

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    // TODO: Think about the best way to store the data for the different
    // block types, sprites to use for each, positioning (e.g. pixel vs
    // index in a grid of a fixed size), etc
    this.level.blocks.forEach(blockData => {
      const groundBlock = this.platforms.create(
        blockData.x * blocksSpritesheetHeight,
        this.game.world.height - blocksSpritesheetHeight * (blockData.y + 1),
        blocksSpritesheetName,
        blockData.frame
      );

      groundBlock.body.immovable = true;
    });

    this.perils = this.game.add.group();
    this.perils.enableBody = true;

    this.level.spikes.forEach(spikeData => {
      const spikeBlock = this.perils.create(
        spikeData.x * blocksSpritesheetHeight,
        this.game.world.height - blocksSpritesheetHeight * (spikeData.y + 1),
        spikeImageName
      );

      spikeBlock.body.immovable = true;
    });

    this.game.physics.enable(this.player);
    this.game.physics.enable(this.flag);

    this.player.body.gravity.y = config.gravity;
    this.player.body.collideWorldBounds = true;
  }

  update() {
    this.player.body.velocity.x = 0;

    this.game.physics.arcade.overlap(
      this.player,
      this.perils,
      player => player.kill(),
      null,
      this
    );

    this.game.physics.arcade.collide(this.player, this.platforms);

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -config.playerSpeed;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = config.playerSpeed;
    }

    if (
      this.cursors.up.isDown &&
      (this.player.body.onFloor() || this.player.body.touching.down)
    ) {
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
    this.flag.kill();
  }
}

export default PlayState;
