const FAKE_LEVEL = {
  playerPosition: { x: 120, y: 20 },
  flagPosition: { x: 600, y: 600 - 32 },
  blocks: [
    { x: 0, y: 0, frame: 0 },
    { x: 1, y: 0, frame: 8 },
    { x: 2, y: 2, frame: 12 },
    { x: 3, y: 1, frame: 4 },
    { x: 4, y: 0, frame: 7 },
    { x: 5, y: 0, frame: 9 }
  ],
  spikes: [{ x: 15, y: 0 }]
};

class Level {
  static load(path) {
    // TODO: Phaser probably has some sort of loading facility for level data,
    // just like for assets and the like
    console.log(`Fake loading ${path}...`);
    return FAKE_LEVEL;
  }
}

export default Level;
