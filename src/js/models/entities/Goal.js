// @flow

import Entity from '../Entity';
import { Physics } from '../components';
import { name as imageName, path as imagePath } from '../../assets/images/flag';

class Goal extends Entity {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, imageName, 0);
    this.addComponent(new Physics(game));
  }
}

Goal.SPRITE_NAME = imageName;
Goal.SPRITE_PATH = imagePath;

export default Goal;
