
import {Node} from "../core/node";
import {Vector} from "../structs/vector";
/**
 * @author rlapin
 */
export class Primitive extends Node{
    protected _position: Vector;
    private z: number;
    /**
     * define z-index of primitive and return primitive
     * @param depth values that will be used by DepthBufferManager on rendering
     * @returns primitive with new depth value
     */
    public depth(depth: number):Primitive;
    /**
     * @returns current depth value
     */
    public depth():number;
    public depth(depth?: number): (Primitive | number){
        if(arguments.length === 0){
            return this.z;
        }else{
            this.z = depth;
            return this;
        }
    }

    /**
     * Get or set the position of the node
     *
     * @param position?: Position - New position value
     */

    public at(): Vector;
    public at(position: Vector): Node;
    public at(position?: Vector): any {
        if (position) {
            this._position = position;
            return this;
        } else {
            return this._position;
        };
    };


    /**
     * Render primitive
     */
    public render():void{
    }
}