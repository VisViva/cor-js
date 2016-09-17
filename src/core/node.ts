declare var require: any;
let mat3: any = require('gl-matrix/src/gl-matrix/mat3.js');

import { Selection } from '../core/selection';
import { Position } from '../structs/position';
import { Rotation } from '../structs/rotation';

export class Node {
    constructor() {
        this._position = new Position();
        this._rotation = new Rotation();
        this._scale = 1;
        this._matrix = mat3.create();
        this._children = new Array<Node>();
    }

    /**
    * Private members
    */

    private _position: Position;
    private _rotation: Rotation;
    private _scale: number;
    private _matrix: any;
    private _children: Array<Node>;

    /**
    * Get or set position of the node
    *
    * @param position?: Position - New position value
    */

    public at(): Position;
    public at(position: Position): Node;
    public at(position?: Position): any {
        if (position) {
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

    public scale(): number;
    public scale(scale: number): Node;
    public scale(scale?: number): any {
        if (scale) {
            this._scale = scale;
            return this;
        } else {
            return this._scale;
        };
    };

    /**
    * Append one or more nodes as children of the current node
    *
    * @param ...nodes: Array<Node> - Nodes to append
    */

    public append(...nodes: Array<Node>): Node;
    public append(...nodes: Array<Node>): any {
        for (let i: number = 0; i < nodes.length; ++i) {
            this._children.push(nodes[i]);
        }
        return this;
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
