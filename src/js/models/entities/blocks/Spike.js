// @flow

import Entity from '../../Entity';
import {
  name as imageName,
  path as imagePath
} from '../../../assets/images/spike';
import { Physics, Solid, Immovable } from '../../components';

/**
 * Spike that kills the player on contact
 */
class Spike extends Entity {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, imageName, 0);
    this.addComponent(new Physics(game));
    this.addComponent(new Solid());
    this.addComponent(new Immovable());
  }
}

Spike.SPRITE_NAME = imageName;
Spike.SPRITE_PATH = imagePath;

export default Spike;
