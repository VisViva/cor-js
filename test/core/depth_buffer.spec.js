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

describe('Depth buffer tests', () => {
    const scene = new Scene();
    const depthbuffer = scene.depthbuffer();
    const Primitive = scene.factory().Primitive;

    describe('Constructor behavior', () => {
        let depthbuffer;

        beforeEach(function() {
            depthbuffer = new DepthBuffer();
        });

        it('Constructs the array of primitives correctly', () => {
            expect(depthbuffer.primitives().length).to.be.equal(0);
        });
    });

    describe('Buffer altering behavior', () => {
        let primitiveA, primitiveB, primitiveC, primitiveD, primitiveE;

        beforeEach(function() {
            depthbuffer.empty();
            primitiveA = new Primitive().depth(-2);
            primitiveB = new Primitive().depth(-1);
            primitiveC = new Primitive().depth(0);
            primitiveD = new Primitive().depth(1);
            primitiveE = new Primitive().depth(2);
        });

        it('Appends a node with all of its child nodes', () => {
            expect(primitiveA.append(primitiveB)).to.be.equal(primitiveA);
            expect(depthbuffer.append(primitiveA)).to.be.equal(depthbuffer);
            expect(depthbuffer.primitives().length).to.be.equal(2);
        });

        it('Appends nodes in a sorted fashion', () => {
            primitiveA.depth(10);
            primitiveB.depth(0);
            primitiveC.depth(-15);
            primitiveD.depth(20);
            expect(primitiveA.append(primitiveB).append(primitiveC.append(primitiveD))).to.be.equal(primitiveA);
            expect(depthbuffer.append(primitiveA)).to.be.equal(depthbuffer);
            expect(depthbuffer.primitives().length).to.be.equal(4);
            expect(depthbuffer.primitives()[0].depth()).to.be.equal(-15);
            expect(depthbuffer.primitives()[1].depth()).to.be.equal(0);
            expect(depthbuffer.primitives()[2].depth()).to.be.equal(10);
            expect(depthbuffer.primitives()[3].depth()).to.be.equal(20);
        });

        it('Clears itself correctly', () => {
            expect(primitiveA.append(primitiveB)).to.be.equal(primitiveA);
            expect(depthbuffer.append(primitiveA)).to.be.equal(depthbuffer);
            expect(depthbuffer.primitives().length).to.be.equal(2);
            expect(depthbuffer.empty()).to.be.equal(depthbuffer);
            expect(depthbuffer.primitives().length).to.be.equal(0);
        });

        it('Raises the depth to the maximum dynamically correctly', () => {
            expect(depthbuffer.append(primitiveA)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveB)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveC)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveD)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveE)).to.be.equal(depthbuffer);
            expect(primitiveA.depth(5)).to.be.equal(primitiveA);
            expect(depthbuffer._primitives[4]._depth).to.be.equal(5);
        });

        it('Lowers the depth to the mininum dynamically correctly', () => {
            expect(depthbuffer.append(primitiveA)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveB)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveC)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveD)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveE)).to.be.equal(depthbuffer);
            expect(primitiveA.depth(-5)).to.be.equal(primitiveA);
            expect(depthbuffer._primitives[0]._depth).to.be.equal(-5);
        });

        it('Resets the depth to itself dynamically correctly', () => {
            expect(depthbuffer.append(primitiveA)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveB)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveC)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveD)).to.be.equal(depthbuffer);
            expect(depthbuffer.append(primitiveE)).to.be.equal(depthbuffer);
            expect(primitiveA.depth(-2)).to.be.equal(primitiveA);
            expect(depthbuffer._primitives[0]._depth).to.be.equal(-2);
        });
    });
});
