'use strict';

import {
    expect
} from 'chai/chai';
import {
    Timer
} from '../../src/core/timer';

describe('Timer tests', () => {
    describe('Constructor behavior', () => {
        let timer;

        beforeEach(function() {
            timer = new Timer();
        });

        it('Initializes time snaphsot on construction', () => {
            expect(timer._snapshot).to.be.approximately(new Date().getTime(), 100);
        });
    });

    describe('Resetting behavior', () => {
        let timer;

        beforeEach(function() {
            timer = new Timer();
        });

        it('Reset the time snapshot correctly', () => {
            expect(timer.reset()).to.be.approximately(new Date().getTime(), 100);
        });
    });

    describe('Delta getting behavior', () => {
        let timer;

        beforeEach(function() {
            timer = new Timer();
        });

        it('Gets the delta correctly', (done) => {
            expect(timer.reset()).to.be.approximately(new Date().getTime(), 100);
            setTimeout(() => {
              expect(timer.delta()).to.be.approximately(1000, 100);
              done();
            }, 1000);
        });
    });
});
