/**
 *    Define all REST mocks here that are required to run an application in a positive scenario
 *    (all known REST endpoints work).
 */

define([
    'test/resources/restMock/data/savedSearches',
    'test/resources/restMock/data/savedSearches/savedSearch1',
    'test/resources/restMock/data/savedSearches/savedSearch2',
    'test/resources/restMock/data/savedSearches/savedSearch3',
    'test/resources/restMock/data/savedSearches/savedSearch4',
    'test/resources/restMock/data/savedSearches/savedSearch5',
    'test/resources/restMock/data/savedSearches/savedSearch6',
    'test/resources/restMock/data/savedSearches/savedSearch7',
    'test/resources/restMock/data/savedSearches/savedSearch8'

],function(savedSearches, savedSearch1, savedSearch2, savedSearch3, savedSearch4, savedSearch5, savedSearch6, savedSearch7, savedSearch8) {

    var restPath = '/topologyCollections/savedSearches';

    var queryResponseMappings = {
        savedSearch1: {
            poId: savedSearch1.poId,
            response: savedSearch1
        },
        savedSearch2: {
            poId: savedSearch2.poId,
            response: savedSearch2
        },
        savedSearch3: {
            poId: savedSearch3.poId,
            response: savedSearch3
        },
        savedSearch4: {
            poId: savedSearch4.poId,
            response: savedSearch4
        },
        savedSearch5: {
            poId: savedSearch5.poId,
            response: savedSearch5
        },
        savedSearch6: {
            poId: savedSearch6.poId,
            response: savedSearch6
        },
        savedSearch7: {
            poId: savedSearch7.poId,
            response: savedSearch7
        },
        savedSearch8: {
            poId: savedSearch8.poId,
            response: savedSearch8
        }
    };

    var retryCountInput = 0;
    var currentRetriesCount = 0;
    var responseCode;
    var errorCode;

    return {
        /**
         * @param server - sinon server object (any configuration of the server should be done inside
         * the test case.
         */
        applyScenario: function(server) {

            server.autoRespond = true;
            server.autoRespondAfter = 30;
            server.respondWith(
                'GET',
                restPath,
                function(xhr) {
                    if (currentRetriesCount === retryCountInput) {
                        xhr.respond(
                            200,
                            {'Content-Type': 'application/json'},
                            JSON.stringify(savedSearches)
                        );
                    } else {
                        xhr.respond(404, {}, 'Not Found');
                        currentRetriesCount++;
                    }
                    if (window.consoleLogging) { console.log('XHR returned from ' + restPath); }
                }
            );

            for (var key in queryResponseMappings) {
                (function(mapping) {
                    server.respondWith(
                        'GET',
                        restPath + '/' + mapping.poId,
                        function(xhr) {
                            if (currentRetriesCount === retryCountInput) {
                                xhr.respond(
                                    200,
                                    {'Content-Type': 'application/json'},
                                    JSON.stringify(mapping.response)
                                );
                                if (window.consoleLogging)  { console.log('XHR returned 200 for: ' + restPath + '/' + mapping.poId); }
                            } else {
                                if (responseCode && errorCode) {
                                    xhr.respond(
                                        responseCode,
                                        {'Content-type': 'application/json'},
                                        JSON.stringify({
                                            internalErrorCode: 1001
                                        })
                                    );
                                    if (window.consoleLogging)  { console.log('XHR returned ' + responseCode + ' for: ' + restPath + '/' + mapping.poId); }
                                } else {
                                    xhr.respond(404, {}, 'Not Found');
                                    if (window.consoleLogging)  { console.log('XHR returned 404 for: ' + restPath + '/' + mapping.poId); }
                                }
                                currentRetriesCount++;
                            }
                        }
                    );
                })(queryResponseMappings[key]);
            }
        },

        setRetryCountInput: function(count) {
            retryCountInput = count;
            currentRetriesCount = 0;
        },

        getRetriesCount: function() {
            return currentRetriesCount;
        },

        setResponseCode: function(newResponseCode) {
            responseCode = newResponseCode;
        },

        setErrorCode: function(newErrorCode) {
            errorCode = newErrorCode;
        },

        reset: function() {
            this.setRetryCountInput(0);
            errorCode = null;
            responseCode = null;
        },

        queryResponseMappings: queryResponseMappings
    };
});
