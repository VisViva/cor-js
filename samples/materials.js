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
    .fps(60)
    .material()
    .stroke('#000000')
    .width(1)
    .fill('#CCCCCC');

root
    .scale(0.4, 0.4)
    .timed(true);

window.addEventListener('resize', function(event) {
    scene.resize();
});

for (let i = -10; i < 11; ++i) {
    for (let j = -10; j < 11; ++j) {
        const rect = new Rect();
        const path = new Path();
        rect
            .debug(false)
            .translate(150 * i, 150 * j)
            .width(100)
            .height(100)
            .rotate(i * j)
            .timed(true)
            .material()
            .fill(random_color());
        path
            .debug(false)
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

scene.start(() => {
    root.rotate(0.005).children().iterate(
        node => {
            node.rotate(-0.15);
        }
    );
});
