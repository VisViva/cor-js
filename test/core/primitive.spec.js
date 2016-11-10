'use strict';

import {
    expect
} from 'chai/chai';
import {
    Scene
} from '../../src/core/scene';
import {
    Material
} from '../../src/core/material';
import {
    matrix_to_array
} from '../../src/utils/helper';

describe('Primitive tests', () => {
    const Primitive = new Scene().factory().Primitive;

    describe('Constructor behavior', () => {
        let primitive;

        beforeEach(function() {
            primitive = new Primitive();
        });

        it('Executes parent constructor correctly', () => {
            expect(primitive.parent()).to.be.equal(null);
            expect(primitive.children().array().length).to.be.equal(0);
            expect(primitive.pivot().x).to.be.equal(0);
            expect(primitive.pivot().y).to.be.equal(0);
            expect(primitive.translate().x).to.be.equal(0);
            expect(primitive.translate().y).to.be.equal(0);
            expect(primitive.rotate()).to.be.equal(0);
            expect(primitive.scale().x).to.be.equal(1);
            expect(primitive.scale().y).to.be.equal(1);
            expect(primitive.active()).to.be.equal(true);
            expect(primitive.dirty()).to.be.equal(false);
            expect(matrix_to_array(primitive.matrixOwn()).join('')).to.be.equal('100010001');
            expect(matrix_to_array(primitive.matrixCascaded()).join('')).to.be.equal('100010001');
        });

        it('Executes own constructor correctly', () => {
            expect(primitive.at().x).to.be.equal(0);
            expect(primitive.at().y).to.be.equal(0);
            expect(primitive.depth()).to.be.equal(0);
            expect(primitive.debug()).to.be.equal(false);
            expect(primitive.hidden()).to.be.equal(false);
            expect(primitive.material().stroke()).to.be.equal('#000000');
            expect(primitive.material().width()).to.be.equal(1);
            expect(primitive.material().fill()).to.be.equal('#000000');
        });
    });

    describe('Property setting behavior', () => {
        let primitive;

        beforeEach(function() {
            primitive = new Primitive();
        });

        it('Sets primitives starting point', () => {
            expect(primitive.at(50, 60)).to.be.equal(primitive);
            expect(primitive.at().x).to.be.equal(50);
            expect(primitive.at().y).to.be.equal(60);
        });

        it('Sets debugging state correctly', () => {
            expect(primitive.debug(true)).to.be.equal(primitive);
            expect(primitive.debug()).to.be.equal(true);
        });

        it('Sets depth correctly', () => {
            expect(primitive.depth(100)).to.be.equal(primitive);
            expect(primitive.depth()).to.be.equal(100);
        });

        it('Sets visibility correctly', () => {
            expect(primitive.hidden(true)).to.be.equal(primitive);
            expect(primitive.hidden()).to.be.equal(true);
        });

        it('Sets material correctly', () => {
            const material = new Material().stroke('#333333').width(3).fill('#444444');
            expect(primitive.material(material)).to.be.equal(primitive);
            expect(primitive.material()).to.be.equal(material);
        });
    });
});
