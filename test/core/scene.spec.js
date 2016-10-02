'use strict';

import { expect } from 'chai/chai';
import { Scene } from '../../src/core/scene';
import { DepthBuffer } from '../../src/core/depthbuffer';
import { matrix_to_array } from '../../src/utils/helper';

describe('Scene tests', () => {
    describe('Common behavior', () => {
        it('Runs tests', () => {
            expect(true).to.be.equal(true);
        });
    });

    describe('Constructor behavior', () => {
        let scene;

        beforeEach(function() {
            scene = new Scene('scene');
        });

        it('Constructs the name property correctly', () => {
            expect(scene.name()).to.be.equal('scene');
        });

        it('Constructs the root node correctly', () => {
            expect(scene.root()).to.exist;
            expect(scene.root().parent()).to.be.equal(null);
            expect(scene.root().children().array().length).to.be.equal(0);
            expect(scene.root().translate().x).to.be.equal(0);
            expect(scene.root().translate().y).to.be.equal(0);
            expect(scene.root().rotate()).to.be.equal(0);
            expect(scene.root().scale().x).to.be.equal(1);
            expect(scene.root().scale().y).to.be.equal(1);
            expect(matrix_to_array(scene.root().matrixOwn()).join('')).to.be.equal('100010001');
            expect(matrix_to_array(scene.root().matrixCascaded()).join('')).to.be.equal('100010001');
            expect(scene.root().active()).to.be.equal(true);
        });

        it('Constructs the depth buffer correctly', () => {
            expect(scene.depthbuffer().primitives().length).to.be.equal(0);
        });
    });

    describe('Factory behavior', () => {
        let sceneA;
        let sceneB;

        beforeEach(function() {
            sceneA = new Scene('sceneA');
            sceneB = new Scene('sceneB');
        });

        it('Exposes properly linked node object that can be used to communicate with its scene', () => {
            expect(sceneA.factory().Node).to.exist;
            let NodeConstructorA = sceneA.factory().Node;
            let nodeA = new NodeConstructorA();
            let nodeB = new NodeConstructorA();
            let nodeC = new NodeConstructorA();
            let nodeD = new NodeConstructorA();
            expect(nodeA.append(nodeB.append(nodeC.append(nodeD)))).to.be.equal(nodeA);
            expect(sceneA._depthbuffer.primitives().length).to.be.equal(0);
            expect(sceneA.root().append(nodeA)).to.be.equal(sceneA.root());
            expect(sceneA._depthbuffer.primitives().length).to.be.equal(4);
        });

        it('Exposes properly linked node object that can be used to communicate with its scene, even when there are several scenes', () => {
            expect(sceneA.factory().Node).to.exist;
            let NodeConstructorA = sceneA.factory().Node;
            let nodeA = new NodeConstructorA();
            let nodeB = new NodeConstructorA();
            let nodeC = new NodeConstructorA();
            let nodeD = new NodeConstructorA();
            expect(nodeA.append(nodeB.append(nodeC.append(nodeD)))).to.be.equal(nodeA);
            expect(sceneA._depthbuffer.primitives().length).to.be.equal(0);
            expect(sceneA.root().append(nodeA)).to.be.equal(sceneA.root());
            expect(sceneA._depthbuffer.primitives().length).to.be.equal(4);
            expect(sceneB.factory().Node).to.exist;
            let NodeConstructorB = sceneB.factory().Node;
            let nodeE = new NodeConstructorB();
            let nodeF = new NodeConstructorB();
            expect(nodeE.append(nodeF)).to.be.equal(nodeE);
            expect(sceneB._depthbuffer.primitives().length).to.be.equal(0);
            expect(sceneB.root().append(nodeE)).to.be.equal(sceneB.root());
            expect(sceneB._depthbuffer.primitives().length).to.be.equal(2);
        });
    });
});
