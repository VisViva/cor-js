'use strict';

import { Node } from "./node";
import { Primitive } from "./primitive";
import { DepthBuffer } from "./depth_buffer";
import { Rect } from "../primitives/rect";
import { Path } from "../primitives/path";

/**
 * Scene constructor
 */

function Scene(name) {
    this._canvas = document.body.appendChild(document.createElement("canvas"));
    this._canvas.width = 512;
    this._canvas.height = 512;
    this._canvas.id = this._name;
    this._context = this._canvas.getContext('2d');

    this._name = name;
    this._factory = null;
    this._root = new(this.factory()).Node().translate(this._canvas.width >>> 1, this._canvas.height >>> 1);
    this._depthbuffer = new DepthBuffer();
    this._grid = false;
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
 * Get or set the visibility of the scene's grid
 */

Scene.prototype.grid = function(value) {
    if (typeof value !== 'undefined') {
        this._grid = value;
        return this;
    } else {
        return this._grid;
    }
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
        const _Path = Path(scene, _Primitive);

        return {
            Node: _Node,
            Primitive: _Primitive,
            Rect: _Rect,
            Path: _Path,
        };
    }(this);

    return this._factory;
};

/**
 * Set the context ready for rendering
 */

Scene.prototype.clear = function() {
    const context = this._context;

    // Clear the context

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillStyle = '#CCCCCC';
    context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    // Draw grid if needed

    if (this._grid === true) {
        context.beginPath();
        context.moveTo(this._canvas.width >>> 1, 0);
        context.lineTo(this._canvas.width >>> 1, this._canvas.height);
        context.moveTo(0, this._canvas.height >>> 1);
        context.lineTo(this._canvas.width, this._canvas.height >>> 1);
        context.strokeStyle = '#999999';
        context.lineWidth = 0.5;
        context.stroke();
    }
};

/**
 * Render all of the primitives that are in the depth buffer
 */

Scene.prototype.render = function() {

    // Clear the context

    this.clear();

    // Detect dirty nodes and cascade their transformations

    this.root().reachDirty().iterate(
        element => {
            element.cascade();
        }
    );

    // Iterate over the depth buffer and render all of the primitives

    const primitives = this._depthbuffer.primitives();
    for (let i = 0; i < primitives.length; ++i) {
        primitives[i].render();
    }
    return this;
};

exports.Scene = Scene;
