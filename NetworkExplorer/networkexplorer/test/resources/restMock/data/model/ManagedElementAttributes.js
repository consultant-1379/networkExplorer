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
                'description': 'The value component of the RDN.\n\nIt is set automatically when the MO instance is created.\n',
                'immutable': true,
                'key': 'ManagedElementId',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Specifies configuration data critical for an application.',
                'immutable': false,
                'key': 'applicationConfiguration',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
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
                'description': 'DN prefix information. Specified only if the instance of the ManagedElement MO is a local root instance of the MIB, otherwise it is set to NULL.',
                'immutable': false,
                'key': 'dnPrefix',
                'type': 'STRING',
                'writeBehavior': 'INHERITED',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Retrieves information of PIUs (maximum 2 PIUs) that are running Fault Tolerant Core (FTC). This attribute contains an array of strings, for example:\n\nManagedElement=1,Equipment=1,Subrack=1,Slot=1,PlugInUnit=1;ftcState=Active\nManagedElement=1,Equipment=1,Subrack=1,Slot=2,PlugInUnit=1;ftcState=PassiveReady\n\nThe possible FTC states are Init, NotConfigured, Active, Unavailable, PassiveNotReady, PassiveReady.\n',
                'immutable': false,
                'key': 'faultTolerantCoreStates',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'validContentRegex': null,
                                'valueRangeConstraints': null
                            },
                            'defaultValue': null,
                            'description': 'Provides additional results.\n\nThe initial value is an emtpy string (""). Currently not used.',
                            'immutable': false,
                            'key': 'message',
                            'type': 'STRING',
                            'writeBehavior': null,
                            'namespaceversions': [
                                {
                                    'CPP_NODE_MODEL': [
                                        '14.143.4',
                                        '15.148.2',
                                        '14.143.3',
                                        '14.125.5',
                                        '13.98.16'
                                    ]
                                }
                            ]
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'validContentRegex': null,
                                'valueRangeConstraints': null
                            },
                            'defaultValue': null,
                            'description': 'The time the health check starts.\n\nFormat:  yyyy:MM:dd HH:mm\n\nThe initial value is an empty string ("").',
                            'immutable': false,
                            'key': 'startTime',
                            'type': 'STRING',
                            'writeBehavior': null,
                            'namespaceversions': [
                                {
                                    'CPP_NODE_MODEL': [
                                        '14.143.4',
                                        '15.148.2',
                                        '14.143.3',
                                        '14.125.5',
                                        '13.98.16'
                                    ]
                                }
                            ]
                        },
                        {
                            'constraints': null,
                            'defaultValue': null,
                            'description': 'The result of the health check.',
                            'enumeration': {
                                'description': 'HealthCheckResultCode',
                                'enumMembers': [
                                    {
                                        'description': 'The health check has passed.\n\nAll file systems, configuration versions and upgrade packages are OK.',
                                        'key': 'OK',
                                        'value': 0
                                    },
                                    {
                                        'description': 'The health check has found one or more errors, see the alarms:\n- File System Diagnostic Error\n- Configuration Version Corrupt\n- Upgrade Package Corrupt\n\nOne alarm per error and MO is raised.',
                                        'key': 'NOT_OK',
                                        'value': 1
                                    },
                                    {
                                        'description': 'The health check is aborted, since a PlugInUnit MO is not responding.',
                                        'key': 'ABORTED',
                                        'value': 2
                                    },
                                    {
                                        'description': 'The health check is aborted, since a PlugInUnit MO is not responding.\n\nThe health check has found one or more errors, see the alarms: \n- File System Diagnostic Error\n- Configuration Version Corrupt\n- Upgrade Package Corrupt\n\nOne alarm per error and MO is raised.',
                                        'key': 'ABORTED_NOT_OK',
                                        'value': 3
                                    },
                                    {
                                        'description': 'The health check is still in progress.',
                                        'key': 'HEALTH_CHECK_ONGOING',
                                        'value': 4
                                    },
                                    {
                                        'description': 'The health check has not been performed since the last node restart.',
                                        'key': 'INITIAL_VALUE',
                                        'value': 99
                                    }
                                ],
                                'key': 'HealthCheckResultCode'
                            },
                            'immutable': false,
                            'key': 'healthCheckResultCode',
                            'type': 'ENUM_REF',
                            'writeBehavior': null,
                            'namespaceversions': [
                                {
                                    'CPP_NODE_MODEL': [
                                        '14.143.4',
                                        '15.148.2',
                                        '14.143.3',
                                        '14.125.5',
                                        '13.98.16'
                                    ]
                                }
                            ]
                        }
                    ],
                    'description': 'HealthCheckResult',
                    'key': 'HealthCheckResult'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'The result of the latest health check.\n',
                'immutable': false,
                'key': 'healthCheckResult',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The scheduled time and weekday, when the health check starts.\n',
                'immutable': false,
                'key': 'healthCheckSchedule',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
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
                'description': 'The physical location of this entity e.g. an address.',
                'immutable': false,
                'key': 'locationName',
                'type': 'STRING',
                'writeBehavior': 'INHERITED',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 255,
                            'minValue': 0
                        }
                    ]
                },
                'defaultValue': null,
                'description': 'Specifies the logical name of a node.\n',
                'immutable': false,
                'key': 'logicalName',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
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
                'description': 'The Full Distinguished Name of the management node that manages this NE.',
                'immutable': false,
                'key': 'managedBy',
                'type': 'STRING',
                'writeBehavior': 'INHERITED',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'validContentRegex': null,
                                'valueRangeConstraints': null
                            },
                            'defaultValue': null,
                            'description': 'mimName',
                            'immutable': false,
                            'key': 'mimName',
                            'type': 'STRING',
                            'writeBehavior': null,
                            'namespaceversions': [
                                {
                                    'CPP_NODE_MODEL': [
                                        '14.143.4',
                                        '15.148.2',
                                        '14.143.3',
                                        '14.125.5',
                                        '13.98.16'
                                    ]
                                }
                            ]
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'validContentRegex': null,
                                'valueRangeConstraints': null
                            },
                            'defaultValue': null,
                            'description': 'mimRelease',
                            'immutable': false,
                            'key': 'mimRelease',
                            'type': 'STRING',
                            'writeBehavior': null,
                            'namespaceversions': [
                                {
                                    'CPP_NODE_MODEL': [
                                        '14.143.4',
                                        '15.148.2',
                                        '14.143.3',
                                        '14.125.5',
                                        '13.98.16'
                                    ]
                                }
                            ]
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'validContentRegex': null,
                                'valueRangeConstraints': null
                            },
                            'defaultValue': null,
                            'description': 'mimVersion',
                            'immutable': false,
                            'key': 'mimVersion',
                            'type': 'STRING',
                            'writeBehavior': null,
                            'namespaceversions': [
                                {
                                    'CPP_NODE_MODEL': [
                                        '14.143.4',
                                        '15.148.2',
                                        '14.143.3',
                                        '14.125.5',
                                        '13.98.16'
                                    ]
                                }
                            ]
                        }
                    ],
                    'description': 'MimInfo',
                    'key': 'MimInfo'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'The name, version and release of the MIM.\n',
                'immutable': false,
                'key': 'mimInfo',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
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
                'description': 'The name and version of the MIM on the node.\n',
                'immutable': false,
                'key': 'mimName',
                'type': 'STRING',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 12,
                            'minValue': 0
                        }
                    ]
                },
                'defaultValue': null,
                'description': 'This attribute describes the implemented functionality.\n',
                'immutable': false,
                'key': 'productName',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 24,
                            'minValue': 0
                        }
                    ]
                },
                'defaultValue': null,
                'description': 'This attribute uniquely identifies the product, for example ROF123.\n',
                'immutable': false,
                'key': 'productNumber',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 7,
                            'minValue': 0
                        }
                    ]
                },
                'defaultValue': null,
                'description': 'This attribute identifies the version of the product, for example R2A.\n',
                'immutable': false,
                'key': 'productRevision',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': 'Node',
                'description': 'This attribute describes the product type and is always set to the value "Node".\n',
                'immutable': true,
                'key': 'productType',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 255,
                            'minValue': 0
                        }
                    ]
                },
                'defaultValue': null,
                'description': 'This attribute gives information about geographical location, for example place name.\n',
                'immutable': false,
                'key': 'site',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
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
                'description': 'The software version of this MO.',
                'immutable': false,
                'key': 'swVersion',
                'type': 'STRING',
                'writeBehavior': 'INHERITED',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 128,
                            'minValue': 0
                        }
                    ]
                },
                'defaultValue': null,
                'description': 'Label for free use.\n',
                'immutable': false,
                'key': 'userLabel',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'CPP_NODE_MODEL': [
                        '14.143.4',
                        '15.148.2',
                        '14.143.3',
                        '14.125.5',
                        '13.98.16'
                    ]
                }
            }
        ],
        'moType': 'ManagedElement',
        'writeBehavior': 'INHERITED',
        'namespaceversions': [
            {
                'CPP_NODE_MODEL': [
                    '14.143.4',
                    '15.148.2',
                    '14.143.3',
                    '14.125.5',
                    '13.98.16'
                ]
            }
        ]
    };
});
