import { Node } from "./node";

/**
 * Scene - is the main object. It contains root elements
 * which contains all other elements.
 */

export class Scene {
    private _root: Node;

    constructor() {
        this._root = new Node();
    }

    /**
     * Gets the root node
     */

    public root(): Node {
      return this._root;
    }
}
