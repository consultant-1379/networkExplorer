define([
    'jscore/core',
    'template!./restrictChildObjectDialog.html',
    'styles!./restrictChildObjectDialog.less'
], function(core, template, style) {

    return core.View.extend({

        getTemplate: function () {
            return template();
        },

        getStyle: function () {
            return style;
        },

        hideContinueMessage: function() {
            this.getElement().find('.eaNetworkExplorer-wRestrictChildObjectCellDialog-content-continue').setStyle('display', 'none');
        },

        showContinueMessage: function() {
            this.getElement().find('.eaNetworkExplorer-wRestrictChildObjectCellDialog-content-continue').setStyle('display', 'block');
        }

    });

});
