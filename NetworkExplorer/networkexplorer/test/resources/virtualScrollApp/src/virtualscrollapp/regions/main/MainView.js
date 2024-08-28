define([
    'jscore/core',
    'text!./_main.html',
    'styles!./_main.less'
], function(core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function() {
            return template;
        },

        getStyle: function() {
            return styles;
        },

        getResultsTable: function() {
            return this.getElement().find('.eaVirtualScrollApp-rMain-tableHolder');
        },

        setSelectionCount: function(selectionCount) {
            this.getElement().find('.eaVirtualScrollApp-rMain-header>label>span').setText(selectionCount);
        }

    });

});
