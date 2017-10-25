// @flow
import Level from './Level';
import type { Coordinates } from './Entity';

type BlockType = 'Platform' | 'Spike';

type NonBlockData = {
  type: 'Player' | 'Goal',
  position: Coordinates
};

export type BlockData = {
  type: 'Block',
  blockType: BlockType,
  position: Coordinates
};

export type EntityData = NonBlockData | BlockData;

export type LevelData = {
  entities: Array<EntityData>
};

const FAKE_LEVEL: LevelData = {
  entities: [
    // TODO: Use same type of coordinates for player/goal than for blocks
    { type: 'Player', position: { x: 120, y: 20 } },
    { type: 'Goal', position: { x: 600, y: 600 - 64 } },
    { type: 'Block', blockType: 'Platform', position: { x: 0, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 1, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 2, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 3, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 4, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 5, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 6, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 7, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 8, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 9, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 10, y: 0 } },
    { type: 'Block', blockType: 'Spike', position: { x: 11, y: 0 } },
    { type: 'Block', blockType: 'Spike', position: { x: 12, y: 0 } },
    { type: 'Block', blockType: 'Spike', position: { x: 13, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 14, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 15, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 16, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 17, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 18, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 19, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 20, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 21, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 22, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 23, y: 0 } },
    { type: 'Block', blockType: 'Platform', position: { x: 24, y: 0 } }
  ]
};

class LevelLoader {
  static load(path: string): Level {
    // TODO: Phaser probably has some sort of loading facility for level data,
    // just like for assets and the like
    console.log(`Fake loading ${path}...`);
    return new Level(FAKE_LEVEL);
  }
}

export default LevelLoader;
