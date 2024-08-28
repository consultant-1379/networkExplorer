define([
    'test/bit/bitPromises',
], function(promises) {
    return {
        getAddButton: function() {
            return promises.waitForElementVisible('div[class*="-actions-apply"]>button', 3000);
        },
        getCancelButton: function() {
            return promises.waitForElementVisible('div[class*="-actions-cancel"]>button', 3000);
        },
        getDialogOkButton: function() {
            return promises.waitForElementVisible('.ebDialogBox-actionBlock>button:first-child', 1000, null, 0);
        },
        getSaveButton: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wActionPanel-actionButtons-submit', 3000);
        },
        getCancelButtonForActionPanel: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wActionPanel-actionButtons-cancel', 3000);
        }
    };
});
