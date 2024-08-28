define(function() {
    return {
        /**
         * Returns an object of the URI parameters of a given URL. URI decodes the parameter values.
         * e.g. 'networkexplorer?goto=app&selectionDisabled=true' will return:
         * {
         *     goto: 'app',
         *     selectionDisabled: 'true'
         * }
         *
         * @method getUrlParams
         * @param {String} url
         * @returns {Object} params URL parameters as a 1-level deep object
         */
        getUrlParams: function(url) {
            if (url.indexOf('?') < 0) {
                return {};
            }
            var params = {};
            /*
             * Splits url into an array of URI parameters.
             * 'networkexplorer?goto=app&selectionDisabled=true' becomes ['goto=app', 'selectionDisabled=true']
             */
            var paramArray = url.split(/\?(.*)#?/)[1].split('&');

            // Loops through all the URI parameters
            for (var i = 0; i < paramArray.length; i++) {
                /*
                 * Splits each URI parameter into array
                 * 'goto=app' becomes ['goto', 'app']
                 * 'selectionDisabled=true' becomes ['selectionDisabled', 'true']
                 */
                var paramParts = paramArray[i].split('=');
                var key = paramParts[0];
                if (paramParts.length > 1) {
                    try {
                        /*
                         * Assign each parameter as a property-value pair on the params object
                         * ['goto', 'app'] becomes {... 'goto': 'app', ...}
                         */
                        params[key] = decodeURIComponent(paramParts.slice(1, paramParts.length).join('='));
                    } catch (e) {
                        params[key] = undefined;
                    }
                }
            }
            return params;
        }
    };
});
