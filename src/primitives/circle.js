'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;

import {
    Selection
} from '../core/selection';
import {
    BBox
} from '../core/bbox';
import {
    inherit,
    glmatrix_to_canvas_matrix
} from "../utils/helper";

exports.Circle = function(_scene, Primitive) {

    /**
     * Extends the Primitive prototype
     */

    inherit(Circle, Primitive);

    /**
     * Rect constructor
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

    Circle.prototype.radius = function(radius) {
        if (typeof radius !== 'undefined') {
            this._radius = radius;
            return this;
        } else {
            return this._radius;
        }
    };

    /**
     * Get the bounding box of the current node only
     */

    Circle.prototype.bboxOwn = function() {

        /**
         * Transformed points
         */

        const xValues = [];
        const yValues = [];

        /**
         * Transformations
         */

        const transformed3DVector = vec2.create();

        for (let i = 0; i < this._points.length; ++i) {
            vec2.transformMat3(transformed3DVector, vec2.fromValues(this._points[i].x, - this._points[i].y), this._matrix_cascaded);
            xValues.push(transformed3DVector[0]);
            yValues.push(transformed3DVector[1]);
        }

        /**
         * Returning the newly created bouding box
         */

        return BBox.prototype.from(xValues, yValues);
    };

    /**
     * Render the current circle
     */

    Circle.prototype.render = function() {
        let context = _scene.context();

        /**
         * Apply current primitive's material to the current context
         */

        this._material.style(context);

        /**
         * Setup transformations and render
         */

        context.setTransform(...glmatrix_to_canvas_matrix(this._matrix_cascaded));
        context.beginPath();
        context.arc(this._at.x, this._at.y, this._radius, 0, 2 * Math.PI, false);

        /**
         * Fill the circle
         */

        this._material._fill.enabled &&
        context.fill();

        /**
         * Stroke the circle
         */

        this._material._stroke.enabled &&
        context.stroke();

        /**
         * Rendering debug info
         */

        if (this._debug === true) {
            let bbox = this.bboxCascaded();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.beginPath();
            context.lineWidth = 2;
            context.rect(bbox.x(), bbox.y() - bbox.height(), bbox.width(), bbox.height());
            context.strokeStyle = '#EE0000';
            context.stroke();
        }
    };

    return Circle;
};
