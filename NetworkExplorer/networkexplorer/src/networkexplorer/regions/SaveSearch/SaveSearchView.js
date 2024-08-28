define([
    'jscore/core',
    'template!./saveSearch.html',
    'styles!./saveSearch.less',
    'i18n!networkexplorer/SaveSearch.json'
], function(core, template, style, strings) {

    return core.View.extend({

        getStyle: function() {
            return style;
        },

        getTemplate: function() {
            return template({
                strings: strings
            });
        },

        getDefaultNotification: function() {
            return this.getElement().find('.eaNetworkExplorer-rSaveSearch-defaultNotification');
        },

        getInput: function() {
            return this.getElement().find('.eaNetworkExplorer-rSaveSearch-nameInput');
        },

        getInputValue: function() {
            return this.getInput().getValue().trim();
        },

        isNameValid: function() {
            // to show the 'required' error when user empty the field
            // after the initial visualization
            this.getInput().setAttribute('required');
            return this.getInput().getNative().checkValidity();
        },

        setEnabledInput: function(enabled) {
            this.getInput().setProperty('disabled', !enabled);
        },

        setCustomError: function(msg) {
            this.getInput().getNative().setCustomValidity(msg);
        },

        setInputStatusErrorText: function(text) {
            return this.getInputStatusError().setText(text);
        },

        getInputStatusError: function() {
            return this.getElement().find('.ebInput-statusError');
        },

        getSharingPermissions: function() {
            return this.getElement().find('.eaNetworkExplorer-rSaveSearch-sharingPermissions');
        },

        getSubmitButton: function() {
            return this.getElement().find('.eaNetworkExplorer-rSaveSearch-actionButtons-buttonsBlock-submitButton');
        },

        setEnabledSubmitButton: function(enabled) {
            this.getSubmitButton().setProperty('disabled', !enabled);
        },

        getCancelButton: function() {
            return this.getElement().find('.eaNetworkExplorer-rSaveSearch-actionButtons-buttonsBlock-cancelButton');
        },

        setEnabledCancelButton: function(enabled) {
            this.getCancelButton().setProperty('disabled', !enabled);
        }
    });
});
