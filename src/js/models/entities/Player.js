// @flow

import {
  name as imageName,
  path as imagePath
} from '../../assets/images/character';
import config from '../../config.json';
import Entity from '../Entity';
import { Physics, Gravity, WorldCollide } from '../components';

class Player extends Entity {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, imageName, 0);
    // TODO: Consider not using `new` and making the components singletons
    this.addComponent(new Physics(game));
    this.addComponent(new Gravity(config.gravity));
    this.addComponent(new WorldCollide());
  }
}

Player.SPRITE_NAME = imageName;
Player.SPRITE_PATH = imagePath;

export default Player;
