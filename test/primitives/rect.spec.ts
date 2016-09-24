import { expect, should } from 'chai';

import { Rect } from '../../src/primitives/rect';
import { Vector } from '../../src/structs/vector';
import { Rotation } from '../../src/structs/rotation';

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

    describe('Bounding box calculation behavior', () => {
        let rect: Rect;

        it('Gets untouched bounding box correctly', () => {
          rect = (<Rect>new Rect().translate(new Vector(50, 50))).width(100).height(100);
          expect(rect.getBBox().x()).to.equal(50);
          expect(rect.getBBox().y()).to.equal(50);
          expect(rect.getBBox().width()).to.equal(100);
          expect(rect.getBBox().height()).to.equal(100);
        });
    });
});
