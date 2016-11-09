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

Keyframe.prototype.translate = function(x, y) {
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        this.translateX(x);
        this.translateY(y);
        return this;
    } else {
        return {
            x: this._keys.translateX,
            y: this._keys.translateY
        };
    }
};

/**
 * Get or set the translation key on the x axis
 */

Keyframe.prototype.translateX = function(x) {
    if (typeof x !== 'undefined') {
        if (x === null) delete this._keys.translateY;
        else this._keys.translateX = x;
        return this;
    } else {
        return this._keys.translateX;
    }
};

/**
 * Get or set the translation key on the y axis
 */

Keyframe.prototype.translateY = function(y) {
    if (typeof y !== 'undefined') {
        if (y === null) delete this._keys.translateY;
        else this._keys.translateY = y;
        return this;
    } else {
        return this._keys.translateY;
    }
};

/**
 * Get or set rotation key
 */

Keyframe.prototype.rotate = function(rotation) {
    if (typeof rotation !== 'undefined') {
        this.rotate(rotation);
        return this;
    } else {
        return this._keys.rotate;
    }
};

/**
 * Get or set scale keys
 */

Keyframe.prototype.scale = function(x, y) {
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        this.scaleX(x);
        this.scaleY(y);
        return this;
    } else {
        return {
            x: this._keys.scaleX,
            y: this._keys.scaleY
        };
    }
};

/**
 * Get or set the scale key on the x axis
 */

Keyframe.prototype.scaleX = function(x) {
    if (typeof x !== 'undefined') {
        if (x === null) delete this._keys.scaleX;
        else this._keys.scaleX = x;
        return this;
    } else {
        return this._keys.scaleX;
    }
};

/**
 * Get or set the scale key on the y axis
 */

Keyframe.prototype.scaleY = function(y) {
    if (typeof y !== 'undefined') {
        if (y === null) delete this._keys.scaleY;
        else this._keys.scaleY = y;
        return this;
    } else {
        return this._keys.scaleY;
    }
};

exports.Keyframe = Keyframe;
