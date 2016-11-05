import {
    SceneManager
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
    .debug(true)
    .at(200, 0)
    .pivot(200, 0)
    .width(100)
    .height(100)
    .timed(true)
    .material()
    .fill(random_color());

root
    .timed(true)
    .append(rect);

scene.start(() => {
    rect.rotate(0.1);
});
