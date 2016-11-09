import {
    SceneManager,
    Keyframe
} from '../src/scene_manager';
import {
    random_color
} from '../src/utils/helper';

const scene_manager = new SceneManager();
const scene = scene_manager.new('scene');
const root = scene.root();
const Rect = scene.factory().Rect;
const rect = new Rect();

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

scene.render();

rect
    .width(100)
    .height(100)
    .material()
    .fill(random_color());

root
    .append(rect);

scene.timeline().add(
    rect,
    new Keyframe().time(0).translateX(0),
    new Keyframe().time(500).translateX(700),
    new Keyframe().time(1000).translateX(0),
    new Keyframe().time(1500).translateX(700),
    new Keyframe().time(2000).translateX(0),
    new Keyframe().time(2500).translateX(700),
    new Keyframe().time(3000).translateX(0)
);

scene.start(() => {});
