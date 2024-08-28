define([
    'test/bit/bitPromises'
], function (promises) {

    var queryBuilderViewModel = {

        getSearchButton: function () {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rQueryBuilder-bottomControls-searchBtn', 3000);
        },

        getSwitchToSearchLink: function () {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rQueryBuilder-bottomControls-switchToSearch-link', 3000);
        },

        getModelDrivenCombobox: function (timeout) {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wModelDrivenComboBox .ebCombobox', timeout ? timeout : 3000);
        },

        getModelDrivenComboboxByIndex: function (index, timeout) {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wModelDrivenComboBox .ebCombobox', timeout ? timeout : 3000, null, index);
        },

        getFilterItemsBox: function () {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wFilterItemsBox-selectBox', 3000);
        },

        getClearButton: function () {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rQueryBuilder-main-search-clear-link', 1000);
        },

        getAddCriteria: function () {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wCriteria', 1000);
        },

        getDoneEditingButton: function () {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wCriteria-done.ebBtn.ebBtn_color_orange', 1000, null, 0);
        },

        getAddChildByIndex: function (index) {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wQueryItem-addChild', 3000, null, index);
        },

        getFooter: function () {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rQueryBuilder-main-footer', 3000, null, 0);
        },

        getQueryBuilderInlineErrorLabel: function (timeout) {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wQueryBuilderInlineError-errorMessage', timeout ? timeout : 20000);
        },
    };

    return queryBuilderViewModel;

});
