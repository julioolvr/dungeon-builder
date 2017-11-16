// @flow

import Entity from '../Entity';
import type { Component } from '../Component';

type CursorKeys = {
  up: Phaser.Key,
  down: Phaser.Key,
  left: Phaser.Key,
  right: Phaser.Key
};

class UserControlledComponent implements Component {
  game: Phaser.Game;
  cursors: CursorKeys;
  entity: Entity;
  speed: number;
  jumpVelocity: number;

  constructor(game: Phaser.Game, speed: number, jumpVelocity: number) {
    this.game = game;
    this.speed = speed;
    this.jumpVelocity = jumpVelocity;
  }

  onAdd(entity: Entity) {
    this.entity = entity;
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    this.entity.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.entity.body.velocity.x = -this.speed;
    } else if (this.cursors.right.isDown) {
      this.entity.body.velocity.x = this.speed;
    }

    if (
      this.cursors.up.isDown &&
      (this.entity.body.onFloor() || this.entity.body.touching.down)
    ) {
      this.entity.body.velocity.y = -this.jumpVelocity;
    }
  }
}

export default UserControlledComponent;
