import { expect } from 'chai';
import {degToRad, radToDeg} from "../../src/utils/math";
/**
 * @author rlapin
 */



describe('Math Utils - angle convertation', () => {
    it('Should correctly convert 30 degrees into radians', () => {

        expect(degToRad(30)).to.approximately(0.523599,1E-3);
    });
    it('Should correctly convert negative degrees into radians', () => {

        expect(degToRad(-30)).to.approximately(-0.523599,1E-3);
    });
    it('Should correctly convert negative degrees less than -360 into radians', () => {

        expect(degToRad(-390)).to.approximately(-0.523599,1E-3);
    });
    it('Should correctly convert degrees more than 360 into radians', () => {

        expect(degToRad(390)).to.approximately(0.523599,1E-3);
    });
    it('Should correctly convert Math.PI in radians into degrees', () => {

        expect(radToDeg(Math.PI)).to.approximately(180,1E-3);
    });
    it('Should correctly convert -Math.PI in radians into degrees', () => {

        expect(radToDeg(-Math.PI)).to.approximately(-180,1E-3);
    });
    it('Should correctly convert less than -Math.PI*2 in radians into degrees', () => {

        expect(radToDeg(-3*Math.PI)).to.equal(-180);
    });
    it('Should correctly convert less than -Math.PI*2 in radians into degrees', () => {

        expect(radToDeg(3*Math.PI)).to.equal(180);
    });
    it('Should correctly convert boundary radian value Math.PI*2',()=>{
        expect(radToDeg(Math.PI*2)).to.approximately(0,1E-3);
    });
    it('Should correctly convert boundary radian value -Math.PI*2',()=>{
        expect(radToDeg(-Math.PI*2)).to.approximately(0,1E-3);
    });
    it('Should correctly convert boundary 360 degree values',()=>{
        expect(degToRad(360)).to.approximately(0,1E-3);
    });
    it('Should correctly convert boundary -360 degree values',()=>{
        expect(degToRad(-360)).to.approximately(0,1E-3);
    });
});
