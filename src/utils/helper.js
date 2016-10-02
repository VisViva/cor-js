'use strict';

/**
 * Links the child objects prototype to the parent objects prototype
 */

export function inherit(child, parent) {
    for (var property in parent) {
        if (parent.hasOwnProperty(property)) {
            child[property] = parent[property];
        }
    }
    function extend() {
        this.constructor = child;
    }
    extend.prototype = parent.prototype;
    child.prototype = new extend();
};

/**
 * Deep clones a 3x3 matrix and returns the clone
 */

export function matrix_to_array(matrix) {
    var _matrix = [];
    for (let i = 0; i < matrix.length; ++i) {
        _matrix.push(matrix[i]);
    }
    return _matrix;
};
