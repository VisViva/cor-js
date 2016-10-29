'use strict';

import {
    expect
} from 'chai/chai';
import {
    SceneManager
} from '../src/scene_manager';

describe('Core tests', () => {
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

    describe('Scene rendering behavior', () => {
        let scenemanager;

        beforeEach(function() {
            scenemanager = new SceneManager();
        });

        it('Creates new scenes properly', () => {
            expect(scenemanager.scenes().length).to.be.equal(0);
            const scene = scenemanager.new('scene');
            const spy = sinon.spy(scene, 'render');
            expect(scenemanager.render()).to.be.equal(scenemanager);
            expect(spy.calledOnce).to.be.equal(true);
        });
    });
});
