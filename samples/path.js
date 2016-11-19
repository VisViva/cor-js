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
const Path = scene.factory().Path;
const path = new Path();
const closed_path = new Path();
const shape = new Path();

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

path
    .debug(true)
    .translate(-400, 0)
    .cubic(150, 0, -150, 150, -100, -100)
    .linear(20, -90)
    .quadratic(50, 150, 200, -70)
    .material()
    .width(1);

closed_path
    .debug(true)
    .cubic(150, 0, -150, 150, -100, -100)
    .linear(20, -90)
    .quadratic(50, 150, 200, -70)
    .closed(true)
    .material()
    .filled(false)
    .fill(random_color())
    .width(1);

shape
    .debug(true)
    .translate(400, 0)
    .closed(true)
    .material()
    .fill(random_color())
    .width(1);

root
    .append(path, closed_path, shape);

scene.timeline().add(
    path,
    new Keyframe().time(1000).rotate(180)
);

scene.timeline().add(
    closed_path,
    new Keyframe().time(2000).rotate(180)
);

scene.timeline().add(
    shape,
    new Keyframe().segments([[150, 0, -150, -150, -100, 100], [20, 90], [50, -150, 200, 70]]),
    new Keyframe().time(3000).rotate(180).segments([[-150, 0, -100, 150, 100, 150], [-90, -20], [-50, 150, -200, -70]])
);



scene.start();
