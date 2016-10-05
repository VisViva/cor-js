'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;

import { Selection } from '../core/selection';
import { BBox } from '../core/bbox';
import { inherit } from "../utils/helper";

exports.Path = function(_scene, Primitive) {

    /**
     * Extends the Primitive prototype
     */

    inherit(Path, Primitive);

    /**
     * Path constructor
     */

    function Path() {
        Primitive.call(this);
    };

    /**
     * Gets the bounding box of the current node only
     */

    Path.prototype.bboxOwn = function() {
    };

    /**
     * Render the current path
     */

    Path.prototype.render = function() {
    };

    return Path;
};
