define([
    'jscore/core',
    'jscore/ext/net',
    'container/api',
    'actionlibrary/ActionLibrary',
    'networkexplorerlib/ObjectConfigurationApi',
    'networkexplorerlib/ErrorHandler',
    'widgets/Dialog',
    'widgets/Notification',
    'i18n!networkexplorer/app_actions.json',
    'i18n!networkexplorer/Results.json',
    'i18n!networkexplorer/keywords.json'
], function(core, net, Container, ActionLibrary, ObjectConfigurationApi, ErrorHandler, Dialog, Notification, app_actions, strings, keywords) {

    'use strict';

    /**
     * RemoveFromThisCollection
     * ===
     * id: networkexplorer-remove-from-this-collection
     *
     * This action removes Network Objects from an existing Collection.
     *
     * Expected parameters:
     * # Array of objects
     *
     * Expected contents
     * * Exactly one object
     * * The first object must have an id property whose value is a valid string representing the id of a
     *   Collection that contains ManagedObjects
     * * The first object must have an objects property whose value is a valid array containing 1 or more objects
     *   each with an id property representing ManagedObjects
     */
    return ActionLibrary.Action.extend({
        run: function(callbackObject, data) {
            // Create new lifecycle
            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);
            // Notify calling app that Action is starting
            lifecycle.onReady({
                message: app_actions.get('networkexplorer-remove-from-this-collection.launchingAction')
            });

            // Provide Use Case feedback
            var useCasePromiseCallbacks = {};
            var useCasePromise = new Promise(function(resolve, reject) {
                useCasePromiseCallbacks.resolve = resolve;
                useCasePromiseCallbacks.reject = reject;
            });

            // Defer execution
            new Promise(function(resolve, reject) {
                if (!(data && data.length && data.length > 0)) {
                    reject({message: 'No Collection selected'});
                    return;
                }
                if (data && data.length && data.length > 1) {
                    reject({message: 'Multiple selection of Collections is not supported'});
                    return;
                }
                var selectedCollection = data[0];
                if (typeof selectedCollection.id !== 'string' || isNaN(selectedCollection.id)) {
                    reject({message: 'A valid identifier was not found for the selected Collection'});
                    return;
                }
                var managedObjectList = selectedCollection.objects;
                if (!(managedObjectList && managedObjectList.length > 0 && !managedObjectList.every(function(obj) { return typeof obj.id !== 'string'; }))) {
                    reject({message: 'A valid identifier was not found for each item in the selected Collection\'s contents'});
                    return;
                }
                Container.getEventBus().publish('container:loader');
                var objectCount = managedObjectList.length;
                var selectedObjectIds = managedObjectList.map(function(obj) {
                    return obj.id;
                });
                ObjectConfigurationApi.removeObjects({
                    collection: {
                        id: selectedCollection.id
                    },
                    objects: selectedObjectIds,
                    onSuccess: function() {
                        new Notification({
                            showAsGlobalToast: true,
                            icon: 'tick',
                            color: 'green',
                            label: app_actions.get('networkexplorer-remove-from-this-collection.objectsRemoved').replace('$1', objectCount)
                        }).attachTo(core.Element.wrap(document.body));
                        Container.getEventBus().publish('container:loader-hide');
                        useCasePromiseCallbacks.resolve();
                    },
                    onFailure: function(msg, xhr) {
                        Container.getEventBus().publish('container:loader-hide');
                        var errorObject = new ErrorHandler().getErrorMessage(xhr);
                        if (errorObject.internalErrorCode === 10007) {
                            errorObject.userMessage.body = strings.get('editCollectionErrorBody');
                        }
                        var dialog = new Dialog({
                            header: errorObject.userMessage.title,
                            content: errorObject.userMessage.body,
                            type: 'error',
                            buttons: [{
                                caption: keywords.get('ok'),
                                action: function() {
                                    dialog.destroy();
                                },
                                color: 'darkBlue'
                            }]
                        });
                        dialog.show();
                        useCasePromiseCallbacks.reject();
                    }
                });
                // The Action's job is done
                resolve();
            }.bind(this)).then(function() {
                // Finish successfully
                var actionResult = new ActionLibrary.ActionResult({
                    success: true,
                    afterUseCase: useCasePromise
                });
                lifecycle.onComplete(actionResult);
            }).catch(function(error) {
                // Catch all errors
                var actionResult = new ActionLibrary.ActionResult({
                    success: false,
                    message: error.message || 'Unhandled error occurred'
                });
                lifecycle.onFail(actionResult);
            });
            // Return lifecycle immediately
            return lifecycle;
        }
    });
});
