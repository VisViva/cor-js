'use strict';

import { expect } from 'chai/chai';
import { Scene } from '../../src/core/scene';
import { matrix_to_array } from '../../src/utils/helper';

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
            expect(primitive.translate().x).to.be.equal(0);
            expect(primitive.translate().y).to.be.equal(0);
            expect(primitive.rotate()).to.be.equal(0);
            expect(primitive.scale().x).to.be.equal(1);
            expect(primitive.scale().y).to.be.equal(1);
            expect(matrix_to_array(primitive.matrixOwn()).join('')).to.be.equal('100010001');
            expect(matrix_to_array(primitive.matrixCascaded()).join('')).to.be.equal('100010001');
            expect(primitive.active()).to.be.equal(true);
        });

        it('Executes own constructor correctly', () => {
            expect(primitive.debug()).to.be.equal(false);
            expect(primitive.depth()).to.be.equal(0);
            expect(primitive.hidden()).to.be.equal(false);
        });
    });

    describe('Depth setting behavior', () => {
        let primitive;

        beforeEach(function() {
            primitive = new Primitive();
        });

        it('Sets debugging state correctly', () => {
            expect(primitive.debug(true)).to.be.equal(debug);
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
    });
});
