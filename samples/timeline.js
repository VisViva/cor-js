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
    new Keyframe().translateX(-300, 'linear', 'elastic'),
    new Keyframe().time(1500).translateX(300, 'elastic', 'bounce').rotate(0, 'linear', 'linear'),
    new Keyframe().time(2500).translateX(300, 'bounce', 'linear').rotate(180, 'elastic', 'linear')
);

scene.start();
