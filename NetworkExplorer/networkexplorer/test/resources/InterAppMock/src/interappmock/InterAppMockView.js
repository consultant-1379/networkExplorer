define([
    'jscore/core',
    'template!./InterAppMock.html',
    'styles!./InterAppMock.less'
], function(core, template, style) {

    return core.View.extend({

        getTemplate: function() {
            return template(this.options);
        },

        getStyle: function() {
            return style;
        },

        getContent: function() {
            return this.getElement().find('.eaInterAppMock');
        }
    });

});
