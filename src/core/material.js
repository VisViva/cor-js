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
        enabled: true,
        color: '#000000',
        width: 1
    };

    /**
     * Reset the fill parameters
     */

    this._fill = {
        enabled: true,
        color: '#000000',
    };

    return this;
};

/**
 * Apply current material to the supplied context
 */

Material.prototype.style = function(context) {
    if (this._stroke.enabled === true) {
        context.strokeStyle = this._stroke.color;
    }
    context.lineWidth = this._stroke.width;
    if (this._fill.enabled === true) {
        context.fillStyle = this._fill.color;
    }
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

Material.prototype.fill = function(color) {
    if (color) {
        this._fill.color = color;
        return this;
    } else {
        return this._fill.color;
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
