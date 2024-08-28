if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return {
        'attributes': [
            {
                'constraints': {
                    'nullable': false,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'The ID of this MeContext.',
                'immutable': true,
                'key': 'MeContextId',
                'type': 'STRING',
                'writeBehavior': 'INHERITED',
                'namespaceversions': {
                    'OSS_TOP': [
                        '2.0.0'
                    ]
                }
            },
            {
                'constraints': {
                    'nullable': false,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': -1,
                'description': 'Keeps track of notifications received from the Node. The initial value set at create is -1.',
                'immutable': false,
                'key': 'generationCounter',
                'type': 'LONG',
                'writeBehavior': 'INHERITED',
                'namespaceversions': {
                    'OSS_TOP': [
                        '2.0.0'
                    ]
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': 'SYNC_ON_DEMAND',
                'description': 'The time (YYYY-MM-DD HH:MM:SS) when the OSS lost synchronization with the node. When the node is synchronized, the value will be \'SYNCHRONIZED\' or if synchronization is not required the value will be \'SYNC_ON_DEMAND\'',
                'immutable': false,
                'key': 'lostSynchronization',
                'type': 'STRING',
                'writeBehavior': 'INHERITED',
                'namespaceversions': {
                    'OSS_TOP': [
                        '2.0.0'
                    ]
                }
            },
            {
                'constraints': null,
                'defaultValue': 'UNSYNCHRONIZED',
                'description': 'Mirror MIB synchronization status',
                'enumeration': {
                    'description': 'Indicates the synchronization status. SYNCING = 1 SYNCHRONIZED = 2 UNSYNCHRONIZED = 3',
                    'enumMembers': [
                        {
                            'description': 'synch status is SYNCING.',
                            'key': 'SYNCING',
                            'value': 1
                        },
                        {
                            'description': 'synch status is SYNCHRONIZED.',
                            'key': 'SYNCHRONIZED',
                            'value': 2
                        },
                        {
                            'description': 'synch status is UNSYNCHRONIZED.',
                            'key': 'UNSYNCHRONIZED',
                            'value': 3
                        }
                    ],
                    'key': 'SynchronizationStatus'
                },
                'immutable': false,
                'key': 'mirrorSynchronizationStatus',
                'type': 'ENUM_REF',
                'writeBehavior': 'INHERITED',
                'namespaceversions': {
                    'OSS_TOP': [
                        '2.0.0'
                    ]
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The NE Type of the NE this MeContext represents.',
                'enumeration': {
                    'description': 'Used to indicate the NeType',
                    'enumMembers': [
                        {
                            'description': 'NeType is ENODEB.',
                            'key': 'ENODEB',
                            'value': 1
                        }
                    ],
                    'key': 'NeType'
                },
                'immutable': false,
                'key': 'neType',
                'type': 'ENUM_REF',
                'writeBehavior': 'INHERITED',
                'namespaceversions': {
                    'OSS_TOP': [
                        '2.0.0'
                    ]
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'Provides support for putting a label on the MO instance.',
                'immutable': false,
                'key': 'userLabel',
                'type': 'STRING',
                'writeBehavior': 'INHERITED',
                'namespaceversions': {
                    'OSS_TOP': [
                        '2.0.0'
                    ]
                }
            }
        ],
        'moType': 'MeContext',
        'writeBehavior': 'PERSIST',
        'namespaceversions': {
            'OSS_TOP': [
                '2.0.0'
            ]
        }
    };
});
