// @flow

import config from '../config.json';
import Level from '../models/Level';
import LevelLoader from '../models/LevelLoader';
import Goal from '../models/entities/Goal';
import Player from '../models/entities/Player';
import Platform from '../models/entities/blocks/Platform';
import Spike from '../models/entities/blocks/Spike';

class PlayState extends Phaser.State {
  level: Level;

  preload() {
    this.level = LevelLoader.load('/some/fake/level/path').setState(this);

    // TODO: Probably some sort of assets pack would be useful here
    this.game.load.image(Player.SPRITE_NAME, Player.SPRITE_PATH);
    this.game.load.image(Goal.SPRITE_NAME, Goal.SPRITE_PATH);
    this.game.load.image(Spike.SPRITE_NAME, Spike.SPRITE_PATH);
    this.game.load.spritesheet(
      Platform.SPRITE_NAME,
      Platform.SPRITE_PATH,
      Level.GRID_SIZE,
      Level.GRID_SIZE
    );
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.goal = this.level.getGoal();
    this.player = this.level.getPlayer();

    this.world.add(this.goal);
    this.world.add(this.player);

    this.platforms = this.game.add.group();
    // TODO: not all blocks are platforms (e.g. spikes)
    this.level.getBlocks().forEach(block => this.platforms.add(block));
  }

  update() {
    this.player.body.velocity.x = 0;
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
      this.goal,
      this.finishLevel,
      null,
      this
    );
  }

  finishLevel() {
    this.goal.kill();
  }
}

export default PlayState;
