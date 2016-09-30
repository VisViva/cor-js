'use strict';

import { expect } from 'chai/chai';
import { inherit } from "../../src/utils/helper";

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
});
