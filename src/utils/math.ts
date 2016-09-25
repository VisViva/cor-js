/**
 * Trim floats to certain precision
 *
 * @param float: number
 * @param digits: number
 */

export function trimFloat(float: number, digits: number): number {
    const trimmer: number = Math.pow(10, digits);
    return Math.round(float * trimmer) / trimmer;
}

/**
 * Convert degrees to radians
 *
 * @param degrees: number
 */

export function degToRad(degrees: number): number {
    return trimFloat(degrees % 360 * (Math.PI / 180), 5);
}

/**
 * Convert degrees to radians
 *
 * @param radians: number
 */

export function radToDeg(radians: number): number {
    let negative = radians < 0;
    if (negative) {
        return (Math.floor((radians * (180 / Math.PI))) % 360);
    }
    return trimFloat(Math.ceil((radians * (180 / Math.PI))) % 360, 5);
}

/**
 * Trim angles
 *
 * @param angle: number
 */

export function trimAngle(angle: number): number {
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
