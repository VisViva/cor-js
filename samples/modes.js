import {
    SceneManager
} from '../src/scene_manager';
import {
    random_color
} from '../src/utils/helper';

const scene_manager = new SceneManager();
const scenea = scene_manager.new('scene', 500, 500);
const roota = scenea.root();
const PathA = scenea.factory().Path;
const RectA = scenea.factory().Rect;

scenea
    .grid(true)
    .fps(60)
    .material()
    .stroke('#000000')
    .width(1)
    .fill('#CCCCCC');

scenea.render();

roota
    .scale(0.1, 0.1)
    .timed(true);

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
            .timed(true)
            .material()
            .fill(random_color());
        patha
            .debug(true)
            .cubicTo(50 * i, -50, -15, -15, 50, 50 * j)
            .linearTo(-25, 25)
            .quadraticTo(-50, -50, -50, -50)
            .timed(true)
            .material()
            .stroke(random_color());
        roota
            .append(recta.append(patha));
    }
}

scenea.start(() => {
  roota.rotate(0.005).children().iterate(
      node => {
          node.rotate(-0.15);
      }
  );
});

const sceneb = scene_manager.new('sceneb', 500, 500);
const rootb = sceneb.root();
const PathB = sceneb.factory().Path;
const RectB = sceneb.factory().Rect;

sceneb
    .grid(true)
    .fps(1)
    .material()
    .stroke('#000000')
    .width(1)
    .fill('#333333');

rootb
    .scale(0.1, 0.1)
    .timed(true);

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
            .timed(true)
            .material()
            .fill(random_color());
        pathb
            .debug(true)
            .cubicTo(50 * i, -50, -15, -15, 50, 50 * j)
            .linearTo(-25, 25)
            .quadraticTo(-50, -50, -50, -50)
            .timed(true)
            .material()
            .stroke(random_color());
        rootb
            .append(rectb.append(pathb));
    }
}

sceneb.start(() => {
  rootb.rotate(0.005).children().iterate(
      node => {
          node.rotate(-0.15);
      }
  );
});

const scenec = scene_manager.new('scenec', 500, 500);
const rootc = scenec.root();
const PathC = scenec.factory().Path;
const RectC = scenec.factory().Rect;

scenec
    .grid(true)
    .material()
    .stroke('#000000')
    .width(1)
    .fill('#888888');

rootc
    .scale(0.1, 0.1)
    .timed(true);

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
            .timed(true)
            .material()
            .fill(random_color());
        pathc
            .debug(true)
            .cubicTo(50 * i, -50, -15, -15, 50, 50 * j)
            .linearTo(-25, 25)
            .quadraticTo(-50, -50, -50, -50)
            .timed(true)
            .material()
            .stroke(random_color());
        rootc
            .append(rectc.append(pathc));
    }
}

rootc.rotate(0.005).children().iterate(
    node => {
        node.rotate(-0.15);
    }
);

scenec.render();scenec.render();
