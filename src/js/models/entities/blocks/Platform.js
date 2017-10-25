// @flow

import type { Block } from '../../Block';
import type { Coordinates } from '../../Entity';
import type { EntityData } from '../../LevelLoader';
import {
  name as imageName,
  path as imagePath
} from '../../../assets/spritesheets/blocks';

/**
 * Basic platform that the player cannot overlap with
 */
class Platform implements Block {
  position: Coordinates;

  constructor(data: EntityData) {
    this.position = data.position;
  }

  getImageName(): string {
    return imageName;
  }

  getImagePath(): string {
    return imagePath;
  }

  killsOnTouch(): boolean {
    return false;
  }

  isSolid(): boolean {
    return true;
  }
}

export default Platform;
