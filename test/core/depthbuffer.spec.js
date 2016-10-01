'use strict';

import { expect } from 'chai/chai';
import { Scene } from '../../src/core/scene';
import { DepthBuffer } from '../../src/core/depthbuffer';

describe('Depth buffer tests', () => {
    const Node = new Scene().factory().Node;

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
        let nodeA, nodeB;

        beforeEach(function() {
            depthbuffer = new DepthBuffer();
            nodeA = new Node();
            nodeB = new Node();
        });

        it('Appends node with all of its child nodes', () => {
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(depthbuffer.append(nodeA)).to.be.equal(depthbuffer);
            expect(depthbuffer.primitives().length).to.be.equal(2);
        });
    });
});
