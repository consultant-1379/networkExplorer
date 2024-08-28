define([
    'jscore/core',
    'template!./slidingMenuRight.html',
    'styles!./SlidingMenuRight.less',
    'i18n!networkexplorer/SlidingMenuRight.json'
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

        getAttributesRegionHolder: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenuRight-attributesRegionHolder');
        },

        hideAttributesRegion: function() {
            this.getAttributesRegionHolder().setModifier('hidden');
        },

        showAttributesRegion: function() {
            this.getAttributesRegionHolder().removeModifier('hidden');
        },

        getErrorMessageArea: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenuRight-errorMessage');
        },

        hideErrorMessage: function() {
            this.getErrorMessageArea().setModifier('hidden');
        },

        showErrorMessage: function() {
            this.getErrorMessageArea().removeModifier('hidden');
        },

        setInlineErrorContent: function(title, message) {
            this.getInlineErrorMessageTitle().setText(title);
            this.getInlineErrorMessageBody().setText(message);
        },

        getLoaderEl: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenuRight-loadingAnimation');
        },

        showLoader: function() {
            this.getLoaderEl().removeModifier('hidden');
        },

        hideLoader: function() {
            this.getLoaderEl().setModifier('hidden');
        }

    });

});
