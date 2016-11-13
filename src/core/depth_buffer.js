'use strict';

/**
 * Depth buffer constructor
 */

function DepthBuffer() {
    this._primitives = [];
};

/**
 * Append the given primitive and all of its children to the depth buffer in
 * a sorted fashion
 */

DepthBuffer.prototype.append = function(primitive) {
    let children = primitive.children().array();
    for (let i = 0; i < children.length; ++i) {
        this.append(children[i]);
    }
    let start = 0;
    let end = this._primitives.length;
    while (start < end) {
        let middle = start + end >>> 1;
        if (this._primitives[middle].depth() < primitive.depth()) start = middle + 1;
        else end = middle;
    }
    this._primitives.splice(start, 0, primitive);
    return this;
};

/**
 * Empty the depth buffer
 */

DepthBuffer.prototype.empty = function() {
    this._primitives.length = 0;
    return this;
};

/**
 * List all the primitives currently in the depth buffer
 */

DepthBuffer.prototype.primitives = function() {
    return this._primitives;
};

exports.DepthBuffer = DepthBuffer;
