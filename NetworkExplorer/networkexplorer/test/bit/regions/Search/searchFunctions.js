/**
 *  Operator type functions:
 *  USE ONLY: when testing Search Region ! - otherwise elements of Search will/should not be present!
 */

define([
    'jscore/core',
    'test/resources/cssNamespaces',
    'test/bit/bit_util'
], function(core, css, bit_util) {
    return {

        /**
         * Executes search.
         * @param searchTerm
         * @param callingRegion - requires Search region
         */
        executeSearch: function(searchTerm, callingRegion) {
            var searchInput = callingRegion.searchInput.view.getSearchField();
            searchInput.setValue(searchTerm);
            callingRegion.view.getSearchForm().trigger('submit');
        },

        /**
         * Executes search and saves it.
         * @param searchTerm
         * @param searchName  - name to be given to the saved search
         * @param callingRegion - requires Search region
         */
        saveSearch: function(searchTerm, searchName, callingRegion) {
            this.executeSearch(searchTerm, callingRegion);
            // click "save search" button.
            var saveSearchButton = callingRegion.view.getSaveSearch();
            bit_util.clickElementForPhantomJS(saveSearchButton);

            //input collection name
            var saveDialogInput = document.getElementsByClassName('eaNetworkExplorer-wSaveDialog-collectionName')[0];
            saveDialogInput.value = searchName;

            // click "save" on save dialog
            var saveButtonInDialog = document.getElementsByClassName('ebDialog-primaryActionButton')[0];
            saveButtonInDialog.click();
        }
    };
});
