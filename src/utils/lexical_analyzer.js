'use strict';

/**
 * Lexical analyzer constructor
 */

function LexicalAnalyzer(selector) {
    if (selector) {
        selector = this.selector = selector.trim();
        this.end = selector.length;
        this.start = 0;
    }
};

/**
 * Get the next token
 */

LexicalAnalyzer.prototype.nextToken = function() {
    let index = this.start;
    while (index < this.end && this.selector.charAt(index) === ' ') {
        index++;
    }
    return this.selector.slice(this.start, index);
};

/**
 * Check if there is another token
 */

LexicalAnalyzer.prototype.hasNextToken = function() {
    return this.start !== this.end;
};

exports.LexicalAnalyzer = LexicalAnalyzer;
