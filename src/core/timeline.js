'use strict';

import * as Easings from '../utils/easings';

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
                    ease_in: 'linear',
                    ease_out: 'linear'
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

        for (var property_value in this._tracks[node_index]) {

            let time_start;
            let time_end;

            /**
             * Get the first two keyframes on the track to interpolate between,
             * removing earlier keyframes
             */

            for (var property_time in this._tracks[node_index][property_value]) {
                if (property_time >= time) {
                    if (property_time == time) {
                        this._nodes[node_index][property_value](
                            this._tracks[node_index][property_value][property_time].value
                        );
                        if (typeof time_start !== 'undefined') {
                            delete this._tracks[node_index][property_value][time_start];
                        }
                    } else {
                        time_end = property_time;
                    }
                    break;
                } else {

                    /**
                     * Delete previous keyframe if there is another keyframe
                     * before the time to seek to
                     */

                    if (typeof time_start !== 'undefined') {
                        delete this._tracks[node_index][property_value][time_start];
                    }
                    time_start = property_time;
                }
            }

            /**
             * Correct starting time if there are no previous keyframes
             */

            if (time_end) {
                if (!time_start) {
                    time_start = time_end;
                } else {
                    this._nodes[node_index][property_value](
                        Easings[
                            'in_' + this._tracks[node_index][property_value][time_start].ease_out +
                            '_out_' + this._tracks[node_index][property_value][time_end].ease_in
                        ](
                            time_start,
                            time_end,
                            time,
                            this._tracks[node_index][property_value][time_start].value,
                            this._tracks[node_index][property_value][time_end].value
                        )
                    );
                }
            }
        }
    }

    return this;
};

exports.Timeline = Timeline;
