import { expect, should } from 'chai';
import { Selection } from '../../src/core/selection';

describe('Selection tests', () => {
    describe('Common behavior', () => {
        it('Runs tests', () => {
            expect(true).to.equal(true);
        });
    });

    describe('Selection behavior', () => {
        let selectionA: Selection<number>;
        let selectionB: Selection<string>;

        beforeEach(function() {
            selectionA = new Selection<number>(1, 2, 3, 4, 5);
            selectionB = new Selection<string>('a', 'b', 'c');
        });

        it('Exposes simple accessor methods', () => {
            expect(selectionA.first()).to.equal(1);
            expect(selectionB.first()).to.equal('a');
            expect(selectionA.last()).to.equal(5);
            expect(selectionB.last()).to.equal('c');
        });

        it('Adds new elements', () => {
            expect(selectionA.add(10)).to.equal(selectionA);
            const rangeA1Array: Array<number> = selectionA.array();
            expect(rangeA1Array.length).to.equal(6);
            expect(rangeA1Array.join('')).to.equal('1234510');
            expect(selectionB.add('d')).to.equal(selectionB);
            const rangeB1Array: Array<string> = selectionB.array();
            expect(rangeB1Array.length).to.equal(4);
            expect(rangeB1Array.join('')).to.equal('abcd');
        });

        it('Exposes working range and array methods', () => {
            const rangeA1Array: Array<number> = selectionA.range(-5, 3).array();
            expect(rangeA1Array.length).to.equal(4);
            expect(rangeA1Array.join('')).to.equal('1234');
            const rangeA2Array: Array<number> = selectionA.range(3, 10).array();
            expect(rangeA2Array.length).to.equal(2);
            expect(rangeA2Array.join('')).to.equal('45');
            const rangeA3Array: Array<number> = selectionA.range(5, 1).array();
            expect(rangeA3Array.length).to.equal(0);
            const rangeB1Array: Array<string> = selectionB.range(1, 4).array();
            expect(rangeB1Array.length).to.equal(2);
            expect(rangeB1Array.join('')).to.equal('bc');
            const rangeB2Array: Array<string> = selectionB.range(1, -4).array();
            expect(rangeB2Array.length).to.equal(0);
        });

        it('Exposes proper modification interface', () => {
            const rangeA1Array: Array<number> = selectionA.modify((element) => {
                return element += 10;
            }).array();
            expect(rangeA1Array.length).to.equal(5);
            expect(rangeA1Array.join('')).to.equal('1112131415');
            const rangeB1Array: Array<string> = selectionB.modify((element) => {
                return (element + 10)
            }).array();
            expect(rangeB1Array.length).to.equal(3);
            expect(rangeB1Array.join('')).to.equal('a10b10c10');
        });


        it('Exposes proper reduction interface', () => {
            const rangeA1Array: Array<Number> = selectionA.reduce((element: number) => {
                return element % 2 === 0;
            }).array();
            const rangeA2Array: Array<Number> = new Selection<number>(1, 2, 3, 4, 5).reduce((element: number) => {
                return element % 2 == 0
            }).array();
            expect(rangeA2Array.length).to.equal(rangeA1Array.length);
            expect(rangeA1Array.length).to.equal(2);
            expect(rangeA1Array.join('')).to.equal('24');
            const rangeB1Array: Array<string> = selectionB.reduce((element: string) => {
                return element === 'a';
            }).array();
            expect(rangeB1Array.length).to.equal(1);
            expect(rangeB1Array.join('')).to.equal('a');
        })
    });
});
