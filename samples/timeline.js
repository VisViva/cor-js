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
    new Keyframe().scale(0, 0),
    new Keyframe().time(1000).scale(0.2, 0.2, 'quad', 'linear').rotate(90, 'quad', 'linear'),
    new Keyframe().time(4000).scale(0, 0, 'quad', 'linear')
);

scene.start();
