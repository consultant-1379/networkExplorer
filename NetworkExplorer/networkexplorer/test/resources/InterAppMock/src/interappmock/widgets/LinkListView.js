define([
    'jscore/core',
    'template!./LinkList.html',
    'styles!./LinkList.less'
], function(core, template, style) {

    return core.View.extend({

        getTemplate: function() {
            return template(this.options);
        },

        getStyle: function() {
            return style;
        },

        getAllLinks: function() {
            return this.getElement().findAll('li > a');
        }

    });

});
