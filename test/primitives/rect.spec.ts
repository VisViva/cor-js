import { expect, should } from 'chai';

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

        it('Sets width correctly', () => {
            expect(rect.width(100)).to.equal(rect);
            expect(rect.width()).to.equal(100);
        });

        it('Sets height correctly', () => {
            expect(rect.height(100)).to.equal(rect);
            expect(rect.height()).to.equal(100);
        });
    });

    describe('Bounding box calculation behavior', () => {
        let rect: Rect;
        let bbox: BBox;

        it('Gets untouched bounding box correctly', () => {
          rect = (<Rect>new Rect()).width(10).height(10);
          bbox = rect.getBBox();
          expect(bbox.x()).to.equal(0);
          expect(bbox.y()).to.equal(0);
          expect(bbox.width()).to.equal(10);
          expect(bbox.height()).to.equal(10);
        });

        it('Gets translated primitives bounding box correctly', () => {
          rect = (<Rect>new Rect().translate(50, 50)).width(150).height(150);
          bbox = rect.getBBox();
          expect(bbox.x()).to.equal(50);
          expect(bbox.y()).to.equal(50);
          expect(bbox.width()).to.equal(150);
          expect(bbox.height()).to.equal(150);
        });

        it('Gets rotated primitives bounding box correctly', () => {
          rect = (<Rect>new Rect().rotate(45)).width(10).height(10);
          bbox = rect.getBBox();
          expect(bbox.x()).to.be.equal(0);
          expect(bbox.y()).to.be.approximately(7, 7.1);
          expect(bbox.width()).to.be.approximately(14.1, 0.1);
          expect(bbox.height()).to.be.approximately(14.1, 0.1);
        });

        it('Gets scaled primitives bounding box correctly', () => {
          rect = (<Rect>new Rect().scale(2, 2)).width(10).height(10);
          bbox = rect.getBBox();
          expect(bbox.x()).to.equal(0);
          expect(bbox.y()).to.equal(0);
          expect(bbox.width()).to.equal(20);
          expect(bbox.height()).to.equal(20);
        });

        it('Gets scaled, rotated and translated primitives bounding box correctly', () => {
          rect = (<Rect>new Rect().translate(10, 10).rotate(270)).width(10).height(10);
          bbox = rect.getBBox();
          expect(bbox.x()).to.be.approximately(0.0, 0.1);
          expect(bbox.y()).to.be.approximately(10.0, 0.1);
          expect(bbox.width()).to.be.approximately(10.0, 0.1);
          expect(bbox.height()).to.be.approximately(10.1, 0.1);
          (<Rect>rect.translate(10, 10).rotate(45));
          bbox = rect.getBBox();
          expect(rect.getBBox().x()).to.be.approximately(12.9, 0.1);
          expect(rect.getBBox().y()).to.be.approximately(7.0, 7.1);
          expect(rect.getBBox().width()).to.be.approximately(14.1, 0.1);
          expect(rect.getBBox().height()).to.be.approximately(14.1, 0.1);
        });
    });
});
