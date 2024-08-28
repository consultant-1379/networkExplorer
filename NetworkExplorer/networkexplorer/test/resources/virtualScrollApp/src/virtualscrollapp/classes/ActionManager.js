define([
    'actionlibrary/actionlibrary',
], function(
    ActionLibrary
) {
    /**
     * ActionManager
     * -------------
     * Use to work with Actions Framework
     *
     * @constructor
     */
    var ActionManager = function() {};

    ActionManager.prototype = {

        /**
         * Get Actions for list of objects
         *
         * @method getActions
         * @param callback Receives the array of actions
         */
        getActions: function(objects, callback) {
            /*
               This implementation is just a demo
             */
            clearTimeout(this.getActionsTimeoutId);
            this.getActionsTimeoutId = setTimeout(function() {
                var actionsToShow = [];
                // ManagedObject only
                if (objects.length === 1) {
                    actionsToShow.push({
                        name: 'Action on single ManagedObject',
                        type: 'button'
                    });
                    // MO type = MeContext
                    if (objects[0].moType === 'MeContext') {
                        actionsToShow.push({
                            name: 'Action on single MeContext',
                            type: 'button'
                        });
                    }
                    // MO type = MeContext, neType = ERBS
                    if (objects[0].moType === 'MeContext' && objects[0].neType === 'ERBS') {
                        actionsToShow.push({
                            name: 'Action on single ERBS MeContext',
                            type: 'button'
                        });
                    }
                }
                // ManagedObjects
                if (objects.length > 1) {
                    actionsToShow.push({
                        name: 'Action on multiple ManagedObjects',
                        type: 'button'
                    });
                    // every MO type = MeContext
                    if (!objects.find(function(object) {
                        return object.moType !== 'MeContext';
                    })) {
                        actionsToShow.push({
                            name: 'Action on multiple MeContexts',
                            type: 'button'
                        });
                    }
                    // every MO type = MeContext && every neType = ERBS
                    if (!objects.find(function(object) {
                        return !(object.moType === 'MeContext' && object.neType === 'ERBS');
                    })) {
                        actionsToShow.push({
                            name: 'Action on multiple ERBS MeContexts',
                            type: 'button'
                        });
                    }
                }
                callback(actionsToShow);
            }, 1000);
        }
    };

    return ActionManager;
});
