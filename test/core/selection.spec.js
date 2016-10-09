'use strict';

import {
    expect
} from 'chai/chai';
import {
    Selection
} from '../../src/core/selection';

describe('Selection tests', () => {
    describe('Selection behavior', () => {
        let selectionA;
        let selectionB;

        beforeEach(function() {
            selectionA = new Selection(1, 2, 3, 4, 5);
            selectionB = new Selection('a', 'b', 'c');
        });

        it('Exposes simple accessor methods', () => {
            expect(selectionA.first()).to.be.equal(1);
            expect(selectionB.first()).to.be.equal('a');
            expect(selectionA.last()).to.be.equal(5);
            expect(selectionB.last()).to.be.equal('c');
        });

        it('Adds new elements', () => {
            expect(selectionA.add(10)).to.be.equal(selectionA);
            const rangeA1Array = selectionA.array();
            expect(rangeA1Array.length).to.be.equal(6);
            expect(rangeA1Array.join('')).to.be.equal('1234510');
            expect(selectionB.add('d')).to.be.equal(selectionB);
            const rangeB1Array = selectionB.array();
            expect(rangeB1Array.length).to.be.equal(4);
            expect(rangeB1Array.join('')).to.be.equal('abcd');
        });

        it('Exposes working range and array methods', () => {
            const rangeA1Array = selectionA.range(-5, 3).array();
            expect(rangeA1Array.length).to.be.equal(4);
            expect(rangeA1Array.join('')).to.be.equal('1234');
            const rangeA2Array = selectionA.range(3, 10).array();
            expect(rangeA2Array.length).to.be.equal(2);
            expect(rangeA2Array.join('')).to.be.equal('45');
            const rangeA3Array = selectionA.range(5, 1).array();
            expect(rangeA3Array.length).to.be.equal(0);
            const rangeB1Array = selectionB.range(1, 4).array();
            expect(rangeB1Array.length).to.be.equal(2);
            expect(rangeB1Array.join('')).to.be.equal('bc');
            const rangeB2Array = selectionB.range(1, -4).array();
            expect(rangeB2Array.length).to.be.equal(0);
        });

        it('Exposes proper modification interface', () => {
            const rangeA1Array = selectionA.modify((element) => {
                return element += 10;
            }).array();
            expect(rangeA1Array.length).to.be.equal(5);
            expect(rangeA1Array.join('')).to.be.equal('1112131415');
            const rangeB1Array = selectionB.modify((element) => {
                return element + 10;
            }).array();
            expect(rangeB1Array.length).to.be.equal(3);
            expect(rangeB1Array.join('')).to.be.equal('a10b10c10');
        });

        it('Exposes proper reduction interface', () => {
            const rangeA1Array = selectionA.reduce((element) => {
                return element % 2 === 0;
            }).array();
            const rangeA2Array = new Selection(1, 2, 3, 4, 5).reduce((element) => {
                return element % 2 == 0;
            }).array();
            expect(rangeA2Array.length).to.be.equal(rangeA1Array.length);
            expect(rangeA1Array.length).to.be.equal(2);
            expect(rangeA1Array.join('')).to.be.equal('24');
            const rangeB1Array = selectionB.reduce((element) => {
                return element === 'a';
            }).array();
            expect(rangeB1Array.length).to.be.equal(1);
            expect(rangeB1Array.join('')).to.be.equal('a');
        });

        it('Exposes proper iteration interface', () => {
            let sum = 0;
            selectionA.iterate((element) => {
                sum += element;
            }).array();
            expect(sum).to.be.equal(15);
        });
    });
});
