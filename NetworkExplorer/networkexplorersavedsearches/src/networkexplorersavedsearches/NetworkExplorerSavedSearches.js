define([
    'jscore/core',
    './NetworkExplorerSavedSearchesView',
    'jscore/ext/locationController'
], function(core, View, LocationController) {

    return core.App.extend({

        View: View,

        /**
         * Lifecyle method
         */
        onStart: function() {
            this.locationController = new LocationController({
                autoUrlDecode: false
            });
            this.locationController.setLocation('/savedsearchmanagement', false, false);
        }

    });
});