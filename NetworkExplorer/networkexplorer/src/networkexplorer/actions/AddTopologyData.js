define([
    'jscore/core',
    'jscore/ext/net',
    'jscore/ext/locationController',
    'container/api',
    'actionlibrary/ActionLibrary',
    'scopingpanel/EmbeddedScopingPanel',
    'networkexplorerlib/ObjectConfigurationApi',
    'networkexplorerlib/CollectionHandler',
    'widgets/Notification',
    'widgets/Dialog',
    'i18n!networkexplorer/app_actions.json',
    'i18n!networkexplorer/keywords.json',
    '../widgets/ConflictingDialog/ConflictingDialog',
    '../widgets/restrictChildObjectDialog/RestrictChildObjectDialog'
], function(core, net, LocationController, Container, ActionLibrary, ScopingPanel, ObjectConfigurationApi,CollectionHandler, Notification, Dialog, strings, keywords, ConflictingCellsDialog,RestrictChildObjectDialog) {

    'use strict';

    /**
     * AddTopologyData
     * ===
     * id: networkexplorer-add-topology-data
     *
     * This action launches a flyout panel allowing user to add network objects to an existing collection.
     *
     * Expected parameters:
     * # Array of objects
     *
     * Expected contents
     * * Exactly one object
     * * If not empty, the first object must have an id property whose value is a valid string representing the id of a
     *   collection that contains ManagedObjects
     */
    return ActionLibrary.Action.extend({

        run: function(callbackObject, data) {

            var COLLECTION_SELECTION_LIMIT = 250;

            // Create new lifecycle
            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({
                message: strings.get('networkexplorer-add-topology-data.launchingAction')
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
                if (data && data.length && data.length > 1) {
                    reject({message: 'Multiple selection is not supported'});
                    return;
                }
                if (data && data.length && data.length === 1 && typeof data[0].id !== 'string') {
                    reject({message: 'A valid identifier was not found for the selected object'});
                    return;
                }

                // Communication channel for ScopingPanel Region
                var scopingPanel, scopingPanelEventBus = new core.EventBus();
                scopingPanelEventBus.subscribe(ScopingPanel.events.SELECT, function(selection) {
                    performUpdate(data[0].id, data[0].type, selection.networkObjects, selection.collections);
                }.bind(this));

                scopingPanelEventBus.subscribe(ScopingPanel.events.CANCEL, function() {
                    scopingPanel.stop();
                    Container.getEventBus().publish('flyout:hide');
                    useCasePromiseCallbacks.reject();
                }.bind(this));

                // Shared Context for Action instance
                var AddTopologyDataContext = core.AppContext.extend({
                    eventBus: scopingPanelEventBus
                });

                // Create location controller for getting application url
                var locationController = new LocationController();

                var tabs = locationController.getLocation().indexOf('topologybrowser') >= 0 ?
                    [ScopingPanel.tabs.TOPOLOGY, ScopingPanel.tabs.SEARCH, ScopingPanel.tabs.COLLECTIONS] : [ScopingPanel.tabs.TOPOLOGY, ScopingPanel.tabs.SEARCH];

                // Initialize ScopingPanel Region
                scopingPanel = new ScopingPanel({
                    context: new AddTopologyDataContext(),
                    tabs: tabs,
                    multiSelectPerTab: {
                        TOPOLOGY: true,
                        SEARCH: true,
                        COLLECTIONS: true
                    },
                    tabsOptions: {collections: {onlyStandardCollections: true}}
                });

                // Display flyout with ScopingPanel
                Container.getEventBus().publish('flyout:show', {
                    header: strings.get('networkexplorer-add-topology-data.label'),
                    content: scopingPanel,
                    width: '420px'
                });

                // The Action's job is done
                resolve();

                // Attempt to perform an update collection operation
                function performUpdate(collectionId, collectionType, moList, collectionList) {
                    var loaderTimeoutId = setTimeout(function() {
                        Container.getEventBus().publish('container:loader');
                    }, 100);
                    var finalCollectionData = null;

                    if (moList && moList.length > 0) {
                        new Promise(function(resolve, reject) {
                            ObjectConfigurationApi.loadCollection({
                                params: {
                                    request: {
                                        id: collectionId
                                    }
                                },
                                dataType: 'json',
                                success: function(data) {
                                    resolve(data);
                                },
                                error: function(msg, xhr) {
                                    reject({msg: msg, xhr: xhr});
                                }
                            });
                        }).then(function(collectionData) {
                            var collectionObjects = collectionData.objects || [];
                            finalCollectionData = collectionObjects.concat(moList.map(function(obj) { return {id: obj}; }));
                            return addRestCall(collectionId, {objects: finalCollectionData}, moList.length);
                        }).catch(function(e) {
                            handleUpdateFailure(e.xhr);
                        }).then(function() {
                            clearTimeout(loaderTimeoutId);
                            Container.getEventBus().publish('container:loader-hide');
                        });
                    } else if (collectionList && collectionList.length > 0) {
                        if (isSelectionWithinLimit(collectionList.length)) {
                            addCollectionRestCall(collectionId, collectionList, '');
                        }
                    }
                }

                function isSelectionWithinLimit(numberOfCollectionsSelected) {
                    if (numberOfCollectionsSelected > COLLECTION_SELECTION_LIMIT) {
                        createAndShowDialog(strings.get('networkexplorer-add-object-collections.reasonNumberOfCollectionsLimit').replace(/\$1/g, COLLECTION_SELECTION_LIMIT));
                        useCasePromiseCallbacks.reject();
                        return false;
                    }
                    return true;
                }

                function createAndShowDialog(content) {
                    var dialog = new Dialog({
                        header: strings.get('networkexplorer-add-object-collections.unableToAdd'),
                        content: content,
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
                }

                function addCollectionRestCall(collectionId, collectionList, queryString) {
                    var loaderTimeoutId = setTimeout(function() {
                        Container.getEventBus().publish('container:loader');
                    }, 100);
                    new Promise(function(resolve, reject) {
                        ObjectConfigurationApi.addCollections({
                            id: collectionId,
                            collectionIds: collectionList,
                            queryString: queryString,
                            onSuccess: function() {
                                resolve();
                            }.bind(this),
                            onFailure: function(msg, xhr) {
                                reject({msg: msg, xhr: xhr});
                            }.bind(this)
                        });
                    }).then(function() {
                        Container.getEventBus().publish('container:loader-hide');
                        handleUpdateSuccess(collectionList.length, 'networkexplorer-add-object-collections.objectsAdded');
                    }).catch(function(e) {
                        clearTimeout(loaderTimeoutId);
                        Container.getEventBus().publish('container:loader-hide');
                        handleUpdateFailure(e.xhr, collectionId, collectionList, true);
                    });
                }

                function addRestCall(collectionId, collectionData, objectCount, messageSuccess) {
                    var loaderTimeoutId = setTimeout(function() {
                        Container.getEventBus().publish('container:loader');
                    }, 100);
                    if (messageSuccess === undefined || messageSuccess ==='') {
                        messageSuccess = 'networkexplorer-add-topology-data.objectsAdded';
                    }
                    new Promise(function(resolve, reject) {
                        var collectionHandler = new CollectionHandler();
                        net.ajax({
                            url: '/object-configuration/v1/collections/' + collectionId,
                            type: 'PUT',
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify(collectionData),
                            success: function(response) {
                                if (response.failed > 0) {
                                    Container.getEventBus().publish('flyout:hide');
                                    collectionHandler.onPartialSuccess(response,collectionData);
                                } else {
                                    resolve(objectCount); //Pass the number of selected objects as 'objectCount'
                                }
                            },
                            error: function(msg, xhr) {
                                reject({msg: msg, xhr: xhr});
                            }
                        });
                    }).then(function(objectCount) {
                        handleUpdateSuccess(objectCount, messageSuccess);
                    }).catch(function(e) {
                        handleUpdateFailure(e.xhr, collectionId, collectionData.objects, false);
                    }).then(function() {
                        clearTimeout(loaderTimeoutId);
                        Container.getEventBus().publish('container:loader-hide');
                    });
                }

         function displayRestrictChildObjectDialog(collectionId, errorMessage, isCollection, collectionData){
                var validObjectIdArray, numberOfNewObjects, validObjectIds;
                var restrictedChildContent = new RestrictChildObjectDialog();

                if (isCollection === false){
                     validObjectIdArray = restrictedChildContent.getFilteredObjectsFromResponse(errorMessage);
                     numberOfNewObjects = restrictedChildContent.numberOfSelectedObjectsInFilteredResponse(errorMessage);
                     validObjectIds = validObjectIdArray.map(function(obj) { return {id: obj}; });
                }

                if(isCollection === false && numberOfNewObjects === 0){
                    restrictedChildContent.displayRestrictedDialogWithoutContinueButton();
                }else{
                     var restrictChildObjectDialog = new Dialog({
                         header: strings.get("networkexplorer-add-topology-data.restrictedObjectDialogHeader"),
                         content:restrictedChildContent,
                         optionalContent:'',
                         type:'error',
                         buttons:[{
                             caption: strings.get("networkexplorer-add-topology-data.continue"),
                             color:"darkBlue",
                             action: function (){
                                restrictChildObjectDialog.destroy();
                                if(numberOfNewObjects > 0 && isCollection === false){
                                    addRestCall(collectionId, {objects: validObjectIds}, numberOfNewObjects);
                                }

                                if(isCollection === true){
                                    addCollectionRestCall(collectionId, collectionData, '?validMOFlag=true');
                                }
                             }},
                         {
                         caption: strings.get("networkexplorer-add-topology-data.cancel"),
                         action: function () {
                             restrictChildObjectDialog.destroy();
                         }
                     }]});
                     restrictedChildContent.showContinueMessage();
                     restrictChildObjectDialog.show();
                }
            }

                // Handle update success
                function handleUpdateSuccess(objectCount, label) {
                    var notification = new Notification({
                        showAsGlobalToast: true,
                        icon: 'tick',
                        color: 'green',
                        label: strings.get(label).replace('$1', objectCount)
                    });
                    notification.attachTo(core.Element.wrap(document.body));
                    scopingPanel.stop();
                    Container.getEventBus().publish('flyout:hide');
                    useCasePromiseCallbacks.resolve({action: 'networkexplorer-add-topology-data'});
                }

                function handleUpdateFailure(xhr, collectionId, objectData, isCollection) {
                    var errorMessage, errorCode = JSON.parse(xhr.getResponseText()).internalErrorCode;
                    if (xhr && xhr.getStatusText() !== 'abort') {
                        try {
                            errorMessage = JSON.parse(xhr.getResponseText());
                            errorMessage = errorMessage.userMessage.body;
                        } catch (e) {
                            errorMessage = strings.get('networkexplorer-add-topology-data.reasonUnreachableServer');
                        }
                    } else {
                        errorMessage = strings.get('networkexplorer-add-topology-data.reasonRequestCancelled');
                    }
                    if (errorCode === 10906) {
                        var idsToUpdate=[], errorString, splitMsg, convertToArr, nodeLength, poids;
                        errorString = errorMessage.split('found');
                        splitMsg = errorString[1].toString().split('in');
                        nodeLength = splitMsg[0].toString().replace('/',' of ').replace('-','');
                        poids = splitMsg[1].toString().split("poIds");
                        if(poids.length>1){
                            convertToArr = JSON.parse(poids[poids.length-2]);
                        }else{
                            convertToArr = JSON.parse(splitMsg[splitMsg.length-1]);
                        }
                        var countArr = nodeLength.replace(' ','').split('of');
                        if (Array.isArray(convertToArr)) {
                            for (var nodeDataCount = 0; nodeDataCount < convertToArr.length; nodeDataCount++) {
                                for (var keyName in convertToArr[nodeDataCount]) {
                                    var nodeData = convertToArr[nodeDataCount][keyName];
                                    for (var nodeCount = 0; nodeCount < nodeData.length; nodeCount++) {
                                        idsToUpdate.push({'location': keyName, 'node': nodeData[nodeCount].toString()});
                                    }
                                }
                            }
                        } else {
                            for (var key in convertToArr) {
                                var nodeName = convertToArr[key];
                                for (var count = 0; count < nodeName.length; count++) {
                                    idsToUpdate.push({'location': key, 'node': nodeName[count].toString()});
                                }
                            }
                        }

                        var partialCellsDialogContent = new ConflictingCellsDialog({
                            ids: idsToUpdate,
                            warningMessage: strings.get("networkexplorer-add-topology-data.pressContinueTo"),
                            node: strings.get("networkexplorer-add-topology-data.nodesAlreadyExist").replace('$1', nodeLength),
                            paraMessage: strings.get("networkexplorer-add-topology-data.viewConflictNodes"),
                            radioButtonsShow: true,
                            tableData: true,
                            nodeCount: nodeLength
                        });
                        var conflictingCellsDialog = new Dialog({
                            header: strings.get("networkexplorer-add-topology-data.conflictNodes"),
                            content: partialCellsDialogContent,
                            optionalContent: '',
                            type: '',
                            buttons: [{
                                caption: strings.get("networkexplorer-add-topology-data.continue"),
                                color: 'darkBlue',
                                action: function() {
                                    var data = partialCellsDialogContent.radioButtonValues(objectData);
                                    conflictingCellsDialog.destroy();

                                    if (data.uniqueFlag !== undefined && data.uniqueFlag === true) {
                                        if (isCollection === true) {
                                            return addCollectionRestCall(collectionId, data.objects, '?uniqueFlag=true');
                                        } else {
                                            return addRestCall(collectionId, data, parseInt(countArr[1].trim()) - parseInt(countArr[0].trim()));
                                        }
                                    } else if (data.moveFlag !== undefined && data.moveFlag === true) {
                                        var messageSuccess = '';
                                        if (parseInt(countArr[1].trim()) === parseInt(countArr[0].trim())) {
                                            messageSuccess = 'networkexplorer-move-to-collection.objectsMoved';
                                        } else {
                                            messageSuccess = 'networkexplorer-add-topology-data.objectsAddedAndMoved';
                                        }
                                        if (isCollection === true) {
                                            return addCollectionRestCall(collectionId, data.objects, '?moveFlag=true');
                                        } else {
                                            return addRestCall(collectionId, data, parseInt(countArr[1].trim()), messageSuccess);
                                        }
                                    }
                                }
                            },
                            {
                                caption: strings.get("networkexplorer-add-topology-data.cancel"),
                                action: function() {
                                    conflictingCellsDialog.destroy();
                                }
                            }]});
                        partialCellsDialogContent.showWarningMessage();
                        conflictingCellsDialog.show();
                        if (countArr[0].trim()===countArr[1].trim()) {
                            partialCellsDialogContent.disabledAndUncheckUniqueRadio();
                        }
                    }else if(errorCode === 10907){
                        displayRestrictChildObjectDialog(collectionId, errorMessage, isCollection, objectData);
                    } else {
                        var dialog = new Dialog({
                            header: strings.get('networkexplorer-add-topology-data.unableToUpdate'),
                            content: strings.get('networkexplorer-add-topology-data.unableToUpdateForReason'),
                            optionalContent: errorMessage,
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
                }
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