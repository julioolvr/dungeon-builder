// @flow

import Entity from '../Entity';
import type { Component } from '../Component';

class GravityComponent implements Component {
  gravity: number;

  constructor(gravity: number) {
    this.gravity = gravity;
  }

  onAdd(entity: Entity) {
    entity.body.gravity.y = this.gravity;
  }
}

export default GravityComponent;
