import { expect, should } from 'chai';

import { Node } from '../../src/core/node';
import { Position } from '../../src/structs/position';
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
            expect(node.at().x).to.equal(0);
            expect(node.at().y).to.equal(0);
            expect(node.rotate().angle).to.equal(0);
            expect(node.rotate().type).to.equal(Angle.DEGREE);
            expect(node.scale()).to.equal(1);
        });

        it('Sets position', () => {
            var position: Position = new Position(5, 10);
            expect(node.at(position)).to.equal(node);
            expect(node.at().x).to.equal(5);
            expect(node.at().y).to.equal(10);
        });

        it('Sets rotation', () => {
            var rotation: Rotation = new Rotation(45, Angle.RADIAN);
            expect(node.rotate(rotation)).to.equal(node);
            expect(node.rotate().angle).to.equal(45);
            expect(node.rotate().type).to.equal(Angle.RADIAN);
        });

        it('Sets scale', () => {
            expect(node.scale(1.5)).to.equal(node);
            expect(node.scale()).to.equal(1.5);
        });
    });

    describe('Hierarchy', () => {
        let nodeA: Node;
        let nodeB: Node;
        let nodeC: Node;

        beforeEach(function() {
            nodeA = new Node();
            nodeA.at(new Position(10, 20));
            nodeB = new Node();
            nodeB.at(new Position(30, 40));
            nodeC = new Node();
            nodeC.at(new Position(50, 60));
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
    });
});
