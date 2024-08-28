define([
    'jscore/core',
    'container/api',
    'actionlibrary/ActionLibrary',
    'networkexplorerlib/classes/CommonActions',
    'networkexplorerlib/widgets/ExportDialog',
    'networkexplorerlib/widgets/CollectionDialog',
    'i18n!networkexplorer/app_actions.json'
], function(core, Container, ActionLibrary, CommonActions, ExportDialog, CollectionDialog, appActionsStrings) {

    'use strict';
    /**
     * ExportCollection
     * ===
     * id: networkexplorer-export-collection
     *
     * This action allows LEAF Collections to be exported.
     *
     * Expected parameters:
     * # Array containing the identifiers of the Collection(s) to be exported
     *
     * Expected contents:
     * * id - id of the Collection
     */
    return ActionLibrary.Action.extend({

        run: function(callbackObject, data) {

            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({ message: appActionsStrings.get('networkexplorer-export-collection.launchingAction') });

            new Promise(function(resolve, reject) {

                if (!(data && data.length>0)) {
                    reject({ message: 'Action supports at least one selection.' });
                    return;
                }

                if (!data.every(function(collection) { return collectionContainsObject(collection); })) {
                    reject({message: 'Action supports Leaf and search criteria collections only.'});
                    return;
                }

                if (data.every(function(collection) { return isHybridCollection(collection); }) || data.every(function(collection) { return isNestedHybridCollection(collection); })) {
                    new CommonActions('collections').executeExportNested({
                        idList: {
                            collections: data.map(function(collection) {
                                return collection.id;
                            })
                        },
                        success: function(options) {
                            new ExportDialog({
                                type: 'collections',
                                sessionId: options.sessionId,
                                startTime: options.startTime,
                                timeZone: options.timeZone,
                                restRootUrl: options.restRootUrl,
                                items: options.items,
                                onErrorInDialogs: function(options) {
                                    new CollectionDialog().show(
                                        options.dialogHeader,
                                        options.dialogErrorDescription,
                                        options.dialogErrorContent
                                    );
                                }
                            });
                            resolve();
                        },
                        error: function(options) {
                            new CollectionDialog().show(
                                options.dialogHeader,
                                options.dialogErrorDescription,
                                options.dialogErrorContent
                            );
                            reject({ message: options.dialogErrorContent});
                        }
                    });
                } else {
                    new CommonActions('collections').executeExport({
                        idList: {
                            collections: data.map(function(collection) {
                                return collection.id;
                            })
                        },
                        success: function(options) {
                            new ExportDialog({
                                type: 'collections',
                                sessionId: options.sessionId,
                                startTime: options.startTime,
                                timeZone: options.timeZone,
                                restRootUrl: options.restRootUrl,
                                items: options.items,
                                onErrorInDialogs: function(options) {
                                    new CollectionDialog().show(
                                        options.dialogHeader,
                                        options.dialogErrorDescription,
                                        options.dialogErrorContent
                                    );
                                }
                            });
                            resolve();
                        },
                        error: function(options) {
                            new CollectionDialog().show(
                                options.dialogHeader,
                                options.dialogErrorDescription,
                                options.dialogErrorContent
                            );
                            reject({ message: options.dialogErrorContent});
                        }
                    });
                }
            }).then(function() {
                lifecycle.onComplete(new ActionLibrary.ActionResult({ success: true }));
            }).catch(function(reason) {
                lifecycle.onFail(new ActionLibrary.ActionResult({ success: false, message: reason.message }));
            });
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

    /**
    * Check if the collection is a Collections And Objects Collection.
    *
    * @method isHybridCollection
    * @param item {Object} resource under evaluation
    * @returns {Boolean} True if collection contains collections and objects
    */
    function isHybridCollection(item) {
        return (isStandard(item) || isLeaf(item) || item.type === 'BRANCH' ||
        (item.type === 'NESTED' && item.subType === 'BRANCH')) && item.hybrid === true;
    }

    /**
    * Check if the collection is a isNestedHybridCollection.
    *
    * @method isNestedHybridCollection
    * @param item {Object} resource under evaluation
    * @returns {Boolean} True if collection is a collection or object collections and collection of collections and objects
    */
    function isNestedHybridCollection(item) {
        return (item.type === 'BRANCH' || (item.type === 'NESTED' && item.subType === 'BRANCH')) || (isLeaf(item) && item.hybrid === true);
    }

    /**
    * Check if the collection is Standard (subType must be one of the
    * following values: NULL, SIMPLE or SEARCH_CRITERIA).
    *
    * @method isStandard
    * @param item {Object} resource under evaluation
    * @returns {Boolean} True if collection is standard.
    */
    function isStandard(item) {
        return !item.type || item.query || (item.type === 'STANDARD' && (item.subType === null ||
        ['SIMPLE', 'SEARCH_CRITERIA'].indexOf(item.subType) !== -1));
    }

    /**
    * Check if the collection type is Leaf (subType must be one of the
    * following values: LEAF or SEARCH_CRITERIA).
    *
    * @method isLeaf
    * @param item {Object} resource under evaluation
    * @returns {Boolean} True if collection is a leaf.
    */
    function isLeaf(item) {
        return (item.type === 'NESTED' && ['LEAF', 'SEARCH_CRITERIA'].indexOf(item.subType) !== -1) || item.type === 'LEAF';
    }
});
