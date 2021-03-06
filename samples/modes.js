import {
    Manager,
    Keyframe
} from '../src/cor';
import {
    random_color
} from '../src/utils/helper';

const manager = new Manager();
const scenea = manager.new('scene', window.innerWidth / 3, window.innerHeight);
const roota = scenea.root();
const PathA = scenea.factory().Path;
const RectA = scenea.factory().Rect;

scenea
    .grid(true)
    .fps(60)
    .material()
    .stroke([0, 0, 0, 1])
    .width(1)
    .fill([200, 200, 200, 1]);

scenea.render();

roota
    .scale(0.1, 0.1);

for (let i = -5; i < 6; ++i) {
    for (let j = -5; j < 6; ++j) {
        const recta = new RectA();
        const patha = new PathA();
        recta
            .debug(true)
            .translate(150 * i, 150 * j)
            .width(100)
            .height(100)
            .rotate(i * j)
            .material()
            .fill(random_color());
        patha
            .debug(true)
            .cubic(50 * i, -50, -15, -15, 50, 50 * j)
            .linear(-25, 25)
            .quadratic(-50, -50, -50, -50)
            .material()
            .stroke(random_color());
        roota
            .append(recta.append(patha));
    }
}

let stopped = false;

scenea.timeline().add(
    roota,
    new Keyframe().time(10000).rotate(180)
);

const renderscenea = () => {
    scenea.start();
};

renderscenea();

setInterval(() => {
    if (stopped === false) {
        scenea.stop();
        stopped = true;
    } else {
        renderscenea();
        stopped = false;
    }
}, 2000);


const sceneb = manager.new('sceneb', window.innerWidth / 3, window.innerHeight);
const rootb = sceneb.root();
const PathB = sceneb.factory().Path;
const RectB = sceneb.factory().Rect;

sceneb
    .grid(true)
    .fps(1)
    .material()
    .stroke([0, 0, 0, 1])
    .width(1)
    .fill([200, 200, 200, 1]);

rootb
    .scale(0.1, 0.1);

for (let i = -5; i < 6; ++i) {
    for (let j = -5; j < 6; ++j) {
        const rectb = new RectB();
        const pathb = new PathB();
        rectb
            .debug(true)
            .translate(150 * i, 150 * j)
            .width(100)
            .height(100)
            .rotate(i * j)
            .material()
            .fill(random_color());
        pathb
            .debug(true)
            .cubic(50 * i, -50, -15, -15, 50, 50 * j)
            .linear(-25, 25)
            .quadratic(-50, -50, -50, -50)
            .material()
            .stroke(random_color());
        rootb
            .append(rectb.append(pathb));
    }
}

sceneb.timeline().add(
    rootb,
    new Keyframe().time(10000).rotate(180)
);

sceneb.start();

const scenec = manager.new('scenec', window.innerWidth / 3, window.innerHeight);
const rootc = scenec.root();
const PathC = scenec.factory().Path;
const RectC = scenec.factory().Rect;

scenec
    .grid(true)
    .material()
    .stroke([0, 0, 0, 1])
    .width(1)
    .fill([200, 200, 200, 1]);

rootc
    .scale(0.1, 0.1);

for (let i = -5; i < 6; ++i) {
    for (let j = -5; j < 6; ++j) {
        const rectc = new RectC();
        const pathc = new PathC();
        rectc
            .debug(true)
            .translate(150 * i, 150 * j)
            .width(100)
            .height(100)
            .rotate(i * j)
            .material()
            .fill(random_color());
        pathc
            .debug(true)
            .cubic(50 * i, -50, -15, -15, 50, 50 * j)
            .linear(-25, 25)
            .quadratic(-50, -50, -50, -50)
            .material()
            .stroke(random_color());
        rootc
            .append(rectc.append(pathc));
    }
}

scenec.render();

window.addEventListener('resize', function(event) {
    const width = window.innerWidth / 3;
    const height = window.innerHeight;
    scenea.resize(width, height).render();
    sceneb.resize(width, height).render();
    scenec.resize(width, height).render();
});
