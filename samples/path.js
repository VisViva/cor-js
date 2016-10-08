import { SceneManager } from '../src/scene_manager';
import { random_color } from '../src/utils/helper';

let scene_manager = new SceneManager();
let scene = scene_manager.new('scene');
const Path = scene.factory().Path;

let path = new Path()
.debug(true)
.at(30, 30)
.linearTo(50, 0)
.linearTo(100, 70)
.linearTo(-20, 50)
.linearTo(50, 30);
// .linearTo(10, 10)
// .quadraticTo(20, 10, 20, 20)
// .linearTo(10, 50)
// .cubicTo(20, 100, 200, 100, 200, 20);

scene.grid(true).root().append(path);

setInterval(() => {
    path.rotate(1);
    scene.render();
}, 1000 / 60);
