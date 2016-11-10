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
    .debug(false)
    .material()
    .fill(random_color());

root
    .append(rect);

scene.timeline().add(
    rect,
    new Keyframe().rotate(0, 'linear', 'linear'),
    new Keyframe().time(2000).rotate(45, 'elastic', 'linear'),
    new Keyframe().time(4000).rotate(90, 'elastic', 'linear'),
    new Keyframe().time(6000).rotate(135, 'linear', 'linear')
);

scene.start();
