import {
    Manager,
    Material,
    Keyframe,
    Easings
} from '../src/cor';
import {
    random_color
} from '../src/utils/helper';

const manager = new Manager();
const scene = manager.new('scene');
const root = scene.root();
const Rect = scene.factory().Rect;

scene
    .fps(60);

window.addEventListener('resize', function(event) {
    scene.resize();
});

for (let i = -20; i < 21; ++i) {
    for (let j = -20; j < 21; ++j) {
        const rect = new Rect();
        const material = new Material();
        const random = Math.random();
        const irandom = i * random;
        const jrandom = j * random;
        const ij = i * j;

        root
            .append(rect);

        scene.timeline().add(
            material
            .stroked(true)
            .filled(true),
            new Keyframe()
            .width(Math.abs(i) / 2)
            .fill([0, 0, 0, 0.8])
            .stroke([0, 255, 0, 1]),
            new Keyframe()
            .time(100 * (Math.abs(ij)))
            .width(i*i/5)
            .fill([50, 0, 0, 0.7])
            .stroke([255, 0, 0, 1]),
            new Keyframe()
            .time(150 * (Math.abs(ij)))
            .width(j/5)
            .fill([0, 0, 50*random, 0.2])
            .stroke([0, 0, 255, 1]),
            new Keyframe()
            .time(200 * (Math.abs(ij)))
            .width(random*i/20)
            .fill([0, 0, 0, 0])
            .stroke([255, 100, 255, 1]),
            new Keyframe()
            .time(250 * (Math.abs(ij)))
            .width(4)
            .fill([0, 0, 0, 0.3])
            .stroke([255, 240, 140, 1])
        );

        scene.timeline().add(
            rect
            .debug(false)
            .width(300)
            .height(80)
            .rotate(i * j)
            .pivot(100 * i * random, -10 * j * random)
            .depth(i * i * j * j)
            .material(material),
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
            .time(30000)
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
