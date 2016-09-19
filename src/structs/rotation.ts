import { Angle } from '../enums/angle';

export class Rotation {
  constructor(angle: number = 0, type?: Angle){
    this.angle = angle;
    this.type = type || Angle.DEGREE;
  }

  public angle: number;
  public type: Angle;
}
