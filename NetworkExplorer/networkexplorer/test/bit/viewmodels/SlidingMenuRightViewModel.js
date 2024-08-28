define([
    'test/bit/bitPromises'
], function(promises) {

    var TIMEOUT = 1000;

    var SlidingMenuRightViewModel = {

        getErrorMessageTitle: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenuRight-errorMessage .ebInlineMessage-header', TIMEOUT);
        },

        getErrorMessageBody: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenuRight-errorMessage .ebInlineMessage-description', TIMEOUT);
        },

        getAttributesSavedToast: function() {
            return promises.waitForElementVisible('.ebNotification_color_green.ebNotification_toast', TIMEOUT);
        }

    };

    return SlidingMenuRightViewModel;
});
