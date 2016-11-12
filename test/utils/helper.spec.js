'use strict';

const glMatrix = require('gl-matrix');
const mat3 = glMatrix.mat3;

import {
    expect
} from 'chai/chai';
import {
    inherit,
    matrix_to_array,
    glmatrix_to_canvas_matrix,
    decompose_text,
    compose_text
} from "../../src/utils/helper";

describe('Helper utilities', () => {
    describe('Inheriting behavior', () => {
        it('Links prototypes properly', () => {
            inherit(Child, Base);

            function Base() {};
            Base.prototype.do = function(value) {
                return true;
            };

            function Child() {};
            var child = new Child();
            var base = new Base();
            expect(child.do()).to.be.equal(true);
            expect(base.do()).to.be.equal(true);
        });
    });

    describe('Converting a matrix to an array', () => {
        it('Clones matrices correctly', () => {
            var matrix = mat3.create();
            var matrixArray = matrix_to_array(matrix);
            expect(matrixArray.join('')).to.be.equal('100010001');
        });
    });

    describe('Converting a glmatrix to a canvas transformation matrix', () => {
        it('Converts matrices correctly', () => {
            var matrix = mat3.create();
            expect(glmatrix_to_canvas_matrix(matrix).join('')).to.be.equal('100100');
        });
    });

    describe('Text utulities', () => {
        it('Decomposes a text string into an array of uncode characters correctly', () => {
            expect(decompose_text('Привет!').join('')).to.be.equal('10551088108010741077109033');
        });

        it('Composes an array of uncode characters into a text string correctly', () => {
            expect(compose_text([1055, 1088, 1080, 1074, 1077, 1090, 33])).to.be.equal('Привет!');
        });
    });
});
