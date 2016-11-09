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
    new Keyframe().translateX(-200),
    new Keyframe().time(1100).translateY(-200),
    new Keyframe().time(1000).translateX(200),
    new Keyframe().time(2000).translateX(-200),
    new Keyframe().time(3000).translateX(200),
    new Keyframe().time(4000).translateX(-200),
    new Keyframe().time(5000).translateX(200),
    new Keyframe().time(6000).translateX(-200),
    new Keyframe().time(7000).translateX(200),
    new Keyframe().time(8000).translateX(-200),
    new Keyframe().time(9000).translateY(200)
);

scene.start(() => {});
