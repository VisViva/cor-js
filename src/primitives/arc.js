'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;

import { Selection } from '../core/selection';
import { BBox } from '../core/bbox';
import { deg_to_rad, rad_to_deg, trim_angle } from '../utils/math';
import { inherit } from "../utils/helper";

exports.Arc = function(_scene, Primitive) {

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
        this._end = 0;
        this._ccw = false;
    };

    /**
     * Define radius of the arc and return self
     */

    Arc.prototype.radius = function(radius) {
        if (radius) {
            this._radius = radius;
            return this;
        } else {
            return this._radius;
        }
    };

    /**
     * Define startAngle of the arc and return self
     */

    Arc.prototype.start = function(start) {
        if (start) {
            this._start = trim_angle(start);
            return this;
        } else {
            return this._start;
        }
    };

    /**
     * Define endAngle of the arc and return self
     */

    Arc.prototype.end = function(end) {
        if (end) {
            this._end = trim_angle(end);
            return this;
        } else {
            return this._end;
        }
    };

    /**
     * Define ccw of the arc and return self
     */

    Arc.prototype.ccw = function(ccw) {
        if (ccw) {
            this._ccw = ccw;
            return this;
        } else {
            return this._ccw;
        }
    };

    /**
     * Returns the angle of the arc in degrees
     */

    Arc.prototype.angle = function() {
        const start = this._start;
        const end = this._end;
        return trim_angle(this._ccw && (start - end) || end - start);
    };

    /**
     * Returns the length of the arc
     */

    Arc.prototype.length = function() {
        return deg_to_rad(this.angle()) * this._radius;
    };

    return Arc;
};
