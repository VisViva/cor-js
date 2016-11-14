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

exports.Text = function(_scene, Primitive) {

    /**
     * Extends the Primitive prototype
     */

    inherit(Text, Primitive);

    /**
     * Rect constructor
     */

    function Text() {
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
         * Text
         */

        this._text = '';

        this._tcanvas = document.createElement('canvas');
        this._tcontext = this._tcanvas.getContext('2d');
        this._tcanvas.width = _scene._canvas.width;
        this._tcanvas.height = _scene._canvas.height;
    };

    /**
     * Get or set text
     */

    Text.prototype.text = function(text) {
        if (text) {
            this._text = text;
            return this;
        } else {
            return this._text;
        }
    };

    /**
     * Get the bounding box of the current node only
     */

    Text.prototype.bboxOwn = function() {

        /**
         * Update point array to reflect the latest context state
         */

        const half_width = _scene._context.measureText(this._text).width >>> 1;
        this._points[0].x = this._points[2].x = this._at.x - half_width;
        this._points[1].x = this._points[3].x = this._at.x + half_width;
        const half_height = Math.max(this._material.line(), this._material.size()) >>> 1;
        this._points[0].y = this._points[1].y = this._at.y - half_height;
        this._points[2].y = this._points[3].y = this._at.y + half_height;

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

    Text.prototype.render = function() {
        let context = _scene.context();

        /**
         * Render only if primitive is not hidden
         */

        if (this._hidden === false) {

            /**
             * Apply current primitive's material to the current context
             */

            this._tcontext.save();
            this._tcontext.clearRect(0, 0, this._tcanvas.width, this._tcanvas.height);
            this._material.use(this._tcontext);
            context.setTransform(...glmatrix_to_canvas_matrix(this._matrix_cascaded));
            this._tcontext.font = 'normal normal normal 96px/96px sans-serif';
            const twidth = this._tcontext.measureText(this._text).width >>> 1;
            const theight = Math.max(this._material.line() * 2, this._material.size() * 2) >>> 1;
            this._tcontext.translate(twidth, theight);
            this._material._fill.enabled && this._tcontext.fillText(this._text, 0, 0);
            this._material._stroke.enabled && this._tcontext.strokeText(this._text, 0, 0);
            this._tcontext.restore();
            this._tcontext.save();
            context.scale(0.5, 0.5);
            context.drawImage(this._tcanvas, this._at.x - twidth, - this._at.y - theight);
            this._tcontext.restore();
        }

        /**
         * Rendering debug info
         */

        if (this._debug === true) {
            let bbox = this.bboxCascaded();
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.beginPath();
            context.lineWidth = 2;
            context.rect(bbox.x(), bbox.y() - bbox.height(), bbox.width(), bbox.height());
            context.strokeStyle = '#EE0000';
            context.stroke();
            context.restore();
        }
    };

    return Text;
};
