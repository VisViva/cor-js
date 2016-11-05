'use strict';

import {
    inherit
} from "../utils/helper";
import {
    Material
} from '../core/material';

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
         * Primitives pivot point
         */

        this._pivot = {
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

        /**
         * Material of the current primitive
         */

        this._material = new Material();
    }

    /**
     * Get or set the primitives starting point
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
     * Get or set the primitives pivot point
     */

    Primitive.prototype.pivot = function(x, y) {
        if (typeof x !== 'undefined' && typeof y !== 'undefined') {
            this._pivot.x = x;
            this._pivot.y = y;
            return this;
        } else {
            return this._pivot;
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
        if (typeof depth !== 'undefined') {
            this._depth = depth;
            return this;
        } else {
            return this._depth;
        }
    };

    /**
     * Get or set visibility of the current primitive
     */

    Primitive.prototype.hidden = function(hidden) {
        if (typeof hidden !== 'undefined') {
            this._hidden = hidden;
            return this;
        } else {
            return this._hidden;
        }
    };

    /**
     * Get or set the material of the current primitive
     */

    Primitive.prototype.material = function(material) {
        if (material) {
            this._material = material;
            return this;
        } else {
            return this._material;
        }
    };

    /**
     * Render the primitive
     */

    Primitive.prototype.render = function() {};

    return Primitive;
};
