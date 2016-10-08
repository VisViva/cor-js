'use strict';

/**
 * Selection constructor
 */

function Selection(...elements) {
    this._elements = elements;
};

Selection.prototype.first = function first() {
    return this._elements[0] || null;
};

Selection.prototype.last = function last() {
    return this._elements[this._elements.length - 1] || null;
};

Selection.prototype.add = function add(...elements) {
    Array.prototype.push.apply(this._elements, elements);
    return this;
};

Selection.prototype.range = function range(from, to) {
    const _from = from >= 0 && from || 0;
    const _to = (this._elements.length - 1 >= to && to || this._elements.length - 1) + 1;
    return new Selection(...this._elements.slice(_from, _to));
};

Selection.prototype.array = function array() {
    return this._elements.slice();
};

Selection.prototype.modify = function modify(modifier) {
    for (let i = 0; i < this._elements.length; ++i) {
        this._elements[i] = modifier(this._elements[i]);
    }
    return this;
};

Selection.prototype.reduce = function reduce(condition) {
    this._elements = this._elements.filter(condition);
    return this;
};

Selection.prototype.iterate = function reduce(iterator) {
    for (let i = 0; i < this._elements.length; ++i) {
        iterator(this._elements[i]);
    }
    return this;
};

exports.Selection = Selection;
