'use strict';

import { expect } from 'chai/chai';
import { deg_to_rad, rad_to_deg, trim_float, trim_angle, get_quadratic_function_for } from "../../src/utils/math";

describe('Math utils', () => {
    describe('Angle conversion', () => {
        it('Converts 30 degrees into radians correctly', () => {
            expect(deg_to_rad(30)).to.be.approximately(0.523599, 1E-3);
        });

        it('Converts negative degrees into radians correctly', () => {
            expect(deg_to_rad(-30)).to.be.approximately(-0.523599, 1E-3);
        });

        it('Converts negative degrees less than -360 into radians correctly', () => {
            expect(deg_to_rad(-390)).to.be.approximately(-0.523599, 1E-3);
        });

        it('Converts degrees more than 360 into radians correctly', () => {
            expect(deg_to_rad(390)).to.be.approximately(0.523599, 1E-3);
        });

        it('Converts Math.PI in radians into degrees correctly', () => {
            expect(rad_to_deg(Math.PI)).to.be.approximately(180, 1E-3);
        });

        it('Converts -Math.PI in radians into degrees correctly', () => {
            expect(rad_to_deg(-Math.PI)).to.be.approximately(-180, 1E-3);
        });

        it('Converts less than -Math.PI*2 in radians into degrees correctly', () => {
            expect(rad_to_deg(-3 * Math.PI)).to.be.equal(-180);
        });

        it('Converts less than -Math.PI*2 in radians into degrees correctly', () => {
            expect(rad_to_deg(3 * Math.PI)).to.be.equal(180);
        });

        it('Converts boundary radian value Math.PI*2 correctly', () => {
            expect(rad_to_deg(Math.PI * 2)).to.be.approximately(0, 1E-3);
        });

        it('Converts boundary radian value -Math.PI*2 correctly', () => {
            expect(rad_to_deg(-Math.PI * 2)).to.be.approximately(0, 1E-3);
        });

        it('Converts boundary 360 degree values correctly', () => {
            expect(deg_to_rad(360)).to.be.approximately(Math.PI * 2, 1E-3);
        });

        it('Converts boundary -360 degree values correctly', () => {
            expect(deg_to_rad(-360)).to.be.approximately(0, 1E-3);
        });
    });

    describe('Trimming angles', () => {
        it('Trims 360 degrees to itself', () => {
            expect(trim_angle(360)).to.be.equal(360);
        });

        it('Trims wide positive values to 360 degree boundaries', () => {
            expect(trim_angle(720)).to.be.equal(0);
        });

        it('Trims negative angle to 360 degree boundaries', () => {
            expect(trim_angle(-380)).to.be.equal(340);
        });

        it('Trims wide negative angle to 360 degree boundaries', () => {
            expect(trim_angle(-720)).to.be.equal(360);
        });
    });

    describe('Trimming floating point values', () => {
        it('Trims floating point values correctly', () => {
            expect(trim_float(10.123456789, 4)).to.be.equal(10.1235);
        });
    });

    describe('Quadratic function', () => {
        it('Gets value of a quadratic function by supplying control points and an interval correctly', () => {
            expect(get_quadratic_function_for(306, 156, 456, 0.33)).to.be.approximately(256, 0.1);
        });
    });
});
