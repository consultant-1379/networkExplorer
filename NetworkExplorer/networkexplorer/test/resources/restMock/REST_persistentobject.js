/**
 * Respond to XHR
 */
define(function() {
    /**
     * @param server - sinon server object. Any configuration of the server should be done inside the test case.
     * @param path - pattern to match in AJAX request
     * @param responseObject - object the server will respond with
     * @param requestMethod - REST verb i.e. GET, PUT, HEAD, DELETE etc.
     * @param responseStatus - status code the server will respond with
     */
    function respond(server, path, responseObject, requestMethod, responseStatus) {
        // Defaults
        responseObject = responseObject ? responseObject : {treeNodes: []};
        requestMethod = requestMethod ? requestMethod : 'GET';
        responseStatus = responseStatus ? responseStatus : 200;
        if (window.consoleLogging) { console.log(requestMethod+' requests to '+path+' will return ['+responseStatus+'] '+JSON.stringify(responseObject)); }
        server.respondWith(
            requestMethod,
            path,
            function(xhr) {
                if (window.consoleLogging) { console.log('XHR returned from ' + xhr.url); }
                xhr.respond(
                    responseStatus,
                    {'Content-type': 'application/json'},
                    JSON.stringify(responseObject)
                );
            }
        );
    }
    return {
        respondToSubNetRequest: function(server, responseObject, requestMethod, responseStatus) {
            respond(server, /\/persistentObject\/network\/-1\?relativeDepth=0:-2&childDepth=1/, responseObject, requestMethod, responseStatus);
        },
        respondToOtherNodesRequest: function(server, responseObject, requestMethod, responseStatus) {
            respond(server, /\/persistentObject\/network\/-2\?relativeDepth=0:-2&childDepth=1/, responseObject, requestMethod, responseStatus);
        }
    };
});
