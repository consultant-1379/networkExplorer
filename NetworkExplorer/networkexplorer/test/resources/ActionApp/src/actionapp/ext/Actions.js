define(function() {
    return [{
        'name': 'Add to Collection',
        'primary': true,
        'multipleSelection': true,
        'plugin': 'networkexplorer/networkexplorer-add-to-collection',
        'category': 'Configuration Management',
        'icon': 'addToFolder',
        'order': 100
    }, {
        'name': 'Add Topology Data',
        'multipleSelection': true,
        'plugin': 'networkexplorer/networkexplorer-add-topology-data',
        'category': 'Collection Modification Actions',
        'order': 100
    },{
        'name': 'Move to Collection',
        'multipleSelection': true,
        'plugin': 'networkexplorer/networkexplorer-move-to-collection',
        'category': 'Collection Modification Actions',
        'order': 100
    },{
        'name': 'Remove from this Collection',
        'multipleSelection': true,
        'plugin': 'networkexplorer/networkexplorer-remove-from-this-collection',
        'category': 'Collection Modification Actions',
        'order': 200
    },{
        'name': 'Set To Public',
        'multipleSelection': false,
        'plugin': 'networkexplorer/networkexplorer-set-to-public',
        'category': 'Collection Modification Actions',
        'order': 215
    },{
        'name': 'Create',
        'multipleSelection': false,
        'plugin': 'networkexplorer/networkexplorer-create-nested-collection',
        'category': 'Collection Actions',
        'order': 100
    },{
        'name': 'Rename',
        'multipleSelection': false,
        'plugin': 'networkexplorer/networkexplorer-rename-collection',
        'category': 'Collection Modification Actions',
        'order': 200
    },{
        'name': 'Delete',
        'multipleSelection': false,
        'plugin': 'networkexplorer/networkexplorer-delete-collection',
        'category': 'Collection Modification Actions',
        'order': 300
    },{
        'name': 'Remove from Collection',
        'multipleSelection': true,
        'plugin': 'networkexplorer/networkexplorer-remove-leaf-collection',
        'category': 'Collection Modification Actions',
        'order': 250
    }];
}); // Add more to test them
