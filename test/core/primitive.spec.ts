import { expect, should } from 'chai';
import { Primitive } from '../../src/core/primitive';

describe('Primitive tests', () => {
    describe('Constructor behavior', () => {
        let primitive: Primitive;

        beforeEach(function() {
            primitive = new Primitive();
        });

        it('Executes parent constructor correctly', () => {
            const spy = sinon.spy(primitive, 'parent');
            expect(primitive.parent()).to.equal(null);
            expect(primitive.children().array().length).to.equal(0);
            expect(primitive.translate().x).to.equal(0);
            expect(primitive.translate().y).to.equal(0);
            expect(primitive.rotate()).to.equal(0);
            expect(primitive.scale().x).to.equal(1);
            expect(primitive.scale().y).to.equal(1);
            expect(primitive.matrix().join('')).to.equal('100010001');
            expect(primitive.active()).to.equal(true);
            expect(primitive.id()).to.equal(null);
            expect(spy.calledOnce).to.equal(true);
        });

        it('Executes own constructor correctly', () => {
            expect(primitive.depth()).to.equal(0);
            expect(primitive.hidden()).to.equal(false);
        });
    });

    describe('Depth setting behavior', () => {
        let primitive: Primitive;

        beforeEach(function() {
            primitive = new Primitive();
        });

        it('Sets depth correctly', () => {
            expect(primitive.depth(100)).to.equal(primitive);
            expect(primitive.depth()).to.equal(100);
        });

        it('Sets visibility correctly', () => {
            expect(primitive.hidden(true)).to.equal(primitive);
            expect(primitive.hidden()).to.equal(true);
        });
    });
});
