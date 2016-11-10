'use strict';

import {
    Scene
} from './core/scene';
import {
    Selection
} from './core/selection';
import {
    BBox
} from './core/bbox';
import {
    Material
} from './core/material';
import {
    Keyframe
} from './core/keyframe';

/**
 * Scene manager constructor
 */

function SceneManager(...elements) {
    this._scenes = [];
};

/**
 * Create new scene
 */

SceneManager.prototype.new = function(name, width, height) {

    /**
     * Check if a scene with the supplied name already exists
     */

    for (let i = 0; i < this._scenes.length; ++i) {
        if (this._scenes[i].name() === name) return null;
    }

    /**
     * Pass supplied arguments to the scene constructor
     */

    let scene = new Scene(name, width, height);
    this._scenes.push(scene);
    return scene;
};

/**
 * List available scenes
 */

SceneManager.prototype.scenes = function() {
    return this._scenes.slice();
};

/**
 * Render available scenes
 */

SceneManager.prototype.render = function() {
    for (let i = 0; i < this._scenes.length; ++i) {
        this._scenes[i].render();
    }
    return this;
};

exports.SceneManager = SceneManager;
exports.Material = Material;
exports.Keyframe = Keyframe;
