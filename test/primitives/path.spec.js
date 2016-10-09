'use strict';

import { expect } from 'chai/chai';
import { Scene } from '../../src/core/scene';
import { BBox } from '../../src/core/bbox';

describe('Path tests', () => {
    let scene;
    let Node;
    let Path;

    beforeEach(function() {
        scene = new Scene();
        Node = scene.factory().Node;
        Path = scene.factory().Path;
    });

    describe('Constructor behavior', () => {
        let path;

        beforeEach(function() {
            path = new Path();
        });

        it('Executes parent constructor correctly', () => {
            expect(path.at().x).to.be.equal(0);
            expect(path.at().y).to.be.equal(0);
            expect(path.depth()).to.be.equal(0);
            expect(path.debug()).to.be.equal(false);
            expect(path.hidden()).to.be.equal(false);
        });

        it('Executes own constructor correctly', () => {
            expect(path.segments().join('')).to.be.equal('');
        });
    });

    describe('Property setting behavior', () => {
        let path;

        beforeEach(function() {
            path = new Path();
        });

        it('Sets linear segments correctly', () => {
            expect(path.linearTo(10, 20)).to.be.equal(path);
            expect(path.segments().length).to.be.equal(1);
            expect(path.segments()[0].length).to.be.equal(2);
        });

        it('Sets quadratic segments correctly', () => {
            expect(path.quadraticTo(10, 20, 30, 40)).to.be.equal(path);
            expect(path.segments().length).to.be.equal(1);
            expect(path.segments()[0].length).to.be.equal(4);
        });

        it('Sets cubic segments correctly', () => {
            expect(path.cubicTo(10, 20, 30, 40, 50, 60)).to.be.equal(path);
            expect(path.segments().length).to.be.equal(1);
            expect(path.segments()[0].length).to.be.equal(6);
        });
    });

    describe('Hierarchy', () => {
        let path;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            path = new Path();
            path.translate(10, 20);
            nodeB = new Node();
            nodeB.translate(30, 40);
            nodeC = new Node();
            nodeC.translate(50, 60);
        });

        it('Appends children one by one', () => {
            expect(path.append(nodeB)).to.be.equal(path);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(path.children().first()).to.be.equal(nodeB);
            expect(path.children().last()).to.be.equal(nodeB);
            expect(path.children().array().length).to.be.equal(1);
            expect(nodeB.children().first()).to.be.equal(nodeC);
            expect(nodeB.children().last()).to.be.equal(nodeC);
            expect(nodeB.children().array().length).to.be.equal(1);
        });

        it('Appends multiple children', () => {
            expect(path.append(nodeB, nodeC)).to.be.equal(path);
            expect(path.children().first()).to.be.equal(nodeB);
            expect(path.children().last()).to.be.equal(nodeC);
            expect(path.children().array().length).to.be.equal(2);
        });

        it('Sets parent node correctly', () => {
            expect(path.append(nodeB)).to.be.equal(path);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeB.parent()).to.be.equal(path);
            expect(nodeC.parent()).to.be.equal(nodeB);
        });
    });

    describe('Bounding box calculation behavior', () => {
        let path;
        let bbox;

        beforeEach(function() {
            path = new Path();
        });

        it('Gets linear segments bounding box correctly', () => {
            expect(path.linearTo(-100, 100)).to.be.equal(path);
            bbox = path.bboxOwn();
            expect(bbox.x()).to.be.equal(-100);
            expect(bbox.y()).to.be.equal(100);
            expect(bbox.width()).to.be.equal(100);
            expect(bbox.height()).to.be.equal(100);
        });

        it('Gets quadratic segments bounding box correctly', () => {
            expect(path.quadraticTo(-100, 100, 0, 200)).to.be.equal(path);
            bbox = path.bboxOwn();
            expect(bbox.x()).to.be.equal(-50);
            expect(bbox.y()).to.be.equal(200);
            expect(bbox.width()).to.be.equal(50);
            expect(bbox.height()).to.be.equal(200);
        });

        it('Gets cubic segments bounding box correctly', () => {
            expect(path.cubicTo(-100, 100, 50, 150, 0, 200)).to.be.equal(path);
            bbox = path.bboxOwn();
            expect(bbox.x()).to.be.approximately(-35.21, 0.01);
            expect(bbox.y()).to.be.equal(200);
            expect(bbox.width()).to.be.approximately(45.72, 0.01);
            expect(bbox.height()).to.be.equal(200);
        });
    });
});
