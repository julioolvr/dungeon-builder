// @flow

import Entity from '../../Entity';
import {
  name as imageName,
  path as imagePath
} from '../../../assets/spritesheets/blocks';
import { Physics, Solid, Immovable } from '../../components';

/**
 * Basic platform that the player cannot overlap with
 */
class Platform extends Entity {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, imageName, 0);
    this.addComponent(new Physics(game));
    this.addComponent(new Solid());
    this.addComponent(new Immovable());
  }

  isSolid(): boolean {
    return true;
  }
}

Platform.SPRITE_NAME = imageName;
Platform.SPRITE_PATH = imagePath;

export default Platform;
