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
    .fps(60)
    .material()
    .stroke('#000000')
    .width(1)
    .fill('#000000');

window.addEventListener('resize', function(event) {
    scene.resize();
});

for (let i = -28; i < 29; ++i) {
    for (let j = -28; j < 29; ++j) {
        const rect = new Rect();
        const path = new Path();
        rect
            .debug(false)
            .width(100)
            .height(100)
            .rotate(i * j)
            .pivot(10*i, 10*j)
            .material()
            .width(Math.abs(i)/2)
            .stroked(true)
            .filled(false)
            .stroke('#00FF00')
            .fill(random_color());
        root
            .append(rect);

        scene.timeline().add(
            rect,
            new Keyframe().rotate(0).scale(1, 1).translate(150 * i, 150 * j),
            new Keyframe().time(1000 + 100*(Math.abs(i))*(Math.abs(j))).scale(Math.random() * 2, Math.random() * 2, 'quad', 'quad').rotate(5 * i, 'quad', 'quad'),
            new Keyframe().time(1000 + 150*(Math.abs(i))*(Math.abs(j))).scale(Math.random() * 3, Math.random() * 3, 'quad', 'quad').rotate(Math.random() * 10 * j, 'quad', 'quad'),
            new Keyframe().time(1000 + 200*(Math.abs(i))*(Math.abs(j))).scale(Math.random() * 4, Math.random() * 4, 'quad', 'quad').rotate(Math.random() * 15 * i, 'quad', 'quad').translate(200 * i, 200 * j, 'elastic', 'linear')
        );
    }
}

scene.timeline().add(
    root,
    new Keyframe().scale(0, 0),
    new Keyframe().time(25000).scale(0.2, 0.2, 'quad', 'quad').rotate(90, 'quad', 'quad'),
    new Keyframe().time(50000).scale(0, 0, 'quad', 'quad')
);

scene.start();
