// @flow

import Entity from '../Entity';
import type { Component } from '../Component';

class WorldCollideComponent implements Component {
  onAdd(entity: Entity) {
    entity.body.collideWorldBounds = true;
  }

  update() {}
}

export default WorldCollideComponent;
