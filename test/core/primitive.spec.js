'use strict';

import { expect } from 'chai/chai';
import { Primitive } from '../../src/core/primitive';

describe('Primitive tests', () => {
    describe('Constructor behavior', () => {
        let primitive;

        beforeEach(function() {
            primitive = new Primitive();
        });

        it('Executes parent constructor correctly', () => {
            const spy = sinon.spy(primitive, 'parent');
            expect(primitive.parent()).to.be.equal(null);
            expect(primitive.children().array().length).to.be.equal(0);
            expect(primitive.translate().x).to.be.equal(0);
            expect(primitive.translate().y).to.be.equal(0);
            expect(primitive.rotate()).to.be.equal(0);
            expect(primitive.scale().x).to.be.equal(1);
            expect(primitive.scale().y).to.be.equal(1);
            expect(primitive.matrix().join('')).to.be.equal('100010001');
            expect(primitive.active()).to.be.equal(true);
            expect(spy.calledOnce).to.be.equal(true);
        });

        it('Executes own constructor correctly', () => {
            expect(primitive.depth()).to.be.equal(0);
            expect(primitive.hidden()).to.be.equal(false);
        });
    });

    describe('Depth setting behavior', () => {
        let primitive;

        beforeEach(function() {
            primitive = new Primitive();
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
