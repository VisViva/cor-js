declare var require: any;
let mat3: any = require('gl-matrix/src/gl-matrix/mat3.js');
let vec2: any = require('gl-matrix/src/gl-matrix/vec2.js');

import { Selection } from '../core/selection';
import { BBox } from '../core/bbox';
import { Vector } from '../structs/vector';
import { degToRad, radToDeg, trimAngle } from '../utils/math';

export class Node {

    protected _id: string; // Current node's id
    protected _position: Vector; // Current nodes position
    protected _rotation: number; // Current nodes rotation in degrees
    protected _scale: Vector; // Current nodes scale
    protected _matrix: any; // Current nodes transformation matrix
    protected _parent: Node; // Parent node of the current node
    protected _children: Array<Node>; // Child nodes of the current node
    protected _active: boolean; // Describes, whether the node should be iterated over during rendering

    constructor() {
        this._id = null;
        this._position = new Vector();
        this._rotation = 0;
        this._scale = new Vector(1, 1);
        this._matrix = mat3.create();
        this._children = [];
        this._parent = null;
        this._active = true;
    }

    public id(): string;
    public id(id: string): Node;
    public id(id?: string): any {
        if (id) {
            this._id = id;
            return this;
        } else {
            return this._id;
        }
    };

    /**
     * Get or set the position of the node
     *
     * @param position?: Position - New position value
     */

    public translate(): Vector;
    public translate(position: Vector): Node;
    public translate(position?: Vector): any {
        if (position) {
            this._position.x += position.x;
            this._position.y += position.y;
            mat3.translate(this._matrix, this._matrix, vec2.fromValues(position.x, position.y));
            return this;
        } else {
            return this._position;
        }
    };

    /**
     * Get or set the rotation of the node
     *
     * @param rotation?: Rotation - New rotation value
     */

    public rotate(): number;
    public rotate(rotation: number): Node;
    public rotate(rotation?: number): (number | Node) {
        if (rotation) {
            this._rotation = trimAngle(this._rotation + rotation);
            mat3.rotate(this._matrix, this._matrix, degToRad(this._rotation));
            return this;
        } else {
            return this._rotation;
        }
    };

    /**
     * Get or set the scale of the node
     *
     * @param scale?: number - New scale value
     */

    public scale(): Vector;
    public scale(scale: Vector): Node;
    public scale(scale?: Vector): any {
        if (scale) {
            mat3.scale(this._matrix, this._matrix, vec2.fromValues(scale.x, scale.y));
            this._scale.x *= scale.x;
            this._scale.y *= scale.y;
            return this;
        } else {
            return this._scale;
        }
    };

    /**
     * Get the transformation matrix of the node
     */

    public matrix(): Array<number>;
    public matrix(): any {
        const matrix: Array<number> = [];
        for (let i: number = 0; i < this._matrix.length; ++i) {
            matrix.push(this._matrix[i]);
        }
        return matrix;
    };

    /**
     * Append one or more nodes as children of the current node
     *
     * @param ...nodes: Array<Node> - Nodes to append
     */

    public append(...nodes: Array<Node>): Node;
    public append(...nodes: Array<Node>): any {
        for (let i: number = 0; i < nodes.length; ++i) {
            nodes[i].parent(this);
            this._children.push(nodes[i]);
        }
        return this;
    }

    /**
     * Get or set the current nodes parent
     *
     * @param parent?: Node - Node to become a parent
     */

    public parent(): Node;
    public parent(parent: Node): Node;
    public parent(parent?: Node): any {
        if (parent) {
            this._parent = parent;
            return this;
        } else {
            return this._parent;
        }
    }

    /**
     * List child nodes of the current node
     */

    public children(): Selection<Node> {
        const children: Array<Node> = [];
        for (let i: number = 0; i < this._children.length; ++i) {
            children.push(this._children[i]);
        }
        return new Selection<Node>(...children);
    }

    /**
     * Get or set the current nodes activeness status
     *
     * @param active: boolean - Current nodes activeness status
     */

    public active(): boolean;
    public active(active: boolean): Node;
    public active(active?: boolean): (boolean | Node) {
        if (typeof active !== 'undefined') {
            this._active = active;
            return this;
        } else {
            return this._active;
        }
    }

    /**
     * Gets the bounding box of the current node only
     */

    public getOwnBBox(): BBox {
        return new BBox();
    }

    /**
     * Starts recursive merge of all the child bboxes
     */

    public getBBox(): BBox {
        const bboxes: Array<BBox> = new Array<BBox>();
        for (let i = 0; i < this._children.length; ++i) {
            bboxes.push(this._children[i].getBBox());
        }
        return this.getOwnBBox().merge(...bboxes);
    }

    /**
     * Iterate over children and test them against selector
     *
     * @param criteria: string - Token starting with a '#' character will initiate a search by id
     */

    public select(selector: string): Selection<Node> {
        const selection: Selection<Node> = new Selection<Node>();
        const token: string = selector.substr(1);
        if (selector.length > 1) {
          switch (selector[0]) {
            case '#': { //TODO extract to strategy-base class
              if (this.id() === token) {
                return selection.add(this);
              } else {
                if (this._children.length > 0) {
                    //TODO this doesn't loop
                  for (let i = 0; i < this._children.length; ++i) {
                    return this._children[i].select(selector);
                  }
                } else {
                  return selection;
                }
              }
              break;
            }
            default: {
              return selection;
            }
          }
        } else {
          return selection;
        }
    }
}
