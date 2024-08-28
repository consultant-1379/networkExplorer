define([
    'jscore/core',
    'text!./networkExplorerSavedSearches.html'
], function(core, template) {
    return core.View.extend({

        getTemplate: function() {
            return template;
        }

    });

});