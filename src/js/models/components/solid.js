// @flow

import Entity from '../Entity';
import type { Component } from '../Component';

class SolidComponent implements Component {
  onAdd(entity: Entity) {
    entity.body.enableBody = true;
  }
}

export default SolidComponent;
