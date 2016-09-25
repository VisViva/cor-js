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

/**
 * Trim angles
 *
 * @param angle: number
 */

export function trimAngle(angle: number): number {
    // if (angle > 180) {
    //     return (angle % 180) - 180;
    // } else {
    //     if (angle < -180) {
    //         return 180 - (Math.abs(angle) % 180);
    //     } else {
    //         return 180;
    //     }
    // }
    if (angle > 360) {
      return angle % 360;
    } else {
      if (angle < 0) {
        return 360 + angle % 360;
      } else {
        return angle;
      }
    }
}
