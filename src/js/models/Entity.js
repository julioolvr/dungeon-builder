// @flow

export type Coordinates = {
  x: number,
  y: number
};

export interface Entity {
  position: Coordinates;
  getImageName(): string;
  getImagePath(): string;
}
