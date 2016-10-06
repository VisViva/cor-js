import { SceneManager } from '../src/scene_manager';
import { random_color } from '../src/utils/helper';

let sm = new SceneManager();
let scene = sm.new('Scene1');
const Rect = scene.factory().Rect;
let rect = new Rect().width(80).height(80);
scene.root().translate(256, 256).append(rect);
rect.translate(-rect.width() / 2, -rect.height() / 2);
const color = random_color();

setInterval(() => {
    scene._context.save();
    scene._context.setTransform(1, 0, 0, 1, 0, 0);
    scene._context.fillStyle = color;
    scene._context.fillRect(0, 0, scene._canvas.width, scene._canvas.height);
    rect.translate(40, 40);
    rect.rotate(1);
    rect.translate(-40, -40);
    scene.root().cascade();
    scene.render();
    scene._context.restore();
}, 1000 / 60);
