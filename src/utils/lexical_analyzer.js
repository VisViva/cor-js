/**
 * Created by rlapin on 10/4/16.
 */


exports.LexicalAnalyzer = function() {
    function LexicalAnalyzer(selector) {
        if(selector) {
            selector = this.selector = selector.trim();
            this.end = selector.length;
            this.start = 0;
        }
    }



    LexicalAnalyzer.prototype.nextToken = function(){
        let index = this.start;
        while(index<this.end && this.selector.charAt(index)===' '){
            index++;
        }
        return this.selector.slice(this.start,index);
    };

    LexicalAnalyzer.prototype.hasNextToken = function(){
        return this.start !== this.end;
    };



    return LexicalAnalyzer;
};