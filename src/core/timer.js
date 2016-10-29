'use strict';

/**
 * Timer constructor
 */

function Timer() {

    /**
     * Registered time snapshot
     */

    this._snapshot = new Date().getTime();
};

/**
 * Reset the time snapshot
 */

Timer.prototype.reset = function() {
    this._snapshot = new Date().getTime();
    return this._snapshot;
};

/**
 * Get delta in milliseconds based on the latest snapshot
 */

Timer.prototype.delta = function() {
    const now = new Date().getTime();
    return now - (this._snapshot || now);
};

exports.Timer = Timer;
