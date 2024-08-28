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
    function respond(server, path, responseStatus, responseObject, requestMethod) {
        // Defaults
        responseStatus = responseStatus ? responseStatus : 200;
        responseObject = responseObject ? responseObject : [];
        requestMethod = requestMethod ? requestMethod : 'GET';
        // Response wiring
        server.autoRespond = true;
        server.respondImmediately = true;
        server.respondWith(
            requestMethod,
            path,
            function(xhr) {
                xhr.respond(
                    responseStatus,
                    {
                        'Content-type': 'application/json'
                    },
                    JSON.stringify(responseObject)
                );
            }
        );
    }

    return {
        /**
         * @param server - sinon server object (any configuration of the server should be done inside
         * the test case.
         * @param responseObject - what the server wil respond with
         */
        respondToModelNodeTypes: function(server, responseStatus, responseObject) {
            respond(server, '/modelInfo/model/nodeTypes/', responseStatus, responseObject);
        },

        respondToERBSNodeChildTypes: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/ERBS\/\*\/nodeChildTypes\//,responseStatus, responseObject);
        },

        respondToRNCNodeChildTypes: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/RNC\/\*\/nodeChildTypes\//,responseStatus, responseObject);
        },

        respondToAllNodeChildTypes: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/\*\/\*\/nodeChildTypes\//,responseStatus, responseObject);
        },

        respondToMoChildTypesENodeBFunctionFromAllNodes: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/\*\/ENodeBFunction\/\*\/moChildTypes\//, responseStatus, responseObject);
        },

        respondToMoChildTypesENodeBFunction: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/ERBS\/ENodeBFunction\/\*\/moChildTypes\//, responseStatus, responseObject);
        },

        respondToENodeBFunctionAttributes: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/ENodeBFunction\/\*\/attributes\?hideNonSearchableAttribute=true(.*)/, responseStatus, responseObject);
        },

        respondToMoChildTypesEUtranCellFDD: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/ERBS\/EUtranCellFDD\/\*\/moChildTypes\//, responseStatus, responseObject);
        },

        respondToEUtranCellFDDAttributes: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/EUtranCellFDD\/\*\/attributes\?hideNonSearchableAttribute=true(.*)/, responseStatus, responseObject);
        },

        respondToMoChildTypesManagedElement: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/ERBS\/ManagedElement\/\*\/moChildTypes\//, responseStatus, responseObject);
        },

        respondToManagedElementAttributes: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/ManagedElement\/\*\/attributes\?hideNonSearchableAttribute=true(.*)/,responseStatus, responseObject);
        },

        respondToMoChildTypesSubNetwork: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/ERBS\/SubNetwork\/\*\/moChildTypes\//, responseStatus, responseObject);
        },

        respondToSubNetworkAttributes: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/SubNetwork\/\*\/attributes\?hideNonSearchableAttribute=true(.*)/,responseStatus, responseObject);
        },

        respondToMoChildTypesMeContext: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/ERBS\/MeContext\/\*\/moChildTypes\//, responseStatus, responseObject);
        },

        respondToMeContextAttributes: function(server, responseStatus, responseObject) {
            respond(server, /\/modelInfo\/model\/MeContext\/\*\/attributes\?hideNonSearchableAttribute=true(.*)/,responseStatus, responseObject);
        },

        respondToERBSSearch: function(server, responseStatus, responseObject) {
            respond(server, /\/managedObjects\/query\?searchQuery=ERBS&fullMo=false&orderby=moName&orderdirection=asc/,responseStatus, responseObject);
        },

        respondToManagedObjectGetObjectByPoIds: function(server, responseStatus, responseObject) {
            respond(server, /\/managedObjects\/getObjectsByPoIds/,responseStatus, responseObject);
        },

        respondToSavedSearchPost: function(server, responseStatus, responseObject) {
            respond(server, /\/topologyCollections\/savedSearches/, responseStatus, responseObject, 'POST');
        },

        respondToSavedSearch: function(server, responseStatus, responseObject) {
            respond(server, /\/topologyCollections\/savedSearches/, responseStatus, responseObject, 'GET');
        },

        respondToFavourites: function(server, responseStatus, responseObject) {
            respond(server, /\/rest\/ui\/settings\/networkexplorer\/favorites/, responseStatus, responseObject, 'GET');
        },

        respondToNodeChildTypes: function(server, responseStatus, node, responseObject) {
            var regex = new RegExp('\\/modelInfo\\/model\\/' + node + '\\/\\*\\/nodeChildTypes\\/');
            respond(server, regex,responseStatus, responseObject);
        },

        respondToMoChildTypes: function(server, responseStatus, node, moType, responseObject) {
            var regex = new RegExp('\\/modelInfo\\/model\\/' + node + '\\/' + moType + '\\/\\*\\/moChildTypes\\/');
            respond(server, regex, responseStatus, responseObject);
        },

        respondToMoAttributes: function(server, responseStatus, moType, responseObject) {
            var regex =  new RegExp('\\/modelInfo\\/model\\/' + moType + '\\/\\*\\/attributes\\?hideNonSearchableAttribute=true(.*)');
            respond(server, regex, responseStatus, responseObject);
        }
    };
});
