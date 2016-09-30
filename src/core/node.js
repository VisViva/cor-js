'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;
var mat3 = glMatrix.mat3;

import { Selection } from '../core/selection';
import { BBox } from '../core/bbox';
import { degToRad, radToDeg, trimAngle } from '../utils/math';

/**
 * Node constructor
 */

function Node() {
    this._position = {
        x: 0,
        y: 0
    }; // Current nodes position
    this._rotation = 0; // Current nodes rotation in degrees
    this._scale = {
        x: 1,
        y: 1
    }; // Current nodes scale
    this._matrix = mat3.create(); // Current nodes transformation matrix
    this._children = []; // Child nodes of the current node
    this._parent = null; // Parent node of the current node
    this._active = true; // Describes, whether the node should be iterated over during rendering
};


/**
 * Get or set the position of the node
 */

Node.prototype.translate = function(x, y) {
    if (x && y) {
        mat3.translate(this._matrix, this._matrix, vec2.fromValues(x, y));
        this._position.x += x;
        this._position.y += y;
        return this;
    } else {
        return this._position;
    }
};

/**
 * Get or set the rotation of the node
 */

Node.prototype.rotate = function(rotation) {
    if (rotation) {
        mat3.rotate(this._matrix, this._matrix, degToRad(rotation));
        this._rotation = trimAngle(this._rotation + rotation);
        return this;
    } else {
        return this._rotation;
    }
};

/**
 * Get or set the scale of the node
 */

Node.prototype.scale = function(x, y) {
    if (x && y) {
        mat3.scale(this._matrix, this._matrix, vec2.fromValues(x, y));
        this._scale.x *= x;
        this._scale.y *= y;
        return this;
    } else {
        return this._scale;
    }
};

Node.prototype.matrix = function() {
    var matrixCopy = [];
    for (let i = 0; i < this._matrix.length; ++i) {
        matrixCopy.push(this._matrix[i]);
    }
    return matrixCopy;
};

/**
 * Append one or more nodes as children of the current node
 */

Node.prototype.append = function(...nodes) {
    for (let i = 0; i < nodes.length; ++i) {
        nodes[i].parent(this);
        this._children.push(nodes[i]);
    }
    return this;
};

/**
 * Get or set the current nodes parent
 */

Node.prototype.parent = function(parent) {
    if (parent) {
        this._parent = parent;
        return this;
    } else {
        return this._parent;
    }
};

/**
 * List child nodes of the current node
 */

Node.prototype.children = function() {
    const children = [];
    for (let i = 0; i < this._children.length; ++i) {
        children.push(this._children[i]);
    }
    return new Selection(...children);
};

/**
 * Get or set the current nodes activeness status
 */

Node.prototype.active = function(active) {
    if (typeof active !== 'undefined') {
        this._active = active;
        return this;
    } else {
        return this._active;
    }
};

/**
 * Gets the bounding box of the current node only
 */

Node.prototype.getOwnBBox = function() {
    return new BBox();
};

/**
 * Starts recursive merge of all the child bboxes
 */

Node.prototype.getBBox = function() {
    const bboxes = [];
    for (let i = 0; i < this._children.length; ++i) {
        bboxes.push(this._children[i].getBBox());
    }
    return this.getOwnBBox().merge(...bboxes);
};

exports.Node = Node;
