define([
    'jscore/core',
    'text!./Main.html',
    'styles!./Main.less'
], function(core, template, styles) {

    return core.View.extend({

        getTemplate: function() {
            return template;
        },

        getStyle: function() {
            return styles;
        },

        getContentPlaceholder: function() {
            return this.getElement().find('.eaNetworkExplorer-Main-ContentContainer');
        }

    });

});
