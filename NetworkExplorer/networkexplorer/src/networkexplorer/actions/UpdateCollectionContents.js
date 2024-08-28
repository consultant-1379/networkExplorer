define([
    'jscore/core',
    'jscore/ext/net',
    'container/api',
    'actionlibrary/ActionLibrary',
    'widgets/Notification',
    'widgets/Dialog',
    'networkexplorerlib/ObjectConfigurationApi',
    'i18n!networkexplorer/app_actions.json',
    'i18n!networkexplorer/keywords.json'
], function (core, net, Container, ActionLibrary, Notification, Dialog, ObjectConfigurationApi, strings, keywords) {

    'use strict';

    /**
     * UpdateCollectionContents
     * ===
     * id: networkexplorer-update-collection-contents
     *
     * This action updates the content of a search criteria based collection
     * by executing search criteria present in the collection.
     *
     * Expected parameters:
     * # List with single Collection object
     *
     * Expected contents
     * * id, type, query
     *
     */
    return ActionLibrary.Action.extend({

        run: function (callbackObject, data) {

            // Create new lifecycle
            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Provide Use Case feedback
            var useCasePromiseCallbacks = {};
            var useCasePromise = new Promise(function (resolve, reject) {
                useCasePromiseCallbacks.resolve = resolve;
                useCasePromiseCallbacks.reject = reject;
            });

            // Defer execution
            new Promise(function (resolve, reject) {
                if (data && data.length === 0) {
                    reject({message: 'No object selected'});
                    return;
                }
                if (data && data.length > 1) {
                    reject({message: 'Multiple selection is not supported'});
                    return;
                }
                if (data && typeof data[0].id !== 'string') {
                    reject({message: 'A valid identifier was not found for the selected object'});
                    return;
                }
                if (data && typeof data[0].query !== 'string') {
                    reject({message: 'A valid search criteria was not found for the selected object'});
                    return;
                }
                if (data && typeof data[0].type !== 'string') {
                    reject({message: 'A valid type attribute was not found for the selected object'});
                    return;
                }

                performUpdate(data[0].id, data[0].query, checkType(data[0].parentId));

                // The Action's job is done
                resolve();

                // Attempt to perform an update collection operation
                function performUpdate(collectionId, searchQuery, type) {
                    Container.getEventBus().publish('container:loader');
                    var url = '/managedObjects/query?searchQuery=' + searchQuery + '&fullMo=false&orderBy=moName';
                    new Promise(function (resolve, reject) {
                        //execute the query and get MOs
                        net.ajax({
                            url: url,
                            type: 'GET',
                            contentType: 'application/json',
                            dataType: 'json',
                            success: resolve,
                            error: function (msg, xhr) {
                                reject({msg: msg, xhr: xhr});
                            }
                        });
                    }).then(function (data) {
                        if (!isValidCollectionSize(data.poList, type)) {
                            handleUpdateFailure(strings.get('networkexplorer-update-collection-contents.collectionSizeExceeded'), strings.get('accessDenied'));
                        } else if (data.poList.length === 0) {
                            handleEmptyData(collectionId, type);
                        } else {
                            updateCollectionContents(collectionId, data.poList, type);
                        }
                    }).catch(function (error) {
                        handleUpdateFailure(getMessage(error.xhr));
                    }).then(function () {
                        Container.getEventBus().publish('container:loader-hide');
                    });
                }

                function updateCollectionContents(collectionId, poList, type) {
                    //endpoint expects list of objects with id property, where id is managed object id.
                    ObjectConfigurationApi.updateCollectionV4({
                        collectionData: {contents: poList, id: collectionId},
                        onSuccess: handleUpdateSuccess,
                        onFailure: function(){
                            updateCollectionContentsFallback(collectionId, poList, type);
                        }
                    });
                }

                function updateCollectionContentsFallback(collectionId, poList, type) {
                    //endpoint expects list of objects with id property, where id is managed object id.
                    var url = type === 'NESTED' ? '/object-configuration/custom-topology/v2'
                        : '/object-configuration/collections/v3';

                    net.ajax({
                        url: url + '/' + collectionId,
                        type: 'PUT',
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify({objects: poList.map(function (id) { return {id: id};})}),
                        success: handleUpdateSuccess,
                        error: function (msg, xhr) {
                            handleUpdateFailure(getMessage(xhr));
                        }
                    });
                }

                function checkType(parentId) {
                    if  (parentId !== null && parentId !== undefined){
                        return 'NESTED';
                    } else {
                        return 'STANDARD';
                    }
                }

                function isValidCollectionSize(poList, type) {
                    if (type === 'NESTED' && poList.length > 2000) {
                        return false;
                    }
                    return !(type === 'STANDARD' && poList.length > 25000);
                }

                function handleUpdateSuccess() {
                    var notification = new Notification({
                        showAsGlobalToast: true,
                        icon: 'tick',
                        color: 'green',
                        label: strings.get('networkexplorer-update-collection-contents.collectionUpdated')
                    });
                    notification.attachTo(core.Element.wrap(document.body));
                    useCasePromiseCallbacks.resolve({ action: 'networkexplorer-update-collection-contents'});
                }

                //Show confirmation dialog when query returns empty poList
                function handleEmptyData(collectionId, type) {
                    var dialog = new Dialog({
                        header: strings.get('networkexplorer-update-collection-contents.confirmSizeEmpty'),
                        content: strings.get('networkexplorer-update-collection-contents.noResultsMessage'),
                        type: 'warning',
                        buttons: [{
                            caption: strings.get('networkexplorer-update-collection-contents.updateContents'),
                            action: function () {
                                dialog.destroy();
                                updateCollectionContents(collectionId, [], type);
                            },
                            color: 'darkBlue'
                        }, {
                            caption: strings.get('networkexplorer-update-collection-contents.keepContents'),
                            action: function () {
                                dialog.destroy();
                                useCasePromiseCallbacks.reject();
                            },
                            color: 'white'
                        }]
                    });
                    dialog.show();
                }

                function getMessage(xhr) {
                    return xhr && xhr.getStatus() === 403 ?
                        strings.get('networkexplorer-update-collection-contents.unauthorizedAccessErrorMessage') :
                        strings.get('networkexplorer-update-collection-contents.internalServerErrorMessage');
                }

                function handleUpdateFailure(message, headerMessage) {
                    var dialog = new Dialog({
                        header: headerMessage? headerMessage: strings.get('networkexplorer-update-collection-contents.unableToUpdateContents'),
                        content: message,
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
            }.bind(this)).then(function () {
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
