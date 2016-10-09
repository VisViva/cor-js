import {
    SceneManager
} from '../src/scene_manager';
import {
    random_color
} from '../src/utils/helper';

let scene_manager = new SceneManager();
let scene = scene_manager.new('scene');
const Path = scene.factory().Path;

let path = new Path()
    .debug(true)
    .translate(150, 10)
    .cubicTo(150, 0, -150, -150, -100, 100);

scene.grid(true).root().append(path);
scene.render();

setInterval(() => {
    path.rotate(1);
    scene.render();
}, 1000 / 60);
