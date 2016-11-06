'use strict';

/**
 * Keyframe constructor
 */

function Keyframe() {
    this._node = null;
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
 * Get or set node, the keyframe relates to
 */

Keyframe.prototype.node = function(node) {
    if (node) {
        this._node = node;
        return this;
    } else {
        return this._node;
    }
};

/**
 * Get or set position keys
 */

Keyframe.prototype.position = function(x, y) {
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        this._keys.position_x = x;
        this._keys.position_y = y;
        return this;
    } else {
        return {
            x: this._keys.position_x,
            y: this._keys.position_y
        };
    }
};

/**
 * Get or set key of position on the x axis
 */

Keyframe.prototype.position_x = function(x) {
    if (typeof x !== 'undefined') {
        this._keys.position_x = x;
        return this;
    } else {
        return this._keys.position_x;
    }
};

/**
 * Get or set key of position on the y axis
 */

Keyframe.prototype.position_y = function(y) {
    if (typeof y !== 'undefined') {
        this._keys.position_y = y;
        return this;
    } else {
        return this._keys.position_y;
    }
};

/**
 * Delete keyframe keys
 */

Keyframe.prototype.remove = {

    /**
     * Delete position keys
     */

    position: function() {
        delete this._keys.position_x;
        delete this._keys.position_y;
        return this;
    },

    /**
     * Delete position keys
     */

    position_x: function() {
        delete this._keys.position_x;
        return this;
    },

    /**
     * Delete position keys
     */

    position_y: function() {
        delete this._keys.position_y;
        return this;
    }
};

exports.Keyframe = Keyframe;
