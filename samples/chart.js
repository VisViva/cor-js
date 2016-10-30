import {
    SceneManager
} from '../src/scene_manager';
import {
    random_color
} from '../src/utils/helper';

const scene_manager = new SceneManager();
const scene = scene_manager.new('scene', 500, 500);
const root = scene.root();

const Path = scene.factory().Path;
const Rect = scene.factory().Rect;

scene
    .grid(true)
    .fps(60)
    .material()
    .stroke('#000000')
    .width(1)
    .fill('#CCCCCC');
root
    .scale(1, 1)
    .timed(true);

scene.start(() => {
    // root.children().iterate(
    //     node => {
    //         node.rotate(-0.005);
    //         node.children().iterate(
    //             node => {
    //                 node.rotate(-0.05);
    //             }
    //         );
    //     }
    // );
});
