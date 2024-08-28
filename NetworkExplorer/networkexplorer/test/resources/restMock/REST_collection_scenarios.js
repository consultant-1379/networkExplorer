/**
 *    Define all REST mocks here that are required to run an application in a positive scenario
 *    (all known REST endpoints work).
 */

define([
    'test/resources/restMock/data/staticCollections',
    'test/resources/restMock/data/staticCollections/LargeCollection',
    'test/resources/restMock/data/staticCollections/SmallPrivateCollection',
    'test/resources/restMock/data/staticCollections/LongNameCollection',
    'test/resources/restMock/data/staticCollections/ManagedElementsCollection',
    'test/resources/restMock/data/staticCollections/MeContextCollection',
    'test/resources/restMock/data/staticCollections/MediumCollection'

],function(staticCollections, LargeCollection, SmallPrivateCollection, LongNameCollection, ManagedElementsCollection, MeContextCollection, MediumCollection) {

    var restPaths = ['\\/object-configuration\\/v1\\/collections',
        '\\/object-configuration\\/collections\\/v2',
        '\\/object-configuration\\/collections\\/v3'];

    var queryResponseMappings = {
        LargeCollection: {
            collectionId: LargeCollection.id,
            response: LargeCollection
        },
        SmallPrivateCollection: {
            collectionId: SmallPrivateCollection.id,
            response: SmallPrivateCollection
        },
        LongNameCollection: {
            collectionId: LongNameCollection.id,
            response: LongNameCollection
        },
        ManagedElementsCollection: {
            collectionId: ManagedElementsCollection.id,
            response: ManagedElementsCollection
        },
        MeContextCollection: {
            collectionId: MeContextCollection.id,
            response: MeContextCollection
        },
        MediumCollection: {
            collectionId: MediumCollection.id,
            response: MediumCollection
        }
    };

    var retryCountInput = 0;
    var currentRetriesCount = 0;
    var responseCode;
    var errorCode;
    var lastResponse;

    return {
        /**
         * @param server - sinon server object (any configuration of the server should be done inside
         * the test case).
         */
        applyScenario: function(server) {
            server.autoRespond = true;
            server.autoRespondAfter = 30;
            restPaths.forEach(function(restPath) {
                for (var key in queryResponseMappings) {
                    (function(mapping) {
                        server.respondWith(
                            'GET',
                            new RegExp(restPath + '\\/' + mapping.collectionId),
                            function(xhr) {
                                var rCode = 404,
                                    rHeaders = {},
                                    rBody = 'Not Found';
                                if (currentRetriesCount === retryCountInput) {
                                    rCode = 200;
                                    rHeaders = {'Content-type': 'application/json'};
                                    rBody = mapping.response;
                                } else if (responseCode && errorCode) {
                                    rCode = responseCode;
                                    rHeaders = {'Content-type': 'application/json'};
                                    rBody = {internalErrorCode: errorCode };
                                }
                                lastResponse = rBody;
                                xhr.respond(rCode, rHeaders, JSON.stringify(rBody));
                                if (!(rCode >= 200 && rCode < 400)) {
                                    currentRetriesCount++;
                                }
                                if (window.consoleLogging) { console.log('SINON: XHR: returned for: ' + restPath + '/' + mapping.collectionId); }
                            }
                        );
                    })(queryResponseMappings[key]);
                }

                server.respondWith(
                    'GET',
                    new RegExp(restPath + '$'),
                    function(xhr) {
                        if (currentRetriesCount === retryCountInput) {
                            xhr.respond(
                                200,
                                {'Content-Type': 'application/json'},
                                JSON.stringify(staticCollections)
                            );
                        } else {
                            xhr.respond(404, {}, 'Not Found');
                            currentRetriesCount++;
                        }
                        if (window.consoleLogging) { console.log('SINON: XHR: returned for: ' + restPath); }
                    }
                );
            });
        },

        respondToV4Search: function(server) {
            server.respondWith(
                'POST',
                new RegExp('^\\/object-configuration\\/collections\\/search\\/v4'),
                function(xhr) {
                    if (window.consoleLogging) { console.log('XHR returned from ' + xhr.url); }
                    if (currentRetriesCount === retryCountInput) {
                        xhr.respond(
                            200,
                            {
                                'Content-type': 'application/json'
                            },
                            JSON.stringify([
                                LargeCollection,
                                SmallPrivateCollection
                            ])
                        );
                    } else {
                        currentRetriesCount++;
                    }
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

        setResponseCode: function(newResponseCode) {
            responseCode = newResponseCode;
        },

        setErrorCode: function(newErrorCode) {
            errorCode = newErrorCode;
        },

        getLastResponse: function() {
            return lastResponse;
        },

        reset: function() {
            this.setRetryCountInput(0);
            errorCode = null;
            responseCode = null;
        },

        queryResponseMappings: queryResponseMappings
    };
});
