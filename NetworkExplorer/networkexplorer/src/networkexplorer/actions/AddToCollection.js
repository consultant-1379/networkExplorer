define([
    'jscore/core',
    'container/api',
    'actionlibrary/ActionLibrary',
    'networkexplorerlib/CollectionHandler',
    'widgets/Notification',
    'i18n!networkexplorer/app_actions.json'
], function(core, Container, ActionLibrary, CollectionHandler, Notification, strings) {

    'use strict';

    /**
     * AddToCollection
     * ===
     * id: networkexplorer-add-to-collection
     *
     * This action launches a flyout panel allowing user to add network objects to a new or existing collection.
     *
     * Expected parameters:
     * # Array of objects
     *
     * Expected contents
     * * If not empty, the first object must have an id property whose value is a valid string representing a
     *   persistent object id
     */
    return ActionLibrary.Action.extend({

        run: function(callbackObject, data) {

            // Create new lifecycle
            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({
                message: strings.get('networkexplorer-add-to-collection.launchingAction')
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
                    reject({message: 'No object selected'});
                    return;
                }

                var id;
                if (data[0].id) {
                    id = 'id';
                } else if (data[0].poId) {
                    id = 'poId';
                } else if (data[0].poid) {
                    id = 'poid';
                } else {
                    reject({message: 'A valid id property was not found in the first selected object'});
                    return;
                }

                // Communication channel for CollectionHandler Region
                var collectionHandler, collectionHandlerEventBus = new core.EventBus();
                collectionHandlerEventBus.subscribe('CollectionHandler:operationDone', function() {
                    collectionHandler.stop();
                    Container.getEventBus().publish('flyout:hide');
                    Container.getEventBus().publish('action:networkexplorer-add-to-collection:created');
                }.bind(this));
                collectionHandlerEventBus.subscribe('CollectionHandler:showToast', function(options) {
                    options.autoDismiss = true;
                    var notification = new Notification(options);
                    notification.attachTo(core.Element.wrap(document.body));
                    useCasePromiseCallbacks.resolve({action: 'networkexplorer-add-to-collection'});
                });

                // Shared Context for Action instance
                var AddToCollectionContext = core.AppContext.extend({
                    eventBus: collectionHandlerEventBus
                });

                // Initialize CollectionHandler Region
                collectionHandler = new CollectionHandler({
                    context: new AddToCollectionContext(),
                    data: data.map(function(obj) {
                        return obj[id];
                    })
                });

                // Display flyout with CollectionHandler
                Container.getEventBus().publish('flyout:show', {
                    header: strings.get('networkexplorer-add-to-collection.label'),
                    content: collectionHandler,
                    width: '420px'
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
