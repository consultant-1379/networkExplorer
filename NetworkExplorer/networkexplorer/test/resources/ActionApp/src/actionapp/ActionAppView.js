define([
    'jscore/core',
    'template!./ActionApp.html',
    'styles!./ActionApp.less'
], function(core, template, style) {

    return core.View.extend({

        getTemplate: function() {
            return template(this.options);
        },

        getStyle: function() {
            return style;
        },

        getContent: function() {
            return this.getElement().find('.eaActionApp');
        }
    });

});
