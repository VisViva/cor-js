'use strict';

import { expect } from 'chai/chai';
import { Scene } from '../../src/core/scene';
import { DepthBuffer } from '../../src/core/depthbuffer';

describe('Depth buffer tests', () => {
    const Primitive = new Scene().factory().Primitive;

    describe('Common behavior', () => {
        it('Runs tests', () => {
            expect(true).to.be.equal(true);
        });
    });

    describe('Constructor behavior', () => {
        let depthbuffer;

        beforeEach(function() {
            depthbuffer = new DepthBuffer();
        });

        it('Array of primitives constructs correctly', () => {
            expect(depthbuffer.primitives().length).to.be.equal(0);
        });
    });

    describe('Buffer altering behavior', () => {
        let depthbuffer;
        let primitiveA, primitiveB, primitiveC, primitiveD;

        beforeEach(function() {
            depthbuffer = new DepthBuffer();
            primitiveA = new Primitive();
            primitiveB = new Primitive();
            primitiveC = new Primitive();
            primitiveD = new Primitive();
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
    });
});
