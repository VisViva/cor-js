declare var require: any;
let vec2: any = require('gl-matrix/src/gl-matrix/vec2.js');

import { Node } from "../core/node";
import { Selection } from '../core/selection';
import { Primitive } from "../core/primitive";
import { BBox } from '../core/bbox';
import { Vector } from "../structs/vector";

export class Rect extends Primitive {

    /**
     * Visual representation of the _points array indices:
     *
     * (0)------(1)
     *  | (rect) |
     * (2)------(3)
     */

    private _points: Array<Vector>;

    constructor() {
        super();
        this._points = new Array<Vector>();
        for (let i: number = 0; i < 4; ++i) {
          this._points.push(new Vector(0, 0));
        }
    }

    /**
     * Overriding parent methods
     */

    public id(): string;
    public id(id: string): Rect;
    public id(id?: string): any {
        return super.id(id);
    };

    public translate(): Vector;
    public translate(x: number, y: number): Rect;
    public translate(x?: number, y?: number): any {
        return super.translate(x, y);
    };

    public rotate(): number;
    public rotate(rotation: number): Rect;
    public rotate(rotation?: number): any {
        return super.rotate(rotation);
    };

    public scale(): Vector;
    public scale(x: number, y: number): Rect;
    public scale(x?: number, y?: number): any {
        return super.scale(x, y);
    };

   public append(...nodes: Array<Node>): Rect;
   public append(...nodes: Array<Node>): any {
       return super.append(...nodes);
   }

   public active(): boolean;
   public active(active: boolean): Rect;
   public active(active?: boolean): any {
       return super.active(active);
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
        if (width) {
            this._points[1].x = this._points[0].x + width;
            this._points[3].x = this._points[0].x + width;
            return this;
        } else {
            return Math.abs(this._points[0].x - this._points[1].x);
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
        if (height) {
            this._points[2].y = this._points[0].y - height;
            this._points[3].y = this._points[0].y - height;
            return this;
        } else {
            return Math.abs(this._points[0].y - this._points[2].y);
        }
    }

    /**
     * Gets the bounding box of the current node only
     */

    public getOwnBBox(): BBox {

        // Transformed points

        const transformed2DVectors: Array<Vector> = new Array<Vector>();

        // Transformations
        const transformed3DVector: any = vec2.create();

        for (let i: number = 0; i < this._points.length; ++i) {
          vec2.transformMat3(transformed3DVector, vec2.fromValues(this._points[i].x, this._points[i].y), this._matrix);
          transformed2DVectors.push(new Vector(<number>(transformed3DVector[0]), <number>(transformed3DVector[1])));
        }

        // Returning the newly created bouding box

        return BBox.from(transformed2DVectors);
    }
}
