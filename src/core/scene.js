'use strict';

import { Node } from "./node";
import { Primitive } from "./primitive";
import { DepthBuffer } from "./depthbuffer";
import { Rect } from "../primitives/rect";
import { Arc } from "../primitives/arc";

/**
 * Scene constructor
 */

function Scene(name) {
    this._name = name;
    this._factory = null;
    this._root = new(this.factory()).Node();
    this._depthbuffer = new DepthBuffer();
};

/**
 * Get the scene's name
 */

Scene.prototype.name = function() {
    return this._name;
};

/**
 * Get the root node
 */

Scene.prototype.root = function() {
    return this._root;
};

/**
 * Get the depth buffer
 */

Scene.prototype.depthbuffer = function() {
    return this._depthbuffer;
};

/**
 * Get the constructor factory
 */

Scene.prototype.factory = function() {
    this._factory = this._factory || function(scene) {
        const _Node = Node(scene);
        const _Primitive = Primitive(scene, _Node);
        const _Rect = Rect(scene, _Primitive);
        const _Arc = Arc(scene, _Primitive);

        return {
            Node: _Node,
            Primitive: _Primitive,
            Rect: _Rect,
            Arc: _Arc
        };
    }(this);

    return this._factory;
};

exports.Scene = Scene;
