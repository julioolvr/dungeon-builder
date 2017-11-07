// @flow

import Level from '../models/Level';

import {
  name as spikeImageName,
  path as spikeImagePath
} from '../assets/images/spike';
import {
  name as characterImageName,
  path as characterImagePath
} from '../assets/images/character';
import {
  name as flagImageName,
  path as flagImagePath
} from '../assets/images/flag';
import {
  name as blocksSpritesheetName,
  path as blocksSpritesheetPath
} from '../assets/spritesheets/blocks';

class BuildState extends Phaser.State {
  preload() {
    this.game.load.image(spikeImageName, spikeImagePath);
    this.game.load.image(characterImageName, characterImagePath);
    this.game.load.image(flagImageName, flagImagePath);
    this.game.load.image(blocksSpritesheetName, blocksSpritesheetPath);
  }

  create() {
    this.points = [];

    this.currentTile = 0;

    this.game.stage.backgroundColor = '#2d2d2d';

    this.map = this.game.add.tilemap();

    this.map.addTilesetImage(blocksSpritesheetName);
    this.map.addTilesetImage(
      spikeImageName,
      spikeImageName,
      Level.GRID_SIZE,
      Level.GRID_SIZE,
      0,
      0,
      16
    );
    this.map.addTilesetImage(
      characterImageName,
      characterImageName,
      Level.GRID_SIZE,
      Level.GRID_SIZE,
      0,
      0,
      Level.GRID_SIZE
    );
    this.map.addTilesetImage(
      flagImageName,
      flagImageName,
      Level.GRID_SIZE,
      Level.GRID_SIZE,
      0,
      0,
      48
    );

    this.layer = this.map.create(
      '',
      Level.WIDTH,
      Level.HEIGHT,
      Level.GRID_SIZE,
      Level.GRID_SIZE
    );
    this.layer.scrollFactorX = 0.5;
    this.layer.scrollFactorY = 0.5;

    this.layer.resizeWorld();

    this.createTileSelector();

    this.game.input.addMoveCallback(this.updateMarker, this);
  }

  pickTile(sprite: any, pointer: any) {
    this.currentTile =
      this.game.math.snapToFloor(pointer.x, Level.GRID_SIZE) / Level.GRID_SIZE +
      this.game.math.snapToFloor(pointer.y, Level.GRID_SIZE) /
        Level.GRID_SIZE *
        16;

    if (pointer.y >= 96) {
      this.blockInfo = { type: 'Goal' };
    } else if (pointer.y >= 64) {
      this.blockInfo = { type: 'Player' };
    } else if (pointer.y >= 32) {
      this.blockInfo = { type: 'Block', blockType: 'Spike' };
    } else if (pointer.y >= 0) {
      this.blockInfo = { type: 'Block', blockType: 'Platform' };
    }
  }

  updateMarker() {
    this.marker.x =
      this.layer.getTileX(this.game.input.activePointer.worldX) *
      Level.GRID_SIZE;
    this.marker.y =
      this.layer.getTileY(this.game.input.activePointer.worldY) *
      Level.GRID_SIZE;

    if (this.game.input.mousePointer.isDown && this.marker.y >= 128) {
      this.map.putTile(
        this.currentTile,
        this.layer.getTileX(this.marker.x),
        this.layer.getTileY(this.marker.y),
        this.layer
      );

      var position = {
        position: {
          x: this.marker.x,
          y: this.marker.y
        }
      };
      var point = Object.assign({}, this.blockInfo, position);
      this.points.push(point);
    }
  }

  createTileSelector() {
    //  Our tile selection window
    var tileSelector = this.game.add.group();

    var tileSelectorBackground = this.game.make.graphics();
    tileSelectorBackground.beginFill(0x000000, 0.5);
    tileSelectorBackground.drawRect(0, 0, 800, 128);
    tileSelectorBackground.endFill();

    tileSelector.add(tileSelectorBackground);

    var tileStrip = tileSelector.create(1, 1, blocksSpritesheetName);
    tileStrip.inputEnabled = true;
    tileStrip.events.onInputDown.add(this.pickTile, this);

    var tileStrip2 = tileSelector.create(1, 1, spikeImageName);
    tileStrip2.inputEnabled = true;
    tileStrip2.events.onInputDown.add(this.pickTile, this);
    tileStrip2.y = 32;

    var tileStripCharacter = tileSelector.create(1, 1, characterImageName);
    tileStripCharacter.inputEnabled = true;
    tileStripCharacter.events.onInputDown.add(this.pickTile, this);
    tileStripCharacter.y = 64;

    var tileStripFlag = tileSelector.create(1, 1, flagImageName);
    tileStripFlag.inputEnabled = true;
    tileStripFlag.events.onInputDown.add(this.pickTile, this);
    tileStripFlag.y = 96;

    tileSelector.fixedToCamera = true;

    //  Our painting marker
    this.marker = this.game.add.graphics();
    this.marker.lineStyle(2, 0x000000, 1);
    this.marker.drawRect(0, 0, Level.GRID_SIZE, Level.GRID_SIZE);
  }
}

export default BuildState;
