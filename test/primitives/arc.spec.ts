import { expect, should } from 'chai';

import { Arc } from '../../src/primitives/arc';

describe('Primitive - Arc tests', () => {
    describe('Constructor behavior', () => {
        let arc: Arc;

        beforeEach(function() {
            arc = new Arc();
        });

        it('Executes parent constructor correctly', () => {
            expect(arc.depth()).to.equal(0);
            expect(arc.hidden()).to.equal(false);
        });

        it('Executes own constructor correctly', () => {
            expect(arc.radius()).to.equal(0);
            expect(arc.start()).to.equal(0);
            expect(arc.end()).to.equal(0);
            expect(arc.ccw()).to.equal(false);
        });
    });

    describe('Property setting behavior', () => {
        let arc: Arc;

        beforeEach(function() {
            arc = new Arc();
        });

        it('Sets radius correctly', () => {
            expect(arc.radius(100)).to.equal(arc);
            expect(arc.radius()).to.equal(100);
        });

        it('Sets start angle correctly', () => {
            expect(arc.start(30)).to.equal(arc);
            expect(arc.start()).to.equal(30);
        });

        it('Sets end angle correctly', () => {
            expect(arc.end(30)).to.equal(arc);
            expect(arc.end()).to.equal(30);
        });

        it('Sets ccw flag correctly', () => {
            expect(arc.ccw(true)).to.equal(arc);
            expect(arc.ccw()).to.equal(true);
        });
    });

    describe('Angle calculation behavior', () => {
        let arc: Arc;

        beforeEach(function() {
            arc = new Arc();
        });

        // TODO Add tests for radian and mixed degree/radian values

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(10);
            arc.end(170);
            expect(arc.angle()).to.equal(160);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(170);
            arc.end(10);
            expect(arc.angle()).to.equal(200);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(560);
            arc.end(570);
            expect(arc.angle()).to.equal(10);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(570);
            arc.end(560);
            expect(arc.angle()).to.equal(350);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(160);
            arc.end(770);
            expect(arc.angle()).to.equal(250);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(770);
            arc.end(160);
            expect(arc.angle()).to.equal(110);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(-160);
            arc.end(770);
            expect(arc.angle()).to.equal(210);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(770);
            arc.end(-160);
            expect(arc.angle()).to.equal(150);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(-10);
            arc.end(170);
            expect(arc.angle()).to.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(170);
            arc.end(-10);
            expect(arc.angle()).to.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(-560);
            arc.end(570);
            expect(arc.angle()).to.equal(50);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(570);
            arc.end(-560);
            expect(arc.angle()).to.equal(310);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(10);
            arc.end(170);
            expect(arc.angle()).to.equal(200);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(170);
            arc.end(10);
            expect(arc.angle()).to.equal(160);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(560);
            arc.end(570);
            expect(arc.angle()).to.equal(350);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(570);
            arc.end(560);
            expect(arc.angle()).to.equal(10);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(160);
            arc.end(770);
            expect(arc.angle()).to.equal(110);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(770);
            arc.end(160);
            expect(arc.angle()).to.equal(250);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(-160);
            arc.end(770);
            expect(arc.angle()).to.equal(150);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(770);
            arc.end(-160);
            expect(arc.angle()).to.equal(210);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(-10);
            arc.end(170);
            expect(arc.angle()).to.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(170);
            arc.end(-10);
            expect(arc.angle()).to.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(-560);
            arc.end(570);
            expect(arc.angle()).to.equal(310);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(570);
            arc.end(-560);
            expect(arc.angle()).to.equal(50);
        });
    });

    describe('Length calculation behavior', () => {
        let arc: Arc;

        beforeEach(function() {
            arc = new Arc();
        });

        it('Calculates its length correctly when radius is 0', () => {
            arc.ccw(false);
            arc.radius(0);
            arc.start(10);
            arc.end(170);
            expect(arc.length()).to.equal(0);
        });

        it('Calculates its length correctly when radius is positive', () => {
            arc.ccw(false);
            arc.radius(40);
            arc.start(10);
            arc.end(170);
            expect(arc.length()).to.be.approximately(110, 112);
        });
    });
});
