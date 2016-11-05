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
            circle(circle.at().x).to.be.equal(0);
            circle(circle.at().y).to.be.equal(0);
            circle(circle.depth()).to.be.equal(0);
            circle(circle.debug()).to.be.equal(false);
            circle(circle.hidden()).to.be.equal(false);
            circle(circle.material().stroke()).to.be.equal('#000000');
            circle(circle.material().width()).to.be.equal(1);
            circle(circle.material().fill()).to.be.equal('#000000');
        });

        it('Executes own constructor correctly', () => {
            circle(circle.radius()).to.be.equal(0);
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
            circle = new Circle().width(10).height(10).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(-5);
            expect(bbox.y()).to.be.equal(5);
            expect(bbox.width()).to.be.equal(10);
            expect(bbox.height()).to.be.equal(10);
        });

        it('Gets bounding box of a circle with an offset correctly', () => {
            circle = new Circle().at(10, 10).width(10).height(10).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(5);
            expect(bbox.y()).to.be.equal(-5);
            expect(bbox.width()).to.be.equal(10);
            expect(bbox.height()).to.be.equal(10);
        });

        it('Gets translated primitives bounding box correctly', () => {
            circle = new Circle().translate(50, 50).width(150).height(150).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(-25);
            expect(bbox.y()).to.be.equal(25);
            expect(bbox.width()).to.be.equal(150);
            expect(bbox.height()).to.be.equal(150);
        });

        it('Gets translated primitives bounding box with an offset correctly', () => {
            circle = new Circle().at(10, 10).translate(50, 50).width(150).height(150).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(-15);
            expect(bbox.y()).to.be.equal(15);
            expect(bbox.width()).to.be.equal(150);
            expect(bbox.height()).to.be.equal(150);
        });

        it('Gets rotated primitives bounding box correctly', () => {
            circle = new Circle().rotate(45).width(10).height(10).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-7, 0.1);
            expect(bbox.y()).to.be.approximately(7, 0.1);
            expect(bbox.width()).to.be.approximately(14.1, 0.1);
            expect(bbox.height()).to.be.approximately(14.1, 0.1);
        });

        it('Gets rotated primitives bounding box with an offset correctly', () => {
            circle = new Circle().at(10, 10).rotate(45).width(10).height(10).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.approximately(7, 0.1);
            expect(bbox.y()).to.be.approximately(7, 0.1);
            expect(bbox.width()).to.be.approximately(14.1, 0.1);
            expect(bbox.height()).to.be.approximately(14.1, 0.1);
        });

        it('Gets scaled primitives bounding box correctly', () => {
            circle = new Circle().scale(2, 2).width(10).height(10).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(-10);
            expect(bbox.y()).to.be.equal(10);
            expect(bbox.width()).to.be.equal(20);
            expect(bbox.height()).to.be.equal(20);
        });

        it('Gets scaled primitives bounding box with an offset correctly', () => {
            circle = new Circle();
            circle.at(10, 10).scale(3, 3).width(10).height(10).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.equal(15);
            expect(bbox.y()).to.be.equal(-15);
            expect(bbox.width()).to.be.equal(30);
            expect(bbox.height()).to.be.equal(30);
        });

        it('Gets scaled, rotated and translated primitives bounding box correctly', () => {
            circle = new Circle().translate(10, 10).rotate(270).width(10).height(10).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.approximately(5, 0.1);
            expect(bbox.y()).to.be.approximately(-5, 0.1);
            expect(bbox.width()).to.be.approximately(10.0, 0.1);
            expect(bbox.height()).to.be.approximately(10.1, 0.1);
            circle.translate(10, 10).rotate(45).cascade();
            bbox = circle.bboxCascaded();
            expect(circle.bboxCascaded().x()).to.be.approximately(-7, 0.1);
            expect(circle.bboxCascaded().y()).to.be.approximately(-12.9, 0.1);
            expect(circle.bboxCascaded().width()).to.be.approximately(14.1, 0.1);
            expect(circle.bboxCascaded().height()).to.be.approximately(14.1, 0.1);
        });

        it('Gets scaled, rotated and translated primitives bounding box with an offset correctly', () => {
            circle = new Circle().at(10, 10).translate(10, 10).rotate(270).width(10).height(10).cascade();
            bbox = circle.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-4.9, 0.1);
            expect(bbox.y()).to.be.approximately(-15.0, 0.1);
            expect(bbox.width()).to.be.approximately(10.0, 0.1);
            expect(bbox.height()).to.be.approximately(10.1, 0.1);
            circle.translate(10, 10).rotate(45).cascade();
            bbox = circle.bboxCascaded();
            expect(circle.bboxCascaded().x()).to.be.approximately(-7.0, 0.1);
            expect(circle.bboxCascaded().y()).to.be.approximately(-27.0, 0.1);
            expect(circle.bboxCascaded().width()).to.be.approximately(14.1, 0.1);
            expect(circle.bboxCascaded().height()).to.be.approximately(14.1, 0.1);
        });
    });
});
