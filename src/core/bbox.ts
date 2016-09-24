import { Vector } from '../structs/vector';

export class BBox {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0){
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  /**
   * Get the current bounding boxes position on the x axis
   */

  public x(): number {
    return this._x;
  }

  /**
   * Get the current bounding boxes position on the y axis
   */

  public y(): number {
    return this._y;
  }

  /**
   * Get width of the current bounding box
   */

  public width(): number {
    return this._width;
  }

  /**
   * Get height of the current bounding box
   */

  public height(): number {
    return this._height;
  }

  /**
   * Concatenate given bbox with the current bbox
   *
   * @param bbox: BBox - Bounding box to be concatenated
   */

  public merge(...bboxes: Array<BBox>): BBox { // TODO add spread operator and optimize

    /**
     *  (0,+)----------------------->(+,+)
     *    ^ (a1)----(b1)  (an)----(bn) ^
     *    |  | (this) |    | (that) |  |
     *    | (c1)------|   (cn)------|  |
     *  (0,0)----------------------->(+,0)
     */

    const ay: Array<number> = new Array<number>();
    const cy: Array<number> = new Array<number>();
    const ax: Array<number> = new Array<number>();
    const bx: Array<number> = new Array<number>();

    if (this._width !== 0 && this._height !== 0) {
      ay.push(this._y);
      cy.push(this._y - this._height);
      ax.push(this._x);
      bx.push(this._x + this._width);
    }

    for (let i = 0; i < bboxes.length; ++i) {
      if (bboxes[i].width() !== 0 && bboxes[i].height() !== 0) {
        ay.push(bboxes[i].y());
        cy.push(bboxes[i].y() - bboxes[i].height());
        ax.push(bboxes[i].x());
        bx.push(bboxes[i].x() + bboxes[i].width());
      }
    }

    if (ax.length > 0) {
      this._x = Math.min(...ax);
      this._y = Math.max(...ay);
      this._width = Math.max(...bx) - Math.min(...ax);
      this._height = Math.max(...ay) - Math.min(...cy);
    }

    return this;
  }

  static from(points: Array<Vector>): BBox {
    let x: number = 0;
    let y: number = 0;
    let width: number = 0;
    let height: number = 0;

    if (points.length > 0) {
      const xValues: Array<number> = new Array<number>();
      const yValues: Array<number> = new Array<number>();
      for (let i = 0; i < points.length; ++i) {
        xValues.push(points[i].x);
        yValues.push(points[i].y);
      }
      x = Math.min(...xValues);
      y = Math.max(...yValues);
      width = Math.abs(Math.max(...xValues) - x);
      height = Math.abs(Math.min(...yValues) - y);
    }

    return new BBox(x, y, width, height);
  }
}
