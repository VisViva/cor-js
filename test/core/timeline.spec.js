'use strict';

import {
    expect
} from 'chai/chai';
import {
    Keyframe
} from '../../src/core/keyframe';
import {
    Scene
} from '../../src/core/scene';
import {
    Timeline
} from '../../src/core/timeline';

describe('Timeline tests', () => {
    const scene = new Scene('scene');
    const Node = scene.factory().Node;

    describe('Constructor behavior', () => {
        let timeline;

        beforeEach(function() {
            timeline = new Timeline();
        });

        it('Constructs correctly', () => {
            expect(timeline._nodes.length).to.be.equal(0);
            expect(timeline._tracks.length).to.be.equal(0);
        });
    });

    describe('Keyframe adding behavior', () => {
        let timeline;

        beforeEach(function() {
            timeline = new Timeline();
        });

        it('Adds single keyframe correctly', () => {
            let node = new Node();
            let keyframe_a = new Keyframe().time(20).translateX(21);
            expect(timeline.add(node, keyframe_a)).to.be.equal(timeline);
            expect(timeline._tracks.length).to.be.equal(1);
            expect(timeline._tracks[0].translateX.length).to.be.equal(21);
            expect(timeline._tracks[0].translateX[0]).to.be.equal(0);
            expect(timeline._tracks[0].translateX[20]).to.be.equal(21);
        });

        it('Adds multiple keyframes in mixed order correctly', () => {
            let node = new Node();
            let keyframe_a = new Keyframe().time(20).translateX(21);
            let keyframe_b = new Keyframe().time(5000).translateX(5001);
            let keyframe_c = new Keyframe().time(300).translateX(301);
            expect(timeline.add(node, keyframe_a, keyframe_b, keyframe_c)).to.be.equal(timeline);
            expect(timeline._tracks.length).to.be.equal(1);
            expect(timeline._tracks[0].translateX.length).to.be.equal(5001);
            expect(timeline._tracks[0].translateX[0]).to.be.equal(0);
            expect(timeline._tracks[0].translateX[20]).to.be.equal(21);
            expect(timeline._tracks[0].translateX[5000]).to.be.equal(5001);
            expect(timeline._tracks[0].translateX[300]).to.be.equal(301);
            let result = '';
            for (var property in timeline._tracks[0].translateX) {
                if (timeline._tracks[0].translateX.hasOwnProperty(property)) {
                    result += timeline._tracks[0].translateX[property];
                }
            }
            expect(result).to.be.equal('0213015001');
        });
    });

    describe('Keyframe removing behavior', () => {
        let timeline;

        beforeEach(function() {
            timeline = new Timeline();
        });

        it('Removes single keyframe correctly', () => {
            let node = new Node();
            let keyframe = new Keyframe().time(20).translateX(21);
            expect(timeline.add(node, keyframe)).to.be.equal(timeline);
            expect(timeline._tracks[0].translateX[20]).to.be.equal(21);
            expect(timeline.remove(node, keyframe)).to.be.equal(timeline);
            expect(timeline._tracks.length).to.be.equal(1);
            expect(timeline._tracks[0].translateX).not.to.exist;
        });

        it('Removes multiple keyframes in mixed order correctly', () => {
            let node = new Node();
            let keyframe_a = new Keyframe().time(20).translateX(21);
            let keyframe_b = new Keyframe().time(5000).translateX(5001);
            let keyframe_c = new Keyframe().time(300).translateX(301);
            expect(timeline.add(node, keyframe_a, keyframe_b, keyframe_c)).to.be.equal(timeline);
            expect(timeline.remove(node, keyframe_b, keyframe_a)).to.be.equal(timeline);
            expect(timeline._tracks.length).to.be.equal(1);
            expect(timeline._tracks[0].translateX.length).to.be.equal(5001);
            expect(timeline._tracks[0].translateX[0]).to.be.equal(0);
            expect(timeline._tracks[0].translateX[20]).not.to.exist;
            expect(timeline._tracks[0].translateX[300]).to.be.equal(301);
            expect(timeline._tracks[0].translateX[5000]).not.to.exist;
            expect(timeline.remove(node, keyframe_c, keyframe_a)).to.be.equal(timeline);
            expect(timeline._tracks[0].translateX).not.to.exist;
        });

        it('Removes multiple keyframes from multiple tracks in mixed order correctly', () => {
            let node = new Node();
            let keyframe_a = new Keyframe().time(20).translateX(21);
            let keyframe_b = new Keyframe().time(5000).translateX(5001);
            let keyframe_c = new Keyframe().time(300).translateY(301);
            expect(timeline.add(node, keyframe_a, keyframe_b, keyframe_c)).to.be.equal(timeline);
            expect(timeline.remove(node, keyframe_b, keyframe_a)).to.be.equal(timeline);
            expect(timeline._tracks.length).to.be.equal(1);
            expect(timeline._tracks[0].translateX).not.to.exist;
            expect(timeline._tracks[0].translateY[0]).to.be.equal(0);
            expect(timeline._tracks[0].translateY[300]).to.be.equal(301);
            expect(timeline.remove(node, keyframe_c, keyframe_a)).to.be.equal(timeline);
            expect(timeline._tracks[0].translateY).not.to.exist;
        });
    });

    describe('Seeking to the given time', () => {
        let timeline;

        beforeEach(function() {
            timeline = new Timeline();
        });

        it('Seeks single node to the given time correctly using linear interpolation', () => {
            let node = new Node();
            let keyframe = new Keyframe().time(20).scale(1.1, 1.2).translate(21, 150).rotate(50);
            expect(timeline.add(node, keyframe)).to.be.equal(timeline);
            expect(timeline._tracks[0].translateX[20]).to.be.equal(21);
            expect(timeline.seek(20)).to.be.equal(timeline);
            expect(node.translate().x).to.be.equal(21);
            expect(node.translate().y).to.be.equal(150);
            expect(node.rotate()).to.be.equal(50);
            expect(node.scale().x).to.be.equal(1.1);
            expect(node.scale().y).to.be.equal(1.2);
        });
    });
});
