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
     * Font parameters
     */

    this._font;

    /**
     * Text parameters
     */

    this._text;

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

    /**
     * Reset the font parameters
     */

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
        concatenated: 'normal normal normal 48px/48px sans-serif'
    };

    /**
     * Reset the text parameters
     */

    this._text = {
        align: 'center',
        baseline: 'middle'
    };

    return this;
};

/**
 * Apply current material to the supplied context
 */

Material.prototype.use = function(context) {

    /**
     * Apply strokes
     */

    if (this._stroke.enabled === true) {
        if (context.strokeStyle !== this._stroke.color) {
            context.strokeStyle = this._stroke.color;
        }
    }

    if (context.lineWidth !== this._stroke.width) {
        context.lineWidth = this._stroke.width;
    }

    /**
     * Apply fills
     */

    if (this._fill.enabled === true) {
        if (context.fillStyle !== this._fill.color) {
            context.fillStyle = this._fill.color;
        }
    }

    /**
     * Apply fonts
     */

    if (context.font !== this._font.concatenated) {
        context.font = this._font.concatenated;
    }

    /**
     * Apply text
     */

    if (context.textAlign !== this._text.align) {
        context.textAlign = this._text.align;
    }

    if (context.textBaseline !== this._text.baseline) {
        context.textBaseline = this._text.baseline;
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

/**
 * Get or set the font size
 */

Material.prototype.size = function(size) {
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

Material.prototype.sizeUnits = function(units) {
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

Material.prototype.line = function(line) {
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

Material.prototype.lineUnits = function(units) {
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

Material.prototype.style = function(style) {
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

Material.prototype.variant = function(variant) {
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

Material.prototype.weight = function(weight) {
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

Material.prototype.family = function(family) {
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

Material.prototype.font = function(font) {
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

Material.prototype.align = function(align) {
    if (align !== undefined) {
        this._text._align = align;
        return this;
    } else {
        return this._text._align;
    }
};

/**
 * Get or set the text baseline
 */

Material.prototype.baseline = function(baseline) {
    if (baseline !== undefined) {
        this._text._baseline = baseline;
        return this;
    } else {
        return this._text._baseline;
    }
};

/**
 * Concatenate font parts into font string
 */

Material.prototype._concatenate_font = function() {
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

exports.Material = Material;
