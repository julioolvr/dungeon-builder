// @flow

import Level from '../models/Level';
import LevelLoader from '../models/LevelLoader';
import Goal from '../models/entities/Goal';
import Player from '../models/entities/Player';
import Platform from '../models/entities/blocks/Platform';
import Spike from '../models/entities/blocks/Spike';
import { OnOverlapWith, CollideWith } from '../models/components';

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

    this.goal = this.level.getGoal();
    this.player = this.level.getPlayer();

    this.goal.addComponent(
      new OnOverlapWith(this.game, this.player, () => this.finishLevel())
    );

    this.world.add(this.goal);
    this.world.add(this.player);

    this.platforms = this.game.add.group();
    this.level.getPlatforms().forEach(platform => this.platforms.add(platform));
    this.player.addComponent(new CollideWith(this.game, this.platforms));

    this.spikes = this.game.add.group();
    this.spikes.enableBody = true;
    this.level.getSpikes().forEach(spike => this.spikes.add(spike));
    this.player.addComponent(
      new OnOverlapWith(this.game, this.spikes, () => this.player.kill())
    );
  }

  update() {
    // We might need to review how much knowledge of the specific entities
    // that exist should be on this state
    this.player.update();
    this.goal.update();
    this.platforms.forEach(platform => platform.update());
    this.spikes.forEach(spike => spike.update());
  }

  finishLevel() {
    this.goal.kill();
  }
}

export default PlayState;
