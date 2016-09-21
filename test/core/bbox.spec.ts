import { expect, should } from 'chai';

import { BBox } from '../../src/core/bbox';

describe('Selection tests', () => {
    describe('Common behavior', () => {
        it('Runs tests', () => {
            expect(true).to.equal(true);
        });
    });

    describe('Bounding box behavior', () => {
        let bboxB: BBox;
        let bboxA: BBox;

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

        it('Concatenates other bounding boxes properly', () => {
            bboxA = new BBox(50, -50, 50, 50);
            bboxB = new BBox();
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(50);
            expect(bboxA.y()).to.equal(-50);
            expect(bboxA.width()).to.equal(50);
            expect(bboxA.height()).to.equal(50);
            bboxA = new BBox();
            bboxB = new BBox(50, -50, 50, 50);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(50);
            expect(bboxA.y()).to.equal(-50);
            expect(bboxA.width()).to.equal(50);
            expect(bboxA.height()).to.equal(50);
            bboxA = new BBox(-100, 100, 50, 50);
            bboxB = new BBox(50, -50, 50, 50);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(200);
            expect(bboxA.height()).to.equal(200);
            bboxA = new BBox(50, -50, 50, 50);
            bboxB = new BBox(-100, 100, 50, 50);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(200);
            expect(bboxA.height()).to.equal(200);
            bboxA = new BBox(50, 100, 50, 50);
            bboxB = new BBox(-100, -50, 50, 50);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(200);
            expect(bboxA.height()).to.equal(200);
            bboxA = new BBox(-100, -50, 50, 50);
            bboxB = new BBox(50, 100, 50, 50);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(200);
            expect(bboxA.height()).to.equal(200);
            bboxA = new BBox(-100, 50, 150, 150);
            bboxB = new BBox(-50, 100, 150, 150);
            expect(bboxA.merge(bboxB)).to.equal(bboxA);
            expect(bboxA.x()).to.equal(-100);
            expect(bboxA.y()).to.equal(100);
            expect(bboxA.width()).to.equal(200);
            expect(bboxA.height()).to.equal(200);
        });
    });
});
