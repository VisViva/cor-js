'use strict';

import {
    expect
} from 'chai/chai';
import {
    in_linear_out_linear
} from "../../src/utils/easings";

describe('Easing utils', () => {
    describe('In linear out linear', () => {
        it('Computes correctly from 0ms to 10ms at 5ms', () => {
            expect(in_linear_out_linear(5, 20, 10, 10)).to.be.equal(25);
        });
    });
});
