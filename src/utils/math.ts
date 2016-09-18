export const PI = 3.14159265359;

/**
 * Convert degrees to radians
 *
 * @param degrees: number
 */

export function degToRad(degrees: number): number {
  return degrees * (PI / 180);
}

/**
 * Convert degrees to radians
 *
 * @param radians: number
 */

export function radToDeg(radians: number): number {
  return radians * (180 / PI);
}
