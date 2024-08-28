define([
    './Cache',
    './RequestQueue'
], function(
    Cache,
    RequestQueue
) {

    var VirtualScrollingData = function(options) {
        // Keep params
        this.idAttribute = options.id;
        this.idList = options.list;
        this.errorCallback = options.errorCallback;

        // Internal objects
        this.cache = new Cache(this.idAttribute);
        this.requestQueue = new RequestQueue();

        // Requested object tracker
        this.requestMap = {}; // {'id#': true, 'id#': true, etc}
    };

    VirtualScrollingData.prototype = {

        /**
         * Limit fetching large quantities of objects in one operation
         */
        objectRequestThreshold: 10000,

        /**
         * Safe batch size for getPosByPoids
         */
        batchSize: 50,

        /**
         * Callback for VirtualSelection getAllIds
         *
         * @param success returns ids in order of initial definition
         */
        getAllIds: function(success) {
            success(this.idList);
        },

        /**
         * Callback for VirtualSelection getIds
         *
         * @param lastSelectionId
         * @param firstSelectionId
         * @param success returns ids in selection order
         */
        getIds: function(lastSelectionId, firstSelectionId, success) {
            var lastIndex = this.idList.indexOf(lastSelectionId);
            var firstIndex = this.idList.indexOf(firstSelectionId);
            var start, end;
            if (firstIndex < lastIndex) {
                start = firstIndex;
                end = lastIndex;
            } else {
                start = lastIndex;
                end = firstIndex;
            }
            success(this.idList.slice(start, end));
        },

        /**
         * Get the objectRequestThreshold for selected objects
         *
         * @method getThreshold
         * @return {Number} objectRequestThreshold
         */
        getThreshold: function() {
            return this.objectRequestThreshold;
        },

        /**
         * Gets the total number of items in the scrollable record set
         *
         * @method getIdCount
         * @return {Number} number of items
         */
        getIdCount: function() {
            return this.idList.length || 0;
        },

        /**
         * Loads data either:
         * * from cache
         * * from endpoint (this must be stored in cache)
         *
         * Does not make a new request for ids that have already been requested - they will either:
         * * resolve successfully
         * * fail, then retry (up to three times), then resolve successfully
         * * fail 4 times, then trigger an error on the entire table
         *
         * @method loadData
         * @param {Number} start
         * @param {Number} length
         * @return {Promise} data: Array of objects, cancelled: true if not all objects were loaded
         */
        loadData: function(start, length) {
            var end = start + length;
            var idList = this.getIdsFromIndexes(start, end);
            if (this.cache.isDataAvailable(idList)) {
                // resolve immediately
                return Promise.resolve({
                    data: this.cache.get(idList)
                });
            }
            //get data from before the requested starting index in the poid list
            var fetchStartIndex = Math.max(0, start - length),
                // set the length to include X items more than the requested length
                fetchDataLength = Math.max(50, Math.max(length + 50, Math.min(250, length * 3))),
                // put ceiling on last index of fetch
                lastIndexOfFetch = Math.min(this.idList.length, fetchStartIndex + fetchDataLength);
            var idsToFetch = this.filterAlreadyFetchedIds(
                this.getIdsFromIndexes(fetchStartIndex, lastIndexOfFetch)
            );
            return this.loadDataList(idsToFetch, idList);
        },

        /**
         * Load the data from the datastore.
         *
         * @method loadDataList
         * @param {Array} idsToLoad list of ids to fetch
         * @param {Array} idList (optional) list of ids that are wanted in the response
         * @return {Promise} data: Array of objects, cancelled: true if not all objects were loaded
         */
        loadDataList: function(idsToLoad, idList) {
            return new Promise(function(resolve) {
                if (this.cache.isDataAvailable(idsToLoad)) {
                    // resolve immediately
                    resolve({
                        data: this.cache.get(idsToLoad)
                    });
                } else {
                    var idsToFetch = this.filterAlreadyFetchedIds(idsToLoad);
                    // defer resolution
                    this.fetchDataFromIds(idsToFetch, function(data) {
                        this.cache.add(data);
                        // If the requests were cancelled, the data will not be fully available
                        var cancelled = !this.cache.isDataAvailable(idsToFetch);
                        var idsToReturn = idList || idsToLoad;
                        resolve({
                            data: this.cache.get(idsToReturn),
                            cancelled: cancelled
                        });
                    }.bind(this));
                }
            }.bind(this));
        },

        /**
         * Retrieve data given an array of ids
         * Sets indexes to 'fetched' using the requestMap
         *
         * @method fetchDataFromIds
         * @param idList
         * @param callback
         */
        fetchDataFromIds: function(idList, callback) {
            // Mark ids as requested so duplicate requests are not made for each id
            idList.forEach(function(id) {
                this.requestMap[id] = true;
            }.bind(this));

            // Divide into batches if necessary
            var idBatches = this.chunk(idList, this.batchSize);
            var batchId = 0,
                batchResults = [],
                batchesReceived = 0;
            var requestOptions = idBatches.map(function(idBatch) {
                var requestOption = {
                    type: 'POST',
                    url: '/managedObjects/getPosByPoIds',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        poList: idBatch,
                        defaultMappings: ['syncStatus'],
                        attributeMappings: undefined
                    }),
                    dataType: 'json',
                    success: function(data) {
                        batchesReceived++;
                        batchResults = batchResults.concat(data);
                        if (batchesReceived === idBatches.length) {
                            callback(batchResults);
                        }
                    },
                    error: function(msg, xhr) {
                        // retry if possible
                        if (requestOption.retryTimes.length > 0) {
                            var retryTime = requestOption.retryTimes.shift();
                            setTimeout(function() {
                                console.log('Adding re-request to queue');
                                // add to queue
                                this.requestQueue.add([requestOption]);
                            }.bind(this), retryTime);
                        } else {
                            // else clean up data
                            this.requestQueue.cancelAll();
                            // notify parent that we cannot continue
                            this.errorCallback(msg, xhr);
                        }
                    }.bind(this),
                    retryTimes: [2000, 5000, 10000],
                    batchId: batchId++
                };
                return requestOption;
            }.bind(this));

            // add to queue
            this.requestQueue.add(requestOptions);
        },

        /**
         * Cancel all fetches in progress.
         *
         * @method cancelFetch
         */
        cancelFetch: function() {
            console.log('cancelFetch');
            // Nothing was in the queue, but some requests may be in progress
            // Let them finish
            // Do not trigger a final success callback
            var cancelledRequests = this.requestQueue.cancelAll();
            cancelledRequests.forEach(function(request) {
                // Flag as not fetched
                JSON.parse(request.data).poList.forEach(function(id) {
                    this.requestMap[id] = false;
                }.bind(this));
                // Return empty result for cancelled request
                request.success([]);
            }.bind(this));
        },

        /**
         * Filters out ids that have already been requested
         *
         * @method filterAlreadyFetchedIds
         * @param idList A list of ids which may already be requested
         * @return {Array} A list of ids which are not currently requested
         */
        filterAlreadyFetchedIds: function(idList) {
            return idList.filter(function(id) {
                return !this.requestMap[id];
            }.bind(this));
        },

        /**
         * Retrieves ids given start and end index in table rows
         *
         * @method getIdsFromIndexes
         * @param start starting index
         * @param end finishing index
         * @return {Array} ids between start and finish, inclusive
         */
        getIdsFromIndexes: function(start, end) {
            return this.idList.slice(start, end);
        },


        
        
        
        
        
        
        
        
        
        
        
        
        
        

        /// DELETE WHEN FINISHED!!
        chunk: function(arrayToChunk, chunkSize) {
            if (!arrayToChunk || !(arrayToChunk instanceof Array) || !isFinite(chunkSize) || chunkSize < 1) {
                return undefined;
            }
            var result = [];
            for (var i = 0, len = arrayToChunk.length; i < len; i += chunkSize) {
                result.push(arrayToChunk.slice(i, i + chunkSize));
            }
            return result;
        }
        ////////////////////////////////// END

    };

    return VirtualScrollingData;
});
