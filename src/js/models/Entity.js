// @flow

import type { Component } from './Component';

class Entity extends Phaser.Sprite {
  // `components` is already used by Phaser.Sprite
  ownComponents: Array<Component>;

  constructor(
    game: Phaser.Game,
    x: number,
    y: number,
    spriteName: string,
    frame: number
  ) {
    super(game, x, y, spriteName, frame);
    this.ownComponents = [];
  }

  update() {
    this.ownComponents.forEach(component => component.update());
  }

  addComponent(component: Component) {
    this.ownComponents.push(component);
    component.onAdd(this);
  }
}

export default Entity;
