'use strict';

import { expect } from 'chai/chai';
import { Scene } from '../../src/core/scene';
import { BBox } from '../../src/core/bbox';

describe('Sector tests', () => {
    const Factory = new Scene().factory();
    const Node = Factory.Node;
    const Sector = Factory.Sector;

    describe('Constructor behavior', () => {
        let sector;

        beforeEach(function() {
            sector = new Sector();
        });

        it('Executes parent constructor correctly', () => {
            expect(sector.depth()).to.be.equal(0);
            expect(sector.hidden()).to.be.equal(false);
        });

        it('Executes own constructor correctly', () => {
            expect(sector.innerRadius()).to.be.equal(0);
            expect(sector.outerRadius()).to.be.equal(0);
            const point = sector.at();
            expect(point.x).to.be.equal(0);
            expect(point.y).to.be.equal(0);
            expect(sector.start()).to.be.equal(0);
            expect(sector.end()).to.be.equal(0);
            expect(sector.ccw()).to.be.equal(false);
        });
    });

    describe('Property setting behavior', () => {
        let sector;

        beforeEach(function() {
            sector = new Sector();
        });
        it('Should place sector in correct position', () => {
            sector.at(50, 50);
            const point = sector.at();
            expect(point.x).to.be.equal(50);
            expect(point.y).to.be.equal(50);
        });
        it('Sets rotation correctly', () => {
            expect(sector.rotate(45)).to.be.equal(sector);
            expect(sector.rotate()).to.be.equal(45);
        });

        it('Sets position correctly', () => {
            expect(sector.translate(10, 20)).to.be.equal(sector);
            expect(sector.translate().x).to.be.equal(10);
            expect(sector.translate().y).to.be.equal(20);
        });

        it('Sets scale correctly', () => {
            expect(sector.scale(10, 20)).to.be.equal(sector);
            expect(sector.scale().x).to.be.equal(10);
            expect(sector.scale().y).to.be.equal(20);
        });

        it('Sets inner radius correctly', () => {
            expect(sector.innerRadius(100)).to.be.equal(sector);
            expect(sector.innerRadius()).to.be.equal(100);
        });


        it('Sets outer radius correctly', () => {
            expect(sector.outerRadius(100)).to.be.equal(sector);
            expect(sector.outerRadius()).to.be.equal(100);
        });
        it('Sets start angle correctly', () => {
            expect(sector.start(30)).to.be.equal(sector);
            expect(sector.start()).to.be.equal(30);
        });

        it('Sets end angle correctly', () => {
            expect(sector.end(30)).to.be.equal(sector);
            expect(sector.end()).to.be.equal(30);
        });

        it('Sets ccw flag correctly', () => {
            expect(sector.ccw(true)).to.be.equal(sector);
            expect(sector.ccw()).to.be.equal(true);
        });
    });

    describe('Hiersectorhy', () => {
        let sector;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            sector = new Sector();
            sector.translate(10, 20);
            nodeB = new Node();
            nodeB.translate(30, 40);
            nodeC = new Node();
            nodeC.translate(50, 60);
        });

        it('Appends children one by one', () => {
            expect(sector.append(nodeB)).to.be.equal(sector);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(sector.children().first()).to.be.equal(nodeB);
            expect(sector.children().last()).to.be.equal(nodeB);
            expect(sector.children().array().length).to.be.equal(1);
            expect(nodeB.children().first()).to.be.equal(nodeC);
            expect(nodeB.children().last()).to.be.equal(nodeC);
            expect(nodeB.children().array().length).to.be.equal(1);
        });

        it('Appends multiple children', () => {
            expect(sector.append(nodeB, nodeC)).to.be.equal(sector);
            expect(sector.children().first()).to.be.equal(nodeB);
            expect(sector.children().last()).to.be.equal(nodeC);
            expect(sector.children().array().length).to.be.equal(2);
        });

        it('Sets parent node correctly', () => {
            expect(sector.append(nodeB)).to.be.equal(sector);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeB.parent()).to.be.equal(sector);
            expect(nodeC.parent()).to.be.equal(nodeB);
        });
    });

    describe('Angle calculation behavior', () => {
        let sector;

        beforeEach(function() {
            sector = new Sector();
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(10);
            sector.end(170);
            expect(sector.angle()).to.be.equal(160);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(170);
            sector.end(10);
            expect(sector.angle()).to.be.equal(200);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(560);
            sector.end(570);
            expect(sector.angle()).to.be.equal(10);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(570);
            sector.end(560);
            expect(sector.angle()).to.be.equal(350);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(160);
            sector.end(770);
            expect(sector.angle()).to.be.equal(250);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(770);
            sector.end(160);
            expect(sector.angle()).to.be.equal(110);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(-160);
            sector.end(770);
            expect(sector.angle()).to.be.equal(210);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(770);
            sector.end(-160);
            expect(sector.angle()).to.be.equal(150);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(-10);
            sector.end(170);
            expect(sector.angle()).to.be.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(170);
            sector.end(-10);
            expect(sector.angle()).to.be.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(-560);
            sector.end(570);
            expect(sector.angle()).to.be.equal(50);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            sector.ccw(false);
            sector.start(570);
            sector.end(-560);
            expect(sector.angle()).to.be.equal(310);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(10);
            sector.end(170);
            expect(sector.angle()).to.be.equal(200);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(170);
            sector.end(10);
            expect(sector.angle()).to.be.equal(160);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(560);
            sector.end(570);
            expect(sector.angle()).to.be.equal(350);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(570);
            sector.end(560);
            expect(sector.angle()).to.be.equal(10);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(160);
            sector.end(770);
            expect(sector.angle()).to.be.equal(110);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(770);
            sector.end(160);
            expect(sector.angle()).to.be.equal(250);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(-160);
            sector.end(770);
            expect(sector.angle()).to.be.equal(150);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(770);
            sector.end(-160);
            expect(sector.angle()).to.be.equal(210);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(-10);
            sector.end(170);
            expect(sector.angle()).to.be.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(170);
            sector.end(-10);
            expect(sector.angle()).to.be.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(-560);
            sector.end(570);
            expect(sector.angle()).to.be.equal(310);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            sector.ccw(true);
            sector.start(570);
            sector.end(-560);
            expect(sector.angle()).to.be.equal(50);
        });
    });
});
