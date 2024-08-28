/**
 * Respond to XHR for object-configuration resources
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
         * Program the fake server to respond to GET request for object configuration service
         *
         * /object-configuration/collections/v2
         *
         * @param server
         * @param responseObject object to respond with
         * @param responseStatus status code to respond with
         */
        respondToCollectionList: function(server, responseObject, responseStatus) {
            respond(server, '/object-configuration/collections/v2','GET', responseStatus, responseObject);
        },

         /**
          * Program the fake server to respond to GET request for object configuration service
          *
          * /object-configuration/collections/v3
          *
          * @param server
          * @param responseObject object to respond with
          * @param responseStatus status code to respond with
          */
         respondToCollectionListV3: function(server, responseObject, responseStatus) {
             respond(server, '/object-configuration/collections/v3','GET', responseStatus, responseObject);
         },

        /**
         * Program the fake server to respond to GET request for old object configuration service call
         *
         * /object-configuration/v1/collections
         *
         * @param server
         * @param responseObject object to respond with
         * @param responseStatus status code to respond with
         */
        respondToCollectionListV1: function(server, responseObject, responseStatus) {
            respond(server, '/object-configuration/v1/collections','GET', responseStatus, responseObject);
        },

        /**
         * Program the fake server to respond to GET request for object configuration service without sort
         *
         * /object-configuration/collections/v2/{poid}
         *
         * @param server sinon server object
         * @param collectionId id of collection
         * @param responseObject object to respond with
         */
        respondToGetCollectionWithoutSort: function(server, collectionId, responseObject, responseStatus) {
            respond(server, new RegExp('^\\/object-configuration\\/collections\\/v2\\/' + collectionId + '\\??'), 'GET', responseStatus, responseObject);
        },

         /**
          * Program the fake server to respond to GET request for object configuration service without sort
          *
          * /object-configuration/collections/v3/{poid}
          *
          * @param server sinon server object
          * @param collectionId id of collection
          * @param responseObject object to respond with
          */
         respondToGetCollectionWithoutSortV3: function(server, collectionId, responseObject, responseStatus) {
             respond(server, new RegExp('^\\/object-configuration\\/collections\\/v3\\/' + collectionId + '\\??'), 'GET', responseStatus, responseObject);
         },

        /**
          * Program the fake server to respond to GET request for object configuration service without sort
          *
          * /object-configuration/collections/v3/{poid}
          *
          * @param server sinon server object
          * @param collectionId id of collection
          * @param responseObject object to respond with
          */
         respondToGetCollectionWithoutSortIncludingContentsV4: function(server, collectionId, responseObject, responseStatus) {
             respond(server, new RegExp('^\\/object-configuration\\/collections\\/v4\\/' + collectionId  + '\\?includeContents=true'), 'GET', responseStatus, responseObject);
         },

        /**
         * Program the fake server to respond to GET request for object configuration service with default sort column
         *
         * /object-configuration/collections/v2/{poid}?includeMappings=true&orderby=moName&orderdirection=asc
         *
         * @param server sinon server object
         * @param collectionId id of collection
         * @param responseObject object to respond with
         */
        respondToGetCollectionDefaultSort: function(server, collectionId, responseObject) {
            respond(server, new RegExp('^\\/object-configuration\\/collections\\/v2\\/' + collectionId + '\\?includeMappings=true&orderby=moName&orderdirection=asc'), 'GET', 200, responseObject);
        },

         /**
          * Program the fake server to respond to GET request for object configuration service with default sort column
          *
          * /object-configuration/collections/v3/{poid}?includeMappings=true&orderby=moName&orderdirection=asc
          *
          * @param server sinon server object
          * @param collectionId id of collection
          * @param responseObject object to respond with
          */
         respondToGetCollectionDefaultSortV3: function(server, collectionId, responseObject) {
             respond(server, new RegExp('^\\/object-configuration\\/collections\\/v3\\/' + collectionId + '\\?includeMappings=true&orderby=moName&orderdirection=asc'), 'GET', 200, responseObject);
         },

        /**
         * Program the fake server to respond to GET request for object configuration service with given sort column
         *
         * /object-configuration/collections/v2/{poid}?orderby={column}&orderdirection={any string}
         *
         * @param server sinon server object
         * @param collectionId id of collection
         * @param sortColumn title of column to sort
         * @param responseObject object to respond with
         */
        respondToGetCollectionSortByColumn: function(server, collectionId, sortColumn, responseObject) {
            respond(server, new RegExp('^\\/object-configuration\\/collections\\/v2\\/' + collectionId + '\\?.*orderby=' + sortColumn + '.*'), 'GET', 200, responseObject);
        },

        /**
         * Program the fake server to respond to GET request for object configuration service
         *
         * /object-configuration/collections/v2/{poid}
         *
         * @param server sinon server object
         * @param responseObject object to respond with
         */
        respondToGetAnyCollection: function(server, responseObject, responseStatus) {
            respond(server, new RegExp('^\\/object-configuration\\/collections\\/v2\\/.*'), 'GET', responseStatus, responseObject);
        },

        /**
         * Program the fake server to respond to GET request for object configuration service
         *
         * /object-configuration/collections/v3/{poid}
         *
         * @param server sinon server object
         * @param responseObject object to respond with
         */
        respondToGetAnyCollectionV3: function(server, responseObject, responseStatus) {
            respond(server, new RegExp('^\\/object-configuration\\/collections\\/v3\\/.*'), 'GET', responseStatus, responseObject);
        },

        /**
         * Program the fake server to respond to a DELETE request for REST service /object-configuration/collections/v4
         *
         * @param server sinon server object
         * @param responseObject object to respond with
         * @param responseStatus optional status code (default 204) to respond with
         */
        respondToDeleteCollectionsV4: function(server, responseObject, responseStatus) {
            respond(server, '/object-configuration/collections/v4', 'DELETE', responseStatus || 204, responseObject);
        },

        /**
         * Program the fake server to respond to a PUT request for REST service /object-configuration/collections/v4/{id}
         *
         * @param server sinon server object
         * @param collectionId id of collection
         * @param responseObject object to respond with
         * @param status status code to respond with
         */
        respondForUpdateCollectionV4: function (server, collectionId, responseObject, status) {
            respond(server, new RegExp('^\\/object-configuration\\/collections\\/v4\\/' + collectionId), 'PUT', status || 200, responseObject);
        },


        /**
         * Program the fake server to respond to a DELETE request for REST service /object-configuration/collections/v3
         *
         * @param server sinon server object
         * @param responseObject object to respond with
         * @param responseStatus optional status code (default 204) to respond with
         */
        respondToDeleteCollectionsV3: function(server, responseObject, responseStatus) {
            respond(server, '/object-configuration/collections/v3', 'DELETE', responseStatus || 204, responseObject);
        },

        /**
         * Program the fake server to respond to a POST request for REST service /object-configuration/v1/collections
         *
         * @param server sinon server object
         * @param statusCode HTTP status code to respond with
         * @param responseObject object to respond with
         */
        respondForCreateCollection: function(server, statusCode, responseObject) {
            respond(server, '/object-configuration/v1/collections', 'POST', statusCode, responseObject);
        },

        /**
         * Program the fake server to respond to a PUT request for REST service /object-configuration/v1/collections
         *
         * @param server sinon server object
         * @param collectionId id of collection
         * @param responseObject object to respond with
         */
        respondToUpdateCollection: function(server, collectionId, responseObject, responseStatus) {
            respond(server, new RegExp('^\\/object-configuration\\/v1\\/collections\\/' + collectionId), 'PUT', responseStatus, responseObject);
        },

        /**
         * Program the fake server to respond to a PUT request for REST service /object-configuration/custom-topology/v1/{id}/add
         *
         * @param server sinon server object
         * @param collectionId id of collection
         * @param responseObject object to respond with
         * @param responseStatus optional status code (default 200) to respond with
         */
        respondToAddCollections: function(server, collectionId, responseObject, responseStatus) {
            respond(server, new RegExp('^\\/object-configuration\\/custom-topology\\/v1\\/' + collectionId+'\\/add'), 'PUT', responseStatus, responseObject);
        },

        /**
         * Program the fake server to respond to a DELETE request for REST service /object-configuration/v1/collections
         *
         * @param server sinon server object
         * @param collectionId id of collection
         * @param responseObject object to respond with
         */
        respondToDeleteCollection: function(server, collectionId, responseObject) {
            respond(server, new RegExp('^\\/object-configuration\\/v1\\/collections\\/' + collectionId), 'DELETE', 204, responseObject);
        },

        /**
         * Program the fake server to respond to GET the direct children of a Custom Topology
         *
         * @param server sinon server object
         * @param parentId search on
         * @param responseObject object to respond with
         * @param statusCode optional status code (default 200) to respond with
         */
        respondToGetCustomTopologyChildren: function(server, parentId, responseObject, statusCode) {
            respond(server, new RegExp('^\\/object-configuration\\/custom-topology\\/v1\\?customTopology=false&parentId=' + parentId), 'GET', statusCode || 200, responseObject);
        },

        /**
         * Program the fake server to respond to a DELETE request on a given Custom Topology
         *
         * @param server sinon server object
         * @param id to delete
         * @param responseObject object to respond with
         */
        respondToDeleteCustomTopology: function(server, id, responseObject) {
            respond(server, new RegExp('^\\/object-configuration\\/custom-topology\\/v1\\/' + id), 'DELETE', 204, responseObject);
        },

        /**
         * Program the fake server to respond to a PUT request for REST service /object-configuration/custom-topology/v1.
         *
         * @param server sinon server object
         * @param collectionId id of collection to be renamed
         * @param responseObject object to respond with
         * @param status status code to respond with
         */
        respondToRenameCustomTopology: function(server, collectionId, responseObject, status) {
            respond(server, new RegExp('^\\/object-configuration\\/custom-topology\\/v1\\/' + collectionId), 'PUT', status, responseObject);
        },

        /**
         * Program the fake server to respond to a PUT request for REST service /object-configuration/custom-topology/v1.
         *
         * @param server sinon server object
         * @param collectionId id of collection to be removed
         * @param parentId id of collection from which the child should be removed
         * @param responseObject object to respond with
         * @param status status code to respond with
         */
        respondToRemoveLeafCollection: function(server, collectionId, parentId, responseObject, status) {
            respond(server, '/object-configuration/custom-topology/v1/'+collectionId+'/'+ parentId,'PUT', status, responseObject);
        },

        respondToUpdateNestedCollectionContents: function(server, collectionId, responseObject, status) {
            respond(server, new RegExp('^\\/object-configuration\\/custom-topology\\/v2\\/'+collectionId),'PUT', status, responseObject);
        },

        respondToUpdateCollectionContents: function(server, collectionId, responseObject, status) {
            respond(server, new RegExp('^\\/object-configuration\\/collections\\/v3\\/'+collectionId),'PUT', status, responseObject);
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
