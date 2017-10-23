import MenuState from './states/menu';
import PlayState from './states/play';

const game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('menu', MenuState);
game.state.add('play', PlayState);
game.state.start('play');
