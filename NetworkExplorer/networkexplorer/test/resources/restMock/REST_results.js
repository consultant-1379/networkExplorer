/**
 * Respond to XHR
 */
define(function() {

    var currentRetriesCount = 0;
    var retryCountInput = 0;
    var lastUrlRequested;

    function respond(server, requestMethod, path, responseStatus, responseObject, errorCode) {
        responseObject = responseObject ? responseObject : [];
        if (window.consoleLogging) { console.log(requestMethod+' requests to '+path+' will return ['+responseStatus+'] '+JSON.stringify(responseObject)); }
        server.respondImmediately = true;
        server.respondWith(
            requestMethod,
            path,
            function(xhr) {
                lastUrlRequested = xhr.url;
                if (window.consoleLogging) { console.log('XHR returned from ' + xhr.url); }
                if (currentRetriesCount === retryCountInput) {
                    xhr.respond(
                        responseStatus,
                        {'Content-type': 'application/json'},
                        JSON.stringify(responseObject)
                    );
                } else {
                    if (errorCode) {
                        xhr.respond(500, {
                            'Content-type': 'application/json'
                        }, JSON.stringify({
                            userMessage: {
                                title: 'BIT generic title',
                                body: 'BIT generic message'
                            },
                            errorCode: errorCode
                        }));
                    } else {
                        xhr.respond(404, {}, 'Not Found');
                    }
                    currentRetriesCount++;
                }
            }
        );
    }

    /*
     Note: any configuration of the server should be done inside the test case only
     */
    return {
        /**
         * @deprecated
         * v0: Get a response containing an array of id labelled poList.
         * @param server - sinon server object
         * @param query - search query string
         * @param responseStatus - what status code the server will respond with
         * @param responseObject - a json object representing the string the server will respond with
         * @param errorCode - a string containing the error code a negative response will return with
         */
        respondToQuery: function(server, query, responseStatus, responseObject, errorCode) {
            var restPathRegex = '^\\/managedObjects\\/query\\?searchQuery=$1&fullMo=false&orderby=moName&orderdirection=asc$';
            restPathRegex = restPathRegex.replace('$1', encodeURIComponent(query));
            respond(server, 'GET', new RegExp(restPathRegex), responseStatus, responseObject, errorCode);
        },

        respondToQuery: function(server, query, responseStatus, responseObject) {
            var restPathRegex = '^\\/managedObjects\\/query\\?searchQuery=$1&fullMo=false&orderBy=moName';
            restPathRegex = restPathRegex.replace('$1', encodeURIComponent(query));
            respond(server, 'GET', new RegExp(restPathRegex), responseStatus, responseObject, responseStatus);
        },

        respondToSortedQuery: function(server, query, sortColumn, responseStatus, responseObject, errorCode) {
            var restPathRegex = '^\\/managedObjects\\/query\\?searchQuery=$1&fullMo=false&orderby=$2&orderdirection=asc';
            restPathRegex = restPathRegex.replace('$1', encodeURIComponent(query));
            restPathRegex = restPathRegex.replace('$2', encodeURIComponent(sortColumn));
            respond(server, 'GET', new RegExp(restPathRegex), responseStatus, responseObject, errorCode);
        },

        /**
         * @deprecated
         * v1: Get a response containing an array of objects with id and type.
         * @param server - sinon server object
         * @param query - search query string
         * @param responseStatus - what status code the server will respond with
         * @param responseObject - a json object representing the string the server will respond with
         * @param errorCode - a string containing the error code a negative response will return with
         */
        respondToSearchQueryV1: function(server, query, responseStatus, responseObject, errorCode) {
            var restPathRegex = '^\\/managedObjects\\/search\\?query=$1&orderby=moName&orderdirection=asc$';
            restPathRegex = restPathRegex.replace('$1', encodeURIComponent(query));
            respond(server, 'GET', new RegExp(restPathRegex), responseStatus, responseObject, errorCode);
        },

        /**
         * v2: Get a response containing an array of objects with id, type and targetTypeAttribute.
         * @param server - sinon server object
         * @param query - search query string
         * @param responseStatus - what status code the server will respond with
         * @param responseObject - a json object representing the string the server will respond with
         * @param errorCode - a string containing the error code a negative response will return with
         */
        respondToSearchQuery: function(server, query, responseStatus, responseObject, errorCode) {
            var restPathRegex = '^\\/managedObjects\\/search\\/v2\\?query=$1&orderby=moName&orderdirection=asc$';
            restPathRegex = restPathRegex.replace('$1', encodeURIComponent(query));
            respond(server, 'GET', new RegExp(restPathRegex), responseStatus, responseObject, errorCode);
        },

        respondToSearchQueryWithSort: function(server, query, sortColumn, responseStatus, responseObject, errorCode) {
            var restPathRegex = '^\\/managedObjects\\/search\\/v2\\?query=$1&orderby=$2&orderdirection=asc';
            restPathRegex = restPathRegex.replace('$1', encodeURIComponent(query));
            restPathRegex = restPathRegex.replace('$2', encodeURIComponent(sortColumn));
            respond(server, 'GET', new RegExp(restPathRegex), responseStatus, responseObject, errorCode);
        },

        respondToGetPosByPoids: function(server, responseStatus, responseObject, errorCode) {
            var restPathRegex = '^\\/managedObjects\\/getPosByPoIds';
            respond(server, 'POST', new RegExp(restPathRegex), responseStatus, responseObject, errorCode);
        },

        setRetryCountInput: function(count) {
            retryCountInput = count;
            currentRetriesCount = 0;
        },

        getRetriesCount: function() {
            return currentRetriesCount;
        },

        getLastUrlRequested: function() {
            return lastUrlRequested;
        },

        reset: function() {
            this.setRetryCountInput(0);
        }
    };
});
