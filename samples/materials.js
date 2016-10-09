import {
    SceneManager
} from '../src/scene_manager';

let scene_manager = new SceneManager();
let scene = scene_manager.new('scene').grid(true);
const Path = scene.factory().Path;
const Rect = scene.factory().Rect;

window.addEventListener('resize', function(event) {
    scene.resize();
});

for (let i = -2; i < 3; ++i) {
    for (let j = -2; j < 3; ++j) {
        const rect = new Rect();
        const path = new Path();
        rect
            .debug(true)
            .translate(150 * i, 150 * j)
            .width(100)
            .height(100)
            .rotate(i * j);
        path
            .debug(true)
            .cubicTo(50 * i, -50, -15, -15, 50, 50 * j)
            .linearTo(-25, 25)
            .quadraticTo(-50, -50, -50, -50);
        scene
            .root()
            .scale(0.99, 0.99)
            .append(rect.append(path));
    }
}

setInterval(() => {
    scene.root().rotate(0.1).children().iterate(
        node => {
            node.rotate(1);
        }
    );
    scene.render();
}, 1000 / 60);
