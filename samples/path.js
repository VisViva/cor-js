import {
    SceneManager
} from '../src/scene_manager';

let scene_manager = new SceneManager();
let scene = scene_manager.new('scene');
const Path = scene.factory().Path;

let path = new Path()
    .debug(true)
    .cubicTo(150, 0, -150, -150, -100, 100)
    .linearTo(20, 90)
    .quadraticTo(50, -150, 200, 70);

scene
    .grid(true)
    .root()
    .append(path);

setInterval(() => {
    path.rotate(1);
    scene.render();
}, 1000 / 60);
