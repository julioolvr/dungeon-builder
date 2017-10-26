// @flow

import type { Block } from '../../Block';
import type { Coordinates } from '../../Entity';
import type { EntityData } from '../../LevelLoader';
import {
  name as imageName,
  path as imagePath
} from '../../../assets/images/spike';

/**
 * Spike that kills the player on contact
 */
class Spike implements Block {
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
    return true;
  }

  isSolid(): boolean {
    return false;
  }
}

export default Spike;
