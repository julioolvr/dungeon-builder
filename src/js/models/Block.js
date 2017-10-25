// @flow

import type { Entity } from './Entity';

interface BaseBlock {
  killsOnTouch(): boolean;
  isSolid(): boolean;
}

export type Block = BaseBlock & Entity;
