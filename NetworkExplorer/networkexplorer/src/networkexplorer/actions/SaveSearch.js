define([
    'jscore/core',
    'container/api',
    '../regions/SaveSearch/SaveSearch',
    'i18n!networkexplorer/Results.json'
], function(core, Container, SaveSearchRegion, strings) {

    /**
     *
     * @class SaveSearch
     */
    return {

        /**
         * Open flyout panel with Save Search regions.
         *
         * @method action
         * @param {Object} options the fields required are:
         *              {
         *                 context
         *                 searchTerm
         *              }
         */
        action: function(options) {
            this.context = options.context;
            this.context.eventBus.subscribe('savesearch:success', this.publishSearchIsSavedEvent, this);
            this.context.eventBus.subscribe('savesearch:hide', this.hideFlyout, this);

            Container.getEventBus().publish('flyout:show', {
                header: strings.get('saveCurrentSearch'),
                content: new SaveSearchRegion({
                    context: options.context,
                    data: options.searchTerm
                })
            });
        },

        /**
         * Publishes events to update the table header and display a 'Saved' toast notification.
         *
         * @param savedEntityType {String} saved object identifier.
         */
        publishSearchIsSavedEvent: function(savedEntityType) {
            this.context.eventBus.publish('Results:searchSaved', savedEntityType);
            this.context.eventBus.publish('Results:showToastSavedSearch', {
                label: strings.get('savedSearchSavedToastLabel'),
                color: 'green',
                icon: 'tick',
                showAsToast: true,
                showCloseButton: true
            });
        },


        /**
         * Publishes events to close flyout panel.
         *
         * @method hideFlyout
         */
        hideFlyout: function() {
            Container.getEventBus().publish('flyout:hide');
        }
    };
});
