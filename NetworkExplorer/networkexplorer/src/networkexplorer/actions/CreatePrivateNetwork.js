define([
    'jscore/core',
    'container/api',
    'actionlibrary/ActionLibrary',
    'networkexplorerlib/regions/CollectionCreator',
    'widgets/Notification',
    'i18n!networkexplorer/app_actions.json'
], function(core, Container, ActionLibrary, CollectionCreator, Notification, strings) {

    'use strict';

    /**
     * CreatePrivateNetwork
     * ===
     * id: networkexplorer-create-private-network
     *
     * This action launches a flyout panel allowing user to create a Private Network.
     *
     * This action provides feedback from the use case.
     *
     * Expected parameters:
     * * An array with exactly one object
     *
     * Expected contents of parameters
     * * If not empty, the first object must be a valid string representing the id of a ROOT or BRANCH Collection.
     */
    return ActionLibrary.Action.extend({

        run: function(callbackObject, data) {

            // Create new lifecycle
            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({
                message: strings.get('networkexplorer-create-private-network.launchingAction')
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
                    reject({message: 'Multiple selection is not supported'});
                    return;
                }
                if (!data[0].id && !data[0].isCustomTopology) {
                    reject({message: 'A valid id property was not found for a custom topology to be managed'});
                    return;
                }

                // Communication channel for the CollectionCreator Region
                var collectionCreator, collectionCreatorEventBus = new core.EventBus();
                collectionCreatorEventBus.subscribe('collectioncreator:done', function(options) {
                    collectionCreator.stop();
                    Container.getEventBus().publish('flyout:hide');
                    // Use case is complete. Provide feedback
                    if (options.success === true) {
                        useCasePromiseCallbacks.resolve(options.collection);
                    } else {
                        useCasePromiseCallbacks.reject();
                    }
                });

                // Shared Context owned by Action instance
                var CollectionCreatorContext = core.AppContext.extend({
                    eventBus: collectionCreatorEventBus
                });

                var headerText = 'label';
                var parentObject = data[0];

                // Initialize the CollectionCreator Region
                collectionCreator = new CollectionCreator({
                    context: new CollectionCreatorContext(),
                    parent: parentObject,
                    isPrivateNetwork: true
                });

                // Display the flyout with CollectionCreator
                Container.getEventBus().publish('flyout:show', {
                    header: strings.get('networkexplorer-create-private-network.' + headerText),
                    content: collectionCreator
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
