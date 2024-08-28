define([
    'jscore/core',
    'template!./ConflictingDialog.html',
    'styles!./ConflictingDialog.less'
], function(core, template, style) {

    return core.View.extend({

        getTemplate: function() {
            return template(this.options);
        },

        getStyle: function() {
            return style;
        },

        isUniqueRadio: function() {
            return this.getElement().find('.eaNetworkExplorer-wConflictingCellDialog-conflictingCell-radioUnique').getProperty('checked');
        },

        isMoveRadio: function() {
            return this.getElement().find('.eaNetworkExplorer-wConflictingCellDialog-conflictingCell-radioMove').getProperty('checked');
        },

        disabledAndUncheckUniqueRadio: function() {
            this.getElement().find('.eaNetworkExplorer-wConflictingCellDialog-conflictingCell-radioUnique').setProperty('disabled', true);
            this.getElement().find('.eaNetworkExplorer-wConflictingCellDialog-conflictingCell-radioMove').setProperty('checked', true);
        },

        getTablePlaceholder: function() {
            return this.getElement().find('.eaNetworkExplorer-wConflictingCellDialog-tablePlaceholder');
        },

        getViewConflictingButton: function() {
            return this.getElement().find('.eaNetworkExplorer-wConflictingCellDialog-button');
        },

        hideWarningMessagePlaceholder: function() {
            this.getElement().find('.eaNetworkExplorer-wConflictingCellDialog-warningMessage').setStyle('display', 'none');
        },

        showWarningMessagePlaceholder: function() {
            this.getElement().find('.eaNetworkExplorer-wConflictingCellDialog-warningMessage').setStyle('display', 'block');
        }

    });
});
