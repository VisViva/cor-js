'use strict';

const glMatrix = require('gl-matrix');
const vec2 = glMatrix.vec2;
const mat3 = glMatrix.mat3;

import { Selection } from '../core/selection';
import { BBox } from '../core/bbox';
import { degToRad, radToDeg, trimAngle } from '../utils/math';

exports.Node = function (_scene) {

  /**
   * Node constructor
   */

  function Node() {

      // Current nodes position
      this._position = {
          x: 0,
          y: 0
      };

      // Current nodes rotation in degrees
      this._rotation = 0;

      // Current nodes scale
      this._scale = {
          x: 1,
          y: 1
      };

      // Current nodes transformation matrix
      this._matrix = mat3.create();

      // Current nodes cascaded transformation matrix
      this._matrix_cascaded = mat3.create();

      // Child nodes of the current node
      this._children = [];

      // Parent node of the current node
      this._parent = null;

      // Describes, whether the node should be iterated over during rendering
      this._active = true;
  };


  /**
   * Get or set the position of the node
   */

  Node.prototype.translate = function(x, y) {
      if (x && y) {
          mat3.translate(this._matrix, this._matrix, vec2.fromValues(x, y));
          this._position.x += x;
          this._position.y += y;
          return this;
      } else {
          return this._position;
      }
  };

  /**
   * Get or set the rotation of the node
   */

  Node.prototype.rotate = function(rotation) {
      if (rotation) {
          mat3.rotate(this._matrix, this._matrix, degToRad(rotation));
          this._rotation = trimAngle(this._rotation + rotation);
          return this;
      } else {
          return this._rotation;
      }
  };

  /**
   * Get or set the scale of the node
   */

  Node.prototype.scale = function(x, y) {
      if (x && y) {
          mat3.scale(this._matrix, this._matrix, vec2.fromValues(x, y));
          this._scale.x *= x;
          this._scale.y *= y;
          return this;
      } else {
          return this._scale;
      }
  };

  /**
   * Get the nodes transformation matrix
   */

  Node.prototype.matrix = function() {
      var _matrix = [];
      for (let i = 0; i < this._matrix.length; ++i) {
          _matrix.push(this._matrix[i]);
      }
      return _matrix;
  };

  /**
   * Append one or more nodes as children of the current node
   */

  Node.prototype.append = function(...nodes) {

      /**
       * Check if the current node is linked to the root,
       * and update the depth buffer if that is the case
       */

      const linked = this.linked(_scene.root());
      for (let i = 0; i < nodes.length; ++i) {
          nodes[i].parent(this);
          this._children.push(nodes[i]);
          (linked === true) && _scene._depthbuffer.append(nodes[i]);
      }

      return this;
  };

  /**
   * Get or set the current nodes parent
   */

  Node.prototype.parent = function(parent) {
      if (parent) {
          this._parent = parent;
          return this;
      } else {
          return this._parent;
      }
  };

  /**
   * List child nodes of the current node
   */

  Node.prototype.children = function() {
      const children = [];
      for (let i = 0; i < this._children.length; ++i) {
          children.push(this._children[i]);
      }
      return new Selection(...children);
  };

  /**
   * Check if the current nodes children contain the given node
   */

  Node.prototype.has = function(node) {
      if (this === node) return true;
      for (let i = 0; i < this._children.length; ++i) {
          if (this._children[i].has(node) === true) return true;
      }
      return false;
  };

  /**
   * Check if the current node is linked to the given node
   */

  Node.prototype.linked = function(node) {
      let current = this;
      while (current !== node && current.parent()) current = current.parent();
      return current === node;
  };

  /**
   * Get or set the current nodes activeness status
   */

  Node.prototype.active = function(active) {
      if (typeof active !== 'undefined') {
          this._active = active;
          return this;
      } else {
          return this._active;
      }
  };

  /**
   * Gets the bounding box of the current node only
   */

  Node.prototype.getOwnBBox = function() {
      return new BBox();
  };

  /**
   * Starts recursive merge of all the child bboxes
   */

  Node.prototype.getBBox = function() {
      const bboxes = [];
      for (let i = 0; i < this._children.length; ++i) {
          bboxes.push(this._children[i].getBBox());
      }
      return this.getOwnBBox().merge(...bboxes);
  };

  return Node;
};
