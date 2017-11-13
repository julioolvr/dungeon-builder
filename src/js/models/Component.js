// @flow

import Entity from './Entity';

export interface Component {
  onAdd(entity: Entity): void;
}
