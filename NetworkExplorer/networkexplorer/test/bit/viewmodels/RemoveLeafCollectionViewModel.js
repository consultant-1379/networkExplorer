define([
    'test/bit/bitPromises',
], function(promises) {
    return {

        getResultCounters: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wFailureFeedback-resultCounters', 1000, null, 0);
        }

    };
});
