import MenuState from './states/menu';

const game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('menu', MenuState);
game.state.start('menu');
