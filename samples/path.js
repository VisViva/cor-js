import { SceneManager } from '../src/scene_manager';
import { random_color } from '../src/utils/helper';

let sm = new SceneManager();
let scene = sm.new('Scene1');
const Path = scene.factory().Path;
const color = random_color();

let path = new Path()
.linearTo(10, 10)
.quadraticTo(20, 10, 20, 20)
.linearTo(10, 50)
.cubicTo(20, 100, 200, 100, 200, 20);

scene.root().translate(256, 256).append(path);

setInterval(() => {
    scene._context.save();
    scene._context.setTransform(1, 0, 0, 1, 0, 0);
    scene._context.fillStyle = color;
    scene._context.fillRect(0, 0, scene._canvas.width, scene._canvas.height);
    path.rotate(1);
    scene.root().cascade();
    scene.render();
    scene._context.restore();
}, 1000 / 60);
