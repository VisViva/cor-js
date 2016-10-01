'use strict';

/**
 * Depth buffer constructor
 */

function DepthBuffer() {
    this._primitives = [];
};

/**
 * Append the given primitive and all of its children
 * to the depth buffer
 */

DepthBuffer.prototype.append = function(primitive) {
    let children = primitive.children().array();
    for (let i = 0; i < children.length; ++i) {
        this.append(children[i]);
    }
    this._primitives.push(primitive);
    return this;
};

/**
 * List all the primitives currently in the depth buffer
 */

DepthBuffer.prototype.primitives = function() {
    return this._primitives.slice();
};

exports.DepthBuffer = DepthBuffer;
