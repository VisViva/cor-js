'use strict';

import {
    expect
} from 'chai/chai';
import {
    BBox
} from '../../src/core/bbox';

describe('Selection tests', () => {
    describe('Constructor behavior', () => {
        let bboxA;
        let bboxB;

        it('Constructs properly', () => {
            bboxA = new BBox();
            bboxB = new BBox(30, 50, 20, 80);
            expect(bboxA.x()).to.be.equal(0);
            expect(bboxA.y()).to.be.equal(0);
            expect(bboxA.width()).to.be.equal(0);
            expect(bboxA.height()).to.be.equal(0);
            expect(bboxB.x()).to.be.equal(30);
            expect(bboxB.y()).to.be.equal(50);
            expect(bboxB.width()).to.be.equal(20);
            expect(bboxB.height()).to.be.equal(80);
        });
    });

    describe('Merging another bounding box', () => {
        let bboxA;
        let bboxB;

        it('Concatenates another bounding box properly, while both of them are of zero width and height', () => {
            bboxA = new BBox();
            bboxB = new BBox();
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(0);
            expect(bboxA.y()).to.be.equal(0);
            expect(bboxA.width()).to.be.equal(0);
            expect(bboxA.height()).to.be.equal(0);
        });

        it('Concatenates another bounding box properly, while being the only one with positive dimensions', () => {
            bboxA = new BBox(50, -50, 50, 50);
            bboxB = new BBox();
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(50);
            expect(bboxA.y()).to.be.equal(-50);
            expect(bboxA.width()).to.be.equal(50);
            expect(bboxA.height()).to.be.equal(50);
        });

        it('Concatenates another bounding box properly, while the other is the only one with positive dimensions ', () => {
            bboxA = new BBox();
            bboxB = new BBox(50, -50, 50, 50);
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(50);
            expect(bboxA.y()).to.be.equal(-50);
            expect(bboxA.width()).to.be.equal(50);
            expect(bboxA.height()).to.be.equal(50);
        });

        it('Concatenates another bounding box properly, while being higher than the other one and to the left from it', () => {
            bboxA = new BBox(-100, 100, 50, 50);
            bboxB = new BBox(50, -50, 50, 50);
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(-100);
            expect(bboxA.y()).to.be.equal(100);
            expect(bboxA.width()).to.be.equal(200);
            expect(bboxA.height()).to.be.equal(200);
        });

        it('Concatenates another bounding box properly, while being lower than the other one and to the right from it ', () => {
            bboxA = new BBox(50, -50, 50, 50);
            bboxB = new BBox(-100, 100, 50, 50);
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(-100);
            expect(bboxA.y()).to.be.equal(100);
            expect(bboxA.width()).to.be.equal(200);
            expect(bboxA.height()).to.be.equal(200);
        });

        it('Concatenates another bounding box properly, while being higher than the other one and to the right from it ', () => {
            bboxA = new BBox(50, 100, 50, 50);
            bboxB = new BBox(-100, -50, 50, 50);
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(-100);
            expect(bboxA.y()).to.be.equal(100);
            expect(bboxA.width()).to.be.equal(200);
            expect(bboxA.height()).to.be.equal(200);
        });

        it('Concatenates another bounding box properly, while being lower than the other one and to the left from it ', () => {
            bboxA = new BBox(-100, -50, 50, 50);
            bboxB = new BBox(50, 100, 50, 50);
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(-100);
            expect(bboxA.y()).to.be.equal(100);
            expect(bboxA.width()).to.be.equal(200);
            expect(bboxA.height()).to.be.equal(200);
        });

        it('Concatenates another bounding box properly, while being higher than the other one and to the left from it and also intersecting it', () => {
            bboxA = new BBox(-100, 100, 500, 500);
            bboxB = new BBox(50, -50, 500, 500);
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(-100);
            expect(bboxA.y()).to.be.equal(100);
            expect(bboxA.width()).to.be.equal(650);
            expect(bboxA.height()).to.be.equal(650);
        });

        it('Concatenates another bounding box properly, while being lower than the other one and to the right from it and also intersecting it', () => {
            bboxA = new BBox(50, -50, 500, 500);
            bboxB = new BBox(-100, 100, 500, 500);
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(-100);
            expect(bboxA.y()).to.be.equal(100);
            expect(bboxA.width()).to.be.equal(650);
            expect(bboxA.height()).to.be.equal(650);
        });

        it('Concatenates another bounding box properly, while being higher than the other one and to the right from it and also intersecting it', () => {
            bboxA = new BBox(50, 100, 500, 500);
            bboxB = new BBox(-100, -50, 500, 500);
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(-100);
            expect(bboxA.y()).to.be.equal(100);
            expect(bboxA.width()).to.be.equal(650);
            expect(bboxA.height()).to.be.equal(650);
        });

        it('Concatenates another bounding box properly, while being lower than the other one and to the left from it and also intersecting it', () => {
            bboxA = new BBox(-100, -50, 500, 500);
            bboxB = new BBox(50, 100, 500, 500);
            expect(bboxA.merge(bboxB)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(-100);
            expect(bboxA.y()).to.be.equal(100);
            expect(bboxA.width()).to.be.equal(650);
            expect(bboxA.height()).to.be.equal(650);
        });
    });

    describe('Merging multiple bounding boxes at once', () => {
        let bboxA;
        let bboxB;
        let bboxC;
        let bboxD;

        it('Concatenates multiple bounding boxes correctly', () => {
            bboxA = new BBox(-100, 100, 50, 50);
            bboxB = new BBox(50, -50, 50, 50);
            bboxC = new BBox(-100, -50, 50, 50);
            bboxD = new BBox(50, 100, 50, 50);
            expect(bboxA.merge(bboxB, bboxC, bboxD)).to.be.equal(bboxA);
            expect(bboxA.x()).to.be.equal(-100);
            expect(bboxA.y()).to.be.equal(100);
            expect(bboxA.width()).to.be.equal(200);
            expect(bboxA.height()).to.be.equal(200);
        });
    });
});
