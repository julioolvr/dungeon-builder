// @flow

import type { Entity, Coordinates } from '../Entity';
import type { EntityData } from '../LevelLoader';
import { name as imageName, path as imagePath } from '../../assets/images/flag';

class Goal implements Entity {
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
}

export default Goal;
