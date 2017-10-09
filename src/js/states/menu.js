class MenuState extends Phaser.State {
  create() {
    const style = { font: '65px Arial', fill: '#ff0044', align: 'center' };
    const text = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      'Hola Kotzi (?)',
      style
    );
    text.anchor.set(0.5);
  }
}

export default MenuState;
