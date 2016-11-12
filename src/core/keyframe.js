'use strict';

import {
    Values,
    Easings
} from '../utils/enums';

/**
 * Keyframe constructor
 */

function Keyframe() {
    this._time = 0;
    this._keys = {};
};

/**
 * Get or set time of keyframe
 */

Keyframe.prototype.time = function(time) {
    if (time !== undefined) {
        this._time = time;
        return this;
    } else {
        return this._time;
    }
};

/**
 * Set a keyframe
 */

Keyframe.prototype.set = function(key, type, value, ease_in, ease_out) {
    if (value !== undefined) {
        if (value === null) delete this._keys[key];
        else {
            this._keys[key] = {
                type: type,
                value: value,
                ease_in: ease_in || this._keys[key] && this._keys[key].ease_in || Easings.linear,
                ease_out: ease_out || this._keys[key] && this._keys[key].ease_out || Easings.linear
            };
        }
        return this;
    } else {
        return this._keys[key];
    }
};

/*****************************************************************************
 * Node keyframes                                                            *
 ****************************************************************************/

/**
 * Get or set translation keys
 */

Keyframe.prototype.translate = function(x, y, ease_in, ease_out) {
    if (x !== undefined && y !== undefined) {
        this.set('translateX', Values.numeric, x, ease_in, ease_out);
        this.set('translateY', Values.numeric, y, ease_in, ease_out);
        return this;
    } else {
        return {
            translateX: this._keys.translateX,
            translateY: this._keys.translateY
        };
    }
};

/**
 * Get or set the translation key on the x axis
 */

Keyframe.prototype.translateX = function(value, ease_in, ease_out) {
    return this.set('translateX', Values.numeric, value, ease_in, ease_out);
};

/**
 * Get or set the translation key on the y axis
 */

Keyframe.prototype.translateY = function(value, ease_in, ease_out) {
    return this.set('translateY', Values.numeric, value, ease_in, ease_out);
};

/**
 * Get or set rotation key
 */

Keyframe.prototype.rotate = function(value, ease_in, ease_out) {
    return this.set('rotate', Values.numeric, value, ease_in, ease_out);
};

/**
 * Get or set scale keys
 */

Keyframe.prototype.scale = function(x, y, ease_in, ease_out) {
    if (x !== undefined && y !== undefined) {
        this.set('scaleX', Values.numeric, x, ease_in, ease_out);
        this.set('scaleY', Values.numeric, y, ease_in, ease_out);
        return this;
    } else {
        return {
            scaleX: this._keys.scaleX,
            scaleY: this._keys.scaleY
        };
    }
};

/**
 * Get or set the scale key on the x axis
 */

Keyframe.prototype.scaleX = function(value, ease_in, ease_out) {
    return this.set('scaleX', Values.numeric, value, ease_in, ease_out);
};

/**
 * Get or set the scale key on the y axis
 */

Keyframe.prototype.scaleY = function(value, ease_in, ease_out) {
    return this.set('scaleY', Values.numeric, value, ease_in, ease_out);
};

/*****************************************************************************
 * Rect keyframes                                                            *
 ****************************************************************************/

/**
 * Get or set the width key
 */

Keyframe.prototype.width = function(value, ease_in, ease_out) {
    return this.set('width', Values.numeric, value, ease_in, ease_out);
};

/**
 * Get or set the width key
 */

Keyframe.prototype.height = function(value, ease_in, ease_out) {
    return this.set('height', Values.numeric, value, ease_in, ease_out);
};

/*****************************************************************************
 * Circle keyframes                                                          *
 ****************************************************************************/

/**
 * Get or set the radius key
 */

Keyframe.prototype.radius = function(value, ease_in, ease_out) {
    return this.set('radius', Values.numeric, value, ease_in, ease_out);
};

/*****************************************************************************
 * Material keyframes                                                        *
 ****************************************************************************/

/**
 * Get or set the stroke color key
 */

Keyframe.prototype.stroke = function(value, ease_in, ease_out) {
    return this.set('stroke', Values.color, value, ease_in, ease_out);
};

/**
 * Get or set the fill color  key
 */

Keyframe.prototype.fill = function(value, ease_in, ease_out) {
    return this.set('fill', Values.color, value, ease_in, ease_out);
};

/**
 * Get or set the font size key
 */

Keyframe.prototype.size = function(value, ease_in, ease_out) {
    return this.set('size', Values.numeric, value, ease_in, ease_out);
};

/**
 * Get or set the font size units key
 */

Keyframe.prototype.sizeUnits = function(value, ease_in, ease_out) {
    return this.set('sizeUnits', Values.complex, value, ease_in, ease_out);
};

/**
 * Get or set the line height key
 */

Keyframe.prototype.line = function(value, ease_in, ease_out) {
    return this.set('line', Values.numeric, value, ease_in, ease_out);
};

/**
 * Get or set the line height units key
 */

Keyframe.prototype.lineUnits = function(value, ease_in, ease_out) {
    return this.set('lineUnits', Values.complex, value, ease_in, ease_out);
};

/**
 * Get or set the font style key
 */

Keyframe.prototype.style = function(value, ease_in, ease_out) {
    return this.set('style', Values.complex, value, ease_in, ease_out);
};

/**
 * Get or set the font variant  key
 */

Keyframe.prototype.variant = function(value, ease_in, ease_out) {
    return this.set('variant', Values.complex, value, ease_in, ease_out);
};

/**
 * Get or set the font weight key
 */

Keyframe.prototype.weight = function(value, ease_in, ease_out) {
    return this.set('weight', Values.complex, value, ease_in, ease_out);
};

/**
 * Get or set the font family key
 */

Keyframe.prototype.family = function(value, ease_in, ease_out) {
    return this.set('family', Values.complex, value, ease_in, ease_out);
};

/**
 * Get or set the font key
 */

Keyframe.prototype.font = function(value, ease_in, ease_out) {
    return this.set('font', Values.complex, value, ease_in, ease_out);
};

exports.Keyframe = Keyframe;
