'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;

import { Selection } from '../core/selection';
import { BBox } from '../core/bbox';
import { inherit, random_color } from "../utils/helper";

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
        for (let i = 0; i < 4; ++i) {
            this._points.push({
                x: 0,
                y: 0
            });
        };
        this._color = random_color();
    };

    /**
     * Place left-top point of the rect to {x: cx, y: cy}
     */

    Rect.prototype.at = function(x, y) {
        if (typeof x !== 'undefined' && typeof y !== 'undefined') {
            this._points[0].x = x;
            this._points[0].y = y;
            return this;
        } else {
            return this._points[0];
        }
    };

    /**
     * Define width of the rect and return it
     */

    Rect.prototype.width = function(width) {
        if (width) {
            this._points[1].x = this._points[0].x + width;
            this._points[3].x = this._points[0].x + width;
            return this;
        } else {
            return Math.abs(this._points[0].x - this._points[1].x);
        }
    };

    /**
     * Define height of the rect and return it
     */

    Rect.prototype.height = function(height) {
        if (height) {
            this._points[2].y = this._points[0].y - height;
            this._points[3].y = this._points[0].y - height;
            return this;
        } else {
            return Math.abs(this._points[0].y - this._points[2].y);
        }
    };

    /**
     * Gets the bounding box of the current node only
     */

    Rect.prototype.bboxOwn = function() {

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

        return BBox.prototype.from(transformed2DVectors);
    };

    /**
     * Render the current rect
     */

    Rect.prototype.render = function() {
        let context = _scene.context();
        let matrix = this._matrix_cascaded;
        context.fillStyle = this._color;
        context.setTransform(matrix[0], matrix[1], matrix[3], matrix[4], matrix[6], matrix[7]);
        context.fillRect(this._points[0].x, this._points[0].y, this.width(), this.height());
        context.stroke();
    };

    return Rect;
};
