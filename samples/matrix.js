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
const root = scene.root().pivot(0, scene._canvas.height).translate(scene._canvas.width / 2, scene._canvas.height / 2);

const COLUMN_COUNT_HALF = 30;
const ROW_COUNT = 20;
const HORIZONTAL_SPACING = scene._canvas.width / COLUMN_COUNT_HALF - scene._canvas.width / 100;
const VERTICAL_SPACING = Math.abs(scene._canvas.height * 0.04);

window.addEventListener('resize', function(event) {
    scene.resize();
    root.translate(scene._canvas.width / 2, scene._canvas.height / 2);
});

for (let row_index = -COLUMN_COUNT_HALF; row_index < COLUMN_COUNT_HALF + 1; ++row_index) {
    for (let column_index = 1; column_index < ROW_COUNT; ++column_index) {
        const text = new Text();
        const random = Math.random();
        const text_keyframes = [];
        const material_keyframes = [];

        const material = new Material()
            .filled(true)
            .stroked(true)
            .size(20)
            .width(0.1);

        text
            .scale(0.5 + random * 0.5, 0.5 + random * 0.5)
            .material(material);

        root
            .append(text);

        for (let keyframe_index = 0; keyframe_index < 5 + Math.random() * 2; ++keyframe_index) {
            text_keyframes.push(
                new Keyframe()
                .time(keyframe_index * 1000)
                .text(get_random_character())
            );
            material_keyframes.push(
                new Keyframe()
                .fill([0, 255, 0, 0])
                .stroke([0, 0, 0, 0])
            );
            material_keyframes.push(
                new Keyframe()
                .time(3000)
                .fill([0, 255, 0, Math.random()])
                .stroke([255, 255, 255, random])
            );
        }

        if (row_index < -3 || row_index > 3 || column_index < ROW_COUNT / 2 - 1 || column_index > ROW_COUNT / 2 + 1) {
            material_keyframes.push(
                new Keyframe()
                .time(10000)
                .fill([0, 0, 0, 0])
                .stroke([0, 255, 0, 0])
            );
            text_keyframes.push(
                new Keyframe()
                .translate(row_index * HORIZONTAL_SPACING, - scene._canvas.height / 4 + column_index * VERTICAL_SPACING)
            );
            text_keyframes.push(
                new Keyframe()
                .time(15000)
                .translateY(- scene._canvas.height / 2 - column_index * random * 20 * VERTICAL_SPACING - 1000)
            );
        } else {
            text.scale(1, 1);
            material_keyframes.push(
                new Keyframe()
                .time(6000)
                .fill([0, 255, 0, 0])
                .stroke([0, 255, 0, 0])
            );
            text_keyframes.push(
                new Keyframe()
                .translateX(row_index * HORIZONTAL_SPACING)
                .translateY(- scene._canvas.height / 2 + column_index * VERTICAL_SPACING + random * 500)
            );
            text_keyframes.push(
                new Keyframe()
                .time(5000)
                .translateY(- scene._canvas.height / 2 + column_index * VERTICAL_SPACING - scene._canvas.height * 0.9, Easings.cubic, Easings.linear)
            );

            if ((row_index === -2) && (column_index === ROW_COUNT / 2)) {
                material_keyframes.push(
                    new Keyframe()
                    .time(6000)
                    .fill([0, 255, 0, 0.8])
                );
                text_keyframes.push(
                    new Keyframe()
                    .time(6700)
                    .text('C')
                );
                material_keyframes.push(
                    new Keyframe()
                    .time(7500)
                    .fill([0, 255, 0, 1])
                );
                material_keyframes.push(
                    new Keyframe()
                    .time(15000)
                    .fill([0, 0, 0, 0])
                );
            }
            if ((row_index === -1) && (column_index === ROW_COUNT / 2)) {
                material_keyframes.push(
                    new Keyframe()
                    .time(6000)
                    .fill([0, 255, 0, 0.8])
                );
                text_keyframes.push(
                    new Keyframe()
                    .time(6900)
                    .text('O')
                );
                material_keyframes.push(
                    new Keyframe()
                    .time(7500)
                    .fill([0, 255, 0, 1])
                );
                material_keyframes.push(
                    new Keyframe()
                    .time(15000)
                    .fill([0, 0, 0, 0])
                );
            }
            if ((row_index === 0) && (column_index === ROW_COUNT / 2)) {
                material_keyframes.push(
                    new Keyframe()
                    .time(6000)
                    .fill([0, 255, 0, 0.8])
                );
                text_keyframes.push(
                    new Keyframe()
                    .time(7100)
                    .text('R')
                );
                material_keyframes.push(
                    new Keyframe()
                    .time(7500)
                    .fill([0, 255, 0, 1])
                );
                material_keyframes.push(
                    new Keyframe()
                    .time(15000)
                    .fill([0, 0, 0, 0])
                );
            }
            if ((row_index === 1) && (column_index === ROW_COUNT / 2)) {
                text.scale(0.7, 0.7);
                material_keyframes.push(
                    new Keyframe()
                    .time(6000)
                    .fill([0, 255, 0, 0.8])
                );
                text_keyframes.push(
                    new Keyframe()
                    .time(7300)
                    .text('j')
                );
                material_keyframes.push(
                    new Keyframe()
                    .time(7500)
                    .fill([0, 255, 0, 1])
                );
                material_keyframes.push(
                    new Keyframe()
                    .time(15000)
                    .fill([0, 0, 0, 0])
                );
            }
            if ((row_index === 2) && (column_index === ROW_COUNT / 2)) {
                text.scale(0.7, 0.7);
                material_keyframes.push(
                    new Keyframe()
                    .time(6000)
                    .fill([0, 255, 0, 0.8])
                );
                text_keyframes.push(
                    new Keyframe()
                    .time(7000)
                    .text('s')
                );
                material_keyframes.push(
                    new Keyframe()
                    .time(7500)
                    .fill([0, 255, 0, 1])
                );
                material_keyframes.push(
                    new Keyframe()
                    .time(15000)
                    .fill([0, 0, 0, 0])
                );
            }
        }

        scene.timeline().add(text, ...text_keyframes).add(material, ...material_keyframes);
    }
}

const material = new Material()
    .filled(false)
    .stroked(true);

const rect = new Rect()
    .translateY(- scene._canvas.height + scene._canvas.height * 0.005, Easings.cubic, Easings.linear)
    .width(scene._canvas.width / 8)
    .height(scene._canvas.height / 19)
    .material(material);

root
    .append(rect);

scene.timeline().add(
    rect,
    new Keyframe()
    .time(6500)
    .scale(1, 1, Easings.quad, Easings.quad)
);

scene.timeline().add(
    material,
    new Keyframe()
    .stroke([0, 255, 0, 0]),
    new Keyframe()
    .time(4000)
    .stroke([0, 255, 0, 0])
    .width(0, Easings.linear, Easings.cubic),
    new Keyframe()
    .time(7000)
    .stroke([0, 255, 0, 1])
    .width(2, Easings.cubic, Easings.cubic),
    new Keyframe()
    .time(15000)
    .stroke([0, 0, 0, 0])
);

scene.timeline().add(
    root,
    new Keyframe()
    .scale(0, 0),
    new Keyframe()
    .time(1000)
    .scale(1, 1, Easings.quad, Easings.quad),
    new Keyframe()
    .time(6500)
    .scale(2, 2, Easings.quad, Easings.quad)
);

scene.start();
//
