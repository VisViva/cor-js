import { expect, should } from 'chai';

import { Node } from '../../src/core/node';
import { BBox } from '../../src/core/bbox';
import { Rect } from '../../src/primitives/rect';
import { Vector } from '../../src/structs/vector';

describe('Primitive - Rect tests', () => {
    describe('Constructor behavior', () => {
        let rect: Rect;

        beforeEach(function() {
            rect = new Rect();
        });

        it('Executes parent constructor correctly', () => {
            expect(rect.depth()).to.equal(0);
            expect(rect.hidden()).to.equal(false);
        });

        it('Executes own constructor correctly', () => {
            expect(rect.width()).to.equal(0);
            expect(rect.height()).to.equal(0);
        });
    });

    describe('Property setting behavior', () => {
        let rect: Rect;

        beforeEach(function() {
            rect = new Rect();
        });

        it('Sets id correctly', () => {
            expect(rect.id('id1')).to.equal(rect);
            expect(rect.id()).to.equal('id1');
        });

        it('Sets rotation correctly', () => {
            expect(rect.rotate(45)).to.equal(rect);
            expect(rect.rotate()).to.equal(45);
        });

        it('Sets position correctly', () => {
            expect(rect.translate(10, 20)).to.equal(rect);
            expect(rect.translate().x).to.equal(10);
            expect(rect.translate().y).to.equal(20);
        });

        it('Sets scale correctly', () => {
            expect(rect.scale(10, 20)).to.equal(rect);
            expect(rect.scale().x).to.equal(10);
            expect(rect.scale().y).to.equal(20);
        });

        it('Sets width correctly', () => {
            expect(rect.width(100)).to.equal(rect);
            expect(rect.width()).to.equal(100);
        });

        it('Sets height correctly', () => {
            expect(rect.height(100)).to.equal(rect);
            expect(rect.height()).to.equal(100);
        });
    });

    describe('Hierarchy', () => {
        let rect: Rect;
        let nodeB: Node;
        let nodeC: Node;

        beforeEach(function() {
            rect = new Rect();
            rect.translate(10, 20);
            nodeB = new Node();
            nodeB.translate(30, 40);
            nodeC = new Node();
            nodeC.translate(50, 60);
        });

        it('Appends children one by one', () => {
            expect(rect.append(nodeB)).to.equal(rect);
            expect(nodeB.append(nodeC)).to.equal(nodeB);
            expect(rect.children().first()).to.equal(nodeB);
            expect(rect.children().last()).to.equal(nodeB);
            expect(rect.children().array().length).to.equal(1);
            expect(nodeB.children().first()).to.equal(nodeC);
            expect(nodeB.children().last()).to.equal(nodeC);
            expect(nodeB.children().array().length).to.equal(1);
        });

        it('Appends multiple children', () => {
            expect(rect.append(nodeB, nodeC)).to.equal(rect);
            expect(rect.children().first()).to.equal(nodeB);
            expect(rect.children().last()).to.equal(nodeC);
            expect(rect.children().array().length).to.equal(2);
        });

        it('Sets parent node correctly', () => {
            expect(rect.append(nodeB)).to.equal(rect);
            expect(nodeB.append(nodeC)).to.equal(nodeB);
            expect(nodeB.parent()).to.equal(rect);
            expect(nodeC.parent()).to.equal(nodeB);
        });
    });

    describe('Bounding box calculation behavior', () => {
        let rect: Rect;
        let bbox: BBox;

        it('Gets untouched bounding box correctly', () => {
          rect = new Rect().width(10).height(10);
          bbox = rect.getBBox();
          expect(bbox.x()).to.equal(0);
          expect(bbox.y()).to.equal(0);
          expect(bbox.width()).to.equal(10);
          expect(bbox.height()).to.equal(10);
        });

        it('Gets translated primitives bounding box correctly', () => {
          rect = new Rect().translate(50, 50).width(150).height(150);
          bbox = rect.getBBox();
          expect(bbox.x()).to.equal(50);
          expect(bbox.y()).to.equal(50);
          expect(bbox.width()).to.equal(150);
          expect(bbox.height()).to.equal(150);
        });

        it('Gets rotated primitives bounding box correctly', () => {
          rect = new Rect().rotate(45).width(10).height(10);
          bbox = rect.getBBox();
          expect(bbox.x()).to.be.equal(0);
          expect(bbox.y()).to.be.approximately(7, 7.1);
          expect(bbox.width()).to.be.approximately(14.1, 0.1);
          expect(bbox.height()).to.be.approximately(14.1, 0.1);
        });

        it('Gets scaled primitives bounding box correctly', () => {
          rect = new Rect().scale(2, 2).width(10).height(10);
          bbox = rect.getBBox();
          expect(bbox.x()).to.equal(0);
          expect(bbox.y()).to.equal(0);
          expect(bbox.width()).to.equal(20);
          expect(bbox.height()).to.equal(20);
        });

        it('Gets scaled, rotated and translated primitives bounding box correctly', () => {
          rect = new Rect().translate(10, 10).rotate(270).width(10).height(10);
          bbox = rect.getBBox();
          expect(bbox.x()).to.be.approximately(0.0, 0.1);
          expect(bbox.y()).to.be.approximately(10.0, 0.1);
          expect(bbox.width()).to.be.approximately(10.0, 0.1);
          expect(bbox.height()).to.be.approximately(10.1, 0.1);
          rect.translate(10, 10).rotate(45);
          bbox = rect.getBBox();
          expect(rect.getBBox().x()).to.be.approximately(12.9, 0.1);
          expect(rect.getBBox().y()).to.be.approximately(7.0, 7.1);
          expect(rect.getBBox().width()).to.be.approximately(14.1, 0.1);
          expect(rect.getBBox().height()).to.be.approximately(14.1, 0.1);
        });
    });
});
