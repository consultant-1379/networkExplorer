define([
    'jscore/core',
    'jscore/ext/net',
    'container/api',
    'actionlibrary/ActionLibrary',
    'scopingpanel/EmbeddedScopingPanel',
    'networkexplorerlib/ObjectConfigurationApi',
    'widgets/Notification',
    'widgets/Dialog',
    'i18n!networkexplorer/app_actions.json',
    'i18n!networkexplorer/keywords.json',
    '../widgets/ConflictingDialog/ConflictingDialog',
    '../widgets/restrictChildObjectDialog/RestrictChildObjectDialog'

], function(core, net, Container, ActionLibrary, ScopingPanel, ObjectConfigurationApi, Notification, Dialog, strings, keywords, ConflictingCellsDialog,RestrictChildObjectDialog) {

    'use strict';

    /**
     * AddObjectCollections
     * ===
     * id: networkexplorer-add-object-collections
     *
     * This action launches a flyout panel allowing user to add object collections to a BRANCH collection.
     *
     * Expected parameters:
     * # Array of objects
     *
     * Expected contents
     * * Exactly one collection
     * * If not empty, the first collection must have an id property whose value is a valid string representing the id of a
     *   BRANCH collection
     */
    return ActionLibrary.Action.extend({

        run: function(callbackObject, data) {

            var SELECTION_LIMIT= 250;
            // Create new lifecycle
            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({
                message: strings.get('networkexplorer-add-object-collections.launchingAction')
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
                    reject({message: 'No collection selected'});
                    return;
                }
                if (data && data.length && data.length > 1) {
                    reject({message: 'Multiple selection is not supported'});
                    return;
                }
                if (data && data.length && data.length === 1 && typeof data[0].id !== 'string') {
                    reject({message: 'A valid identifier was not found for the selected collection'});
                    return;
                }

                // Communication channel for ScopingPanel Region
                var scopingPanel, scopingPanelEventBus = new core.EventBus();
                scopingPanelEventBus.subscribe(ScopingPanel.events.SELECT, function(selection) {
                    performUpdate(data[0].id, selection.collections, selection.networkObjects);
                }.bind(this));
                scopingPanelEventBus.subscribe(ScopingPanel.events.CANCEL, function() {
                    scopingPanel.stop();
                    Container.getEventBus().publish('flyout:hide');
                    useCasePromiseCallbacks.reject();
                }.bind(this));

                // Shared Context for Action instance
                var AddObjectCollectionsContext = core.AppContext.extend({
                    eventBus: scopingPanelEventBus
                });

                // Initialize ScopingPanel Region
                scopingPanel = new ScopingPanel({
                    context: new AddObjectCollectionsContext(),
                    tabs: [
                        ScopingPanel.tabs.TOPOLOGY,
                        ScopingPanel.tabs.SEARCH,
                        ScopingPanel.tabs.COLLECTIONS
                    ],
                    multiSelectPerTab: {
                        TOPOLOGY: true,
                        SEARCH: true,
                        COLLECTIONS: true
                    },
                    tabsOptions: {collections: {onlyStandardCollections: true}}
                });

                // Display flyout with ScopingPanel
                Container.getEventBus().publish('flyout:show', {
                    header: strings.get('networkexplorer-add-object-collections.label'),
                    content: scopingPanel,
                    width: '420px'
                });

                // The Action's job is done
                resolve();

                // Attempt to perform an update collection operation
                function performUpdate(collectionId, collections, networkObjects) {
                    if (isSelectionWithinLimit(collections.length) || isSelectionWithinLimit(networkObjects.length)) {
                        Container.getEventBus().publish('container:loader');
                        var finalCollectionData = null;

                        new Promise(function(resolve, reject) {
                            if (collections.length > 0) {
                                addCollectionRestCall(collectionId, collections, '');
                            } else if (networkObjects.length > 0) {
                                net.ajax({
                                    url: '/object-configuration/collections/v4/' + collectionId + '?includeContents=true',
                                    type: 'GET',
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function(data) {
                                        var collectionObjects;
                                        if (data.contents && data.contents.length > 0) {
                                            collectionObjects = data.contents.map(function(obj) { return { id: obj.id }; });
                                        } else {
                                            collectionObjects = [];
                                        }
                                        finalCollectionData = collectionObjects.concat(networkObjects.map(function(obj) { return {id: obj}; }));
                                        addRestCall(collectionId, {objects: finalCollectionData}, networkObjects.length);
                                    },
                                    error: function(msg, xhr) {
                                        reject({msg: msg, xhr: xhr});
                                    }
                                });
                            }
                        }).then(function(data) {
                            Container.getEventBus().publish('container:loader-hide');
                            handleSuccess(data);
                        }).catch(function(e) {
                            Container.getEventBus().publish('container:loader-hide');
                            handleFailure(e.xhr);
                        });
                    }
                }

                // Validate maximum number of collections allowed
                function isSelectionWithinLimit(numberOfCollectionsSelected) {
                    if (numberOfCollectionsSelected > SELECTION_LIMIT) {
                        createAndShowDialog(strings.get('networkexplorer-add-object-collections.reasonNumberOfCollectionsLimit').replace(/\$1/g, SELECTION_LIMIT));
                        useCasePromiseCallbacks.reject();
                        return false;
                    }
                    return true;
                }

                // Handle update success
                function handleSuccess(data, messageSuccess) {
                    if (messageSuccess === undefined || messageSuccess ==='') {
                        messageSuccess = 'networkexplorer-add-topology-data.objectsAdded';
                    }
                    var notification = new Notification({
                        showAsGlobalToast: true,
                        icon: 'tick',
                        color: 'green',
                        label: strings.get(messageSuccess).replace('$1', data.objectCount)
                    });
                    notification.attachTo(core.Element.wrap(document.body));
                    scopingPanel.stop();
                    Container.getEventBus().publish('flyout:hide');
                    useCasePromiseCallbacks.resolve();
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

                function addCollectionRestCall(collectionId, collections, queryString) {
                    var loaderTimeoutId = setTimeout(function() {
                        Container.getEventBus().publish('container:loader');
                    }, 100);
                    new Promise(function(resolve, reject) {
                        ObjectConfigurationApi.addCollections({
                            id: collectionId,
                            collectionIds: collections,
                            queryString: queryString,
                            onSuccess: function() {
                                resolve({objectCount: collections.length, isObject: false});
                            }.bind(this),
                            onFailure: function(msg, xhr) {
                                reject({msg: msg, xhr: xhr});
                            }.bind(this)
                        });
                    }).then(function(data) {
                        Container.getEventBus().publish('container:loader-hide');
                        handleSuccess(data, 'networkexplorer-add-object-collections.objectsAdded');
                    }).catch(function(e) {
                        clearTimeout(loaderTimeoutId);
                        Container.getEventBus().publish('container:loader-hide');
                        handleFailure(e.xhr, collectionId, collections, true);
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
                        net.ajax({
                            url: '/object-configuration/v1/collections/' + collectionId,
                            type: 'PUT',
                            dataType: 'json',
                            data: JSON.stringify(collectionData),
                            contentType: 'application/json',
                            success: function() {
                                resolve({objectCount: objectCount, isObject: true});
                            }.bind(this),
                            error: function(msg, xhr) {
                                reject({msg: msg, xhr: xhr});
                            }.bind(this)
                        });
                    }).then(function(data) {
                        Container.getEventBus().publish('container:loader-hide');
                        handleSuccess(data, messageSuccess);
                    }).catch(function(e) {
                        clearTimeout(loaderTimeoutId);
                        Container.getEventBus().publish('container:loader-hide');
                        handleFailure(e.xhr, collectionId, collectionData.objects, false);
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
                                    addRestCall(collectionId, {objects: validObjectIds}, numberOfNewObjects,'');
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

                // Handle update failure
                function handleFailure(xhr, collectionId, objectData, isCollection) {
                    var errorMessage,errorCode=JSON.parse(xhr.getResponseText()).internalErrorCode;
                    if (xhr && xhr.getStatusText() !== 'abort') {
                        try {
                            errorMessage = JSON.parse(xhr.getResponseText());
                            errorMessage = errorMessage.userMessage.body;
                        } catch (e) {
                            errorMessage = strings.get('networkexplorer-add-object-collections.reasonUnreachableServer');
                        }
                    } else {
                        errorMessage = strings.get('networkexplorer-add-object-collections.reasonRequestCancelled');
                    }
                    if (errorCode === 10906) {
                        var idsToUpdate = [], errorString, splitMsg, convertToArr, nodeLength, poids;
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
                            for (var keys in convertToArr) {
                                var nodeName = convertToArr[keys];
                                for (var count = 0; count < nodeName.length; count++) {
                                    idsToUpdate.push({'location': keys, 'node': nodeName[count].toString()});
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
                                    var data =  partialCellsDialogContent.radioButtonValues(objectData);
                                    conflictingCellsDialog.destroy();
                                    if (data.uniqueFlag !== undefined && data.uniqueFlag === true) {
                                        if (isCollection === true) {
                                            addCollectionRestCall(collectionId, data.objects, '?uniqueFlag=true');
                                        } else {
                                            addRestCall(collectionId, data, parseInt(countArr[1].trim()) - parseInt(countArr[0].trim()));
                                        }
                                    } else if (data.moveFlag !== undefined && data.moveFlag === true) {
                                        var messageSuccess = '';
                                        if (parseInt(countArr[1].trim()) === parseInt(countArr[0].trim())) {
                                            messageSuccess = 'networkexplorer-move-to-collection.objectsMoved';
                                        } else {
                                            messageSuccess = 'networkexplorer-add-topology-data.objectsAddedAndMoved';
                                        }

                                        if (isCollection === true) {
                                            addCollectionRestCall(collectionId, data.objects, '?moveFlag=true');
                                        } else {
                                            addRestCall(collectionId, data, parseInt(countArr[1].trim()), messageSuccess);
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
                          displayRestrictChildObjectDialog(collectionId,errorMessage, isCollection, objectData);
                    }else {
                        createAndShowDialog(errorMessage);
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