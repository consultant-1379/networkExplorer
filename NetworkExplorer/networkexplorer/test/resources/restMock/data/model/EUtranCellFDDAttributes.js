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
                'description': 'The value component of the RDN.\n\n',
                'immutable': true,
                'key': 'EUtranCellFDDId',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 0,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 5,
                                        'minValue': 5
                                    },
                                    {
                                        'maxValue': 10,
                                        'minValue': 10
                                    },
                                    {
                                        'maxValue': 15,
                                        'minValue': 15
                                    },
                                    {
                                        'maxValue': 20,
                                        'minValue': 20
                                    },
                                    {
                                        'maxValue': 25,
                                        'minValue': 25
                                    },
                                    {
                                        'maxValue': 30,
                                        'minValue': 30
                                    },
                                    {
                                        'maxValue': 40,
                                        'minValue': 40
                                    },
                                    {
                                        'maxValue': 50,
                                        'minValue': 50
                                    },
                                    {
                                        'maxValue': 60,
                                        'minValue': 60
                                    },
                                    {
                                        'maxValue': 70,
                                        'minValue': 70
                                    },
                                    {
                                        'maxValue': 75,
                                        'minValue': 75
                                    },
                                    {
                                        'maxValue': 80,
                                        'minValue': 80
                                    },
                                    {
                                        'maxValue': 85,
                                        'minValue': 85
                                    },
                                    {
                                        'maxValue': 90,
                                        'minValue': 90
                                    },
                                    {
                                        'maxValue': 95,
                                        'minValue': 95
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 95,
                            'description': 'If the random number drawn by the UE is lower than this value, access is allowed. Otherwise the access is barred.',
                            'immutable': false,
                            'key': 'acBarringFactor',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': [
                                false,
                                false,
                                false,
                                false,
                                false
                            ],
                            'description': 'Access class barring for AC 11-15. The first instance in the list is for AC 11, second is for AC 12, and so on.',
                            'immutable': false,
                            'key': 'acBarringForSpecialAC',
                            'type': 'LIST',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 4,
                                        'minValue': 4
                                    },
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'Mean access barring time in seconds for mobile originating signalling.',
                            'immutable': false,
                            'key': 'acBarringTime',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'AcBarringConfig',
                    'key': 'AcBarringConfig'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Access class barring parameters for mobile originating CSFB calls.\n\nThe information is broadcasted in SIB2.',
                'immutable': false,
                'key': 'acBarringForCsfb',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Specifies presence of ac-BarringForCSFB in SIB2.',
                'immutable': false,
                'key': 'acBarringForCsfbPresent',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Access class barring for AC 10',
                'immutable': false,
                'key': 'acBarringForEmergency',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 0,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 5,
                                        'minValue': 5
                                    },
                                    {
                                        'maxValue': 10,
                                        'minValue': 10
                                    },
                                    {
                                        'maxValue': 15,
                                        'minValue': 15
                                    },
                                    {
                                        'maxValue': 20,
                                        'minValue': 20
                                    },
                                    {
                                        'maxValue': 25,
                                        'minValue': 25
                                    },
                                    {
                                        'maxValue': 30,
                                        'minValue': 30
                                    },
                                    {
                                        'maxValue': 40,
                                        'minValue': 40
                                    },
                                    {
                                        'maxValue': 50,
                                        'minValue': 50
                                    },
                                    {
                                        'maxValue': 60,
                                        'minValue': 60
                                    },
                                    {
                                        'maxValue': 70,
                                        'minValue': 70
                                    },
                                    {
                                        'maxValue': 75,
                                        'minValue': 75
                                    },
                                    {
                                        'maxValue': 80,
                                        'minValue': 80
                                    },
                                    {
                                        'maxValue': 85,
                                        'minValue': 85
                                    },
                                    {
                                        'maxValue': 90,
                                        'minValue': 90
                                    },
                                    {
                                        'maxValue': 95,
                                        'minValue': 95
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 95,
                            'description': 'If the random number drawn by the UE is lower than this value, access is allowed. Otherwise the access is barred.',
                            'immutable': false,
                            'key': 'acBarringFactor',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': [
                                false,
                                false,
                                false,
                                false,
                                false
                            ],
                            'description': 'Access class barring for AC 11-15. The first instance in the list is for AC 11, second is for AC 12, and so on.',
                            'immutable': false,
                            'key': 'acBarringForSpecialAC',
                            'type': 'LIST',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 4,
                                        'minValue': 4
                                    },
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'Mean access barring time in seconds for mobile originating signalling.',
                            'immutable': false,
                            'key': 'acBarringTime',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'AcBarringConfig',
                    'key': 'AcBarringConfig'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Access class barring parameters for mobile originating calls.\n\nThe information in broadcasted in SIB2.',
                'immutable': false,
                'key': 'acBarringForMoData',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Specifies presence of Information Element ac-BarringForMO-Data in SIB2.',
                'immutable': false,
                'key': 'acBarringForMoDataPresent',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 0,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 5,
                                        'minValue': 5
                                    },
                                    {
                                        'maxValue': 10,
                                        'minValue': 10
                                    },
                                    {
                                        'maxValue': 15,
                                        'minValue': 15
                                    },
                                    {
                                        'maxValue': 20,
                                        'minValue': 20
                                    },
                                    {
                                        'maxValue': 25,
                                        'minValue': 25
                                    },
                                    {
                                        'maxValue': 30,
                                        'minValue': 30
                                    },
                                    {
                                        'maxValue': 40,
                                        'minValue': 40
                                    },
                                    {
                                        'maxValue': 50,
                                        'minValue': 50
                                    },
                                    {
                                        'maxValue': 60,
                                        'minValue': 60
                                    },
                                    {
                                        'maxValue': 70,
                                        'minValue': 70
                                    },
                                    {
                                        'maxValue': 75,
                                        'minValue': 75
                                    },
                                    {
                                        'maxValue': 80,
                                        'minValue': 80
                                    },
                                    {
                                        'maxValue': 85,
                                        'minValue': 85
                                    },
                                    {
                                        'maxValue': 90,
                                        'minValue': 90
                                    },
                                    {
                                        'maxValue': 95,
                                        'minValue': 95
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 95,
                            'description': 'If the random number drawn by the UE is lower than this value, access is allowed. Otherwise the access is barred.',
                            'immutable': false,
                            'key': 'acBarringFactor',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': [
                                false,
                                false,
                                false,
                                false,
                                false
                            ],
                            'description': 'Access class barring for AC 11-15. The first instance in the list is for AC 11, second is for AC 12, and so on.',
                            'immutable': false,
                            'key': 'acBarringForSpecialAC',
                            'type': 'LIST',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 4,
                                        'minValue': 4
                                    },
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'Mean access barring time in seconds for mobile originating signalling.',
                            'immutable': false,
                            'key': 'acBarringTime',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'AcBarringConfig',
                    'key': 'AcBarringConfig'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Access class barring parameters for mobile originating signalling.\n\nThe information in broadcasted in SIB2.',
                'immutable': false,
                'key': 'acBarringForMoSignalling',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Specifies presence of Information Element ac-BarringForMO-Signalling in SIB2.',
                'immutable': false,
                'key': 'acBarringForMoSignallingPresent',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 0,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 5,
                                        'minValue': 5
                                    },
                                    {
                                        'maxValue': 10,
                                        'minValue': 10
                                    },
                                    {
                                        'maxValue': 15,
                                        'minValue': 15
                                    },
                                    {
                                        'maxValue': 20,
                                        'minValue': 20
                                    },
                                    {
                                        'maxValue': 25,
                                        'minValue': 25
                                    },
                                    {
                                        'maxValue': 30,
                                        'minValue': 30
                                    },
                                    {
                                        'maxValue': 40,
                                        'minValue': 40
                                    },
                                    {
                                        'maxValue': 50,
                                        'minValue': 50
                                    },
                                    {
                                        'maxValue': 60,
                                        'minValue': 60
                                    },
                                    {
                                        'maxValue': 70,
                                        'minValue': 70
                                    },
                                    {
                                        'maxValue': 75,
                                        'minValue': 75
                                    },
                                    {
                                        'maxValue': 80,
                                        'minValue': 80
                                    },
                                    {
                                        'maxValue': 85,
                                        'minValue': 85
                                    },
                                    {
                                        'maxValue': 90,
                                        'minValue': 90
                                    },
                                    {
                                        'maxValue': 95,
                                        'minValue': 95
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 95,
                            'description': 'If the random number drawn by the UE is lower than this value, access is allowed. Otherwise the access is barred. The values are interpreted in the range [0,1]: 0 = 0, 5 = 0.05, 10 = 0.10,. .,95 = 0.95.',
                            'immutable': false,
                            'key': 'acBarringFactorForMoData',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Boolean for declaring presence of access barring information.',
                            'immutable': false,
                            'key': 'acBarringInfoPresent',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': [
                                false,
                                false,
                                false,
                                false,
                                false
                            ],
                            'description': 'Access class barring for AC 11-15. The first instance in the list is for AC 11, second is for AC 12, and so on.',
                            'immutable': false,
                            'key': 'acBarringSpecialAcForMoSignalling',
                            'type': 'LIST',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 0,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 5,
                                        'minValue': 5
                                    },
                                    {
                                        'maxValue': 10,
                                        'minValue': 10
                                    },
                                    {
                                        'maxValue': 15,
                                        'minValue': 15
                                    },
                                    {
                                        'maxValue': 20,
                                        'minValue': 20
                                    },
                                    {
                                        'maxValue': 25,
                                        'minValue': 25
                                    },
                                    {
                                        'maxValue': 30,
                                        'minValue': 30
                                    },
                                    {
                                        'maxValue': 40,
                                        'minValue': 40
                                    },
                                    {
                                        'maxValue': 50,
                                        'minValue': 50
                                    },
                                    {
                                        'maxValue': 60,
                                        'minValue': 60
                                    },
                                    {
                                        'maxValue': 70,
                                        'minValue': 70
                                    },
                                    {
                                        'maxValue': 75,
                                        'minValue': 75
                                    },
                                    {
                                        'maxValue': 80,
                                        'minValue': 80
                                    },
                                    {
                                        'maxValue': 85,
                                        'minValue': 85
                                    },
                                    {
                                        'maxValue': 90,
                                        'minValue': 90
                                    },
                                    {
                                        'maxValue': 95,
                                        'minValue': 95
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 95,
                            'description': 'If the random number drawn by the UE is lower than this value, access is allowed. Otherwise the access is barred. The values are interpreted in the range [0,1]: 0 = 0, 5 = 0.05, 10 = 0.10,. .,95 = 0.95.',
                            'immutable': false,
                            'key': 'acBarringFactorForMoSignalling',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 4,
                                        'minValue': 4
                                    },
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'Mean access barring time in seconds for mobile originating signalling.',
                            'immutable': false,
                            'key': 'acBarringTimeForMoData',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 4,
                                        'minValue': 4
                                    },
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'Mean access barring time.',
                            'immutable': false,
                            'key': 'acBarringTimeForMoSignalling',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Boolean for declaring presence of access barring mobile originating data information.',
                            'immutable': false,
                            'key': 'acBarringMoDataPresent',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Boolean for declaring presence of access barring signalling information.',
                            'immutable': false,
                            'key': 'acBarringMoSignallingPresent',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Access class barring for AC 10.',
                            'immutable': false,
                            'key': 'acBarringForEmergency',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': [
                                false,
                                false,
                                false,
                                false,
                                false
                            ],
                            'description': 'Access class barring for AC 11-15. The first instance in the list is for AC 11, second is for AC 12, and so on.',
                            'immutable': false,
                            'key': 'acBarringSpecialAcForMoData',
                            'type': 'LIST',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'Deprecated: Since L12B. Replaced by attributes on cell level. See struct members of struct AcBarringInfo for details.',
                    'key': 'AcBarringInfo'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Contains all access barring information.',
                'immutable': false,
                'key': 'acBarringInfo',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Specifies presence of Information Element ac-BarringInfo in SIB2.',
                'immutable': false,
                'key': 'acBarringInfoPresent',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Lists the PLMN IDs served by at least one MME. The PLMN ID is defined in the attribute eNodeBPlmnId in the parent ENodeBFunction. PLMN IDs from additionalPlmnList also appear in this list. The list may include up to 6 PLMNs.',
                'immutable': false,
                'key': 'activePlmnList',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Lists additional PLMN IDs supported in the cell.\n\n\n\nThe list may include up to 5 PLMNs, and they must be the same in all EUtranCells in the node.',
                'immutable': false,
                'key': 'additionalPlmnList',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': [
                    false,
                    false,
                    false,
                    false,
                    false
                ],
                'description': 'For the list of PLMN IDs in the cell, indicates if they are reserved for operator use. The list must have the same number of entries as additonalPlmnList. The PLMN ID appearing in additionalPlmnList[x] is reserved when additionalPlmnListReserved[x] is set to true.',
                'immutable': false,
                'key': 'additionalPlmnReservedList',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'LOCKED',
                'description': 'The administrative state.\n\n',
                'enumeration': {
                    'description': 'AdminState',
                    'enumMembers': [
                        {
                            'description': 'The resource is administratively prohibited from performing services for its users.',
                            'key': 'LOCKED',
                            'value': 0
                        },
                        {
                            'description': 'The resource is administratively permitted to perform services for its users. This is independent of its inherent operability.',
                            'key': 'UNLOCKED',
                            'value': 1
                        },
                        {
                            'description': 'Use of the resource is administratively permitted to existing instances of use only. While the system remains in the shutting down state the manager may at any time cause the managed object to revert to the unlocked state.',
                            'key': 'SHUTTING_DOWN',
                            'value': 2
                        }
                    ],
                    'key': 'AdminState'
                },
                'immutable': false,
                'key': 'administrativeState',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'NO_ACTION',
                'description': 'Controls which recovery actions to be performed when ACS detects a sleeping cell.',
                'enumeration': {
                    'description': 'AdvCellSupActions',
                    'enumMembers': [
                        {
                            'description': 'No recovery action is allowed',
                            'key': 'NO_ACTION',
                            'value': 0
                        },
                        {
                            'description': 'Cell restart action is allowed',
                            'key': 'CELL_RESTART',
                            'value': 1
                        },
                        {
                            'description': 'Cell restart and Node restart actions are allowed.',
                            'key': 'CELL_AND_NODE_RESTART',
                            'value': 2
                        }
                    ],
                    'key': 'AdvCellSupActions'
                },
                'immutable': false,
                'key': 'advCellSupAction',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'Indicates the sensitivity of the Advanced Cell Supervision function. A higher value will make ACS detect a sleeping cell faster, but with higher risk for false detection. A lower value will make ACS detect a sleeping cell slower, but with lower risk for false detection.',
                'immutable': false,
                'key': 'advCellSupSensitivity',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Indicates if the feature A-GPS Support in SUPL Environment is ACTIVATED or DEACTIVATED in the cell.',
                'immutable': false,
                'key': 'agpsSuplActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': null,
                'description': 'The state of the feature Air Interface Load Generator. Indicates if it is running or stopped.',
                'immutable': false,
                'key': 'ailgActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Refers to an instance of AirIfLoadProfile. Assigns a AirIfLoadProfile to a cell.',
                'immutable': false,
                'key': 'ailgRef',
                'type': 'MO_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 32767,
                            'minValue': -32768
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'The altitude of the transmitter antenna in meters. Use +/- values to denote height/depth.\n\nIn case of Combined Cell (multi-sector cell):\n\n   For indoor system, antenna of any sector. \n\n   For outdoor system,antenna of macro sector.',
                'immutable': false,
                'key': 'altitude',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'HEIGHT',
                'description': 'The antenna altitude direction. Valid values are HEIGHT and DEPTH.',
                'enumeration': {
                    'description': 'AltDirVals',
                    'enumMembers': [
                        {
                            'description': 'HEIGHT',
                            'key': 'HEIGHT',
                            'value': 0
                        },
                        {
                            'description': 'DEPTH',
                            'key': 'DEPTH',
                            'value': 1
                        }
                    ],
                    'key': 'AltDirVals'
                },
                'immutable': false,
                'key': 'altitudeDir',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The availability status. It contains details about operationalState. This attribute is set by the application in the RBS.\n\n',
                'enumeration': {
                    'description': 'Indicates possible status values of a corresponding availabilityStatus attribute. Since more than one status may be present at the same time while only one is shown, they are shown in the following order of priority (highest first):\n\nNOT_INSTALLED\nPOWER_OFF\nIN_TEST\nDEPENDENCY_LOCKED\nDEPENDENCY_FAILED\nFAILED\nOFF_LINE\nDEGRADED\nOFF_DUTY\nLOG_FULL\nNO_STATUS',
                    'enumMembers': [
                        {
                            'description': 'No other availability status for this resource is currently present.',
                            'key': 'NO_STATUS',
                            'value': 0
                        },
                        {
                            'description': 'The resource has been made inactive by some internal control process in accordance with a predetermined time schedule. Under normal conditions the control process can be expected to reactivate the resource at some scheduled time, and it is therefore considered to be optional. The operational state is enabled or disabled.',
                            'key': 'OFF_DUTY',
                            'value': 16
                        },
                        {
                            'description': 'The resource is undergoing a test procedure. Tests that do not exclude additional users can be present in any operational state or administrative state.',
                            'key': 'IN_TEST',
                            'value': 1
                        },
                        {
                            'description': 'The administrative state of a resource that this resource depends on is shutting down or the availability status of the other resource is dependency shutting down. The operational state is disabled.',
                            'key': 'DEPENDENCY_SHUTTINGDOWN',
                            'value': 2080
                        },
                        {
                            'description': 'This indicates a log full condition. Currently not used.',
                            'key': 'LOG_FULL',
                            'value': 256
                        },
                        {
                            'description': 'The resource has an internal fault that prevents it from operating. The operational state is disabled.',
                            'key': 'FAILED',
                            'value': 2
                        },
                        {
                            'description': 'The service available from the resource is degraded in some respect, such as in speed or operating capacity. However, the resource remains available for service, either because some services are satisfactory or because degraded service is preferable to no service at all. The operational state is enabled.',
                            'key': 'DEGRADED',
                            'value': 64
                        },
                        {
                            'description': 'The resource requires power to be applied and is not powered on. The operational state is disabled.',
                            'key': 'POWER_OFF',
                            'value': 4
                        },
                        {
                            'description': 'The administrative state of a resource that this resource depends on is locked or the availability status of the other resource is dependency locked. The operational state is disabled.',
                            'key': 'DEPENDENCY_LOCKED',
                            'value': 544
                        },
                        {
                            'description': 'The resource requires a routine operation to be performed to place it online and make it available for use. The operation may be manual, automatic, or both. The operational state is disabled or enabled.',
                            'key': 'OFF_LINE',
                            'value': 8
                        },
                        {
                            'description': 'The resource represented by the managed object is not present, or is incomplete. For example, a plug-in unit is missing, a cable is disconnected, or a software module is not loaded. The operational state is disabled.',
                            'key': 'NOT_INSTALLED',
                            'value': 128
                        },
                        {
                            'description': 'The availability status of a resource that this resource depends on is failed or dependency failed. The operational state is disabled.',
                            'key': 'DEPENDENCY_FAILED',
                            'value': 1056
                        }
                    ],
                    'key': 'AvailabilityStatus'
                },
                'immutable': false,
                'key': 'availabilityStatus',
                'type': 'ENUM_REF',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The Public Land Mobile Network (PLMN) ID of the cell.\n\n\n\nThe PLMN ID consists of:\n\n\n\n1. MobileCountryCode, MCC, 3 digits\n\n2. MobileNetworkCode, MNC, 2 or 3 digits (the correct number of digits is set in the mncLength member of this Struct)\n\n\n\nExample: If MCC=125 and MNC=46, then plmnId=12546.',
                'immutable': false,
                'key': 'bPlmnList',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The actual type of CDMA2000 system time that is broadcast in SIB8.',
                'enumeration': {
                    'description': 'Cdma2000SysTimeVals',
                    'enumMembers': [
                        {
                            'description': 'NONE',
                            'key': 'NONE',
                            'value': 0
                        },
                        {
                            'description': 'SYNCHRONOUS',
                            'key': 'SYNCHRONOUS',
                            'value': 1
                        },
                        {
                            'description': 'ASYNCHRONOUS',
                            'key': 'ASYNCHRONOUS',
                            'value': 2
                        }
                    ],
                    'key': 'Cdma2000SysTimeVals'
                },
                'immutable': false,
                'key': 'bcCdma2000SysTimeType',
                'type': 'ENUM_REF',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'NOT_BARRED',
                'description': 'Indicates if the cell is barred and should not be accessible to random UEs.',
                'enumeration': {
                    'description': 'CellBarred',
                    'enumMembers': [
                        {
                            'description': 'BARRED',
                            'key': 'BARRED',
                            'value': 0
                        },
                        {
                            'description': 'NOT_BARRED',
                            'key': 'NOT_BARRED',
                            'value': 1
                        }
                    ],
                    'key': 'CellBarred'
                },
                'immutable': false,
                'key': 'cellBarred',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': false,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 255,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'RBS internal ID attribute for EUtranCell. Must be unique in the RBS. Together with the Node ID and Public Land Mobile Network (PLMN) this is a universally unique cell ID.\n\n\n\nRange 0-255.',
                'immutable': true,
                'key': 'cellId',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 15,
                'description': 'Defines the maximum distance from the base station where a connection to a UE can be setup and/or maintained.\n\n',
                'immutable': false,
                'key': 'cellRange',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': [
                    'NOT_RESERVED'
                ],
                'description': 'Indicates if the cell is reserved for operator use.\n\n\n\nThe first index is for the primary Public Land Mobile Network (PLMN) of the cell.',
                'immutable': false,
                'key': 'cellReservedForOperatorUse',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 1000000,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 1000,
                'description': 'Normalized subscription capacity of the cell. The value represents the total capacity of the cell used for traffic load balancing purposes.',
                'immutable': false,
                'key': 'cellSubscriptionCapacity',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'This parameter controls if Contention Free Random Access (CFRA, known as non-contention based random access in 3GPP term) shall be enabled or not. When enabled, a portion of random access preambles should be allocated for CFRA and CFRA can be used for incmoing HO and PDCCH ordered uplink re-sync.',
                'immutable': false,
                'key': 'cfraEnable',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Indicates, when the SIB7 content is changed, if SI Change Notification shall be broadcasted prior to broadcast of updated SI.',
                            'immutable': false,
                            'key': 'changeNotificationSIB7',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Indicates, when the SIB8 content is changed, if SI Change Notification shall be broadcasted prior to broadcast of updated SI.',
                            'immutable': false,
                            'key': 'changeNotificationSIB8',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Indicates, when the SIB6 content is changed, if SI Change Notification shall be broadcasted prior to broadcast of updated SI.',
                            'immutable': false,
                            'key': 'changeNotificationSIB6',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Indicates, when the SIB4 content is changed, if SI Change Notification shall be broadcasted prior to broadcast of updated SI.',
                            'immutable': false,
                            'key': 'changeNotificationSIB4',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Indicates, when the SIB5 content is changed, if SI Change Notification shall be broadcasted prior to broadcast of updated SI.',
                            'immutable': false,
                            'key': 'changeNotificationSIB5',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Indicates, when the SIB3 content is changed, if SI Change Notification shall be broadcasted prior to broadcast of updated SI.',
                            'immutable': false,
                            'key': 'changeNotificationSIB3',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Indicates, when the SIB1 content is changed, if SI Change Notification shall be broadcasted prior to broadcast of updated SI.',
                            'immutable': false,
                            'key': 'changeNotificationSIB1',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Indicates, when the SIB2 content is changed, if SI Change Notification shall be broadcasted prior to broadcast of updated SI.',
                            'immutable': false,
                            'key': 'changeNotificationSIB2',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'ChangeNotificationSIBs',
                    'key': 'ChangeNotificationSIBs'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'For each System Information Block (SIB), indicates when the SIB content is changed, if system information change notification is broadcast prior to broadcast of updated system information.',
                'immutable': false,
                'key': 'changeNotification',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 5,
                            'minValue': 5
                        },
                        {
                            'maxValue': 10,
                            'minValue': 10
                        },
                        {
                            'maxValue': 20,
                            'minValue': 20
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 10,
                'description': 'Common SR periodicity, used for all UEs.',
                'immutable': false,
                'key': 'commonSrPeriodicity',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 100,
                'description': 'Percentage of confidence that the target device is within the ellipsoid defined by the three axes of uncertainty: semi-major, semi-minor, and altitude.',
                'immutable': false,
                'key': 'confidence',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'The start frequency offset for allocating resources when the downlink interference management is disabled. Expressed as a percentage of the available bandwidth.',
                'immutable': false,
                'key': 'configurableFrequencyStart',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': true,
                'description': 'Says whether a blind Handover from this cell can be initiated when a UE reports bad coverage, or not. Note that even if the value is True, the eNB will only initate a blind handover if it finds a suitable cell.',
                'immutable': false,
                'key': 'covTriggerdBlindHoAllowed',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 1400,
                            'minValue': 1400
                        },
                        {
                            'maxValue': 3000,
                            'minValue': 3000
                        },
                        {
                            'maxValue': 5000,
                            'minValue': 5000
                        },
                        {
                            'maxValue': 10000,
                            'minValue': 10000
                        },
                        {
                            'maxValue': 15000,
                            'minValue': 15000
                        },
                        {
                            'maxValue': 20000,
                            'minValue': 20000
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 10000,
                'description': 'The downlink channel bandwidth in the cell.\n\n\n\nValid values: 1400, 3000, 5000, 10000, 15000, 20000',
                'immutable': false,
                'key': 'dlChannelBandwidth',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'Specifies the start frequency offset for the allocation of resources when the downlink interference management is disabled expressed as a percentage of the configured bandwidth.',
                'immutable': false,
                'key': 'dlConfigurableFrequencyStart',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 100,
                'description': 'Specifies the amount of frequency resources that is allocated in DL expressed as a percentage of the configured bandwidth.',
                'immutable': false,
                'key': 'dlFrequencyAllocationProportion',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Specifies if the downlink interference management is enabled or disabled.',
                'immutable': false,
                'key': 'dlInterferenceManagementActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Indicates if the DRX function in the cell is activated.',
                'immutable': false,
                'key': 'drxActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': false,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 17999,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The channel number for the central downlink frequency. The mapping from channel number to physical frequency for specified E-UTRA bands is described in 3GPP TS 36.104. The values that can be used depend on national, operator-specific frequency allocation as well as on the supported frequency band(s) in the RBS.\n\n\n\nNote: Use the MO-action changeFrequency if the DL frequency shall be changed after the cell is initally setup. This attribute is dependent on and set together with earfcnul, the values are dependent and relate accoring to the form earfcnul=earfcndl+18000.\n\n\n\n\n\n',
                'immutable': true,
                'key': 'earfcndl',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': false,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 35999,
                            'minValue': 18000
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The channel number for the central uplink frequency. The mapping from channel number to physical frequency for specified E-UTRA bands is described in 3GPP TS 36.104. The values that can be used depend on national, operator specific frequency allocation as well as on the supported frequency band(s) of the RBS.\n\n\n\nNote: This attribute is dependent on and set together with earfcndl, the values are dependent and relate accoring to the form earfcnul=earfcndl+18000.\n\n\n\n',
                'immutable': false,
                'key': 'earfcnul',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': [
                    -1,
                    -1,
                    -1,
                    -1
                ],
                'description': 'A cell supporting broadcast of warning messages may belong to one to four Emergency Areas. Such an area is identified by an Emergency Area Id, set by the operator.  Value -1 means identity not set.',
                'immutable': false,
                'key': 'emergencyAreaId',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 3599,
                                        'minValue': -1
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': -1,
                            'description': 'Defines the cell bearing in deci-degrees clockwise from north.',
                            'immutable': false,
                            'key': 'posCellBearing',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 3599,
                                        'minValue': -1
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': -1,
                            'description': 'Defines the opening angle of a cell (3 dB beam width) in deci-degrees. \n\n\n\nThe value 0 is used to define an omni cell.',
                            'immutable': false,
                            'key': 'posCellOpeningAngle',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 100000,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 0,
                            'description': 'Defines the cell radius in meters.',
                            'immutable': false,
                            'key': 'posCellRadius',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'EutranCellArea',
                    'key': 'EutranCellArea'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Models the cell coverage area used for UE positioning. The cell coverage area is defined by the cell bearing, cell opening angle and cell radius.\n\n\n\nThis attribute has no operational impact.',
                'immutable': false,
                'key': 'eutranCellCoverage',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Models the manageable characteristics for the cell polygon used for UE positioning. Each polygon corner is described by a latitude and longitude pair. Each polygon corner is represented with one position in the sequence. The other configured polygon corners follow in sequence. There must at least be three corners configured in a polygon when the function is active/used. The points shall be connected in the order that they are given. The last point is connected to the first point.',
                'immutable': false,
                'key': 'eutranCellPolygon',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Reference to a ExternalCdma20001xRttCell',
                'immutable': false,
                'key': 'externalCdma20001xRttCellRef',
                'type': 'MO_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 6,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 0,
                            'description': 'Frame synch offset measured in symbols.',
                            'immutable': false,
                            'key': 'symbolOffset',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 6,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 0,
                            'description': 'Frame synch offset measured in subframes.',
                            'immutable': false,
                            'key': 'subFrameOffset',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 70000,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 0,
                            'description': 'Frame synch offset measured in nano seconds.',
                            'immutable': false,
                            'key': 'timeOffset',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'FrameStartOffset',
                    'key': 'FrameStartOffset'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'The frame start offset of the cell.\n\n',
                'immutable': false,
                'key': 'frameStartOffset',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 4294967295,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The decimal part of the GPS time for the most recent occurrence of System Frame Number (SFN )=0 in the cell.',
                'immutable': false,
                'key': 'gpsTimeSFN0DecimalSecond',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 4294967295,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The integer part of the GPS time for the most recent occurrence of SFN=0 in the cell.',
                'immutable': false,
                'key': 'gpsTimeSFN0Seconds',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Indicates if the feature High Speed UE is activated in the cell',
                'immutable': false,
                'key': 'highSpeedUEActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Shows the DU on which baseband processing for the cell is located',
                'immutable': false,
                'key': 'hostingDigitalUnit',
                'type': 'MO_REF',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'NONE',
                'description': 'Intended type of CDMA2000 system time to broadcast in SIB8, if applicable.',
                'enumeration': {
                    'description': 'Cdma2000SysTimeVals',
                    'enumMembers': [
                        {
                            'description': 'NONE',
                            'key': 'NONE',
                            'value': 0
                        },
                        {
                            'description': 'SYNCHRONOUS',
                            'key': 'SYNCHRONOUS',
                            'value': 1
                        },
                        {
                            'description': 'ASYNCHRONOUS',
                            'key': 'ASYNCHRONOUS',
                            'value': 2
                        }
                    ],
                    'key': 'Cdma2000SysTimeVals'
                },
                'immutable': false,
                'key': 'initCdma2000SysTimeType',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'OPERATOR',
                'description': 'Indicates whether the MO was last modified by the operator or if the MO has been modified by the PCI conflict detection application.',
                'enumeration': {
                    'description': 'LastModificationSourceCell',
                    'enumMembers': [
                        {
                            'description': 'OPERATOR',
                            'key': 'OPERATOR',
                            'value': 0
                        },
                        {
                            'description': 'PCI_MODIFICATION',
                            'key': 'PCI_MODIFICATION',
                            'value': 1
                        },
                        {
                            'description': 'RACH_OPT_MODIFICATION',
                            'key': 'RACH_OPT_MODIFICATION',
                            'value': 2
                        },
                        {
                            'description': 'OSS_PCI_MODIFICATION',
                            'key': 'OSS_PCI_MODIFICATION',
                            'value': 3
                        }
                    ],
                    'key': 'LastModificationSourceCell'
                },
                'immutable': false,
                'key': 'lastModification',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 90000000,
                            'minValue': -90000000
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'The degree of latitude of the transmitter antenna position.\n\nIn case of Combined Cell (multi-sector cell):\n\n   For indoor system, antenna of any sector. \n\n   For outdoor system,antenna of macro sector.',
                'immutable': false,
                'key': 'latitude',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'NORTH',
                'description': 'The latitude of the transmitter antenna position. Valid values are NORTH and SOUTH.',
                'enumeration': {
                    'description': 'LatDirVals',
                    'enumMembers': [
                        {
                            'description': 'NORTH',
                            'key': 'NORTH',
                            'value': 0
                        },
                        {
                            'description': 'SOUTH',
                            'key': 'SOUTH',
                            'value': 1
                        }
                    ],
                    'key': 'LatDirVals'
                },
                'immutable': false,
                'key': 'latitudeDir',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 1600,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 100,
                'description': 'Threshold for eNodeB\n\nThe value applies for offload towards UTRAN target cells. The eNodeB attempts to offload traffic from the source cell corresponding to the subscription ratio above the threshold.',
                'immutable': false,
                'key': 'lbUtranOffloadThreshold',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 180000000,
                            'minValue': -180000000
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'The degree of longitude of the transmitter antenna position.\n\nIn case of Combined Cell (multi-sector cell):\n\n   For indoor system, antenna of any sector. \n\n   For outdoor system,antenna of macro sector.',
                'immutable': false,
                'key': 'longitude',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': null,
                            'defaultValue': 'MAPPED_SI_1',
                            'description': 'Defines to which SI message SIB3 is mapped',
                            'enumeration': {
                                'description': 'MappingInfo',
                                'enumMembers': [
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx"  is not mapped to any SI message and will not be broadcast.',
                                        'key': 'NOT_MAPPED',
                                        'value': 0
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 1',
                                        'key': 'MAPPED_SI_1',
                                        'value': 1
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 2',
                                        'key': 'MAPPED_SI_2',
                                        'value': 2
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 3',
                                        'key': 'MAPPED_SI_3',
                                        'value': 3
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 4',
                                        'key': 'MAPPED_SI_4',
                                        'value': 4
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 5',
                                        'key': 'MAPPED_SI_5',
                                        'value': 5
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 6',
                                        'key': 'MAPPED_SI_6',
                                        'value': 6
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 7',
                                        'key': 'MAPPED_SI_7',
                                        'value': 7
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 8',
                                        'key': 'MAPPED_SI_8',
                                        'value': 8
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 9',
                                        'key': 'MAPPED_SI_9',
                                        'value': 9
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 10',
                                        'key': 'MAPPED_SI_10',
                                        'value': 10
                                    }
                                ],
                                'key': 'MappingInfo'
                            },
                            'immutable': false,
                            'key': 'mappingInfoSIB3',
                            'type': 'ENUM_REF',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': 'NOT_MAPPED',
                            'description': 'Defines to which SI message SIB12 is mapped',
                            'enumeration': {
                                'description': 'MappingInfo',
                                'enumMembers': [
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx"  is not mapped to any SI message and will not be broadcast.',
                                        'key': 'NOT_MAPPED',
                                        'value': 0
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 1',
                                        'key': 'MAPPED_SI_1',
                                        'value': 1
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 2',
                                        'key': 'MAPPED_SI_2',
                                        'value': 2
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 3',
                                        'key': 'MAPPED_SI_3',
                                        'value': 3
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 4',
                                        'key': 'MAPPED_SI_4',
                                        'value': 4
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 5',
                                        'key': 'MAPPED_SI_5',
                                        'value': 5
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 6',
                                        'key': 'MAPPED_SI_6',
                                        'value': 6
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 7',
                                        'key': 'MAPPED_SI_7',
                                        'value': 7
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 8',
                                        'key': 'MAPPED_SI_8',
                                        'value': 8
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 9',
                                        'key': 'MAPPED_SI_9',
                                        'value': 9
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 10',
                                        'key': 'MAPPED_SI_10',
                                        'value': 10
                                    }
                                ],
                                'key': 'MappingInfo'
                            },
                            'immutable': false,
                            'key': 'mappingInfoSIB12',
                            'type': 'ENUM_REF',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': 'NOT_MAPPED',
                            'description': 'Defines to which SI message SIB4 is mapped',
                            'enumeration': {
                                'description': 'MappingInfo',
                                'enumMembers': [
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx"  is not mapped to any SI message and will not be broadcast.',
                                        'key': 'NOT_MAPPED',
                                        'value': 0
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 1',
                                        'key': 'MAPPED_SI_1',
                                        'value': 1
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 2',
                                        'key': 'MAPPED_SI_2',
                                        'value': 2
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 3',
                                        'key': 'MAPPED_SI_3',
                                        'value': 3
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 4',
                                        'key': 'MAPPED_SI_4',
                                        'value': 4
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 5',
                                        'key': 'MAPPED_SI_5',
                                        'value': 5
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 6',
                                        'key': 'MAPPED_SI_6',
                                        'value': 6
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 7',
                                        'key': 'MAPPED_SI_7',
                                        'value': 7
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 8',
                                        'key': 'MAPPED_SI_8',
                                        'value': 8
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 9',
                                        'key': 'MAPPED_SI_9',
                                        'value': 9
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 10',
                                        'key': 'MAPPED_SI_10',
                                        'value': 10
                                    }
                                ],
                                'key': 'MappingInfo'
                            },
                            'immutable': false,
                            'key': 'mappingInfoSIB4',
                            'type': 'ENUM_REF',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': 'NOT_MAPPED',
                            'description': 'Defines to which SI message SIB7 is mapped',
                            'enumeration': {
                                'description': 'MappingInfo',
                                'enumMembers': [
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx"  is not mapped to any SI message and will not be broadcast.',
                                        'key': 'NOT_MAPPED',
                                        'value': 0
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 1',
                                        'key': 'MAPPED_SI_1',
                                        'value': 1
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 2',
                                        'key': 'MAPPED_SI_2',
                                        'value': 2
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 3',
                                        'key': 'MAPPED_SI_3',
                                        'value': 3
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 4',
                                        'key': 'MAPPED_SI_4',
                                        'value': 4
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 5',
                                        'key': 'MAPPED_SI_5',
                                        'value': 5
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 6',
                                        'key': 'MAPPED_SI_6',
                                        'value': 6
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 7',
                                        'key': 'MAPPED_SI_7',
                                        'value': 7
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 8',
                                        'key': 'MAPPED_SI_8',
                                        'value': 8
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 9',
                                        'key': 'MAPPED_SI_9',
                                        'value': 9
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 10',
                                        'key': 'MAPPED_SI_10',
                                        'value': 10
                                    }
                                ],
                                'key': 'MappingInfo'
                            },
                            'immutable': false,
                            'key': 'mappingInfoSIB7',
                            'type': 'ENUM_REF',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': 'NOT_MAPPED',
                            'description': 'Defines to which SI message SIB11 is mapped',
                            'enumeration': {
                                'description': 'MappingInfo',
                                'enumMembers': [
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx"  is not mapped to any SI message and will not be broadcast.',
                                        'key': 'NOT_MAPPED',
                                        'value': 0
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 1',
                                        'key': 'MAPPED_SI_1',
                                        'value': 1
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 2',
                                        'key': 'MAPPED_SI_2',
                                        'value': 2
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 3',
                                        'key': 'MAPPED_SI_3',
                                        'value': 3
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 4',
                                        'key': 'MAPPED_SI_4',
                                        'value': 4
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 5',
                                        'key': 'MAPPED_SI_5',
                                        'value': 5
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 6',
                                        'key': 'MAPPED_SI_6',
                                        'value': 6
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 7',
                                        'key': 'MAPPED_SI_7',
                                        'value': 7
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 8',
                                        'key': 'MAPPED_SI_8',
                                        'value': 8
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 9',
                                        'key': 'MAPPED_SI_9',
                                        'value': 9
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 10',
                                        'key': 'MAPPED_SI_10',
                                        'value': 10
                                    }
                                ],
                                'key': 'MappingInfo'
                            },
                            'immutable': false,
                            'key': 'mappingInfoSIB11',
                            'type': 'ENUM_REF',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': 'NOT_MAPPED',
                            'description': 'Defines to which SI message SIB8 is mapped',
                            'enumeration': {
                                'description': 'MappingInfo',
                                'enumMembers': [
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx"  is not mapped to any SI message and will not be broadcast.',
                                        'key': 'NOT_MAPPED',
                                        'value': 0
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 1',
                                        'key': 'MAPPED_SI_1',
                                        'value': 1
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 2',
                                        'key': 'MAPPED_SI_2',
                                        'value': 2
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 3',
                                        'key': 'MAPPED_SI_3',
                                        'value': 3
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 4',
                                        'key': 'MAPPED_SI_4',
                                        'value': 4
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 5',
                                        'key': 'MAPPED_SI_5',
                                        'value': 5
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 6',
                                        'key': 'MAPPED_SI_6',
                                        'value': 6
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 7',
                                        'key': 'MAPPED_SI_7',
                                        'value': 7
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 8',
                                        'key': 'MAPPED_SI_8',
                                        'value': 8
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 9',
                                        'key': 'MAPPED_SI_9',
                                        'value': 9
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 10',
                                        'key': 'MAPPED_SI_10',
                                        'value': 10
                                    }
                                ],
                                'key': 'MappingInfo'
                            },
                            'immutable': false,
                            'key': 'mappingInfoSIB8',
                            'type': 'ENUM_REF',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': 'MAPPED_SI_1',
                            'description': 'Defines to which SI message SIB10 is mapped',
                            'enumeration': {
                                'description': 'MappingInfo',
                                'enumMembers': [
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx"  is not mapped to any SI message and will not be broadcast.',
                                        'key': 'NOT_MAPPED',
                                        'value': 0
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 1',
                                        'key': 'MAPPED_SI_1',
                                        'value': 1
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 2',
                                        'key': 'MAPPED_SI_2',
                                        'value': 2
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 3',
                                        'key': 'MAPPED_SI_3',
                                        'value': 3
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 4',
                                        'key': 'MAPPED_SI_4',
                                        'value': 4
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 5',
                                        'key': 'MAPPED_SI_5',
                                        'value': 5
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 6',
                                        'key': 'MAPPED_SI_6',
                                        'value': 6
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 7',
                                        'key': 'MAPPED_SI_7',
                                        'value': 7
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 8',
                                        'key': 'MAPPED_SI_8',
                                        'value': 8
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 9',
                                        'key': 'MAPPED_SI_9',
                                        'value': 9
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 10',
                                        'key': 'MAPPED_SI_10',
                                        'value': 10
                                    }
                                ],
                                'key': 'MappingInfo'
                            },
                            'immutable': false,
                            'key': 'mappingInfoSIB10',
                            'type': 'ENUM_REF',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': 'NOT_MAPPED',
                            'description': 'Defines to which SI message SIB5 is mapped',
                            'enumeration': {
                                'description': 'MappingInfo',
                                'enumMembers': [
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx"  is not mapped to any SI message and will not be broadcast.',
                                        'key': 'NOT_MAPPED',
                                        'value': 0
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 1',
                                        'key': 'MAPPED_SI_1',
                                        'value': 1
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 2',
                                        'key': 'MAPPED_SI_2',
                                        'value': 2
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 3',
                                        'key': 'MAPPED_SI_3',
                                        'value': 3
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 4',
                                        'key': 'MAPPED_SI_4',
                                        'value': 4
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 5',
                                        'key': 'MAPPED_SI_5',
                                        'value': 5
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 6',
                                        'key': 'MAPPED_SI_6',
                                        'value': 6
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 7',
                                        'key': 'MAPPED_SI_7',
                                        'value': 7
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 8',
                                        'key': 'MAPPED_SI_8',
                                        'value': 8
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 9',
                                        'key': 'MAPPED_SI_9',
                                        'value': 9
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 10',
                                        'key': 'MAPPED_SI_10',
                                        'value': 10
                                    }
                                ],
                                'key': 'MappingInfo'
                            },
                            'immutable': false,
                            'key': 'mappingInfoSIB5',
                            'type': 'ENUM_REF',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': 'NOT_MAPPED',
                            'description': 'Defines to which SI message SIB6 is mapped',
                            'enumeration': {
                                'description': 'MappingInfo',
                                'enumMembers': [
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx"  is not mapped to any SI message and will not be broadcast.',
                                        'key': 'NOT_MAPPED',
                                        'value': 0
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 1',
                                        'key': 'MAPPED_SI_1',
                                        'value': 1
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 2',
                                        'key': 'MAPPED_SI_2',
                                        'value': 2
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 3',
                                        'key': 'MAPPED_SI_3',
                                        'value': 3
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 4',
                                        'key': 'MAPPED_SI_4',
                                        'value': 4
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 5',
                                        'key': 'MAPPED_SI_5',
                                        'value': 5
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 6',
                                        'key': 'MAPPED_SI_6',
                                        'value': 6
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 7',
                                        'key': 'MAPPED_SI_7',
                                        'value': 7
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 8',
                                        'key': 'MAPPED_SI_8',
                                        'value': 8
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 9',
                                        'key': 'MAPPED_SI_9',
                                        'value': 9
                                    },
                                    {
                                        'description': 'The SIB designated in "mappingInfoSIBx" shall be included in SI message 10',
                                        'key': 'MAPPED_SI_10',
                                        'value': 10
                                    }
                                ],
                                'key': 'MappingInfo'
                            },
                            'immutable': false,
                            'key': 'mappingInfoSIB6',
                            'type': 'ENUM_REF',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'MappingInfoSIBs',
                    'key': 'MappingInfoSIBs'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'The System Information (SI) message to which each System Information Block (SIB) is mapped. \n\n\n\nNote: SIB2 is always mapped to the SI message 1 according to 3GPP TS 36.331.',
                'immutable': false,
                'key': 'mappingInfo',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 32,
                            'minValue': 1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 3,
                'description': 'Maximum number of concurrent System Information messages carrying SIB12, i.e carrying Commercial Mobile Alert System (CMAS) notifications.',
                'immutable': false,
                'key': 'maxNoConcurrSib12',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 540,
                            'minValue': -1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Maximum possible power at the antenna reference point, for all downlink channels in all TX branches used simultaneously in the cell.\n\n\n\n-1 is used as an undefined value.\n\n\n\nNote: Setting partOfSectorPower or confOutputPower (MO SectorEquipmentFunction) has an impact on this attribute. See Radio Network Configuration user guide 11/1553-HSC 105 50/1.\n\n',
                'immutable': false,
                'key': 'maximumTransmissionPower',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 10,
                            'minValue': 1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 1,
                'description': 'Number of attempts for handover to a cell better than the serving cell, before handover is attempted to the next best cell. If there is no next best cell in the UE report, handover to the best cell is attempted repeatedly.',
                'immutable': false,
                'key': 'minBestCellHoAttempts',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Specifies if the feature Mobility Control at Poor Coverage is enabled or disabled in the cell.',
                'immutable': false,
                'key': 'mobCtrlAtPoorCovActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 2,
                            'minValue': 2
                        },
                        {
                            'maxValue': 4,
                            'minValue': 4
                        },
                        {
                            'maxValue': 8,
                            'minValue': 8
                        },
                        {
                            'maxValue': 16,
                            'minValue': 16
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 2,
                'description': 'The modification period, expressed in number of radio frames = modificationPeriodCoeff * defaultPagingCycle. See MO Paging for information about defaultPagingCycle.',
                'immutable': false,
                'key': 'modificationPeriodCoeff',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'NS_01',
                'description': 'Enables additional spectrum emission requirements according to 3GPP TS 36.101, table 6.2.4-1.',
                'enumeration': {
                    'description': 'NetworkSignallingValue',
                    'enumMembers': [
                        {
                            'description': 'Network Signalling value NS_01 according to TS 36.101, Table 6.2.4-1. This literal value corresponds to no additional spectrum emission requirements.',
                            'key': 'NS_01',
                            'value': 1
                        },
                        {
                            'description': 'Network Signalling value NS_03 according to TS 36.101, Table 6.2.4-1. This literal value corresponds to additional spectrum emission requirements on E-UTRA bands 2, 4, 10, 35 and 36 with channel bandwidths 3, 5, 10, 15 and 20 MHz.',
                            'key': 'NS_03',
                            'value': 3
                        },
                        {
                            'description': 'Network Signalling value NS_04 according to TS 36.101, Table 6.2.4-1.',
                            'key': 'NS_04',
                            'value': 4
                        },
                        {
                            'description': 'Network Signalling value NS_05 according to TS 36.101, Table 6.2.4-1. This literal value corresponds to additional spectrum emission requirements on E-UTRA band 1 with channel bandwidths 10, 15 and 20 MHz.',
                            'key': 'NS_05',
                            'value': 5
                        },
                        {
                            'description': 'Network Signalling value NS_07 according to TS 36.101, Table 6.2.4-1. This literal value corresponds to additional spectrum emission requirements on E-UTRA band 13 with channel bandwidth 10 MHz.',
                            'key': 'NS_07',
                            'value': 7
                        }
                    ],
                    'key': 'NetworkSignallingValue'
                },
                'immutable': false,
                'key': 'networkSignallingValue',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'SF4',
                'description': 'The number of consecutive downlink sub-frames with positioning reference signals as defined in 3GPP TS 36.211. Values define 1, 2, 4, or 6 consecutive sub-frames.',
                'enumeration': {
                    'description': 'NoOfSubframesVals',
                    'enumMembers': [
                        {
                            'description': 'SF1 denotes one subframe.',
                            'key': 'SF1',
                            'value': 0
                        },
                        {
                            'description': 'SF2 denotes two consecutive subframes.',
                            'key': 'SF2',
                            'value': 1
                        },
                        {
                            'description': 'SF4 denotes four consecutive subframes.',
                            'key': 'SF4',
                            'value': 2
                        },
                        {
                            'description': 'SF6 denotes six consecutive subframes.',
                            'key': 'SF6',
                            'value': 3
                        }
                    ],
                    'key': 'NoOfSubframesVals'
                },
                'immutable': false,
                'key': 'noConsecutiveSubframes',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 16,
                            'minValue': 1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 8,
                'description': 'Number of consecutive "DefaultPagingCycles" in which paging for Earthquake and Tsunami Warning System (ETWS) Primary Notification shall be transmitted in the cell.',
                'immutable': false,
                'key': 'noOfDefPagCyclPrim',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 4000,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 160,
                'description': 'The number of Channel Quality Indicator (CQI) resources available on the PUCCH channel.\n\nFor 1.4 MHz system bandwidth the recommended value is 50.\n\n\n\n\n\n',
                'immutable': false,
                'key': 'noOfPucchCqiUsers',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 4000,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 160,
                'description': 'The number of Scheduling Request (SR) resources available on the PUCCH channel.\n\nFor 1.4 MHz system bandwidth the recommended value is 50.\n\n\n\n\n\n',
                'immutable': false,
                'key': 'noOfPucchSrUsers',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 0,
                            'minValue': 0
                        },
                        {
                            'maxValue': 1,
                            'minValue': 1
                        },
                        {
                            'maxValue': 2,
                            'minValue': 2
                        },
                        {
                            'maxValue': 4,
                            'minValue': 4
                        },
                        {
                            'maxValue': 8,
                            'minValue': 8
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'The number of antennas that can be used for uplink beamforming/MIMO\n\nA parameter value of 0 means that the available configured resources will be used.',
                'immutable': false,
                'key': 'noOfRxAntennas',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 0,
                            'minValue': 0
                        },
                        {
                            'maxValue': 1,
                            'minValue': 1
                        },
                        {
                            'maxValue': 2,
                            'minValue': 2
                        },
                        {
                            'maxValue': 4,
                            'minValue': 4
                        },
                        {
                            'maxValue': 8,
                            'minValue': 8
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'The number of antennas that can be used for downlink beamforming/MIMO\n\nA parameter value of 0 means that the available configured resources will be used.',
                'immutable': false,
                'key': 'noOfTxAntennas',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 3,
                            'minValue': 1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 1,
                'description': 'The number of Orthogonal Frequency-Division Multiplexing (OFDM) symbols used for the Physical Downlink Control Channel (PDCCH).',
                'immutable': false,
                'key': 'nrOfSymbolsPdcch',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The operational state.  This attribute is set by the application in the RBS.\n\n',
                'enumeration': {
                    'description': 'Operational states.',
                    'enumMembers': [
                        {
                            'description': 'The resource is totally inoperable and unable to provide service to the user(s).',
                            'key': 'DISABLED',
                            'value': 0
                        },
                        {
                            'description': 'The resource is partially or fully operable and available for use.',
                            'key': 'ENABLED',
                            'value': 1
                        }
                    ],
                    'key': 'OperState'
                },
                'immutable': false,
                'key': 'operationalState',
                'type': 'ENUM_REF',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 179,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'Orientation of the major axis of uncertainty, in degrees clockwise from north.  Orientation value (N) is derived by the formula:\n\n\n\nN <= X < (N + 1)\n\n\n\nwhere X is the orientation in degrees (0\u00c3\u201a\u00c2\u00b0 - 180\u00c3\u201a\u00c2\u00b0).',
                'immutable': false,
                'key': 'orientMajorAxis',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Indicates if the feature OTDOA Support in SUPL Environment is ACTIVATED  or DEACTIVATED in the cell.',
                'immutable': false,
                'key': 'otdoaSuplActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 33,
                            'minValue': -30
                        },
                        {
                            'maxValue': 1000,
                            'minValue': 1000
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 1000,
                'description': 'Limits UE uplink transmission power in the serving cell and calculates the parameter Pcompensation (defined in 3GPP TS 36.304) for cell selection.\n\nThe attribute is broadcast in SIB1.\n\n\n\nValue 1000 means the parameter is not included in system information.',
                'immutable': false,
                'key': 'pMaxServingCell',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': -96,
                            'minValue': -127
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': -117,
                'description': 'The nominal component of the UE transmit power for Physical Uplink Control Channel (PUCCH).',
                'immutable': false,
                'key': 'pZeroNominalPucch',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 24,
                            'minValue': -126
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': -103,
                'description': 'The nominal component of the UE transmit power for Physical Uplink Shared Channel (PUSCH).',
                'immutable': false,
                'key': 'pZeroNominalPusch',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 100,
                'description': 'The requested part of the total radio power in the Sector that should be allocated for the cell. The output power is evenly distributed over the antenna connectors used for TX transmission that are allocated for the cell.\n\n\n\nIf the total amount of power per antenna connector is over 100% when the cell is unlocked, an alarm will be generated.\n\n',
                'immutable': false,
                'key': 'partOfRadioPower',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 100,
                'description': 'The requested part of the total power in the Sector that should be allocated for the cell. The output power is evenly distributed over the antenna connectors used for TX transmission that are allocated for the cell.\n\n\n\nIf the total amount of power per antenna connector is over 100% when the cell is unlocked, an alarm will be generated.\n\n',
                'immutable': false,
                'key': 'partOfSectorPower',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'A PCI confusion exists if a source cell has relations to two neighbours cells where both neighbours cells have the same PCI and frequency. A PCI collision exists if a source cell has a relation to a neighbour cell where both the source cell and neighbour cell has the same PCI and frequency.',
                'immutable': false,
                'key': 'pciConflict',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Indicates the CGI of the other cell that is involved in the PCI collision/confusion. This value is only valid if the attribute pciConflict is "YES" or "YES_CONFLICTING_CELL".',
                'immutable': false,
                'key': 'pciConflictCell',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Indicates the CGI of the cell that detected the PCI collision/confusion. This value is only valid if the corresponding attribute pciConflict is "YES" or "YES_CONFLICTING_CELL". The first cell in the pciDetectingCell list corresponds to the first cell in the pciConflictCell list and the first value of pciConflict. The second cell in the pciDetectingCell list corresponds to the second cell in the pciConflictCell list and the first value of pciConflict.',
                'immutable': false,
                'key': 'pciDetectingCell',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Enable the pdcch admission control feature. All rejects will be logged in counter pmCellAdmControlPdcchRej. If set to false we will not reject any Ues due to this function but the potential rejects will be logged in counter pmCellAdmControlPdcchRejMeas.',
                'immutable': false,
                'key': 'pdcchAdmEnabled',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 1000,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 1000,
                'description': 'Sets the threshold for the CCE usage when ue starts to be rejected. This will only cause real rejects if pdcchAdmEnabled = true. Otherwise we will only step pmCellAdmControlPdcchRejMeas both no rejects will take place.',
                'immutable': false,
                'key': 'pdcchAdmThreshold',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'CFI_STATIC_BY_BW',
                'description': 'Controls the CFI (Control Format Indicator) used for the control region. cfiMode maps to CFI as described under enumerations. For DL BW of 1400 kHz, values of CFI = 1, 2 and 3 map to 2, 3, and 4 control region symbols respectively. Other BW, CFI maps directly to number of control region symbols.',
                'enumeration': {
                    'description': 'CfiMode',
                    'enumMembers': [
                        {
                            'description': 'For FDD:\n\nControl region uses only CFI=1 for 15 and 20 MHz system bandwidth, and uses only CFI=2 otherwise.\n\nFor TDD:\n\nControl region uses only CFI=1 for 10 MHz and greater system bandwidth, and uses only CFI=2 otherwise.',
                            'key': 'CFI_STATIC_BY_BW',
                            'value': 0
                        },
                        {
                            'description': 'Control region uses only CFI=1.',
                            'key': 'CFI_STATIC_1',
                            'value': 1
                        },
                        {
                            'description': 'Control region uses only CFI=2.',
                            'key': 'CFI_STATIC_2',
                            'value': 2
                        },
                        {
                            'description': 'Control region uses only CFI=3.',
                            'key': 'CFI_STATIC_3',
                            'value': 3
                        },
                        {
                            'description': 'Control region dynamically adapts CFI up to the value of 2, depending on the actual load in each subframe.',
                            'key': 'CFI_AUTO_MAXIMUM_2',
                            'value': 4
                        },
                        {
                            'description': 'Control region dynamically adapts CFI up to the value of 3, depending on the actual load in each subframe.',
                            'key': 'CFI_AUTO_MAXIMUM_3',
                            'value': 5
                        }
                    ],
                    'key': 'CfiMode'
                },
                'immutable': false,
                'key': 'pdcchCfiMode',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': false,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 167,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The physical layer cell ID group. Physical-layer cell IDs are grouped into 168 unique physical-layer cell-identity groups, each group containing 3 unique subidentities. \n\n\n\nThis attribute together with physicalLayerSubCellId is used to calculate physical layer cell ID (see 3GPP TS 36.211) that is sent as part of the system information (see 3GPP TS 36.331).',
                'immutable': false,
                'key': 'physicalLayerCellIdGroup',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': false,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 2,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The subidentity within the physical layer cell ID group. Physical-layer cell IDs are grouped into 168 unique physical-layer cell-identity groups, each group containing 3 unique subidentities. \n\n\n\nThis attribute together with physicalLayerCellIdGroup is used to calculate physical layer cell identity (see 3GPP TS 36.211) which is sent as part of the system information (see 3GPP TS 36.331).',
                'immutable': false,
                'key': 'physicalLayerSubCellId',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The sum of the contributions from each UE in the cell of the number of active DRBs in the downlink direction.\n\n',
                'immutable': false,
                'key': 'pmActiveDrbDlSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The sum of number of DL active DRBs per QCI. A DL DRB is active if there are buffered DL data for the DRB. (Due to implementation, there are either 9052 or 9053 samples per ROP)\n\nCompressed: True',
                'immutable': false,
                'key': 'pmActiveDrbDlSumQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The sum of the contributions from each UE in the cell of the number of active DRBs in the uplink direction.\n\n',
                'immutable': false,
                'key': 'pmActiveDrbUlSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Peak number of UEs considered active in the downlink direction, i.e. has designated data in UE dedicated buffer in the eNB. The value is a maximum of a set of samples, where each sample is an average of active UEs per ms (throughout the frame), during a sample period shorter than the ROP.\n\n',
                'immutable': false,
                'key': 'pmActiveUeDlMax',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The counter shows the distribution of DL UEs that are in 1 to N sectors.\n\n\n\n[0]: Sum of active DL UEs that is connected to 1 sector\n\n[1]: Sum of active DL UEs that is connected to 2 sectors\n\n-----\n\n[5]: Sum of active DL UEs that is connected to 6 sectors or more.',
                'immutable': false,
                'key': 'pmActiveUeDlSectorCarrierDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of UEs considered active in the downlink direction.\n\n',
                'immutable': false,
                'key': 'pmActiveUeDlSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The sum of number of DL active UE per QCI. A DL active UE for a QCI is a UE that has buffered DL data for the QCI. (Due to implementation, there are either 9052 or 9053 samples per ROP)\n\nCompressed: True',
                'immutable': false,
                'key': 'pmActiveUeDlSumQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of active UE or active DRB measurement samples. (Due to implementation, there are either 9052 or 9053 samples per ROP)',
                'immutable': false,
                'key': 'pmActiveUeDrbSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Peak number of UEs considered active in the uplink direction, i.e. the UE is considered to have data in its buffer. The value is a maximum of a set of samples, where each sample is an average of active UEs per ms (throughout the frame), during a sample period shorter than the ROP.',
                'immutable': false,
                'key': 'pmActiveUeUlMax',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The counter shows the distribution of UL UEs that are in 1 to N sectors.\n\n\n\n[0]: Sum of active UL UEs that is connected to 1 sector\n\n[1]: Sum of active UL UEs that is connected to 2 sectors\n\n-----\n\n[5]: Sum of active UL UEs that is connected to 6 sectors or more.',
                'immutable': false,
                'key': 'pmActiveUeUlSectorCarrierDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of UEs considered active in the uplink direction.\n\n',
                'immutable': false,
                'key': 'pmActiveUeUlSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The sum of number of UL active UE per LCG (Logical Channel Group). An UL active UE for a LCG is a UE that has buffered UL data for the LCG. (Due to implementation, there are either 9052 or 9053 samples per ROP)',
                'immutable': false,
                'key': 'pmActiveUeUlSumLcg',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of neighbour relations added by the ANR function.\n\n',
                'immutable': false,
                'key': 'pmAnrNeighbrelAdd',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of neighbour relations removed by the ANR function.\n\n',
                'immutable': false,
                'key': 'pmAnrNeighbrelRem',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of traffic Bad Coverage measurement reports received.\n\n',
                'immutable': false,
                'key': 'pmBadCovEvalReport',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of A2 measurement reports received due to entering the Search zone.\n\nThis counter is used when the feature Mobility Control at Poor Coverage is activated.',
                'immutable': false,
                'key': 'pmBadCovSearchEvalReport',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of traffic Best Cell measurement reports received.\n\n',
                'immutable': false,
                'key': 'pmBestCellEvalReport',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Number of activated secondary component carriers (SCell), for UE using this cell as their primary component carrier (PCell)\n\n\n\n[0] Number of carrier aggregation configured UE that have no activated SCells\n\n[1] Number of carrier aggregation configured UE that have one activated SCell\n\n[2] Number of carrier aggregation configured UE that have two activated SCells\n\n[3] Number of carrier aggregation configured UE that have three activated SCells\n\n[4] Number of carrier aggregation configured UE that have four activated SCells\n\nCompressed: True',
                'immutable': false,
                'key': 'pmCaActivatedDlSum',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of carrier aggregation capable UE measurement samples.',
                'immutable': false,
                'key': 'pmCaCapableDlSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Number of supported secondary component carriers (SCell), for UE using this cell as their primary component carrier (PCell)\n\n\n\n[0] Number of UE that are not carrier aggregation capable at all (i.e. PCell only)\n\n[1] Number of UE that are capable of PCell plus one SCell\n\n[2] Number of UE that are capable of PCell plus two SCells\n\n[3] Number of UE that are capable of PCell plus three SCells\n\n[4] Number of UE that are capable of PCell plus four SCells\n\nCompressed: True',
                'immutable': false,
                'key': 'pmCaCapableDlSum',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of carrier aggregation configured UE measurement samples.',
                'immutable': false,
                'key': 'pmCaConfiguredDlSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Number of configured secondary component carriers (SCell) for UE using this cell as their primary component carrier (PCell)\n\n\n\n[0] Number of carrier aggregation capable UE that are not configured with any SCell\n\n[1] Number of carrier aggregation capable UE that are configured with one SCell \n\n[2] Number of carrier aggregation capable UE that are configured with two SCells\n\n[3] Number of carrier aggregation capable UE that are configured with three SCells\n\n[4] Number of carrier aggregation capable UE that are configured with four SCells\n\nCompressed: True',
                'immutable': false,
                'key': 'pmCaConfiguredDlSum',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Mean number of UE that have data scheduled on downlink, counted by the number of component carriers simultaneously scheduled.\n\nUE is considered scheduled for carrier aggregation if the eNodeB has sent a PDCCH assignment indicating a PDSCH assignment\n\n\n\n[0] Number of carrier aggregation activated UE that have one scheduled cell\n\n[1] Number of carrier aggregation activated UE that have two simultaneously scheduled cells\n\n[2] Number of carrier aggregation activated UE that have three simultaneously scheduled cells\n\n[3] Number of carrier aggregation activated UE that have four simultaneously scheduled cells\n\n[4] Number of carrier aggregation activated UE that have five simultaneously scheduled cells\n\nCompressed: True',
                'immutable': false,
                'key': 'pmCaScheduledDlSum',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Counter is stepped whenever we have a reject due to that pdcch is limiting new connections.',
                'immutable': false,
                'key': 'pmCellAdmControlPdcchRej',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Counter is stepped whenever we would have had a reject due to that pdcch is limiting new connections.',
                'immutable': false,
                'key': 'pmCellAdmControlPdcchRejMeas',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of times the cell has been disabled due to a fault (system has set cell MO OperationalState to Disabled).',
                'immutable': false,
                'key': 'pmCellDownLockAuto',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of times the cell has been disabled due to:\n\n- AdministrativeState of the cell MO or another MO the cell depends on has been set to Locked by the operator\n\nor\n\n- the operator has performed a reconfiguration request on an Unlocked cell which requires the cell to be taken down temporarily.',
                'immutable': false,
                'key': 'pmCellDownLockMan',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of times the cell has been enabled.',
                'immutable': false,
                'key': 'pmCellDownUnlockMan',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Length of time the cell has been disabled due to a fault (system has set cell MO OperationalState to Disabled). The counter is only incremented when the RBS is operational.',
                'immutable': false,
                'key': 'pmCellDowntimeAuto',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Length of time the cell has been disabled due to:\n\n- AdministrativeState of the cell MO or another MO the cell depends on has been set to Locked by the operator\n\nor\n\n- the operator has performed a reconfiguration request on an Unlocked cell which requires the cell to be taken down temporarily.\n\nThe counter is only incremented when the RBS is operational.\n\n\n\n',
                'immutable': false,
                'key': 'pmCellDowntimeMan',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Distribution of the SINR difference for PUSCH between Uplink Coordinated Multi-Point Reception and Interference Rejection Combining within SectorCarrier.\n\nPDF ranges: \n\n[0]: DeltaSINR <= -1; \n\n[1]: -1<DeltaSINR <= 0; \n\n[2]: 0 < DeltaSINR 2 <= 2; \n\n[3]: 2 < DeltaSINR <= 4;  \n\n[4]: 2 < DeltaSINR <= 4; \n\n[5]: 4 < DeltaSINR <= 6; \n\n[6]: 6 < DeltaSINR <= 8; \n\n[7]: 8 < DeltaSINR <= 10; ',
                'immutable': false,
                'key': 'pmCompUlDeltaSinrPuschDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The counter aggregates the number of ms for which contention has occurred in the downlink direction due to lack of eNodeB resources.\n\n',
                'immutable': false,
                'key': 'pmContDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The counter aggregates the number of ms for which contention has occurred in the downlink direction due to lack of DL capacity license.\n\n',
                'immutable': false,
                'key': 'pmContDlCapLic',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The counter aggregates the number of ms for which contention has occurred in the downlink direction due to lack of hardware resources.\n\n',
                'immutable': false,
                'key': 'pmContDlHw',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The counter aggregates the number of ms for which contention has occurred in the downlink direction due to lack of PDCCH resources.\n\n',
                'immutable': false,
                'key': 'pmContDlPdcch',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The counter aggregates the number of ms for which contention has occurred in the uplink direction due to lack of eNodeB resources.\n\n',
                'immutable': false,
                'key': 'pmContUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The counter aggregates the number of ms for which contention has occurred in the uplink direction due to lack of license resources.\n\n',
                'immutable': false,
                'key': 'pmContUlCapLic',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The counter aggregates the number of ms for which contention has occurred in the uplink direction due to lack of hardware resources.\n\n',
                'immutable': false,
                'key': 'pmContUlHw',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The counter aggregates the number of ms for which contention has occurred in the uplink direction due to lack of PDCCH resources.\n\n',
                'immutable': false,
                'key': 'pmContUlPdcch',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of A2 measurement reports received due to critical threshold is reached.\n\nThis counter is used instead of pmBadCovEvalReport when the feature Mobility Control at Poor Coverage is activated.',
                'immutable': false,
                'key': 'pmCriticalBorderEvalReport',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unicast DL assignments transmitted.',
                'immutable': false,
                'key': 'pmDlAssigsTrans',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unicast DL assignments that are confirmed by detecting a corresponding HARQ-ACK.',
                'immutable': false,
                'key': 'pmDlAssigsWithDetectedHarqAck',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unicast DL assignments for which the reception is unknown.',
                'immutable': false,
                'key': 'pmDlAssigsWithUnknownReception',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The DL transmission time used for DL DRB Throughput per QCI. It comprises of time periods from when the first piece of data in a data burst is transmitted until the second last piece of data in the data burst is transmitted. \n\n\n\nWhen carrier aggregation is used, the DL transmission time used for DL DRB Throughput per QCI is registered on the UE\'s primary component carrier (PCell). \n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmDrbThpTimeDlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Contains the DRX sleep time in number of subframes for all UEs in the cell taking into consideration SR pending time (time between SR and UL grant).',
                'immutable': false,
                'key': 'pmDrxSleepTime',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'To count the number of subframes where all UEs in a cell, differentiated by DRX configuration index, are in DRX sleep and DL data is available in the RLC buffers. Each DRX profile is associated with two DRX configurations - one for UEs with long DRX capability only, and the other for UEs that have short and long DRX capability.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmDrxSleepTimeAvailDataDlCfgIdx',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'To count the number of subframes where all UEs in a cell, differentiated by DRX configuration index, are in DRX sleep. Each DRX profile is associated with two DRX configurations - one for UEs with long DRX capability only, and the other for UEs that have short and long DRX capability.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmDrxSleepTimeCfgIdx',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Contains the DRX total time in number of subframes for all UEs in the cell.\n\n',
                'immutable': false,
                'key': 'pmDrxTotalTime',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'To count the number of subframes where all UEs in a cell, differentiated by DRX configuration index, are in DRX mode. Each DRX profile is associated with two DRX configurations - one for UEs with long DRX capability only, and the other for UEs that have short and long DRX capability.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmDrxTotalTimeCfgIdx',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=0',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp0',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=1',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp1',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=10',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp10',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=11',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp11',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=12',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp12',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=13',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp13',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=14',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp14',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=15',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp15',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=2',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp2',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=3',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp3',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=4',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp4',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=5',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp5',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=6',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp6',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=7',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp7',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=8',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp8',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB admission attempts for ARP (Allocation Retention Priority)=9',
                'immutable': false,
                'key': 'pmErabAdmissionAttArp9',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=0',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp0',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=1',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp1',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=10',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp10',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=11',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp11',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=12',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp12',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=13',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp13',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=14',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp14',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=15',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp15',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=2',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp2',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=3',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp3',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=4',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp4',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=5',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp5',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=6',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp6',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=7',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp7',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=8',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp8',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of admitted E-RAB Establishment for ARP (Allocation Retention Priority)=9',
                'immutable': false,
                'key': 'pmErabAdmissionSuccArp9',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of added E-RAB Establishment attempts. Added E-RABs are all E-RABs present in S1 message E-RAB Setup Request.\n\n',
                'immutable': false,
                'key': 'pmErabEstabAttAdded',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of added E-RAB Establishment attempts per ARP value. Added E-RABs are all E-RABs present in S1 message E-RAB Setup Request.\n\n\n\n[0]: N/A (unallowed ARP value)\n\n[1]: Sum of added E-RAB Establish Attempts with ARP priority value 1\n\n...\n\n[15]: Sum of added E-RAB Establish Attempts with ARP priority value 15',
                'immutable': false,
                'key': 'pmErabEstabAttAddedArp',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of added E-RAB Establishment attempts with Privileged Access. Added E-RABs are all E-RABs present in S1 message E-RAB Setup Request.',
                'immutable': false,
                'key': 'pmErabEstabAttAddedPa',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of additional E-RAB setup attempts per QCI.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabEstabAttAddedQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB setup attempts with resource type GBR for a cell.',
                'immutable': false,
                'key': 'pmErabEstabAttGbr',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of initial E-RAB Establishment attempts. Initial E-RABs are all E-RABs present in the S1 message Initial Context Setup Request.\n\n',
                'immutable': false,
                'key': 'pmErabEstabAttInit',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of initial E-RAB Establishment attempts per ARP value. Initial E-RABs are all E-RABs present in the S1 message Initial Context Setup Request.\n\n\n\n[0]: N/A (unallowed ARP value)\n\n[1]: Sum of initial E-RAB Establish Attempts with ARP priority value 1\n\n...\n\n[15]: Sum of initial E-RAB Establish Attempts with ARP priority value 15',
                'immutable': false,
                'key': 'pmErabEstabAttInitArp',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of initial E-RAB Establishment attempts with Privileged Access. Initial E-RABs are all E-RABs present in the S1 message Initial Context Setup Request. ',
                'immutable': false,
                'key': 'pmErabEstabAttInitPa',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of initial E-RAB setup attempts per QCI.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabEstabAttInitQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of failed establishment of added E-RABs due to license rejects (Multiple Radio Bearer per user or RLC UM). Added E-RABs are all E-RABs present in S1 message E-RAB Setup Request.\n\n',
                'immutable': false,
                'key': 'pmErabEstabFailAddedLic',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of failed E-RAB setup attempts due to downlink GBR overload for a cell.',
                'immutable': false,
                'key': 'pmErabEstabFailGbrDlCell',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of failed E-RAB setup attempts due to downlink GBR overload for resources common to the eNodeB.',
                'immutable': false,
                'key': 'pmErabEstabFailGbrDlEnb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of failed E-RAB setup attempts due to uplink GBR overload for a cell.',
                'immutable': false,
                'key': 'pmErabEstabFailGbrUlCell',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of failed E-RAB setup attempts due to uplink GBR overload for resources common to the eNodeB.',
                'immutable': false,
                'key': 'pmErabEstabFailGbrUlEnb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of failed establishment of initial E-RABs due to license rejects (Multiple Radio Bearer per user or RLC UM). Initial E-RABs are all E-RABs present in the S1 message Initial Context Setup Request.\n\n',
                'immutable': false,
                'key': 'pmErabEstabFailInitLic',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successfully added E-RABs. Added E-RABs are all E-RABs present in S1 message E-RAB Setup Request.\n\n',
                'immutable': false,
                'key': 'pmErabEstabSuccAdded',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of successfully added E-RABs per ARP value. Added E-RABs are all E-RABs present in S1 message E-RAB Setup Request. \n\n\n\n[0]: N/A (unallowed ARP value)\n\n[1]: Sum of successful added E-RABs established with ARP priority value 1\n\n...\n\n[15]: Sum of successful added E-RABs established with ARP priority value 15',
                'immutable': false,
                'key': 'pmErabEstabSuccAddedArp',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successfully added E-RABs with Privileged Access. Added E-RABs are all E-RABs present in S1 message E-RAB Setup Request.',
                'immutable': false,
                'key': 'pmErabEstabSuccAddedPa',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of successful additional E-RAB setup per QCI.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabEstabSuccAddedQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful E-RAB setup with resource type GBR for a cell.',
                'immutable': false,
                'key': 'pmErabEstabSuccGbr',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful initial E-RAB Establishments. Initial E-RABs are all E-RABs present in the S1 message Initial Context Setup Request.\n\n',
                'immutable': false,
                'key': 'pmErabEstabSuccInit',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of successful initial E-RAB Establishments per ARP value. \n\n\n\n[0]: N/A (unallowed ARP value)\n\n[1]: Sum of successful initial E-RAB Establishment with ARP priority value 1\n\n...\n\n[15]: Sum of successful initial E-RAB Establishment with ARP priority value 15',
                'immutable': false,
                'key': 'pmErabEstabSuccInitArp',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful initial E-RAB Establishments with Privileged Access. Initial E-RABs are all E-RABs present in the S1 message Initial Context Setup Request.',
                'immutable': false,
                'key': 'pmErabEstabSuccInitPa',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of successful initial E-RAB setup per QCI.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabEstabSuccInitQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The number of Established ERABs per QCI at the end of the measurement period.\n\n\n\nCompressed: True\n\nROP snapshot: True',
                'immutable': false,
                'key': 'pmErabLevRopStartQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Counts the number of times the corresponding Sum counters has been incremented.\n\nAssociated ACC pmCounter pmErabLevSum.\n\n',
                'immutable': false,
                'key': 'pmErabLevSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Sum of all sample values recorded for Number of simultaneous E-RABs',
                'immutable': false,
                'key': 'pmErabLevSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The peak number of simultaneous E-RAB usage.',
                'immutable': false,
                'key': 'pmErabMax',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The number of E-RAB Modify attempts per QCI. \n\nNote: since the QCI itself can be modified, if an E-RAB on QCI x is modified to QCI y, bin [x] would be used (and for subsequent E-RAB Modify attempts, bin [y] would be used).\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabModAttQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of E-RAB Modify attempts initiated from the MME which failed due to license reject.',
                'immutable': false,
                'key': 'pmErabModFailLic',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The number of successful E-RAB Modify attempts per QCI. \n\nNote: since the QCI itself can be modified, if an E-RAB on QCI x is modified to QCI y, bin [x] would be used (and for subsequent E-RAB Modify attempts, bin [y] would be used).\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabModSuccQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The sum of the number of simultaneous E-RABs per QCI within the measurement period.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabQciLevSum',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The maximum number of simultaneous E-RABs per QCI among all measured values within the measurement period.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabQciMax',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal E-RAB Releases triggered by eNB per cell. ',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal E-RAB Releases per cell initiated by the eNB and that there was data in either the UL or DL buffer (i.e. active). ',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbAct',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of abnormal E-RAB Releases initiated by the RBS (per cell per ARP). The counter is stepped if data was present in the UL or DL buffers. \n\nType:\n\nCompressed PDF\n\n[0]: Sum of active E-RABs released with ARP priority value 0\n\n[1]: Sum of active E-RABs released with ARP priority value 1\n\n\u00e2\u20ac\u00a6.\n\n[15]: Sum of active E-RABs released with ARP priority value 15\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbActArp',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal ERAB releases by the eNB per cell due cell down time (manual intervention) with the pre-condition that the Initial Context Establishment procedure must first have been successfully completed and that there was data in either the UL or DL buffer (i.e. active). ',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbActCdt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal ERAB releases per cell by the eNB due to handover execution failure and that there was data in either the UL or DL buffer (i.e. active). ',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbActHo',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal ERAB releases by the eNB per cell due to handover preparation and that there was data in either the UL or DL buffer (i.e. active). ',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbActHpr',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal E-RAB releases per cell, initiated by the RBS due to UE pre-emption with the pre-condition that the Initial Context Establishment procedure must first have been successfully completed and when data was in either the UL or DL buffer (i.e. active).',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbActPe',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of active E-RABs released abnormally per cell per QCI for requests initiated by eNB  (per cell per QCI). , except active E-RABs released due to successful HO. An E-RAB is considered to be active when there are data in the DL or UL queues for the E-RAB.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbActQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal ERAB releases per cell due to S1 interface down, "X2 interface down" or "Transport Resource Unavailable", with the pre-condition that the Initial Context Establishment procedure must first have been successfully completed and that there was data in either the UL or DL buffer (i.e. active). ',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbActTnFail',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal ERAB releases by the eNB per cell due that the contact with the UE is lost with the pre-condition that the Initial Context Establishment procedure must first have been successfully completed and that there was data in either the UL or DL buffer (i.e. active). ',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbActUeLost',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of abnormal E-RAB Releases initiated by the RBS (per cell per ARP). The counter is stepped regardless of whether data was or was not lost in UL/DL buffers. \n\nType:\n\nCompressed PDF\n\n[0]: Sum of E-RABs released with ARP priority value 0\n\n[1]: Sum of E-RABs released with ARP priority value 1\n\n\u00e2\u20ac\u00a6.\n\n[15]: Sum of E-RABs released with ARP priority value 15\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbArp',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal E-RAB Releases initiated by the RBS due to license reject (per cell).',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbLic',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal E-RAB Releases per cell, initiated by the RBS due to UE pre-emption with the pre-condition that the Initial Context Establishment procedure must first have been successfully completed. The counter is stepped regardless of whether data was or was not lost in UL/DL buffers.',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbPe',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of E-RABs released abnormally per cell per QCI for requests initiated by eNB. \n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelAbnormalEnbQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB Releases initiated by the MME considered as abnormal. The counter is stepped if if there was data in either the UL or DL buffer (i.e. active).',
                'immutable': false,
                'key': 'pmErabRelAbnormalMmeAct',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of E-RAB Releases initiated by the MME considered as abnormal per cell per ARP Level. The counter is stepped if there was data in either the UL or DL buffer (i.e. active). \n\nType:\n\nCompressed PDF\n\n[0]: Sum of E-RABs released with ARP priority value 0 \n\n[1]: Sum of E-RABs released with ARP priority value 1\n\n\u00e2\u20ac\u00a6.\n\n[15]: Sum of E-RABs released with ARP priority value 15\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelAbnormalMmeActArp',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of E-RAB Releases (per cell per QCI)  initiated by the MME considered as abnormal. The counter is stepped if data was lost in either the UL or DL buffers. \n\nType:\n\nCompressed PDF\n\n[0]: N/A\n\n[1]: Abnormal active E-RAB releases for E-RABs with QCI 1\n\n\u00e2\u20ac\u00a6.\n\n[255]: Abnormal active E-RAB releases for E-RABs with QCI 255\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelAbnormalMmeActQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB Releases per cell initiated by the MME excluding successful handover. The counter is stepped regardless of whether data was or was not lost in UL/DL buffers.',
                'immutable': false,
                'key': 'pmErabRelMme',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB Releases initiated by the MME (per cell) and that there was data in either the UL or DL buffer (i.e. active). ',
                'immutable': false,
                'key': 'pmErabRelMmeAct',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB Releases per cell, initiated by the MME with the pre-condition that the Initial Context Establishment procedure must first have been successfully completed and that there was data in either the UL or DL buffer (i.e. active) and the cause was "Release due to Eutran generated reason". ',
                'immutable': false,
                'key': 'pmErabRelMmeActEutra',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of active E-RABs released per QCI for requests initiated by MME, except active E-RABs released due to successful HO. An E-RAB is considered to be active when there are data in the DL or UL queues for the E-RAB.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelMmeActQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB Releases per cell, initiated by the MME with the pre-condition that the Initial Context Establishment procedure must first have been successfully completed and that there was data in either the UL or DL buffer (i.e. active) and the cause was "Unspecified". ',
                'immutable': false,
                'key': 'pmErabRelMmeActUnspecified',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of E-RAB Releases per cell, initiated by the MME with the pre-condition that the Initial Context Establishment procedure must first have been successfully completed and that there was data in either the UL or DL buffer (i.e. active) and the cause was "User Inactivity". ',
                'immutable': false,
                'key': 'pmErabRelMmeActUserInactivity',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of E-RAB Releases initiated by the MME excluding successful handover per cell per ARP Level. The counter is stepped regardless of whether data was or was not lost in UL/DL buffers. \n\nType:\n\nCompressed PDF\n\n[0]: Sum of E-RABs released with ARP priority value 0 (unallowed ARP level)\n\n[1]: Sum of E-RABs released with ARP priority value 1\n\n\u00e2\u20ac\u00a6.\n\n[15]: Sum of E-RABs released with ARP priority value 15\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelMmeArp',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of E-RAB Releases (per cell per QCI)  initiated by the MME excluding successful handover. The counter is stepped regardless of whether data was or was not lost in UL/DL buffers. \n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelMmeQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of normal E-RAB Releases triggered by eNB per cell. ',
                'immutable': false,
                'key': 'pmErabRelNormalEnb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of normal E-RAB Releases per cell initiated by the eNB and that there was data in either the UL or DL buffer (i.e. active). ',
                'immutable': false,
                'key': 'pmErabRelNormalEnbAct',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of normal E-RAB Releases initiated by the RBS (per cell per ARP). The counter is stepped if there was data lost in UL/DL buffers. \n\nType:\n\nCompressed PDF\n\n[0]: Sum of E-RABs released with ARP priority value 0\n\n[1]: Sum of E-RABs released with ARP priority value 1\n\n\u00e2\u20ac\u00a6.\n\n[15]: Sum of E-RABs released with ARP priority value 15\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelNormalEnbActArp',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of active E-RABs released normally (per cell per QCI) for requests initiated by eNB, except active E-RABs released due to successful HO. An E-RAB is considered to be active when there are data in the DL or UL queues for the E-RAB.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelNormalEnbActQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of normal E-RAB Releases initiated by the RBS. \n\nType:\n\nCompressed PDF\n\n[0]: [0]: N/A (unallowed ARP value)\n\n[1]: Sum of E-RABs released with ARP priority value 1\n\n....\n\n[15]: Sum of E-RABs released with ARP priority value 15\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelNormalEnbArp',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of E-RABs released normally (per cell per QCI)  for requests initiated by eNB. \n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmErabRelNormalEnbQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The number of handover execution attempt for ERABs per QCI towards target cell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmHoExeAttQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The number of handover execution attempt for ERABs per QCI towards target cell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmHoExeOutAttQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The number of ERABs per QCI that was succesfully handovered to the target cell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmHoExeOutSuccQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The number of ERABs per QCI that was succesfully handovered to the target cell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmHoExeSuccQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Incoming Handover Preparation Failure messages sent by the target eNB due to the fact that all the UE\'s bearers are rejected during bearer admission.',
                'immutable': false,
                'key': 'pmHoPrepRejInBearerAdmissionRej',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Handover Preparation Failure messages sent by the target eNB due to high load.',
                'immutable': false,
                'key': 'pmHoPrepRejInHighLoad',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Handover Preparation Failure messages sent by the target eNB due to license for connected users being exceeded.\n\n',
                'immutable': false,
                'key': 'pmHoPrepRejInLicConnUsers',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Incoming Handover Preparation Failure messages sent by the target eNB due to lack of license for handover.',
                'immutable': false,
                'key': 'pmHoPrepRejInLicMob',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of non-admitted E-RABs at an incoming handover preparation procedure, due to license for Multiple E-RAB being exceeded.',
                'immutable': false,
                'key': 'pmHoPrepRejInLicMultiErab',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of non-admitted E-RABs at an incoming handover preparation procedure, due to lack of license for RLC UM.',
                'immutable': false,
                'key': 'pmHoPrepRejInLicRlcUm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Handover Preparation Failure messages sent by the target eNB due to overload.',
                'immutable': false,
                'key': 'pmHoPrepRejInOverload',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of load balancing cycles during the ROP. This together with the counter pmLbSubRatioSum can be used to calculate an average subscription ratio.',
                'immutable': false,
                'key': 'pmLbSubRatioSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Records the subscription ratio as the result of the traffic load assessment at every load balancing cycle. The values are accumulated each ROP, allowing the average subscription ratio to be presented for each period.',
                'immutable': false,
                'key': 'pmLbSubRatioSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The UL transmission time used for UL DRB Throughput per LCG. It comprises of time periods from when the 5th data transmission is received on Uu until the second last data transmission is received. ',
                'immutable': false,
                'key': 'pmLcgThpTimeUlLcg',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The UL volume used for UL DRB Throughput per LCG. It comprises of the MAC SDU volume received on Uu per LCG, excluding the volume received in the first 4 data transmissions and the data transmission emptying the UL buffer.',
                'immutable': false,
                'key': 'pmLcgThpVolUlLcg',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Aggregated time for the downlink MAC delay measure. The time for each sample shall show the time between reception from RLC until it is successfully received in the UE or HARQ failure occurs.\n\n',
                'immutable': false,
                'key': 'pmMacDelayTimeDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total  number of successful HARQ transmissions (ACKs) in the downlink direction.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlAck',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful HARQ transmissions in the downlink direction using a 16QAM modulation.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlAck16qam',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful HARQ transmissions in the downlink direction using a 64QAM modulation.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlAck64qam',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful HARQ transmissions in the downlink direction using a QPSK modulation.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlAckQpsk',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of occasions when an downlink HARQ feedback was not received from an UE and DTX is considered the reason.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlDtx',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of occasions when an downlink HARQ feedback for a transport block using 16QAM modulation was not received from an UE and DTX is considered the reason.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlDtx16qam',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of occasions when an downlink HARQ feedback for a transport block using 64QAM modulation was not received from an UE and DTX is considered the reason.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlDtx64qam',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of occasions when an downlink HARQ feedback for a transport block using QPSK modulation was not received from an UE and DTX is considered the reason.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlDtxQpsk',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total  number of unsuccessful HARQ transmissions (NACKs) in the downlink direction.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlNack',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unsuccessful HARQ transmissions in the downlink direction using a 16QAM modulation.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlNack16qam',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unsuccessful HARQ transmissions in the downlink direction using a 64QAM modulation.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlNack64qam',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unsuccessful HARQ transmissions in the downlink direction using a QPSK modulation.\n\n',
                'immutable': false,
                'key': 'pmMacHarqDlNackQpsk',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total  number of successful HARQ transmissions (ACKs) in the uplink direction.\n\n',
                'immutable': false,
                'key': 'pmMacHarqUlAck',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of occasions when an uplink grant was meant for HARQ transmission in the uplink direction, where DTX is considered the reason for no receiption of HARQ in uplink in the eNB.\n\n',
                'immutable': false,
                'key': 'pmMacHarqUlDtx',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of occasions when an uplink grant was meant for HARQ transmission of a transport block using 16QAM modulation in the uplink direction, where DTX is considered the reason for no receiption of HARQ in uplink in the eNB.\n\n',
                'immutable': false,
                'key': 'pmMacHarqUlDtx16qam',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of occasions when an uplink grant was meant for HARQ transmission of a transport block using QPSK modulation in the uplink direction, where DTX is considered the reason for no receiption of HARQ in uplink in the eNB.\n\n',
                'immutable': false,
                'key': 'pmMacHarqUlDtxQpsk',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unsuccessful HARQ transmissions in the uplink direction using a 16QAM modulation.\n\n',
                'immutable': false,
                'key': 'pmMacHarqUlFail16qam',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unsuccessful HARQ transmissions in the uplink direction using a QPSK modulation.\n\n',
                'immutable': false,
                'key': 'pmMacHarqUlFailQpsk',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total  number of unsuccessful HARQ transmissions (NACKs) in the uplink direction.\n\n',
                'immutable': false,
                'key': 'pmMacHarqUlNack',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful HARQ transmissions in the uplink direction using a 16QAM modulation.\n\n',
                'immutable': false,
                'key': 'pmMacHarqUlSucc16qam',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful HARQ transmissions in the uplink direction using a QPSK modulation.\n\n',
                'immutable': false,
                'key': 'pmMacHarqUlSuccQpsk',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This counter is being stepped when a best cell evaluation is received in eNB from UE on a PCI where the CGI is unknown, i.e. no neighbour relation to the cell is available in the eNB.',
                'immutable': false,
                'key': 'pmMeasMissingNeighRel',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This counter counts the number of S1AP Paging messages discarded and not broadcasted in this cell. This counter is a subset of pmPagReceived.\n\n\n\n',
                'immutable': false,
                'key': 'pmPagDiscarded',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This counter counts the number of S1AP Paging messages routed to this cell. ',
                'immutable': false,
                'key': 'pmPagReceived',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Counter of how often the PDCCH has 1 or more CCEs used. To re-normalize pmPdcchCceUtil for subframes containing traffic, use this counter compute and remove idle subframes.',
                'immutable': false,
                'key': 'pmPdcchCceActivity',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of CCEs used for DL grants per QCI.\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcchCceUsedDlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of CCEs used for UL grants per QCI. When a single UE is associated with multiple QCIs, only QCI  that has highest priority ( logical group with highest priority)  contribute to the CCE count.\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcchCceUsedUlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'PDF of % of CCEs utilized compared with total CCEs available (at the maximum CFI permitted by pdcchCfiMode) each subframe, considering bandwidth and antenna configuration.\n\n[0]: utilization <= 5%\n\n[1]: 5% < utilization <= 10%\n\n[2]: 10% < utilization <= 15%\n\n[3]: 15% < utilization <= 20%\n\n[4]: 20% < utilization <= 25%\n\n[5]: 25% < utilization <= 30%\n\n[6]: 30% < utilization <= 35%\n\n[7]: 35% < utilization <= 40%\n\n[8]: 40% < utilization <= 45%\n\n[9]: 45% < utilization <= 50%\n\n[10]: 50% < utilization <= 55%\n\n[11]: 55% < utilization <= 60%\n\n[12]: 60% < utilization <= 65%\n\n[13]: 65% < utilization <= 70%\n\n[14]: 70% < utilization <= 75%\n\n[15]: 75% < utilization <= 80%\n\n[16]: 80% < utilization <= 85%\n\n[17]: 85% < utilization <= 90%\n\n[18]: 90% < utilization <= 95%\n\n[19]: 95% < utilization <= 100%\n\n\n\nIn subframes where the number of available CCEs is zero, the lowest bin is incremented.',
                'immutable': false,
                'key': 'pmPdcchCceUtil',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'PDF of number of subframes each CFI value was assigned\n\n[0]: CFI = 1\n\n[1]: CFI = 2\n\n[2]: CFI = 3',
                'immutable': false,
                'key': 'pmPdcchCfiUtil',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total maximum number of CCEs available determined based on the bandwidth, antenna configuration and setting of CFI.\n\n\n\nThe value of the counter depends on the FDD/TDD configuration and  in TDD also the special subframe configuration.',
                'immutable': false,
                'key': 'pmPdcchMaxCceAvail',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'PDCCH resource utilization distribution.\n\n\n\nPDF ranges:\n\n[0]: [0..5]%,\n\n[1]: ]5..10]%,\n\n[2]: ]10..15]%,\n\n[3]: ]15..20]%,\n\n[4]: ]20..25]%,\n\n[5]: ]25..30]%,\n\n[6]: ]30..35]%,\n\n[7]: ]35..40]%,\n\n[8]: ]40..45]%,\n\n[9]: ]45..50]%,\n\n[10]: ]50..55]%,\n\n[11]: ]55..60]%,\n\n[12]: ]60..65]%,\n\n[13]: ]65..70]%,\n\n[14]: ]70..75]%,\n\n[15]: ]75..80]%,\n\n[16]: ]80..85]%,\n\n[17]: ]85..90]%,\n\n[18]: ]90..95]%,\n\n[19]: ]95..100]%\n\n',
                'immutable': false,
                'key': 'pmPdcchResUtil',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of attempted 3GPP procedure "PDCCH ordered resynchronization", see 3GPP TS 36.321 and TS 36.212. ',
                'immutable': false,
                'key': 'pmPdcchResyncAtt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful 3GPP procedures "PDCCH ordered resynchronization", see 3GPP TS 36.321 and TS 36.212.',
                'immutable': false,
                'key': 'pmPdcchResyncSucc',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of aggressive unicast PDCCH transmissions.',
                'immutable': false,
                'key': 'pmPdcchTxAggressive',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of conservative unicast PDCCH transmissions.',
                'immutable': false,
                'key': 'pmPdcchTxConservative',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Peak cell DL bit rate. One cell bit rate sample is obtained by dividing the total volume (PDCP SDU) on Data Radio Bearers aggregated to cell level, that has been transmitted in the downlink direction in the PDCP layer, with the time (in seconds) of the sample gathering period.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) is measured on PCell.\n\n',
                'immutable': false,
                'key': 'pmPdcpBitrateDlDrbMax',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Minimum cell DL bit rate. One cell bit rate sample is obtained by dividing the total volume (PDCP SDU) on Data Radio Bearers aggregated to cell level, that has been transmitted in the downlink direction in the PDCP layer, with the time (in seconds) of the sample gathering period.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpBitrateDlDrbMin',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Peak cell UL bit rate. One cell bit rate sample is obtained by dividing the total volume (PDCP SDU) on Data Radio Bearers aggregated to cell level, that has been received in the uplink direction, with the time (in seconds) of the sample gathering period.',
                'immutable': false,
                'key': 'pmPdcpBitrateUlDrbMax',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Minimum cell UL bit rate. One cell bit rate sample is obtained by dividing the total volume (PDCP SDU) on Data Radio Bearers aggregated to cell level, that has been received in the uplink direction, with the time (in seconds) of the sample gathering period.',
                'immutable': false,
                'key': 'pmPdcpBitrateUlDrbMin',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Aggregated time for the downlink delay measure. One sample per successful transmission of a packet (PDCP SDU). The time for each sample is between reception of a packet (PDCP SDU) until the successful transmission of the corresponding MAC SDU.\n\n',
                'immutable': false,
                'key': 'pmPdcpDelayTimeDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of DRB packets for downlink Latency measurements.\n\n\n\nWhen carrier aggregation is used, the DL Latency for all component carriers is registered on the UE\'s primary component carrier (PCell).',
                'immutable': false,
                'key': 'pmPdcpLatPktTransDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of DRB packets for downlink Latency measurements when DRX is active and the UE has UL synchronization status "NOT synchronized".\n\n\n\nWhen carrier aggregation is used, the DL Latency for all component carriers is registered on the UE\'s primary component carrier (PCell).',
                'immutable': false,
                'key': 'pmPdcpLatPktTransDlDrxNoSync',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of DRB packets for downlink Latency measurements when DRX is active and the UE has UL synchronization status "synchronized".\n\n\n\nWhen carrier aggregation is used, the DL Latency for all component carriers is registered on the UE\'s primary component carrier (PCell).\n\n',
                'immutable': false,
                'key': 'pmPdcpLatPktTransDlDrxSync',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of DRB packets for downlink Latency measurements when DRX is NOT active and the UE has UL synchronization status "synchronized".\n\n\n\nWhen carrier aggregation is used, the DL Latency for all component carriers is registered on the UE\'s primary component carrier (PCell).\n\n',
                'immutable': false,
                'key': 'pmPdcpLatPktTransDlNoDrxSync',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Number of samples for DL Latency measurements during measurement period per QCI.\n\n\n\nWhen carrier aggregation is used, the DL Latency for all component carriers is registered on the UE\'s primary component carrier (PCell).\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpLatPktTransDlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Aggregated DL Latency for a measurement period. The effective DL Latency time comprises the time from PDCP DRB SDU entering the buffer until the first data has been transmitted to the UE.\n\n\n\nWhen carrier aggregation is used, the DL Latency for all component carriers is registered on the UE\'s primary component carrier (PCell).',
                'immutable': false,
                'key': 'pmPdcpLatTimeDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Aggregated DL Latency when DRX is active and the UE has UL synchronization status "NOT synchronized".\n\n\n\nWhen carrier aggregation is used, the DL Latency for all component carriers is registered on the UE\'s primary component carrier (PCell).',
                'immutable': false,
                'key': 'pmPdcpLatTimeDlDrxNoSync',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Aggregated DL Latency when DRX is active and the UE has UL synchronization status "synchronized".\n\n\n\nWhen carrier aggregation is used, the DL Latency for all component carriers is registered on the UE\'s primary component carrier (PCell).',
                'immutable': false,
                'key': 'pmPdcpLatTimeDlDrxSync',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Aggregated DL Latency when DRX is NOT active and the UE has UL synchronization status "synchronized".\n\n\n\nWhen carrier aggregation is used, the DL Latency for all component carriers is registered on the UE\'s primary component carrier (PCell).',
                'immutable': false,
                'key': 'pmPdcpLatTimeDlNoDrxSync',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Aggregated DL Latency for a measurement period per QCI.\n\nWhen carrier aggregation is used, the DL Latency for all component carriers is registered on the UE\'s primary component carrier (PCell).\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpLatTimeDlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total number of packets (PDCP SDUs) discarded due to Active Queue Management (AQM).\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of packets (PDCP SDUs) discarded due to AQM is measured on PCell.\n\n',
                'immutable': false,
                'key': 'pmPdcpPktDiscDlAqm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Total number of packets (PDCP SDUs) per QCI discarded due to Active Queue Management (AQM). \n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of packets (PDCP SDUs) per QCI discarded due to AQM is measured on PCell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpPktDiscDlAqmQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of DRB packets (PDCP SDUs) discarded in downlink due to handover and reestablishment procedures.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total number of packets (PDCP SDUs) discarded in the downlink due to handover and reestablishment procedures is measured on PCell. \n\n',
                'immutable': false,
                'key': 'pmPdcpPktDiscDlHo',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Total number of DL packets (PDCP SDUs) discarded due to HO per QCI.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of DL packets (PDCP SDUs) discarded due to HO per QCI is measured on PCell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpPktDiscDlHoQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total number of DRB packets (PDCP SDUs) for which no part has been transmitted over the air in the downlink that are discarded due to reasons other than handover or active queue management.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of DRB packets (PDCP SDUs) discarded due to reasons other than handover or active queue management is measured on PCell.\n\n',
                'immutable': false,
                'key': 'pmPdcpPktDiscDlPelr',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Total number of DL packets (PDCP SDUs) per QCI that are discarded in the PDCP layer due to reasons other than handover or active queue management. No part of these packets has been transmitted over the air.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of DL packets (PDCP SDUs) per QCI discarded due to reasons other than handover or active queue management is measured on PCell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpPktDiscDlPelrQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total number of packets (PDCP SDUs) for which at least a part has been transmitted over the air in the downlink direction but not positively acknowledged, and it was decided that no more transmission attempts will be done, due to reasons other than handover. Only applicable to DRB packets.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of packets (PDCP SDUs) for which at least a part has been transmitted over the air in the downlink direction but not positively acknowledged, and it was decided that no more transmission attempts will be done, due to reasons other than handover, is measured on PCell.\n\n',
                'immutable': false,
                'key': 'pmPdcpPktDiscDlPelrUu',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Total number of DL packets (PDCP SDUs) per QCI for which at least a part has been transmitted over the air but not positively acknowledged due to reasons other than handover, and it was decided that no more transmission attempts will be done.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of DL packets (PDCP SDUs) per QCI for which at least a part has been transmitted over the air but not positively acknowledged due to reasons other than handover, and it was decided that no more transmission attempts will be done, is measured on PCell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpPktDiscDlPelrUuQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total number of DRB packets (PDCP SDUs) forwarded to target cell at handover for downlink sessions.',
                'immutable': false,
                'key': 'pmPdcpPktFwdDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total number of DRB packets (PDCP SDUs) lost in the uplink.',
                'immutable': false,
                'key': 'pmPdcpPktLostUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Total number of UL packets (PDCP SDUs) lost per QCI.\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpPktLostUlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RLC SDU (PDCP SDU) in UL that are received within the Packet Delay Budget in Uplink. Only applicable for VoIP.',
                'immutable': false,
                'key': 'pmPdcpPktPdbUlOkVoip',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total number of DRB packets (PDCP SDUs) received by RBS in PDCP in the downlink.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of DRB packets (PDCP SDUs) received by RBS in PDCP in the downlink is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpPktReceivedDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Total number of DL packets (PDCP SDUs) received in PDCP in the RBS per QCI.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of DL packets (PDCP SDUs) received in PDCP in the RBS per QCI is measured on PCell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpPktReceivedDlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total number of DRB packets (PDCP SDUs) received in the uplink.',
                'immutable': false,
                'key': 'pmPdcpPktReceivedUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Total number of UL packets (PDCP SDUs) received per QCI.\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpPktReceivedUlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total number of DRB packets (PDCP SDUs) successfully transmitted (RLC acknowledged by UE) in the downlink.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of DRB packets (PDCP SDUs) successfully transmitted (RLC acknowledged by UE) in the downlink is measured on PCell.\n\n',
                'immutable': false,
                'key': 'pmPdcpPktTransDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Total number of DL packets (PDCP SDUs) transmitted successfully per QCI.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). Total number of DL packets (PDCP SDUs) transmitted successfully per QCI is measured on PCell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpPktTransDlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total volume of compressed PDCP SDU headers that has been transmitted from the Robust Header Compression entity in the downlink direction per QCI.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume of compressed PDCP SDU headers that has been transmitted from the Robust Header Compression entity in the downlink direction per QCI is measured on PCell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpVolDlCmpHdrQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transferred (UM and AM) in the downlink direction.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transferred (UM and AM) in the downlink direction is measured on PCell. \n\n',
                'immutable': false,
                'key': 'pmPdcpVolDlDrb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transferred (acknowledged by the UE) in the downlink direction in the last TTI when a buffer is emptied.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transferred (acknowledged by the UE) in the downlink direction in the last TTI when a buffer is emptied is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbLastTTI',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total DL PDCP SDU volume per QCI that is transmitted in the last TTI when the buffer for a DRB that maps to the given QCI is emptied.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total DL PDCP SDU volume per QCI that is transmitted in the last TTI when the buffer for a DRB that maps to the given QCI is emptied is measured on PCell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbLastTTIQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) that has been transferred (UM and AM) on Data Radio Bearers in the downlink direction per QCI.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) that has been transferred (UM and AM) on Data Radio Bearers in the downlink direction per QCI is measured on PCell.\n\n\n\nCompressed: True\n\n',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer is measured on PCell.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbTrans',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN0. \n\n\n\nPLMN0 refers to the PLMN configured in the attribute eNodeBPlmnId located on ENodeBFunction.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN0 is measured on PCell.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbTransPlmn0',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN1. \n\n\n\nPLMN1 refers to the PLMN configured in the attribute additionalPlmnList[0] located on EUtranCellFDD or EUtranCellTDD.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN1 is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbTransPlmn1',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN2. \n\n\n\nPLMN2 refers to the PLMN configured in the attribute additionalPlmnList[1] located on EUtranCellFDD or EUtranCellTDD.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN2 is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbTransPlmn2',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN3. \n\n\n\nPLMN3 refers to the PLMN configured in the attribute additionalPlmnList[2] located on EUtranCellFDD or EUtranCellTDD.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN3 is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbTransPlmn3',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN4. \n\n\n\nPLMN4 refers to the PLMN configured in the attribute additionalPlmnList[3] located on EUtranCellFDD or EUtranCellTDD.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN4 is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbTransPlmn4',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN5.\n\n\n\nPLMN5 refers to the PLMN configured in the attribute additionalPlmnList[4] located on EUtranCellFDD or EUtranCellTDD.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN5 is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbTransPlmn5',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN6. \n\n\n\nPLMN6 refers to an unexpected PLMN, that is, a PLMN that cannot be associated with any PLMN configured in the ENodeBFunction or cell.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer for the UEs served by PLMN6 is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbTransPlmn6',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer per QCI.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers that has been transmitted in the downlink direction in the PDCP layer per QCI is measured on PCell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbTransQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers for RLC UM that has been transmitted in the downlink direction in the PDCP layer.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Data Radio Bearers for RLC UM that has been transmitted in the downlink direction in the PDCP layer is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpVolDlDrbTransUm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total volume of uncompressed PDCP SDU headers that has been received in the Robust Header Compression entity in the downlink direction per QCI.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume of uncompressed PDCP SDU headers that has been received in the Robust Header Compression entity in the downlink direction per QCI is measured on PCell.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpVolDlHdrQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of bits (PDCP SDU) on Signalling Radio Bearers that has been transferred (acknowledged by the UE) in the downlink direction.\n\n\n\nSRB0 volume is not included in this counter.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total number of bits (PDCP SDU) on Signalling Radio Bearers that has been transferred (acknowledged by the UE) in the downlink direction is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpVolDlSrb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Signalling Radio Bearers that has been transmitted in the downlink direction in the PDCP layer.\n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The total volume (PDCP SDU) on Signalling Radio Bearers that has been transmitted in the downlink direction in the PDCP layer is measured on PCell.',
                'immutable': false,
                'key': 'pmPdcpVolDlSrbTrans',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total volume of compressed PDCP SDU headers that has been received in the Robust Header Compression entity in the uplink direction per QCI.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpVolUlCmpHdrQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been received in the uplink direction.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolUlDrb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been received in the uplink direction in the last TTI when a buffer is emptied.',
                'immutable': false,
                'key': 'pmPdcpVolUlDrbLastTTI',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been received in the uplink direction for the UEs served by PLMN0. \n\n\n\nPLMN0 refers to the PLMN configured in the attribute eNodeBPlmnId located on ENodeBFunction.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolUlDrbPlmn0',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been received in the uplink direction for the UEs served by PLMN1. \n\n\n\nPLMN1 refers to the PLMN configured in the attribute additionalPlmnList[0] located on EUtranCellFDD or EUtranCellTDD.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolUlDrbPlmn1',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been received in the uplink direction for the UEs served by PLMN2. \n\n\n\nPLMN2 refers to the PLMN configured in the attribute additionalPlmnList[1] located on EUtranCellFDD or EUtranCellTDD.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolUlDrbPlmn2',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been received in the uplink direction for the UEs served by PLMN3. \n\n\n\nPLMN3 refers to the PLMN configured in the attribute additionalPlmnList[2] located on EUtranCellFDD or EUtranCellTDD.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolUlDrbPlmn3',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been received in the uplink direction for the UEs served by PLMN4. \n\n\n\nPLMN4 refers to the PLMN configured in the attribute additionalPlmnList[3] located on EUtranCellFDD or EUtranCellTDD.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolUlDrbPlmn4',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been received in the uplink direction for the UEs served by PLMN5. \n\n\n\nPLMN5 refers to the PLMN configured in the attribute additionalPlmnList[4] located on EUtranCellFDD or EUtranCellTDD.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolUlDrbPlmn5',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) on Data Radio Bearers that has been received in the uplink direction for the UEs served by PLMN6. \n\n\n\nPLMN6 refers to an unexpected PLMN, that is, a PLMN that cannot be associated with any PLMN configured in the ENodeBFunction or cell.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolUlDrbPlmn6',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total volume (PDCP SDU) that has been received on Data Radio Bearers in the uplink direction per QCI.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpVolUlDrbQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total volume of decompressed PDCP SDU headers that has been transmitted from the Robust Header Compression entity in the uplink direction per QCI.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPdcpVolUlHdrQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of bits (PDCP SDU) on Signaling Radio Bearers that has been transferred (acknowledged by the RBS) in the uplink direction.\n\n\n\nSRB0 volume is not included in this counter.\n\n',
                'immutable': false,
                'key': 'pmPdcpVolUlSrb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Block (PRB) pairs available for transmission in the downlink. \n\n\n\nThe value of the counter depends on the FDD/TDD configuration and  in TDD also the special subframe configuration.',
                'immutable': false,
                'key': 'pmPrbAvailDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Blocks (PRB) available for MBMS transmission in the downlink.',
                'immutable': false,
                'key': 'pmPrbAvailDlMbms',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Block (PRB) pairs available for transmission in the uplink.\n\n\n\nThe value of the counter depends on the FDD/TDD configuration.',
                'immutable': false,
                'key': 'pmPrbAvailUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of PRBs used in the downlink direction.\n\n',
                'immutable': false,
                'key': 'pmPrbUsedDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of PRB pairs generated by Air Interface Load Generator in the DL direction for load of higher priority than the real UEs load',
                'immutable': false,
                'key': 'pmPrbUsedDlAilgHighPrio',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of PRB pairs generated by Air Interface Load Generator in DL for artificial load, both for high and low priority load.',
                'immutable': false,
                'key': 'pmPrbUsedDlAilgTot',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Block (PRB) pairs used for System Information.',
                'immutable': false,
                'key': 'pmPrbUsedDlBcch',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of PRBs used for Common Control Channels in the downlink direction.\n\n',
                'immutable': false,
                'key': 'pmPrbUsedDlCcch',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Block (PRB) pairs used for Data Radio Bearers (DRB) in the downlink.',
                'immutable': false,
                'key': 'pmPrbUsedDlDtch',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of PRB pairs used in DL per QCI for HARQ initial transmissions.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPrbUsedDlDtchFirstTransQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of PRB pairs used in DL for HARQ initial transmissions.',
                'immutable': false,
                'key': 'pmPrbUsedDlFirstTrans',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Blocks (PRB) used by MBMS transmission in the downlink',
                'immutable': false,
                'key': 'pmPrbUsedDlMbms',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Block (PRB) pairs used for paging.',
                'immutable': false,
                'key': 'pmPrbUsedDlPcch',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of PRB pairs used in DL for HARQ retransmissions.',
                'immutable': false,
                'key': 'pmPrbUsedDlReTrans',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Blocks (PRB) used for Signaling Radio Bearers (SRB) in the downlink.',
                'immutable': false,
                'key': 'pmPrbUsedDlSrb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Block (PRB) pairs for HARQ initial transmissions used for Signaling Radio Bearers (SRB) in the downlink.',
                'immutable': false,
                'key': 'pmPrbUsedDlSrbFirstTrans',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of PRBs used in the uplink direction.\n\n',
                'immutable': false,
                'key': 'pmPrbUsedUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of PRB pairs generated by Air Interface Load Generator in UL for artificial load, both for high and low priority load',
                'immutable': false,
                'key': 'pmPrbUsedUlAilgTot',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of PRBs used for Common Control Channels in the uplink direction.\n\n',
                'immutable': false,
                'key': 'pmPrbUsedUlCcch',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Block (PRB) pairs used for Data Radio Bearers (DRB) in the uplink.',
                'immutable': false,
                'key': 'pmPrbUsedUlDtch',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The total number of PRB pairs used in UL per QCI.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmPrbUsedUlDtchQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Physical Resource Block (PRB) pairs used for Signaling Radio Bearers (SRB) in the uplink.',
                'immutable': false,
                'key': 'pmPrbUsedUlSrb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'A distribution that shows the downlink Physical Resource Block (PRB) pair utilization (total number of used PRB pairs by available PRB pairs) on the Physical Downlink Shared Channel (PDSCH).\n\n\n\nPDF ranges: \n\n[0]: 0 % <= Utilization < 10 % \n\n[1]: 10 % <= Utilization < 20 % \n\n[2]: 20 % <= Utilization < 30 % \n\n[3]: 30 % <= Utilization < 40 % \n\n[4]: 40 % <= Utilization < 50 % \n\n[5]: 50 % <= Utilization < 60 % \n\n[6]: 60 % <= Utilization < 70 % \n\n[7]: 70 % <= Utilization < 80 % \n\n[8]: 80 % <= Utilization < 90 % \n\n[9]: 90 % <= Utilization',
                'immutable': false,
                'key': 'pmPrbUtilDl',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'A distribution that shows the uplink Physical Resource Block (PRB) pair utilization (total number of used PRB pairs by available PRB pairs) on the Physical Uplink Shared Channel (PUSCH).\n\n\n\nPDF ranges: \n\n[0]: 0 % <= Utilization < 10 % \n\n[1]: 10 % <= Utilization < 20 % \n\n[2]: 20 % <= Utilization < 30 % \n\n[3]: 30 % <= Utilization < 40 % \n\n[4]: 40 % <= Utilization < 50 % \n\n[5]: 50 % <= Utilization < 60 % \n\n[6]: 60 % <= Utilization < 70 % \n\n[7]: 70 % <= Utilization < 80 % \n\n[8]: 80 % <= Utilization < 90 % \n\n[9]: 90 % <= Utilization \n\n',
                'immutable': false,
                'key': 'pmPrbUtilUl',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Counts the number of received Scheduling Requests (SR) over RACH due to a failure from the UE to access the node by means of SR over PUCCH.',
                'immutable': false,
                'key': 'pmPucchFailSr',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of received Scheduling Requests on PUCCH.',
                'immutable': false,
                'key': 'pmPucchSr',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Aggregated number of attempts to allocate PUCCH resources.\n\n',
                'immutable': false,
                'key': 'pmPucchSrCqiResAllocAtt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of times a PUCCH allocation request for CQI resource(s) could not be granted\n\n',
                'immutable': false,
                'key': 'pmPucchSrCqiResCongCqi',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of times a PUCCH allocation request for SR resource(s) could not be granted.\n\n',
                'immutable': false,
                'key': 'pmPucchSrCqiResCongSr',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Peak number of received Scheduling Requests on PUCCH during a TTI.',
                'immutable': false,
                'key': 'pmPucchSrMax',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of allocated CFRA preambles.\n\n',
                'immutable': false,
                'key': 'pmRaAllocCfra',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of detected contention-based random access preambles.\n\n',
                'immutable': false,
                'key': 'pmRaAttCbra',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of detected contention-free (explicitly signalled) random access preambles.\n\n',
                'immutable': false,
                'key': 'pmRaAttCfra',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of CBRA preambles for which no random access response (RA Msg2) was sent due to expiration of the random access response window.',
                'immutable': false,
                'key': 'pmRaFailCbraMsg2Disc',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of CFRA preambles for which no random access response (RA Msg2) was sent due to expiration of the random access response window.',
                'immutable': false,
                'key': 'pmRaFailCfraMsg2Disc',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of successfully detected RA Msg3 for CBRA\n\n',
                'immutable': false,
                'key': 'pmRaSuccCbra',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of successfully completed CFRA procedures. Measured when first UL-SCH message is received after detection of the CFRA preamble.\n\n',
                'immutable': false,
                'key': 'pmRaSuccCfra',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of received Scheduling Requests on RACH from In-Synch UEs.',
                'immutable': false,
                'key': 'pmRaSuccSrInSync',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of received Scheduling Request on RACH from Out-Of-Synch UEs.',
                'immutable': false,
                'key': 'pmRaSuccSrOutOfSync',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Distribution of the measured Timing Advance value at random access.\n\n\n\nPDF ranges:\n\n[0]: [0..9]%,\n\n[1]: [10..19]%,\n\n[2]: [20..29]%, \n\n[3]: [30..39]%, \n\n[4]: [40..49]%, \n\n[5]: [50..59]%, \n\n[6]: [60..69]%, \n\n[7]: [70..79]%, \n\n[8]: [80..89]%, \n\n[9]: [90..99]%, \n\n[10]: [100..109]%, \n\n[11]: [110..200]%\n\n',
                'immutable': false,
                'key': 'pmRaSuccTa',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of detected Contention Free Random Access (CFRA, known as non-contention based random access in 3GPP term) preambles that are not allocated to any UE',
                'immutable': false,
                'key': 'pmRaUnassignedCfraFalse',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unassigned Contention Free Random Access (CFRA, known as non-contention based random access in 3GPP term) preambles at each PRACH occasion during the reporting period.',
                'immutable': false,
                'key': 'pmRaUnassignedCfraSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This measurement provides the number of UEInformationResponse messages received with contentionDetected IE set to TRUE.',
                'immutable': false,
                'key': 'pmRachNumContentionReport',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'This measurement provides the distribution of number of RACH preambles sent by the UE as reported by the UEs inside the UEInformationResponse message according to 32.425\n\n[0]: 1 preamble \n\n[1]: 2 preambles \n\n[2]: 3 preambles \n\n[3]: 4 preambles \n\n[4]: 5 preambles \n\n[5]: 6 preambles \n\n[6]: 7 preambles \n\n[7]: 8 preambles \n\n[8]: 9 preambles \n\n[9]: >= 10 preambles\n\n',
                'immutable': false,
                'key': 'pmRachPreambleDist',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The measured Noise and Interference Power on PUSCH, according to 36.214\n\n\n\nPDF ranges:\n\n[0]: N+I <= -121\n\n[1]: -121 < N+I <= -120\n\n[2]: -120 < N+I <= -119\n\n[3]: -119 < N+I <= -118\n\n[4]: -118 < N+I <= -117\n\n[5]: -117 < N+I <= -116\n\n[6]: -116 < N+I <= -115\n\n[7]: -115 < N+I <= -114\n\n[8]: -114< N+I <= -113\n\n[9]: -113 < N+I <= -112\n\n[10]: -112 < N+I <= -108\n\n[11]: -108 < N+I <= -104\n\n[12]: -104 < N+I <= -100\n\n[13]: -100 < N+I <= -96\n\n[14]: -96 < N+I <= -92\n\n[15]: -92 < N+I\n\n',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The accumulated interference power per PRB. \n\n\n\nPDF range:\n\n[0]: 1st Prb starting from the low part of the spectrum\n\n[1]: 2nd Prb starting from the low part of the spectrum\n\n.....\n\n[99]: 100th Prb starting from the low part of the spectrum',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB1',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb1',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB10',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb10',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB100',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb100',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB11',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb11',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB12',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb12',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB13',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb13',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB14',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb14',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB15',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb15',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB16',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb16',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB17',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb17',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB18',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb18',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB19',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb19',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB2',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb2',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB20',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb20',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB21',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb21',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB22',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb22',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB23',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb23',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB24',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb24',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB25',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb25',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB26',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb26',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB27',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb27',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB28',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb28',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB29',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb29',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB3',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb3',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB30',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb30',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB31',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb31',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB32',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb32',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB33',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb33',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB34',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb34',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB35',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb35',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB36',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb36',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB37',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb37',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB38',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb38',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB39',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb39',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB4',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb4',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB40',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb40',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB41',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb41',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB42',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb42',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB43',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb43',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB44',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb44',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB45',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb45',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB46',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb46',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB47',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb47',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB48',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb48',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB49',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb49',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB5',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb5',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB50',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb50',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB51',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb51',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB52',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb52',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB53',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb53',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB54',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb54',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB55',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb55',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB56',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb56',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB57',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb57',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB58',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb58',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB59',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb59',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB6',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb6',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB60',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb60',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB61',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb61',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB62',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb62',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB63',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb63',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB64',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb64',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB65',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb65',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB66',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb66',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB67',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb67',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB68',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb68',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB69',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb69',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB7',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb7',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB70',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb70',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB71',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb71',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB72',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb72',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB73',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb73',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB74',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb74',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB75',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb75',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB76',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb76',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB77',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb77',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB78',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb78',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB79',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb79',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB8',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb8',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB80',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb80',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB81',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb81',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB82',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb82',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB83',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb83',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB84',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb84',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB85',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb85',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB86',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb86',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB87',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb87',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB88',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb88',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB89',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb89',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB9',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb9',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB90',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb90',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB91',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb91',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB92',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb92',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB93',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb93',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB94',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb94',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB95',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb95',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB96',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb96',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB97',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb97',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB98',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb98',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated interference power for PRB99',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPrb99',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The measured Noise and Interference Power on PUCCH, according to 36.214.\n\n\n\nPDF ranges:\n\n[0]: N+I <= -121\n\n[1]: -121 < N+I <= -120\n\n[2]: -120 < N+I <= -119\n\n[3]: -119 < N+I <= -118\n\n[4]: -118 < N+I <= -117\n\n[5]: -117 < N+I <= -116 \n\n[6]: -116 < N+I <= -115 \n\n[7]: -115 < N+I <= -114\n\n[8]: -114< N+I <= -113\n\n[9]: -113 < N+I <= -112\n\n[10]: -112 < N+I <= -108\n\n[11]: -108 < N+I <= -104\n\n[12]: -104 < N+I <= -100\n\n[13]: -100 < N+I <= -96\n\n[14]: -96 < N+I <= -92\n\n[15]: -92 < N+I',
                'immutable': false,
                'key': 'pmRadioRecInterferencePwrPucch',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Transport Blocks on MAC level scheduled in uplink where the UE was considered to be power limited.\n\n',
                'immutable': false,
                'key': 'pmRadioTbsPwrRestricted',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Transport Blocks on MAC level scheduled in uplink where the UE was NOT considered to be power limited.\n\n',
                'immutable': false,
                'key': 'pmRadioTbsPwrUnrestricted',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total amount of physical resources used for transmission in the downlink. Both successful and unsuccessful transmissions are counted.\n\n',
                'immutable': false,
                'key': 'pmRadioThpResDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total amount of physical resources used for transmission in the downlink for UEs that are considered to be in true radio conditions. Both successful and unsuccessful transmissions are counted.\n\n',
                'immutable': false,
                'key': 'pmRadioThpResDlSelTbs',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total amount of physical resources used for transmission in the uplink. Both successful and unsuccessful transmissions are counted.\n\n',
                'immutable': false,
                'key': 'pmRadioThpResUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total amount of physical resources used for transmission in the uplink for UEs that are considered to be in true radio conditions. Both successful and unsuccessful transmissions are counted.\n\n',
                'immutable': false,
                'key': 'pmRadioThpResUlSelTbs',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total successfully transferred data volume on MAC level in the downlink. This counter includes possible padding bits.\n\n',
                'immutable': false,
                'key': 'pmRadioThpVolDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total successfully transferred data volume on MAC level in the downlink for secondary cell traffic (i.e. the UE has another cell as its primary component carrier (PCell)). This counter includes possible padding bits.',
                'immutable': false,
                'key': 'pmRadioThpVolDlSCell',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total successfully transferred data volume on MAC level in the downlink for UEs that are considered to be in true radio condition. This counter includes possible padding bits.\n\n',
                'immutable': false,
                'key': 'pmRadioThpVolDlSelTbs',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total successfully transferred data volume on MAC level in the uplink. This counter includes possible padding bits.\n\n',
                'immutable': false,
                'key': 'pmRadioThpVolUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total successfully transferred data volume on MAC level in the uplink for UEs that are considered to be in true radio condition. This counter includes possible padding bits.\n\n',
                'immutable': false,
                'key': 'pmRadioThpVolUlSelTbs',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The transmission mode / rank distributions gives more detailed information on how much each transmission mode and rank is used.\n\n\n\n\n\nPDF ranges:\n\n[0]: Transmit diversity\n\n[1]: Open Loop SM Rank 1\n\n[2]: Open Loop SM Rank 2\n\n[3]: Closed Loop SM rank 1\n\n[4]: Closed Loop SM rank 2\n\n',
                'immutable': false,
                'key': 'pmRadioTxRankDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Distribution of the outer loop adjustment.\n\n\n\nPDF ranges:\n\nPDF ranges:\n\n[0]: outer loop adjustment <= -7 \n\n[1]: -7 < outer loop adjustment <= -3 \n\n[2]: -3 < outer loop adjustment <= -1\n\n[3]: -1 < outer loop adjustment <= 1\n\n[4]: 1 < outer loop adjustment <= 3\n\n[5]: 3 < outer loop adjustment <= 7\n\n[6]: 7 < outer loop adjustment <= 10\n\n[7]: 10 < outer loop adjustment\n\n',
                'immutable': false,
                'key': 'pmRadioUeOutLoopAdjDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 0 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 0 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband0Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 10 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 10 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband10Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 11 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 11 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband11Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 12 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 12 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband12Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 1 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 1 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband1Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 2 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 2 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband2Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 3 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 3 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband3Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 4 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 4 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband4Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 5 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 5 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband5Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 6 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 6 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband6Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 7 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 7 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband7Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 8 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 8 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband8Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 9 CQI reported by UEs in the cell for rank 2 transmissions. The average value of the reported sub-band 9 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqi2SubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2Subband9Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total sample count of rank 2 aperiodic CQI reported by UEs in the cell within the measurement period. It is used to compute the average CQI value for each sub-band.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqi2SubbandSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The reported CQI value from UEs in a distribution.\n\n\n\nPDF ranges:\n\n[0]: CQI = 0\n\n[1]: CQI = 1\n\n[2]: CQI = 2\n\n[3]: CQI = 3\n\n[4]: CQI = 4\n\n[5]: CQI = 5\n\n[6]: CQI = 6\n\n[7]: CQI = 7\n\n[8]: CQI = 8\n\n[9]: CQI = 9\n\n[10]: CQI = 10\n\n[11]: CQI = 11\n\n[12]: CQI = 12\n\n[13]: CQI = 13\n\n[14]: CQI = 14\n\n[15]: CQI = 15\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The reported CQI values related to rank 2 transmissions from UEs in a distribution\n\n\n\nPDF ranges:\n\n[0]: CQI = 0\n\n[1]: CQI = 1\n\n[2]: CQI = 2\n\n[3]: CQI = 3\n\n[4]: CQI = 4\n\n[5]: CQI = 5\n\n[6]: CQI = 6\n\n[7]: CQI = 7\n\n[8]: CQI = 8\n\n[9]: CQI = 9\n\n[10]: CQI = 10\n\n[11]: CQI = 11\n\n[12]: CQI = 12\n\n[13]: CQI = 13\n\n[14]: CQI = 14\n\n[15]: CQI = 15',
                'immutable': false,
                'key': 'pmRadioUeRepCqiDistr2',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 0 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 0 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband0Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 10 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 10 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband10Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 11 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 11 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband11Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 12 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 12 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband12Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 1 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 1 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband1Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 2 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 2 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband2Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 3 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 3 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband3Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 4 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 4 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband4Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 5 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 5 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband5Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 6 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 6 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband6Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 7 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 7 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband7Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 8 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 8 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband8Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The accumulated sum of all sub-band 9 CQI reported by UEs in the cell for rank 1 transmissions. The average value of the reported sub-band 9 CQI within the measurement period can be obtained in conjunction with counter pmRadioUeRepCqiSubbandSamp.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubband9Sum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total sample count of rank 1 aperiodic CQI reported by UEs in the cell within the measurement period. It is used to compute the average CQI value for each sub-band.\n\nThe counter is defined according to 32.425.\n\n',
                'immutable': false,
                'key': 'pmRadioUeRepCqiSubbandSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The reported rank distribution indicates the rank of UEs that are in a Open and Closed Loop Spatial Multiplexing mode (where rank is reported).\n\n\n\nPDF ranges:\n\n[0]: Rank = 1\n\n[1]: Rank = 2',
                'immutable': false,
                'key': 'pmRadioUeRepRankDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The time where the UE have uplink data in a buffer and End-user bitrate shaping functionality will prohibit transmission in the uplink.',
                'immutable': false,
                'key': 'pmRateShapeTimeUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful RLC PDU transmissions (ACKs) in the downlink direction.\n\n\n\nWhen carrier aggregation is used, the total number of successful RLC PDU transmissions (ACKs) in the downlink direction is registered on the UE\'s primary component carrier (PCell).',
                'immutable': false,
                'key': 'pmRlcArqDlAck',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unsuccessful RLC PDU and RLC PDU segment transmissions (NACKs) in the downlink direction.\n\n\n\nWhen carrier aggregation is used, the total number of unsuccessful RLC PDU and RLC PDU segment transmissions (NACKs) in the downlink direction  is registered on the UE\'s primary component carrier (PCell).',
                'immutable': false,
                'key': 'pmRlcArqDlNack',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful RLC PDU transmissions (ACKs) in the uplink direction.\n\n',
                'immutable': false,
                'key': 'pmRlcArqUlAck',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unsuccessful RLC PDU and RLC PDU segment transmissions (NACKs) in the uplink direction.\n\n',
                'immutable': false,
                'key': 'pmRlcArqUlNack',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of samples for RLC delay measurements.',
                'immutable': false,
                'key': 'pmRlcDelayPktTransDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Number of samples for DL RLC delay measurements during a measurement period per QCI.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmRlcDelayPktTransDlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Aggregated time for the downlink\u00c3\u201a\u00c2 RLC\u00c3\u201a\u00c2 delay measure.',
                'immutable': false,
                'key': 'pmRlcDelayTimeDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Aggregated DL RLC delay for a measurement period per QCI.\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmRlcDelayTimeDlQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of setups of Robust Header Compression failed due to BBM limit.',
                'immutable': false,
                'key': 'pmRohcEstabFailCid',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of setups Robust Header Compression failed due to missing or inoperable license.\u00c3\u201a\u00c2 ',
                'immutable': false,
                'key': 'pmRohcEstabFailLic',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of setups Robust Header Compression failed due UE Capabilities\u00c3\u201a\u00c2 ',
                'immutable': false,
                'key': 'pmRohcEstabFailUeCap',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts.\n\n',
                'immutable': false,
                'key': 'pmRrcConnEstabAtt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts with Establishment Cause Delay Tolerant Access.',
                'immutable': false,
                'key': 'pmRrcConnEstabAttDta',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts with establishment cause emergency.\n\n',
                'immutable': false,
                'key': 'pmRrcConnEstabAttEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts with establishment cause highPriorityAccess',
                'immutable': false,
                'key': 'pmRrcConnEstabAttHpa',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts with Establishment cause Mobile Originating Data.\n\n',
                'immutable': false,
                'key': 'pmRrcConnEstabAttMod',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts with Establishment cause Mobile Originating Signaling.\n\n',
                'immutable': false,
                'key': 'pmRrcConnEstabAttMos',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts with Establishment cause Mobile Terminating Access.\n\n',
                'immutable': false,
                'key': 'pmRrcConnEstabAttMta',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts that are considered as re-attempts.\n\n',
                'immutable': false,
                'key': 'pmRrcConnEstabAttReatt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts that are considered as re-attempts for Establishment Cause Delay Tolerant Access.',
                'immutable': false,
                'key': 'pmRrcConnEstabAttReattDta',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts that are considered as re-attempts for Establishment cause Emergency.',
                'immutable': false,
                'key': 'pmRrcConnEstabAttReattEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts that are considered as re-attempts for Establishment cause High Priority Access.',
                'immutable': false,
                'key': 'pmRrcConnEstabAttReattHpa',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts that are considered as re-attempts for Establishment cause Mobile Originating Data.',
                'immutable': false,
                'key': 'pmRrcConnEstabAttReattMod',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts that are considered as re-attempts for Establishment cause Mobile Originating Signaling.',
                'immutable': false,
                'key': 'pmRrcConnEstabAttReattMos',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of RRC Connection Request attempts that are considered as re-attempts for Establishment cause Mobile Terminating Access.',
                'immutable': false,
                'key': 'pmRrcConnEstabAttReattMta',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of failed establishment of RRC Connection due to the fact that all the UE\'s bearers are rejected during bearer admission.',
                'immutable': false,
                'key': 'pmRrcConnEstabFailBearerAdmissionRej',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of failed RRC Connection Establishments due to high load.',
                'immutable': false,
                'key': 'pmRrcConnEstabFailHighLoad',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of failed RRC Connection Establishments due to lack of connected users license.\n\n',
                'immutable': false,
                'key': 'pmRrcConnEstabFailLic',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of failed RRC Connection Establishments due to overload.',
                'immutable': false,
                'key': 'pmRrcConnEstabFailOverload',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful RRC Connection Establishments.\n\n',
                'immutable': false,
                'key': 'pmRrcConnEstabSucc',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful RRC Connection Establishments for Establishment Cause Delay Tolerant Access.',
                'immutable': false,
                'key': 'pmRrcConnEstabSuccDta',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful RRC Connection Establishments for Establishment cause Emergency.',
                'immutable': false,
                'key': 'pmRrcConnEstabSuccEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful RRC Connection Establishments for GUMMEI type equal to native.',
                'immutable': false,
                'key': 'pmRrcConnEstabSuccGummeiNative',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful RRC Connection Establishments for Establishment cause High Priority.\n\n',
                'immutable': false,
                'key': 'pmRrcConnEstabSuccHpa',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful RRC Connection Establishments for Establishment cause Mobile Originating Data.',
                'immutable': false,
                'key': 'pmRrcConnEstabSuccMod',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful RRC Connection Establishments for Establishment cause Mobile Originating Signaling.',
                'immutable': false,
                'key': 'pmRrcConnEstabSuccMos',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful RRC Connection Establishments for Establishment cause Mobile Terminating Access.',
                'immutable': false,
                'key': 'pmRrcConnEstabSuccMta',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of times the corresponding Sum counter has accumulated a new sample. Associated ACC pmCounter pmRrcConnLevSum.',
                'immutable': false,
                'key': 'pmRrcConnLevSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Sum of all sample values recorded for "number of UEs in RRC_CONNECTED mode".\n\n',
                'immutable': false,
                'key': 'pmRrcConnLevSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of UEs in RRC_CONNECTED that have UL sync state \'out-of-sync\'. ',
                'immutable': false,
                'key': 'pmRrcConnLevSumUlOutOfSync',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Peak number of UE in RRC_CONNECTED mode.\n\n',
                'immutable': false,
                'key': 'pmRrcConnMax',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of RRC connection reconfiguration attempts (excluding attempt done for mobility purpose).',
                'immutable': false,
                'key': 'pmRrcConnReconfAttNoMob',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Successful number of RRC connection reconfiguration attempts (excluding attempt done for mobility purpose).',
                'immutable': false,
                'key': 'pmRrcConnReconfSuccNoMob',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Reestablishment attempts.',
                'immutable': false,
                'key': 'pmRrcConnReestAtt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Reestablishments attempted during an ongoing handover ',
                'immutable': false,
                'key': 'pmRrcConnReestAttHo',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Reestablishments attempts that failed due to feature "Multi-Target RRC Connection Reestablishment" not being OPERABLE',
                'immutable': false,
                'key': 'pmRrcConnReestFailLicMtReest',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of successful RRC Connection Reestablishments.',
                'immutable': false,
                'key': 'pmRrcConnReestSucc',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of successful RRC Connection Reestablishments attempted during an ongoing handover ',
                'immutable': false,
                'key': 'pmRrcConnReestSuccHo',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of times the corresponding Sum counter has been incremented. Associated ACC pmCounter pmRrcConnTuneOutLevSum.',
                'immutable': false,
                'key': 'pmRrcConnTuneOutLevSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Sum of all sample values recorded for "number of Tune-out UEs in RRC_CONNECTED mode".',
                'immutable': false,
                'key': 'pmRrcConnTuneOutLevSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This measurement provides the number of S1 Signalling connection establishment attempts for any establishment cause.\n\n',
                'immutable': false,
                'key': 'pmS1SigConnEstabAtt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This measurement provides the number of S1 Signalling connection establishment attempts with RRC Connection Request Establishment cause Delay Tolerant Access.',
                'immutable': false,
                'key': 'pmS1SigConnEstabAttDta',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This measurement provides the number of S1 Signalling connection establishment attempts with RRC Connection Request Establishment cause Emergency.',
                'immutable': false,
                'key': 'pmS1SigConnEstabAttEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This measurement provides the number of S1 Signalling connection establishment attempts with RRC Connection Request Establishment cause High Priority Access.',
                'immutable': false,
                'key': 'pmS1SigConnEstabAttHpa',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This measurement provides the number of S1 Signalling connection establishment attempts with RRC Connection Request Establishment cause Mobile Originating Data.',
                'immutable': false,
                'key': 'pmS1SigConnEstabAttMod',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This measurement provides the number of S1 Signalling connection establishment attempts with RRC Connection Request Establishment cause Mobile Originating Signalling.',
                'immutable': false,
                'key': 'pmS1SigConnEstabAttMos',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This measurement provides the number of S1 Signalling connection establishment attempts with RRC Connection Request Establishment cause Mobile Terminating Access.',
                'immutable': false,
                'key': 'pmS1SigConnEstabAttMta',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful S1 signalling connection establishments.\n\n',
                'immutable': false,
                'key': 'pmS1SigConnEstabSucc',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful S1 signalling connection establishments with Establishment cause Delay Tolerant Access.',
                'immutable': false,
                'key': 'pmS1SigConnEstabSuccDta',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful S1 signalling connection establishments with Establishment cause Emergency.',
                'immutable': false,
                'key': 'pmS1SigConnEstabSuccEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful S1 signalling connection establishments with Establishment cause High Priority Access.',
                'immutable': false,
                'key': 'pmS1SigConnEstabSuccHpa',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful S1 signalling connection establishments with Establishment cause Mobile Originating Data.',
                'immutable': false,
                'key': 'pmS1SigConnEstabSuccMod',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful S1 signalling connection establishments with Establishment cause Mobile Originating Signalling.',
                'immutable': false,
                'key': 'pmS1SigConnEstabSuccMos',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of successful S1 signalling connection establishments with Establishment cause Mobile Terminating Access.',
                'immutable': false,
                'key': 'pmS1SigConnEstabSuccMta',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The aggregated number of ms in which DRB data was required to be scheduled in the downlink.',
                'immutable': false,
                'key': 'pmSchedActivityCellDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The aggregated number of ms in which DRB data was required to be scheduled in the uplink.',
                'immutable': false,
                'key': 'pmSchedActivityCellUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total UEs scheduling activity in the downlink.',
                'immutable': false,
                'key': 'pmSchedActivityUeDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total UEs scheduling activity in the uplink.',
                'immutable': false,
                'key': 'pmSchedActivityUeUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The sum of the contributions from each UE of the number of ms where respective UE is limited in the downlink direction by its UE capability.\n\n',
                'immutable': false,
                'key': 'pmSchedRestrictUeCatDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The sum of the contributions from each UE of the number of ms where respective UE is limited in the uplink direction by its UE capability.\n\n',
                'immutable': false,
                'key': 'pmSchedRestrictUeCatUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of service seconds aggregated for DRBs in a cell. A DRB is said to be \u00c3\u201a\u00c2\u00b4in service\u00c3\u201a\u00c2\u00b4 from the first data on a DRB (UL or DL) until the last on the DRB is sent/received.',
                'immutable': false,
                'key': 'pmServiceTimeDrb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Number of service seconds aggregated for DRBs mapping to a specific QCI in a cell. A DRB is said to be \u00c3\u201a\u00c2\u00b4in service\u00c3\u201a\u00c2\u00b4 from the first data on a DRB (UL or DL) until the last on the DRB is sent/received.\n\n\n\n[0]: N/A\n\n[1]: Service Time for DRBs mapping to QCI 1\n\n...\n\n[255]: Service Time for DRBs mapping to QCI 255\n\n\n\nCompressed: True',
                'immutable': false,
                'key': 'pmServiceTimeDrbQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of service seconds aggregated for UEs in a cell. A UE is said to be \u00c3\u201a\u00c2\u00b4in service\u00c3\u201a\u00c2\u00b4 if any of its associated DRBs are.',
                'immutable': false,
                'key': 'pmServiceTimeUe',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This counters shows the accumulated active session time for all DRBs in a cell.',
                'immutable': false,
                'key': 'pmSessionTimeDrb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The session time aggregated for DRBs mapping to a QCI. \n\nCompressed: True',
                'immutable': false,
                'key': 'pmSessionTimeDrbQci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This counters shows the accumulated active session time for all UEs in a cell.',
                'immutable': false,
                'key': 'pmSessionTimeUe',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Distribution of the SINR values calculated for PUCCH .\n\n\n\nPDF ranges:\n\n[0]: SINR <= -15 \n\n[1]: -15 < SINR <= -12\n\n[2]: -12 < SINR <= -9\n\n[3]: -9 < SINR <= -6\n\n[4]: -6 < SINR <= -3\n\n[5]: -3 < SINR <= 0\n\n[6]: 0 < SINR <= 3\n\n[7]: 3 < SINR\n\n',
                'immutable': false,
                'key': 'pmSinrPucchDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Distribution of the SINR values calculated for PUSCH .\n\n\n\nPDF ranges:\n\n[0]: SINR <= -5 \n\n[1]: -5 < SINR <= -2\n\n[2]: -2 < SINR <= 2\n\n[3]: 2 < SINR <= 6\n\n[4]: 6 < SINR <= 10\n\n[5]: 10 < SINR <= 14\n\n[6]: 14 < SINR <= 17\n\n[7]: 17 < SINR\n\n',
                'immutable': false,
                'key': 'pmSinrPuschDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Maximum sample value of number of UEs using TTI Bundling.',
                'immutable': false,
                'key': 'pmTtiBundlingUeMax',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Counts the number of times the corresponding pmTtiBundlingUeSum has accumulated a new sample.',
                'immutable': false,
                'key': 'pmTtiBundlingUeSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Sum of all sample values recorded for number of UEs using TTI Bundling.',
                'immutable': false,
                'key': 'pmTtiBundlingUeSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'A distribution of the UE capability parameter UeCategory for established UE contexts.\n\n\n\nPDF ranges:\n\n[0]: ueCategory = 1\n\n[1]: ueCategory = 2\n\n[2]: ueCategory = 3\n\n[3]: ueCategory = 4\n\n[4]: ueCategory = 5',
                'immutable': false,
                'key': 'pmUeCategoryDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Initial Context Setup Establishment attempts.\n\n',
                'immutable': false,
                'key': 'pmUeCtxtEstabAtt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of Initial Context Setup Establishment successes',
                'immutable': false,
                'key': 'pmUeCtxtEstabSucc',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'PrimaryTypeAttribute: pmUeCtxtRelAbnormalEnb Description',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalEnb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal UE Contexts Releases initiated by the RBS and that there was data in either the UL or DL buffer (i.e. active).',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalEnbAct',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Counts the total number of abnormal UE context releases by the eNodeB due to cell down time (manual intervention) when data was in either the UL or DL buffer (i.e. active).',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalEnbActCdt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal UE Context Releases initiated by the eNB due to handover execution failure and that there was data in either the UL or DL buffer (i.e. active).\n\n',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalEnbActHo',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal UE context releases initiated by the RBS due to pre-emption and that there was data in either the UL or DL buffer (i.e. active).',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalEnbActPe',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal UE Context releases initiated by the eNB due to S1 interface down, S1 bearer error indication, and SGW failure detection, and that there was data in either the UL or DL buffer (i.e. active).',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalEnbActTnFail',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal UE Context releases by the RBS due that the radio connection with the UE is lost and that there was data in either the UL or DL buffer (i.e. active).',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalEnbActUeLost',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal UE Contexts Releases initiated by the RBS due to license reject.',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalEnbLic',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal UE Context releases initiated by the RBS due to pre-emption. The counter is stepped regardless of whether data was or was not lost in UL/DL buffers.',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalEnbPe',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of abnormal UE Contexts Releases for Tune-out UEs initiated by the RBS. The counter is stepped regardless of whether data was or was not lost in UL/DL buffers.',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalEnbTuneOut',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of UE Context Releases initiated by the MME with a cause regarded as abnormal and that there was data in either the UL or DL buffer (i.e. active).',
                'immutable': false,
                'key': 'pmUeCtxtRelAbnormalMmeAct',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of RRC Connection Release with redirect to CDMA2000 1xRTT triggered by CS Fallback\n\n\n\n',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbCdma1xRtt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of RRC Connection Release with redirect to CDMA2000 1xRTT triggered by CS Fallback Emergency\n\n\n\n',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbCdma1xRttEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Release with redirect to GSM triggered by CS Fallback.',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbGsm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Release with redirect to GSM triggered by CS Fallback Emergency.',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbGsmEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of times a CS Fallback has been triggered where the UE should be doing a handover to a cell found by measurements, the handover preparation failed and the UE was redirected to a CDMA2000 1xRTT frequency',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbHoPrepFail1xRtt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of times a CS Fallback Emergency Call has been triggered where the UE should be doing a handover to a cell found by measurements, the handover preparation failed and the UE was redirected to a CDMA2000 1xRTT frequency',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbHoPrepFail1xRttEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Release triggered by CS Fallback for Limited Dual Radio UE LTE/1xRTT.',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbLimitedDualRadioUeCdma',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of times a CS Fallback has been triggered where the UE should be doing a handover to a cell found by measurements, the measurement failed to find a target cell, and the UE was redirected to a CDMA2000 1xRTT frequency',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbMeasTO1xRtt',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Number of times a CS Fallback Emergency Call has been triggered where the UE should be doing a handover to a cell found by measurements, the measurement failed to find a target cell, and the UE was redirected to a CDMA2000 1xRTT frequency',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbMeasTO1xRttEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Release with redirect to TD-SCDMA triggered by CS Fallback.',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbTdScdma',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Release with redirect to TD-SCDMA triggered by CS Fallback Emergency.',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbTdScdmaEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Release with redirect to WCDMA triggered by CS Fallback.',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbWcdma',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Release with redirect to WCDMA triggered by CS Fallback Emergency.',
                'immutable': false,
                'key': 'pmUeCtxtRelCsfbWcdmaEm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of UE Context Releases initiated by the MME excluding successful handover. The counter is stepped regardless of whether data was or was not lost in UL/DL buffers.',
                'immutable': false,
                'key': 'pmUeCtxtRelMme',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of UE Context Releases initiated by the MME excluding successful handover and that there was data in either the UL or DL buffer (i.e. active).',
                'immutable': false,
                'key': 'pmUeCtxtRelMmeAct',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of normal UE Context Releases triggered by RBS. The counter is stepped regardless of whether data was or was not lost in UL/DL buffers.',
                'immutable': false,
                'key': 'pmUeCtxtRelNormalEnb',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of normal UE Context Releases triggered by RBS and that there was data in either the UL or DL buffer (i.e. active).',
                'immutable': false,
                'key': 'pmUeCtxtRelNormalEnbAct',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of normal UE Context Releases initiated by the RBS for Tune-out UEs. The counter is stepped regardless of whether data was or was not lost in UL/DL buffers',
                'immutable': false,
                'key': 'pmUeCtxtRelNormalEnbTuneOut',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Session Continuity RRC Connection Release with redirect to CDMA2000.\n\n',
                'immutable': false,
                'key': 'pmUeCtxtRelSCCdma',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of RRC Connection Release with redirect to E-Utra.\n\n',
                'immutable': false,
                'key': 'pmUeCtxtRelSCEUtra',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Session Continuity RRC Connection Release with redirect to GERAN.\n\n',
                'immutable': false,
                'key': 'pmUeCtxtRelSCGsm',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Session Continuity RRC Connection Release with redirect to UTRA TDD',
                'immutable': false,
                'key': 'pmUeCtxtRelSCTdScdma',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of Session Continuity RRC Connection Release with redirect to UTRA FDD.\n\n',
                'immutable': false,
                'key': 'pmUeCtxtRelSCWcdma',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Distribution of the measured Timing Advance value for UL synchronized UEs\n\n\n\nPDF ranges:\n\n[0]: [0..9]%,\n\n[1]: [10..19]%,\n\n[2]: [20..29]%, \n\n[3]: [30..39]%, \n\n[4]: [40..49]%, \n\n[5]: [50..59]%, \n\n[6]: [60..69]%, \n\n[7]: [70..79]%, \n\n[8]: [80..89]%, \n\n[9]: [90..99]%, \n\n[10]: [100..109]%, \n\n[11]: [110..200]%',
                'immutable': false,
                'key': 'pmUeCtxtTa',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Distribution of the DL UE throughput. One DL UE throughput sample is obtained by dividing the total volume (PDCP SDU) on Data Radio Bearers per UE, that has been transferred (UM and AM) in the downlink direction, with a time interval applicable to the volume measurement.\n\n\n\nPDF ranges:\n\n[0]: 0 < DL UE thp sample < 1.000\n\n[1]: 1.000 <= DL UE thp sample < 5.000\n\n[2]: 5.000 <= DL UE thp sample < 10.000\n\n[3]: 10.000 <= DL UE thp sample < 20.000\n\n[4]: 20.000 <= DL UE thp sample < 50.000\n\n[5]: 50.000 <= DL UE thp sample < 100.000\n\n[6]: 100.000 <= DL UE thp sample < 150.000\n\n[7]: 150.000 <= DL UE thp sample\n\n',
                'immutable': false,
                'key': 'pmUeThpDlDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The effective DL transport time comprises those periods from when the first part of the PDCP SDU of the DL buffer was transmitted on Uu until the buffer is emptied, excluding the TTI emptying the buffer. \n\n\n\nWhen carrier aggregation is used, a PDCP SDU can be sent over multiple cells (PCell/SCell(s)). The effective DL transport time, comprising those periods from when the first part of the PDCP SDU of the DL buffer was transmitted on Uu until the buffer is emptied, excluding the TTI emptying the buffer, is registered on PCell.\n\n',
                'immutable': false,
                'key': 'pmUeThpTimeDl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The UL volume transfer time used for UL UE Throughput. It comprises of time periods from when the 5th MAC SDU data reception of an UL buffer transfer on Uu until the buffer is emptied, excluding the TTI emptying the buffer.',
                'immutable': false,
                'key': 'pmUeThpTimeUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The time where the UE have uplink data in a buffer and End-user bitrate shaping functionality will prohibit transmission in the uplink.',
                'immutable': false,
                'key': 'pmUeThpTimeUlRs',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Distribution of the UL UE throughput. One UL UE throughput sample is obtained by dividing the total volume (PDCP SDU) on Data Radio Bearers per UE, that has been received in the uplink direction, with a time interval applicable to the volume measurement.\n\n\n\nPDF ranges:\n\n[0]: 0 < UL UE thp sample < 1.000\n\n[1]: 1.000 <= UL UE thp sample < 3.000\n\n[2]: 3.000 <= UL UE thp sample < 5.000\n\n[3]: 5.000 <= UL UE thp sample < 10.000\n\n[4]: 10.000 <= UL UE thp sample < 20.000\n\n[5]: 20.000 <= UL UE thp sample < 30.000\n\n[6]: 30.000 <= UL UE thp sample < 60.000\n\n[7]: 60.000 <= UL UE thp sample ',
                'immutable': false,
                'key': 'pmUeThpUlDistr',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The UL DRB volume used for UL UE Throughput. It comprises of the MAC SDU volume received on Uu, excluding the volume received in the first 4 data receptions of an UL buffer transfer and the TTI emptying the UL buffer.\n\n\n\n',
                'immutable': false,
                'key': 'pmUeThpVolUl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unicast UL grants transmitted.',
                'immutable': false,
                'key': 'pmUlGrantsTrans',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The total number of unicast UL grants that are confirmed by detecting a corresponding PUSCH transmission.',
                'immutable': false,
                'key': 'pmUlGrantsWithDetectedPusch',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of VoIP quality measurements that can not determine the VoIP satisfaction of a UE due to insufficient statistics. These measurements are excluded when the VoIP integrity KPI is calculated.',
                'immutable': false,
                'key': 'pmVoipQualityUeUlLowSampl',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of UE that are not satisfied with their VoIP quality. \n\n\n\n',
                'immutable': false,
                'key': 'pmVoipQualityUeUlNok',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of UE that are satisfied with their VoIP quality. \n\n\n\n\n\n',
                'immutable': false,
                'key': 'pmVoipQualityUeUlOk',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary1',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary10',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary11',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary12',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary13',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary14',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary15',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Compressed: True',
                'immutable': false,
                'key': 'pmZtemporary16Qci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Compressed: True',
                'immutable': false,
                'key': 'pmZtemporary17Qci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Compressed: True',
                'immutable': false,
                'key': 'pmZtemporary18Qci',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary19',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary2',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary20',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary21',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary22',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary23',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary24',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary25',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary26',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary27',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary28',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary29',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary3',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary30',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary31',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary32',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary33',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary4',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary5',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary57',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary58',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.\n\nCompressed: True',
                'immutable': false,
                'key': 'pmZtemporary59',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary6',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary60',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary61',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary62',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary63',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary64',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary65',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary66',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary67',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary68',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary69',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary7',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary70',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary71',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary8',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Normally this counter is not used, it can however sometimes be temporarily used for very late additions in a release. If so, for description see Network Impact Report in the CPI.',
                'immutable': false,
                'key': 'pmZtemporary9',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Indicates if the primary PLMN ID in the cell is reserved for operator use. The primary PLMN ID is reserved if this attribute is set to true.',
                'immutable': false,
                'key': 'primaryPlmnReserved',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'N100',
                'description': 'The Positioning Reference Signal (PRS) bandwidth in the cell.  Values are specified in number of resource blocks. N6 corresponds to 6 resource blocks, N15 corresponds to 15 resource blocks and so on. The values define the 1.4, 3, 5, 10, 15 and 20 MHz bandwidths.',
                'enumeration': {
                    'description': 'BandwidthVals',
                    'enumMembers': [
                        {
                            'description': 'N6 denotes 6 resource blocks bandwidth correponding to 1.4 MHz.',
                            'key': 'N6',
                            'value': 0
                        },
                        {
                            'description': 'N15 denotes 15 resource blocks  bandwidth correponding to 3 MHz.',
                            'key': 'N15',
                            'value': 1
                        },
                        {
                            'description': 'N25 denotes 25 resource blocks bandwidth correponding to 5 MHz.',
                            'key': 'N25',
                            'value': 2
                        },
                        {
                            'description': 'N50 denotes 50 resource blocks bandwidth correponding to 10 MHz.',
                            'key': 'N50',
                            'value': 3
                        },
                        {
                            'description': 'N100 denotes 100 resource blocks bandwidth correponding to 20 MHz.',
                            'key': 'N100',
                            'value': 4
                        },
                        {
                            'description': 'N75 denotes 75 resource blocks bandwidth correponding to 15 MHz.',
                            'key': 'N75',
                            'value': 5
                        }
                    ],
                    'key': 'BandwidthVals'
                },
                'immutable': false,
                'key': 'prsBandwidth',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 4095,
                            'minValue': -1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': -1,
                'description': 'The Positioning Reference Signal (PRS) index value for the cell defines the periodicity of the PRS occasions and the PRS subframe offset, as defined in 3GPP TS 36.211. The value -1 (default) means that this parameter will not be used for setting the PRS period and prsSubframeOffset. Instead the parameter prsPeriod shall be used to directly set the PRS period while prsSubframeOffset will be set by the system to guarantee non collision with SIB1.',
                'immutable': false,
                'key': 'prsConfigIndex',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 4095,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This parameter holds the resulting prsConfigIndex value. If prsPeriod is used by the operator then prsConfigIndexMapped will be set by the system. If prsConfigIndex is used by the operator then prsConfigIndexMapped will be a copy of the entered value.',
                'immutable': false,
                'key': 'prsConfigIndexMapped',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'PP1280',
                'description': 'The period of Positioning Reference Signal (PRS) occasions. Valid periods include 160 ms, 320 ms, 640 ms and 1280 ms.\n\n\n\nprsPeriod is used to calculate the prsConfigIndex to avoid PRS sub-frame collisions with SIB1 sub-frames.',
                'enumeration': {
                    'description': 'PrsPerVals',
                    'enumMembers': [
                        {
                            'description': 'PP160 denotes 160 ms PRS occasion period.',
                            'key': 'PP160',
                            'value': 0
                        },
                        {
                            'description': 'PP320 denotes 320 ms PRS occasion period.',
                            'key': 'PP320',
                            'value': 1
                        },
                        {
                            'description': 'PP 640 denotes 640 ms PRS occasion period.',
                            'key': 'PP640',
                            'value': 2
                        },
                        {
                            'description': 'PP1280 denotes 1280 ms PRS occasion period.',
                            'key': 'PP1280',
                            'value': 3
                        }
                    ],
                    'key': 'PrsPerVals'
                },
                'immutable': false,
                'key': 'prsPeriod',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 13,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'Number of resource blocks outside each Physical Uplink Control Channel (PUCCH) region that are available for scheduling Physical Uplink Shared Channel (PUSCH).\n\n\n\nLimited to moving the Physical Random Access Channel (PRACH) frequency allocation (located just after the PUCCH) up to the 5 MHz border at most. The PRACH can never be located at Physical Resource Block (PRB) index 25 and above.',
                'immutable': false,
                'key': 'pucchOverdimensioning',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': -3,
                            'minValue': -34
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': -34,
                'description': 'Specifies the minimum required quality level (RSRQ) in the cell in dB.\n\n\n\nCorresponds to qQualMin in TS 36.304, sent in SIB1.',
                'immutable': false,
                'key': 'qQualMin',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 8,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'The offset applied to the signalled qQualMin. \n\n\n\nCorresponds to Qqualminoffset in TS 36.304. \n\n\n\nValue 0 means that it is not sent in SIB1 and UE applies in such case the (default) value of 0 dB for Qqualminoffset.',
                'immutable': false,
                'key': 'qQualMinOffset',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': -44,
                            'minValue': -140
                        }
                    ],
                    'valueResolution': 2
                },
                'defaultValue': -140,
                'description': 'The required minimum received Reference Symbol Received Power (RSRP) level in the E-UTRA frequency for cell reselection. Corresponds to parameter Qrxlevmin in 3GPP TS 36.304. This attribute is broadcast in SIB1.',
                'immutable': false,
                'key': 'qRxLevMin',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 16,
                            'minValue': 2
                        },
                        {
                            'maxValue': 1000,
                            'minValue': 1000
                        }
                    ],
                    'valueResolution': 2
                },
                'defaultValue': 1000,
                'description': 'The offset applied to the signalled Qrxlevmin. Corresponds to parameter Qrxlevminoffset in 3GPP TS 36.304. Value 1000 means it is not sent and the UE sets Qrxlevminoffset=0dB.',
                'immutable': false,
                'key': 'qRxLevMinOffset',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Refers to an instance of QciTable and assigns a QciTable to a cell. The QciTable defines Quality of Service Class Indicator (QCI) to use in the cell.\n\n\n\nRefers to the QciTable instance corresponding to Local Distinguished Name (LDN) = ManagementElement=1, ENodeBFunction=1, QciTable=default',
                'immutable': false,
                'key': 'qciTableRef',
                'type': 'MO_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 837,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 386,
                'description': 'The first root sequence number for Random Access Channel (RACH) preamble generation. RACH root sequence is broadcast as a part of system information distribution and used for preamble detection. \n\nSee definition for logical root sequence number in 3GPP TS 36.211.',
                'immutable': false,
                'key': 'rachRootSequence',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Indicates if End-user bitrate shaping functionality is activated in this cell.',
                'immutable': false,
                'key': 'rateShapingActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Reference to an Managed Object instance containing redirection information for this EUtranCell. This reference should be set to a Cdma2000Freq, EUtranFrequency, UtranFrequency or GeranFrequencyGroup instance. Redirect to the same frequency is possible.\n\n',
                'immutable': false,
                'key': 'redirectionInfoRefPrio1',
                'type': 'MO_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Reference to an Managed Object instance containing redirection information for this EUtranCell. This reference should be set to a Cdma2000Freq, EUtranFrequency, UtranFrequency or GeranFrequencyGroup instance. Redirect to the same frequency is possible.\n\n',
                'immutable': false,
                'key': 'redirectionInfoRefPrio2',
                'type': 'MO_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Reference to an Managed Object instance containing redirection information for this EUtranCell. This reference should be set to a Cdma2000Freq, EUtranFrequency, UtranFrequency or GeranFrequencyGroup instance. Redirect to the same frequency is possible.\n\n',
                'immutable': false,
                'key': 'redirectionInfoRefPrio3',
                'type': 'MO_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Contains a list of managed object instances that reserves this managed object instance.\n\n',
                'immutable': false,
                'key': 'reservedBy',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Specifies if SDM (Spatial Division Multiplexing) for CombinedCell configuration is activated or not. If SDM is activated, it is possible to multiplex multiple Ues in different sectors in the same time and same frequency resource.',
                'immutable': false,
                'key': 'sdmActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Reference to a list of instances of SectorCarrier MO. \n\nIn L13A, it is not allowed to have more than one SectorCarrier referred by a Cell. \n\nMultiple SectorCarrier in a cell will be supported in L13B.',
                'immutable': false,
                'key': 'sectorCarrierRef',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Reference to an instance of SectorEquipmentFunction MO.\n\n',
                'immutable': false,
                'key': 'sectorFunctionRef',
                'type': 'MO_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'The periodicity of SI message 4. If no SIB is mapped to the SI message, the SI message will not be transmitted.',
                            'immutable': false,
                            'key': 'siPeriodicitySI4',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 8,
                            'description': 'The periodicity of SI message. If no SIB is mapped to this SI message, the SI message will not be transmitted. Note: SIB2 is always mapped to SI message 1 according to TS 36.331.',
                            'immutable': false,
                            'key': 'siPeriodicitySI1',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'The periodicity of SI message 10. If no SIB is mapped to the SI message, the SI message will not be transmitted.',
                            'immutable': false,
                            'key': 'siPeriodicitySI10',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'The periodicity of SI message 9. If no SIB is mapped to the SI message, the SI message will not be transmitted.',
                            'immutable': false,
                            'key': 'siPeriodicitySI9',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'The periodicity of SI message 2. If no SIB is mapped to the SI message, the SI message will not be transmitted.',
                            'immutable': false,
                            'key': 'siPeriodicitySI2',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'The periodicity of SI message 8. If no SIB is mapped to the SI message, the SI message will not be transmitted.',
                            'immutable': false,
                            'key': 'siPeriodicitySI8',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'The periodicity of SI message 6. If no SIB is mapped to the SI message, the SI message will not be transmitted.',
                            'immutable': false,
                            'key': 'siPeriodicitySI6',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'The periodicity of SI message 5. If no SIB is mapped to the SI message, the SI message will not be transmitted.',
                            'immutable': false,
                            'key': 'siPeriodicitySI5',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'The periodicity of SI message 3. If no SIB is mapped to the SI message, the SI message will not be transmitted.',
                            'immutable': false,
                            'key': 'siPeriodicitySI3',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'The periodicity of SI message 7. If no SIB is mapped to the SI message, the SI message will not be transmitted.',
                            'immutable': false,
                            'key': 'siPeriodicitySI7',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'PeriodicitySI',
                    'key': 'PeriodicitySI'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'The periodicity of System Information (SI) messages. If a System Information Block (SIB) is not mapped to a SI message, the SI message is not transmitted.',
                'immutable': false,
                'key': 'siPeriodicity',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 1,
                            'minValue': 1
                        },
                        {
                            'maxValue': 2,
                            'minValue': 2
                        },
                        {
                            'maxValue': 5,
                            'minValue': 5
                        },
                        {
                            'maxValue': 10,
                            'minValue': 10
                        },
                        {
                            'maxValue': 15,
                            'minValue': 15
                        },
                        {
                            'maxValue': 20,
                            'minValue': 20
                        },
                        {
                            'maxValue': 40,
                            'minValue': 40
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 10,
                'description': 'Length of the System Information (SI) window within which each SI message is transmitted. Applies to all SI messages. \n\n\n\nNote:  An SI window of 1 ms may be configured only when a maximum of 5 SI messages is configured for broadcast by attribute mappingInfo, to avoid collision with SIB1 transmission in subframe #5.',
                'immutable': false,
                'key': 'siWindowLength',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 0,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 5,
                                        'minValue': 5
                                    },
                                    {
                                        'maxValue': 10,
                                        'minValue': 10
                                    },
                                    {
                                        'maxValue': 15,
                                        'minValue': 15
                                    },
                                    {
                                        'maxValue': 20,
                                        'minValue': 20
                                    },
                                    {
                                        'maxValue': 25,
                                        'minValue': 25
                                    },
                                    {
                                        'maxValue': 30,
                                        'minValue': 30
                                    },
                                    {
                                        'maxValue': 40,
                                        'minValue': 40
                                    },
                                    {
                                        'maxValue': 50,
                                        'minValue': 50
                                    },
                                    {
                                        'maxValue': 60,
                                        'minValue': 60
                                    },
                                    {
                                        'maxValue': 70,
                                        'minValue': 70
                                    },
                                    {
                                        'maxValue': 75,
                                        'minValue': 75
                                    },
                                    {
                                        'maxValue': 80,
                                        'minValue': 80
                                    },
                                    {
                                        'maxValue': 85,
                                        'minValue': 85
                                    },
                                    {
                                        'maxValue': 90,
                                        'minValue': 90
                                    },
                                    {
                                        'maxValue': 95,
                                        'minValue': 95
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 95,
                            'description': 'If the random number drawn by the UE is lower than this value, access is allowed. Otherwise the access is barred.',
                            'immutable': false,
                            'key': 'acBarringFactor',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': [
                                false,
                                false,
                                false,
                                false,
                                false
                            ],
                            'description': 'Access class barring for AC 11-15. The first instance in the list is for AC 11, second is for AC 12, and so on.',
                            'immutable': false,
                            'key': 'acBarringForSpecialAC',
                            'type': 'LIST',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 4,
                                        'minValue': 4
                                    },
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'Mean access barring time in seconds for mobile originating signalling.',
                            'immutable': false,
                            'key': 'acBarringTime',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'AcBarringConfig',
                    'key': 'AcBarringConfig'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Service specific access class barring parameters for MMTEL video originating calls.\n\nThe information in broadcasted in SIB2.',
                'immutable': false,
                'key': 'ssacBarringForMMTELVideo',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Specifies presence of Information Element ssac-BarringForMMTEL-Video-r9 in SIB2.',
                'immutable': false,
                'key': 'ssacBarringForMMTELVideoPresent',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 0,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 5,
                                        'minValue': 5
                                    },
                                    {
                                        'maxValue': 10,
                                        'minValue': 10
                                    },
                                    {
                                        'maxValue': 15,
                                        'minValue': 15
                                    },
                                    {
                                        'maxValue': 20,
                                        'minValue': 20
                                    },
                                    {
                                        'maxValue': 25,
                                        'minValue': 25
                                    },
                                    {
                                        'maxValue': 30,
                                        'minValue': 30
                                    },
                                    {
                                        'maxValue': 40,
                                        'minValue': 40
                                    },
                                    {
                                        'maxValue': 50,
                                        'minValue': 50
                                    },
                                    {
                                        'maxValue': 60,
                                        'minValue': 60
                                    },
                                    {
                                        'maxValue': 70,
                                        'minValue': 70
                                    },
                                    {
                                        'maxValue': 75,
                                        'minValue': 75
                                    },
                                    {
                                        'maxValue': 80,
                                        'minValue': 80
                                    },
                                    {
                                        'maxValue': 85,
                                        'minValue': 85
                                    },
                                    {
                                        'maxValue': 90,
                                        'minValue': 90
                                    },
                                    {
                                        'maxValue': 95,
                                        'minValue': 95
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 95,
                            'description': 'If the random number drawn by the UE is lower than this value, access is allowed. Otherwise the access is barred.',
                            'immutable': false,
                            'key': 'acBarringFactor',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': null,
                            'defaultValue': [
                                false,
                                false,
                                false,
                                false,
                                false
                            ],
                            'description': 'Access class barring for AC 11-15. The first instance in the list is for AC 11, second is for AC 12, and so on.',
                            'immutable': false,
                            'key': 'acBarringForSpecialAC',
                            'type': 'LIST',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 4,
                                        'minValue': 4
                                    },
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 32,
                                        'minValue': 32
                                    },
                                    {
                                        'maxValue': 64,
                                        'minValue': 64
                                    },
                                    {
                                        'maxValue': 128,
                                        'minValue': 128
                                    },
                                    {
                                        'maxValue': 256,
                                        'minValue': 256
                                    },
                                    {
                                        'maxValue': 512,
                                        'minValue': 512
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 64,
                            'description': 'Mean access barring time in seconds for mobile originating signalling.',
                            'immutable': false,
                            'key': 'acBarringTime',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'AcBarringConfig',
                    'key': 'AcBarringConfig'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Service specific access class barring parameters for MMTEL voice originating calls.\n\nThe information in broadcasted in SIB2.',
                'immutable': false,
                'key': 'ssacBarringForMMTELVoice',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Specifies presence of Information Element ssac-BarringForMMTEL-Voice-r9 in SIB2.',
                'immutable': false,
                'key': 'ssacBarringForMMTELVoicePresent',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 0,
                                        'minValue': -6
                                    }
                                ],
                                'valueResolution': 2
                            },
                            'defaultValue': 0,
                            'description': 'The additional hysteresis to be added, in Medium-mobility state, to qHyst. \n\n\n\nCorresponds to \'Speed dependent ScalingFactor for Qhyst\' in TS 36.304.',
                            'immutable': false,
                            'key': 'qHystSfMedium',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Enables sending of sIntraSearch v920 parameters in SIB3',
                            'immutable': false,
                            'key': 'sIntraSearchv920Active',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 62,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 1000,
                                        'minValue': 1000
                                    }
                                ],
                                'valueResolution': 2
                            },
                            'defaultValue': 0,
                            'description': 'Specifies the threshold when inter-frequency and inter RAT measurements are required.\n\n\n\nCorresponds to SNonIntraSearchP in TS 36.304\n\n\n\nValue 1000 means that the parameter is not present in System Information Block 3 and the UE applies the default value of infinity for SNonIntraSearchP.',
                            'immutable': false,
                            'key': 'sNonIntraSearch',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 0,
                                        'minValue': -6
                                    }
                                ],
                                'valueResolution': 2
                            },
                            'defaultValue': 0,
                            'description': 'The additional hysteresis to be added, in High-mobility state, to qHyst.\n\n\n\nCorresponds to \'Speed dependent ScalingFactor for Qhyst\' in TS 36.304.',
                            'immutable': false,
                            'key': 'qHystSfHigh',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 62,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 1000,
                                        'minValue': 1000
                                    }
                                ],
                                'valueResolution': 2
                            },
                            'defaultValue': 1000,
                            'description': 'Specifies the threshold when intra-frequency measurements are required.\n\n\n\nCorresponds to SIntraSearchP in TS 36.304\n\n\n\nValue 1000 means that the parameter is not present in System Information Block 3 and the UE applies the default value of infinity for SIntraSearchP.',
                            'immutable': false,
                            'key': 'sIntraSearch',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 30,
                                        'minValue': 30
                                    },
                                    {
                                        'maxValue': 60,
                                        'minValue': 60
                                    },
                                    {
                                        'maxValue': 120,
                                        'minValue': 120
                                    },
                                    {
                                        'maxValue': 180,
                                        'minValue': 180
                                    },
                                    {
                                        'maxValue': 240,
                                        'minValue': 240
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 240,
                            'description': 'The duration for evaluating criteria to enter mobility states. \n\n\n\nCorresponds to TCRmax in TS 36.304.',
                            'immutable': false,
                            'key': 'tEvaluation',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 62,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': 2
                            },
                            'defaultValue': 0,
                            'description': 'Specifies the threshold used by the UE on the serving cell when reselecting towards a lower priority RAT/ frequency.\n\n\n\nCorresponds to ThreshServingLowP in TS 36.304.',
                            'immutable': false,
                            'key': 'threshServingLow',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true
                            },
                            'defaultValue': false,
                            'description': 'Enables sending of sNonIntraSearch v920 parameters in SIB3',
                            'immutable': false,
                            'key': 'sNonIntraSearchv920Active',
                            'type': 'BOOLEAN',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 31,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 1000,
                                        'minValue': 1000
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 1000,
                            'description': 'Parameter "ThreshServing, LowQ" in TS 36.304. \n\n\n\nValue 1000 means the parameter is not included in system information.',
                            'immutable': false,
                            'key': 'threshServingLowQ',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 16,
                                        'minValue': 1
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 16,
                            'description': 'The number of cell reselections during tEvaluation to enter Medium-mobility state. \n\n\n\nCorresponds to NCR_M in TS 36.304.',
                            'immutable': false,
                            'key': 'nCellChangeMedium',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 62,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': 2
                            },
                            'defaultValue': 0,
                            'description': 'Parameter "SnonIntraSearchP" in TS 36.304. See descriptions under s-NonIntraSearch.',
                            'immutable': false,
                            'key': 'sNonIntraSearchP',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 30,
                                        'minValue': 30
                                    },
                                    {
                                        'maxValue': 60,
                                        'minValue': 60
                                    },
                                    {
                                        'maxValue': 120,
                                        'minValue': 120
                                    },
                                    {
                                        'maxValue': 180,
                                        'minValue': 180
                                    },
                                    {
                                        'maxValue': 240,
                                        'minValue': 240
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 240,
                            'description': 'The additional duration for evaluating criteria to enter Normal-mobility state. \n\n\n\nCorresponds to TCRmaxHyst in TS 36.304.',
                            'immutable': false,
                            'key': 'tHystNormal',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 31,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 0,
                            'description': 's-NonIntraSearchQ-r9\n\nParameter "SnonIntraSearchQ" in TS 36.304. If the field is not present, the UE applies the (default) value of 0 dB for SnonIntraSearch.',
                            'immutable': false,
                            'key': 'sNonIntraSearchQ',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 31,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 0,
                            'description': 'Parameter "SIntraSearchQ" in TS 36.304. If the field is not present, the UE applies the (default) value of 0 dB for SIntraSearchQ.',
                            'immutable': false,
                            'key': 'sIntraSearchQ',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 0,
                                        'minValue': 0
                                    },
                                    {
                                        'maxValue': 1,
                                        'minValue': 1
                                    },
                                    {
                                        'maxValue': 2,
                                        'minValue': 2
                                    },
                                    {
                                        'maxValue': 3,
                                        'minValue': 3
                                    },
                                    {
                                        'maxValue': 4,
                                        'minValue': 4
                                    },
                                    {
                                        'maxValue': 5,
                                        'minValue': 5
                                    },
                                    {
                                        'maxValue': 6,
                                        'minValue': 6
                                    },
                                    {
                                        'maxValue': 8,
                                        'minValue': 8
                                    },
                                    {
                                        'maxValue': 10,
                                        'minValue': 10
                                    },
                                    {
                                        'maxValue': 12,
                                        'minValue': 12
                                    },
                                    {
                                        'maxValue': 14,
                                        'minValue': 14
                                    },
                                    {
                                        'maxValue': 16,
                                        'minValue': 16
                                    },
                                    {
                                        'maxValue': 18,
                                        'minValue': 18
                                    },
                                    {
                                        'maxValue': 20,
                                        'minValue': 20
                                    },
                                    {
                                        'maxValue': 22,
                                        'minValue': 22
                                    },
                                    {
                                        'maxValue': 24,
                                        'minValue': 24
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 4,
                            'description': 'Cell reselection parameter that defines the hysteresis value for ranking criteria. \n\n\n\nCorresponds to Qhyst in TS 36.304.',
                            'immutable': false,
                            'key': 'qHyst',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 62,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': 2
                            },
                            'defaultValue': 62,
                            'description': 'Parameter "SIntraSearchP" in TS 36.304. See descriptions under s-IntraSearch.',
                            'immutable': false,
                            'key': 'sIntraSearchP',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 16,
                                        'minValue': 1
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 16,
                            'description': 'The number of cell reselections during tEvaluation to enter High-mobility state. \n\n\n\nCorresponds to NCR_H in TS 36.304.',
                            'immutable': false,
                            'key': 'nCellChangeHigh',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'SIB3',
                    'key': 'SIB3'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Contains cell re-selection information common for intra-frequency, inter-frequency and/ or inter-RAT cell re-selection.\n\n',
                'immutable': false,
                'key': 'systemInformationBlock3',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 100,
                                        'minValue': 25
                                    }
                                ],
                                'valueResolution': 25
                            },
                            'defaultValue': 100,
                            'description': 'Specifies scaling factor for TreselectionUTRA for Medium-mobility state.The parameter tReselectionUtra is multiplied with this factor if the UE is in Medium-mobility state.\n\nValue mapping:\n\n25 = 0.25\n\n50 = 0.5\n\n75 = 0.75\n\n100 = 1.0\n\n\n\nCorresponds to "Speed dependent ScalingFactor for TreselectionUTRA" in TS 36.304\n\n\n\nIf both tReselectionUtraSfMedium and tReselectionUtraSfHigh is set to 100 they will not be broadcasted in System Information.',
                            'immutable': false,
                            'key': 'tReselectionUtraSfMedium',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 7,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 2,
                            'description': 'Specifies the cell reselection timer value which is applicable when evaluating cell reselection towards UTRAN.\n\n\n\nCorresponds to TreselectionUTRA in TS 36.304.',
                            'immutable': false,
                            'key': 'tReselectionUtra',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 100,
                                        'minValue': 25
                                    }
                                ],
                                'valueResolution': 25
                            },
                            'defaultValue': 100,
                            'description': 'Specifies scaling factor for TreselectionUTRA for High-mobility state. The parameter tReselectionUtra is multiplied with this factor if the UE is in High-mobility state.\n\nValue mapping:\n\n25 = 0.25\n\n50 = 0.5\n\n75 = 0.75\n\n100 = 1.0\n\n\n\nCorresponds to "Speed dependent ScalingFactor for TreselectionUTRA" in TS 36.304\n\n\n\nIf both tReselectionUtraSfMedium and tReselectionUtraSfHigh is set to 100 they will not be broadcasted in System Information.',
                            'immutable': false,
                            'key': 'tReselectionUtraSfHigh',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'SIB6',
                    'key': 'SIB6'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Contains cell re-selection information common for cell re-selection towards UTRAN.\n\n',
                'immutable': false,
                'key': 'systemInformationBlock6',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 7,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 2,
                            'description': 'Specifies the cell reselection timer value which is applicable when evaluating cell reselection towards GERAN.\n\n\n\nCorresponds to TreselectionGERA in TS 36.304.',
                            'immutable': false,
                            'key': 'tReselectionGeran',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 100,
                                        'minValue': 25
                                    }
                                ],
                                'valueResolution': 25
                            },
                            'defaultValue': 100,
                            'description': 'Specifies scaling factor for TreselectionGERA for High-mobility state. The parameter tReselectionGera is multiplied with this factor if the UE is in High-mobility state.\n\nValue mapping:\n\n25 = 0.25\n\n50 = 0.5\n\n75 = 0.75\n\n100 = 1.0\n\n\n\nCorresponds to "Speed dependent ScalingFactor for TreselectionGERA" in TS 36.304\n\n\n\nIf both tReselectionGeraSfMedium and tReselectionGeraSfHigh is set to 100 they will not be broadcasted in System Information.',
                            'immutable': false,
                            'key': 'tReselectionGeranSfHigh',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 100,
                                        'minValue': 25
                                    }
                                ],
                                'valueResolution': 25
                            },
                            'defaultValue': 100,
                            'description': 'Specifies scaling factor for TreselectionGERA for Medium-mobility state.The parameter tReselectionGera is multiplied with this factor if the UE is in Medium-mobility state.\n\nValue mapping:\n\n25 = 0.25\n\n50 = 0.5\n\n75 = 0.75\n\n100 = 1.0\n\n\n\nCorresponds to "Speed dependent ScalingFactor for TreselectionGERA" in TS 36.304\n\n\n\nIf both tReselectionGeraSfMedium and tReselectionGeraSfHigh is set to 100 they will not be broadcasted in System Information.',
                            'immutable': false,
                            'key': 'tReselectionGeranSfMedium',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'SIB7',
                    'key': 'SIB7'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Contains cell re-selection information common for cell re-selection towards GERAN.\n\n',
                'immutable': false,
                'key': 'systemInformationBlock7',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'complexRef': {
                    'attributes': [
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 100,
                                        'minValue': 25
                                    }
                                ],
                                'valueResolution': 25
                            },
                            'defaultValue': 100,
                            'description': 'Specifies scaling factor for TreselectionCDMA_HRPD for High-mobility state. The parameter tReselectionCdmaHrpd is multiplied with this factor if the UE is in High-mobility state.\n\nValue mapping:\n\n25 = 0.25\n\n50 = 0.5\n\n75 = 0.75\n\n100 = 1.0\n\n\n\nCorresponds to "Speed dependent ScalingFactor for TreselectionCDMA_HRPD" in TS 36.304\n\n\n\nIf both tReselectionHrpdSfMedium and tReselectionHrpdSfHigh is set to 100 they will not be broadcasted in System Information.',
                            'immutable': false,
                            'key': 'tReselectionCdmaHrpdSfHigh',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 15,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 8,
                            'description': 'Specifies the search window size for assisting in the search for neighbouring pilots in a CDMA2000 network.',
                            'immutable': false,
                            'key': 'searchWindowSizeCdma',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 100,
                                        'minValue': 25
                                    }
                                ],
                                'valueResolution': 25
                            },
                            'defaultValue': 100,
                            'description': 'Scaling factor for TreselectionCDMA_1xRTT for medium-mobility state .\n\nThe value of the tReselectionCdma1xRtt parameter is multiplied with this factor if the UE is in Medium-mobility state.\n\nValue mapping:\n\n25 = 0.25\n\n50 = 0.5\n\n75 = 0.75\n\n100 = 1.0\n\nCorresponds to "Speed dependent ScalingFactor for TreselectionCDMA_1xRTT" in 3GPP TS 36.304\n\nIf both tReselectionCdma1xRttSfMedium and tReselectionCdma1xRttSfHigh are set to 100 they will not be broadcast in System Information.',
                            'immutable': false,
                            'key': 'tReselectionCdma1xRttSfMedium',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 100,
                                        'minValue': 25
                                    }
                                ],
                                'valueResolution': 25
                            },
                            'defaultValue': 100,
                            'description': 'Specifies scaling factor for TreselectionCDMA_HRPD for Medium-mobility state.The parameter tReselectionCdmaHrpd is multiplied with this factor if the UE is in Medium-mobility state.\n\nValue mapping:\n\n25 = 0.25\n\n50 = 0.5\n\n75 = 0.75\n\n100 = 1.0\n\n\n\nCorresponds to "Speed dependent ScalingFactor for TreselectionCDMA_HRPD" in TS 36.304\n\n\n\nIf both tReselectionCdmaHrpdSfMedium and tReselectionCdmaHrpdSfHigh is set to 100 they will not be broadcasted in System Information.',
                            'immutable': false,
                            'key': 'tReselectionCdmaHrpdSfMedium',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 7,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 2,
                            'description': 'Cell reselection timer value applicable when evaluating cell reselection towards CDMA2000 1xRTT.\n\nThe value corresponds to TreselectionCDMA_1xRTT in 3GPP TS 36.304.',
                            'immutable': false,
                            'key': 'tReselectionCdma1xRtt',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 7,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': 2,
                            'description': 'Specifies the cell reselection timer value which is applicable when evaluating cell reselection towards CDMA2000 HRPD.\n\n\n\nCorresponds to TreselectionCDMA_HRPD in TS 36.304.',
                            'immutable': false,
                            'key': 'tReselectionCdmaHrpd',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 100,
                                        'minValue': 25
                                    }
                                ],
                                'valueResolution': 25
                            },
                            'defaultValue': 100,
                            'description': 'Scaling factor for TreselectionCDMA_1xRTT for high-mobility state.\n\nThis parameter specifies the scaling factor to be used with TreselectionCDMA_1xRTT for High-mobility state. The parameter tReselectionCdma1xRtt is multiplied with this factor if the UE is in High-mobility state.\n\nValue mapping:\n\n25 = 0.25\n\n50 = 0.5\n\n75 = 0.75\n\n100 = 1.0\n\nCorresponds to "Speed dependent ScalingFactor for TreselectionCDMA_1xRTT" in 3GPP TS 36.304\n\nIf both tReselection1xRttSfMedium and tReselection1xRttSfHigh parameters are set to 100 they will not be broadcast in System Information.',
                            'immutable': false,
                            'key': 'tReselectionCdma1xRttSfHigh',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                            }
                        }
                    ],
                    'description': 'SIB8',
                    'key': 'SIB8'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'Contains cell re-selection information common for cell re-selection towards CDMA2000. This is controlled by the licensing MO Cdma2000SessionContinuity. The SIB8 distribution and information is also controlled by other licenses.\n\n',
                'immutable': false,
                'key': 'systemInformationBlock8',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': false,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 65535,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Tracking Area Code for the EUtran Cell. All cells within an eNodeB must have equal tac values. If tac needs to be changed, then the change must be performed on all cells in the eNodeB within a transaction.',
                'immutable': false,
                'key': 'tac',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 62,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': 2
                },
                'defaultValue': 0,
                'description': 'Specifies the threshold that the signal strength of the serving cell must be below for cell reselection towards a lower priority Inter-Frequency or Inter-RAT frequency.\n\nCorresponds to ThreshServingLowP in TS 36.304.',
                'immutable': false,
                'key': 'threshServingLow',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 19,
                            'minValue': 0
                        }
                    ]
                },
                'defaultValue': null,
                'description': 'Indicates the time and date when the MO was last modified.\n\nFormat: YYYY-MM-DD HH:MM:SS',
                'immutable': false,
                'key': 'timeOfLastModification',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 1400,
                            'minValue': 1400
                        },
                        {
                            'maxValue': 3000,
                            'minValue': 3000
                        },
                        {
                            'maxValue': 5000,
                            'minValue': 5000
                        },
                        {
                            'maxValue': 10000,
                            'minValue': 10000
                        },
                        {
                            'maxValue': 15000,
                            'minValue': 15000
                        },
                        {
                            'maxValue': 20000,
                            'minValue': 20000
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 10000,
                'description': 'The uplink channel bandwidth in the cell.\n\n\n\nValid values: 1400, 3000, 5000, 10000, 15000, 20000\n\n',
                'immutable': false,
                'key': 'ulChannelBandwidth',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'Specifies the start frequency offset for the allocation of resources when the uplink interference management is disabled expressed as a percentage of the configured bandwidth.',
                'immutable': false,
                'key': 'ulConfigurableFrequencyStart',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 100,
                'description': 'Specifies the amount of frequency resources that is allocated in UL expressed as a percentage of the configured bandwidth.',
                'immutable': false,
                'key': 'ulFrequencyAllocationProportion',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': true,
                'description': 'Specifies if uplink interference management is enabled or disabled.',
                'immutable': false,
                'key': 'ulInterferenceManagementActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'This parameter controls whenever sounding shall be enabled or not for the uplink frequency selective scheduling functionality.',
                'immutable': false,
                'key': 'ulSrsEnable',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 127,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'The uncertainty altitude (h) expressed in meters is derived from the uncertainty altitude (k) by h = 45*((1.025)^k - 1).',
                'immutable': false,
                'key': 'uncertAltitude',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 127,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'Semi-major axis of uncertainty. The uncertainty (r) is derived from the uncertainty code (k) by:\n\n\n\nr = 10 * ((1.1^k) - 1).',
                'immutable': false,
                'key': 'uncertSemiMajor',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 127,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 0,
                'description': 'Semi-minor axis of uncertainty. The uncertainty (r) is derived from the uncertainty code (k) by:\n\n\n\nr = 10 * ((1.1^k) - 1).',
                'immutable': false,
                'key': 'uncertSemiMinor',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
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
                'description': 'Label for free use.\n\n',
                'immutable': false,
                'key': 'userLabel',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': -2000000000,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary13',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': -2000000000,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary14',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': -2000000000,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary15',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': -2000000000,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary16',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': -2000000000,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary17',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226', '6.1.20', '5.1.239', '6.1.40', '5.1.200', '6.1.60', '4.1.44', '5.1.63', '5.1.230', '5.1.236', '4.1.189']
                }
            }
        ],
        'moType': 'EUtranCellFDD',
        'writeBehavior': 'INHERITED',
        'namespaceversions': {
            'ERBS_NODE_MODEL': ['1.1.1', '1.1.2', '1.1.3', '1.1.4', '1.1.5', '1.1.6']
        }
    };
});
