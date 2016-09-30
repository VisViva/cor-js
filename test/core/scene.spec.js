'use strict';

import { expect } from 'chai/chai';
import { Scene } from '../../src/core/scene';

describe('Scene tests', () => {
    describe('Common behavior', () => {
        it('Runs tests', () => {
            expect(true).to.be.equal(true);
        });
    });

    describe('Constructor behavior', () => {
        let scene;

        beforeEach(function() {
            scene = new Scene();
        });

        it('Root node constructs correctly', () => {
            expect(scene.root()).to.exist;
            expect(scene.root().parent()).to.be.equal(null);
            expect(scene.root().children().array().length).to.be.equal(0);
            expect(scene.root().translate().x).to.be.equal(0);
            expect(scene.root().translate().y).to.be.equal(0);
            expect(scene.root().rotate()).to.be.equal(0);
            expect(scene.root().scale().x).to.be.equal(1);
            expect(scene.root().scale().y).to.be.equal(1);
            expect(scene.root().matrix().join('')).to.be.equal('100010001');
            expect(scene.root().active()).to.be.equal(true);
        });
    });
});
