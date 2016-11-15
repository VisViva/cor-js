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

exports.Rect = function(_scene, Primitive) {

    /**
     * Extends the Primitive prototype
     */

    inherit(Rect, Primitive);

    /**
     * Rect constructor
     */

    function Rect() {
        Primitive.call(this);

        /**
         * Visual representation of the _points array indices:
         *
         * (0)------(1)
         *  | (rect) |
         * (2)------(3)
         */

        this._points = [];

        /**
         * Initialize points
         */

        for (let i = 0; i < 4; ++i) {
            this._points.push({
                x: 0,
                y: 0
            });
        };

        /**
         * Width of the rectangle
         */

        this._width = 0;

        /**
         * Height of the rectangle
         */

        this._height = 0;
    };

    /**
     * Get or set the upper left point of the rect
     */

    Rect.prototype.at = function(x, y) {
        if (x !== undefined && y !== undefined) {
            this._at.x = x;
            this._at.y = y;
            const half_width = this._width >>> 1;
            this._points[0].x = this._points[2].x = this._at.x - half_width;
            this._points[1].x = this._points[3].x = this._at.x + half_width;
            const half_height = this._height >>> 1;
            this._points[0].y = this._points[1].y = this._at.y + half_height;
            this._points[2].y = this._points[3].y = this._at.y - half_height;
            return this;
        } else {
            return this._at;
        }
    };

    /**
     * Get or set width of the rect and return it
     */

    Rect.prototype.width = function(width) {
        if (width) {
            this._width = width;
            const half_width = width >>> 1;
            this._points[0].x = this._points[2].x = this._at.x - half_width;
            this._points[1].x = this._points[3].x = this._at.x + half_width;
            return this;
        } else {
            return this._width;
        }
    };

    /**
     * Get or set height of the rect and return it
     */

    Rect.prototype.height = function(height) {
        if (height) {
            this._height = height;
            const half_height = height >>> 1;
            this._points[0].y = this._points[1].y = this._at.y + half_height;
            this._points[2].y = this._points[3].y = this._at.y - half_height;
            return this;
        } else {
            return this._height;
        }
    };

    /**
     * Get the bounding box of the current node only
     */

    Rect.prototype.bboxOwn = function() {

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
            vec2.transformMat3(transformed3DVector, vec2.fromValues(this._points[i].x, -this._points[i].y), this._matrix_cascaded);
            xValues.push(transformed3DVector[0]);
            yValues.push(transformed3DVector[1]);
        }

        /**
         * Returning the newly created bouding box
         */

        return BBox.prototype.from(xValues, yValues);
    };

    /**
     * Render the current rect
     */

    Rect.prototype.render = function() {

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

            /**
             * Fill the rect
             */

            this._material._fill.enabled && _scene._context.fillRect(this._points[0].x, -this._points[0].y, this.width(), this.height());

            /**
             * Stroke the stroke
             */

            this._material._stroke.enabled && _scene._context.strokeRect(this._points[0].x, -this._points[0].y, this.width(), this.height());
        }

        /**
         * Rendering debug info
         */

        if (this._debug === true) {
            let bbox = this.bboxCascaded();
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

    return Rect;
};
