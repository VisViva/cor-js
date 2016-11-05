import {
    SceneManager
} from '../src/scene_manager';
import {
    random_color
} from '../src/utils/helper';

const scene_manager = new SceneManager();
const scene = scene_manager.new('scene');
const root = scene.root();
const Circle = scene.factory().Circle;
const circle = new Circle();

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

circle
    .debug(false)
    .radius(100)
    .timed(true)
    .material()
    .fill(random_color());

root
    .timed(true)
    .append(circle);

scene.start(() => {
    circle.timed(true).rotate(0.001).scale(0.0001, 0.0001);
});
