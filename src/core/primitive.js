'use strict';

import { inherit } from "../utils/helper";

exports.Primitive = function(_scene, Node) {

    /**
     * Extends the Node prototype
     */

    inherit(Primitive, Node);

    /**
     * Primitive constructor
     */

    function Primitive() {
        Node.call(this);
        this._depth = 0;
        this._hidden = false;
    }

    /**
     * Define depth of the primitive and return it
     */

    Primitive.prototype.depth = function(depth) {
        if (depth) {
            this._depth = depth;
            return this;
        } else {
            return this._depth;
        }
    };

    /**
     * Gets or sets visibility of the current primitive
     */

    Primitive.prototype.hidden = function(hidden) {
        if (hidden) {
            this._hidden = hidden;
            return this;
        } else {
            return this._hidden;
        }
    };

    /**
     * Render the primitive
     */

    Primitive.prototype.render = function() {};

    return Primitive;
};
