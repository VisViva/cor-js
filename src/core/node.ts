declare var require: any;
let mat3: any = require('gl-matrix/src/gl-matrix/mat3.js');

import { Position } from '../structs/position';
import { Rotation } from '../structs/rotation';

export class Node {
    constructor() {
        this._position = new Position();
        this._rotation = new Rotation();
        this._scale = 1;
        this._matrix = mat3.create();
    }

    private _position: Position;
    private _rotation: Rotation;
    private _scale: number;
    private _matrix: any;

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
}
