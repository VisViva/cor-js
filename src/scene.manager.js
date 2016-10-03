'use strict';

import {Scene} from './core/scene';
import {Selection} from './core/selection';
import {BBox} from './core/bbox';

/**
 * Scene manager constructor
 */

function SceneManager(...elements) {
    this._scenes = [];
};

SceneManager.prototype.new = function (name) {
    for (let i = 0; i < this._scenes.length; ++i) {
        if (this._scenes[i].name() === name) return null;
    }
    let scene = new Scene(name);
    this._scenes.push(scene);
    return scene;
};

SceneManager.prototype.scenes = function () {
    return this._scenes.slice();
};

exports.SceneManager = SceneManager;

export * from './utils/math';
export * from './utils/helper';

// Playground code
import {random_color} from './utils/helper';

let sm = new SceneManager();
let scene = sm.new('Scene1');
let Rect = scene.factory().Rect;
let Arc = scene.factory().Arc;
let rect = new Rect().width(20).height(10);
let rect2 = new Rect().width(120).height(60);
let rect3 = new Rect().width(120).height(60);
let arc = new Arc().at(50, 50).radius(100).start(0).end(180);
scene.root().translate(256, 256).append(arc);
rect.translate(30, 50);
rect2.translate(-30, 30).scale(3, 3);
rect3.translate(20, 20).scale(5, 5);

var color1 = random_color();
var color2 = random_color();
var color3 = random_color();
var i = false;
setInterval(() => {
    scene._context.save();
    scene._context.setTransform(1, 0, 0, 1, 0, 0);
    scene._context.fillStyle = color1;
    scene._context.fillRect(0, 0, scene._canvas.width, scene._canvas.height);
    arc.rotate(1);
    scene.root().cascade();
    scene.render();
    scene._context.restore();
}, 1000 / 60);

/*
 let ascene = sm.new('Scene2');
 let aRect = ascene.factory().Rect;
 let arect = new aRect().width(20).height(10);
 let arect2 = new aRect().width(120).height(60);
 let arect3 = new aRect().width(120).height(60);
 ascene.root().translate(256, 256).append(arect.append(arect2.append(arect3)));
 arect.translate(30, 50);
 arect2.translate(-30, 30).scale(2, 2);
 arect3.translate(20, 20).scale(2, 2);

 setInterval(() => {
 ascene._context.save();
 ascene._context.setTransform(1, 0, 0, 1, 0, 0);
 ascene._context.fillStyle = color2;
 ascene._context.fillRect(0, 0, ascene._canvas.width, ascene._canvas.height);
 ascene._context.restore();
 arect.rotate(-2);
 arect2.rotate(-1);
 arect3.rotate(-3);
 ascene.root().cascade();
 ascene.render();
 }, 1000/60);

 let bscene = sm.new('Scene3');
 let bRect = bscene.factory().Rect;
 let brect = new bRect().width(20).height(10);
 let brect2 = new bRect().width(120).height(60);
 let brect3 = new bRect().width(120).height(60);
 bscene.root().translate(256, 256).append(brect.append(brect2.append(brect3)));
 brect.translate(30, 20).scale(5, 5);
 brect2.translate(-10, 30);
 brect3.translate(20, 20).scale(2, 2);

 setInterval(() => {
 bscene._context.setTransform(1, 0, 0, 1, 0, 0);
 bscene._context.fillStyle = color3;
 bscene._context.fillRect(0, 0, bscene._canvas.width, bscene._canvas.height);
 brect.rotate(-2);
 brect2.rotate(-1);
 brect3.rotate(-3);
 bscene.root().cascade();
 bscene.render();
 }, 1000/60);
 */
