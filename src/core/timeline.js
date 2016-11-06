'use strict';

/**
 * Timeline constructor
 */

function Timeline() {
    this._nodes = [node];
    this._tracks = [
        [{
            position_x: [
                0: 0,
                1000: 100
            ],
            position_y: [
                0: 0,
                5000: 50
            ]
        }]
    ];
};

/**
 * Add keyframe
 */

Timeline.prototype.add = function(node, keyframe) {

    /**
     * Track reference
     */

    let track;

    /**
     * Acquire correct track reference, bound to the given node
     */

    const index = this._nodes.indexOf(node);
    if (index === -1) {
        this._nodes.push(node);
        track = {};
        this._tracks.push(track);
    } else {
        track = this._tracks[index];
    }

    /**
     * Add given keyframe to the track
     */
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
