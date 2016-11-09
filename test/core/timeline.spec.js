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
            let keyframe_a = new Keyframe().time(20).position_x(21);
            expect(timeline.add(node, keyframe_a)).to.be.equal(timeline);
            expect(timeline._tracks.length).to.be.equal(1);
            expect(timeline._tracks[0].position_x.length).to.be.equal(21);
            expect(timeline._tracks[0].position_x[0]).to.be.equal(0);
            expect(timeline._tracks[0].position_x[20]).to.be.equal(21);
        });

        it('Adds multiple keyframes in mixed order correctly', () => {
            let node = new Node();
            let keyframe_a = new Keyframe().time(20).position_x(21);
            let keyframe_b = new Keyframe().time(5000).position_x(5001);
            let keyframe_c = new Keyframe().time(300).position_x(301);
            expect(timeline.add(node, keyframe_a, keyframe_b, keyframe_c)).to.be.equal(timeline);
            expect(timeline._tracks.length).to.be.equal(1);
            expect(timeline._tracks[0].position_x.length).to.be.equal(5001);
            expect(timeline._tracks[0].position_x[0]).to.be.equal(0);
            expect(timeline._tracks[0].position_x[20]).to.be.equal(21);
            expect(timeline._tracks[0].position_x[5000]).to.be.equal(5001);
            expect(timeline._tracks[0].position_x[300]).to.be.equal(301);
            let result = '';
            for (var property in timeline._tracks[0].position_x) {
                if (timeline._tracks[0].position_x.hasOwnProperty(property)) {
                    result += timeline._tracks[0].position_x[property];
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
            let keyframe = new Keyframe().time(20).position_x(21);
            expect(timeline.add(node, keyframe)).to.be.equal(timeline);
            expect(timeline._tracks[0].position_x[20]).to.be.equal(21);
            expect(timeline.remove(node, keyframe)).to.be.equal(timeline);
            expect(timeline._tracks.length).to.be.equal(1);
            expect(timeline._tracks[0].position_x).not.to.exist;
        });

        it('Removes multiple keyframes in mixed order correctly', () => {
            let node = new Node();
            let keyframe_a = new Keyframe().time(20).position_x(21);
            let keyframe_b = new Keyframe().time(5000).position_x(5001);
            let keyframe_c = new Keyframe().time(300).position_x(301);
            expect(timeline.add(node, keyframe_a, keyframe_b, keyframe_c)).to.be.equal(timeline);
            expect(timeline.remove(node, keyframe_b, keyframe_a)).to.be.equal(timeline);
            expect(timeline._tracks.length).to.be.equal(1);
            expect(timeline._tracks[0].position_x.length).to.be.equal(5001);
            expect(timeline._tracks[0].position_x[0]).to.be.equal(0);
            expect(timeline._tracks[0].position_x[20]).not.to.exist;
            expect(timeline._tracks[0].position_x[300]).to.be.equal(301);
            expect(timeline._tracks[0].position_x[5000]).not.to.exist;
            expect(timeline.remove(node, keyframe_c, keyframe_a)).to.be.equal(timeline);
            expect(timeline._tracks[0].position_x).not.to.exist;
        });

        it('Removes multiple keyframes from multiple tracks in mixed order correctly', () => {
            let node = new Node();
            let keyframe_a = new Keyframe().time(20).position_x(21);
            let keyframe_b = new Keyframe().time(5000).position_x(5001);
            let keyframe_c = new Keyframe().time(300).position_y(301);
            expect(timeline.add(node, keyframe_a, keyframe_b, keyframe_c)).to.be.equal(timeline);
            expect(timeline.remove(node, keyframe_b, keyframe_a)).to.be.equal(timeline);
            expect(timeline._tracks.length).to.be.equal(1);
            expect(timeline._tracks[0].position_x).not.to.exist;
            expect(timeline._tracks[0].position_y[0]).to.be.equal(0);
            expect(timeline._tracks[0].position_y[300]).to.be.equal(301);
            expect(timeline.remove(node, keyframe_c, keyframe_a)).to.be.equal(timeline);
            expect(timeline._tracks[0].position_y).not.to.exist;
        });
    });

    // describe('Calculate scene state for the given time', () => {
    //     let timeline;
    //
    //     beforeEach(function() {
    //         timeline = new Timeline();
    //     });
    //
    //     it('Calculates single node', () => {
    //         let node = new Node();
    //         let keyframe = new Keyframe().time(20).position_x(21);
    //         expect(timeline.add(node, keyframe)).to.be.equal(timeline);
    //         expect(timeline._tracks[0].position_x[20]).to.be.equal(21);
    //
    //     });
    // });
});
