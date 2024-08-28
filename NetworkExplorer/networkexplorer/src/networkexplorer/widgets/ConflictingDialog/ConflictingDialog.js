define([
    'jscore/core',
    './ConflictingDialogView',
    'tablelib/Table',
    'tablelib/plugins/SmartTooltips',
    'tablelib/plugins/QuickFilter',
    'widgets/Dialog',
    'tablelib/plugins/StickyHeader',
    '../ConflictingTable/ConflictingTable'

], function(core, View, Table, SmartTooltips, QuickFilter, Dialog, StickyHeader, ConflictingTable) {
    'use strict';
    return core.Widget.extend({

        view: function() {
            return new View(this.options);
        },

        showWarningMessage: function() {
            return this.view.showWarningMessagePlaceholder();
        },

        disabledAndUncheckUniqueRadio: function() {
            return this.view.disabledAndUncheckUniqueRadio();
        },

        init: function(options) {
            this.options = options;
            this.ids = options.ids;
            this.nodeCount = options.nodeCount;
        },

        onViewReady: function() {
            this.view.getViewConflictingButton().addEventHandler('click',this.handleViewConflictingButtonHandler.bind(this));
        },

        handleViewConflictingButtonHandler: function() {
            var nodeLen = this.nodeCount.split('of');
            var len = nodeLen[0].toString();
            var data = this.ids;
            var conflictingTable = new ConflictingTable({
                ids: this.ids
            });
            var cellDialog = new Dialog({
                header: 'Conflicting Nodes (' +len+ ')',
                content: conflictingTable,
                optionalContent: '',
                type: '',
                buttons: [
                    {
                        caption: 'Close',
                        action: function() {
                            cellDialog.destroy();
                        }
                    },{
                        caption: 'Export',
                        action: function() {
                            var csvRows = [];
                            var headers = ["Node Name", "Current Collection"];//Object.keys(data[0]);
                            csvRows.push(headers.join(','));
                            for (var i = 0 ; i < data.length; i++) {
                                var values = Object.values(data[i]).reverse().join(',');
                                csvRows.push(values);
                            }
                            csvRows = csvRows.join('\n');
                            var blob = new Blob([csvRows], { type: 'text/csv' });
                            var url = window.URL.createObjectURL(blob);
                            var link = document.createElement('a');
                            var currentDate = (new Date()).toISOString().replace(/[^0-9]/g, '').slice(0, -3);
                            link.download = 'Conflicting Nodes-' + currentDate + '.csv';
                            link.href =url;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }
                    }
                ]});
            cellDialog.show();
        },

        radioButtonValues: function(objectsData) {
            if (this.view.isMoveRadio()) {
                return {objects: objectsData, moveFlag: true };
            } else if (this.view.isUniqueRadio()) {
                return {objects: objectsData, uniqueFlag: true };
            }
        }
    });
});
