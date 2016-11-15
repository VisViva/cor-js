import {Manager,Material,Keyframe,Easings} from '../src/cor';
import {random_color,random_character} from '../src/utils/helper';
const manager = new Manager();
const scene = manager.new('scene').fps(60);
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
const string = 'CORJS';
for (let row_index = -COLUMN_COUNT_HALF; row_index < COLUMN_COUNT_HALF + 1; ++row_index) {
    for (let column_index = 1; column_index < ROW_COUNT; ++column_index) {
        const text = new Text().size(20).line(20).family('monospace');
        const random = Math.random();
        const text_keyframes = [];
        const material_keyframes = [];
        const material = new Material().filled(true).stroked(true).width(0.1);
        text.scale(0.3 + random * 0.7, 0.3 + random * 0.7).material(material);
        root.append(text);
        for (let keyframe_index = 0; keyframe_index < 5 + random * 2; ++keyframe_index) {
            text_keyframes.push(new Keyframe().time(keyframe_index * 1000).text(random_character()));
            material_keyframes.push(new Keyframe().fill([255, 255, 0, 0]).stroke([0, 0, 0, 0]));
            material_keyframes.push(new Keyframe().time(3000).fill([0, 255, 0,random]).stroke([255, 255, 255, random]));
        }
        if (row_index < -2 || row_index > 2 || column_index < ROW_COUNT / 2 || column_index > ROW_COUNT / 2) {
            material_keyframes.push(new Keyframe().time(10000).fill([0, 0, 0, 0]).stroke([255, 255, 0, 0]));
            text_keyframes.push(new Keyframe().translate(row_index * HORIZONTAL_SPACING, - scene._canvas.height / 4 + column_index * VERTICAL_SPACING));
            text_keyframes.push(new Keyframe().time(15000).translateY(- scene._canvas.height / 2 - column_index * random * 20 * VERTICAL_SPACING - 1000));
        } else {
            text.size(40).line(40).scale(0.5, 0.5).rasterized(true, 400, 400);
            text_keyframes.push(new Keyframe().translateX(row_index * HORIZONTAL_SPACING).translateY(- scene._canvas.height / 2 + column_index * VERTICAL_SPACING + random * 500));
            text_keyframes.push(new Keyframe().time(5000).translateY(- scene._canvas.height / 2 + column_index * VERTICAL_SPACING - scene._canvas.height * 0.8964, Easings.cubic, Easings.linear));
            material_keyframes.push(new Keyframe().time(6000).fill([255, 255, 0, 0.5]).stroke([255, 255, 0, 0]));
            material_keyframes.push(new Keyframe().time(7500).fill([255, 255, 255, 1]));
            material_keyframes.push(new Keyframe().time(10500).fill([255, 255, 255, 1]));
            material_keyframes.push(new Keyframe().time(15000).fill([0, 0, 0, 0]));
            for (var k = -2; k < 3; ++k) {
                if ((row_index === k) && (column_index === ROW_COUNT / 2)) {
                    text_keyframes.push(new Keyframe().time(6500 + (k + 3) * 500).text(string[k + 2]));
                    if (k > 0) text.scale(0.25, 0.25);
                }
            }
        }
        scene.timeline().add(text, ...text_keyframes).add(material, ...material_keyframes);
    }
}
const material = new Material().filled(false).stroked(true);
const rect = new Rect().translateY(- scene._canvas.height + scene._canvas.height * 0.005, Easings.cubic, Easings.linear).width(5.5 * HORIZONTAL_SPACING).height(VERTICAL_SPACING).material(material);
root.append(rect);
scene.timeline().add(rect, new Keyframe().time(6500).scale(1.1, 1.1, Easings.quad, Easings.quad))
.add(material, new Keyframe().stroke([255, 255, 0, 0]), new Keyframe().time(4000).stroke([255, 255, 0, 0]).width(0.001, Easings.linear, Easings.cubic), new Keyframe().time(7000).stroke([255, 255, 255, 1]).width(2, Easings.cubic, Easings.cubic), new Keyframe().time(10500).stroke([255, 255, 255, 1]), new Keyframe().time(15000).stroke([0, 0, 0, 0]))
.add(root, new Keyframe().scale(0.5, 0.5), new Keyframe().time(15000).scale(2.7, 2.7, Easings.quad, Easings.quad));
scene.start();
