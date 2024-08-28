define([
    'jscore/core',
    'jscore/ext/net',
    'container/api',
    'actionlibrary/ActionLibrary',
    'widgets/Notification',
    'widgets/Dialog',
    'networkexplorerlib/regions/SearchCriteriaSelector',
    'networkexplorerlib/widgets/ActionPanel',
    'networkexplorerlib/classes/SearchCriteriaCollectionService',
    'i18n!networkexplorer/app_actions.json',
    'i18n!networkexplorer/keywords.json'
], function (core, net, Container, ActionLibrary, Notification, Dialog, SearchCriteriaSelector,
             ActionPanel, SearchCriteriaCollectionService, strings, keywords) {

    'use strict';

    /**
     * EditSearchCriteriaCollection
     * ===
     * id: networkexplorer-edit-search-criteria-collection
     *
     * This action launches a flyout panel allowing user to select search criteria from the list of Saved Searches.
     *
     * Expected parameters:
     * # Array of objects
     *
     * Expected contents
     * * {String} id - the collection id
     * * {String} type - of the collection NESTED or STANDARD
     * * {String} query - search criteria which defines the collection
     */
    return ActionLibrary.Action.extend({

        run: function (callbackObject, data) {

            // Create new lifecycle
            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({
                message: strings.get('networkexplorer-edit-search-criteria-collection.launchingAction')
            });

            // Provide Use Case feedback
            var useCasePromiseCallbacks = {};
            var useCasePromise = new Promise(function (resolve, reject) {
                useCasePromiseCallbacks.resolve = resolve;
                useCasePromiseCallbacks.reject = reject;
            });

            // Defer execution
            new Promise(function (resolve, reject) {
                if (!data) {
                    reject({message: 'Valid data is is not provided'});
                    return;
                }
                if (data.length === 0) {
                    reject({message: 'No object selected'});
                    return;
                }
                if (data.length > 1) {
                    reject({message: 'Multiple selection is not supported'});
                    return;
                }
                var collection = data[0];
                if (typeof collection.id !== 'string') {
                    reject({message: 'A valid identifier was not found for the selected object'});
                    return;
                }
                if (typeof collection.query !== 'string') {
                    reject({message: 'A valid search criteria was not found for the selected object'});
                    return;
                }
                if (typeof collection.type !== 'string') {
                    reject({message: 'A valid type attribute was not found for the selected object'});
                    return;
                }

                var editEventBus = new core.EventBus(),

                    // Shared Context for Action instance
                    EditSearchCriteriaContext = core.AppContext.extend({
                        eventBus: editEventBus
                    }),

                    editActionContext = new EditSearchCriteriaContext(),

                    searchCriteriaCollectionService = new SearchCriteriaCollectionService({
                        onError: handleUpdateFailure,
                        onSuccess: handleUpdateSuccess,
                        isNestedCollection: collection.type === 'NESTED',
                        parentId: collection.parentId
                    }),

                    searchCriteriaSelector = new SearchCriteriaSelector({
                        context: editActionContext,
                        searchCriteria: collection.query
                    }),

                    actionPanel = new ActionPanel({
                        content: searchCriteriaSelector,
                        onSubmit: onSubmit,
                        onCancel: onCancel
                    });

                // Display flyout with ActionPanel
                Container.getEventBus().publish('flyout:show', {
                    header: strings.get('networkexplorer-edit-search-criteria-collection.flyoutLabel'),
                    content: actionPanel,
                    width: '420px'
                });

                searchCriteriaSelector.setVisibility(true);

                // The Action's job is done
                resolve();

                function onSubmit() {
                    if (searchCriteriaSelector.getQuery()) {
                        actionPanel.clearInlineError();
                        searchCriteriaCollectionService.update({
                            id: collection.id,
                            query: searchCriteriaSelector.getQuery()
                        });
                    } else {
                        actionPanel.setInlineErrorMessage(strings.get('networkexplorer-edit-search-criteria-collection.errors.selectSearchCriteria'));
                    }
                }

                function onCancel() {
                    Container.getEventBus().publish('flyout:hide');
                    useCasePromiseCallbacks.reject();
                }

                function handleUpdateSuccess(data) {
                    var notification = new Notification({
                        showAsGlobalToast: true,
                        icon: 'tick',
                        color: 'green',
                        label: strings.get('networkexplorer-edit-search-criteria-collection.collectionUpdated')
                    });
                    notification.attachTo(core.Element.wrap(document.body));
                    Container.getEventBus().publish('flyout:hide');
                    useCasePromiseCallbacks.resolve({
                        data: data,
                        action: 'networkexplorer-edit-search-criteria-collection'
                    });
                }

                function handleUpdateFailure(header, content) {
                    Container.getEventBus().publish('container:loader-hide');
                    var dialog = new Dialog({
                        header: header,
                        content: content,
                        type: 'error',
                        buttons: [{
                            caption: keywords.get('ok'),
                            action: function () {
                                useCasePromiseCallbacks.reject();
                                dialog.destroy();
                            },
                            color: 'darkBlue'
                        }]
                    });
                    dialog.show();
                }
            }.bind(this))
                .then(function () {
                    // Finish successfully
                    var actionResult = new ActionLibrary.ActionResult({
                        success: true,
                        afterUseCase: useCasePromise
                    });
                    lifecycle.onComplete(actionResult);
                }).catch(function (error) {
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
