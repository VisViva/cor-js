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

    this._canvas = document.body.appendChild(document.createElement("canvas"));
    this._canvas.width = 512;
    this._canvas.height = 512;
    this._canvas.id = this._name;

    this._context = this._canvas.getContext('2d');
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
 * Get the canvas
 */

Scene.prototype.canvas = function() {
    return this._canvas;
};

/**
 * Get the context
 */

Scene.prototype.context = function() {
    return this._context;
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

/**
 * Render all of the primitives that are in the depth buffer
 */

Scene.prototype.render = function() {
    const primitives = this._depthbuffer.primitives();
    for (let i = 0; i < primitives.length; ++i){
      primitives[i].render();
    }
    return this;
};

exports.Scene = Scene;
