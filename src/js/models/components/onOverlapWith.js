// @flow

import Entity from '../Entity';
import type { Component } from '../Component';

class OnOverlapWithComponent implements Component {
  game: Phaser.Game;
  entity: Entity;
  overlapWith: Entity | Array<Entity>;
  onOverlap: Function;

  constructor(
    game: Phaser.Game,
    overlapWith: Entity | Array<Entity>,
    onOverlap: Function
  ) {
    this.game = game;
    this.overlapWith = overlapWith;
    this.onOverlap = onOverlap;
  }

  onAdd(entity: Entity) {
    this.entity = entity;
  }

  update() {
    this.game.physics.arcade.overlap(
      this.entity,
      this.overlapWith,
      this.onOverlap
    );
  }
}

export default OnOverlapWithComponent;
