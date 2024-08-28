define([
    'jscore/core',
    'jscore/ext/net',
    './SharingPermissionsView'
], function(core, net, View) {

    return core.Widget.extend({

        View: View,

        /**
         * Gets user's sharing permissions.
         *
         * @method getSharingPermission
         * @return {String} sharing permission.
         */
        getSharingPermission: function() {
            return this.view.isPrivateSharingPermissions() ? 'Private' : 'Public';
        },

        /**
         * Enable/disable permission checkbox.
         *
         * @method setEnabled
         * @param {Boolean} flag
         */
        setEnabled: function(flag) {
            this.view.getPrivateRadioButton().setProperty('disabled', !flag);
            this.view.getPublicRadioButton().setProperty('disabled', !flag);
        }
    });
});
