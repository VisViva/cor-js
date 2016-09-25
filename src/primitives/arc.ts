import { Primitive } from "../core/primitive";
import { degToRad, radToDeg, trimAngle } from '../utils/math';

export class Arc extends Primitive {
    private _radius: number;
    private _start: number;
    private _end: number;
    private _ccw: boolean;

    constructor() {
        super();
        this._radius = 0;
        this._start = 0;
        this._end = 0;
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

    public start(start: number): Arc;

    /**
     * @returns current startAngle in degrees
     */

    public start(): number;
    public start(start?: number): (Arc | number) {
        if (start) {
            this._start = trimAngle(start);
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

    public end(end: number): Arc;

    /**
     * @returns current endAngle in degrees
     */

    public end(): number;
    public end(end?: number): (Arc | number) {
        if (end) {
            this._end = trimAngle(end);
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

    public angle(): number {
        const start: number = this._start;
        const end: number = this._end;
        return trimAngle(this._ccw && (start - end) || end - start);
    }

    /**
     * @returns length of the arc
     */

    public length(): number {
        return degToRad(this.angle()) * this._radius;
    }
}
