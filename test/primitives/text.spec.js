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

describe('text tests', () => {
    const Factory = new Scene().factory();
    const Node = Factory.Node;
    const Text = Factory.Text;

    describe('Constructor behavior', () => {
        let text;

        beforeEach(function() {
            text = new Text();
        });

        it('Executes parent constructor cortextly', () => {
            expect(text.at().x).to.be.equal(0);
            expect(text.at().y).to.be.equal(0);
            expect(text.depth()).to.be.equal(0);
            expect(text.debug()).to.be.equal(false);
            expect(text.hidden()).to.be.equal(false);
            expect(text.material().stroke().join('')).to.be.equal('0001');
            expect(text.material().stroked()).to.be.equal(true);
            expect(text.material().width()).to.be.equal(1);
            expect(text.material().fill().join('')).to.be.equal('0001');
            expect(text.material().filled()).to.be.equal(true);
        });

        it('Executes own constructor cortextly', () => {
            expect(text.text()).to.be.equal('');
        });
    });

    describe('Property setting behavior', () => {
        let text;

        beforeEach(function() {
            text = new Text();
        });

        it('Sets rotation cortextly', () => {
            expect(text.rotate(45)).to.be.equal(text);
            expect(text.rotate()).to.be.equal(45);
        });

        it('Sets position cortextly', () => {
            expect(text.translate(10, 20)).to.be.equal(text);
            expect(text.translate().x).to.be.equal(10);
            expect(text.translate().y).to.be.equal(20);
        });

        it('Sets scale cortextly', () => {
            expect(text.scale(10, 20)).to.be.equal(text);
            expect(text.scale().x).to.be.equal(10);
            expect(text.scale().y).to.be.equal(20);
        });

        it('Sets text cortextly', () => {
            expect(text.text('test')).to.be.equal(text);
            expect(text.text()).to.be.equal('test');
        });
    });

    describe('Hierarchy', () => {
        let text;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            text = new Text();
            text.translate(10, 20);
            nodeB = new Node();
            nodeB.translate(30, 40);
            nodeC = new Node();
            nodeC.translate(50, 60);
        });

        it('Appends children one by one', () => {
            expect(text.append(nodeB)).to.be.equal(text);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(text.children().first()).to.be.equal(nodeB);
            expect(text.children().last()).to.be.equal(nodeB);
            expect(text.children().array().length).to.be.equal(1);
            expect(nodeB.children().first()).to.be.equal(nodeC);
            expect(nodeB.children().last()).to.be.equal(nodeC);
            expect(nodeB.children().array().length).to.be.equal(1);
        });

        it('Appends multiple children', () => {
            expect(text.append(nodeB, nodeC)).to.be.equal(text);
            expect(text.children().first()).to.be.equal(nodeB);
            expect(text.children().last()).to.be.equal(nodeC);
            expect(text.children().array().length).to.be.equal(2);
        });

        it('Sets parent node cortextly', () => {
            expect(text.append(nodeB)).to.be.equal(text);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeB.parent()).to.be.equal(text);
            expect(nodeC.parent()).to.be.equal(nodeB);
        });
    });

    describe('Bounding box calculation behavior', () => {
        let text;
        let bbox;

        it('Gets untouched bounding box cortextly', () => {
            text = new Text().text('test').cascade();
            bbox = text.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-9.5, 0.5);
            expect(bbox.y()).to.be.equal(24);
            expect(bbox.width()).to.be.approximately(18, 0.1);
            expect(bbox.height()).to.be.equal(48);
        });

        it('Gets bounding box of a textangle with an offset cortextly', () => {
            text = new Text().at(10, 10).text('test').cascade();
            bbox = text.bboxCascaded();
            expect(bbox.x()).to.be.approximately(1.0, 0.1);
            expect(bbox.y()).to.be.equal(14);
            expect(bbox.width()).to.be.approximately(18.0, 0.1);
            expect(bbox.height()).to.be.equal(48);
        });

        it('Gets translated primitives bounding box cortextly', () => {
            text = new Text().translate(50, 50).text('test').cascade();
            bbox = text.bboxCascaded();
            expect(bbox.x()).to.be.approximately(41.0, 0.1);
            expect(bbox.y()).to.be.equal(-26);
            expect(bbox.width()).to.be.approximately(18.0, 0.1);
            expect(bbox.height()).to.be.equal(48);
        });

        it('Gets translated primitives bounding box with an offset cortextly', () => {
            text = new Text().at(10, 10).translate(50, 50).text('test').cascade();
            bbox = text.bboxCascaded();
            expect(bbox.x()).to.be.approximately(51.0, 0.1);
            expect(bbox.y()).to.be.equal(-36);
            expect(bbox.width()).to.be.approximately(18.0, 0.1);
            expect(bbox.height()).to.be.equal(48);
        });

        it('Gets rotated primitives bounding box cortextly', () => {
            text = new Text().rotate(45).text('test').cascade();
            bbox = text.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-23.3, 0.1);
            expect(bbox.y()).to.be.approximately(23.3, 0.1);
            expect(bbox.width()).to.be.approximately(46.6, 0.1);
            expect(bbox.height()).to.be.approximately(46.6, 0.1);
        });

        it('Gets rotated primitives bounding box with an offset cortextly', () => {
            text = new Text().at(10, 10).rotate(45).text('test').cascade();
            bbox = text.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-9.2, 0.1);
            expect(bbox.y()).to.be.approximately(23.3, 0.1);
            expect(bbox.width()).to.be.approximately(46.6, 0.1);
            expect(bbox.height()).to.be.approximately(46.6, 0.1);
        });

        it('Gets scaled primitives bounding box cortextly', () => {
            text = new Text().scale(2, 2).text('test').cascade();
            bbox = text.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-18, 0.1);
            expect(bbox.y()).to.be.equal(48);
            expect(bbox.width()).to.be.approximately(36.0, 0.1);
            expect(bbox.height()).to.be.equal(96);
        });

        it('Gets scaled primitives bounding box with an offset cortextly', () => {
            text = new Text();
            text.at(10, 10).scale(3, 3).text('test').cascade();
            bbox = text.bboxCascaded();
            expect(bbox.x()).to.be.approximately(3, 0.1);
            expect(bbox.y()).to.be.equal(42);
            expect(bbox.width()).to.be.approximately(54.0, 0.1);
            expect(bbox.height()).to.be.equal(144);
        });

        it('Gets scaled, rotated and translated primitives bounding box correctly', () => {
            text = new Text().translate(10, 10).rotate(270).text('test').cascade();
            bbox = text.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-14.0, 0.1);
            expect(bbox.y()).to.be.approximately(-0.9, 0.1);
            expect(bbox.width()).to.be.approximately(48.0, 0.1);
            expect(bbox.height()).to.be.approximately(18.0, 0.1);
            text.translate(10, 10).rotate(45).cascade();
            bbox = text.bboxCascaded();
            expect(text.bboxCascaded().x()).to.be.approximately(-13.3, 0.1);
            expect(text.bboxCascaded().y()).to.be.approximately(13.3, 0.1);
            expect(text.bboxCascaded().width()).to.be.approximately(46.6, 0.1);
            expect(text.bboxCascaded().height()).to.be.approximately(46.6, 0.1);
        });

        it('Gets scaled, rotated and translated primitives bounding box with an offset cortextly', () => {
            text = new Text().at(10, 10).translate(10, 10).rotate(270).text('test').cascade();
            bbox = text.bboxCascaded();
            expect(bbox.x()).to.be.approximately(-24.0, 0.1);
            expect(bbox.y()).to.be.approximately(-10.9, 0.1);
            expect(bbox.width()).to.be.approximately(48.0, 0.1);
            expect(bbox.height()).to.be.approximately(18.0, 0.1);
            text.translate(10, 10).rotate(45).cascade();
            bbox = text.bboxCascaded();
            expect(text.bboxCascaded().x()).to.be.approximately(0.8, 0.1);
            expect(text.bboxCascaded().y()).to.be.approximately(13.3, 0.1);
            expect(text.bboxCascaded().width()).to.be.approximately(46.6, 0.1);
            expect(text.bboxCascaded().height()).to.be.approximately(46.6, 0.1);
        });
    });
});
