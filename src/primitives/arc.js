'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;

import {
    BBox
} from '../core/bbox';
import {
    inherit,
    glmatrix_to_canvas_matrix
} from "../utils/helper";
import {
    PI,
    TWO_PI,
    HALF_PI,
    ONE_AND_HALF_PI,
    deg_to_rad,
    rad_to_deg,
    get_arc_point
} from "../utils/math";

exports.Arc = function(_scene, Primitive) {

    /**
     * Extends the Primitive prototype
     */

    inherit(Arc, Primitive);

    /**
     * Arc constructor
     */

    function Arc() {
        Primitive.call(this);

        /**
         * Radius of the arc
         */

        this._radius = 0;

        /**
         * Opening angle of the arc in radians
         */

        this._start = 0;

        /**
         * Closing angle of the arc in radians
         */

        this._end = 0;

        /**
         * Inverted flag
         */

        this._inverted = false;
    };

    /**
     * Get or set the radius of the arc and return it
     */

    Arc.prototype.radius = function(radius) {
        if (radius !== undefined) {
            this._radius = radius;
            return this;
        } else {
            return this._radius;
        }
    };

    /**
     * Get or set the opening angle of the arc and return it
     */

    Arc.prototype.start = function(value) {
        if (value !== undefined) {
            this._start = deg_to_rad(value);
            return this;
        } else {
            return this._start;
        }
    };

    /**
     * Get or set the closing angle of the arc and return it
     */

    Arc.prototype.end = function(value) {
        if (value !== undefined) {
            this._end =  deg_to_rad(value);
            return this;
        } else {
            return this._end;
        }
    };

    /**
     * Get or set radius of the arc and return it
     */

    Arc.prototype.inverted = function(value) {
        if (value !== undefined) {
            this._inverted = value;
            return this;
        } else {
            return this._inverted;
        }
    };

    /**
     * Get the bounding box of the current node only
     */

    Arc.prototype._bbox = function() {

        /**
         * Transformed points
         */

        const xValues = [];
        const yValues = [];

        /**
         * Transformations
         */

        const transformed3DVector = vec2.create();
        vec2.transformMat3(transformed3DVector, vec2.fromValues(this._at.x, this._at.y), this._matrix_cascaded);
        const angle = Math.atan2(this._matrix_cascaded[1], this._matrix_cascaded[0]);
        const scalex = vec2.length(vec2.fromValues(this._matrix_cascaded[0], this._matrix_cascaded[1]));
        const scaley = vec2.length(vec2.fromValues(this._matrix_cascaded[3], this._matrix_cascaded[4]));
        const radiusx = this._radius * scalex;
        const radiusy = this._radius * scaley;
        const start = this._start + angle;
        const end = this._end + angle;

        /**
         * Gathering extremas
         */

        const extremas = [];
        xValues.push(transformed3DVector[0]);
        yValues.push(transformed3DVector[1]);
        extremas.push(get_arc_point(transformed3DVector[0], transformed3DVector[1], radiusx, radiusy, start));
        extremas.push(get_arc_point(transformed3DVector[0], transformed3DVector[1], radiusx, radiusy, end));
        0 >= start &&
        0 <= end &&
        extremas.push(get_arc_point(transformed3DVector[0], transformed3DVector[1], radiusx, radiusy, 0));
        HALF_PI >= start &&
        HALF_PI <= end &&
        extremas.push(get_arc_point(transformed3DVector[0], transformed3DVector[1], radiusx, radiusy, HALF_PI));
        PI >= start &&
        PI <= end &&
        extremas.push(get_arc_point(transformed3DVector[0], transformed3DVector[1], radiusx, radiusy, PI));
        ONE_AND_HALF_PI >= start &&
        ONE_AND_HALF_PI <= end &&
        extremas.push(get_arc_point(transformed3DVector[0], transformed3DVector[1], radiusx, radiusy, ONE_AND_HALF_PI));
        TWO_PI >= start &&
        TWO_PI <= end &&
        extremas.push(get_arc_point(transformed3DVector[0], transformed3DVector[1], radiusx, radiusy, TWO_PI));
        for (var i = 0; i < extremas.length; ++i) {
            xValues.push(extremas[i].x);
            yValues.push(extremas[i].y);
        }

        /**
         * Returning the newly created bouding box
         */

        return BBox.prototype.from(xValues, yValues);
    };

    /**
     * Render the current arc
     */

    Arc.prototype.render = function() {

        /**
         * Render only if primitive is not hidden
         */

        if (this._hidden === false) {

            /**
             * Apply current primitive's material to the current context
             */

            this._material.use(_scene._context);

            /**
             * Setup transformations and render
             */

            _scene._context.setTransform(...glmatrix_to_canvas_matrix(this._matrix_cascaded));
            _scene._context.beginPath();
            _scene._context.arc(this._at.x, this._at.y, this._radius, this._start, this._end, this._inverted);

            /**
             * Fill the arc
             */

            this._material._fill.enabled && _scene._context.fill();

            /**
             * Stroke the arc
             */

            this._material._stroke.enabled && _scene._context.stroke();
        }

        /**
         * Rendering debug info
         */

        if (this._debug === true) {
            let bbox = this.bbox();
            _scene._context.save();
            _scene._context.setTransform(1, 0, 0, 1, 0, 0);
            _scene._context.beginPath();
            _scene._context.lineWidth = 2;
            _scene._context.rect(bbox.x(), bbox.y() - bbox.height(), bbox.width(), bbox.height());
            _scene._context.strokeStyle = '#EE0000';
            _scene._context.stroke();
            _scene._context.restore();
        }
    };

    return Arc;
};
