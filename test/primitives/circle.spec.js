'use strict';

import {
    expect
} from 'chai/chai';
import {
    Scene
} from '../../src/core/scene';
import {
    BBox
} from '../../src/core/bbox';

describe('Circle tests', () => {
    const Factory = new Scene().factory();
    const Node = Factory.Node;
    const Circle = Factory.Circle;

    describe('Constructor behavior', () => {
        let circle;

        beforeEach(function() {
            circle = new Circle();
        });

        it('Executes parent constructor correctly', () => {
            expect(circle.at().x).to.be.equal(0);
            expect(circle.at().y).to.be.equal(0);
            expect(circle.depth()).to.be.equal(0);
            expect(circle.debug()).to.be.equal(false);
            expect(circle.hidden()).to.be.equal(false);
            expect(circle.material().stroke()).to.be.equal('#000000');
            expect(circle.material().stroked()).to.be.equal(true);
            expect(circle.material().width()).to.be.equal(1);
            expect(circle.material().fill()).to.be.equal('#000000');
            expect(circle.material().filled()).to.be.equal(true);
        });

        it('Executes own constructor correctly', () => {
            expect(circle.radius()).to.be.equal(0);
        });
    });

    describe('Property setting behavior', () => {
        let circle;

        beforeEach(function() {
            circle = new Circle();
        });

        it('Sets rotation correctly', () => {
            expect(circle.rotate(45)).to.be.equal(circle);
            expect(circle.rotate()).to.be.equal(45);
        });

        it('Sets position correctly', () => {
            expect(circle.translate(10, 20)).to.be.equal(circle);
            expect(circle.translate().x).to.be.equal(10);
            expect(circle.translate().y).to.be.equal(20);
        });

        it('Sets scale correctly', () => {
            expect(circle.scale(10, 20)).to.be.equal(circle);
            expect(circle.scale().x).to.be.equal(10);
            expect(circle.scale().y).to.be.equal(20);
        });
    });

    describe('Hierarchy', () => {
        let circle;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            circle = new Circle();
            circle.translate(10, 20);
            nodeB = new Node();
            nodeB.translate(30, 40);
            nodeC = new Node();
            nodeC.translate(50, 60);
        });

        it('Appends children one by one', () => {
            expect(circle.append(nodeB)).to.be.equal(circle);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(circle.children().first()).to.be.equal(nodeB);
            expect(circle.children().last()).to.be.equal(nodeB);
            expect(circle.children().array().length).to.be.equal(1);
            expect(nodeB.children().first()).to.be.equal(nodeC);
            expect(nodeB.children().last()).to.be.equal(nodeC);
            expect(nodeB.children().array().length).to.be.equal(1);
        });

        it('Appends multiple children', () => {
            expect(circle.append(nodeB, nodeC)).to.be.equal(circle);
            expect(circle.children().first()).to.be.equal(nodeB);
            expect(circle.children().last()).to.be.equal(nodeC);
            expect(circle.children().array().length).to.be.equal(2);
        });

        it('Sets parent node correctly', () => {
            expect(circle.append(nodeB)).to.be.equal(circle);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeB.parent()).to.be.equal(circle);
            expect(nodeC.parent()).to.be.equal(nodeB);
        });
    });

    describe('Bounding box calculation behavior', () => {
        let circle;
        let bbox;

        it('Gets untouched bounding box correctly', () => {
            circle = new Circle().radius(100).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(-100);
            expect(bbox.y()).to.be.equal(100);
            expect(bbox.width()).to.be.equal(200);
            expect(bbox.height()).to.be.equal(200);
        });

        it('Gets bounding box of a circle with an offset correctly', () => {
            circle = new Circle().at(10, 10).radius(100).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(-90);
            expect(bbox.y()).to.be.equal(90);
            expect(bbox.width()).to.be.equal(200);
            expect(bbox.height()).to.be.equal(200);
        });

        it('Gets translated primitives bounding box correctly', () => {
            circle = new Circle().translate(50, 50).radius(100).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(-50);
            expect(bbox.y()).to.be.equal(50);
            expect(bbox.width()).to.be.equal(200);
            expect(bbox.height()).to.be.equal(200);
        });

        it('Gets translated primitives bounding box with an offset correctly', () => {
            circle = new Circle().at(10, 10).translate(50, 50).radius(100).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(-40);
            expect(bbox.y()).to.be.equal(40);
            expect(bbox.width()).to.be.equal(200);
            expect(bbox.height()).to.be.equal(200);
        });

        it('Gets rotated primitives bounding box correctly', () => {
            circle = new Circle().rotate(45).radius(100).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-100, 0.1);
            expect(bbox.y()).to.be.approximately(100, 0.1);
            expect(bbox.width()).to.be.approximately(200, 0.1);
            expect(bbox.height()).to.be.approximately(200, 0.1);
        });

        it('Gets rotated primitives bounding box with an offset correctly', () => {
            circle = new Circle().at(10, 10).rotate(45).radius(100).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-85.9, 0.1);
            expect(bbox.y()).to.be.approximately(100, 0.1);
            expect(bbox.width()).to.be.approximately(200, 0.1);
            expect(bbox.height()).to.be.approximately(200, 0.1);
        });

        it('Gets scaled primitives bounding box correctly', () => {
            circle = new Circle().scale(2, 2).radius(100).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(-200);
            expect(bbox.y()).to.be.equal(200);
            expect(bbox.width()).to.be.equal(400);
            expect(bbox.height()).to.be.equal(400);
        });

        it('Gets scaled primitives bounding box with an offset correctly', () => {
            circle = new Circle();
            circle.at(10, 10).scale(3, 3).radius(100).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(-270);
            expect(bbox.y()).to.be.equal(270);
            expect(bbox.width()).to.be.equal(600);
            expect(bbox.height()).to.be.equal(600);
        });

        it('Gets scaled, rotated and translated primitives bounding box correctly', () => {
            circle = new Circle().translate(10, 10).rotate(270).radius(100).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-90, 0.1);
            expect(bbox.y()).to.be.approximately(90, 0.1);
            expect(bbox.width()).to.be.approximately(200.0, 0.1);
            expect(bbox.height()).to.be.approximately(200.1, 0.1);
            circle.translate(10, 10).rotate(45).cascade();
            bbox = circle.bboxCascaded();
            expect(circle.bboxCascaded().x()).to.be.approximately(-90, 0.1);
            expect(circle.bboxCascaded().y()).to.be.approximately(90, 0.1);
            expect(circle.bboxCascaded().width()).to.be.approximately(200, 0.1);
            expect(circle.bboxCascaded().height()).to.be.approximately(200, 0.1);
        });

        it('Gets scaled, rotated and translated primitives bounding box with an offset correctly', () => {
            circle = new Circle().at(10, 10).translate(10, 10).rotate(270).radius(100).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-100, 0.1);
            expect(bbox.y()).to.be.approximately(80.0, 0.1);
            expect(bbox.width()).to.be.approximately(200.0, 0.1);
            expect(bbox.height()).to.be.approximately(200.0, 0.1);
            circle.translate(10, 10).rotate(45).cascade();
            bbox = circle.bboxCascaded();
            expect(circle.bboxCascaded().x()).to.be.approximately(-75.8, 0.1);
            expect(circle.bboxCascaded().y()).to.be.approximately(90.0, 0.1);
            expect(circle.bboxCascaded().width()).to.be.approximately(200, 0.1);
            expect(circle.bboxCascaded().height()).to.be.approximately(200, 0.1);
        });
    });
});
