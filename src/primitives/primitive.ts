
import {Node} from "../core/node";
/**
 * @author rlapin
 */
export class Primitive extends Node{
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
     * Render primitive
     */
    public render():void{
    }
}