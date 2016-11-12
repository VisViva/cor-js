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
            expect(material.stroke().join('')).to.be.equal('0001');
            expect(material.stroked()).to.be.equal(true);
            expect(material.width()).to.be.equal(1);
            expect(material.fill().join('')).to.be.equal('0001');
            expect(material.filled()).to.be.equal(true);
        });

        it('Constructs font correctly', () => {
            expect(material.size()).to.be.equal(48);
            expect(material.sizeUnits()).to.be.equal('px');
            expect(material.line()).to.be.equal(48);
            expect(material.lineUnits()).to.be.equal('px');
            expect(material.style()).to.be.equal('normal');
            expect(material.variant()).to.be.equal('normal');
            expect(material.weight()).to.be.equal('normal');
            expect(material.family()).to.be.equal('sans-serif');
            expect(material.font()).to.be.equal('normal normal normal 48px/48px sans-serif');
        });
    });

    describe('Property setting behavior', () => {
        let material;

        beforeEach(function() {
            material = new Material();
        });

        it('Sets stroke color correctly', () => {
            expect(material.stroke([255, 255, 255, 1])).to.be.equal(material);
            expect(material.stroke().join('')).to.be.equal('2552552551');
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
            expect(material.fill([255, 255, 255, 1])).to.be.equal(material);
            expect(material.fill().join('')).to.be.equal('2552552551');
        });

        it('Sets the filled flag correclty', () => {
            expect(material.filled()).to.be.equal(true);
            expect(material.filled(false)).to.be.equal(material);
            expect(material.filled()).to.be.equal(false);
            expect(material.filled(true)).to.be.equal(material);
            expect(material.filled()).to.be.equal(true);
        });
    });

    describe('Font setting behavior', () => {
        let material;

        beforeEach(function() {
            material = new Material();
        });

        it('Decomposes font correctly', () => {
            expect(material.font('10em/50px sans-serif')).to.be.equal(material);
            expect(material.font()).to.be.equal('10em/50px sans-serif');
        });

        it('Decomposes complex font correctly', () => {
            expect(material.font('32px/32px normal normal normal sans-serif')).to.be.equal(material);
            expect(material.font()).to.be.equal('32px/32px normal normal normal sans-serif');
        });

        it('Sets size correctly', () => {
            expect(material.size(90)).to.be.equal(material);
            expect(material.font()).to.be.equal('normal normal normal 90px/48px sans-serif');
        });

        it('Sets line height correctly', () => {
            expect(material.line(90)).to.be.equal(material);
            expect(material.font()).to.be.equal('normal normal normal 48px/90px sans-serif');
        });

        it('Sets style correctly', () => {
            expect(material.style('italic')).to.be.equal(material);
            expect(material.font()).to.be.equal('italic normal normal 48px/48px sans-serif');
        });

        it('Sets variant correctly', () => {
            expect(material.variant('small-caps')).to.be.equal(material);
            expect(material.font()).to.be.equal('normal small-caps normal 48px/48px sans-serif');
        });

        it('Sets weight correctly', () => {
            expect(material.weight('bold')).to.be.equal(material);
            expect(material.font()).to.be.equal('normal normal bold 48px/48px sans-serif');
        });
    });
});
