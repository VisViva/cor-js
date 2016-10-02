'use strict';

import { Scene } from './core/scene';
import { Selection } from './core/selection';
import { BBox } from './core/bbox';

/**
 * Scene manager constructor
 */

function SceneManager(...elements) {
    this._scenes = [];
};

SceneManager.prototype.new = function(name) {
    for (let i = 0; i < this._scenes.length; ++i) {
        if (this._scenes[i].name() === name) return null;
    }
    let scene = new Scene(name);
    this._scenes.push(scene);
    return scene;
};

SceneManager.prototype.scenes = function() {
    return this._scenes.slice();
};

exports.SceneManager = SceneManager;

export * from './utils/math';
export * from './utils/helper';

// Playground code

let sm = new SceneManager();
let scene = sm.new('Scene1');
let Rect = scene.factory().Rect;
let rect = new Rect().width(20).height(10);
scene.root().append(rect);
scene.render();
