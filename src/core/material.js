'use strict';

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
        color: '#000000',
        width: 1
    };

    /**
     * Reset the fill parameters
     */

    this._fill = {
        color: '#000000',
    };

    return this;
};

/**
 * Get or set the stroke color
 */

Material.prototype.stroke = function(color) {
    if (color) {
        this._stroke.color = color;
        return this;
    } else {
        return this._stroke.color;
    }
};

/**
 * Get or set the stroke width
 */

Material.prototype.width = function(width) {
    if (typeof width !== 'undefined') {
        this._stroke.width = width;
        return this;
    } else {
        return this._stroke.width;
    }
};

/**
 * Get or set the fill color
 */

Material.prototype.fill = function(color) {
    if (color) {
        this._fill.color = color;
        return this;
    } else {
        return this._fill.color;
    }
};

exports.Material = Material;
