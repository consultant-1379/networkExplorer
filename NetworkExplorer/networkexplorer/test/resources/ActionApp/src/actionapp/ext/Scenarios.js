define(function() {
    return [{
        name: 'A single MeContext',
        value: [{
            dataType: 'ManagedObject',
            payload: [{
                id: '1',
                type: 'MeContext'
            }]}]
    },{
        name: 'Two MeContexts',
        value: [{
            dataType: 'ManagedObject',
            payload: [{
                id: '1',
                type: 'MeContext'
            }]
        },{
            dataType: 'ManagedObject',
            payload: [{
                id: '2',
                type: 'MeContext'
            }]
        }]
    },{
        name: 'A regular Collection',
        value: [{
            dataType: 'Collection',
            payload: [{
                id: '100'
            }]}]
    },{
        name: 'A root Collection',
        value: [{
            dataType: 'Collection',
            payload: [{
                id: '1',
                parentId: null,
                subType: 'BRANCH',
                level: 0
            }]}]
    },{
        name: 'A branch Collection',
        value: [{
            dataType: 'Collection',
            payload: [{
                id: '2',
                parentId: '1',
                subType: 'BRANCH',
                level: 1
            }]}]
    },{
        name: 'A leaf Collection',
        value: [{
            dataType: 'Collection',
            payload: [{
                id: '3',
                subType: 'LEAF',
                parentId: '2',
                level: 2
            }]}]
    },{
        name: 'A leaf Collection with Contents',
        value: [{
            dataType: 'Collection',
            payload: [{
                id: '4',
                subType: 'LEAF',
                parentId: '2',
                level: 2,
                objects: [{
                    id: '2000'
                }]
            }]}]
    }];
}); // Add more to test them
