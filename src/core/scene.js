'use strict';

import { Node } from "./node";

/**
 * Scene constructor
 */

function Scene(...elements) {
    this._root = new Node();
};

/**
 * Gets the root node
 */

Scene.prototype.root = function() {
    return this._root;
};

exports.Scene = Scene;
