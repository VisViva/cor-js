'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;

import {deg_to_rad, trim_angle} from "../utils/math";
import {inherit} from "../utils/helper";

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
     */

    Arc.prototype.bboxOwn = function() {
       /* let points = [];

        points.push({x:this._cx,y:this._cy});
        points.push({x:this._cx+Math.cos(deg_to_rad(this._start))*this._radius,y:this._cx+Math.sin(deg_to_rad(this._start))*this._radius});
        points.push({x:this._cx+Math.cos(deg_to_rad(this.end))*this._radius,y:this._cx+Math.sin(deg_to_rad(this.end))*this._radius});
        if (this._ccw) {
            if (start < this._end) {
                start += 360;
            }
            start = Math.ceil(start / 90) * 90;
            while (start > this._end) {
                start -= 90;
                points.push({
                    x: this._cx + Math.cos(deg_to_rad(start)) * this._radius,
                    y: this._cx + Math.sin(deg_to_rad(start)) * this._radius
                })
            }
        } else {
            let start = this._start;
            if (start > this._end) {
                start -= 360;
            }
            start = Math.floor(start / 90) * 90;
            while (start + 90 < this._end) {
                start += 90;
                points.push({
                    x: this._cx + Math.cos(deg_to_rad(start)) * this._radius,
                    y: this._cx + Math.sin(deg_to_rad(start)) * this._radius
                })
            }
        }
        // Transformed points

        const transformed2DVectors = [];

        // Transformations

        const transformed3DVector = vec2.create();

        for (let i = 0; i < this._points.length; ++i) {
            vec2.transformMat3(transformed3DVector, vec2.fromValues(this._points[i].x, this._points[i].y), this._matrix_own);
            transformed2DVectors.push({
                x: transformed3DVector[0],
                y: transformed3DVector[1]
            });
        }

        // Returning the newly created bouding box

        return BBox.prototype.from(transformed2DVectors);*/
    };


    /**
     * Returns the angle of the arc in degrees
     */

    Arc.prototype.angle = function () {
        const start = this._start;
        const end = this._end;
        return trim_angle(this._ccw && (start - end) || end - start);
    };

    /**
     * Returns the length of the arc
     */

    Arc.prototype.length = function () {
        return deg_to_rad(this.angle()) * this._radius;
    };


    Arc.prototype.render = function () {
        let context = _scene.context();
        let matrix = this._matrix_cascaded;
        context.strokeStyle = this._color;
        context.setTransform(matrix[0], matrix[1], matrix[3], matrix[4], matrix[6], matrix[7]);
        context.arc(this._cx, this._cy, this._radius, deg_to_rad(this._start), deg_to_rad(this._end), this._ccw);
        context.stroke();
    };

    return Arc;
};
