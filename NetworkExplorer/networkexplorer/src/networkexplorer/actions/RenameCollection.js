define([
    'jscore/core',
    'container/api',
    'actionlibrary/ActionLibrary',
    'networkexplorerlib/regions/CollectionRenamer',
    'widgets/Notification',
    'i18n!networkexplorer/app_actions.json'
], function(core, Container, ActionLibrary, CollectionRenamer, Notification, appActionsStrings) {

    'use strict';

    /**
     * RenameCollection
     * ===
     * id: networkexplorer-rename-collection
     *
     * This action allows BRANCH (excluding ROOT), LEAF or Standard Collections to be renamed.
     *
     * Expected parameters:
     * # Array containing a single Collection object
     *
     * Expected contents:
     * * id - id of the Collection
     * * subType - BRANCH for branch Collections or LEAF for LEAF Collections or standard Collections
     * * level - BRANCH and LEAF Collections have a level while standard Collections do not
     * * parentId - BRANCH and LEAF Collections have a parentId while standard Collections do not
     */
    return ActionLibrary.Action.extend({

        run: function(callbackObject, data) {

            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({ message: appActionsStrings.get('networkexplorer-rename-collection.launchingAction') });

            // Provide Use Case feedback
            var useCasePromiseWaiting = false, useCasePromiseCallbacks = {};
            var useCasePromise = new Promise(function(resolve, reject) {
                useCasePromiseCallbacks.resolve = resolve;
                useCasePromiseCallbacks.reject = reject;
                useCasePromiseWaiting = true;
            });

            new Promise(function(resolve, reject) {

                if (!(data && data.length && data.length === 1)) {
                    reject({ message: 'Action supports single-selection only.' });
                    return;
                }

                var collection = data[0];

                if (collection.subType === 'BRANCH' && ((collection.level === 0 || !collection.level) && !collection.parentId)) {
                    reject({ message: 'Action does not support ROOT Collections.' });
                    return;
                }

                // Communication channel for the CollectionRenamer Region
                var collectionRenamer, renameCollectionEventBus = new core.EventBus();
                renameCollectionEventBus.subscribe('collectionrenamer:done', function(options) {
                    collectionRenamer.stop();
                    Container.getEventBus().publish('flyout:hide');

                    if (useCasePromiseWaiting) {
                        // Use case is complete. Provide feedback
                        if (options.success === true) {
                            useCasePromiseCallbacks.resolve();
                        } else {
                            useCasePromiseCallbacks.reject();
                        }
                    }
                }.bind(this));

                // Shared Context for Action instance
                var RenameCollectionContext = core.AppContext.extend({
                    eventBus: renameCollectionEventBus
                });

                collectionRenamer = new CollectionRenamer({
                    context: new RenameCollectionContext(),
                    id: collection.id,
                    isNestedCollection: (collection.type && collection.parentId) !== undefined
                });

                Container.getEventBus().publish('flyout:show', {
                    header: appActionsStrings.get('networkexplorer-rename-collection.label'),
                    content: collectionRenamer
                });

                // Action's job is done
                resolve();

            }).then(function() {
                lifecycle.onComplete(new ActionLibrary.ActionResult({ success: true, afterUseCase: useCasePromise }));
            }).catch(function(reason) {
                lifecycle.onFail(new ActionLibrary.ActionResult({ success: false, message: reason.message }));
            });
            return lifecycle;
        }
    });
});
