'use strict';

const glMatrix = require('gl-matrix');
const vec2 = glMatrix.vec2;
const mat3 = glMatrix.mat3;

import {
    Node
} from "./node";
import {
    Material
} from "./material";
import {
    Primitive
} from "./primitive";
import {
    DepthBuffer
} from "./depth_buffer";
import {
    Rect
} from "../primitives/rect";
import {
    Path
} from "../primitives/path";

/**
 * Scene constructor
 */

function Scene(name, width, height) {

    /**
     * Name of the scene, also used as canvas id
     */

    this._name = name;

    /**
     * Flag, representing the visibility state of the grid
     */

    this._grid = false;

    /**
     * Constructor factory
     */

    this._factory = null;

    /**
     * Depth buffer that contains all renderable assets sorted by depth
     */

    this._depthbuffer = new DepthBuffer();

    /**
     * Root node of the scene
     */

    this._root = new(this.factory()).Node();

    /**
     * Material used to clear the context
     */

    this._material = new Material();

    /**
     * Canvas, bound to the scene
     */

    this._canvas = document.body.appendChild(document.createElement("canvas"));
    this._canvas.id = this._name;

    /**
     * Rendering context
     */

    this._context = this._canvas.getContext('2d');

    /**
     * Resizing the scene
     */

    this.resize(width, height);
};

/**
 * Resize the scene
 */

Scene.prototype.resize = function(width, height) {

    /**
     * Set dimensions to the values that have been supplied to the constructor,
     * if none were passed set the width and height to the maximum of
     * the available area
     */

    if (typeof width !== 'undefined' && typeof height !== 'undefined') {
        this._canvas.width = width;
        this._canvas.height = height;
    } else {
        this._canvas.style.width = '100%';
        this._canvas.style.height = '100%';
        this._canvas.width = this._canvas.offsetWidth;
        this._canvas.height = this._canvas.offsetHeight;
    }
    this._root.reset().translate(this._canvas.width >>> 1, this._canvas.height >>> 1);
    return this;
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
 * Get or set the material of the current scene
 */

Scene.prototype.material = function(material) {
    if (material) {
        this._material = material;
        return this;
    } else {
        return this._material;
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

    /**
     * Apply current primitive's material to the current context
     */

    this._material.style(context);

    // Clear the context

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    // Draw the grid if needed

    if (this._grid === true) {

        const grid_points = [{
            x: 10000,
            y: 0
        }, {
            x: -10000,
            y: 0
        }, {
            x: 0,
            y: 10000
        }, {
            x: 0,
            y: -10000
        }];

        /**
         * Transformations
         */

        const transformed3DVector = vec2.create();

        for (let i = 0; i < grid_points.length; ++i) {
            vec2.transformMat3(transformed3DVector, vec2.fromValues(grid_points[i].x, grid_points[i].y), this.root()._matrix_cascaded);
            grid_points[i].x = transformed3DVector[0];
            grid_points[i].y = transformed3DVector[1];
        }

        context.beginPath();
        context.moveTo(grid_points[0].x, grid_points[0].y);
        context.lineTo(grid_points[1].x, grid_points[1].y);
        context.moveTo(grid_points[2].x, grid_points[2].y);
        context.lineTo(grid_points[3].x, grid_points[3].y);
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
