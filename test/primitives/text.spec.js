'use strict';

import {
    expect
} from 'chai/chai';
import {
    Scene
} from '../../src/core/scene';
import {
    BBox
} from '../../src/core/bbox';

describe('Rect tests', () => {
    const Factory = new Scene().factory();
    const Node = Factory.Node;
    const Text = Factory.Text;

    describe('Constructor behavior', () => {
        let text;

        beforeEach(function() {
            text = new Text();
        });

        it('Executes parent constructor correctly', () => {
            expect(text.at().x).to.be.equal(0);
            expect(text.at().y).to.be.equal(0);
            expect(text.depth()).to.be.equal(0);
            expect(text.debug()).to.be.equal(false);
            expect(text.hidden()).to.be.equal(false);
            expect(text.material().stroke().join('')).to.be.equal('0001');
            expect(text.material().stroked()).to.be.equal(true);
            expect(text.material().width()).to.be.equal(1);
            expect(text.material().fill().join('')).to.be.equal('0001');
            expect(text.material().filled()).to.be.equal(true);
        });

        it('Executes own constructor correctly', () => {
        });
    });
});
