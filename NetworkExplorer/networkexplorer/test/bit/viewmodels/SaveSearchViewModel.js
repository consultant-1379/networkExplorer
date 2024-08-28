define([
    'test/bit/bitPromises',
], function(promises) {

    var TIMEOUT = 1000;

    var saveSearchViewModel = {

        getSearchNameInput: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSaveSearch-nameInput', TIMEOUT, null, 0);
        },

        getInputStatusErrorText: function(timeout) {
            return promises.waitForElementVisible('.ebInput-statusError', timeout?timeout:TIMEOUT, null, 0);
        },

        getSubmitButton: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSaveSearch-actionButtons-buttonsBlock-submitButton', TIMEOUT, null, 0);
        },

        getCancelButton: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSaveSearch-actionButtons-buttonsBlock-cancelButton', TIMEOUT, null, 0);
        },

        getSharingPermissions: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSaveSearch-sharingPermissions', TIMEOUT, null, 0);
        },

        getPrivateSharingRadioButton: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-wSharingPermissions-radioPrivate', TIMEOUT, null, 0);
        },

        getRadioPublicSharingRadioButton: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-wSharingPermissions-radioPublic', TIMEOUT, null, 0);
        },

        getInlineError: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSaveSearch-defaultNotification', TIMEOUT, null, 0);
        },

        getErrorNotification: function() {
            return promises.waitForElementVisible('.ebNotification.ebNotification_color_red', TIMEOUT, null, 0);
        },

        getSavedNotification: function() {
            return promises.waitForElementVisible('.ebNotification.ebNotification_color_green', TIMEOUT, null, 0);
        },

        getErrorDialogBox: function() {
            return promises.waitForElementVisible('.ebDialogBox', TIMEOUT);
        },

        getErrorDialogOkButton: function(timeout) {
            return promises.waitForElementVisible('.ebDialogBox-actionBlock .ebBtn_color_darkBlue', timeout?timeout:TIMEOUT, null, 0);
        },

        getDialogHeader: function(timeout) {
            return promises.waitForElementVisible('.ebDialogBox-content .ebDialogBox-primaryText', timeout?timeout:TIMEOUT, null, 0);
        },

        getDialogMessage: function() {
            return promises.waitForElementVisible('.ebDialogBox-content .ebDialogBox-secondaryText p', TIMEOUT, null, 0);
        },

    };

    return saveSearchViewModel;

});
