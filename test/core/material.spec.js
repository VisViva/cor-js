'use strict';

import {
    expect
} from 'chai/chai';
import {
    Material
} from '../../src/core/material';

describe('Material tests', () => {
    describe('Constructor behavior', () => {
        let material;

        beforeEach(function() {
            material = new Material();
        });

        it('Constructs correctly', () => {
            expect(material.stroke()).to.be.equal('#000000');
            expect(material.width()).to.be.equal(1);
            expect(material.fill()).to.be.equal('#000000');
        });
    });

    describe('Property setting behavior', () => {
        let material;

        beforeEach(function() {
            material = new Material();
        });

        it('Sets stroke color correctly', () => {
            expect(material.stroke('#FFFFFF')).to.be.equal(material);
            expect(material.stroke()).to.be.equal('#FFFFFF');
        });

        it('Sets stroke width correctly', () => {
            expect(material.width(0.5)).to.be.equal(material);
            expect(material.width()).to.be.equal(0.5);
        });

        it('Sets fill color correctly', () => {
            expect(material.fill('#FFFFFF')).to.be.equal(material);
            expect(material.fill()).to.be.equal('#FFFFFF');
        });
    });
});
