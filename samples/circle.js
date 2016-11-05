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
    .debug(true)
    .at(200, 0)
    .pivot(200, 0)
    .radius(100)
    .material()
    .fill(random_color());

root
    .append(circle);

scene.start(() => {
    circle.rotate(0.1).scale(1.01, 1.01);
});
