import {
    SceneManager
} from '../src/scene_manager';

let scene_manager = new SceneManager();
let scene = scene_manager.new('scene').grid(true);
const Path = scene.factory().Path;
const Rect = scene.factory().Rect;

for (let i = -1; i < 2; ++i) {
    for (let j = -1; j < 2; ++j) {
        const rect = new Rect();
        const path = new Path();
        rect
            .debug(false)
            .translate(150 * i, 150 * j)
            .width(100)
            .height(100)
            .scale(0.2 * Math.abs(i) + 0.8, 0.2  *Math.abs(i) + 0.8)
            .rotate(45 * i * j);
        path
            .debug(false)
            .cubicTo(50, -50, -15, -15, 50, 50)
            .linearTo(-25, 25)
            .quadraticTo(-50, -50, -50, -50);
        scene
            .root()
            .append(rect.append(path));
    }
}

setInterval(() => {
    scene.root().children().iterate(
        node => {
            node.rotate(1);
        }
    );
    scene.render();
}, 1000 / 60);
