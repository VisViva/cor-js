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

    let grid = new Node().timed(true);
    let bars = new Node().timed(true);

    scene.fps(60).material().fill('#DDD');
    root.timed(true);
    const gridMaterial = new Material().stroke('rgba(0, 0, 0, 0.1)').width(1);
    const barMaterial = new Material().stroke('rgba(0, 101, 190, 1)').fill('rgba(0, 101, 190, 0.69)');

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
        for (let i = 0; i < 11; ++i) {
            const line = new Path();
            line.debug(true).depth(-100).at(0, i * scene._canvas.height * 4 / 60).linearTo(scene._canvas.width * 4 / 6, i * scene._canvas.height * 4 / 60).material(gridMaterial);
            root.append(line);
        }
        for (let i = 0; i < 11; ++i) {
            const line = new Path();
            line.debug(true).depth(-100).at(i * scene._canvas.width * 4 / 60, 0).linearTo(i * scene._canvas.width * 4 / 60, scene._canvas.height * 4 / 6).material(gridMaterial);
            root.append(line);
        }
    }

    function drawBars() {
        for (let i = 0; i < 5; ++i) {
            const bar = new Rect();
            var height = scene._canvas.height / (Math.random() * 7 + 2);
            bar.debug(true).depth(i).material(barMaterial).at(i * scene._canvas.width * 4 / 30 + scene._canvas.width * 2 / 30, - scene._canvas.height * 4 / 6 + height / 2).width(scene._canvas.width / 30).height(height);
            root.append(bar);
        }
    }

    drawGrid();
    drawBars();

    scene.start(() => {
      //root.rotate(0.01);
    });
}();
