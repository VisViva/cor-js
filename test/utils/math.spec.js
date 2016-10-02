'use strict';

import { expect } from 'chai/chai';
import { deg_to_rad, rad_to_deg } from "../../src/utils/math";

describe('Math utils', () => {
    describe('Angle conversion', () => {
        it('Converts correctly 30 degrees into radians', () => {
            expect(deg_to_rad(30)).to.be.approximately(0.523599, 1E-3);
        });

        it('Converts correctly negative degrees into radians', () => {
            expect(deg_to_rad(-30)).to.be.approximately(-0.523599, 1E-3);
        });

        it('Converts correctly negative degrees less than -360 into radians', () => {
            expect(deg_to_rad(-390)).to.be.approximately(-0.523599, 1E-3);
        });

        it('Converts correctly degrees more than 360 into radians', () => {
            expect(deg_to_rad(390)).to.be.approximately(0.523599, 1E-3);
        });

        it('Converts correctly Math.PI in radians into degrees', () => {
            expect(rad_to_deg(Math.PI)).to.be.approximately(180, 1E-3);
        });

        it('Converts correctly -Math.PI in radians into degrees', () => {
            expect(rad_to_deg(-Math.PI)).to.be.approximately(-180, 1E-3);
        });

        it('Converts correctly less than -Math.PI*2 in radians into degrees', () => {
            expect(rad_to_deg(-3 * Math.PI)).to.be.equal(-180);
        });

        it('Converts correctly less than -Math.PI*2 in radians into degrees', () => {
            expect(rad_to_deg(3 * Math.PI)).to.be.equal(180);
        });

        it('Converts correctly boundary radian value Math.PI*2', () => {
            expect(rad_to_deg(Math.PI * 2)).to.be.approximately(0, 1E-3);
        });

        it('Converts correctly boundary radian value -Math.PI*2', () => {
            expect(rad_to_deg(-Math.PI * 2)).to.be.approximately(0, 1E-3);
        });

        it('Converts correctly boundary 360 degree values', () => {
            expect(deg_to_rad(360)).to.be.approximately(0, 1E-3);
        });

        it('Converts correctly boundary -360 degree values', () => {
            expect(deg_to_rad(-360)).to.be.approximately(0, 1E-3);
        });
    });
});
