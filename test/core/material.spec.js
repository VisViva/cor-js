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
            expect(material.stroked()).to.be.equal(true);
            expect(material.width()).to.be.equal(1);
            expect(material.fill()).to.be.equal('#000000');
            expect(material.filled()).to.be.equal(true);
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

        it('Sets the stroked flag correclty', () => {
            expect(material.stroked()).to.be.equal(true);
            expect(material.stroked(false)).to.be.equal(material);
            expect(material.stroked()).to.be.equal(false);
            expect(material.stroked(true)).to.be.equal(material);
            expect(material.stroked()).to.be.equal(true);
        });

        it('Sets fill color correctly', () => {
            expect(material.fill('#FFFFFF')).to.be.equal(material);
            expect(material.fill()).to.be.equal('#FFFFFF');
        });

        it('Sets the filled flag correclty', () => {
            expect(material.filled()).to.be.equal(true);
            expect(material.filled(false)).to.be.equal(material);
            expect(material.filled()).to.be.equal(false);
            expect(material.filled(true)).to.be.equal(material);
            expect(material.filled()).to.be.equal(true);
        });
    });
});
