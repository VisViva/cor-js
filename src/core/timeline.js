'use strict';

/**
 * Timeline constructor
 */

function Timeline() {
    this._nodes = [];
    this._tracks = [];
};

/**
 * Add keyframe
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
     * Add given keyframe to the track
     */

    for (let i = 0; i < keyframes.length; ++i) {
        for (var property in keyframes[i]._keys) {
            if (keyframes[i]._keys.hasOwnProperty(property)) {
                track[property] = track[property] || [];
                track[property][keyframes[i]._time] = keyframes[i]._keys[property];
            }
        }
    }
};

exports.Timeline = Timeline;

/* get first 2 element of an array
var i = 0;
for (var property in a) {
    if (a.hasOwnProperty(property)) {
         console.log(property);
         ++i; if (i === 2) break;
    }
}
*/
