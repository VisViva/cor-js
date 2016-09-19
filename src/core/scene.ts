
import {DepthBufferManager} from "./depth.buffer";
/**
 * Scene - is the main object. It contains root elements
 * which contains all other elements.
 */
export class Scene {
    private root : Node;
    private depthBuffer: DepthBufferManager;
    private indexCache: string;
    /**
     * Renders all elements of the Scene
     */
    public render():void {
    }
    /**
     * Updates cache index
     */
    public updateIndexCache():void {
    }
    /**
     * Updates depth buffer
     */
    private sortDepthBuffer():void{
        this.depthBuffer.update();
    }
}