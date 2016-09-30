'use strict';

import { expect } from 'chai/chai';
import { Node } from '../../src/core/node';
import { BBox } from '../../src/core/bbox';

describe('Node tests', () => {
    describe('Common behavior', () => {
        it('Runs tests', () => {
            expect(true).to.be.equal(true);
        });
    });

    describe('Node behavior', () => {
        let node;

        beforeEach(function() {
            node = new Node();
        });

        it('Constructs correctly', () => {
            expect(node.parent()).to.be.equal(null);
            expect(node.children().array().length).to.be.equal(0);
            expect(node.translate().x).to.be.equal(0);
            expect(node.translate().y).to.be.equal(0);
            expect(node.rotate()).to.be.equal(0);
            expect(node.scale().x).to.be.equal(1);
            expect(node.scale().y).to.be.equal(1);
            expect(node.matrix().join('')).to.be.equal('100010001');
            expect(node.active()).to.be.equal(true);
        });

        it('Sets position', () => {
            expect(node.translate(5, 10)).to.be.equal(node);
            expect(node.translate().x).to.be.equal(5);
            expect(node.translate().y).to.be.equal(10);
            expect(node.matrix().join('')).to.be.equal('1000105101');
            expect(node.translate(5, 10)).to.be.equal(node);
            expect(node.translate().x).to.be.equal(10);
            expect(node.translate().y).to.be.equal(20);
            expect(node.matrix().join('')).to.be.equal('10001010201');
        });

        it('Sets rotation', () => {
            expect(node.rotate(45)).to.be.equal(node);
            expect(node.rotate()).to.be.equal(45);
            expect(node.matrix().join('')).to.be.equal('0.70710545778274540.70710808038711550-0.70710808038711550.70710545778274540001');
            expect(node.rotate(45)).to.be.equal(node);
            expect(node.rotate()).to.be.equal(90);
            expect(node.matrix().join('')).to.be.equal('-0.000003691063966471119810-1-0.00000369106396647111980001');
        });

        it('Sets scale', () => {
            expect(node.scale(1.5, 2)).to.be.equal(node);
            expect(node.scale().x).to.be.equal(1.5);
            expect(node.scale().y).to.be.equal(2);
            expect(node.matrix().join('')).to.be.equal('1.500020001');
            expect(node.scale(1.5, 2)).to.be.equal(node);
            expect(node.scale().x).to.be.equal(2.25);
            expect(node.scale().y).to.be.equal(4);
            expect(node.matrix().join('')).to.be.equal('2.2500040001');
        });

        it('Sets activeness status', () => {
            expect(node.active()).to.be.equal(true);
            expect(node.active(false)).to.be.equal(node);
            expect(node.active()).to.be.equal(false);
        });
    });

    describe('Hierarchy', () => {
        let nodeA;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            nodeA = new Node();
            nodeA.translate(10, 20);
            nodeB = new Node();
            nodeB.translate(30, 40);
            nodeC = new Node();
            nodeC.translate(50, 60);
        });

        it('Appends children one by one', () => {
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeA.children().first()).to.be.equal(nodeB);
            expect(nodeA.children().last()).to.be.equal(nodeB);
            expect(nodeA.children().array().length).to.be.equal(1);
            expect(nodeB.children().first()).to.be.equal(nodeC);
            expect(nodeB.children().last()).to.be.equal(nodeC);
            expect(nodeB.children().array().length).to.be.equal(1);
        });

        it('Appends multiple children', () => {
            expect(nodeA.append(nodeB, nodeC)).to.be.equal(nodeA);
            expect(nodeA.children().first()).to.be.equal(nodeB);
            expect(nodeA.children().last()).to.be.equal(nodeC);
            expect(nodeA.children().array().length).to.be.equal(2);
        });

        it('Sets parent node correctly', () => {
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeB.parent()).to.be.equal(nodeA);
            expect(nodeC.parent()).to.be.equal(nodeB);
        });
    });

    describe('Calculation of bounding boxes', () => {
        let nodeA;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            nodeA = new Node();
            nodeB = new Node();
            nodeC = new Node();
        });

        it('Calculates its bound box correctly', () => {
            expect(nodeA.getBBox().x()).to.be.equal(0);
            expect(nodeA.getBBox().y()).to.be.equal(0);
            expect(nodeA.getBBox().width()).to.be.equal(0);
            expect(nodeA.getBBox().height()).to.be.equal(0);
        });

        it('Gets its own bounding box correctly', () => {
            expect(nodeA.getOwnBBox().x()).to.be.equal(0);
            expect(nodeA.getOwnBBox().y()).to.be.equal(0);
            expect(nodeA.getOwnBBox().width()).to.be.equal(0);
            expect(nodeA.getOwnBBox().height()).to.be.equal(0);
        });

        it('Gets all of its child nodes bounding boxes correctly', () => {
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeA.getBBox().x()).to.be.equal(0);
            expect(nodeA.getBBox().y()).to.be.equal(0);
            expect(nodeA.getBBox().width()).to.be.equal(0);
            expect(nodeA.getBBox().height()).to.be.equal(0);
        });
    });
});
