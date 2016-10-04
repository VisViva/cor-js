'use strict';

import { expect } from 'chai/chai';
import { Scene } from '../../src/core/scene';
import { BBox } from '../../src/core/bbox';

describe('Arc tests', () => {
    const Factory = new Scene().factory();
    const Node = Factory.Node;
    const Arc = Factory.Arc;

    describe('Constructor behavior', () => {
        let arc;

        beforeEach(function() {
            arc = new Arc();
        });

        it('Executes parent constructor correctly', () => {
            expect(arc.depth()).to.be.equal(0);
            expect(arc.hidden()).to.be.equal(false);
        });

        it('Executes own constructor correctly', () => {
            expect(arc.radius()).to.be.equal(0);
            expect(arc.start()).to.be.equal(0);
            expect(arc.end()).to.be.equal(0);
            expect(arc.ccw()).to.be.equal(false);
        });
    });

    describe('Property setting behavior', () => {
        let arc;

        beforeEach(function() {
            arc = new Arc();
        });
        it('Should place arc in correct position', () => {
            arc.at(50, 50);
            const point = arc.at();
            expect(point.x).to.be.equal(50);
            expect(point.y).to.be.equal(50);
        });
        it('Sets rotation correctly', () => {
            expect(arc.rotate(45)).to.be.equal(arc);
            expect(arc.rotate()).to.be.equal(45);
        });

        it('Sets position correctly', () => {
            expect(arc.translate(10, 20)).to.be.equal(arc);
            expect(arc.translate().x).to.be.equal(10);
            expect(arc.translate().y).to.be.equal(20);
        });

        it('Sets scale correctly', () => {
            expect(arc.scale(10, 20)).to.be.equal(arc);
            expect(arc.scale().x).to.be.equal(10);
            expect(arc.scale().y).to.be.equal(20);
        });

        it('Sets radius correctly', () => {
            expect(arc.radius(100)).to.be.equal(arc);
            expect(arc.radius()).to.be.equal(100);
        });

        it('Sets start angle correctly', () => {
            expect(arc.start(30)).to.be.equal(arc);
            expect(arc.start()).to.be.equal(30);
        });

        it('Sets end angle correctly', () => {
            expect(arc.end(30)).to.be.equal(arc);
            expect(arc.end()).to.be.equal(30);
        });

        it('Sets ccw flag correctly', () => {
            expect(arc.ccw(true)).to.be.equal(arc);
            expect(arc.ccw()).to.be.equal(true);
        });
    });

    describe('Hierarchy', () => {
        let arc;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            arc = new Arc();
            arc.translate(10, 20);
            nodeB = new Node();
            nodeB.translate(30, 40);
            nodeC = new Node();
            nodeC.translate(50, 60);
        });

        it('Appends children one by one', () => {
            expect(arc.append(nodeB)).to.be.equal(arc);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(arc.children().first()).to.be.equal(nodeB);
            expect(arc.children().last()).to.be.equal(nodeB);
            expect(arc.children().array().length).to.be.equal(1);
            expect(nodeB.children().first()).to.be.equal(nodeC);
            expect(nodeB.children().last()).to.be.equal(nodeC);
            expect(nodeB.children().array().length).to.be.equal(1);
        });

        it('Appends multiple children', () => {
            expect(arc.append(nodeB, nodeC)).to.be.equal(arc);
            expect(arc.children().first()).to.be.equal(nodeB);
            expect(arc.children().last()).to.be.equal(nodeC);
            expect(arc.children().array().length).to.be.equal(2);
        });

        it('Sets parent node correctly', () => {
            expect(arc.append(nodeB)).to.be.equal(arc);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeB.parent()).to.be.equal(arc);
            expect(nodeC.parent()).to.be.equal(nodeB);
        });
    });

    describe('Angle calculation behavior', () => {
        let arc;

        beforeEach(function() {
            arc = new Arc();
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(10);
            arc.end(170);
            expect(arc.angle()).to.be.equal(160);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(170);
            arc.end(10);
            expect(arc.angle()).to.be.equal(200);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(560);
            arc.end(570);
            expect(arc.angle()).to.be.equal(10);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(570);
            arc.end(560);
            expect(arc.angle()).to.be.equal(350);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(160);
            arc.end(770);
            expect(arc.angle()).to.be.equal(250);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(770);
            arc.end(160);
            expect(arc.angle()).to.be.equal(110);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(-160);
            arc.end(770);
            expect(arc.angle()).to.be.equal(210);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(770);
            arc.end(-160);
            expect(arc.angle()).to.be.equal(150);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(-10);
            arc.end(170);
            expect(arc.angle()).to.be.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(170);
            arc.end(-10);
            expect(arc.angle()).to.be.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while end is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(-560);
            arc.end(570);
            expect(arc.angle()).to.be.equal(50);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while start is greater and ccw is false', () => {
            arc.ccw(false);
            arc.start(570);
            arc.end(-560);
            expect(arc.angle()).to.be.equal(310);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(10);
            arc.end(170);
            expect(arc.angle()).to.be.equal(200);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(170);
            arc.end(10);
            expect(arc.angle()).to.be.equal(160);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(560);
            arc.end(570);
            expect(arc.angle()).to.be.equal(350);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and are not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(570);
            arc.end(560);
            expect(arc.angle()).to.be.equal(10);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(160);
            arc.end(770);
            expect(arc.angle()).to.be.equal(110);
        });

        it('Calculates its angle correctly when both angles are set in degrees, are positive and one of them is not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(770);
            arc.end(160);
            expect(arc.angle()).to.be.equal(250);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(-160);
            arc.end(770);
            expect(arc.angle()).to.be.equal(150);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and one of them is not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(770);
            arc.end(-160);
            expect(arc.angle()).to.be.equal(210);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(-10);
            arc.end(170);
            expect(arc.angle()).to.be.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(170);
            arc.end(-10);
            expect(arc.angle()).to.be.equal(180);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while end is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(-560);
            arc.end(570);
            expect(arc.angle()).to.be.equal(310);
        });

        it('Calculates its angle correctly when both angles are set in degrees, one is negative and are not within the bounds of 360 degrees, while start is greater and ccw is true', () => {
            arc.ccw(true);
            arc.start(570);
            arc.end(-560);
            expect(arc.angle()).to.be.equal(50);
        });
    });
});
