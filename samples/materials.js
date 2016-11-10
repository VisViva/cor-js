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
    .fill('#CCCCCC');

window.addEventListener('resize', function(event) {
    scene.resize();
});

for (let i = -25; i < 26; ++i) {
    for (let j = -18; j < 19; ++j) {
        const rect = new Rect();
        const path = new Path();
        rect
            .debug(false)
            .translate(150 * i, 150 * j)
            .width(100)
            .height(100)
            .rotate(i * j)
            .pivot(10*i, 10*j)
            .material()
            .width(Math.abs(i))
            .stroked(true)
            .filled(false)
            .stroked(random_color());
        root
            .append(rect);

        scene.timeline().add(
            rect,
            new Keyframe().rotate(0, 'linear', 'linear').scale(1, 1).translateX(-200*i),
            new Keyframe().time(Math.random() * 1000 + 100*(Math.abs(i)+1)*(Math.abs(j)+1)).scale(Math.random() * 2, Math.random() * 2, 'elastic', 'linear').rotate(Math.random() * 5 * Math.abs(i)*Math.abs(j), 'elastic', 'linear'),
            new Keyframe().time(Math.random() * 1000 + 150*(Math.abs(i)+1)*(Math.abs(j)+1)).scale(Math.random() * 3, Math.random() * 3, 'elastic', 'linear').rotate(Math.random() * 10 * Math.abs(i)*Math.abs(j), 'elastic', 'linear'),
            new Keyframe().time(Math.random() * 1000 + 200*(Math.abs(i)+1)*(Math.abs(j)+1)).scale(Math.random() * 4, Math.random() * 4, 'elastic', 'linear').rotate(Math.random() * 15 * Math.abs(i)*Math.abs(j), 'elastic', 'linear').translateX(200*i, 'elastic', 'linear')
        );
    }
}

scene.timeline().add(
    root,
    new Keyframe().scale(0.66, 0.66),
    new Keyframe().time(30000).scale(0.16, 0.16, 'quad', 'linear').rotate(180, 'quad', 'linear')
);

scene.start();
