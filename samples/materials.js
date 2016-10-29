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
const Rect = scene.factory().Rect;

scene
    .grid(true)
    .material()
    .stroke('#000000')
    .width(1)
    .fill('#CCCCCC');

root
    .timed(true);

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
            .rotate(i * j)
            .timed(true)
            .material()
            .fill(random_color());
        path
            .debug(true)
            .cubicTo(50 * i, -50, -15, -15, 50, 50 * j)
            .linearTo(-25, 25)
            .quadraticTo(-50, -50, -50, -50)
            .timed(true)
            .material()
            .stroke(random_color());
        root
            .append(rect.append(path));
    }
}

var fps = 60;

function draw() {
    setTimeout(function() {
        requestAnimationFrame(draw);
        root.rotate(0.05).children().iterate(
            node => {
                node.rotate(-0.05);
            }
        );
        scene_manager.render();
    }, 1000 / fps);
}
draw();
