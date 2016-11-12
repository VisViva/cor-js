import {
    SceneManager,
    Material,
    Keyframe,
    Easings
} from '../src/scene_manager';
import {
    random_color,
    get_random_character
} from '../src/utils/helper';

const scene_manager = new SceneManager();
const scene = scene_manager.new('scene').fps(60);
const Text = scene.factory().Text;
const Rect = scene.factory().Rect;
const root = scene.root().translate(scene._canvas.width / 2, scene._canvas.height / 2);

const COLUMN_COUNT_HALF = 10;
const HORIZONTAL_SPACING = scene._canvas.width / COLUMN_COUNT_HALF - scene._canvas.width / 100;
const VERTICAL_SPACING = 50;

window.addEventListener('resize', function(event) {
    scene.resize();
    root.translate(scene._canvas.width / 2, scene._canvas.height / 2);
});

for (let row_index = -COLUMN_COUNT_HALF; row_index < COLUMN_COUNT_HALF + 1; ++row_index) {
    for (let column_index = 1; column_index < 50; ++column_index) {
        const text = new Text();
        const random = Math.random();
        const text_keyframes = [];
        const material_keyframes = [];

        const material = new Material()
            .filled(true)
            .stroked(true)
            .size(20);

        text
            .translate(row_index * HORIZONTAL_SPACING, - column_index * VERTICAL_SPACING * random * 100)
            .material(material);

        root
            .append(text);

        for (let keyframe_index = 0; keyframe_index < 15 + Math.random() * 30; ++keyframe_index) {
            text_keyframes.push(
                new Keyframe()
                .time(keyframe_index * 1000)
                .text(get_random_character())
            );

            material_keyframes.push(
              new Keyframe()
                  .stroke([0, 255, 0, Math.random()])
                  .fill([0, 0, 0, Math.random()])
            );
        }

        text_keyframes.push(
            new Keyframe()
            .time(20000)
            .translateY(- column_index * VERTICAL_SPACING * random * 10 - 1000)
        );

        scene.timeline().add(text, ...text_keyframes).add(material, ...material_keyframes);
    }
}

scene.start();
