import {Primitive} from "./Primitive";
export class Rect extends Primitive {
    private x:number;
    private y:number;
    private _width:number;
    private _height:number;
    public static create() {
        return new Rect();
    }
    //TODO Decide what to do with tsdoc as we have different signatures
    /**
     * Place rect into the point
     * @param x - relative x
     * @param y - relative y
     * @returns Rect - return rect with new position
     */
    public at(x:number,y:number):Rect;
    /**
     * @returns {x:number,y:number} current position
     */
    public at():{x:number,y:number};
    public at(x?:number, y?:number):(Rect | {x:number;y:number}) {
        if (arguments.length === 0) {
            return {x:this.x,y:this.y}
        } else {
            this.x = x;
            this.y = y;
            return this;
        }
    }
    /**
     * Define width of the rect and return self
     * @param width - new width in units
     * @returns Rect - return rect with new width
     */
    public width(width:number):Rect;
    /**
     * @returns current width
     */
    public width():number;
    public width(width?:number):(Rect | number) {
        if (arguments.length === 0) {
            return this._width;
        } else {
            this._width = width;
            return this;
        }
    }
    /**
     * Define height of the rect and return self
     * @param height - new height in units
     * @returns Rect - return rect with new height
     */
    public height(height:number):Rect;
    /**
     * @return current height
     */
    public height():number;
    public height(height?:number):(Rect | number) {
        if (arguments.length === 0) {
            return this._height;
        } else {
            this._height = height;
            return this;
        }
    }
}