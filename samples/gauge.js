import { SceneManager } from '../src/scene_manager';
import { random_color } from '../src/utils/helper';

let sm = new SceneManager();
let scene = sm.new('Scene1');
let Rect = scene.factory().Rect;
let Arc = scene.factory().Arc;
let Sector = scene.factory().Sector;
let rect = new Rect().width(80).height(80);
let arc = new Arc().radius(100).start(0).end(180).ccw(false);
let sector = new Sector().at(0, 0).innerRadius(100).outerRadius(200).start(0).end(180).ccw(true);
let water = new Sector().at(0, 0).innerRadius(100).outerRadius(200).start(180).end(180).ccw(false).depth(2);
scene.root().translate(256, 256).append(sector, water, arc, rect);
rect.translate(-rect.width() / 2, -rect.height() / 2);
var color1 = "gray";
var color2 = random_color();
var color3 = random_color();
var i = false;
sector._color = random_color();
water._color = "#0f0";
let time = 0;
let rT = 0;
let direction = false;

setInterval(() => {
    scene._context.save();
    scene._context.setTransform(1, 0, 0, 1, 0, 0);
    scene._context.fillStyle = color1;
    scene._context.fillRect(0, 0, scene._canvas.width, scene._canvas.height);
    water.end(time % 180 + 180);
    if (direction) {
        if (rT <= 0) {
            direction = false;
        }
        rT -= 0.5;
    } else {
        if (rT >= 99) {
            direction = true;
        }
        rT += 0.5;
    }
    arc.radius(100 + rT);
    rect.translate(40, 40);
    rect.rotate(1);
    rect.translate(-40, -40);
    scene.root().cascade();
    scene.render();
    scene._context.restore();
    time++;
}, 1000 / 60);
