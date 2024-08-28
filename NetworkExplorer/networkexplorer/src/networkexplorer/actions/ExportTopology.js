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
     * ExportTopology
     * ===
     * id: networkexplorer-export-topology
     *
     * This action allows BRANCH Collections to be exported.
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
            lifecycle.onReady({ message: appActionsStrings.get('networkexplorer-export-topology.launchingAction') });

            new Promise(function(resolve, reject) {

                if (!(data && data.length>0)) {
                    reject({ message: 'Action supports at least one selection.' });
                    return;
                }

                if (!data.every(function(collection) { return isBranchOrHybrid(collection); })) {
                    reject({ message: 'Action supports Branch and Hybrid collections only.' });
                    return;
                }

                new CommonActions("collections").executeExportNested({
                    idList: {
                        collections: data.map(function (collection) {
                            return collection.id;
                        })
                    },
                    success: function(options) {
                        new ExportDialog({
                            type: "collections",
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
            }).then(function() {
                lifecycle.onComplete(new ActionLibrary.ActionResult({ success: true }));
            }).catch(function(reason) {
                lifecycle.onFail(new ActionLibrary.ActionResult({ success: false, message: reason.message }));
            });

            return lifecycle;
        }
    });

    /**
    * Check if the collection is a hybrid Collection or Branch Collection.
    *
    * @method isBranchOrHybrid
    * @param item {Object} resource under evaluation
    * @returns {Boolean} True if collection contains collection of collections and objects or collection of collections
    */
    function isBranchOrHybrid(item) {
        return ((item.type === 'NESTED' && ['LEAF', 'SEARCH_CRITERIA'].indexOf(item.subType) !== -1 ||
        item.type === 'LEAF') && item.hybrid === true) || item.subType === 'BRANCH';
    }
});
