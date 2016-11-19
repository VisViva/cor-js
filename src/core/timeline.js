'use strict';

import * as EasingsFunctions from '../utils/easings';
import {
    Values,
    Easings
} from '../utils/enums';
import {
    base_name,
    decompose_color,
    decompose_text,
    compose_text
} from '../utils/helper';

/**
 * Timeline constructor
 */

function Timeline() {

    /**
     * Two array sets to emulate mapping of objects to tracks
     */

    this._objects = {};
    this._tracks = {};
    this._callbacks = [];
};

/**
 * Add keyframes
 */

Timeline.prototype.add = function (object, ...keyframes) {

    /**
     * Get the type of given object
     */

    const type = base_name(object);

    /**
     * Track reference
     */

    let track;

    /**
     * Acquire correct track reference, bound to the given object
     */

    this._objects[type] = this._objects[type] || [];
    this._tracks[type] = this._tracks[type] || [];
    let index = this._objects[type].indexOf(object);
    if (index === -1) {
        this._objects[type].push(object);
        track = {};
        this._tracks[type].push(track);
        index = this._tracks[type].length - 1;
    } else {
        track = this._tracks[type][index];
    }

    /**
     * Add given keyframes to the track
     */

    for (let i = 0; i < keyframes.length; ++i) {

        if (keyframes[i]._callback) {
            this._callbacks[keyframes[i]._time] = this._callbacks[keyframes[i]._time] || [];
            this._callbacks[keyframes[i]._time].push(keyframes[i]._callback);
        }

        /**
         * For each key of the keyframe
         */

        for (var property in keyframes[i]._keys) {
            if (keyframes[i]._keys.hasOwnProperty(property)) {

                /**
                 * Append keyframe to the timeline
                 */

                track[property] = track[property] || [];

                /**
                 * Setting initial value to starting frame
                 */

                if (!track[property][0]) {
                    let value;
                    switch (keyframes[i]._keys[property].type) {
                    case Values.numeric:
                        value = 0;
                        break;
                    case Values.color:
                        value = [0, 0, 0, 1];
                        break;
                    case Values.text:
                        value = '';
                        break;
                    default:
                        value = {};
                        break;
                    }
                    track[property][0] = {
                        type: keyframes[i]._keys[property].type,
                        value: value,
                        ease_in: Easings.linear,
                        ease_out: Easings.linear
                    };
                }

                /**
                 * Appending keyframe
                 */

                track[property][keyframes[i]._time] = {
                    type: keyframes[i]._keys[property].type,
                    value: keyframes[i]._keys[property].value,
                    ease_in: keyframes[i]._keys[property].ease_in,
                    ease_out: keyframes[i]._keys[property].ease_out
                };
            }
        }
    }

    return this;
};

/**
 * Remove keyframes
 */

