'use strict';

import {
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
 * Get or set translation keys
 */

Keyframe.prototype.translate = function(x, y, ease_in, ease_out) {
    if (x !== undefined && y !== undefined) {
        this.set('translateX', x, ease_in, ease_out);
        this.set('translateY', y, ease_in, ease_out);
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
    return this.set('translateX', value, ease_in, ease_out);
};

/**
 * Get or set the translation key on the y axis
 */

Keyframe.prototype.translateY = function(value, ease_in, ease_out) {
    return this.set('translateY', value, ease_in, ease_out);
};

/**
 * Get or set rotation key
 */

Keyframe.prototype.rotate = function(value, ease_in, ease_out) {
    return this.set('rotate', value, ease_in, ease_out);
};

/**
 * Get or set scale keys
 */

Keyframe.prototype.scale = function(x, y, ease_in, ease_out) {
    if (x !== undefined && y !== undefined) {
        this.set('scaleX', x, ease_in, ease_out);
        this.set('scaleY', y, ease_in, ease_out);
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
    return this.set('scaleX', value, ease_in, ease_out);
};

/**
 * Get or set the scale key on the y axis
 */

Keyframe.prototype.scaleY = function(value, ease_in, ease_out) {
    return this.set('scaleY', value, ease_in, ease_out);
};

/**
 * Get or set the width key
 */

Keyframe.prototype.width = function(value, ease_in, ease_out) {
    return this.set('width', value, ease_in, ease_out);
};

/**
 * Get or set the width key
 */

Keyframe.prototype.height = function(value, ease_in, ease_out) {
    return this.set('height', value, ease_in, ease_out);
};

/**
 * Get or set the width key
 */

Keyframe.prototype.radius = function(value, ease_in, ease_out) {
    return this.set('radius', value, ease_in, ease_out);
};

/**
 * Get or set a key
 */

Keyframe.prototype.set = function(key, value, ease_in, ease_out) {
  if (value !== undefined) {
      if (value === null) delete this._keys[key];
      else {
          this._keys[key] = {
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

exports.Keyframe = Keyframe;
