import { SceneManager } from '../src/scene_manager';
import { random_color } from '../src/utils/helper';

let scene_manager = new SceneManager();
let scene = scene_manager.new('scene');
const Path = scene.factory().Path;

let path = new Path()
.debug(true)
.at(20, 30)
.linearTo(50, 50)
.quadraticTo(-100, 140, 200, 100)
.linearTo(150, 50)
.quadraticTo(130, 80, 120, 160);
// .linearTo(100, 70)
// .linearTo(-20, 50)
// .linearTo(50, 30);
// .linearTo(10, 10)
// .linearTo(10, 50)
// .cubicTo(20, 100, 200, 100, 200, 20);

scene.grid(true).root().append(path);


path.rotate(0);
scene.render();

setInterval(() => {
   path.rotate(1);
   scene.render();
}, 1000 / 60);
