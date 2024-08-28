define([
    'jscore/ext/net'
], function(
    net
) {
    var RequestQueue = function() {
        this.queue = [];
        setInterval(function() {
            if (this.delay > 200) {
                this.delay -= 100;
            }
        }.bind(this), 400);
    };

    RequestQueue.prototype = {

        delay: 200,

        /**
         * Add requests to the queue.
         *
         * @param {Array} requests An array of request options for net.ajax to consume
         */
        add: function(requests) {
            this.queue = this.queue.concat(requests);
            console.log('New request added to queue');
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(this.flush.bind(this), this.delay);
        },

        /**
         * Cancel all outstanding requests.
         *
         * @return {Array} all unprocessed request options objects
         */
        cancelAll: function() {
            clearTimeout(this.timeoutId);
            var tmpQueue = this.queue;
            this.queue = [];
            return tmpQueue;
        },

        /**
         * Flush
         */
        flush: function() {
            if (this.queue.length > 0) {
                console.log('Found (' +this.queue.length+ ') requests in queue, processing oldest first...');
                this.delay += 200;
                // FIFO
                net.ajax(this.queue.shift());
            }
            this.timeoutId = setTimeout(this.flush.bind(this), this.delay);
        }
    };

    return RequestQueue;
});
