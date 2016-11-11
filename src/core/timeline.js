'use strict';

import * as EasingsFunctions from '../utils/easings';
import {
    Easings
} from '../utils/enums';

/**
 * Timeline constructor
 */

function Timeline() {
    this._nodes = [];
    this._tracks = [];
};

/**
 * Add keyframes
 */

Timeline.prototype.add = function(node, ...keyframes) {

    /**
     * Track reference
     */

    let track;

    /**
     * Acquire correct track reference, bound to the given node
     */

    let index = this._nodes.indexOf(node);
    if (index === -1) {
        this._nodes.push(node);
        track = {};
        this._tracks.push(track);
        index = this._tracks.length - 1;
    } else {
        track = this._tracks[index];
    }

    /**
     * Add given keyframes to the track
     */

    for (let i = 0; i < keyframes.length; ++i) {

        /**
         * For each key of the keyframe
         */

        for (var property in keyframes[i]._keys) {
            if (keyframes[i]._keys.hasOwnProperty(property)) {

                /**
                 * Append keyframe to the timeline
                 */

                track[property] = track[property] || [];
                track[property][0] = track[property][0] || {
                    value: 0,
                    ease_in: Easings.linear,
                    ease_out: Easings.linear
                };
                track[property][keyframes[i]._time] = {
                    ease_in: keyframes[i]._keys[property].ease_in,
                    ease_out: keyframes[i]._keys[property].ease_out,
                    value: keyframes[i]._keys[property].value
                };
            }
        }
    }

    return this;
};

/**
 * Remove keyframes
 */

Timeline.prototype.remove = function(node, ...keyframes) {

    /**
     * Track reference
     */

    let track;

    /**
     * Acquire correct track reference, bound to the given node
     * or return the timeline itself
     */

    let index = this._nodes.indexOf(node);
    if (index === -1) return this;
    track = this._tracks[index];

    /**
     * Remove given keyframes from the track
     */

    for (let i = 0; i < keyframes.length; ++i) {

        /**
         * For each key of the keyframe
         */

        for (var property in keyframes[i]._keys) {
            if (keyframes[i]._keys.hasOwnProperty(property) && track.hasOwnProperty(property)) {

                /**
                 * Delete keyframe from the timeline
                 */

                let keyframe_counter = 0;
                for (var property_value in track[property]) {
                    if (++keyframe_counter === 2) break;
                    delete track[property][keyframes[i]._time];
                }

                /**
                 * Delete the whole track if it has no more keyframes
                 */

                keyframe_counter === 1 && delete track[property];
            }
        }
    }

    return this;
};

/**
 * Seek to the given time or current time if nothing is supplied
 */

Timeline.prototype.seek = function(time) {

    /**
     * For each node
     */

    for (let node_index = 0; node_index < this._nodes.length; ++node_index) {

        /**
         * For each property track of the node
         */

        const track_keys = Object.keys(this._tracks[node_index]);
        for (let i = 0; i < track_keys.length; ++i) {

            /**
             * Get the first two keyframes on the track to interpolate between,
             * removing earlier keyframes
             */

            const track_key = track_keys[i];
            let time_start;
            let time_end;

            /**
             * Iterate over all track keys of the track corresponding to the
             * selected node
             */

            const track_key_keyframes = Object.keys(this._tracks[node_index][track_key]);
            for (let j = 0; j < track_key_keyframes.length; ++j) {

                /**
                 * Keyframe time
                 */

                const track_key_keyframe_time = track_key_keyframes[j];

                /**
                 * Check if the selected keyframe time is equal or higher than
                 * the time we are at
                 */

                if (track_key_keyframe_time >= time) {

                    /**
                     * If current time in milliseconds is the exact time the
                     * keframe is placed at
                     */

                    if (track_key_keyframe_time == time) {

                        /*
                         * Extract the value and apply it to the node without
                         * any kind of interpolation function call to speed things up
                         */

                        this._nodes[node_index][track_key](
                            this._tracks[node_index][track_key][track_key_keyframe_time].value
                        );

                        /*
                         * If this is not the first keyframe, delete all previous
                         * ones as they are no longer needed and set the starting
                         * time to undefined virgin state
                         */

                        if (time_start !== undefined) {
                            delete this._tracks[node_index][track_key][time_start];
                            time_start = undefined;
                        }
                    } else {

                        /**
                         * If current time in milliseconds is not the exact time
                         * the keframe is placed at, save the keyframe time to
                         * pass it to the interpolation function as ending time
                         */

                        time_end = track_key_keyframe_time;
                    }

                    /**
                     * Break the loop and proceed to the next track key
                     */

                    break;
                } else {

                    /**
                     * Delete previous keyframe if there is another keyframe
                     * before the current time
                     */

                    if (time_start !== undefined) {
                        delete this._tracks[node_index][track_key][time_start];
                    }

                    /**
                     * Save the keyframe time to pass it to the interpolation
                     * function as starting time
                     */

                    time_start = track_key_keyframe_time;
                }
            }

            /**
             * Correct starting time if there are no previous keyframes
             */

            if (time_end !== undefined) {

                /**
                 * Set starting time to the value of ending time if no keyframes
                 * exists earlier on the timeline to reflect it
                 */

                if (time_start === undefined) {
                    time_start = time_end;
                } else {

                    /**
                     * Dynamically compose easing function name and call it with
                     * arguments composed of data retrieved above, applying the
                     * result of computation to the node
                     */

                    this._nodes[node_index][track_key](
                        EasingsFunctions[
                            'in_' + Easings[this._tracks[node_index][track_key][time_start].ease_out] +
                            '_out_' + Easings[this._tracks[node_index][track_key][time_end].ease_in]
                        ](
                            time - time_start,
                            this._tracks[node_index][track_key][time_start].value,
                            this._tracks[node_index][track_key][time_end].value - this._tracks[node_index][track_key][time_start].value,
                            time_end - time_start
                        )
                    );
                }
            } else {
                if (time_start !== undefined) {
                    this._nodes[node_index][track_key](
                        this._tracks[node_index][track_key][time_start].value
                    );
                }
            }
        }
    }

    return this;
};

exports.Timeline = Timeline;
