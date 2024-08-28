define([
    './Consumable',
    './ConsumableSet',
    '../actions/SaveSearch',
    'container/api',
    'applib/LaunchContext',
    'actionlibrary/ActionLibrary',
    'actionlibrary/RecentActions',
    'networkexplorerlib/ObjectConfigurationApi',
    'networkexplorerlib/ErrorHandler',
    'widgets/Dialog',
    'i18n!networkexplorer/Results.json',
    'i18n!networkexplorer/keywords.json'
], function(Consumable, ConsumableSet, SaveSearchAction, Container, LaunchContext, ActionLibrary, RecentActions,
    ObjectConfigurationApi, ErrorHandler, Dialog, strings, keywords) {
    /**
     * ActionManager
     * -------------
     * Use to work with Actions Framework
     *
     * @constructor
     */
    var ActionManager = function(options) {
        this.context = options.context;
        this.resultsData = options.resultsData;
        this.errorHandler = new ErrorHandler();

        // Keep previously requested action results in a map
        this.actionsMap = {};
        // Keep track of user requests for actions
        this.requests = {
            getActions: 0
        };

        // for legacy actions
        this.context.eventBus.subscribe('CollectionHandler:operationDone', this.handleCollectionHandlerOperationDone, this);
        this.objects = undefined;

        // Listen for a collection created message
        Container.getEventBus().subscribe('action:networkexplorer-add-to-collection:created', function() {
            this.context.eventBus.publish('Results:entityCreated');
        }.bind(this));
    };

    ActionManager.prototype = {
        /**
         * Get Actions for list of objects
         *
         * @method getActions
         * @param {Array} objects the array of selected objects
         * @param {Function} callback Receives the array of actions
         */
        getActions: function(objects, callback) {
            var currentRequestId = ++this.requests.getActions;
            this.hasUnVsn = false;
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].neType === "VirtualSubnetwork" || objects[i].neType === "Unmanaged") {
                    this.hasUnVsn = true;
                    break;
                }
            }
            this.objects = objects; /* Support for legacy actions */

            var actions = {
                actionBar: [],
                contextMenu: []
            };

            var deletedObjects = objects.find(function(obj) {
                return (obj.moName === 'Deleted' && obj.moType === 'Deleted') || obj.type === '[Deleted]';
            });

            if (this.resultsData && objects.length > 0) {
                if (this.resultsData && this.resultsData.isSavedSearchEnabled()) {
                    var saveSearchAction = {
                        name: strings.get('saveCurrentSearch'),
                        action: this.createSave.bind(this),
                        type: 'button',
                        icon: 'save'
                    };
                    actions.actionBar.push(saveSearchAction);
                }
                if (!deletedObjects) {
                    var addToCollectionAction = {
                        name: strings.get('addToCollection'),
                        action: this.handleAddToCollectionAction.bind(this),
                        type: 'button',
                        icon: 'addToFolder'
                    };
                    actions.actionBar.push(addToCollectionAction);
                    actions.contextMenu.push(addToCollectionAction);
                }
                if (isRemoveAllowed(this.resultsData.userHasUpdateRights(), this.resultsData.getCurrentSearchData()) && !this.resultsData.recursiveValue) {
                    var removeFromCollectionAction = {
                        name: strings.get('removeFromCollection'),
                        action: this.handleRemoveFromCollectionAction.bind(this),
                        type: 'button'
                    };
                    actions.actionBar.push(removeFromCollectionAction);
                    actions.contextMenu.push(removeFromCollectionAction);
                }
            }

            /*
              Support for Framework Actions
             */
            if (deletedObjects) { // skip framework Actions when a Deleted object has been selected
                callback(actions);
                return;
            }

            var metaObject = ActionLibrary.createMetaObject(
                'networkexplorer',
                'ManagedObject',
                objects
            );
            var stringifiedMetaObject = JSON.stringify(metaObject);
            var cachedActions = this.actionsMap[stringifiedMetaObject];
            if (cachedActions) {
                // Use cached actions
                var transformedActions = this.transformActions(cachedActions, objects.map(function(object) {
                    return {id: object.id};
                }));
                this.getRecentActions(actions, transformedActions, callback);
                return;
            }

            ActionLibrary.getAvailableActions(metaObject)
            .then(function(returnedActions) {
                // Cache actions
                this.actionsMap[stringifiedMetaObject] = returnedActions;
                // Transform Action (Framework -> Bar)
                var transformedActions = this.transformActions(returnedActions, objects.map(function(object) {
                    return {id: object.id};
                }));
                this.getRecentActions(actions, transformedActions, callback);
            }.bind(this)).catch(function() {
                    if (currentRequestId === this.requests.getActions) {
                        // Show error dialog
                        var dialogWidget, onDialogClose = function() {
                            dialogWidget.hide();
                            callback(actions);
                        };
                        dialogWidget = new Dialog({
                            header: strings.get('actionFetchErrorHeader'),
                            content: strings.get('actionFetchErrorContent'),
                            buttons: [{
                                color: 'darkBlue',
                                caption: keywords.get('ok'),
                                action: onDialogClose
                            }]
                        });
                        dialogWidget.show();
                    }
                }.bind(this));
        },

        getRecentActions: function(actions, transformedActions, callback) {
            RecentActions.getRecentActions('networkexplorer', transformedActions)
                .then(function(recentActions) {
                    if(recentActions.actionList) {
                        this.removeActionsForUnVsn(recentActions.actionList);
                        // Adding the Recent dropdaown button as a first element to the actionBar object
                        // Adding the Recent actions item as a first element to the contextMenu object
                        var recentActionsDropdown = RecentActions.getRecentActionDropdown(recentActions.actionList);
                        var contextMenuGroup = RecentActions.getRecentActionGroup(recentActions.actionList);
                        var separator = {
                            type: 'separator'
                        };
                        if(recentActionsDropdown.length > 0) {
                            actions.actionBar.unshift(recentActionsDropdown[0]);
                        }
                        if(contextMenuGroup.length > 0) {
                            actions.contextMenu.unshift(separator);
                            actions.contextMenu.unshift(contextMenuGroup[0]);
                        }
                    }
                    callback(this.mergeActions(actions, transformedActions));
                }.bind(this))
                .catch(function() {
                    callback(this.mergeActions(actions, transformedActions));
                }.bind(this));
        },

        mergeActions: function(actions, remoteActions) {
            var separatedActions = [], currentCategory;
            if (actions.actionBar.length > 0 && remoteActions.length > 0) {
                actions.actionBar.push({
                    type: 'separator'
                });
            }
            if (actions.contextMenu.length > 0 && remoteActions.length > 0) {
                actions.contextMenu.push({
                    type: 'separator'
                });
            }
            remoteActions.forEach(function(action) {
                if (action.category !== currentCategory && currentCategory !== undefined) {
                    separatedActions.push({
                        type: 'separator'
                    });
                }
                currentCategory = action.category;
                separatedActions.push(action);
            });
            actions.actionBar = actions.actionBar.concat(separatedActions);
            actions.contextMenu = actions.contextMenu.concat(separatedActions);
            return actions;
        },

        /**
         * Default Actions per context:
         * * Search - Save Search
         * * Saved Search - Save Search
         * * Collection - None
         * * Message - None
         */
        updateDefaultActions: function() {
            var actions = [];
            if (this.resultsData && this.resultsData.isSavedSearchEnabled()) {
                var saveSearchAction = {
                    name: strings.get('saveCurrentSearch'),
                    action: this.createSave.bind(this),
                    type: 'button',
                    icon: 'save'
                };
                actions.push(saveSearchAction);
            }
            this.context.eventBus.publish('topsection:defaultactions', actions);
        },

        /**
         * Reformat Actions into objects required by UISDK TopSection / ContextMenu
         */
        transformActions: function(returnedActions, objects) {
            this.removeActionsForUnVsn(returnedActions);
            this.removeMoveToCollection(returnedActions);
            return returnedActions.map(function(action) {
                var resultAction = {
                    category: action.category,
                    actionBarOnly: action.actionBarOnly,
                    type: 'button',
                    name: action.defaultLabel,
                    action: function() {
                        this.launchAction(action, objects);
                    }.bind(this)
                };
                if (action.icon) {
                    resultAction.icon = action.icon;
                }
                return resultAction;
            }.bind(this));
        },

        removeActionsForUnVsn: function (actions) {
            if (this.hasUnVsn) {
                for (var x = 0; x < actions.length; x++) {
                    var actionName = actions[x].defaultLabel ? actions[x].defaultLabel : actions[x].name;
                    if (actionName !== 'Add Node' && actionName !== 'Set Location' && actionName !== 'Select Related Objects' && actionName !== 'Locate in Topology' &&
                        actionName !== 'Add to a Collection' && actionName !== 'Manage Links' && actionName !== 'Create Link' && actionName !== 'Delete All Links' &&
                        actionName !== 'Delete Node' && actionName !== 'Search for an Object' && actionName !== 'Browse to FDN') {
                        actions.splice(x, 1);
                        x--;
                    }
                }
            }
        },

        removeMoveToCollection: function (actions) {
            for (var x = 0; x < actions.length; x++) {
            var actionLabel = actions[x].defaultLabel ? actions[x].defaultLabel : actions[x].name;
                if(actionLabel === 'Move to Collection') {
                    actions.splice(x, 1);
                    x--;
                }
            }
        },

        launchAction: function(action, objects) {
            ActionLibrary.executeAction(action, objects, {
                onReady: function() {
                    /* No implementation required */
                }.bind(this),
                onProgress: function() {
                    /* No implementation required */
                }.bind(this),
                onComplete: function() {
                    /* No implementation required */
                }.bind(this),
                onFail: function(actionResult) {
                    this.onActionFail(action, actionResult);
                }.bind(this)
            });
            RecentActions.updateRecentActions('networkexplorer', action.defaultLabel)
                .then(function() {
                    this.getActions(this.objects, function(actions) {
                        this.context.eventBus.publish('topsection:contextactions', actions.actionBar);
                    }.bind(this));
                }.bind(this)).catch(function(err) {
                    /* No implementation required */
                }
            );
        },

        /**
         * Reset the visible actions
         */
        reset: function() {
            this.context.eventBus.publish('topsection:defaultactions', []);
            this.context.eventBus.publish('topsection:leavecontext');
        },

        /**
         * Called when an Action fails to load.
         * @param {Object} action failing to load
         * @param {Object} actionResult object containing Action state and message
         */
        onActionFail: function(action, actionResult) {
            // show dialog error
            var dialogWidget = new Dialog({
                header: strings.get('actionLaunchErrorHeader'),
                content: strings.get('actionLaunchErrorContent').replace('$1', action.defaultLabel),
                optionalContent: actionResult.message,
                type: 'error',
                buttons: [{
                    color: 'darkBlue',
                    caption: keywords.get('ok'),
                    action: function() {
                        dialogWidget.hide();
                    }
                }]
            });
            dialogWidget.show();
        },

        // Legacy action support //

        // Add to / Remove from a Collection

        /**
         * Run class that show the save search region.
         *
         * Uses:
         * - this.context
         * - this.resultsData
         */
        createSave: function() {
            SaveSearchAction.action({
                context: this.context,
                searchTerm: this.resultsData.getSearchTerm()
            });
        },

        /**
         * Make Add to Collection flyout panel appear
         * Uses the AddToCollection Action
         *
         * Uses:
         * - this.objects
         *
         * @method handleAddToCollectionAction
         */
        handleAddToCollectionAction: function() {
            this.launchAction({
                plugin: 'networkexplorer/networkexplorer-add-to-collection'
            }, this.objects);
        },
        /**
         * Remove objects from current Collection
         *
         * Uses:
         * - this.objects
         *
         * @method handleRemoveFromCollectionAction
         */
        handleRemoveFromCollectionAction: function() {
            var objectsSelected = this.objects.map(function(obj) {
                return obj.id;
            });
            ObjectConfigurationApi.removeObjects({
                collection: {
                    id: this.resultsData.getCurrentSearchData().id
                },
                objects: objectsSelected,
                onSuccess: function() {
                    this.handleCollectionHandlerOperationDone(strings.get('objectsRemoved').replace('$1', objectsSelected.length));
                }.bind(this),
                onFailure: this.handleSubmitError.bind(this)
            });
        },
        /**
         * Remove from this Collection
         * * Request NetworkExplorer to load the Collection again
         * 
         * @method handleCollectionHandlerOperationDone
         * @param {String} label Toast message containing number of objects removed
         */
        handleCollectionHandlerOperationDone: function(label) {
            this.context.eventBus.publish('CollectionHandler:showToastForRemove', {
                label: label,
                color: 'green',
                icon: 'tick',
                showAsToast: true,
                showCloseButton: true,
                removeCollection: true
            });
            var id = this.resultsData.getCurrentSearchData().id;
            this.context.eventBus.publish('NetworkExplorer:collectionHash', id, undefined, undefined, true);
        },
        /**
         * Publishes events to update the table header and display a 'Saved' toast notification.
         */
        publishCollectionIsSaved: function(savedEntityType) {
            this.context.eventBus.publish('Results:entityCreated', savedEntityType);
            this.context.eventBus.publish('Results:showToast', {
                label: 'Saved',
                color: 'green',
                icon: 'tick',
                showAsToast: true,
                showCloseButton: true
            });
        },
        /**
         * Handler for error while removing objects
         *
         * @method handleSubmitError
         * @param {Object} msg Error message
         * @param {Object} xhr XMLHttpResponse object
         */
        handleSubmitError: function(msg, xhr) {
            var errorMessage, header = strings.get('removeError');
            var errorObject = this.errorHandler.getErrorMessage(xhr);
            if (errorObject.internalErrorCode === 10007) {
                errorMessage = strings.get('editCollectionErrorBody');
            } else {
                errorMessage = errorObject.userMessage.body;
            }
            this.context.eventBus.publish('CollectionHandler:showErrorDialog', {
                header: header,
                content: errorMessage
            });
        }
    };

    /**
     * Handle if user can remove objects from collection
     *
     * @private
     * @param {Object} userHasUpdateRights
     * @param {Object} currentSearchData
     */
    function isRemoveAllowed (userHasUpdateRights, currentSearchData) {
       return userHasUpdateRights && (currentSearchData === undefined || currentSearchData.subType !== 'SEARCH_CRITERIA');
    }

    return ActionManager;
});
