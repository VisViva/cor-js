import {
    Manager,
    Keyframe
} from '../src/cor';
import {
    random_color
} from '../src/utils/helper';

const manager = new Manager();
const scene = manager.new('scene');
const root = scene.root();
const Path = scene.factory().Path;
const Rect = scene.factory().Rect;

scene
    .grid(true)
    .fps(60)
    .material()
    .stroke([0, 0, 0, 1])
    .width(1)
    .fill([200, 200, 200, 1]);

root
    .scale(1.5, 1.5);

window.addEventListener('resize', function(event) {
    scene.resize();
});

const rect = new Rect();
const path = new Path();

rect
    .translate(0, 0)
    .width(600)
    .height(300)
    .depth(-3)
    .material()
    .fill([Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), 1]);

root
    .append(rect);

let rect_temp;

for (let i = -2; i < 3; ++i) {
    const recta = new Rect();

    if (i === 0) rect_temp = recta;

    recta
        .translate(150 * i, 0)
        .width(200)
        .height(200)
        .depth(i)
        .rotate(45)
        .material()
        .fill([Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), 1]);

    rect
        .append(recta);

    scene.timeline().add(
        recta,
        new Keyframe().time(64000).rotate(1440)
    );
}

scene.timeline().add(
    rect_temp,
    new Keyframe().pivot(0, 500).at(0, 0).depth(-10),
    new Keyframe().time(1000).depth(10),
    new Keyframe().time(2000).depth(-10).at(0, 0).pivot(500, 0)
);

rect_temp.width(500).height(500).material().fill([255, 255, 255, 1]);

scene.start();
