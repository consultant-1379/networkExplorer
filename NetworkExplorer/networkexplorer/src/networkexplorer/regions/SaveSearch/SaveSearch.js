define([
    'jscore/core',
    'jscore/ext/net',
    'container/api',
    './SaveSearchView',
    '../../utils/httpHelper',
    '../../widgets/SharingPermissions/SharingPermissions',
    'widgets/Notification',
    'widgets/Dialog',
    'i18n!networkexplorer/SaveSearch.json'
], function(
    core,
    net,
    Container,
    View,
    httpHelper,
    SharingPermissions,
    Notification,
    Dialog,
    strings
) {

    /**
     * Shared Region
     *
     * @class SaveSearch
     */
    return core.Region.extend({

        View: View,
        SAVED_SEARCH: 'savedSearch',

        /**
         * Lifecycle Method
         */
        onViewReady: function() {
            this.view.getInput().focus();
            this.view.getInput().addEventHandler('input', this.onNameInput, this);
            this.view.getInput().addEventHandler('invalid', this.onNameInvalid, this);

            this.sharingPermissions = new SharingPermissions();
            this.sharingPermissions.attachTo(this.view.getSharingPermissions());

            this.view.getSubmitButton().addEventHandler('click', this.clickSubmit, this);
            this.view.getCancelButton().addEventHandler('click', this.hideComponent, this);
            this.setEnabled(true);
        },

        /**
         * called when user digits characters in the name field.
         *
         * @private
         * @method onNameInput
         */
        onNameInput: function() {
            this.view.setCustomError('');
            this.view.isNameValid();
        },

        /**
         * Callback called when html validation finds an error.
         *
         * @private
         * @method onNameInvalid
         */
        onNameInvalid: function() {
            var nameSearch = this.view.getInputValue();

            if (nameSearch === '') {
                this.view.setInputStatusErrorText(strings.get('nameRequired'));
            } else if (nameSearch === this.options.data) {
                this.view.setInputStatusErrorText(strings.get('nameCannotEqualContentLabel'));
            }
            this.view.getInput().focus();
        },

        /**
         * Checks name, if the name is valid send save request.
         *
         * @private
         * @method clickSubmit
         */
        clickSubmit: function() {
            if (this.view.getInputValue() === this.options.data) {
                this.view.setCustomError(strings.get('nameCannotEqualContentLabel'));
            }

            if (this.view.isNameValid()) {

                this.hideNotification();
                this.setEnabled(false);
                this.postSavedSearch();
            } else {
                this.showNotification();
            }
        },


        /**
         * Sends saved request to server.
         *
         * @private
         * @method postSavedSearch
         */
        postSavedSearch: function() {
            Container.getEventBus().publish('container:loader');
            net.ajax({
                url: '/topologyCollections/savedSearches',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: this.view.getInputValue(),
                    category: this.sharingPermissions.getSharingPermission(),
                    searchQuery: this.options.data
                }),
                success: function() {
                    this.setEnabled(true);
                    Container.getEventBus().publish('container:loader-hide');
                    this.getEventBus().publish('savesearch:success', this.SAVED_SEARCH);
                    this.hideComponent();
                }.bind(this),
                error: this.handleSubmitError.bind(this)
            });
        },


        /**
         * Handler for error while saving
         *
         * @private
         * @method handleSubmitError
         * @param {String} msg
         * @param {Object} xhr
         */
        handleSubmitError: function(msg, xhr) {
            Container.getEventBus().publish('container:loader-hide');
            if (!this.dialog) {
                var errorBody = httpHelper.getServerMessage(xhr, xhr.getResponseText());
                this.dialog = new Dialog({
                    header: strings.get('unableToSaveSearchLabel'),
                    content: errorBody.userMessage.body,
                    type: 'error',
                    buttons: [{
                        caption: strings.get('ok'),
                        action: this.closeDialog.bind(this)
                    }],
                    visible: true
                });
            }
        },

        /**
         * Close dialog
         *
         * @private
         * @method closeDialog
         */
        closeDialog: function() {
            this.dialog.hide();
            delete this.dialog;
            this.setEnabled(true);
        },

        /**
         * Set form submission enabled
         *
         * @private
         * @method setEnabled
         * @param {Boolean} enabled
         */
        setEnabled: function(enabled) {
            this.view.setEnabledInput(enabled);
            this.sharingPermissions.setEnabled(enabled);
            this.view.setEnabledSubmitButton(enabled);
            this.view.setEnabledCancelButton(enabled);
        },

        /**
         * Show the notification message on top of widget
         *
         * @private
         * @method showNotification
         */
        showNotification: function() {
            if (!this.defaultNotification) {
                this.defaultNotification = new Notification({
                    color: 'red',
                    icon: 'error',
                    label: strings.get('correctErrorsAndTryAgainLabel'),
                    autoDismiss: false,
                    width: this.view.getElement().getNative().offsetWidth
                });

                this.defaultNotification.attachTo(this.view.getDefaultNotification());
            }
        },

        /**
         * Hide the notification message on top of widget
         *
         * @private
         * @method hideNotification
         */
        hideNotification: function() {
            if (this.defaultNotification) {
                this.defaultNotification.detach();
                this.defaultNotification = undefined;
            }
        },

        /**
         * Method to notify operation completation.
         *
         * @private
         * @method hideComponent
         */
        hideComponent: function() {
            this.getEventBus().publish('savesearch:hide');
        }
    });
});
