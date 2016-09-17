declare var require: any;
let mat3: any = require('gl-matrix/src/gl-matrix/mat3.js');
let vec2: any = require('gl-matrix/src/gl-matrix/vec2.js');

import { Selection } from '../core/selection';
import { Vector } from '../structs/vector';
import { Rotation } from '../structs/rotation';
import { degToRad } from '../utils/math';
import { Angle } from '../enums/angle';

export class Node {
    constructor() {
        this._position = new Vector();
        this._rotation = new Rotation();
        this._scale = new Vector(1, 1);
        this._matrix = mat3.create();
        this._children = new Array<Node>();
        this._parent = null;
    }

    /**
    * Private members
    */

    private _position: Vector;
    private _rotation: Rotation;
    private _scale: Vector;
    private _matrix: any;
    private _parent: Node;
    private _children: Array<Node>;

    /**
    * Get or set position of the node
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
    * Get or set rotation of the node
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
    * Get or set scale of the node
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
        let matrix: Array<number> = new Array<number>();
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
        let children: Array<Node> = new Array<Node>();
        for (let i: number = 0; i < this._children.length; ++i) {
            children.push(this._children[i]);
        }
        return new Selection<Node>(...children);
    }
}
