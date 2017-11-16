// @flow
import type { LevelData } from './LevelLoader';
import Goal from './entities/Goal';
import Player from './entities/Player';
import Platform from './entities/blocks/Platform';
import Spike from './entities/blocks/Spike';

class Level {
  static GRID_SIZE: number;
  static HEIGHT: number;
  static WIDTH: number;

  data: LevelData;
  goal: ?Goal;
  player: ?Player;
  platforms: ?Array<Platform>;
  spikes: ?Array<Platform>;
  state: ?Phaser.State;

  constructor(data: LevelData) {
    this.data = data;
  }

  getGoal(): Goal {
    if (this.goal) {
      return this.goal;
    }

    // TODO: Extract magic string to a constant
    const goalData = this.data.entities.find(entity => entity.type === 'Goal');

    if (!goalData) {
      throw new Error('Goal not found in level');
    }

    if (!this.state) {
      throw new Error('State required to instantiate Goal');
    }

    this.goal = new Goal(
      this.state.game,
      goalData.position.x,
      goalData.position.y
    );
    return this.goal;
  }

  getPlayer(): Player {
    if (this.player) {
      return this.player;
    }

    // TODO: Extract magic string to a constant
    const playerData = this.data.entities.find(
      entity => entity.type === 'Player'
    );

    if (!playerData) {
      throw new Error('Player not found in level');
    }

    if (!this.state) {
      throw new Error('State required to instantiate a player');
    }

    this.player = new Player(
      this.state.game,
      playerData.position.x,
      playerData.position.y
    );

    return this.player;
  }

  getPlatforms(): Array<Platform> {
    if (this.platforms) {
      return this.platforms;
    }

    this.platforms = this.data.entities
      .filter(data => data.type === 'Block' && data.blockType === 'Platform')
      .map(data => {
        if (!this.state) {
          throw new Error('State required to instantiate a platform');
        }

        // TODO: Think about the best way to store the data for the different
        // block types, sprites to use for each, positioning (e.g. pixel vs
        // index in a grid of a fixed size), etc
        return new Platform(
          this.state.game,
          data.position.x * Level.GRID_SIZE,
          this.state.game.world.height - Level.GRID_SIZE * (data.position.y + 1)
        );
      });

    return this.platforms;
  }

  getSpikes(): Array<Spike> {
    if (this.spikes) {
      return this.spikes;
    }

    this.spikes = this.data.entities
      .filter(data => data.type === 'Block' && data.blockType === 'Spike')
      .map(data => {
        if (!this.state) {
          throw new Error('State required to instantiate a spike');
        }

        // TODO: Think about the best way to store the data for the different
        // block types, sprites to use for each, positioning (e.g. pixel vs
        // index in a grid of a fixed size), etc
        return new Spike(
          this.state.game,
          data.position.x * Level.GRID_SIZE,
          this.state.game.world.height - Level.GRID_SIZE * (data.position.y + 1)
        );
      });

    return this.spikes;
  }

  setState(state: Phaser.State): Level {
    this.state = state;
    return this;
  }
}

Level.GRID_SIZE = 32;
Level.HEIGHT = 20;
Level.WIDTH = 25;

export default Level;
