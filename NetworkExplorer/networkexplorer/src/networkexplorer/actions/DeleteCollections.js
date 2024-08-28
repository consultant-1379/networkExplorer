define([
    'jscore/core',
    'jscore/ext/utils/base/underscore',
    'container/api',
    'jscore/ext/net',
    'widgets/Dialog',
    'widgets/Loader',
    'actionlibrary/ActionLibrary',
    'networkexplorerlib/ObjectConfigurationApi',
    'networkexplorerlib/classes/ArrayUtils',
    'i18n!networkexplorer/app.json',
    'i18n!networkexplorer/app_actions.json',
    'i18n!networkexplorerlib/keywords.json',
    'networkexplorerlib/utils/Format',
    'networkexplorerlib/widgets/FailureFeedback',
    "networkexplorerlib/ErrorHandler"
], function(core, _, Container, net, Dialog, Loader, ActionLibrary, ObjectConfigurationApi, ArrayUtils, appStrings,
            appActionsStrings, keywords, Format, FailureFeedback, ErrorHandler) {

    'use strict';

    /**
     * DeleteCollections
     * ===
     * id: networkexplorer-delete-collections
     *
     * This action allows BRANCH (excluding ROOT), LEAF or Standard Collections to be deleted.
     * BRANCH Collections must not have children in order to delete it.
     *
     * Expected parameters:
     * # Array containing one or more Collection objects
     *
     * Expected contents:
     * * id - id of the Collection
     * * subType - BRANCH for branch Collections or LEAF for LEAF Collections or standard Collections
     * * level - BRANCH and LEAF Collections have a level while standard Collections do not
     * * parentId - BRANCH or LEAF Collections have a parentId while standard Collections do not
     * * name - name of the Collection
     */
    return ActionLibrary.Action.extend({

        DELETE_BATCH_SIZE: 50,

        run: function(callbackObject, data, metadata) {
            var dialog, xhr, errorHandler, collectionIds, secondaryDeleteCallId, firstCollection,
                deleteResult = {},
                batches = [],
                errorCount=0,
                RESTEASY_CODES = [
                    'RESTEASY001545',
                    'RESTEASY001185'
                ];
            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({ message: 'Launching Delete Collection...'});

            // Checking if the application requester is NetEx Collections
            var appRequester;
            if (metadata) {
                if (metadata.length > 0 && metadata[0].name === 'appRequester') {
                    appRequester = metadata[0].value;
                }
            }

            // Provide Use Case feedback
            var useCasePromiseWaiting = false, useCasePromiseCallbacks = {};
            var useCasePromise = new Promise(function(resolve, reject) {
                useCasePromiseCallbacks.resolve = resolve;
                useCasePromiseCallbacks.reject = reject;
                useCasePromiseWaiting = true;
            });

            new Promise(function(resolve, reject) {
                if (!(Array.isArray(data) && data.length > 0)) {
                    reject({ message: 'Action supports single and multi selection only.'});
                    return;
                }

                var roots = ArrayUtils.filterByKeyValue(data, 'level', 0);
                roots = ArrayUtils.filterByKeyValue(roots, 'parentId', null);
                var collections = _.sortBy(data, 'level');

                if (roots.length > 0) {
                    reject({ message: 'Action does not support ROOT Collections.'});
                    return;
                }

                if (xhr) {
                    xhr.abort();
                }

                deleteResult = Format.toMap(collections);
                batches  = ArrayUtils.chunk(Format.toIds(collections), this.DELETE_BATCH_SIZE);

                firstCollection = collections[0];
                errorHandler = new ErrorHandler();

                dialog = showDeleteConfirmation(collections.length);

                resolve();

            }.bind(this)).then(function() {
                lifecycle.onComplete(new ActionLibrary.ActionResult({ success: true, afterUseCase: useCasePromise }));
            }).catch(function(reason) {
                lifecycle.onFail(new ActionLibrary.ActionResult({ success: false, message: reason.message }));
            });


            function showDeleteConfirmation(collectionSize) {
                var objectLabel = collectionSize > 1 ? keywords.get('collections'): keywords.get('collection');
                return new Dialog({
                    header: appActionsStrings.get('networkexplorer-delete-collections.deleteTitle').replace('$1', objectLabel),
                    content: appActionsStrings.get('networkexplorer-delete-collections.deleteMessage').replace('$1', objectLabel),
                    optionalContent: appActionsStrings.get('networkexplorer-delete-collections.sureToDelete'),
                    buttons: [{
                        caption: keywords.get('delete'),
                        action: disableButtonsAndDelete
                    }, {
                        caption: keywords.get('cancel'),
                        action: onCanceled
                    }],
                    type: 'warning',
                    visible: true
                });
            }

            function disableButtonsAndDelete() {
                dialog.getButtons()[0].disable();
                dialog.getButtons()[1].disable();
                Container.getEventBus().publish('container:loader');
                deleteNextBatch();
            }

            function deleteNextBatch() {
                if (batches.length > 0) {
                    collectionIds = batches.shift();
                    var requestOptions = {
                        collectionIds: collectionIds ,
                        onSuccess: onSuccess,
                        onFailure: deleteSelectedErrorV4
                    };
                    xhr = ObjectConfigurationApi.deleteCollectionsV4(requestOptions);
                } else {
                    onFinished();
                }
            }

            function onSuccess(response) {
                var dataReceived =  response ? JSON.parse(response) : [];
                var results = Array.isArray(dataReceived) ? dataReceived : [];

                results.forEach(function(result) {
                    updateResults(result.id, result);
                });

                deleteNextBatch();
            }

            function deleteSelectedErrorV4() {
                var errorCodes = [400, 429, 500];

                if (errorCodes.indexOf(xhr.getStatus()) > -1) {
                    var requestOptions = {
                        collectionIds: collectionIds,
                        onSuccess: onSuccess,
                        onFailure: deleteSelectedError
                    };
                    xhr = ObjectConfigurationApi.deleteCollections(requestOptions);
                } else {
                    var error = getErrorDetails();
                    //else continue for next batch
                    collectionIds.forEach(function(id) {
                        updateResults(id, error);
                    });
                    deleteNextBatch();
                }
            }

            function deleteSelectedError() {
                var error = getErrorDetails();

                if (errorHandler.isRestEasyCodeExistInError(xhr, RESTEASY_CODES)) {
                    //Go for V1 call
                    tryFallback();
                } else {
                    //else continue for next batch
                    collectionIds.forEach(function(id) {
                        updateResults(id, error);
                    });
                    deleteNextBatch();
                }
            }

            function tryFallback() {
                if (collectionIds.length === 1) {
                    secondaryDeleteCallId = collectionIds[0];
                    var collection = firstCollection;

                    if (collection.type === 'BRANCH') {
                        ObjectConfigurationApi.fetchCustomTopologies({
                            id: collection.id,
                            onSuccess: function(children, xhr) {
                                if (children && children.length === 0) {
                                    fallbackDelete(collection);
                                } else {
                                    var error = {
                                        result: keywords.get('failed'),
                                        body: appActionsStrings.get('networkexplorer-delete-collections.unableToDeleteReferencedCollection'),
                                        errorCode: 0,
                                        title: appActionsStrings.get('networkexplorer-delete-collections.titleunableToDeleteCollection')
                                    };
                                    updateResults(secondaryDeleteCallId, error);
                                    onFinished();
                                }
                            },
                            onFailure: function() {
                                var error = {
                                    result: keywords.get('failed'),
                                    body: appActionsStrings.get('networkexplorer-delete-collections.unableToCheckReferencedCollection'),
                                    errorCode: 0,
                                    title: appActionsStrings.get('networkexplorer-delete-collections.titleunableToDeleteCollection')
                                };
                                updateResults(secondaryDeleteCallId, error);
                                onFinished();
                            }
                        });
                    } else {
                        fallbackDelete(collection);
                    }
                } else {
                    // show error dialog and exit.
                    showBulkDeleteErrorDialog();
                }
            }

            function showBulkDeleteErrorDialog() {
                Container.getEventBus().publish('container:loader-hide');
                dialog.setHeader(appActionsStrings.get('networkexplorer-delete-collections.unableToDeleteCollection'));
                dialog.setContent(appActionsStrings.get('networkexplorer-delete-collections.bulkDeleteUnavailableBody'));
                dialog.setOptionalContent(appActionsStrings.get('networkexplorer-delete-collections.tryAgainLater'));
                dialog.setButtons([{
                    caption: keywords.get('ok'),
                    action: onCanceled
                }]);
                dialog.setDialogType('error');
            }

            function fallbackDelete(collection) {
                var options = {
                    id: collection.id || collection.poid,
                    onSuccess: function() {
                        onFinished();
                    },
                    onFailure: function() {
                        var error = getErrorDetails();
                        updateResults(secondaryDeleteCallId, error);
                        onFinished();
                    }
                };

                if (collection.type && collection.parentId) {
                    xhr = ObjectConfigurationApi.deleteCustomTopology(options);
                } else {
                    ObjectConfigurationApi.deleteCollection(options);
                }
            }

            function updateResults(id, error) {
                if (error) {
                    deleteResult[id].result = keywords.get('failed');
                    deleteResult[id].body = error.body;
                    deleteResult[id].errorCode = error.internalErrorCode;
                    deleteResult[id].title = error.title;
                    errorCount++;
                } else {
                    deleteResult[id].result = keywords.get('succeeded');
                }
            }

            function onFinished() {
                var result = prepareDataForResult();
                if (!appRequester) {
                    setResultsDialog(result);
                } else if (appRequester && result.failed !== 0) {
                    setResultsDialog(result);
                } else {
                    dialog.destroy();
                    onUseCaseFinished(true, deleteResult);
                    Container.getEventBus().publish('container:loader-hide');
                }
            }

            function setResultsDialog(result) {
                var columns =
                    [
                        {title: keywords.get('collection'), attribute: 'name', resizable: true},
                        {title: keywords.get('result'), attribute: 'result', resizable: true},
                        {title: keywords.get('reason'), attribute: 'reason', resizable: true}
                    ];

                Container.getEventBus().publish('container:loader-hide');
                dialog.setHeader(appActionsStrings.get('networkexplorer-delete-collections.deleteResult'));
                dialog.setContent(new FailureFeedback({
                    data: result.data,
                    succeeded: result.succeeded,
                    failed: result.failed,
                    columns : columns
                }));

                dialog.setOptionalContent();
                dialog.setButtons([{
                    caption: keywords.get('ok'),
                    action: function() {
                        dialog.destroy();
                        onUseCaseFinished(true, deleteResult);
                    }
                }]);
                dialog.setDialogType('default');
            }

            function prepareDataForResult() {
                var dataObject = {
                    data: [],
                    failed: errorCount,
                    succeeded: data.length-errorCount,
                };
                if (typeof deleteResult === 'object') {
                    for (var item in deleteResult) {
                        dataObject.data.push({
                            name: deleteResult[item].name,
                            reason: deleteResult[item].body,
                            result: deleteResult[item].result ? deleteResult[item].result : keywords.get('succeeded')
                        });
                    }
                }

                return dataObject;
            }

            function onCanceled() {
                dialog.destroy();
                onUseCaseFinished(false, []);
            }

            function onUseCaseFinished(success, result) {
                if (useCasePromiseWaiting) {
                    // Use case is complete. Provide feedback
                    if (success === true) {
                        result.action = 'networkexplorer-delete-collections';
                        useCasePromiseCallbacks.resolve(result);
                    } else {
                        useCasePromiseCallbacks.reject();
                    }
                }
            }

            function getErrorDetails() {
                var responseJson = errorHandler.getErrorMessage(xhr);
                return {
                    title: responseJson.userMessage.title,
                    body: responseJson.userMessage.body,
                    internalErrorCode: responseJson.internalErrorCode?responseJson.internalErrorCode:0
                };
            }

            return lifecycle;
        }

    });
});
