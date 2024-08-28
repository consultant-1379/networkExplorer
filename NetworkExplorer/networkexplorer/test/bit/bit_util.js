define([ ], function() {
    return {

        /**
     * checks condition change with 100ms interval
     * @param condition  - calls callback when true
     * @param timeout    - after which function finishes
     * @param callback   - executes when @condition becomes true
     */
        waitForCondition: function(condition, timeout, callback) {

            var count = 0;
            var waitInterval = setInterval(function() {
                if (condition || count*100 >= timeout)  {
                    clearInterval(waitInterval);
                    callback();
                }
                count++;
            }.bind(this), 100);
        },

        /**
     @param {el} JSCore Element
     @return {boolean}
     */
        clickElementForPhantomJS: function(el) {
        // handle JsCore element
            el.trigger('click');
        }
    }; });



