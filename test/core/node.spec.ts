import { expect, should } from 'chai';

import { Node } from '../../src/core/node';
import { Vector } from '../../src/structs/vector';
import { BBox } from '../../src/core/bbox';

describe('Node tests', () => {
    describe('Common behavior', () => {
        it('Runs tests', () => {
            expect(true).to.equal(true);
        });
    });

    describe('Node behavior', () => {
        let node: Node;

        beforeEach(function() {
            node = new Node();
        });

        it('Constructs correctly', () => {
            expect(node.parent()).to.equal(null);
            expect(node.children().array().length).to.equal(0);
            expect(node.translate().x).to.equal(0);
            expect(node.translate().y).to.equal(0);
            expect(node.rotate()).to.equal(0);
            expect(node.scale().x).to.equal(1);
            expect(node.scale().y).to.equal(1);
            expect(node.matrix().join('')).to.equal('100010001');
            expect(node.active()).to.equal(true);
            expect(node.id()).to.equal(null);
        });

        it('Sets id', () => {
            expect(node.id('test')).to.equal(node);
            expect(node.id()).to.equal('test');
        });

        it('Sets position', () => {
            const position: Vector = new Vector(5, 10);
            expect(node.translate(position)).to.equal(node);
            expect(node.translate().x).to.equal(5);
            expect(node.translate().y).to.equal(10);
            expect(node.matrix().join('')).to.equal('1000105101');
            expect(node.translate(position)).to.equal(node);
            expect(node.translate().x).to.equal(10);
            expect(node.translate().y).to.equal(20);
            expect(node.matrix().join('')).to.equal('10001010201');
        });

        it('Sets rotation', () => {
            expect(node.rotate(45)).to.equal(node);
            expect(node.rotate()).to.equal(45);
            expect(node.matrix().join('')).to.equal('0.70710545778274540.70710808038711550-0.70710808038711550.70710545778274540001');
            expect(node.rotate(45)).to.equal(node);
            expect(node.rotate()).to.equal(90);
            expect(node.matrix().join('')).to.equal('-0.000003691063966471119810-1-0.00000369106396647111980001');
        });

        it('Sets scale', () => {
            const scale: Vector = new Vector(1.5, 2);
            expect(node.scale(scale)).to.equal(node);
            expect(node.scale().x).to.equal(1.5);
            expect(node.scale().y).to.equal(2);
            expect(node.matrix().join('')).to.equal('1.500020001');
            expect(node.scale(scale)).to.equal(node);
            expect(node.scale().x).to.equal(2.25);
            expect(node.scale().y).to.equal(4);
            expect(node.matrix().join('')).to.equal('2.2500040001');
        });

        it('Sets activeness status', () => {
            expect(node.active()).to.equal(true);
            expect(node.active(false)).to.equal(node);
            expect(node.active()).to.equal(false);
        });
    });

    describe('Hierarchy', () => {
        let nodeA: Node;
        let nodeB: Node;
        let nodeC: Node;

        beforeEach(function() {
            nodeA = new Node();
            nodeA.translate(new Vector(10, 20));
            nodeB = new Node();
            nodeB.translate(new Vector(30, 40));
            nodeC = new Node();
            nodeC.translate(new Vector(50, 60));
        });

        it('Appends children one by one', () => {
            expect(nodeA.append(nodeB)).to.equal(nodeA);
            expect(nodeB.append(nodeC)).to.equal(nodeB);
            expect(nodeA.children().first()).to.equal(nodeB);
            expect(nodeA.children().last()).to.equal(nodeB);
            expect(nodeA.children().array().length).to.equal(1);
            expect(nodeB.children().first()).to.equal(nodeC);
            expect(nodeB.children().last()).to.equal(nodeC);
            expect(nodeB.children().array().length).to.equal(1);
        });

        it('Appends multiple children', () => {
            expect(nodeA.append(nodeB, nodeC)).to.equal(nodeA);
            expect(nodeA.children().first()).to.equal(nodeB);
            expect(nodeA.children().last()).to.equal(nodeC);
            expect(nodeA.children().array().length).to.equal(2);
        });

        it('Sets parent node correctly', () => {
            expect(nodeA.append(nodeB)).to.equal(nodeA);
            expect(nodeB.append(nodeC)).to.equal(nodeB);
            expect(nodeB.parent()).to.equal(nodeA);
            expect(nodeC.parent()).to.equal(nodeB);
        });

        it('Calculates its bound box correctly', () => {
            expect(nodeA.getBBox().x()).to.equal(0);
            expect(nodeA.getBBox().y()).to.equal(0);
            expect(nodeA.getBBox().width()).to.equal(0);
            expect(nodeA.getBBox().height()).to.equal(0);
        });
    });

    describe('Selectors', () => {
        let nodeA: Node;
        let nodeB: Node;
        let nodeC: Node;

        beforeEach(function() {
            nodeA = new Node();
            nodeB = new Node();
            nodeC = new Node();
        });

        it('Selects by id', () => {
            nodeA.id('nodea').append(nodeB.id('nodeb').append(nodeC.id('nodec')));
            expect(nodeA.select('').array().length).to.be.equal(0);
            expect(nodeA.select('#').array().length).to.be.equal(0);
            expect(nodeA.select('nodea').array().length).to.be.equal(0);
            expect(nodeA.select('#nodea').array().length).to.be.equal(1);
            expect(nodeA.select('#nodea').first().id()).to.be.equal('nodea');
            expect(nodeA.select('nodeb').array().length).to.be.equal(0);
            expect(nodeA.select('#nodeb').array().length).to.be.equal(1);
            expect(nodeA.select('#nodeb').first().id()).to.be.equal('nodeb');
            expect(nodeA.select('nodec').array().length).to.be.equal(0);
            expect(nodeA.select('#nodec').array().length).to.be.equal(1);
            expect(nodeA.select('#nodec').first().id()).to.be.equal('nodec');
        });
    });

    describe('Calculation of bounding boxes', () => {
        let nodeA: Node;
        let nodeB: Node;
        let nodeC: Node;

        beforeEach(function() {
            nodeA = new Node();
            nodeB = new Node();
            nodeC = new Node();
        });

        it('Gets its own bounding box correctly', () => {
            expect(nodeA.getOwnBBox().x()).to.be.equal(0);
            expect(nodeA.getOwnBBox().y()).to.be.equal(0);
            expect(nodeA.getOwnBBox().width()).to.be.equal(0);
            expect(nodeA.getOwnBBox().height()).to.be.equal(0);
        });

        it('Gets all of its child nodes bounding boxes correctly', () => {
            expect(nodeA.append(nodeB)).to.equal(nodeA);
            expect(nodeB.append(nodeC)).to.equal(nodeB);
            expect(nodeA.getBBox().x()).to.be.equal(0);
            expect(nodeA.getBBox().y()).to.be.equal(0);
            expect(nodeA.getBBox().width()).to.be.equal(0);
            expect(nodeA.getBBox().height()).to.be.equal(0);
        });
    });
});
