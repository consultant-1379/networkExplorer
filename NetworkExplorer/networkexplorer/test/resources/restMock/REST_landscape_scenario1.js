/**
 *    Define all REST mocks here that are required to run an application in a positive scenario
 *    (all known REST endpoints work).
 */

define([
    '../user_input_data',
    'test/resources/restMock/data/type_MeContext',
    'test/resources/restMock/data/type_MkvContext',
    'test/resources/restMock/data/MeContextWithAttrs',
    'test/resources/restMock/data/MeContextManagedElementWithAttrs',
    'test/resources/restMock/data/type_EUtranCellFDD'
], function(user_data, MeContext, MkvContext, MeContextWithAttrs, MeContextManagedElementWithAttrs, EUtranCellFDD) {

    var restPath = '\\/managedObjects\\/query\\?searchQuery\\=';

    /**
     *  Add new object to the queryResponseMappings in order to create a new REST mapping!
     */
    var queryResponseMappings = {
        MeContext: {
            query: user_data.user1.query.MeContext.value,
            response: MeContext
        },
        MkvContext: {
            query: user_data.user1.query.MkvContext.value,
            response: MkvContext,
            statusCode: 500
        },
        MeContextWithAttrs: {
            query: user_data.user1.query.MeContextWithAttrs.value,
            response: MeContextWithAttrs
        },
        MeContextManagedElementWithAttrs: {
            query: user_data.user1.query.MeContextManagedElementWithAttrs.value,
            response: MeContextManagedElementWithAttrs
        },
        EUtranCellFDD: {
            query: user_data.user1.query.EUtranCellFDD.value,
            response: EUtranCellFDD
        },
        ERBSNode: {
            query: 'select all nodes of type ERBS',
            response: MeContext
        }
    };

    var resultsSize = 0;
    var retryCountInput = 0;
    var currentRetriesCount = 0;
    var lastResponse;
    var responseCode;
    var errorCode;

    return {
        /**
         * @param server - sinon server object (any configuration of the server should be done inside
         * the test case.
         */
        applyScenario: function(server) {

            server.respondImmediately = true;

            for (var key in queryResponseMappings) {

                /**
                 *    queryResponseMappings[key] is provided as an argument to the function scope
                 *    so that once loop is over mapping variable will point to correct object
                 *    instead of pointing to the last object from map.
                 */
                (function(mapping) {
                    var regex = new RegExp(restPath + '(' + encodeURIComponent(mapping.query) + '|' + mapping.query + ')' + '\&fullMo=false&orderby=moName&orderdirection=asc$');
                    server.respondWith(
                        'GET',
                        regex,
                        function(xhr) {
                            var responsePoList = [];
                            var startFrom = 0;
                            // while entries with negative number in poList, preserve sign in responsePoList
                            while (mapping.response.poList && startFrom < mapping.response.poList.length && mapping.response.poList[startFrom] < 0) {
                                responsePoList.push('' + (mapping.response.poList[startFrom]));
                                startFrom++;
                            }
                            for (var i = startFrom; i < resultsSize; i++) {
                                responsePoList.push('' + (i+1));
                            }
                            if (currentRetriesCount === retryCountInput) {
                                if (!mapping.statusCode || mapping.statusCode === 200) {
                                    lastResponse = {
                                        poList: responsePoList,
                                        attributes: mapping.response.attributes,
                                        attributeMappings: mapping.response.attributeMappings,
                                        metadata: {
                                            RESULT_SET_TOTAL_SIZE: resultsSize,
                                            MAX_UI_CACHE_SIZE: 100000
                                        },
                                        sortable: true
                                    };
                                    xhr.respond(
                                        mapping.statusCode || 200,
                                        {'Content-Type': 'application/json'},
                                        JSON.stringify(lastResponse)
                                    );
                                } else {
                                    lastResponse = mapping.response;
                                    xhr.respond(
                                        mapping.statusCode,
                                        {'Content-Type': 'application/json'},
                                        JSON.stringify(lastResponse)
                                    );
                                }
                            } else {
                                if (responseCode && errorCode) {
                                    xhr.respond(
                                        responseCode,
                                        {'Content-type': 'application/json'},
                                        JSON.stringify({
                                            internalErrorCode: 1001
                                        })
                                    );
                                } else {
                                    xhr.respond(404, {}, 'Not Found');
                                }
                                currentRetriesCount++;
                            }
                            if (window.consoleLogging) { console.log('SINON: XHR: returned for: ' + restPath + mapping.query); }
                        }
                    );
                })(queryResponseMappings[key]);
            }

            var regex = new RegExp(restPath + encodeURIComponent('select all objects of type') + '(.*)');
            server.respondWith(
                'GET',
                regex,
                function(xhr) {
                    lastResponse = JSON.stringify({
                        poList: [],
                        attributes: [],
                        attributeMappings: [],
                        metadata: {
                            RESULT_SET_TOTAL_SIZE: resultsSize,
                            MAX_UI_CACHE_SIZE: 100000
                        },
                        sortable: true
                    });
                    xhr.respond(
                        200,
                        {'Content-Type': 'application/json'},
                        lastResponse
                    );
                    if (window.consoleLogging) { console.log('SINON: XHR: returned for: /managedObjects/query?searchQuery=type=.*'); }
                }
            );

            server.respondWith(
                'GET',
                /\/managedObjects\/.*/,
                function(xhr) {
                    xhr.respond(
                        500,
                        {},
                        'Error'
                    );
                    if (window.consoleLogging) { console.log('SINON: XHR: returned for: /managedObjects/.*'); }
                }
            );
        },

        setRetryCountInput: function(count) {
            retryCountInput = count;
            currentRetriesCount = 0;
        },

        getRetriesCount: function() {
            return currentRetriesCount;
        },

        setResultsSize: function(newResultsSize) {
            resultsSize = newResultsSize;
        },

        getLastResponse: function() {
            return lastResponse;
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
