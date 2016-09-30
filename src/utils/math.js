'use strict';

/**
 * Trim floats to certain precision
 */

export function trimFloat(float, digits) {
    const trimmer = Math.pow(10, digits);
    return Math.round(float * trimmer) / trimmer;
}

/**
 * Convert degrees to radians
 */

export function degToRad(degrees) {
    return trimFloat(degrees % 360 * (Math.PI / 180), 5);
}

/**
 * Convert degrees to radians
 */

export function radToDeg(radians) {
    let negative = radians < 0;
    if (negative) {
        return (Math.floor((radians * (180 / Math.PI))) % 360);
    }
    return trimFloat(Math.ceil((radians * (180 / Math.PI))) % 360, 5);
}

/**
 * Trim angles
 */

export function trimAngle(angle) {
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
