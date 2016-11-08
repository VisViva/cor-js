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

		beforeEach(function () {
			timeline = new Timeline();
		});

		it('Constructs correctly', () => {
			expect(timeline._nodes.length).to.be.equal(0);
			expect(timeline._tracks.length).to.be.equal(0);
		});
	});

	describe('Keyframe adding behavior', () => {
		let timeline;

		beforeEach(function () {
			timeline = new Timeline();
		});

		it('Adds single keyframe correctly', () => {
			timeline.add(new Node(), new Keyframe().time(20).position_x(21));
			expect(timeline._tracks.length).to.be.equal(1);
			expect(timeline._tracks[0].position_x.length).to.be.equal(21);
			expect(timeline._tracks[0].position_x[20]).to.be.equal(21);
		});

		it('Adds multiple keyframes in mixed order correctly', () => {
			timeline.add(new Node(), new Keyframe().time(20).position_x(21), new Keyframe().time(5000).position_x(5001), new Keyframe().time(300).position_x(301));
			expect(timeline._tracks.length).to.be.equal(1);
			expect(timeline._tracks[0].position_x.length).to.be.equal(5001);
			expect(timeline._tracks[0].position_x[20]).to.be.equal(21);
			expect(timeline._tracks[0].position_x[5000]).to.be.equal(5001);
			expect(timeline._tracks[0].position_x[300]).to.be.equal(301);
		});

		it('Adds multiple keyframes in mixed order correctly', () => {
			timeline.add(new Node(), new Keyframe().time(20).position_x(21), new Keyframe().time(5000).position_x(5001), new Keyframe().time(300).position_x(301));
			expect(timeline._tracks.length).to.be.equal(1);
			expect(timeline._tracks[0].position_x.length).to.be.equal(5001);
			expect(timeline._tracks[0].position_x[20]).to.be.equal(21);
			expect(timeline._tracks[0].position_x[5000]).to.be.equal(5001);
			expect(timeline._tracks[0].position_x[300]).to.be.equal(301);
			let result = '';
			for (var property in timeline._tracks[0].position_x) {
				if (timeline._tracks[0].position_x.hasOwnProperty(property)) {
					result += timeline._tracks[0].position_x[property];
				}
			}
			expect(result).to.be.equal('213015001');
		});
	});
});
