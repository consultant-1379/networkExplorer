define([
    'jscore/core',
    'template!./ConflictingTable.html',
    'styles!./ConflictingTable.less'
], function(core, template, style) {

    return core.View.extend({

        getTemplate: function() {
            return template(this.options);
        },

        getStyle: function() {
            return style;
        },

        getTablePlaceholder: function() {
            return this.getElement().find('.eaNetworkExplorer-wConflictingCellDialog-tablePlaceholder');
        },

    });

});
