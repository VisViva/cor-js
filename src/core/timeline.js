'use strict';

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
        for (var property in keyframes[i]._keys) {
            if (keyframes[i]._keys.hasOwnProperty(property)) {
                track[property] = track[property] || [];
                track[property][0] = track[property][0] || 0;
                track[property][keyframes[i]._time] = keyframes[i]._keys[property];
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
        for (var property in keyframes[i]._keys) {
            if (keyframes[i]._keys.hasOwnProperty(property) && track.hasOwnProperty(property)) {
                let keyframe_counter = 0;
                for (var property_value in track[property]) {
                    if (++keyframe_counter === 2) break;
                    delete track[property][keyframes[i]._time];
                }
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
    for (let node_index = 0; node_index < this._nodes.length; ++node_index) {
        for (var property_value in this._tracks[node_index]) {
            this._nodes[node_index][property_value](this._tracks[node_index][property_value][time]);
        }
    }

    return this;
};

exports.Timeline = Timeline;
