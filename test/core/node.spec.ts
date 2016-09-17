import { expect, should } from 'chai';

import { Node } from '../../src/core/node';
import { Vector } from '../../src/structs/vector';
import { Rotation } from '../../src/structs/rotation';
import { Angle } from '../../src/enums/angle';

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
            expect(node.at().x).to.equal(0);
            expect(node.at().y).to.equal(0);
            expect(node.rotate().angle).to.equal(0);
            expect(node.rotate().type).to.equal(Angle.DEGREE);
            expect(node.scale().x).to.equal(1);
            expect(node.scale().y).to.equal(1);
            expect(node.matrix().join('')).to.equal('100010001');
        });

        it('Sets position', () => {
            var position: Vector = new Vector(5, 10);
            expect(node.at(position)).to.equal(node);
            expect(node.at().x).to.equal(5);
            expect(node.at().y).to.equal(10);
            expect(node.matrix().join('')).to.equal('1000105101');
        });

        it('Sets rotation', () => {
            var rotation: Rotation = new Rotation(45, Angle.RADIAN);
            expect(node.rotate(rotation)).to.equal(node);
            expect(node.rotate().angle).to.equal(45);
            expect(node.rotate().type).to.equal(Angle.RADIAN);
            expect(node.matrix().join('')).to.equal('0.54030227661132810.84147095680236820-0.84147095680236820.54030227661132810001');
        });

        it('Sets scale', () => {
            var scale: Vector = new Vector(1.5, 2);
            expect(node.scale(scale)).to.equal(node);
            expect(node.scale().x).to.equal(1.5);
            expect(node.scale().y).to.equal(2);
            expect(node.matrix().join('')).to.equal('1.500020001');
        });
    });

    describe('Hierarchy', () => {
        let nodeA: Node;
        let nodeB: Node;
        let nodeC: Node;

        beforeEach(function() {
            nodeA = new Node();
            nodeA.at(new Vector(10, 20));
            nodeB = new Node();
            nodeB.at(new Vector(30, 40));
            nodeC = new Node();
            nodeC.at(new Vector(50, 60));
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
    });
});
