/**
 * Created by rlapin on 10/4/16.
 */
// Playground code
import {random_color} from '../../src/utils/helper';
import {SceneManager} from '../../src/scene.manager';
let sm = new SceneManager();
let scene = sm.new('Scene1');
let Rect = scene.factory().Rect;
let Arc = scene.factory().Arc;
let Sector = scene.factory().Sector;
let rect = new Rect().width(20).height(10);
let rect2 = new Rect().width(120).height(60);
let rect3 = new Rect().width(120).height(60);
let arc = new Arc().at(50, 50).radius(100).start(0).end(180).ccw(true);
let sector = new Sector().at(0, 0).innerRadius(100).outerRadius(200).start(0).end(180).ccw(true);
let water = new Sector().at(0, 0).innerRadius(100).outerRadius(200).start(180).end(180).ccw(false);
console.log(water.id);
scene.root().translate(256, 256).append(sector.append(water));
rect.translate(30, 50);
rect2.translate(-30, 30).scale(3, 3);
rect3.translate(20, 20).scale(5, 5);

var color1 = "gray";
var color2 = random_color();
var color3 = random_color();
var i = false;
sector._color = random_color();
water._color = "#0f0";
var time = 0;
setInterval(() => {
    scene._context.save();
    scene._context.setTransform(1, 0, 0, 1, 0, 0);
    scene._context.fillStyle = color1;
    scene._context.fillRect(0, 0, scene._canvas.width, scene._canvas.height);
    //sector.translate(50,50);
    //sector.rotate(1);
    water.end(time%180+180);
    scene.root().cascade();
   // scene.render();
    scene._context.restore();
    time++;
}, 1000 / 60);