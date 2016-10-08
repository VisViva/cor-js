'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;

import { Selection } from '../core/selection';
import { BBox } from '../core/bbox';
import { inherit, glmatrix_to_canvas_matrix } from "../utils/helper";

exports.Path = function(_scene, Primitive) {

    /**
     * Extends the Primitive prototype
     */

    inherit(Path, Primitive);

    /**
     * Path constructor
     */

    function Path() {
        Primitive.call(this);

        /**
         * Segment elements are arrays obeying the following conventions:
         *
         * Linear - consists of one element representing the x and y of
         * the next point
         *
         * Quadratic - consists of two elements, the first one represents
         * the x and y of the next point, the second one represents the
         * control point of a quadratic bezier curve
         *
         * Cubic - consists of three elements, the first one represents
         * the x and y of the next point, the second and the third elements
         * represent the control points of a cubic bezier curve
         */

        this._segments = [];
    };

    /**
     * Add linear segment
     */

    Path.prototype.linearTo = function(...points) {
        if (points.length === 2) {
            this._segments.push(points);
        }
        return this;
    };

    /**
     * Add quadratic segment
     */

    Path.prototype.quadraticTo = function(...points) {
        if (points.length === 4) {
            this._segments.push(points);
        }
        return this;
    };

    /**
     * Add cubic segment
     */

    Path.prototype.cubicTo = function(...points) {
        if (points.length === 6) {
            this._segments.push(points);
        }
        return this;
    };

    /**
     * Get the segments of the path
     */

    Path.prototype.segments = function() {
        return this._segments.slice();
    };

    /**
     * Get the bounding box of the current node only
     */

    Path.prototype.bboxOwn = function() {

        /**
         * Transformed points
         */

        const transformed2DVectors = [];

        /**
         * Transformations
         */

        const transformed3DVector = vec2.create();

        vec2.transformMat3(transformed3DVector, vec2.fromValues(this._at.x, this._at.y), this._matrix_cascaded);
        transformed2DVectors.push({
            x: transformed3DVector[0],
            y: transformed3DVector[1]
        });

        for (let i = 0; i < this._segments.length; ++i) {
          switch (this._segments[i].length) {
            case 2:
              vec2.transformMat3(transformed3DVector, vec2.fromValues(this._segments[i][0], this._segments[i][1]), this._matrix_cascaded);
              transformed2DVectors.push({
                  x: transformed3DVector[0],
                  y: transformed3DVector[1]
              });
              break;
            default:
          }
        }

        /**
         * Returning the newly created bouding box
         */

        return BBox.prototype.from(transformed2DVectors);
    };

    /**
     * Render the current path
     */

    Path.prototype.render = function() {
        let context = _scene.context();
        context.setTransform(...glmatrix_to_canvas_matrix(this._matrix_cascaded));
        context.beginPath();
        context.moveTo(this._at.x, this._at.y);
        for (let i = 0; i < this._segments.length; ++i) {
          switch (this._segments[i].length) {
            case 2:
              context.lineTo(...this._segments[i]);
              break;
            case 4:
              context.quadraticCurveTo(...this._segments[i]);
              break;
            case 6:
              context.bezierCurveTo(...this._segments[i]);
              break;
            default:
          }
        }
        context.stroke();

        if (this._debug === true) {
            let bbox = this.bboxCascaded();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.beginPath();
            context.rect(bbox.x(), bbox.y() - bbox.height(), bbox.width(), bbox.height());
            context.stroke();
        }
    };

    return Path;
};
