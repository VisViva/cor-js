import { expect, should } from 'chai';

import { Node } from '../../src/core/node';
import { Position } from '../../src/structs/position';
import { Rotation } from '../../src/structs/rotation';
import { Angle } from '../../src/enums/angle';

describe('Node tests', () => {
    describe('Common behavior', () => {
        it('Tests work', () => {
            expect(true).to.equal(true);
        });
    });

    describe('Node behavior', () => {
        let node: Node;

        beforeEach(function() {
            node = new Node();
        });

        it('Constructor defaults are correct', () => {
            expect(node.at().x).to.equal(0);
            expect(node.at().y).to.equal(0);
            expect(node.rotate().angle).to.equal(0);
            expect(node.rotate().type).to.equal(Angle.DEGREE);
            expect(node.scale()).to.equal(1);
        });

        it('Position setting works', () => {
            var position: Position = new Position(5, 10);
            expect(node.at(position)).to.equal(node);
            expect(node.at().x).to.equal(5);
            expect(node.at().y).to.equal(10);
        });

        it('Rotation setting works', () => {
            var rotation: Rotation = new Rotation(45, Angle.RADIAN);
            expect(node.rotate(rotation)).to.equal(node);
            expect(node.rotate().angle).to.equal(45);
            expect(node.rotate().type).to.equal(Angle.RADIAN);
        });

        it('Scale setting works', () => {
            expect(node.scale(1.5)).to.equal(node);
            expect(node.scale()).to.equal(1.5);
        });
    });
});