Timeline.prototype.remove = function (object, ...keyframes) {

    /**
     * Get the type of given object
     */

    const type = base_name(object);

    /**
     * Track reference
     */

    let track;

    /**
     * Acquire correct track reference, bound to the given object
     * or return the timeline itself
     */

    if (!this._objects[type] || !this._tracks[type]) return this;
    let index = this._objects[type].indexOf(object);
    if (index === -1) return this;
    track = this._tracks[type][index];

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

Timeline.prototype.seek = function (time) {

    /**
     * For each object type
     */

    const objects_keys = Object.keys(this._objects);
    for (let objects_keys_index = 0; objects_keys_index < objects_keys.length; ++objects_keys_index) {

        /**
         * For each node
         */

        for (let node_index = 0; node_index < this._objects[objects_keys[objects_keys_index]].length; ++node_index) {

            /**
             * For each property track of the node
             */

            const track_keys = Object.keys(this._tracks[objects_keys[objects_keys_index]][node_index]);
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

                const track_key_keyframes = Object.keys(this._tracks[objects_keys[objects_keys_index]][node_index][track_key]);
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

                            this._objects[objects_keys[objects_keys_index]][node_index][track_key](
                                this._tracks[objects_keys[objects_keys_index]][node_index][track_key][track_key_keyframe_time].value
                            );

                            /*
                             * If this is not the first keyframe, delete all previous
                             * ones as they are no longer needed and set the starting
                             * time to undefined virgin state
                             */

                            if (time_start !== undefined) {

                                /**
                                 * If there are callbacks registered for the keyframe, call them
                                 */

                                if (this._callbacks[time_start]) {
                                    for (let callback_index = 0; callback_index < this._callbacks[time_start].length; ++callback_index) {
                                        this._callbacks[time_start][callback_index]();
                                    }
                                    delete this._callbacks[time_start];
                                }

                                /**
                                 * Delete the keyframe
                                 */

                                delete this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start];
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

                            /**
                             * Delete the keyframe
                             */

                            delete this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start];
                        }

                        /**
                         * Save the keyframe time to pass it to the interpolation
                         * function as starting time
                         */

                        time_start = track_key_keyframe_time;

                        /**
                         * If there are callbacks registered for the keyframe, call them
                         */

                        if (this._callbacks[time_start]) {
                            for (let callback_index = 0; callback_index < this._callbacks[time_start].length; ++callback_index) {
                                this._callbacks[time_start][callback_index]();
                            }
                            delete this._callbacks[time_start];
                        }
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

                        switch (this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].type) {

                            /**
                             * In case the value is of numeric type
                             */

                        case Values.numeric:
                            {
                                this._objects[objects_keys[objects_keys_index]][node_index][track_key](EasingsFunctions[
                                    'in_' + Easings[this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].ease_out] +
                                    '_out_' + Easings[this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_end].ease_in]
                                    ](
                                    time - time_start,
                                    this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].value,
                                    this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_end].value - this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].value,
                                    time_end - time_start
                                ));

                                break;
                            }

                            /**
                             * In case the value is of array type
                             */

                        case Values.path:
                            {
                                const start_array = this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].value;
                                const end_array = this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_end].value;
                                let computed_value = [];
                                for (let segment_index = 0; segment_index < start_array.length; ++segment_index) {
                                    let computed_segment_value = [];
                                    for (let index = 0; index < start_array[segment_index].length; ++index) {
                                        if (start_array[segment_index][index] === end_array[segment_index][index]) {
                                            computed_segment_value.push(start_array[segment_index][index]);
                                        } else {
                                            computed_segment_value.push(
                                                EasingsFunctions[
                                                    'in_' + Easings[this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].ease_out] +
                                                    '_out_' + Easings[this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_end].ease_in]
                                                    ](
                                                    time - time_start,
                                                    start_array[segment_index][index],
                                                    end_array[segment_index][index] - start_array[segment_index][index],
                                                    time_end - time_start
                                                )
                                            );
                                        }
                                    }
                                    computed_value.push(computed_segment_value);
                                }
                                this._objects[objects_keys[objects_keys_index]][node_index][track_key](computed_value);

                                break;
                            }

                            /**
                             * In case the value is of color type
                             */

                        case Values.color:
                            {
                                const color_start_decomposed = this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].value;
                                const color_end_decomposed = this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_end].value;
                                let computed_value = [];

                                for (let channel_index = 0; channel_index < 4; ++channel_index) {
                                    if (color_start_decomposed[channel_index] === color_end_decomposed[channel_index]) {
                                        computed_value.push(color_end_decomposed[channel_index]);
                                    } else {
                                        computed_value.push(
                                            EasingsFunctions[
                                                'in_' + Easings[this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].ease_out] +
                                                '_out_' + Easings[this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_end].ease_in]
                                                ](
                                                time - time_start,
                                                color_start_decomposed[channel_index],
                                                color_end_decomposed[channel_index] - color_start_decomposed[channel_index],
                                                time_end - time_start
                                            )
                                        );
                                    }
                                    if (channel_index < 3) {
                                        computed_value[channel_index] = Math.floor(computed_value[channel_index]);
                                    }
                                }
                                this._objects[objects_keys[objects_keys_index]][node_index][track_key](computed_value);

                                break;
                            }

                            /**
                             * In case the value is of text type
                             */

                        case Values.text:
                            {
                                const text_start_decomposed = decompose_text(this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].value);
                                const text_end_decomposed = decompose_text(this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_end].value);
                                const maximum_text_length = Math.max(text_start_decomposed.length, text_end_decomposed.length);
                                let computed_characters = [];

                                for (let character_index = 0; character_index < maximum_text_length; ++character_index) {
                                    computed_characters.push(
                                        EasingsFunctions[
                                            'in_' + Easings[this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].ease_out] +
                                            '_out_' + Easings[this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_end].ease_in]
                                            ](
                                            time - time_start,
                                            text_start_decomposed[character_index],
                                            text_end_decomposed[character_index] - text_start_decomposed[character_index],
                                            time_end - time_start
                                        )
                                    );
                                    computed_characters[character_index] = Math.floor(computed_characters[character_index]);
                                }
                                this._objects[objects_keys[objects_keys_index]][node_index][track_key](compose_text(computed_characters));

                                break;
                            }

                            /**
                             * In case the value is of complex type
                             */

                        case Values.complex:
                            {
                                this._objects[objects_keys[objects_keys_index]][node_index][track_key](
                                    this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].value
                                );

                                break;
                            }
                        }
                    }
                } else {
                    if (time_start !== undefined) {
                        this._objects[objects_keys[objects_keys_index]][node_index][track_key](
                            this._tracks[objects_keys[objects_keys_index]][node_index][track_key][time_start].value
                        );
                    }
                }
            }
        }
    }

    return this;
};

/**
 * Empty the timeline
 */

Timeline.prototype.empty = function () {
    this._tracks = {};
    this._objects = {};
    this._callbacks = [];
    return this;
};

exports.Timeline = Timeline;
