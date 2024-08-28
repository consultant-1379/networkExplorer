define([
    'jscore/core',
    'template!./DataSelector.html',
    'styles!./DataSelector.less'
], function(core, template, style) {
    return core.View.extend({
        getTemplate: function() {
            return template(this.options);
        },
        getStyle: function() {
            return style;
        },
        getComboBox: function() {
            return this.getElement().find('div[class*="-type"]');
        },
        getTextArea: function() {
            return this.getElement().find('div[class*="-data"]');
        },
        getSelectBox: function() {
            return this.getElement().find('div[class*="-scenario"]');
        }
    });
});
