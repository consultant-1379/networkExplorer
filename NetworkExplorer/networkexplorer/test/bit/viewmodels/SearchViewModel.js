define([
    'test/bit/bitPromises'
], function(promises) {

    var searchViewModel = {

        getSearchBox: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-wSearchInput-searchInput', 1000);
        },

        getSearchButton: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSearch-form-searchBtnIcon', 1000);
        }
    };

    return searchViewModel;

});
