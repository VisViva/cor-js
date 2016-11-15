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
const Text = scene.factory().Text;
const text = new Text();
const material = new Material();

window.addEventListener('resize', function(event) {
    scene.resize();
});

material
    .fill([255, 255, 255, 1])
    .stroke([0, 0, 0, 1]);

scene
    .grid(true)
    .fps(60)
    .material()
    .stroke([0, 0, 0, 1])
    .width(1)
    .fill([200, 200, 200, 1]);

text
    .debug(true)
    .text('adsasdsdasd')
    .material(material);

root
    .append(text);

// scene.timeline().add(
//     text,
//     new Keyframe().text('adsasdsdasd'),
//     new Keyframe().time(2000).text('Привет!')
// );
//
// scene.timeline().add(
//     material,
//     new Keyframe().time(0).size(48).style('italic'),
//     new Keyframe().time(5000).style('normal'),
//     new Keyframe().time(10000).style('italic').size(200)
// );

scene.timeline().add(
    text,
    new Keyframe().time(0).scale(1, 1),
    new Keyframe().time(10000).scale(2, 2, Easings.cubic, Easings.cubic)
);


scene.start();
