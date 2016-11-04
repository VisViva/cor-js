import {
    SceneManager
} from '../src/scene_manager';
import {
    random_color
} from '../src/utils/helper';

const scene_manager = new SceneManager();
const scene = scene_manager.new('scene');
const root = scene.root();
const Path = scene.factory().Path;
const path = new Path();
const closed_path = new Path();
const shape = new Path();

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

path
    .debug(true)
    .translate(-400, 0)
    .cubicTo(150, 0, -150, 150, -100, -100)
    .linearTo(20, -90)
    .quadraticTo(50, 150, 200, -70)
    .timed(true)
    .material()
    .width(1);

closed_path
    .debug(true)
    .cubicTo(150, 0, -150, 150, -100, -100)
    .linearTo(20, -90)
    .quadraticTo(50, 150, 200, -70)
    .closed(true)
    .timed(true)
    .material()
    .fill(random_color())
    .width(1);

shape
    .debug(true)
    .translate(400, 0)
    .cubicTo(150, 0, -150, 150, -100, -100)
    .linearTo(20, -90)
    .quadraticTo(50, 150, 200, -70)
    .closed(true)
    .filled(true)
    .timed(true)
    .material()
    .fill(random_color())
    .width(1);

root
    .timed(true)
    .append(path, closed_path, shape);

scene.start(() => {
    path.rotate(0.1);
    closed_path.rotate(0.1);
    shape.rotate(0.1);
});
