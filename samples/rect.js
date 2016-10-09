import {
    SceneManager
} from '../src/scene_manager';
import {
    random_color
} from '../src/utils/helper';

let scene_manager = new SceneManager();
let scene = scene_manager.new('scene');
const Rect = scene.factory().Rect;
let rect = new Rect().width(100).height(100).debug(true);
scene.grid(true).root().append(rect);

setInterval(() => {
    rect.rotate(1);
    scene.render();
}, 1000 / 60);
