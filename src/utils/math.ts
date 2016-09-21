export const PI = Math.PI;

/**
 * Convert degrees to radians
 *
 * @param degrees: number
 */

export function degToRad(degrees: number): number {
    degrees %= 360;
    return degrees * (PI / 180);
}

/**
 * Convert degrees to radians
 *
 * @param radians: number
 */

export function radToDeg(radians: number): number {
    let negative = radians < 0;
    if (negative) {
        return (Math.floor((radians * (180 / PI))) % 360);
    }
    return Math.ceil((radians * (180 / PI))) % 360;
}
