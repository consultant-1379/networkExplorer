/**
 * Respond to XHR to #networkexplorer/savedsearch/*
 */
define(function() {

    var currentRetriesCount = 0;
    var retryCountInput = 0;
    var requestBody = undefined;

    function respond(server, path, responseObject, responseStatus, requestMethod) {
        // Defaults
        responseObject = responseObject ? responseObject : [];
        responseStatus = responseStatus ? responseStatus : 200;
        requestMethod = requestMethod ? requestMethod : 'GET';
        if (window.consoleLogging) { console.log(requestMethod+' requests to '+path+' will return ['+responseStatus+'] '+JSON.stringify(responseObject)); }
        server.respondWith(
            requestMethod,
            path,
            function(xhr) {
                if (window.consoleLogging) { console.log('XHR returned from ' + xhr.url); }
                //record what value was in request
                requestBody = xhr.requestBody;
                if (currentRetriesCount === retryCountInput) {
                    xhr.respond(
                        responseStatus,
                        {
                            'Content-type': 'application/json'
                        },
                        JSON.stringify(responseObject)
                    );
                } else {
                    currentRetriesCount++;
                }
            }
        );
    }

    return {
        /**
         * Program the fake server to respond to a query
         *
         * @param server sinon server object
         * @param responseObject object to respond with
         * @param responseStatus http status code to respond with (200 default)
         */
        respondToSavedSearch: function(server, responseObject, responseStatus) {
            respond(server, /\/topologyCollections\/savedSearches\/.+/, responseObject, responseStatus);
        },

        respondToSavedSearchesList: function(server, responseObject, responseStatus) {
            respond(server, '/topologyCollections/savedSearches', responseObject, responseStatus);
        },

        recordSavedSearchPost: function(server) {
            respond(server, /\/topologyCollections\/savedSearches/, [], 201, 'POST');
        },

        getRequestBody: function() {
            return requestBody;
        },

        setRetryCountInput: function(count) {
            retryCountInput = count;
            currentRetriesCount = 0;
        },

        getRetriesCount: function() {
            return currentRetriesCount;
        },

        reset: function() {
            this.setRetryCountInput(0);
        }
    };
});
