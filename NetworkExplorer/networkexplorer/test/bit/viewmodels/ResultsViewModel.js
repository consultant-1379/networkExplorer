define([
    'test/bit/bitPromises'
], function(promises) {

    var resultsViewModel = {

        getResultTableRows: function() {
            return promises.waitForElementVisible('.elTablelib-Table-table tbody .ebTableRow', 3000);
        },

        getResultTableHeaders: function(timeout) {
            return promises.waitForElementVisible('.elTablelib-Table-wrapper .ebTable-header', timeout ? timeout : 3000);
        },

        getResultTableHeadersSort: function() {
            return promises.waitForElementVisible('.elTablelib-Table-wrapper .ebTable-headerSort.ebSort', 3000);
        },

        getResultTableFloatingHeadersSort: function() {
            return promises.waitForElementVisible('.elTables-wrappedHeader.ebTable-th_sortable', 3000);
        },

        getResultTableCheckboxHeader: function() {
            return promises.waitForElementVisible('.elTablelib-CheckboxHeaderCell-wrap .ebCheckbox', 3000);
        },

        getResultTableHeaderCheckboxInputStatus: function() {
            return promises.waitForElementVisible('.elTablelib-CheckboxHeaderCell-wrap .ebCheckbox-inputStatus', 3000);
        },

        /**
         * Get all checkboxes on page. Includes checkbox in header and floating header.
         * Use getTableBody -> getCheckBoxesWithParent if you want to get results rows by index.
         * @returns {*}
         */
        getCheckboxes: function() {
            return promises.waitForElementVisible('.ebCheckbox', 3000);
        },

        getInfoMessage: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-messageHeader', 3000);
        },

        getErrorMessage: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-messageHeader.elNetworkExplorerLib-rResults-errorMessageHeader', 3000);
        },

        getErrorMessageBody: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-messageParagraph.elNetworkExplorerLib-rResults-errorMessageParagraph', 3000);
        },

        getNoResultsMessage: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-message.elNetworkExplorerLib-rResults-noResultsMessage', 3000);
        },

        getNoResultsMessageHeader: function(noResultsMessage) {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-messageHeader', 3000, noResultsMessage[0]);
        },

        getNoResultsMessageParagraph: function(noResultsMessage) {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-messageParagraph.elNetworkExplorerLib-rResults-noResultsParagraph', 3000, noResultsMessage[0]);
        },

        getColumnSortDropdown: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-actionPanel-right-columnSortHolder .ebSelect-header', 3000, null, 0);
        },

        getTableBody: function() {
            return promises.waitForElementVisible('.elTablelib-Table-body', 3000, null, 0);
        },

        getCheckBoxesWithParent: function(parent) {
            return promises.waitForElementVisible('.ebCheckbox', parent);
        },

        getTableCheckboxes: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-tableHolder .ebCheckbox');
        },

        getTableBodyCheckboxes: function() {
            return promises.waitForElementVisible('.elTablelib-Table-pretable > table > tbody .ebCheckbox', 3000);
        },

        getTableCheckboxesWithParent: function(parent) {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-tableHolder .ebCheckbox', 3000, parent);
        },

        waitForTableRows: function(atLeast) {
            atLeast = atLeast || 10; // at least 10 by default
            return promises.waitUntil(function() {
                var rows = document.querySelectorAll('.elTablelib-Table-body .ebTableRow');
                return rows && rows.length >= atLeast;
            });
        },

        getTableBodyRows: function() {
            return promises.waitForElementVisible('.elTablelib-Table-body .ebTableRow', 3000);
        },

        waitForLoadingToDisappear: function(timeout) {
            return promises.waitForElementToDisappear('.ebNotification-label', timeout);
        },

        waitForSortLoadingToDisappear: function() {
            return promises.waitForElementToDisappear('.elNetworkExplorerLib-rResults-sortLoading', 3000);
        },

        getResultsLoaderDots: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-loadingAnimation .ebLoader-Dots', 500);
        },

        getResultsLoaderMessage: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-loadingAnimation .elNetworkExplorerLib-rResults-loadingMessage', 500);
        },

        waitForActions: function(atLeast) {
            atLeast = atLeast || 1; // at least 1 by default
            return promises.waitUntil(function() {
                var rows = document.querySelectorAll('.elLayouts-ActionBarButton');
                return rows && rows.length >= atLeast;
            }, 5000);
        },

        getDefaultActionButtons: function() {
            return promises.waitForElementVisible('.elLayouts-QuickActionBar-defaultCommands button', 500);
        },

        getContextActionButtons: function() {
            return promises.waitForElementVisible('.elLayouts-QuickActionBar-contextCommands button', 500);
        },

        getActionBarContextItems: function() {
            return promises.waitForElementVisible('.elLayouts-QuickActionBar-contextCommands > .elLayouts-QuickActionBar-items > *', 500);
        },

        getSaveSearchButton: function() {
            return promises.getActionByName('Save Search');
        },

        getSaveCollectionButton: function() {
            return promises.getActionByName('Add to a Collection');
        },

        getRecentActionsButton: function() {
            return promises.waitForElementVisible('.ebDropdown-button', 1000);
        },

        getRecentActionsItems: function() {
            return promises.waitForElementVisible('.ebComponentList-item', 1000);
        },

        getRemoveFromCollectionButton: function() {
            return promises.getActionByName('Remove from this Collection');
        },

        waitForActionsToClear: function() {
            return promises.waitUntil(function() {
                var rows = document.querySelectorAll('.elLayouts-ActionBarButton');
                return rows && rows.length === 0;
            }, 5000);
        },

        waitForContextActionsToClear: function() {
            return promises.waitUntil(function() {
                var contextBar = document.querySelectorAll('.elLayouts-QuickActionBar_context');
                return contextBar && contextBar.length === 0;
            }, 5000);
        },

        waitForButtonToBeEnabled: function(button) {
            if (button.length) {
                button = button[0];
            }
            return promises.waitUntil(function() {
                return button.disabled === false;
            },{
                errorMessage: 'Return button was not enabled'
            });
        },

        waitForButtonToBeDisabled: function(button) {
            if (button.length) {
                button = button[0];
            }
            return promises.waitUntil(function() {
                return button.disabled === true;
            },{
                errorMessage: 'Return button was enabled'
            });
        },

        /**
         * Retrieve the messageHeaders from Results
         * They always exist in the DOM but become visible as needed
         *
         * @returns {promises}
         */
        getResultsMessageHeader: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-messageHeader', 3000);
        },

        /**
         * Retrieve the warning Toast label from NetworkExplorer
         *
         * @returns {promises}
         */
        getWarningToastLabel: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-Main .ebNotification.ebNotification_color_yellow.ebNotification_toast label', 3000);
        },

        /**
         * Retrieve the results count label e.g. Results (100) => 100
         *
         * @returns {promises}
         */
        getResultsCountLabel: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-actionPanel-left-resultCount', 3000);
        },

        /**
         * Retrieve the selected object count from action panel e.g. selected 0
         *
         * @returns {promises}
         */
        getSelectedObjectCount: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-actionPanel-left-selectedObjectCount', 3000);
        },

        /**
         * Retrieve the Log Viewer link from an error message
         *
         * Returns {Promise} promise
         */
        getSystemLogLink: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-systemLogsLink');
        },

        /**
         * Retrieve settings button
         *
         * Returns {Promise} promise
         */
        getSettingsButton: function() {
            return promises.waitForElementVisible('.elNetworkExplorerLib-rResults-actionPanel-right-settings');
        },

        /**
         * Retrieve InfoBar name
         *
         * @returns {Promise} promise
         */
        getInfoBarName: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rInfoBar-infoName');
        },

        /**
         * Retrieve "Close Collection" button
         *
         * Returns {Promise} promise
         */
        getCloseCollectionButton: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rInfoBar-closeCollection');
        },

        /**
         * Check if a Element is in some way visible and interactable to the user
         *
         * @param el
         * @returns {boolean}
         */
        isElementVisibleToUser: function(el) {
            if (el.length) { el = el[0]; }
            if (
                el === null ||
                el.style.display === 'none' ||
                window.getComputedStyle(el).display === 'none' ||
                el.style.visibility === 'hidden' ||
                window.getComputedStyle(el).visibility === 'hidden' ||
                (
                    el.getBoundingClientRect().top === 0 &&
                    el.getBoundingClientRect().left === 0
                ) ||
                (
                    el.offsetHeight === 0 ||
                    el.offsetWidth === 0
                )
            ) {
                return false;
            } else {
                return true;
            }
        }

    };

    return resultsViewModel;

});
