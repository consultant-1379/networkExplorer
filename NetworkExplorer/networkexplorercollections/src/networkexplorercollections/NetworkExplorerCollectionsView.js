define([
    'jscore/core',
    'text!./networkExplorerCollections.html'
], function(core, template) {

    return core.View.extend({

        getTemplate: function() {
            return template;
        }

    });

});