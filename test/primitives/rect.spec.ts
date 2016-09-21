import { expect, should } from 'chai';

import { Rect } from '../../src/primitives/rect';

describe('Primitive - Rect tests', () => {
    describe('Constructor behavior', () => {
        let rect: Rect;

        beforeEach(function() {
            rect = new Rect();
        });

        it('Executes parent constructor correctly', () => {
            expect(rect.depth()).to.equal(0);
            expect(rect.hidden()).to.equal(false);
        });

        it('Executes own constructor correctly', () => {
            expect(rect.width()).to.equal(0);
            expect(rect.height()).to.equal(0);
        });
    });

    describe('Property setting behavior', () => {
        let rect: Rect;

        beforeEach(function() {
            rect = new Rect();
        });

        it('Sets width correctly', () => {
            expect(rect.width(100)).to.equal(rect);
            expect(rect.width()).to.equal(100);
        });

        it('Sets height correctly', () => {
            expect(rect.height(100)).to.equal(rect);
            expect(rect.height()).to.equal(100);
        });
    });
});
