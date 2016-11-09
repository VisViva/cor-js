'use strict';

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
    if (typeof time !== 'undefined') {
        this._time = time;
        return this;
    } else {
        return this._time;
    }
};

/**
 * Get or set translation keys
 */

Keyframe.prototype.translate = function(x, y, ease_in, ease_out) {
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        this.translateX(x, ease_in, ease_out);
        this.translateY(y, ease_in, ease_out);
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

Keyframe.prototype.translateX = function(x, ease_in, ease_out) {
    if (typeof x !== 'undefined') {
        if (x === null) delete this._keys.translateX;
        else {
            this._keys.translateX = {
                value: x,
                ease_in: ease_in || this._keys.translateX && this._keys.translateX.ease_in || 'linear',
                ease_out: ease_out || this._keys.translateX && this._keys.translateX.ease_out || 'linear'
            };
        }
        return this;
    } else {
        return this._keys.translateX;
    }
};

/**
 * Get or set the translation key on the y axis
 */

Keyframe.prototype.translateY = function(y, ease_in, ease_out) {
    if (typeof y !== 'undefined') {
        if (y === null) delete this._keys.translateY;
        else {
            this._keys.translateY = {
                value: y,
                ease_in: ease_in || this._keys.translateY && this._keys.translateY.ease_in || 'linear',
                ease_out: ease_out || this._keys.translateY && this._keys.translateY.ease_out || 'linear'
            };
        }
        return this;
    } else {
        return this._keys.translateY;
    }
};

/**
 * Get or set rotation key
 */

Keyframe.prototype.rotate = function(rotation, ease_in, ease_out) {
    if (typeof rotation !== 'undefined') {
        if (rotation === null) delete this._keys.rotate;
        else {
            this._keys.rotate = {
                value: rotation,
                ease_in: ease_in || this._keys.rotate && this._keys.rotate.ease_in || 'linear',
                ease_out: ease_out || this._keys.rotate && this._keys.rotate.ease_out || 'linear'
            };
        }
        return this;
    } else {
        return this._keys.rotate;
    }
};

/**
 * Get or set scale keys
 */

Keyframe.prototype.scale = function(x, y, ease_in, ease_out) {
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        this.scaleX(x, ease_in, ease_out);
        this.scaleY(y, ease_in, ease_out);
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

Keyframe.prototype.scaleX = function(x, ease_in, ease_out) {
    if (typeof x !== 'undefined') {
        if (x === null) delete this._keys.scaleX;
        else {
            this._keys.scaleX = {
                value: x,
                ease_in: ease_in || this._keys.scaleX && this._keys.scaleX.ease_in || 'linear',
                ease_out: ease_out || this._keys.scaleX && this._keys.scaleX.ease_out || 'linear'
            };
        }
        return this;
    } else {
        return this._keys.scaleX;
    }
};

/**
 * Get or set the scale key on the y axis
 */

Keyframe.prototype.scaleY = function(y, ease_in, ease_out) {
    if (typeof y !== 'undefined') {
        if (y === null) delete this._keys.scaleY;
        else {
            this._keys.scaleY = {
                value: y,
                ease_in: ease_in || this._keys.scaleY && this._keys.scaleY.ease_in || 'linear',
                ease_out: ease_out || this._keys.scaleY && this._keys.scaleY.ease_out || 'linear'
            };
        }
        return this;
    } else {
        return this._keys.scaleY;
    }
};

exports.Keyframe = Keyframe;
