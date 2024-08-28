define([
    'test/bit/bitPromises'
], function(promises) {
    return {
        getTabs: function() {
            return promises.waitForElementVisible('.ebTabs-tabItem', 10000);
        },
        getTopologyItems: function(tab) {
            return promises.waitForElementVisible('.elDataviz-Tree .elDataviz-Item', 10000, tab);
        },
        getTopologyClickableItems: function(tab) {
            return promises.waitForElementVisible('.elDataviz-Tree .elDataviz-Item-label_selectable', 10000, tab);
        },
        getTableRows: function(tab) {
            return promises.waitForElementVisible('.elTablelib-Table .elTablelib-Table-body .ebTableRow',1000,tab);
        },
        getTableBodyCheckboxes: function(tab) {
            return promises.waitForElementVisible('.elTablelib-Table .elTablelib-Table-body .ebTableRow .ebCheckbox',1000,tab);
        },
        getTableHeaderCheckboxes: function(tab) {
            return promises.waitForElementVisible('.elTablelib-Table .elTablelib-Table-header .ebTableRow .ebCheckbox',1000,tab);
        },
        getSelectBoxCaptionValue: function() {
            return promises.waitForElementVisible('.ebSelect-value', 1000);
        },
        getCheckBoxItems: function() {
            return promises.waitForElementVisible('.ebCheckbox', 1000);
        },
        getTableCells: function() {
            return promises.waitForElementVisible('td.ebTableCell', 1000, null);
        },
        getNotification: function() {
            return promises.waitForElementVisible('.ebNotification-label', 2000, null, 0);
        },
        getNotificationCloseButton: function() {
            return promises.waitForElementVisible('.ebNotification-close', 2000, null, 0);
        },
        getDialogTitle: function() {
            return promises.waitForElementVisible('.ebDialogBox-primaryText', 2000, null, 0);
        },
        getDialogMessage: function() {
            return promises.waitForElementVisible('.ebDialogBox-secondaryText', 2000, null, 0);
        },
        getDialogSubMessage: function() {
            return promises.waitForElementVisible('.ebDialogBox-thirdText', 2000, null, 0);
        },
        getDialogButtons: function() {
            return promises.waitForElementVisible('.ebDialogBox-actionBlock button', 2000, null, 0);
        },
        getAllDialogButtons: function() {
            return promises.waitForElementVisible('.ebDialogBox-actionBlock button', 2000, null);
        },
        getInputField: function() {
            return promises.waitForElementVisible('.ebInput', 2000, null, 0);
        },
        getNodeFilterInput: function() {
            return promises.waitForElementVisible('.elTablelib-Table-pretable > table:nth-child(1) > thead:nth-child(2) > tr:nth-child(2) > th:nth-child(1) > div:nth-child(1) > input:nth-child(1)', 2000, null, 0);
        },
        getCollectionFilterInput: function() {
            return promises.waitForElementVisible('.elTablelib-Table-pretable > table:nth-child(1) > thead:nth-child(2) > tr:nth-child(2) > th:nth-child(2) > div:nth-child(1) > input:nth-child(1)', 2000, null, 0);
        },
        getDialogOkButton: function() {
            return promises.waitForElementVisible('.ebDialogBox-actionBlock .ebBtn_color_darkBlue', 2000, null, 0);
        },
        waitForDialogToDisappear: function() {
            return promises.waitForElementToDisappear('.ebDialogBox', 2000);
        },
        getDialogTableRows: function() {
            return promises.waitForElementVisible('.ebDialogBox-content .elTablelib-Table-table tbody .ebTableRow', 1000);
        },
        getViewConflictingNodesButton: function() {
            return promises.waitForElementVisible('.ebDialogBox-secondaryText button', 2000, null);
        }
    };
});
