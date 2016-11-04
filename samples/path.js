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
    .cubicTo(150, 0, -150, 150, -100, -100)
    .linearTo(20, -90)
    .quadraticTo(50, 150, 200, -70)
    .timed(true)
    .material()
    .stroke(random_color())
    .width(1);

root
    .timed(true)
    .append(path);

scene.start(() => {
    path.rotate(0.1);
});
