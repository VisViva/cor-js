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
            expect(in_linear_out_linear(0, 10, 5, 20, 30)).to.be.equal(25);
        });

        it('Computes correctly from 10ms to 20ms at 15ms', () => {
            expect(in_linear_out_linear(10, 20, 15, 20, 30)).to.be.equal(25);
        });
    });
});
