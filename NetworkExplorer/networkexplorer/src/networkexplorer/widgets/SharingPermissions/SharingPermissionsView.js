define([
    'jscore/core',
    'template!./sharingPermissions.html',
    'styles!./sharingPermissions.less',
    'i18n!networkexplorer/SharingPermissions.json'
], function(core, template, styles, strings) {
    return core.View.extend({

        getTemplate: function() {
            return template({
                strings: strings
            });
        },

        getStyle: function() {
            return styles;
        },

        getPrivateRadioButton: function() {
            return this.getElement().find('.eaNetworkExplorer-wSharingPermissions-radioPrivate');
        },

        getPublicRadioButton: function() {
            return this.getElement().find('.eaNetworkExplorer-wSharingPermissions-radioPublic');
        },

        isPrivateSharingPermissions: function() {
            return this.getPrivateRadioButton().getProperty('checked');
        }
    });
});
