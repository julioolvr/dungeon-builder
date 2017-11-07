// @flow
import type { LevelData } from './LevelLoader';
import type { Block } from './Block';
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
  blocks: ?Array<Block>;

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

    this.goal = new Goal(goalData);
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

    this.player = new Player(playerData);
    return this.player;
  }

  getBlocks(): Array<Block> {
    if (this.blocks) {
      return this.blocks;
    }

    this.blocks = this.data.entities
      .map(data => {
        if (data.type !== 'Block') {
          return;
        }

        switch (data.blockType) {
        case 'Platform':
          return new Platform(data);
        default:
          return new Spike(data);
        }
      })
      .filter(Boolean);

    return this.blocks;
  }
}

Level.GRID_SIZE = 32;
Level.HEIGHT = 20;
Level.WIDTH = 25;

export default Level;
