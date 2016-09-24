import { Primitive } from "../core/primitive";
import { Rotation } from "../structs/rotation";
import { Angle } from "../enums/angle";
import { degToRad, radToDeg } from "../utils/math";

export class Arc extends Primitive {
    private _radius: number;
    private _start: Rotation;
    private _end: Rotation;
    private _ccw: boolean;

    constructor() {
        super();
        this._radius = 0;
        this._start = new Rotation();
        this._end = new Rotation();
        this._ccw = false;
    }

    /**
     * Define radius of the arc and return self
     *
     * @param radius - new radius in units
     * @returns Arc - return arc with new radius
     */

    public radius(radius: number): Arc;

    /**
     * @returns current width
     */

    public radius(): number;
    public radius(radius?: number): (Arc | number) {
        if (radius) {
            this._radius = radius;
            return this;
        } else {
            return this._radius;
        }
    }

    /**
     * Define startAngle of the arc and return self
     *
     * @param startAngle - angle in degrees
     * @returns Arc - return arc with new startAngle
     */

    public start(start: Rotation): Arc;

    /**
     * @returns current startAngle in degrees
     */

    public start(): Rotation;
    public start(start?: Rotation): (Arc | Rotation) {
        if (start) {
            this._start = start;
            return this;
        } else {
            return this._start;
        }
    }

    /**
     * Define endAngle of the arc and return self
     *
     * @param endAngle - angle in degrees
     * @returns Arc - return arc with new endAngle
     */

    public end(end: Rotation): Arc;

    /**
     * @returns current endAngle in degrees
     */

    public end(): Rotation;
    public end(end?: Rotation): (Arc | Rotation) {
        if (end) {
            this._end = end;
            return this;
        } else {
            return this._end;
        }
    }

    /**
     * Define ccw of the arc and return self
     *
     * @param ccw - draw arc as counterclockwise
     * @returns Arc - return arc with new ccw value
     */

    public ccw(ccw: boolean): Arc;

    /**
     * @returns current ccw value
     */

    public ccw(): boolean;
    public ccw(ccw?: boolean): (Arc | boolean) {
        if (ccw) {
            this._ccw = ccw;
            return this;
        } else {
            return this._ccw;
        }
    }

    /**
     * @returns arc angle in degrees
     */

    public angle(): Rotation {
        let angleDegrees: number;
        const startDegrees: number = this._start.type === Angle.DEGREE && this._start.angle || radToDeg(this._start.angle);
        const endDegrees: number = this._end.type === Angle.DEGREE && this._end.angle || radToDeg(this._end.angle);
        angleDegrees = this._ccw && (startDegrees - endDegrees) || endDegrees - startDegrees;
        angleDegrees = (angleDegrees < 0) && 360 - Math.abs(angleDegrees % 360) || Math.abs(angleDegrees % 360);
        return new Rotation(angleDegrees);
    }

    /**
     * @returns length of the arc
     */

    public length(): number {
        return degToRad(this.angle().angle) * this._radius;
    }
}
