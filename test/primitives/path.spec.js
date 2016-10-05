'use strict';

import { expect } from 'chai/chai';
import { Scene } from '../../src/core/scene';
import { BBox } from '../../src/core/bbox';

describe('Rect tests', () => {
    const Factory = new Scene().factory();
    const Node = Factory.Node;
    const Path = Factory.Path;

    describe('Constructor behavior', () => {
        let path;

        beforeEach(function() {
            path = new Path();
        });

        it('Executes parent constructor correctly', () => {
            expect(path.depth()).to.be.equal(0);
            expect(path.hidden()).to.be.equal(false);
        });
    });

    describe('Hierarchy', () => {
        let path;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            path = new Path();
            path.translate(10, 20);
            nodeB = new Node();
            nodeB.translate(30, 40);
            nodeC = new Node();
            nodeC.translate(50, 60);
        });

        it('Appends children one by one', () => {
            expect(path.append(nodeB)).to.be.equal(path);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(path.children().first()).to.be.equal(nodeB);
            expect(path.children().last()).to.be.equal(nodeB);
            expect(path.children().array().length).to.be.equal(1);
            expect(nodeB.children().first()).to.be.equal(nodeC);
            expect(nodeB.children().last()).to.be.equal(nodeC);
            expect(nodeB.children().array().length).to.be.equal(1);
        });

        it('Appends multiple children', () => {
            expect(path.append(nodeB, nodeC)).to.be.equal(path);
            expect(path.children().first()).to.be.equal(nodeB);
            expect(path.children().last()).to.be.equal(nodeC);
            expect(path.children().array().length).to.be.equal(2);
        });

        it('Sets parent node correctly', () => {
            expect(path.append(nodeB)).to.be.equal(path);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeB.parent()).to.be.equal(path);
            expect(nodeC.parent()).to.be.equal(nodeB);
        });
    });

    describe('Bounding box calculation behavior', () => {
        let path;
        let bbox;
    });
});
