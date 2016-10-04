'use strict';

const glMatrix = require('gl-matrix');
const mat3 = glMatrix.mat3;

import { expect } from 'chai/chai';
import { inherit, matrix_to_array } from "../../src/utils/helper";

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

    describe('Converting matrix to array', () => {
        it('Clones matrices correctly', () => {
            var matrix = mat3.create();
            var matrixArray = matrix_to_array(matrix);
            expect(matrixArray.join('')).to.be.equal('100010001');
        });
    });
});
