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
    .stroke([0, 0, 0, 1])
    .width(1)
    .fill([200, 200, 200, 1]);

scene.render();

rect
    .debug(true)
    .at(250, 0)
    .pivot(250, 0)
    .width(100)
    .height(100)
    .material()
    .fill(random_color());

root
    .append(rect);

scene.timeline().add(
    rect,
    new Keyframe().translate(-200, -200).scale(1, 1),
    new Keyframe().time(4000).scale(1, 1),
    new Keyframe().time(8000).translate(200, 200),
    new Keyframe().time(10000).rotate(180).scale(2, 1)
);

scene.start();
