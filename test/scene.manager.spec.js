'use strict';

import { expect } from 'chai/chai';
import { SceneManager } from '../src/scene.manager';

describe('Core tests', () => {
    describe('Common behavior', () => {
        it('Runs tests', () => {
            expect(true).to.be.equal(true);
        });
    });

    describe('Constructor behavior', () => {
        let scenemanager;

        beforeEach(function() {
            scenemanager = new SceneManager();
        });

        it('Constructs properly', () => {
            expect(scenemanager.scenes().length).to.be.equal(0);
        });
    });

    describe('Scene managing behavior', () => {
        let scenemanager;

        beforeEach(function() {
            scenemanager = new SceneManager();
        });

        it('Creates new scenes properly', () => {
            expect(scenemanager.scenes().length).to.be.equal(0);
            expect(scenemanager.new('scene').name()).to.be.equal('scene');
            expect(scenemanager.scenes().length).to.be.equal(1);
            expect(scenemanager.new('scene')).to.be.equal(null);
            expect(scenemanager.scenes().length).to.be.equal(1);
        });
    });
});
