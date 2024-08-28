define([
    'jscore/core',
    'template!./Search.html',
    'styles!./Search.less',
    'i18n!networkexplorer/app.json'
], function(core, template, style, strings) {

    return core.View.extend({

        getTemplate: function() {
            return template({
                strings: strings
            });
        },

        getStyle: function() {
            return style;
        },

        hide: function() {
            this.getElement().setModifier('hidden');
        },

        show: function() {
            this.getElement().removeModifier('hidden');
        },

        getSearchForm: function() {
            return this.getElement().find('.eaNetworkExplorer-rSearch-form');
        },

        addSearchFormHandler: function(eventName, callback, context) {
            this.getSearchForm().addEventHandler(eventName, function(e) {
                e.preventDefault();
                callback.call(context);
            });
        },

        getSearchInput: function() {
            return this.getElement().find('.eaNetworkExplorer-rSearch-form-searchInput');
        },

        getSearchButton: function() {
            return this.getElement().find('.eaNetworkExplorer-rSearch-form-searchBtn');
        },

        disableSearchButton: function() {
            this.getSearchButton().setProperty('disabled', true);
        },

        enableSearchButton: function() {
            this.getSearchButton().setProperty('disabled', false);
        },

        getInfoIconHolder: function() {
            return this.getElement().find('.eaNetworkExplorer-rSearch-form-infoIconHolder');
        },

        getSwitchButton: function() {
            return this.getElement().find('.eaNetworkExplorer-rSearch-form-switchToBuilder-link');
        },

        addSwitchButtonClickHandler: function(callback, context) {
            this.getSwitchButton().addEventHandler('click', function(e) {
                e.preventDefault();
                callback.call(context);
            });
        },

        getValidationErrorIcon: function() {
            return this.getElement().find('.eaNetworkExplorer-rSearch-form-validationErrorIcon');
        },

        hideValidationErrorIcon: function() {
            this.getValidationErrorIcon().removeModifier('visible');
        },

        showValidationErrorIcon: function() {
            this.getValidationErrorIcon().setModifier('visible');
        },

        setValidationErrorIconTitle: function(title) {
            this.getValidationErrorIcon().setAttribute('title', title);
        }
    });

});
