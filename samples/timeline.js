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
    .debug(true)
    .material()
    .fill(random_color());

root
    .append(rect);

scene.timeline().add(
    rect,
    new Keyframe().rotate(0, 'linear', 'linear').scale(1, 1).translateX(-200),
    new Keyframe().time(1000).scale(1.1, 3.5, 'elastic', 'linear').rotate(90, 'bounce', 'linear').translateX(200, 'bounce', 'linear'),
    new Keyframe().time(2000).scale(2, 2, 'elastic', 'linear').rotate(45, 'bounce', 'linear'),
    new Keyframe().time(4000).scale(3, 3, 'elastic', 'linear').rotate(90, 'bounce', 'linear')
);

scene.start();
