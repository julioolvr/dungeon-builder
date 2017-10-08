const game = new Phaser.Game(800, 600, Phaser.AUTO, 'asd', {
  preload,
  create,
  update
});

function preload() {}

function create() {
  const style = { font: '65px Arial', fill: '#ff0044', align: 'center' };
  const text = game.add.text(
    game.world.centerX,
    game.world.centerY,
    'Hola Kotzi (?)',
    style
  );
  text.anchor.set(0.5);
}

function update() {}
