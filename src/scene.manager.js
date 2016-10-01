'use strict';

import { Scene } from './core/scene';
import { Node } from './core/node';
import { Primitive } from './core/primitive';
import { Selection } from './core/selection';
import { BBox } from './core/bbox';
import { Arc } from './primitives/arc';
import { Rect } from './primitives/rect';

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
