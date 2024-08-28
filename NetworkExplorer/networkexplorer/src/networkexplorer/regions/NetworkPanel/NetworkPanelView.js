define([
    'jscore/core',
    'template!./NetworkPanel.html',
    'styles!./NetworkPanel.less',
    'i18n!networkexplorer/SlidingMenu.json'
], function(core, template, style, dictionary) {

    return core.View.extend({
        getTemplate: function() {
            return template(dictionary);
        },

        getStyle: function() {
            return style;
        },

        getInfo: function() {
            return this.getElement().find('.eaNetworkExplorer-rNetworkPanel');
        },

        getScopingPanel: function() {
            return this.getElement().find('.eaNetworkExplorer-rNetworkPanel-scopingPanel');
        }

    });

});
