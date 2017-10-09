const FAKE_LEVEL = {
  playerPosition: { x: 120, y: 20 },
  flagPosition: { x: 600, y: 600 - 32 }
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
