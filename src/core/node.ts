declare var require: any;
let mat3: any = require('gl-matrix/src/gl-matrix/mat3.js');
let vec2: any = require('gl-matrix/src/gl-matrix/vec2.js');

import { Selection } from '../core/selection';
import { BBox } from '../core/bbox';
import { Vector } from '../structs/vector';
import { Rotation } from '../structs/rotation';
import { Angle } from '../enums/angle';
import { degToRad } from '../utils/math';

export class Node {
    /**
     * Private members
     */

    private _id: string; // Current node's id
    private _position: Vector; // Current nodes position
    private _rotation: Rotation; // Current nodes rotation
    private _scale: Vector; // Current nodes scale
    private _matrix: any; // Current nodes transformation matrix
    private _parent: Node; // Parent node of the current node
    private _children: Array<Node>; // Child nodes of the current node
    private _active: boolean; // Describes, whether the node should be iterated over during rendering

    constructor() {
        this._position = new Vector();
        this._rotation = new Rotation();
        this._scale = new Vector(1, 1);
        this._matrix = mat3.create();
        this._children = new Array<Node>();
        this._parent = null;
        this._active = true;
        this._id = null;
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

    public at(): Vector;
    public at(position: Vector): Node;
    public at(position?: Vector): any {
        if (position) {
            mat3.translate(this._matrix, this._matrix, vec2.fromValues(position.x, position.y));
            this._position = position;
            return this;
        } else {
            return this._position;
        };
    };

    /**
     * Get or set the rotation of the node
     *
     * @param rotation?: Rotation - New rotation value
     */

    public rotate(): Rotation;
    public rotate(rotation: Rotation): Node;
    public rotate(rotation?: Rotation): any {
        if (rotation) {
            mat3.rotate(this._matrix, this._matrix, ((rotation.type === Angle.DEGREE) && degToRad(rotation.angle)) || rotation.type);
            this._rotation = rotation;
            return this;
        } else {
            return this._rotation;
        };
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
            this._scale = scale;
            return this;
        } else {
            return this._scale;
        };
    };

    /**
     * Get the transformation matrix of the node
     */

    public matrix(): Array<number>;
    public matrix(): any {
        const matrix: Array<number> = new Array<number>();
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
        };
    }

    /**
     * List child nodes of the current node
     */

    public children(): Selection<Node> {
        const children: Array<Node> = new Array<Node>();
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
    public active(active?: boolean): any {
        if (typeof active !== 'undefined') {
            this._active = active;
            return this;
        } else {
            return this._active;
        };
    }

    /**
     * Gets the bounding box of the current node which merges all of the
     * bounding boxes of its children.
     */

    public getBBox(): BBox {
        const bbox: BBox = new BBox();
        for (let i = 0; i < this._children.length; ++i) {
          bbox.merge(this._children[i].getBBox());
        }
        return bbox;
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
            case '#': {
              if (this.id() === token) {
                return selection.add(this);
              } else {
                if (this._children.length > 0) {
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
