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

for (let i = -4; i < 5; ++i) {
    for (let j = -4; j < 5; ++j) {
        const rect = new Rect();
        const path = new Path();
        rect
            .debug(true)
            .translate(150 * i, 150 * j)
            .width(100)
            .height(100)
            .rotate(45 * i * j);
        path
            .debug(true)
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
