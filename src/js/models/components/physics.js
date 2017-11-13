// @flow

import Entity from '../Entity';
import type { Component } from '../Component';

class PhysicsComponent implements Component {
  game: Phaser.Game;

  constructor(game: Phaser.Game) {
    this.game = game;
  }

  onAdd(entity: Entity) {
    this.game.physics.enable(entity);
  }
}

export default PhysicsComponent;
