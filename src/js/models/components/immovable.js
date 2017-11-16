// @flow

import Entity from '../Entity';
import type { Component } from '../Component';

class ImmovableComponent implements Component {
  onAdd(entity: Entity) {
    entity.body.immovable = true;
  }

  update() {}
}

export default ImmovableComponent;
