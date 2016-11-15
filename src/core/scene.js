'use strict';

const glMatrix = require('gl-matrix');
const vec2 = glMatrix.vec2;
const mat3 = glMatrix.mat3;

import {
    Timer
} from './timer';
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
    Timeline
} from "./timeline";
import {
    Rect
} from "../primitives/rect";
import {
    Circle
} from "../primitives/circle";
import {
    Path
} from "../primitives/path";
import {
    Text
} from "../primitives/text";

/**
 * Scene constructor
 */

function Scene(name, width, height) {

    /**
     * Timer bound to the current scene
     */

    this._timer = new Timer();

    /**
     * Frames per second
     */

    this._fps = 60;

    /**
     * Request animation frame id
     */

    this._request_animation_frame_id = null;

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
     * Timeline that contains all of the keyframes related to current scene
     */

    this._timeline = new Timeline();

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

    /**
     * User defined callback
     */

    this._user_logic;
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

    if (width !== undefined && height !== undefined) {
        this._canvas.width = width;
        this._canvas.height = height;
    } else {
        this._canvas.style.width = '100%';
        this._canvas.style.height = '100%';
        this._canvas.width = this._canvas.offsetWidth;
        this._canvas.height = this._canvas.offsetHeight;
    }
    const scale = this._root.scale();
    const rotate = this._root.rotate();
    this._root
        .reset()
        .translate(this._canvas.width / 2, -this._canvas.height / 2)
        .scale(scale.x, scale.y)
        .rotate(rotate);
    return this;
};

/**
 * Get the scene's timer
 */

Scene.prototype.timer = function() {
    return this._timer;
};

/**
 * Get the scene's timeline
 */

Scene.prototype.timeline = function() {
    return this._timeline;
};

/**
 * Get or set fps
 */

Scene.prototype.fps = function(fps) {
    if (fps !== undefined) {
        this._fps = fps;
        return this;
    } else {
        return this._fps;
    }
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
    if (value !== undefined) {
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
        const _Circle = Circle(scene, _Primitive);
        const _Path = Path(scene, _Primitive);
        const _Text = Text(scene, _Primitive);

        return {
            Node: _Node,
            Primitive: _Primitive,
            Rect: _Rect,
            Circle: _Circle,
            Path: _Path,
            Text: _Text
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

    this._material.use(context);

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

    // Detect dirty nodes and cascade their transformations

    const dirty = this.root().reachDirty();
    for (let i = 0; i < dirty.length; ++i) {
        dirty[i].cascade();
    }

    // Clear the context

    this.clear();

    // Iterate over the depth buffer and render all of the primitives

    const primitives = this._depthbuffer.primitives();
    for (let i = 0; i < primitives.length; ++i) {
        primitives[i].render();
    }
    return this;
};

/**
 * Rendering loop
 */

Scene.prototype.loop = function() {
    setTimeout(() => {
        if (this._request_animation_frame_id) {
            this._request_animation_frame_id = requestAnimationFrame(() => this.loop.bind(this)());
            this._timeline.seek(this._timer.delta());
            this._user_logic && this._user_logic();
            this.render();
        }
    }, 1000 / this._fps);
};

/**
 * Start rendering
 */

Scene.prototype.start = function(callback) {
    this.timer().reset();
    this._user_logic = callback;
    this._request_animation_frame_id = requestAnimationFrame(() => this.loop.bind(this)());
};

/**
 * Resume rendering
 */

Scene.prototype.resume = function() {
    this.timer().resume();
    this._request_animation_frame_id = requestAnimationFrame(() => this.loop.bind(this)());
};

/**
 * Pause rendering
 */

Scene.prototype.pause = function() {
    this.timer().pause();
    this._request_animation_frame_id &&
        window.cancelAnimationFrame(this._request_animation_frame_id);
    this._request_animation_frame_id = null;
};

/**
 * Empty the scene
 */

Scene.prototype.empty = function() {
    this.stop();
    this._timeline.empty();
    this._depthbuffer.empty();
    this._root.detachChildren();
};

exports.Scene = Scene;
