define([
    'jscore/core',
    'template!./InfoBar.html',
    'styles!./InfoBar.less',
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

        getDefaultHeader: function() {
            return this.getElement().find('.eaNetworkExplorer-rInfoBar-defaultHeader');
        },

        getInfoEl: function() {
            return this.getElement().find('.eaNetworkExplorer-rInfoBar-info');
        },

        getInfoNameEl: function() {
            return this.getElement().find('.eaNetworkExplorer-rInfoBar-infoName');
        },

        getInfoNameScrollWidth: function() {
            return this.getInfoNameEl().getNative().scrollWidth;
        },

        getInfoNameOffsetWidth: function() {
            return this.getInfoNameEl().getNative().offsetWidth;
        },

        getInfoNameTooltip: function() {
            return this.getInfoNameEl().getAttribute('title');
        },

        setInfoNameEl: function(value) {
            this.getInfoNameEl().setText(value);
        },

        setInfoNameTooltipText: function(text) {
            this.getInfoNameEl().setAttribute('title', text);
        },

        removeInfoNameTooltipText: function() {
            this.getInfoNameEl().removeAttribute('title');
        },

        getInfoTypeWrapperEl: function() {
            return this.getElement().find('.eaNetworkExplorer-rInfoBar-infoTypeWrapper');
        },

        getInfoTypeEl: function() {
            return this.getElement().find('.eaNetworkExplorer-rInfoBar-infoType');
        },
        // generic getters END

        showDefaultHeader: function() {
            this.getDefaultHeader().removeModifier('hidden');
        },

        hideDefaultHeader: function() {
            this.getDefaultHeader().setModifier('hidden');
        },

        showInfoEl: function() {
            this.getInfoEl().removeModifier('hidden');
        },

        hideInfoEl: function() {
            this.getInfoEl().setModifier('hidden');
        },

        setInfoName: function(name) {
            this.getInfoNameEl().setText(name);
        },

        hideInfoTypeWrapper: function() {
            this.getInfoTypeWrapperEl().setModifier('hidden');
        },

        showInfoTypeWrapper: function() {
            this.getInfoTypeWrapperEl().removeModifier('hidden');
        },

        setInfoType: function(txt) {
            this.getInfoTypeEl().setText(txt);
        },

        getFavoriteIcon: function() {
            return this.getElement().find('.eaNetworkExplorer-rInfoBar-favoriteIcon');
        },

        hideFavoriteIcon: function() {
            this.getFavoriteIcon().setModifier('hidden');
        },

        showFavoriteIcon: function() {
            this.getFavoriteIcon().removeModifier('hidden');
        },

        getCloseCollectionButton: function() {
            return this.getElement().find('.eaNetworkExplorer-rInfoBar-closeCollection');
        },

        hideCloseCollectionButton: function() {
            this.getCloseCollectionButton().setModifier('hidden');
        },

        showCloseCollectionButton: function() {
            this.getCloseCollectionButton().removeModifier('hidden');
        },

        getCloseCollectionSeperator: function() {
            return this.getElement().find('.eaNetworkExplorer-rInfoBar-separator');
        },

        hideCloseCollectionSeperator: function() {
            this.getCloseCollectionSeperator().setModifier('hidden');
        },

        showCloseCollectionSeperator: function() {
            this.getCloseCollectionSeperator().removeModifier('hidden');
        },

        setFavoriteState: function(state) {
            if (state === true) {
                this.getFavoriteIcon().setModifier('favorited');
            } else {
                this.getFavoriteIcon().removeModifier('favorited');
            }
        },

        addFavoriteIconClickHandler: function(callback, context) {
            this.getFavoriteIcon().addEventHandler('click', function(e) {
                e.preventDefault();
                if (context) {
                    callback.call(context);
                } else {
                    callback();
                }
            });
        }
    });
});
