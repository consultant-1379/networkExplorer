/**
 *
 */
define([
    'jscore/core',
    'template!./LimitedList.html',
    'styles!./LimitedList.less',
    'i18n!networkexplorer/app.json'
], function(core, template, style, strings) {

    return core.View.extend({

        init: function(options) {
            this.items = options.items;
            this.title = options.title;
            this.viewAllUrl = options.viewAllUrl;
            this.showViewAllButton = options.showViewAllButton;
        },

        getTemplate: function() {
            return template({
                strings: strings,
                items: this.items,
                title: this.title,
                viewAllUrl: this.viewAllUrl,
                url: this.url,
                showViewAllButton: this.showViewAllButton
            });
        },

        getStyle: function() {
            return style;
        },

        getTopList: function() {
            return this.getElement().find('.eaNetworkExplorer-wLimitedList-topList');
        },

        getShowMoreLink: function() {
            return this.getElement().find('.eaNetworkExplorer-wLimitedList-showMore');
        },

        getLoadingAnimation: function() {
            return this.getElement().find('.eaNetworkExplorer-wLimitedList-loadingAnimation');
        },

        showLoadingAnimation: function() {
            this.getLoadingAnimation().removeModifier('hidden');
        },

        hideLoadingAnimation: function() {
            this.getLoadingAnimation().setModifier('hidden');
        }

    });

});
