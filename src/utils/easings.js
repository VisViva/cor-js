'use strict';

/**
 * Get value for a linear function by supplying starting time, ending time,
 * an interval and two values
 */

export function in_linear_out_linear(time_start, time_end, time_at, point_start, point_end) {
    return (point_end - point_start) / (time_end - time_start) * time_at;
}
