define([
    'jscore/core',
    'container/api',
    'widgets/Notification',
    'widgets/Dialog',
    'actionlibrary/ActionLibrary',
    'networkexplorerlib/ObjectConfigurationApi',
    'networkexplorerlib/widgets/FailureFeedback',
    'networkexplorerlib/ErrorHandler',
    'i18n!networkexplorer/app.json',
    'i18n!networkexplorer/app_actions.json',
    'i18n!networkexplorerlib/collectionerrorhandler.json',
    'i18n!networkexplorerlib/keywords.json'
], function (core, Container, Notification, Dialog, ActionLibrary, ObjectConfigurationApi, FailureFeedback, ErrorHandler, appStrings, appActionsStrings, collectionErrorHandlerStrings, keywords) {

    'use strict';

    /**
     * RemoveLeafCollection
     * ===
     * id: networkexplorer-remove-leaf-collection
     *
     * This action allows LEAF Collections to be removed from parent.
     *
     * Expected parameters:
     * # Array containing one or more LEAF Collection objects
     *
     * Expected contents:
     * * id - id of the leaf collection to be removed
     * * subType - LEAF is the only value expected
     * * parentId - the id of the parent collection from which the LEAF Collection will be removed
     */
    return ActionLibrary.Action.extend({

        run: function (callbackObject, data) {

            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({ message: appActionsStrings.get('networkexplorer-remove-leaf-collection.launchingAction') });

            // Provide Use Case feedback
            var useCasePromiseCallbacks = {};
            var useCasePromise = new Promise(function (resolve, reject) {
                useCasePromiseCallbacks.resolve = resolve;
                useCasePromiseCallbacks.reject = reject;
            });

            new Promise(function (resolve, reject) {
                if (data.length === 0){
                    reject({ message: 'No Collection selected' });
                    return;
                }
                if (!data.every(function (collection) {return collectionContainsObject(collection);})) {
                    reject({message: 'Action supports Leaf and search criteria collections only.'});
                    return;
                }
                var collectionOrCollections = data.length > 1 ? appStrings.get('collections') : appStrings.get('collection');
                var confirmationDialog = new Dialog({
                    header: appActionsStrings.get('networkexplorer-remove-leaf-collection.confirmHeader').replace('$1', collectionOrCollections),
                    content: appActionsStrings.get('networkexplorer-remove-leaf-collection.confirmContent').replace('$1', collectionOrCollections),
                    optionalContent: appActionsStrings.get('networkexplorer-remove-leaf-collection.sureToRemove'),
                    buttons: [{
                        caption: appActionsStrings.get('networkexplorer-remove-leaf-collection.confirmButton'),
                        action: function () {
                            confirmationDialog.destroy();
                            removeCollections(data);
                        }
                    }, {
                        caption: appStrings.get('cancel'),
                        action: function () {
                            confirmationDialog.destroy();
                        }
                    }]
                });
                confirmationDialog.show();

                resolve();
                // Action's job is done
            }).then(function () {
                lifecycle.onComplete(new ActionLibrary.ActionResult({ success: true, afterUseCase: useCasePromise }));
            }).catch(function (reason) {
                lifecycle.onFail(new ActionLibrary.ActionResult({ success: false, message: reason.message }));
            });

            function removeCollections(data) {
                new Promise(function (resolve, reject) {
                    var failures = [];
                    Container.getEventBus().publish('container:loader');
                    var successCount = 0;

                    data.forEach(function (collection){
                        if(collection.parentId){
                            ObjectConfigurationApi.removeCollectionFromParent({
                                id: collection.id,
                                parentId: collection.parentId,
                                onSuccess: success,
                                onFailure: function (msg, xhr) {
                                    var errorObject = new ErrorHandler().getErrorMessage(xhr);
                                    var errorMsg = collectionErrorHandlerStrings.get('internalErrorCodesMapper')[errorObject.internalErrorCode.toString()];
                                    failure(collection.name, errorMsg);
                                }
                            });
                        } else {
                            failure(collection.name, appStrings.get('noParent'));
                        }
                    });

                    function success() {
                        successCount++;
                        checkLastToRemove();
                    }

                    function failure(collectionName, errorMsg) {
                        failures.push(
                            {
                                name: collectionName,
                                reason: errorMsg
                            });
                        checkLastToRemove();
                    }

                    function checkLastToRemove() {
                        if ((successCount + failures.length) === data.length) {
                            resolve({
                                total: data.length,
                                successCount: successCount,
                                failures: failures
                            });
                        }
                    }
                }).then(function (CollectionsRemovedDetails) {
                    Container.getEventBus().publish('container:loader-hide');
                    if (CollectionsRemovedDetails.failures.length === 0) {
                        showSuccessToast(CollectionsRemovedDetails.successCount);
                    } else {
                        showPartialSuccessDialog(CollectionsRemovedDetails.failures, CollectionsRemovedDetails.successCount);
                    }
                    useCasePromiseCallbacks.resolve();
                });

                function showSuccessToast(successCount) {
                    var notification = new Notification({
                        showAsGlobalToast: true,
                        icon: 'tick',
                        color: 'green',
                        showCloseButton: true,
                        label: appActionsStrings.get('networkexplorer-remove-leaf-collection.collectionsRemoved').replace('$1', successCount)
                    });
                    notification.attachTo(core.Element.wrap(document.body));
                }

                function showPartialSuccessDialog(failures, successCount) {
                    var feedbackDialog = new Dialog({
                        header: appActionsStrings.get('networkexplorer-remove-leaf-collection.unableToRemoveHeader'),
                        content: appActionsStrings.get('networkexplorer-remove-leaf-collection.unableToRemoveContent'),
                        optionalContent: getFailureFeedback(failures, successCount),
                        type: 'error',
                        buttons: [{
                            caption: appStrings.get('ok'),
                            action: function () {
                                feedbackDialog.hide();
                            },
                            color: 'darkBlue'
                        }],
                        visible: true,
                        closable: false
                    });
                }

                function getFailureFeedback (failures, successCount) {
                    return new FailureFeedback({
                        succeeded: successCount,
                        failed: failures.length,
                        showExport: false,
                        columns: [
                            {title: appActionsStrings.get('networkexplorer-remove-leaf-collection.nameColumnHeader'), attribute: 'name', resizable: true},
                            {title: keywords.get('reason'), attribute: 'reason', resizable: true}
                        ],
                        data: failures
                    });
                }
            }
            return lifecycle;
        }
    });

    /**
     * Returns true if the collection contains object.
     *
     * @param collection object
     * @returns {boolean}
     */
    function collectionContainsObject(collection) {
        return (collection.subType === 'LEAF' || collection.subType === 'SEARCH_CRITERIA');
    }
});
