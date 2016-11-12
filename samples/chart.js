import {
    SceneManager,
    Material
} from '../src/scene_manager';
import {
    random_color
} from '../src/utils/helper';

const scene_manager = new SceneManager();

! function chart() {
    const scene = scene_manager.new('scene');
    const root = scene.root();
    const Node = scene.factory().Node;
    const Path = scene.factory().Path;
    const Rect = scene.factory().Rect;

    let grid = new Node();
    let bars = new Node();

    scene.fps(60).material().fill([200, 200, 200, 1]);
    const gridMaterial = new Material().stroke([0, 0, 0, 0.1]).width(1);
    const barMaterial = new Material().stroke([0, 101, 190, 1]).fill([0, 101, 190, 0.69]);

    window.addEventListener('resize', function(event) {
        scene.resize();
        resetScene();
        drawGrid();
        drawBars();
        scene.render();
    });

    function resetScene() {
        scene.depthbuffer().clear();
        root._children.length = 0;
    }

    function drawGrid() {
        for (let i = -5; i < 6; ++i) {
            const line = new Path();
            line.depth(-100).at(-scene._canvas.width / 3, i * scene._canvas.height * 4 / 60).linearTo(scene._canvas.width / 3, -i * scene._canvas.height * 4 / 60).material(gridMaterial);
            root.append(line);
        }
        for (let i = -5; i < 6; ++i) {
            const line = new Path();
            line.depth(-100).at(i * scene._canvas.width * 4 / 60, -scene._canvas.height / 3).linearTo(i * scene._canvas.width * 4 / 60, -scene._canvas.height / 3).material(gridMaterial);
            root.append(line);
        }
    }

    function drawBars() {
        for (let i = -2; i < 3; ++i) {
            const bar = new Rect();
            var height = scene._canvas.height / (Math.random() * 7 + 2);
            bar.debug(true).depth(i).material(barMaterial).at(i * scene._canvas.width * 4 / 30, -scene._canvas.height / 3 + height / 2).width(scene._canvas.width / 30).height(height);
            root.append(bar);
        }
    }

    drawGrid();
    drawBars();

    scene.start(() => {});
}();
