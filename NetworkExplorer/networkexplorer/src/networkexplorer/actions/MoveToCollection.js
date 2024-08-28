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
     * MoveToCollection
     * ===
     * id: networkexplorer-move-to-collection
     *
     * This action launches a flyout panel allowing users to move objects to an existing collection.
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
            var NODE_SELECTION_LIMIT = 10;

            // Create new lifecycle
            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({
                message: strings.get('networkexplorer-move-to-collection.launchingAction')
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
                } else if (data && data.length && data.length > 1) {
                    reject({message: 'Multiple selection is not supported'});
                    return;
                } else if (data && data.length &&  data[0].objects && data[0].objects.length > NODE_SELECTION_LIMIT) {
                    createAndShowDialog('Unable to move nodes',strings.get('networkexplorer-move-to-collection.reasonNumberOfNodeLimit').replace(/\$1/g, NODE_SELECTION_LIMIT));
                    return;
                } else if (data && data.length && data.length === 1 && typeof data[0].id !== 'string') {
                    reject({message: 'A valid identifier was not found for the selected collection'});
                    return;
                }

                // Communication channel for ScopingPanel Region
                var scopingPanel, scopingPanelEventBus = new core.EventBus();
                scopingPanelEventBus.subscribe(ScopingPanel.events.SELECT, function(selection) {
                    performUpdate(data[0], selection.collections[0], data[0].objects);
                }.bind(this));
                scopingPanelEventBus.subscribe(ScopingPanel.events.CANCEL, function() {
                    scopingPanel.stop();
                    Container.getEventBus().publish('flyout:hide');
                    useCasePromiseCallbacks.reject();
                }.bind(this));

                // Shared Context for Action instance
                var AddMoveToCollectionContext = core.AppContext.extend({
                    eventBus: scopingPanelEventBus
                });

                // Initialize ScopingPanel Region
                scopingPanel = new ScopingPanel({
                    context: new AddMoveToCollectionContext(),
                    tabs: [
                        ScopingPanel.tabs.TOPOLOGY
                    ],
                    multiSelectPerTab: {
                        TOPOLOGY: true
                    },
                    applyButtonCaption: 'Move',
                    tabsOptions: {
                        topology: {
                            selection: {
                                collectionOfCollections: 'single',
                                collectionOfObjects: 'single',
                                networkObjects: 'none'
                            }
                        }
                    }
                });

                // Display flyout with ScopingPanel
                Container.getEventBus().publish('flyout:show', {
                    header: strings.get('networkexplorer-move-to-collection.label'),
                    content: scopingPanel,
                    width: '420px'
                });

                // The Action's job is done
                resolve();

                // Attempt to perform an update collection operation
                function performUpdate(selectedObjects, collection, moList) {
                    var loaderTimeoutId = setTimeout(function() {
                        Container.getEventBus().publish('container:loader');
                    }, 100);
                    var finalCollectionData = null;

                    if (moList && moList.length > 0) {
                        new Promise(function(resolve, reject) {
                            ObjectConfigurationApi.loadCollection({
                                params: {
                                    request: {
                                        id: collection
                                    }
                                },
                                dataType: 'json',
                                success: function(selection) {
                                    resolve(selection);
                                },
                                error: function(msg, xhr) {
                                    reject({msg: msg, xhr: xhr});
                                }
                            });
                        }).then(function(collectionData) {
                            var collectionObjects = collectionData.objects || [];
                            finalCollectionData = collectionObjects.concat(selectedObjects.objects);
                            return addMoveRestCall(selectedObjects, {objects: finalCollectionData}, moList.length, collection);
                        }).catch(function(e) {
                            handleUpdateFailure(e.xhr);
                        }).then(function() {
                            clearTimeout(loaderTimeoutId);
                            Container.getEventBus().publish('container:loader-hide');
                        });
                    }
                }

                function addDuplicatesRestCall(selectedObjects, collectionData, objectCount, duplicatesArr, managedChildArr, collection, messageSuccess) {
                    var loaderTimeoutId = setTimeout(function() {
                        Container.getEventBus().publish('container:loader');
                    }, 100);
                    new Promise(function(resolve, reject) {
                        net.ajax({
                            url: '/object-configuration/v1/collections/' + collectionData,
                            type: 'PUT',
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify(objectCount),
                            success: function() {
                                new Promise(function(resolve, reject) {
                                    ObjectConfigurationApi.loadCollection({
                                        params: {
                                            request: {
                                                id: selectedObjects.id
                                            }
                                        },
                                        dataType: 'json',
                                        success: function(data) {
                                                var listOfObjects = data.objects.concat(duplicatesArr.map(function(obj) { return {id: obj}; }));
                                                if(managedChildArr.length>0) {
                                                    listOfObjects = listOfObjects.concat(managedChildArr.map(function(obj) { return {id: obj}; }));
                                                }
                                                net.ajax({
                                                    url: '/object-configuration/v1/collections/' + selectedObjects.id,
                                                    type: 'PUT',
                                                    contentType: 'application/json',
                                                    dataType: 'json',
                                                    data: JSON.stringify({
                                                        objects: listOfObjects
                                                    }),
                                                    success: function() {
                                                        resolve(collection); //Pass the number of selected objects as 'objectCount'
                                                    },
                                                    error: function(msg, xhr) {
                                                        reject({msg: msg, xhr: xhr});
                                                    }
                                                });
                                        },
                                        error: function(msg, xhr) {
                                            reject({msg: msg, xhr: xhr});
                                        }
                                    });
                                }).then(function(collection) {
                                      handleUpdateSuccess(collection);
                                  }).catch(function(e) {
                                      handleUpdateFailure(e.xhr, selectedObjects, collection, objectCount.objects, false);
                                  }).then(function() {
                                      clearTimeout(loaderTimeoutId);
                                      Container.getEventBus().publish('container:loader-hide');
                                  });
                            },
                            error: function(msg, xhr) {
                                reject({msg: msg, xhr: xhr});
                            }
                        });
                    }).then(function(collection) {
                        handleUpdateSuccess(collection);
                    }).catch(function(e) {
                        handleUpdateFailure(e.xhr, selectedObjects, collection, objectCount.objects, false);
                    }).then(function() {
                        clearTimeout(loaderTimeoutId);
                        Container.getEventBus().publish('container:loader-hide');
                    });
                }

                function addRestCall(selectedObjects, collectionData, objectCount, collection, messageSuccess) {
                    var loaderTimeoutId = setTimeout(function() {
                        Container.getEventBus().publish('container:loader');
                    }, 100);
                    new Promise(function(resolve, reject) {
                        net.ajax({
                            url: '/object-configuration/v1/collections/' + collectionData,
                            type: 'PUT',
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify(objectCount),
                            success: function() {
                                resolve(collection); //Pass the number of selected objects as 'objectCount'
                            },
                            error: function(msg, xhr) {
                                reject({msg: msg, xhr: xhr});
                            }
                        });
                    }).then(function(collection) {
                        handleUpdateSuccess(collection);
                    }).catch(function(e) {
                        handleUpdateFailure(e.xhr, selectedObjects, collection, objectCount.objects, false);
                    }).then(function() {
                        clearTimeout(loaderTimeoutId);
                        Container.getEventBus().publish('container:loader-hide');
                    });
                }

                function addNewRestCall(selectedObjects, collectionData, objectCount, managedChildArr, collection, messageSuccess) {
                    var loaderTimeoutId = setTimeout(function() {
                        Container.getEventBus().publish('container:loader');
                    }, 100);
                    new Promise(function(resolve, reject) {
                        net.ajax({
                            url: '/object-configuration/v1/collections/' + collectionData,
                            type: 'PUT',
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify(objectCount),
                            success: function() {
                                    new Promise(function(resolve, reject) {
                                        ObjectConfigurationApi.loadCollection({
                                            params: {
                                                request: {
                                                    id: selectedObjects.id
                                                }
                                            },
                                            dataType: 'json',
                                            success: function(data) {
                                                var listOfObjects = data.objects.concat(managedChildArr.map(function(obj) { return {id: obj}; }));
                                                    net.ajax({
                                                        url: '/object-configuration/v1/collections/' + selectedObjects.id,
                                                        type: 'PUT',
                                                        contentType: 'application/json',
                                                        dataType: 'json',
                                                        data: JSON.stringify({
                                                            objects: listOfObjects
                                                        }),
                                                        success: function() {
                                                            resolve(collection); //Pass the number of selected objects as 'objectCount'
                                                        },
                                                        error: function(msg, xhr) {
                                                            reject({msg: msg, xhr: xhr});
                                                        }
                                                    });
                                            },
                                            error: function(msg, xhr) {
                                                reject({msg: msg, xhr: xhr});
                                            }
                                        });
                                    }).then(function(collection) {
                                          handleUpdateSuccess(collection);
                                      }).catch(function(e) {
                                          handleUpdateFailure(e.xhr, selectedObjects, collection, objectCount.objects, false);
                                      }).then(function() {
                                          clearTimeout(loaderTimeoutId);
                                          Container.getEventBus().publish('container:loader-hide');
                                      });

                            },
                            error: function(msg, xhr) {
                                reject({msg: msg, xhr: xhr});
                            }
                        });
                    }).then(function(collection) {
                        handleUpdateSuccess(collection);
                    }).catch(function(e) {
                        handleUpdateFailure(e.xhr, selectedObjects, collection, objectCount.objects, false);
                    }).then(function() {
                        clearTimeout(loaderTimeoutId);
                        Container.getEventBus().publish('container:loader-hide');
                    });
                }

                function addMoveRestCall(selectedObjects, collectionData, objectCount, collection, messageSuccess) {
                    var loaderTimeoutId = setTimeout(function() {
                        Container.getEventBus().publish('container:loader');
                    }, 100);
                    new Promise(function(resolve, reject) {
                        net.ajax({
                            url: '/object-configuration/v1/collections/' + selectedObjects.id + '/' + collection,
                            type: 'PUT',
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify({
                                objects: selectedObjects.objects
                            }),
                            success: function() {
                                resolve(selectedObjects.objects.length); // Pass the number of selected objects
                            },
                            error: function(msg, xhr) {
                                reject({msg: msg, xhr: xhr});
                            }
                        });
                    }).then(function(objectCount) {
                        handleUpdateSuccess(objectCount);
                    }).catch(function(e) {
                        handleUpdateFailure(e.xhr, selectedObjects, collection, collectionData.objects, false);
                    }).then(function() {
                        clearTimeout(loaderTimeoutId);
                        Container.getEventBus().publish('container:loader-hide');
                    });
                }

                function displayRestrictChildObjectDialog(selectedObjects, collectionId, errorMessage, isCollection, collectionData){
                    var validObjectIdArray, numberOfNewObjects, validObjectIds;
                    var restrictedChildContent = new RestrictChildObjectDialog();

                    if (isCollection === false){
                         validObjectIdArray = restrictedChildContent.getFilteredObjectsFromResponse(errorMessage);
                         numberOfNewObjects = restrictedChildContent.numberOfSelectedObjectsInFilteredResponse(errorMessage);
                         validObjectIds = validObjectIdArray.map(function(obj) { return {id: obj}; });
                    }

                    if(isCollection === false && numberOfNewObjects === 0){
                        var restrictChildObjectDialogNew = new Dialog({
                         header: strings.get("networkexplorer-add-topology-data.restrictedObjectDialogHeader"),
                         content:restrictedChildContent,
                         optionalContent:'',
                         type:'error',
                         buttons:[
                                  {
                                    caption: strings.get("networkexplorer-add-topology-data.cancel"),
                                     action: function() {
                                     new Promise(function(resolve, reject) {
                                         ObjectConfigurationApi.loadCollection({
                                             params: {
                                                 request: {
                                                     id: selectedObjects.id
                                                 }
                                             },
                                             dataType: 'json',
                                             success: function(data) {
                                                 var listOfObjects = data.objects.concat(selectedObjects.objects);
                                                 net.ajax({
                                                         url: '/object-configuration/v1/collections/' + selectedObjects.id,
                                                         type: 'PUT',
                                                         contentType: 'application/json',
                                                         dataType: 'json',
                                                         data: JSON.stringify({
                                                             objects: listOfObjects
                                                         }),
                                                         success: function(res) {
                                                             resolve(res.length); //Pass the number of selected objects as 'objectCount'
                                                         },
                                                         error: function(msg, xhr) {
                                                             reject({msg: msg, xhr: xhr});
                                                         }
                                                     });
                                             },
                                             error: function(msg, xhr) {
                                                 reject({msg: msg, xhr: xhr});
                                             }
                                         });
                                     });
                                     restrictChildObjectDialogNew.destroy();
                                 }
                                 }]});
                     restrictedChildContent.hideContinueMessage();
                     restrictChildObjectDialogNew.show();
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
                                    if(numberOfNewObjects > 0 && isCollection === false){
                                        new Promise(function(resolve, reject) {
                                          ObjectConfigurationApi.loadCollection({
                                              params: {
                                                  request: {
                                                      id: selectedObjects.id
                                                  }
                                              },
                                              dataType: 'json',
                                              success: function(data) {
                                                  var listOfObjects = data.objects.concat(selectedObjects.objects);
                                                  net.ajax({
                                                          url: '/object-configuration/v1/collections/' + selectedObjects.id,
                                                          type: 'PUT',
                                                          contentType: 'application/json',
                                                          dataType: 'json',
                                                          data: JSON.stringify({
                                                              objects: listOfObjects
                                                          }),
                                                          success: function(res) {
                                                               selectedObjects.objects = [];
                                                               selectedObjects.objects = selectedObjects.objects.concat(validObjectIds);
                                                               performUpdate(selectedObjects, collectionId, selectedObjects.objects);
                                                          },
                                                          error: function(msg, xhr) {
                                                              reject({msg: msg, xhr: xhr});
                                                          }
                                                  });
                                              },
                                              error: function(msg, xhr) {
                                                  reject({msg: msg, xhr: xhr});
                                              }
                                          });
                                      });
                                      restrictChildObjectDialog.destroy();
                                    }

                                    if(isCollection === true){
                                        addCollectionRestCall(collectionId, collectionData, '?validMOFlag=true');
                                    }
                                 }},
                             {
                             caption: strings.get("networkexplorer-add-topology-data.cancel"),
                             action: function () {
                                 new Promise(function(resolve, reject) {
                                      ObjectConfigurationApi.loadCollection({
                                          params: {
                                              request: {
                                                  id: selectedObjects.id
                                              }
                                          },
                                          dataType: 'json',
                                          success: function(data) {
                                              var listOfObjects = data.objects.concat(selectedObjects.objects);
                                              net.ajax({
                                                      url: '/object-configuration/v1/collections/' + selectedObjects.id,
                                                      type: 'PUT',
                                                      contentType: 'application/json',
                                                      dataType: 'json',
                                                      data: JSON.stringify({
                                                          objects: listOfObjects
                                                      }),
                                                      success: function(res) {
                                                          resolve(res.length); //Pass the number of selected objects as 'objectCount'
                                                      },
                                                      error: function(msg, xhr) {
                                                          reject({msg: msg, xhr: xhr});
                                                      }
                                                  });
                                          },
                                          error: function(msg, xhr) {
                                              reject({msg: msg, xhr: xhr});
                                          }
                                      });
                                  });
                                  restrictChildObjectDialog.destroy();
                             }
                         }]});
                         restrictedChildContent.showContinueMessage();
                         restrictChildObjectDialog.show();
                    }
                }

                // Handle update success
                function handleUpdateSuccess(objectCount) {
                    var notification = new Notification({
                        showAsGlobalToast: true,
                        icon: 'tick',
                        color: 'green',
                        label: strings.get('networkexplorer-move-to-collection.objectsMoved').replace('$1', objectCount)
                    });
                    notification.attachTo(core.Element.wrap(document.body));
                    scopingPanel.stop();
                    Container.getEventBus().publish('flyout:hide');
                    useCasePromiseCallbacks.resolve({action: 'networkexplorer-move-to-collection'});
                }

                function createAndShowDialog(header, content, errorMessage) {
                    var dialog = new Dialog({
                        header: header,
                        content: content,
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
                }
                // Handle update failure
                function handleUpdateFailure(xhr, selectedObjects, collection, objectData, isCollection) {
                    var errorMessage, errorCode = JSON.parse(xhr.getResponseText()).internalErrorCode;
                    if (xhr && xhr.getStatusText() !== 'abort') {
                        try {
                            errorMessage = JSON.parse(xhr.getResponseText());
                            errorMessage = errorMessage.userMessage.body;
                        } catch (e) {
                            errorMessage = strings.get('networkexplorer-move-to-collection.reasonUnreachableServer');
                        }
                    } else {
                        errorMessage = strings.get('networkexplorer-move-to-collection.reasonRequestCancelled');
                    }
                    if (errorCode === 10906) {
                        var idsToUpdate=[], errorString, splitMsg, convertToArr, nodeLength, poids;
                        errorString = errorMessage.split('found');
                        splitMsg = errorString[1].toString().split('in');
                        nodeLength = splitMsg[0].toString().replace('/',' of ').replace('-','');
                        var managedChild = splitMsg[1].toString().split("managedChildNodesData");
                        var managedChildArr = JSON.parse(managedChild[managedChild.length-1]);
                        var duplicates = managedChild[0].toString().split("duplicatePoIds");
                        var duplicatesArr = JSON.parse(duplicates[duplicates.length-1]);
                        poids = duplicates[0].toString().split("poIds");

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
                                            return addDuplicatesRestCall(selectedObjects, collection, data, duplicatesArr, managedChildArr, parseInt(countArr[1].trim()) - parseInt(countArr[0].trim()));
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
                                            if(managedChildArr.length>0) {
                                                return addNewRestCall(selectedObjects, collection, data, managedChildArr, parseInt(countArr[1].trim()), messageSuccess);
                                            } else {
                                                return addRestCall(selectedObjects, collection, data, parseInt(countArr[1].trim()), messageSuccess);
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                caption: strings.get("networkexplorer-add-topology-data.cancel"),
                                action: function() {
                                    new Promise(function(resolve, reject) {
                                        ObjectConfigurationApi.loadCollection({
                                            params: {
                                                request: {
                                                    id: selectedObjects.id
                                                }
                                            },
                                            dataType: 'json',
                                            success: function(data) {
                                                var listOfObjects = data.objects.concat(selectedObjects.objects);
                                                net.ajax({
                                                        url: '/object-configuration/v1/collections/' + selectedObjects.id,
                                                        type: 'PUT',
                                                        contentType: 'application/json',
                                                        dataType: 'json',
                                                        data: JSON.stringify({
                                                            objects: listOfObjects
                                                        }),
                                                        success: function(res) {
                                                            resolve(res.length); //Pass the number of selected objects as 'objectCount'
                                                        },
                                                        error: function(msg, xhr) {
                                                            reject({msg: msg, xhr: xhr});
                                                        }
                                                    });
                                            },
                                            error: function(msg, xhr) {
                                                reject({msg: msg, xhr: xhr});
                                            }
                                        });
                                    });
                                    conflictingCellsDialog.destroy();
                                }
                            }]});
                            partialCellsDialogContent.showWarningMessage();
                            conflictingCellsDialog.show();
                            if (countArr[0].trim()===countArr[1].trim()) {
                                partialCellsDialogContent.disabledAndUncheckUniqueRadio();
                            }
                    }else if(errorCode === 10907){
                        displayRestrictChildObjectDialog(selectedObjects, collection, errorMessage, isCollection, objectData);
                    }
                    else {
                        createAndShowDialog(strings.get('networkexplorer-move-to-collection.unableToUpdate'), errorMessage);
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
