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
 * Set a keyframe callback
 */

Keyframe.prototype.notify = function(callback) {
    if (callback !== undefined) {
        this._callback = callback;
    }
    return this;
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

/**
 * Get or set at keys
 */

Keyframe.prototype.translate = function(x, y, ease_in, ease_out) {
    if (x !== undefined && y !== undefined) {
        this.set('atX', Values.numeric, x, ease_in, ease_out);
        this.set('atY', Values.numeric, y, ease_in, ease_out);
        return this;
    } else {
        return {
            atX: this._keys.atX,
            atY: this._keys.atY
        };
    }
};

/**
 * Get or set pivot keys
 */

Keyframe.prototype.pivot = function(x, y, ease_in, ease_out) {
    if (x !== undefined && y !== undefined) {
        this.set('pivotX', Values.numeric, x, ease_in, ease_out);
        this.set('pivotY', Values.numeric, y, ease_in, ease_out);
        return this;
    } else {
        return {
            pivotX: this._keys.pivotX,
            pivotY: this._keys.pivotY
        };
    }
};

/**
 * Get or set at keys
 */

Keyframe.prototype.at = function(x, y, ease_in, ease_out) {
    if (x !== undefined && y !== undefined) {
        this.set('atX', Values.numeric, x, ease_in, ease_out);
        this.set('atY', Values.numeric, y, ease_in, ease_out);
        return this;
    } else {
        return {
            pivotX: this._keys.atX,
            pivotY: this._keys.atY
        };
    }
};

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
 * Keyframe setters
 */

const _setters = [

    /**
     * Node keyframes
     */

    {
        method: 'pivotX',
        type: Values.numeric
    }, {
        method: 'pivotY',
        type: Values.numeric
    }, {
        method: 'translateX',
        type: Values.numeric
    }, {
        method: 'translateY',
        type: Values.numeric
    }, {
        method: 'rotate',
        type: Values.numeric
    }, {
        method: 'scaleX',
        type: Values.numeric
    }, {
        method: 'scaleY',
        type: Values.numeric
    },

    /**
     * Primitive keyframes
     */

    {
        method: 'atX',
        type: Values.numeric
    }, {
        method: 'atY',
        type: Values.numeric
    }, {
        method: 'depth',
        type: Values.numeric
    },

    /**
     * Path keyframes
     */

    {
        method: 'segments',
        type: Values.path
    },

    /**
     * Rect keyframes
     */

    {
        method: 'width',
        type: Values.numeric
    }, {
        method: 'height',
        type: Values.numeric
    },

    /**
     * Circle keyframes
     */

    {
        method: 'radius',
        type: Values.numeric
    },

    /**
     * Arc keyframes
     */

    {
        method: 'start',
        type: Values.numeric
    }, {
        method: 'end',
        type: Values.numeric
    }, {
        method: 'inverted',
        type: Values.complex
    },

    /**
     * Text keyframes
     */

    {
        method: 'text',
        type: Values.text
    }, {
        method: 'size',
        type: Values.numeric
    }, {
        method: 'sizeUnits',
        type: Values.complex
    }, {
        method: 'line',
        type: Values.numeric
    }, {
        method: 'lineUnits',
        type: Values.complex
    }, {
        method: 'style',
        type: Values.complex
    }, {
        method: 'variant',
        type: Values.complex
    }, {
        method: 'weight',
        type: Values.complex
    }, {
        method: 'family',
        type: Values.complex
    }, {
        method: 'font',
        type: Values.complex
    },

    /**
     * Material keyframes
     */

    {
        method: 'stroke',
        type: Values.color
    }, {
        method: 'fill',
        type: Values.color
    }
];

/**
 * Create keyframe setter methods dynamically
 */

for (let i = 0; i < _setters.length; ++i) {
    Keyframe.prototype[_setters[i].method] = function(value, ease_in, ease_out) {
        return this.set(_setters[i].method, _setters[i].type, value, ease_in, ease_out);
    };
}

exports.Keyframe = Keyframe;
