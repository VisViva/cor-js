'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;

import { deg_to_rad, trim_angle } from "../utils/math";
import { inherit } from "../utils/helper";

exports.Arc = function (_scene, Primitive) {

    /**
     * Extends the Primitive prototype
     */

    inherit(Arc, Primitive);

    /**
     * Rect constructor
     */

    function Arc() {
        Primitive.call(this);
        this._radius = 0;
        this._start = 0;
        this._cx = 0;
        this._cy = 0;
        this._end = 0;
        this._ccw = false;
    }

    /**
     * Place center point of the arc to {x: cx, y: cy}
     * @param cx center x of the arc
     * @param cy center y of the arc
     */

    Arc.prototype.at = function (cx, cy) {
        debugger;
        if (typeof cx !== 'undefined' && typeof cy !== 'undefined') {
            this._cx = cx;
            this._cy = cy;
            return this;
        } else {
            return {x: this._cx, y: this._cy};
        }
    };

    /**
     * Define radius of the arc and return self
     */
    Arc.prototype.radius = function (radius) {
        if (typeof radius !== 'undefined') {
            this._radius = radius;
            return this;
        } else {
            return this._radius;
        }
    };

    /**
     * Define startAngle of the arc and return self
     */

    Arc.prototype.start = function (start) {
        if (typeof start !== 'undefined') {
            this._start = trim_angle(start);
            return this;
        } else {
            return this._start;
        }
    };

    /**
     * Define endAngle of the arc and return self
     */

    Arc.prototype.end = function (end) {
        if (typeof end !== 'undefined') {
            this._end = trim_angle(end);
            return this;
        } else {
            return this._end;
        }
    };

    /**
     * Define ccw of the arc and return self
     */

    Arc.prototype.ccw = function (ccw) {
        if (arguments.length === 1) {
            this._ccw = ccw;
            return this;
        } else {
            return this._ccw;
        }
    };

    /**
     * Gets the bounding box of the current node only
     * TODO
     */

    Arc.prototype.bboxOwn = function() {
        //
    };

    /**
     * Returns the angle of the arc in degrees
     */

    Arc.prototype.angle = function () {
        const start = this._start;
        const end = this._end;
        return trim_angle(this._ccw && (start - end) || end - start);
    };


    Arc.prototype.render = function () {
        let context = _scene.context();
        let matrix = this._matrix_cascaded;
        context.strokeStyle = this._color;
        context.setTransform(matrix[0], matrix[1], matrix[3], matrix[4], matrix[6], matrix[7]);
        context.beginPath();
        context.arc(this._cx, this._cy, this._radius, deg_to_rad(this._start), deg_to_rad(this._end), this._ccw);
        context.stroke();
    };

    return Arc;
};
