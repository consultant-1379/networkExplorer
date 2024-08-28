define({
    "script": "networkexplorer/NetworkExplorer",
    "title": "Network Explorer",
    "helpMode": {},
    "children": [
        {
            "app": "collectionmanagement",
            "url": "collections"
        },
        {
            "app": "savedsearchmanagement",
            "url": "savedsearches"
        }
    ],
    "i18n": {
        "locales": [
            "en-us"
        ]
    },
    "exports": {
        "networkexplorer/networkexplorer-add-to-collection": "networkexplorer/actions/AddToCollection",
        "networkexplorer/networkexplorer-add-topology-data": "networkexplorer/actions/AddTopologyData",
        "networkexplorer/networkexplorer-add-object-collections": "networkexplorer/actions/AddObjectCollections",
        "networkexplorer/networkexplorer-create-nested-collection": "networkexplorer/actions/CreateNestedCollection",
        "networkexplorer/networkexplorer-delete-collections": "networkexplorer/actions/DeleteCollections",
        "networkexplorer/networkexplorer-move-to-collection": "networkexplorer/actions/MoveToCollection",
        "networkexplorer/networkexplorer-remove-from-this-collection": "networkexplorer/actions/RemoveFromThisCollection",
        "networkexplorer/networkexplorer-rename-collection": "networkexplorer/actions/RenameCollection",
        "networkexplorer/networkexplorer-set-to-public": "networkexplorer/actions/SetToPublic",
        "networkexplorer/networkexplorer-export-topology": "networkexplorer/actions/ExportTopology",
        "networkexplorer/networkexplorer-export-collection": "networkexplorer/actions/ExportCollection",
        "networkexplorer/networkexplorer-remove-leaf-collection": "networkexplorer/actions/RemoveLeafCollection",
        "networkexplorer/networkexplorer-update-search-criteria-collection-contents": "networkexplorer/actions/UpdateCollectionContents",
        "networkexplorer/networkexplorer-edit-search-criteria-collection": "networkexplorer/actions/EditSearchCriteriaCollection",
        "networkexplorer/networkexplorer-create-private-network": "networkexplorer/actions/CreatePrivateNetwork"
    }
});