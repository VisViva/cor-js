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

        /**
         * Primitives starting point
         */

        this._at = {
            x: 0,
            y: 0
        };

        /**
         * Depth of the current primitive
         */

        this._depth = 0;

        /**
         * Flag that indicates whether debugging info should be rendered
         */

        this._debug = false;

        /**
         * Flag that indicates whether the primitive should be rendered
         */

        this._hidden = false;
    }

    /**
     * Get or set the upper left point of the rect
     */

    Primitive.prototype.at = function(x, y) {
        if (typeof x !== 'undefined' && typeof y !== 'undefined') {
            this._at.x = x;
            this._at.y = y;
            return this;
        } else {
            return this._at;
        }
    };

    /**
     * Get or set the current nodes debugger state
     */

    Primitive.prototype.debug = function(debug) {
        if (typeof debug !== 'undefined') {
            this._debug = debug;
            return this;
        } else {
            return this._debug;
        }
    };

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
