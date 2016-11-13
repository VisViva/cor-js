'use strict';

import {
    expect
} from 'chai/chai';
import {
    Manager
} from '../../src/core/manager';

describe('Manager tests', () => {
    describe('Constructor behavior', () => {
        let manager;

        beforeEach(function() {
            manager = new Manager();
        });

        it('Constructs properly', () => {
            expect(manager.scenes().length).to.be.equal(0);
        });
    });

    describe('Scene managing behavior', () => {
        let manager;

        beforeEach(function() {
            manager = new Manager();
        });

        it('Creates new scenes properly', () => {
            expect(manager.scenes().length).to.be.equal(0);
            expect(manager.new('scene').name()).to.be.equal('scene');
            expect(manager.scenes().length).to.be.equal(1);
            expect(manager.new('scene')).to.be.equal(null);
            expect(manager.scenes().length).to.be.equal(1);
        });
    });

    describe('Scene rendering behavior', () => {
        let manager;

        beforeEach(function() {
            manager = new Manager();
        });

        it('Creates new scenes properly', () => {
            expect(manager.scenes().length).to.be.equal(0);
            const scene = manager.new('scene');
            const spy = sinon.spy(scene, 'render');
            expect(manager.render()).to.be.equal(manager);
            expect(spy.calledOnce).to.be.equal(true);
        });
    });
});
