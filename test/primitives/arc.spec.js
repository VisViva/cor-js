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
            expect(arc.at().x).to.be.equal(0);
            expect(arc.at().y).to.be.equal(0);
            expect(arc.depth()).to.be.equal(0);
            expect(arc.debug()).to.be.equal(false);
            expect(arc.hidden()).to.be.equal(false);
            expect(arc.material().stroke().join('')).to.be.equal('0001');
            expect(arc.material().stroked()).to.be.equal(true);
            expect(arc.material().width()).to.be.equal(1);
            expect(arc.material().fill().join('')).to.be.equal('0001');
            expect(arc.material().filled()).to.be.equal(true);
        });

        it('Executes own constructor correctly', () => {
            expect(arc.radius()).to.be.equal(0);
        });
    });

    describe('Property setting behavior', () => {
        let arc;

        beforeEach(function() {
            arc = new Arc();
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
            expect(arc.children()[0]).to.be.equal(nodeB);
            expect(arc.children()[arc.children().length - 1]).to.be.equal(nodeB);
            expect(arc.children().length).to.be.equal(1);
            expect(nodeB.children()[0]).to.be.equal(nodeC);
            expect(nodeB.children()[arc.children().length - 1]).to.be.equal(nodeC);
            expect(nodeB.children().length).to.be.equal(1);
        });

        it('Appends multiple children', () => {
            expect(arc.append(nodeB, nodeC)).to.be.equal(arc);
            expect(arc.children()[0]).to.be.equal(nodeB);
            expect(arc.children()[arc.children().length - 1]).to.be.equal(nodeC);
            expect(arc.children().length).to.be.equal(2);
        });

        it('Sets parent node correctly', () => {
            expect(arc.append(nodeB)).to.be.equal(arc);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeB.parent()).to.be.equal(arc);
            expect(nodeC.parent()).to.be.equal(nodeB);
        });
    });

    describe('Bounding box calculation behavior', () => {
        let arc;
        let bbox;

        it('Gets untouched bounding box correctly', () => {
            arc = new Arc().radius(100).cascade();
            bbox = arc.bbox();
            expect(bbox.x()).to.be.equal(-100);
            expect(bbox.y()).to.be.equal(100);
            expect(bbox.width()).to.be.equal(200);
            expect(bbox.height()).to.be.equal(200);
        });

        it('Gets bounding box of a arc with an offset correctly', () => {
            arc = new Arc().at(10, 10).radius(100).cascade();
            bbox = arc.bbox();
            expect(bbox.x()).to.be.equal(-90);
            expect(bbox.y()).to.be.equal(90);
            expect(bbox.width()).to.be.equal(200);
            expect(bbox.height()).to.be.equal(200);
        });

        it('Gets translated primitives bounding box correctly', () => {
            arc = new Arc().translate(50, 50).radius(100).cascade();
            bbox = arc.bbox();
            expect(bbox.x()).to.be.equal(-50);
            expect(bbox.y()).to.be.equal(50);
            expect(bbox.width()).to.be.equal(200);
            expect(bbox.height()).to.be.equal(200);
        });

        it('Gets translated primitives bounding box with an offset correctly', () => {
            arc = new Arc().at(10, 10).translate(50, 50).radius(100).cascade();
            bbox = arc.bbox();
            expect(bbox.x()).to.be.equal(-40);
            expect(bbox.y()).to.be.equal(40);
            expect(bbox.width()).to.be.equal(200);
            expect(bbox.height()).to.be.equal(200);
        });

        it('Gets rotated primitives bounding box correctly', () => {
            arc = new Arc().rotate(45).radius(100).cascade();
            bbox = arc.bbox();
            expect(bbox.x()).to.be.approximately(-100, 0.1);
            expect(bbox.y()).to.be.approximately(100, 0.1);
            expect(bbox.width()).to.be.approximately(200, 0.1);
            expect(bbox.height()).to.be.approximately(200, 0.1);
        });

        it('Gets rotated primitives bounding box with an offset correctly', () => {
            arc = new Arc().at(10, 10).rotate(45).radius(100).cascade();
            bbox = arc.bbox();
            expect(bbox.x()).to.be.approximately(-85.8, 0.1);
            expect(bbox.y()).to.be.approximately(100.0, 0.1);
            expect(bbox.width()).to.be.approximately(200, 0.1);
            expect(bbox.height()).to.be.approximately(200, 0.1);
        });

        it('Gets scaled primitives bounding box correctly', () => {
            arc = new Arc().scale(2, 2).radius(100).cascade();
            bbox = arc.bbox();
            expect(bbox.x()).to.be.equal(-200);
            expect(bbox.y()).to.be.equal(200);
            expect(bbox.width()).to.be.equal(400);
            expect(bbox.height()).to.be.equal(400);
        });

        it('Gets scaled primitives bounding box with an offset correctly', () => {
            arc = new Arc();
            arc.at(10, 10).scale(3, 3).radius(100).cascade();
            bbox = arc.bbox();
            expect(bbox.x()).to.be.equal(-270);
            expect(bbox.y()).to.be.equal(270);
            expect(bbox.width()).to.be.equal(600);
            expect(bbox.height()).to.be.equal(600);
        });

        it('Gets scaled, rotated and translated primitives bounding box correctly', () => {
            arc = new Arc().translate(10, 10).rotate(270).radius(100).cascade();
            bbox = arc.bbox();
            expect(bbox.x()).to.be.approximately(-90, 0.1);
            expect(bbox.y()).to.be.approximately(90, 0.1);
            expect(bbox.width()).to.be.approximately(200.0, 0.1);
            expect(bbox.height()).to.be.approximately(200.1, 0.1);
            arc.translate(10, 10).rotate(45).cascade();
            bbox = arc.bbox();
            expect(arc.bbox().x()).to.be.approximately(-90, 0.1);
            expect(arc.bbox().y()).to.be.approximately(90, 0.1);
            expect(arc.bbox().width()).to.be.approximately(200, 0.1);
            expect(arc.bbox().height()).to.be.approximately(200, 0.1);
        });

        it('Gets scaled, rotated and translated primitives bounding box with an offset correctly', () => {
            arc = new Arc().at(10, 10).translate(10, 10).rotate(270).radius(100).cascade();
            bbox = arc.bbox();
            expect(bbox.x()).to.be.approximately(-99.9, 0.1);
            expect(bbox.y()).to.be.approximately(80.0, 0.1);
            expect(bbox.width()).to.be.approximately(200.0, 0.1);
            expect(bbox.height()).to.be.approximately(200.0, 0.1);
            arc.translate(10, 10).rotate(45).cascade();
            bbox = arc.bbox();
            expect(arc.bbox().x()).to.be.approximately(-75.8, 0.1);
            expect(arc.bbox().y()).to.be.approximately(90.0, 0.1);
            expect(arc.bbox().width()).to.be.approximately(200, 0.1);
            expect(arc.bbox().height()).to.be.approximately(200, 0.1);
        });
    });
});
