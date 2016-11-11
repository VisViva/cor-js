import {
    SceneManager,
    Keyframe,
    Easings
} from '../src/scene_manager';
import {
    random_color
} from '../src/utils/helper';

const scene_manager = new SceneManager();
const scene = scene_manager.new('scene');
const root = scene.root();
const Path = scene.factory().Path;
const Rect = scene.factory().Rect;

scene
    .fps(60);

window.addEventListener('resize', function(event) {
    scene.resize();
});

for (let i = -20; i < 21; ++i) {
    for (let j = -20; j < 21; ++j) {
        const rect = new Rect();
        const path = new Path();

        const random = Math.random();
        const ij = i * j;
        const irandom = i * random;
        const jrandom = j * random;

        rect
            .debug(false)
            .width(100)
            .height(100)
            .rotate(i * j)
            .pivot(100 * i * random, 10 * j * random)
            .depth(i * i * j * j)
            .material()
            .width(Math.abs(i) / 2)
            .stroked(true)
            .filled(true)
            .stroke('#00FF00')
            .fill('rgba(0, 0, 0, 0.8)');
        root
            .append(rect);


        scene.timeline().add(
            rect,
            new Keyframe()
            .rotate(0)
            .scale(1, 1)
            .translate(100 * random, 100 * jrandom),
            new Keyframe()
            .time(100 * (Math.abs(ij)))
            .scale(random * 2, random * 2, Easings.elastic, Easings.linear)
            .rotate(5 * i, Easings.elastic, Easings.linear),
            new Keyframe()
            .time(150 * (Math.abs(ij)))
            .scale(random * 3, random * 3, Easings.elastic, Easings.linear)
            .rotate(jrandom * 10, Easings.elastic, Easings.linear),
            new Keyframe()
            .time(200 * (Math.abs(ij)))
            .scale(random * 4, random * 4, Easings.elastic, Easings.linear)
            .rotate(irandom * 15, Easings.elastic, Easings.linear)
            .translate(200 * i, 200 * j, Easings.elastic, Easings.linear),
            new Keyframe()
            .time(250 * (Math.abs(ij)))
            .rotate(irandom, Easings.elastic, Easings.linear),
            new Keyframe()
            .time(50000)
            .translate(500 * irandom, 500 * jrandom, Easings.elastic, Easings.linear)
            .rotate(jrandom * 10, Easings.elastic, Easings.linear)
        );
    }
}

scene.timeline().add(
    root,
    new Keyframe()
    .scale(0, 0),
    new Keyframe()
    .time(45000)
    .scale(0.2, 0.2, Easings.quad, Easings.quad)
    .rotate(90, Easings.quad, Easings.quad),
    new Keyframe()
    .time(150000)
    .scale(0, 0, Easings.quad, Easings.quad)
);

scene.start();
