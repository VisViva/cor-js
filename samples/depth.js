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
    .scale(1.5, 1.5)
    .timed(true);

window.addEventListener('resize', function(event) {
    scene.resize();
});

const rect = new Rect();
const path = new Path();

rect
    .translate(0, 0)
    .width(600)
    .height(300)
    .depth(-2)
    .timed(true)
    .material()
    .fill(random_color());

root
    .append(rect);

for (let i = -1; i < 2; ++i) {
    const recta = new Rect();
    const patha = new Path();
    recta
        .translate(150 * i, 0)
        .width(160)
        .height(160)
        .depth(i)
        .rotate(45)
        .timed(true)
        .material()
        .fill(random_color());
    patha
        .cubicTo(50 * i, -50, -15, -15, 50, 50)
        .linearTo(-25, 25)
        .depth(i)
        .quadraticTo(-50, -50, -50, -50)
        .timed(true)
        .material()
        .width(10)
        .stroke(random_color());
    rect
        .append(recta.append(patha));
}

scene.start(() => {
    root.children().iterate(
        node => {
            node.rotate(-0.005);
            node.children().iterate(
                node => {
                    node.rotate(-0.05);
                }
            );
        }
    );
});
