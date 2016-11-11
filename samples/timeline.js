import {
    SceneManager,
    Material,
    Keyframe,
    Easings
} from '../src/scene_manager';
import {
    random_color
} from '../src/utils/helper';

const scene_manager = new SceneManager();
const scene = scene_manager.new('scene');
const root = scene.root();
const Rect = scene.factory().Rect;
const rect = new Rect();
const material = new Material();

window.addEventListener('resize', function(event) {
    scene.resize();
});

scene
    .grid(true)
    .fps(60)
    .material()
    .stroke('#000000')
    .width(1)
    .fill('#CCCCCC');

material
    .fill(random_color());

rect
    .width(100)
    .height(100)
    .debug(false)
    .material(material);

root
    .append(rect);

scene.timeline().add(
    rect,
    new Keyframe().rotate(0).scale(1, 1).translateY(300),
    new Keyframe().time(1000).scale(1.1, 3.5, Easings.elastic, Easings.linear).rotate(90, Easings.bounce, Easings.linear).translateY(-200, Easings.bounce, Easings.linear),
    new Keyframe().time(2000).scale(2, 2, Easings.elastic, Easings.linear).rotate(45, Easings.bounce, Easings.linear),
    new Keyframe().time(4000).scale(3, 3, Easings.elastic, Easings.linear).rotate(90, Easings.bounce, Easings.linear)
);

scene.timeline().add(
    material,
    new Keyframe().width(0),
    new Keyframe().time(1000).width(50, Easings.bounce, Easings.linear),
    new Keyframe().time(3000).width(30, Easings.elastic, Easings.linear),
    new Keyframe().time(4000).width(5, Easings.bounce, Easings.linear)
);

scene.start();
