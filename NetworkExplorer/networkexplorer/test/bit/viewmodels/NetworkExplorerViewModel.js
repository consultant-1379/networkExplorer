define([
    'test/bit/bitPromises',
], function(promises) {

    var networkExplorerViewModel = {

        getNetworkExplorer: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer', 1000);
        },

        getContent: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-content', 1000);
        },

        getReturnCancelButtons: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-objectActions .ebBtn', 1000);
        },

        getReturnButton: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-objectActions .ebBtn_color_green', 1000);
        },

        getSwitchToCriteriaBuilderLink: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSearch-form-switchToBuilder-link', 1000);
        },

        getDialogPrimaryButton: function() {
            return promises.waitForElementVisible('.ebDialogBox-actionBlock .ebBtn_color_darkBlue', 1000, null, 0);
        },

        getDialogTitle: function(timeout) {
            return promises.waitForElementVisible('.ebDialogBox-content .ebDialogBox-primaryText', timeout || 1000, null, 0);
        },

        getDialogMessage: function() {
            return promises.waitForElementVisible('.ebDialogBox-content .ebDialogBox-secondaryText p', 1000, null, 0);
        },

        getDialogOptionalMessage: function() {
            return promises.waitForElementVisible('.ebDialogBox-content .ebDialogBox-thirdText p', 1000, null, 0);
        },

        getToggleSlidingMenu: function() {
            return promises.waitForElementVisible('.elLayouts-PanelButton-text', 1000, null, 0);
        },

        getCloseMenuArrow: function() {
            return promises.waitForElementVisible('.ebIcon.ebIcon_leftArrowLarge', 1000, null, 0);
        },

        getOpenMenuArrow: function() {
            return promises.waitForElementVisible('.ebIcon.ebIcon_rightArrowLarge', 1000, null, 0);
        },

        getSaveSearchNameInput: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSaveSearch-nameInput.ebInput.ebInput_xLongW', 1000, null, 0);
        },

        getSaveSearchNameErrorText: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSaveSearch-inputArea .ebInput-statusError', 1000, null, 0);
        },

        getFlyoutSubmitButton: function() {
            return promises.waitForElementVisible('button[class*=\'actionButtons-buttonsBlock-submitButton\']', 2000);
        },

        getSaveSearchNameCancel: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSaveSearch-actionButtons-buttonsBlock-cancelButton', 1000, null, 0);
        },

        getDialogCancelButton: function() {
            return promises.waitForElementVisible('.ebBtn.ebDialog-secondaryActionButton', 3000, null, 0);
        },

        getFirstCollectionsSavedSearches: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-wLimitedListItem-link', 3000, null, 0);
        },

        getErrorNotification: function() {
            return promises.waitForElementVisible('.ebNotification.ebNotification_color_red', 3000, null, 0);
        },

        getSavedNotification: function() {
            return promises.waitForElementVisible('.ebNotification.ebNotification_color_green', 3000, null, 0);
        },

        getCloseNotification: function() {
            return promises.waitForElementVisible('.ebIcon.ebIcon_close_green', 3000, null, 0);
        },

        getBreadcrumbArrow: function() {
            return promises.waitForElementVisible('.ebBreadcrumbs-arrow .ebIcon', 3000, null, 0);
        },

        getBreadcrumbLinks: function() {
            return promises.waitForElementVisible('.ebComponentList-item.ebComponentList-link', 3000);
        },

        getFailureFeedbackSuccessCount: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wFailureFeedback-resultCounters-succeeded span', 1000, null, 0);
        },

        getFailureFeedbackFailedCount: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-wFailureFeedback-resultCounters-failed span', 1000, null, 0);
        }
    };

    return networkExplorerViewModel;

});
