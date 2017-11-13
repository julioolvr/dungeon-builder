// @flow

import type { Component } from './Component';

class Entity extends Phaser.Sprite {
  addComponent(component: Component) {
    component.onAdd(this);
  }
}

export default Entity;
