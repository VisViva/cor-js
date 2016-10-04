'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;

import {deg_to_rad, trim_angle} from "../utils/math";
import {inherit} from "../utils/helper";

exports.Sector = function (_scene, Primitive) {

    /**
     * Extends the Primitive prototype
     */

    inherit(Sector, Primitive);

    /**
     * Rect constructor
     */

    function Sector() {
        Primitive.call(this);
        this._innerRadius = 0;
        this._outerRadius = 0;
        this._start = 0;
        this._cx = 0;
        this._cy = 0;
        this._end = 0;
        this._ccw = false;
    }


    /**
     * Place center point of the sector to {x: cx, y: cy}
     * @param cx center x of the sector
     * @param cy center y of the sector
     */
    Sector.prototype.at = function (cx, cy) {
        if (typeof cx !== 'undefined' && typeof cy !== 'undefined') {
            this._cx = cx;
            this._cy = cy;
            return this;
        } else {
            return {x: this._cx, y: this._cy};
        }
    };

    /**
     * Define inner radius of the sector and return self
     */
    Sector.prototype.innerRadius = function (innerRadius) {
        if (typeof innerRadius !== 'undefined') {
            this._innerRadius = innerRadius;
            return this;
        } else {
            return this._innerRadius;
        }
    };

    /**
     * Define inner radius of the sector and return self
     */
    Sector.prototype.outerRadius = function (outerRadius) {
        if (typeof outerRadius !== 'undefined') {
            this._outerRadius = outerRadius;
            return this;
        } else {
            return this._outerRadius;
        }
    };



    /**
     * Define startAngle of the sector and return self
     */

    Sector.prototype.start = function (start) {
        if (typeof start !== 'undefined') {
            this._start = trim_angle(start);
            return this;
        } else {
            return this._start;
        }
    };

    /**
     * Define endAngle of the sector and return self
     */

    Sector.prototype.end = function (end) {
        if (typeof end !== 'undefined') {
            this._end = trim_angle(end);
            return this;
        } else {
            return this._end;
        }
    };

    /**
     * Define ccw of the sector and return self
     */

    Sector.prototype.ccw = function (ccw) {
        if (typeof ccw !== 'undefined') {
            this._ccw = ccw;
            return this;
        } else {
            return this._ccw;
        }
    };



    /**
     * Gets the bounding box of the current node only
     */

    Sector.prototype.bboxOwn = function() {

    };


    /**
     * Returns the angle of the sector in degrees
     */

    Sector.prototype.angle = function () {
        const start = this._start;
        const end = this._end;
        return trim_angle(this._ccw && (start - end) || end - start);
    };




    Sector.prototype.render = function () {
        let context = _scene.context();
        let matrix = this._matrix_cascaded;
        context.fillStyle = this._color;
        context.setTransform(matrix[0], matrix[1], matrix[3], matrix[4], matrix[6], matrix[7]);
        context.beginPath();
        context.arc(this._cx, this._cy, this._outerRadius, deg_to_rad(this._start), deg_to_rad(this._end), this._ccw);
        context.arc(this._cx, this._cy, this._innerRadius, deg_to_rad(this._end), deg_to_rad(this._start), !this._ccw);
        context.fill();
    };

    return Sector;
};
