/**
 *  App Constants : provides a centralized point where application parameters are stored (it is advised
 *  to store params that are likely to change during application's lifetime.
 *
 *  When editing this file consider:
 *      - Variable naming to be intuitive when using code completion by the developer.
 *      - Every property must be an object "{}" to allow extensibility.
 *      - This library is to be used with either Unit, Integration or Acceptance lvl tests.
 */

// use amdefine library to ensure nodejs can also use this module.
if (typeof define !== 'function') {
    var define = require('../acceptance/node_modules/amdefine')(module);
}

define([

],function() {

    return {
        columnsForRootMo: {
            index: {
                moName: 0,
                moType: 1,
                mibRootName: 2,
                cmSyncStatus: 3,
                parentRDN: 4
            },
            labels: ['Name', 'MO Type', 'Node Name', 'Sync Status (CM)', 'Parent MO', 'neType']
        },
        columnsForNonRootMo: {
            index: {
                moName: 0,
                moType: 1,
                mibRootName: 2,
                cmSyncStatus: 3,
                parentRDN: 4
            },
            labels: ['Name', 'MO Type', 'Node Name', 'Sync Status (CM)', 'Parent MO']
        },
        columnsWithCheckboxes: {
            index: {
                checkbox: 0,
                moName: 1,
                moType: 2,
                mibRootName: 3,
                cmSyncStatus: 4,
                parentRDN: 5
            },
            labels: ['', 'Name', 'MO Type', 'Node Name', 'Sync Status (CM)', 'Parent MO']
        },
        columnsWhenCollectionsAreReturned: {
            index: {
                moName: 0,
                moType: 1,
                mibRootName: 2,
                cmSyncStatus: 3,
                parentRDN: 4,
                neType: 5
            },
            labels: ['Name', 'MO Type', 'Node Name', 'Sync Status (CM)', 'Parent MO', 'neType']
        },
        columnsWithAttributes: {
            index: {
                lostSynchronization: 6,
                userLabel: 7
            },
            labels: ['Name', 'MO Type', 'Node Name', 'Sync Status (CM)', 'Parent MO', 'lostSynchronization', 'userLabel']
        },

        restPath: '/managedObjects/query?searchQuery=',
        collections: {
            nameOfUnsaved: 'Unsaved Search'
        },
        slidingMenu: {
            collectionsListLimit: 5
        }
    };
});
