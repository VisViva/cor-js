import {
    SceneManager,
    Keyframe
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
    .scale(0.2, 0.2);

window.addEventListener('resize', function(event) {
    scene.resize();
});

for (let i = -25; i < 26; ++i) {
    for (let j = -15; j < 16; ++j) {
        const rect = new Rect();
        const path = new Path();
        rect
            .debug(false)
            .translate(150 * i, 150 * j)
            .width(100)
            .height(100)
            .rotate(i * j)
            .material()
            .fill(random_color());
        // path
        //     .debug(false)
        //     .cubicTo(50 * i, -50, -15, -15, 50, 50 * j)
        //     .linearTo(-25, 25)
        //     .quadraticTo(-50, -50, -50, -50)
        //     .material()
        //     .stroke(random_color());
        root
            .append(rect);

        scene.timeline().add(
            rect,
            new Keyframe().rotate(0, 'linear', 'linear').scale(1, 1).translateX(-200*i),
            new Keyframe().time(100*(i+1)*(j+1)).scale(2, 2, 'elastic', 'linear').rotate(5 * i*j, 'elastic', 'linear'),
            new Keyframe().time(150*(i+1)*(j+1)).scale(3, 3, 'elastic', 'linear').rotate(10 * i*j, 'elastic', 'linear'),
            new Keyframe().time(200*(i+1)*(j+1)).scale(1.1, 3.5, 'elastic', 'linear').rotate(15 * i*j, 'elastic', 'linear').translateX(200*i, 'elastic', 'linear')
        );
    }
}

// scene.timeline().add(
//     root
// );

scene.start();
