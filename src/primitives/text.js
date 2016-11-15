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

        /**
         * The font parameters
         */

        this._font;

        /**
         * Rasterized text mode
         */

        this._rasterized = false;

        /**
         * Reset the font parameters
         */

        this.reset();
    };

    /**
     * Reset the font parameters
     */

    Text.prototype.reset = function() {
        this._font = {
            style: 'normal',
            variant: 'normal',
            weight: 'normal',
            size: {
                value: 48,
                units: 'px'
            },
            line: {
                value: 48,
                units: 'px'
            },
            family: 'sans-serif',
            concatenated: 'normal normal normal 48px/48px sans-serif',
            align: 'center',
            baseline: 'middle'
        };
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
     * Get or set rasterized text mode
     */

    Text.prototype.rasterized = function(rasterized, width, height) {
        if (rasterized !== undefined && width !== undefined && height !== undefined) {
            this._rasterized = rasterized;
            if (this._rasterized) {
                this._tcanvas = document.createElement('canvas');
                this._tcontext = this._tcanvas.getContext('2d');
                this._tcanvas.width = width;
                this._tcanvas.height = height;
            } else {
                this._tcanvas && delete this._tcanvas;
                this._tcontext && delete this._tcontext;
            }
            return this;
        } else {
            return this._rasterized;
        }
    };

    /**
     * Get or set the font size
     */

    Text.prototype.size = function(size) {
        if (size !== undefined) {
            this._font.size.value = size;
            this._concatenate_font();
            return this;
        } else {
            return this._font.size.value;
        }
    };

    /**
     * Get or set the font units
     */

    Text.prototype.sizeUnits = function(units) {
        if (units !== undefined) {
            this._font.size.units = units;
            this._concatenate_font();
            return this;
        } else {
            return this._font.size.units;
        }
    };

    /**
     * Get or set the font line size
     */

    Text.prototype.line = function(line) {
        if (line !== undefined) {
            this._font.line.value = line;
            this._concatenate_font();
            return this;
        } else {
            return this._font.line.value;
        }
    };

    /**
     * Get or set the font line units
     */

    Text.prototype.lineUnits = function(units) {
        if (units !== undefined) {
            this._font.line.units = units;
            this._concatenate_font();
            return this;
        } else {
            return this._font.line.units;
        }
    };

    /**
     * Get or set the font style
     */

    Text.prototype.style = function(style) {
        if (style !== undefined) {
            this._font.style = style;
            this._concatenate_font();
            return this;
        } else {
            return this._font.style;
        }
    };

    /**
     * Get or set the font variant
     */

    Text.prototype.variant = function(variant) {
        if (variant !== undefined) {
            this._font.variant = variant;
            this._concatenate_font();
            return this;
        } else {
            return this._font.variant;
        }
    };

    /**
     * Get or set the font weight
     */

    Text.prototype.weight = function(weight) {
        if (weight !== undefined) {
            this._font.weight = weight;
            this._concatenate_font();
            return this;
        } else {
            return this._font.weight;
        }
    };

    /**
     * Get or set the font weight
     */

    Text.prototype.family = function(family) {
        if (family !== undefined) {
            this._font.family = family;
            this._concatenate_font();
            return this;
        } else {
            return this._font.family;
        }
    };

    /**
     * Get or set the font
     */

    Text.prototype.font = function(font) {
        if (font !== undefined) {
            this._font.concatenated = font;
            const regex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\"\sa-z]+?)\s*$/i;
            const tokens = regex.exec(font);
            this._font.style = tokens[1] || 'normal';
            this._font.variant = tokens[2] || 'normal';
            this._font.weight = tokens[3] || 'normal';
            this._font.size.value = tokens[4].match(/\d+/g)[0];
            this._font.size.units = tokens[4].match(/[a-z]+/g)[0];
            this._font.line.value = tokens[5].match(/\d+/g)[0];
            this._font.line.units = tokens[5].match(/[a-z]+/g)[0];
            this._font.family = tokens[6];
            return this;
        } else {
            return this._font.concatenated;
        }
    };

    /**
     * Get or set the text align
     */

    Text.prototype.align = function(align) {
        if (align !== undefined) {
            this._font._align = align;
            return this;
        } else {
            return this._font._align;
        }
    };

    /**
     * Get or set the text baseline
     */

    Text.prototype.baseline = function(baseline) {
        if (baseline !== undefined) {
            this._font._baseline = baseline;
            return this;
        } else {
            return this._font._baseline;
        }
    };

    /**
     * Concatenate font parts into font string
     */

    Text.prototype._concatenate_font = function() {
        this._font.concatenated =
            this._font.style + ' ' +
            this._font.variant + ' ' +
            this._font.weight + ' ' +
            this._font.size.value +
            this._font.size.units + '/' +
            this._font.line.value +
            this._font.line.units + ' ' +
            this._font.family;
    };

    /**
     * Get the bounding box of the current node only
     */

    Text.prototype.bboxOwn = function() {

        /**
         * Select correct context for text measuring
         */

        const context = (this._rasterized === true) ? this._tcontext : _scene._context;

        /**
         * Update point array to reflect the latest context state
         */

        const half_width = context.measureText(this._text).width >>> 1;
        this._points[0].x = this._points[2].x = this._at.x - half_width;
        this._points[1].x = this._points[3].x = this._at.x + half_width;
        const half_height = Math.max(this._font.line.value, this._font.size.value) >>> 1;
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
        let context = _scene._context;

        /**
         * Render only if primitive is not hidden
         */

        if (this._hidden === false) {
            if (this._rasterized) {

                /**
                 * Apply font
                 */

                if (this._tcontext.font !== this._font.concatenated) {
                    this._tcontext.font = this._font.concatenated;
                }

                if (this._tcontext.textAlign !== this._font.align) {
                    this._tcontext.textAlign = this._font.align;
                }

                if (this._tcontext.textBaseline !== this._font.baseline) {
                    this._tcontext.textBaseline = this._font.baseline;
                }

                /**
                 * Clear text specific context
                 */

                this._tcontext.clearRect(0, 0, this._tcanvas.width, this._tcanvas.height);

                /**
                 * Set font to the text specific contex
                 */

                this._material.use(this._tcontext);
                this._tcontext.font = this._font.concatenated;

                /**
                 * Render text to the separate context
                 */

                const twidth = this._tcontext.measureText(this._text).width;
                const theight = Math.max(this._font.line.value, this._font.size.value);
                this._tcontext.save();
                this._tcontext.translate(twidth, theight);
                this._material._fill.enabled && this._tcontext.fillText(this._text, 0, 0);
                this._material._stroke.enabled && this._tcontext.strokeText(this._text, 0, 0);
                this._tcontext.restore();

                /**
                 * Render text
                 */

                this._tcontext.save();

                /**
                 * Set transformations to the scene's context
                 */

                _scene._context.setTransform(...glmatrix_to_canvas_matrix(this._matrix_cascaded));

                /**
                 * Render the text, pre-rendered on the separate context to the
                 * scene's context
                 */

                _scene._context.drawImage(this._tcanvas, this._at.x - twidth, - this._at.y - theight);
                this._tcontext.restore();
            } else {

                this._material.use(_scene._context);

                /**
                 * Apply font
                 */

                if (_scene._context.font !== this._font.concatenated) {
                    _scene._context.font = this._font.concatenated;
                }

                if (_scene._context.textAlign !== this._font.align) {
                    _scene._context.textAlign = this._font.align;
                }

                if (_scene._context.textBaseline !== this._font.baseline) {
                    _scene._context.textBaseline = this._font.baseline;
                }

                /**
                 * Set transformations to the scene's context
                 */

                _scene._context.setTransform(...glmatrix_to_canvas_matrix(this._matrix_cascaded));

                /**
                 * Fill the rect
                 */

                this._material._fill.enabled &&
                    _scene._context.fillText(this._text, this._at.x, -this._at.y);

                /**
                 * Stroke the stroke
                 */

                this._material._stroke.enabled &&
                    _scene._context.strokeText(this._text, this._at.x, -this._at.y);
            }
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

    return Text;
};
