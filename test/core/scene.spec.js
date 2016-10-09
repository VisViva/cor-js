'use strict';

import {
    expect
} from 'chai/chai';
import {
    Scene
} from '../../src/core/scene';
import {
    DepthBuffer
} from '../../src/core/depth_buffer';
import {
    matrix_to_array
} from '../../src/utils/helper';

describe('Scene tests', () => {
    describe('Constructor behavior', () => {
        let scene;

        beforeEach(function() {
            scene = new Scene('scene');
        });

        it('Constructs the name property correctly', () => {
            expect(scene.name()).to.be.equal('scene');
        });

        it('Constructs the grid flag correctly', () => {
            expect(scene.grid()).to.be.equal(false);
        });

        it('Constructs the root node correctly', () => {
            expect(scene.root()).to.exist;
            expect(scene.root().parent()).to.be.equal(null);
            expect(scene.root().children().array().length).to.be.equal(0);
            expect(scene.root().translate().x).to.be.equal(scene._canvas.width >>> 1);
            expect(scene.root().translate().y).to.be.equal(scene._canvas.height >>> 1);
            expect(scene.root().rotate()).to.be.equal(0);
            expect(scene.root().scale().x).to.be.equal(1);
            expect(scene.root().scale().y).to.be.equal(1);
            expect(matrix_to_array(scene.root().matrixOwn()).join('')).to.be.equal('100010' + (scene._canvas.width >>> 1) + '' + (scene._canvas.height >>> 1) + '1');
            expect(matrix_to_array(scene.root().matrixCascaded()).join('')).to.be.equal('100010001');
            expect(scene.root().active()).to.be.equal(true);
        });

        it('Constructs the depth buffer correctly', () => {
            expect(scene.depthbuffer().primitives().length).to.be.equal(0);
        });
    });

    describe('Property setting behavior', () => {
        let scene;

        beforeEach(function() {
            scene = new Scene('scene');
        });

        it('Resizes correctly', () => {
            expect(scene.resize(100, 200)).to.be.equal(scene);
            expect(scene._canvas.width).to.be.equal(100);
            expect(scene._canvas.height).to.be.equal(200);
            expect(scene.root().translate().x).to.be.equal(50);
            expect(scene.root().translate().y).to.be.equal(100);
            expect(scene.root().rotate()).to.be.equal(0);
            expect(scene.root().scale().x).to.be.equal(1);
            expect(scene.root().scale().y).to.be.equal(1);
        });

        it('Sets the grids visibility flag correctly', () => {
            expect(scene.grid(true)).to.be.equal(scene);
            expect(scene.grid()).to.be.equal(true);
        });
    });

    describe('Factory behavior', () => {
        let sceneA;
        let sceneB;

        beforeEach(function() {
            sceneA = new Scene('sceneA');
            sceneB = new Scene('sceneB');
        });

        it('Assures that simple nodes are not getting appended to it', () => {
            expect(sceneA.factory().Node).to.exist;
            let NodeConstructorA = sceneA.factory().Node;
            let nodeA = new NodeConstructorA();
            let nodeB = new NodeConstructorA();
            let nodeC = new NodeConstructorA();
            let nodeD = new NodeConstructorA();
            expect(nodeA.append(nodeB.append(nodeC.append(nodeD)))).to.be.equal(nodeA);
            expect(sceneA._depthbuffer.primitives().length).to.be.equal(0);
            expect(sceneA.root().append(nodeA)).to.be.equal(sceneA.root());
            expect(sceneA._depthbuffer.primitives().length).to.be.equal(0);
        });

        it('Exposes properly linked primitive that can be used to communicate with its scene', () => {
            expect(sceneA.factory().Primitive).to.exist;
            let PrimitiveConstructorA = sceneA.factory().Primitive;
            let primitiveA = new PrimitiveConstructorA();
            let primitiveB = new PrimitiveConstructorA();
            let primitiveC = new PrimitiveConstructorA();
            let primitiveD = new PrimitiveConstructorA();
            expect(primitiveA.append(primitiveB.append(primitiveC.append(primitiveD)))).to.be.equal(primitiveA);
            expect(sceneA._depthbuffer.primitives().length).to.be.equal(0);
            expect(sceneA.root().append(primitiveA)).to.be.equal(sceneA.root());
            expect(sceneA._depthbuffer.primitives().length).to.be.equal(4);
        });

        it('Exposes properly linked primitive that can be used to communicate with its scene, even when there are several scenes', () => {
            expect(sceneA.factory().Primitive).to.exist;
            let PrimitiveConstructorA = sceneA.factory().Primitive;
            let primitiveA = new PrimitiveConstructorA();
            let primitiveB = new PrimitiveConstructorA();
            let primitiveC = new PrimitiveConstructorA();
            let primitiveD = new PrimitiveConstructorA();
            expect(primitiveA.append(primitiveB.append(primitiveC.append(primitiveD)))).to.be.equal(primitiveA);
            expect(sceneA._depthbuffer.primitives().length).to.be.equal(0);
            expect(sceneA.root().append(primitiveA)).to.be.equal(sceneA.root());
            expect(sceneA._depthbuffer.primitives().length).to.be.equal(4);
            expect(sceneB.factory().Primitive).to.exist;
            let PrimitiveConstructorB = sceneB.factory().Primitive;
            let primitiveE = new PrimitiveConstructorB();
            let primitiveF = new PrimitiveConstructorB();
            expect(primitiveE.append(primitiveF)).to.be.equal(primitiveE);
            expect(sceneB._depthbuffer.primitives().length).to.be.equal(0);
            expect(sceneB.root().append(primitiveE)).to.be.equal(sceneB.root());
            expect(sceneB._depthbuffer.primitives().length).to.be.equal(2);
        });
    });

    describe('Rendering behavior', () => {
        let Primitive;
        let scene;

        beforeEach(function() {
            scene = new Scene('scene');
            Primitive = scene.factory().Primitive;
        });

        it('Calls the render function of each of the primitives present in the depth buffer upon render', () => {
            let primitiveA = new Primitive();
            let primitiveB = new Primitive();
            let primitiveC = new Primitive();
            const spyA = sinon.spy(primitiveA, 'render');
            const spyB = sinon.spy(primitiveB, 'render');
            const spyC = sinon.spy(primitiveC, 'render');
            expect(primitiveA.append(primitiveB)).to.be.equal(primitiveA);
            expect(primitiveB.append(primitiveC)).to.be.equal(primitiveB);
            expect(scene.root().append(primitiveA)).to.be.equal(scene.root());
            expect(scene._depthbuffer.primitives().length).to.be.equal(3);
            expect(scene.render()).to.be.equal(scene);
            expect(spyA.calledOnce).to.be.equal(true);
            expect(spyB.calledOnce).to.be.equal(true);
            expect(spyC.calledOnce).to.be.equal(true);
        });
    });
});
