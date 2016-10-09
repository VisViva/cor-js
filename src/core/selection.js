'use strict';

/**
 * Selection constructor
 */

function Selection(...elements) {
    this._elements = elements;
};

/**
 * Get the first element of the selection
 */

Selection.prototype.first = function first() {
    return this._elements[0] || null;
};

/**
 * Get the last element of the selection
 */

Selection.prototype.last = function last() {
    return this._elements[this._elements.length - 1] || null;
};

/**
 * Add one or more elements to the selection
 */

Selection.prototype.add = function add(...elements) {
    Array.prototype.push.apply(this._elements, elements);
    return this;
};

/**
 * Get a range of elements from the selection
 */

Selection.prototype.range = function range(from, to) {
    const _from = from >= 0 && from || 0;
    const _to = (this._elements.length - 1 >= to && to || this._elements.length - 1) + 1;
    return new Selection(...this._elements.slice(_from, _to));
};

/**
 * Convert selection to an array
 */

Selection.prototype.array = function array() {
    return this._elements.slice();
};

/**
 * Modify the current selection using anonymous function
 */

Selection.prototype.modify = function modify(modifier) {
    for (let i = 0; i < this._elements.length; ++i) {
        this._elements[i] = modifier(this._elements[i]);
    }
    return this;
};

/**
 * Reduce the current selection using anonymous function
 */

Selection.prototype.reduce = function reduce(condition) {
    this._elements = this._elements.filter(condition);
    return this;
};

/**
 * Iterate over the current selection using anonymous function
 */

Selection.prototype.iterate = function reduce(iterator) {
    for (let i = 0; i < this._elements.length; ++i) {
        iterator(this._elements[i]);
    }
    return this;
};

exports.Selection = Selection;
