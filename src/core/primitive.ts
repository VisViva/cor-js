import { Node } from "../core/node";
import { Vector } from "../structs/vector";

export class Primitive extends Node {
    protected _depth: number; // Determines the rendering order of the current primitive
    protected _hidden: boolean; // Determines if the current primitive will render

    constructor() {
        super();
        this._depth = 0;
        this._hidden = false;
    }

    /**
     * Define depth of the primitive and return it
     *
     * @param depth value that will be used by DepthBufferManager during rendering
     * @returns primitive with new depth value
     */

    public depth(depth: number): Primitive;

    /**
     * @returns the current depth value
     */

    public depth(): number;
    public depth(depth?: number): (Primitive | number) {
        if (depth) {
            this._depth = depth;
            return this;
        } else {
            return this._depth;
        }
    }

    /**
     * Gets or sets visibility of the current primitive
     *
     * @param visibility status
     * @returns primitive with new visibility value
     */

    public hidden(hidden: boolean): Primitive;

    /**
     * @returns the current visibility status
     */

    public hidden(): boolean;
    public hidden(hidden?: boolean): (Primitive | boolean) {
        if (hidden) {
            this._hidden = hidden;
            return this;
        } else {
            return this._hidden;
        }
    }

    /**
     * Render the primitive
     */

    public render(): void {
    }
}
