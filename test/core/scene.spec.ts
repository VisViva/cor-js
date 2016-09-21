import { expect, should } from 'chai';

import { Scene } from '../../src/core/scene';
import { Angle } from '../../src/enums/angle';

describe('Scene tests', () => {
    describe('Common behavior', () => {
        it('Runs tests', () => {
            expect(true).to.equal(true);
        });
    });

    describe('Constructor behavior', () => {
        let scene: Scene;

        beforeEach(function() {
            scene = new Scene();
        });

        it('Root node constructs correctly', () => {
            expect(scene.root()).to.exist;
            expect(scene.root().parent()).to.equal(null);
            expect(scene.root().children().array().length).to.equal(0);
            expect(scene.root().translate().x).to.equal(0);
            expect(scene.root().translate().y).to.equal(0);
            expect(scene.root().rotate().angle).to.equal(0);
            expect(scene.root().rotate().type).to.equal(Angle.DEGREE);
            expect(scene.root().scale().x).to.equal(1);
            expect(scene.root().scale().y).to.equal(1);
            expect(scene.root().matrix().join('')).to.equal('100010001');
            expect(scene.root().active()).to.equal(true);
            expect(scene.root().id()).to.equal(null);
        });
    });
});
