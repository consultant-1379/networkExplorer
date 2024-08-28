/**
 * Respond to XHR for network-explorer-import resources
 */
define(function() {

    var currentRetriesCount = 0;
    var retryCountInput = 0;
    var lastUrlRequested;
    var lastRequestBody;
    var lastMethodRequested;

    function respond(server, path, requestMethod, responseStatus, responseObject) {
        responseObject = responseObject ? responseObject : [];
        responseStatus = responseStatus ? responseStatus : 200;
        requestMethod = requestMethod ? requestMethod : 'GET';
        if (window.consoleLogging) { console.log(requestMethod+' requests to '+path+' will return ['+responseStatus+'] '+JSON.stringify(responseObject)); }
        server.respondWith(
            requestMethod,
            path,
            function(xhr) {
                if (window.consoleLogging) { console.log('XHR returned from ' + xhr.url); }
                lastUrlRequested = xhr.url;
                lastMethodRequested = xhr.method;
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
                lastRequestBody = xhr.requestBody;
            }
        );
    }

    return {
        /**
         * Program the fake server to respond to a POST request for REST service  /network-explorer-import/v1/collection/export
         * It is used in exporting collections of objects
         *
         * @param server sinon server object
         * @param responseObject object to respond with
         */
        respondToExportObjectCollection: function(server, responseObject) {
            respond(server, '/network-explorer-import/v1/collection/export', 'POST', 202, responseObject);
        },

        /**
         * Program the fake server to respond to a POST request for REST service  /network-explorer-import/v1/collection/export/nested
         * It is used in exporting collections of collections
         *
         * @param server sinon server object
         * @param responseObject object to respond with
         */
        respondToExportBranchCollection: function(server, responseObject) {
            respond(server, '/network-explorer-import/v1/collection/export/nested', 'POST', 202, responseObject);
        },

        /**
         * Program the fake server to respond to a POST request for REST service  /network-explorer-import/v1/collection/export/status
         *
         * @param server sinon server object
         * @param sessionId id of export action session
         * @param responseObject object to respond with
         */
        respondToExportStatus: function(server, sessionId, responseObject) {
            respond(server, '/network-explorer-import/v1/collection/export/status/' + sessionId, 'GET', 200, responseObject);
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
        },

        getLastUrlRequested: function() {
            return lastUrlRequested;
        },

        getLastRequestBody: function() {
            return lastRequestBody;
        },

        getLastMethodRequested: function() {
            return lastMethodRequested;
        }
    };
});
