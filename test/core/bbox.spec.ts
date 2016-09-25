import { expect, should } from 'chai';

import { BBox } from '../../src/core/bbox';

describe('Selection tests', () => {
    describe('Common behavior', () => {
        it('Runs tests', () => {
            expect(true).to.equal(true);
        });
    });

    describe('Constructor behavior', () => {
        let bboxA: BBox;
        let bboxB: BBox;

        it('Constructs properly', () => {
            bboxA = new BBox();
            bboxB = new BBox(30, 50, 20, 80);
            expect(bboxA.x()).to.equal(0);
            expect(bboxA.y()).to.equal(0);
            expect(bboxA.width()).to.equal(0);
            expect(bboxA.height()).to.equal(0);
            expect(bboxB.x()).to.equal(30);
            expect(bboxB.y()).to.equal(50);
            expect(bboxB.width()).to.equal(20);
            expect(bboxB.height()).to.equal(80);
        });
    });

    describe('Merging another bounding box', () => {
        let bboxA: BBox;
        let bboxB: BBox;

        it('Concatenates another bounding box properly, while both of them are of zero width and height', () => {
            bboxA = new BBox();
            bboxB = new BBox();
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(0);
            expect(bboxA.y()).to.equal(0);
            expect(bboxA.width()).to.equal(0);
            expect(bboxA.height()).to.equal(0);
        });

        it('Concatenates another bounding box properly, while being the only one with positive dimensions', () => {
            bboxA = new BBox(50, -50, 50, 50);
            bboxB = new BBox();
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(50);
            expect(bboxA.y()).to.equal(-50);
            expect(bboxA.width()).to.equal(50);
            expect(bboxA.height()).to.equal(50);
        });

        it('Concatenates another bounding box properly, while the other is the only one with positive dimensions ', () => {
            bboxA = new BBox();
            bboxB = new BBox(50, -50, 50, 50);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(50);
            expect(bboxA.y()).to.equal(-50);
            expect(bboxA.width()).to.equal(50);
            expect(bboxA.height()).to.equal(50);
        });

        it('Concatenates another bounding box properly, while being higher than the other one and to the left from it', () => {
            bboxA = new BBox(-100, 100, 50, 50);
            bboxB = new BBox(50, -50, 50, 50);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(200);
            expect(bboxA.height()).to.equal(200);
        });

        it('Concatenates another bounding box properly, while being lower than the other one and to the right from it ', () => {
            bboxA = new BBox(50, -50, 50, 50);
            bboxB = new BBox(-100, 100, 50, 50);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(200);
            expect(bboxA.height()).to.equal(200);
        });

        it('Concatenates another bounding box properly, while being higher than the other one and to the right from it ', () => {
            bboxA = new BBox(50, 100, 50, 50);
            bboxB = new BBox(-100, -50, 50, 50);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(200);
            expect(bboxA.height()).to.equal(200);
        });

        it('Concatenates another bounding box properly, while being lower than the other one and to the left from it ', () => {
            bboxA = new BBox(-100, -50, 50, 50);
            bboxB = new BBox(50, 100, 50, 50);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(200);
            expect(bboxA.height()).to.equal(200);
        });

        it('Concatenates another bounding box properly, while being higher than the other one and to the left from it and also intersecting it', () => {
            bboxA = new BBox(-100, 100, 500, 500);
            bboxB = new BBox(50, -50, 500, 500);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(650);
            expect(bboxA.height()).to.equal(650);
        });

        it('Concatenates another bounding box properly, while being lower than the other one and to the right from it and also intersecting it', () => {
            bboxA = new BBox(50, -50, 500, 500);
            bboxB = new BBox(-100, 100, 500, 500);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(650);
            expect(bboxA.height()).to.equal(650);
        });

        it('Concatenates another bounding box properly, while being higher than the other one and to the right from it and also intersecting it', () => {
            bboxA = new BBox(50, 100, 500, 500);
            bboxB = new BBox(-100, -50, 500, 500);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(650);
            expect(bboxA.height()).to.equal(650);
        });

        it('Concatenates another bounding box properly, while being lower than the other one and to the left from it and also intersecting it', () => {
            bboxA = new BBox(-100, -50, 500, 500);
            bboxB = new BBox(50, 100, 500, 500);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(650);
            expect(bboxA.height()).to.equal(650);
        });
    });

    describe('Merging multiple bounding boxes at once', () => {
        let bboxA: BBox;
        let bboxB: BBox;
        let bboxC: BBox;
        let bboxD: BBox;

        it('Concatenates multiple bounding boxes correctly', () => {
          bboxA = new BBox(-100, 100, 50, 50);
          bboxB = new BBox(50, -50, 50, 50);
          bboxC = new BBox(-100, -50, 50, 50);
          bboxD = new BBox(50, 100, 50, 50);
          expect(bboxA.merge(bboxB, bboxC, bboxD)).to.equal(bboxA);
          expect(bboxA.x()).to.equal(-100);
          expect(bboxA.y()).to.equal(100);
          expect(bboxA.width()).to.equal(200);
          expect(bboxA.height()).to.equal(200);
        });
    });
});
