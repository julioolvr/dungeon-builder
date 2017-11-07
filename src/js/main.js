// @flow

import MenuState from './states/menu';
import PlayState from './states/play';
import BuildState from './states/build';
import Level from './models/level';

const game = new Phaser.Game(
  Level.WIDTH * Level.GRID_SIZE,
  Level.HEIGHT * Level.GRID_SIZE,
  Phaser.AUTO
);

game.state.add('menu', MenuState);
game.state.add('play', PlayState);
game.state.add('build', BuildState);
game.state.start('build');
