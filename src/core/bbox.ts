export class BBox {
  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0){
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

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

  public merge(bbox: BBox): BBox { //TODO add spread operator and optimize

    /**
     *  (0,+)----------------------->(+,+)
     *    ^ (a1)----(b1)  (a2)----(b2) ^
     *    |  | (this) |    | (that) |  |
     *    | (c1)------|   (c2)------|  |
     *  (0,0)----------------------->(+,0)
     */

    const a1Y = this._y;
    const c1Y = this._y - this._height;
    const a1X = this._x;
    const b1X = this._x + this._width;
    const a2Y = bbox.y();
    const c2Y = bbox.y() - bbox.height();
    const a2X = bbox.x();
    const b2X = bbox.x() + bbox.width();

    // Copy the given bounding box if the current bounding box has no area

    if (this._width === 0 && this._height === 0) {
      this._x = bbox.x();
      this._y = bbox.y();
      this._width = bbox.width();
      this._height = bbox.height();
      return this;
    }

    // Return the current bounding box if the given bounding box has no area

    if (bbox.width() === 0 && bbox.height() === 0) {
      return this;
    }

    // Concatenate bounding boxes

    this._x = Math.min(a1X, a2X);
    this._y = Math.max(a1Y, a2Y);
    this._width = Math.max(b1X, b2X) - Math.min(a1X, a2X);
    this._height = Math.max(a1Y, a2Y) - Math.min(c1Y, c2Y);
    return this;
  }
}
