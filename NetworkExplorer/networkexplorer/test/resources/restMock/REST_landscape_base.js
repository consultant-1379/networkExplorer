/**
 *    Define all REST mocks here that are required to run an application in a positive scenario
 *    (all known REST endpoints work).
 */

define([
    'test/resources/restMock/data/managedObjects'
], function(managedObjects) {

    var lastResponse, specificResponse;

    return {
        /**
         * @param server - sinon server object (any configuration of the server should be done inside
         * the test case.
         */
        applyScenario: function(server) {

            lastResponse = []; //reset

            server.autoRespond = true;
            server.autoRespondAfter = 30;

            server.respondWith(
                'POST',
                '/managedObjects/getObjectsByPoIds',
                function(xhr) {
                    if (specificResponse) {
                        xhr.respond(
                            200,
                            {'Content-Type': 'application/json'},
                            JSON.stringify(specificResponse)
                        );
                        specificResponse = undefined;
                    }
                    else {
                        var response = [];
                        var requestJson = JSON.parse(xhr.requestBody);
                        for (var i = 0; i < requestJson.poList.length; i++) {
                            var mo = managedObjects[requestJson.poList[i]];
                            var newObject;
                            if (mo) {
                                newObject = JSON.parse(JSON.stringify(mo));
                            } else {
                                newObject = {
                                    poId: '' + requestJson.poList[i],
                                    moName: 'Object' + (i + 1),
                                    moType: 'Object',
                                    fullMoType: 'Object',
                                    mibRootName: 'RootObject' + (i + 1),
                                    parentRDN: 'ParentObject=' + (i + 1),
                                    cmSyncStatus: 'SYNCHRONIZED'
                                };
                            }
                            newObject.attributes = {};
                            //A negative PoId means attributes do not apply to the object
                            if (!(requestJson.poList[i] < 0)) {
                                for (var j = 0; j < requestJson.attributes.length; j++) {
                                    var key = requestJson.attributes[j];
                                    newObject.attributes[key] = key + i;
                                }
                            }
                            response.push(newObject);
                        }
                        lastResponse = response;
                        xhr.respond(
                            200,
                            {'Content-Type': 'application/json'},
                            JSON.stringify(response)
                        );
                    }
                }
            );
            server.respondWith(
                'POST',
                '/managedObjects/getPosByPoIds',
                function(xhr) {
                    if (specificResponse) {
                        xhr.respond(
                            200,
                            {'Content-Type': 'application/json'},
                            JSON.stringify(specificResponse)
                        );
                        specificResponse = undefined;
                    }
                    else {
                        var response = [];
                        var requestJson = JSON.parse(xhr.requestBody);
                        for (var i = 0; i < requestJson.poList.length; i++) {
                            var mo = managedObjects[requestJson.poList[i]];
                            var newObject;
                            if (mo) {
                                newObject = JSON.parse(JSON.stringify(mo));
                            } else {
                                newObject = {
                                    poId: '' + requestJson.poList[i],
                                    id: '' + requestJson.poList[i],
                                    moName: 'Object' + (i + 1),
                                    moType: 'Object',
                                    fullMoType: 'Object',
                                    mibRootName: 'RootObject' + (i + 1),
                                    parentRDN: 'ParentObject=' + (i + 1),
                                    cmSyncStatus: 'SYNCHRONIZED'
                                };
                            }
                            newObject.attributes = {};
                            //A negative PoId means attributes do not apply to the object
                            if (!(requestJson.poList[i] < 0)) {
                                for (var j = 0; j < requestJson.attributeMappings.length; j++) {
                                    var mapping = requestJson.attributeMappings[j];
                                    for (var key in mapping.attributeNames) {
                                        newObject.attributes[key] = key + i;
                                    }
                                }
                            }
                            response.push(newObject);
                        }
                        lastResponse = response;
                        xhr.respond(
                            200,
                            {'Content-Type': 'application/json'},
                            JSON.stringify(response)
                        );
                    }
                }
            );
        },

        getLastResponse: function() {
            return lastResponse;
        },

        setSpecificResponse: function(response) {
            specificResponse = response;
        }
    };
});
