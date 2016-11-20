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
    HALF_PI
} from "../utils/math";

exports.Circle = function (_scene, Primitive) {

    /**
     * Extends the Primitive prototype
     */

    inherit(Circle, Primitive);

    /**
     * Circle constructor
     */

    function Circle() {
        Primitive.call(this);

        /**
         * Radius of the circle
         */

        this._radius = 0;
    };

    /**
     * Get or set radius of the circle and return it
     */

    Circle.prototype.radius = function (radius) {
        if (radius !== undefined) {
            this._radius = radius;
            return this;
        } else {
            return this._radius;
        }
    };

    /**
     * Get the bounding box of the current node only
     */

    Circle.prototype._bbox = function () {

        /**
         * Transformations
         */

        const transformed3DVector = vec2.create();
        vec2.transformMat3(transformed3DVector, vec2.fromValues(this._at.x, this._at.y), this._matrix_cascaded);
        const angle = Math.atan2(this._matrix_cascaded[1], this._matrix_cascaded[0]);
        const scale_x = vec2.length(vec2.fromValues(this._matrix_cascaded[0], this._matrix_cascaded[1]));
        const scale_y = vec2.length(vec2.fromValues(this._matrix_cascaded[3], this._matrix_cascaded[4]));

        const radius_x_vector = vec2.create();
        vec2.transformMat3(radius_x_vector, vec2.fromValues(radius_x, 0), this._matrix_cascaded);
        const radius_x_vector_length = vec2.length(radius_x_vector);

        const radius_y_vector = vec2.create();
        vec2.transformMat3(radius_y_vector, vec2.fromValues(0, radius_y), this._matrix_cascaded);
        const radius_y_vector_length = vec2.length(radius_y_vector);

        const radius_x = this._radius * scale_x;
        const radius_y = this._radius * scale_y;

        /**
         * Gathering extremas
         */

        const ux = radius_x * Math.cos(angle);
        const uy = radius_x * Math.sin(angle);
        const vx = radius_y * Math.cos(angle + HALF_PI);
        const vy = radius_y * Math.sin(angle + HALF_PI);
        const bbox_halfwidth = Math.sqrt(ux * ux + vx * vx);
        const bbox_halfheight = Math.sqrt(uy * uy + vy * vy);

        /**
         * Returning the newly created bouding box
         */

        return BBox.prototype.from([transformed3DVector[0] - bbox_halfwidth, transformed3DVector[0] + bbox_halfwidth], [transformed3DVector[1] - bbox_halfheight, transformed3DVector[1] + bbox_halfheight]);
    };

    /**
     * Render the current circle
     */

    Circle.prototype.render = function () {

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
            _scene._context.arc(this._at.x, this._at.y, this._radius, 0, 2 * Math.PI, false);

            /**
             * Fill the circle
             */

            this._material._fill.enabled && _scene._context.fill();

            /**
             * Stroke the circle
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

    return Circle;
};
