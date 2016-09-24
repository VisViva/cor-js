import { Primitive } from "../core/primitive";
import { BBox } from '../core/bbox';

export class Rect extends Primitive {
    private _width: number;
    private _height: number;

    constructor() {
        super();
        this._width = 0;
        this._height = 0;
    }

    /**
     * Define width of the rect and return it
     * @param width - new width in units
     * @returns Rect - return rect with new width
     */

    public width(width: number): Rect;

    /**
     * @returns current width
     */

    public width(): number;
    public width(width?: number): (Rect | number) {
        if (arguments.length === 0) {
            return this._width;
        } else {
            this._width = width;
            return this;
        }
    }

    /**
     * Define height of the rect and return it
     *
     * @param height - new height in units
     * @returns Rect - return rect with new height
     */

    public height(height: number): Rect;

    /**
     * @return current height
     */

    public height(): number;
    public height(height?: number): (Rect | number) {
        if (arguments.length === 0) {
            return this._height;
        } else {
            this._height = height;
            return this;
        }
    }

    /**
     * Gets the bounding box of the current node only
     */

    public getOwnBBox(): BBox {
        return new BBox();
    }
}
