import {
    Manager,
    Keyframe
} from '../src/cor';
import {
    random_color
} from '../src/utils/helper';

const manager = new Manager();
const scene = manager.new('scene');
const root = scene.root();
const Circle = scene.factory().Circle;
const circle = new Circle();

window.addEventListener('resize', function(event) {
    scene.resize();
});

scene
    .grid(true)
    .fps(60)
    .material()
    .stroke([0, 0, 0, 1])
    .width(1)
    .fill([200, 200, 200, 1]);

scene.render();

circle
    .debug(true)
    .at(200, 0)
    .pivot(200, 0)
    .radius(100)
    .material()
    .fill(random_color());

root
    .append(circle);

scene.timeline().add(
    circle,
    new Keyframe().scale(1, 1),
    new Keyframe().time(4000).scale(3, 3)
);

scene.start();
