import {
    SceneManager
} from '../src/scene_manager';

let scene_manager = new SceneManager();
let scene = scene_manager.new('scene');
const Rect = scene.factory().Rect;

let rect = new Rect()
    .debug(true)
    .width(100)
    .height(100)
    .rotate(45);

scene
    .grid(true)
    .root()
    .append(rect);

setInterval(() => {
    rect.rotate(1);
    scene.render();
}, 1000 / 60);
