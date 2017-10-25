// @flow

import config from '../config.json';
import Level from '../models/Level';
import LevelLoader from '../models/LevelLoader';
import {
  name as spikeImageName,
  path as spikeImagePath
} from '../assets/images/spike';
import {
  name as blocksSpritesheetName,
  path as blocksSpritesheet
} from '../assets/spritesheets/blocks';

class PlayState extends Phaser.State {
  level: Level;

  preload() {
    this.level = LevelLoader.load('/some/fake/level/path');

    // TODO: Probably some sort of assets pack would be useful here
    this.game.load.image(
      this.level.getPlayer().getImageName(),
      this.level.getPlayer().getImagePath()
    );
    this.game.load.image(
      this.level.getGoal().getImageName(),
      this.level.getGoal().getImagePath()
    );
    this.game.load.image(spikeImageName, spikeImagePath);
    this.game.load.spritesheet(
      blocksSpritesheetName,
      blocksSpritesheet,
      Level.GRID_SIZE,
      Level.GRID_SIZE
    );
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.flag = this.game.add.sprite(
      this.level.getGoal().position.x,
      this.level.getGoal().position.y,
      this.level.getGoal().getImageName()
    );

    this.player = this.game.add.sprite(
      this.level.getPlayer().position.x,
      this.level.getPlayer().position.y,
      this.level.getPlayer().getImageName()
    );

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.perils = this.game.add.group();
    this.perils.enableBody = true;

    // TODO: Think about the best way to store the data for the different
    // block types, sprites to use for each, positioning (e.g. pixel vs
    // index in a grid of a fixed size), etc
    this.level.getBlocks().forEach(block => {
      const group = block.isSolid() ? this.platforms : this.perils;
      const blockSprite = group.create(
        block.position.x * Level.GRID_SIZE,
        this.game.world.height - Level.GRID_SIZE * (block.position.y + 1),
        block.getImageName(),
        0 // TODO: Think of a way to parameterize the frame to use
      );

      blockSprite.body.immovable = true;
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
