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
let rect2 = new Rect().width(120).height(60);
let rect3 = new Rect().width(120).height(60);
scene.root().translate(256, 256).append(rect.append(rect2.append(rect3)));
rect.translate(30, 50);
rect2.translate(-30, 30).scale(3, 3);
rect3.translate(20, 20).scale(5, 5);

setInterval(() => {
  scene._context.save();
  scene._context.setTransform(1, 0, 0, 1, 0, 0);
  scene._context.fillStyle = '#ddd';
  scene._context.fillRect(0, 0, scene._canvas.width, scene._canvas.height);
  scene._context.restore();
  rect.rotate(2);
  rect2.rotate(1);
  rect3.rotate(3);
  scene.root().cascade();
  scene.render();
}, 1000/60);
