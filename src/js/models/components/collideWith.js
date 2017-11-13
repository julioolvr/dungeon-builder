// @flow

import Entity from '../Entity';
import type { Component } from '../Component';

class CollideWithComponent implements Component {
  game: Phaser.Game;
  entity: Entity;
  collideWith: Entity | Array<Entity>;

  constructor(game: Phaser.Game, collideWith: Entity | Array<Entity>) {
    this.game = game;
    this.collideWith = collideWith;
  }

  onAdd(entity: Entity) {
    this.entity = entity;
  }

  update() {
    this.game.physics.arcade.collide(this.entity, this.collideWith);
  }
}

export default CollideWithComponent;
