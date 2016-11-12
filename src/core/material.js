'use strict';

import {
    decompose_color
} from '../utils/helper';

/**
 * Material constructor
 */

function Material() {

    /**
     * Stroke parameters
     */

    this._stroke;

    /**
     * Fill parameters
     */

    this._fill;

    /**
     * Reset the material
     */

    this.reset();
};

/**
 * Reset the material
 */

Material.prototype.reset = function() {

    /**
     * Reset the stroke parameters
     */

    this._stroke = {
        enabled: true,
        color: 'rgba(0,0,0,1)',
        width: 1
    };

    /**
     * Reset the fill parameters
     */

    this._fill = {
        enabled: true,
        color: 'rgba(0,0,0,1)',
    };

    this._font = '48px sans-serif';

    return this;
};

/**
 * Apply current material to the supplied context
 */

Material.prototype.style = function(context) {
    if (this._stroke.enabled === true) {
        if (context.strokeStyle !== this._stroke.color) {
            context.strokeStyle = this._stroke.color;
        }
    }
    if (context.lineWidth !== this._stroke.width) {
        context.lineWidth = this._stroke.width;
    }
    if (this._fill.enabled === true) {
        if (context.fillStyle !== this._fill.color) {
            context.fillStyle = this._fill.color;
        }
    }
    if (context.font !== this._font) {
        context.font = this._font;
    }
    return this;
};

/**
 * Get or set the stroke color
 */

Material.prototype.stroke = function(channels) {
    if (channels) {
        switch (channels.length) {
            case 1:
                this._stroke.color = 'rgba(' + channels[0] + ',0,0,0)';
                break;
            case 2:
                this._stroke.color = 'rgba(' + channels[0] + ',' + channels[1] + ',0,0)';
                break;
            case 3:
                this._stroke.color = 'rgba(' + channels[0] + ',' + channels[1] + ',' + channels[2] + ',0)';
                break;
            case 4:
                this._stroke.color = 'rgba(' + channels[0] + ',' + channels[1] + ',' + channels[2] + ',' + channels[3] + ')';
                break;
        }
        return this;
    } else {
        return decompose_color(this._stroke.color);
    }
};

/**
 * Set the stroked flag
 */

Material.prototype.stroked = function(value) {
    if (value !== undefined) {
        this._stroke.enabled = value;
        return this;
    } else {
        return this._stroke.enabled;
    }
};

/**
 * Get or set the stroke width
 */

Material.prototype.width = function(width) {
    if (width !== undefined) {
        this._stroke.width = width;
        return this;
    } else {
        return this._stroke.width;
    }
};

/**
 * Get or set the fill color
 */

Material.prototype.fill = function(channels) {
    if (channels) {
        switch (channels.length) {
            case 1:
                this._fill.color = 'rgba(' + channels[0] + ',0,0,0)';
                break;
            case 2:
                this._fill.color = 'rgba(' + channels[0] + ',' + channels[1] + ',0,0)';
                break;
            case 3:
                this._fill.color = 'rgba(' + channels[0] + ',' + channels[1] + ',' + channels[2] + ',0)';
                break;
            case 4:
                this._fill.color = 'rgba(' + channels[0] + ',' + channels[1] + ',' + channels[2] + ',' + channels[3] + ')';
                break;
        }
        return this;
    } else {
        return decompose_color(this._fill.color);
    }
};

/**
 * Set the filled flag
 */

Material.prototype.filled = function(value) {
    if (value !== undefined) {
        this._fill.enabled = value;
        return this;
    } else {
        return this._fill.enabled;
    }
};

exports.Material = Material;
