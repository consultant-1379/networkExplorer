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
                'key': 'ENodeBFunctionId',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Indicates that all alarms in the node are suppressed. Alarm suppression can be started on site via a push on the Maintenance Button or off site via OSS-RC. \n\nPersistently stored attribute not handled by CV.',
                'immutable': false,
                'key': 'alarmSuppressed',
                'type': 'BOOLEAN',
                'writeBehavior': 'DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Status of logs collection, initiated with operation collectAutIntLogs.',
                'enumeration': {
                    'description': 'CollectLogsStatus',
                    'enumMembers': [
                        {
                            'description': 'Initial value.',
                            'key': 'NOT_STARTED',
                            'value': 0
                        },
                        {
                            'description': 'Logs collection ongoing.',
                            'key': 'COLLECTING',
                            'value': 1
                        },
                        {
                            'description': 'Logs collection has finished OK.',
                            'key': 'FINISHED',
                            'value': 2
                        },
                        {
                            'description': 'Log collection failed.',
                            'key': 'FAILED',
                            'value': 3
                        }
                    ],
                    'key': 'CollectLogsStatus'
                },
                'immutable': false,
                'key': 'collectLogsStatus',
                'type': 'ENUM_REF',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Status of trace collection, initiated with operation collectTraces.\n\n',
                'enumeration': {
                    'description': 'NodeBFunction_CollectTraceStatus',
                    'enumMembers': [
                        {
                            'description': 'Initial value.',
                            'key': 'NOT_STARTED',
                            'value': 0
                        },
                        {
                            'description': 'Trace collection ongoing.',
                            'key': 'COLLECTING',
                            'value': 1
                        },
                        {
                            'description': 'Trace collection has finished OK.',
                            'key': 'FINISHED',
                            'value': 2
                        },
                        {
                            'description': 'Trace collection failed.',
                            'key': 'FAILED',
                            'value': 3
                        }
                    ],
                    'key': 'NodeBFunction_CollectTraceStatus'
                },
                'immutable': false,
                'key': 'collectTraceStatus',
                'type': 'ENUM_REF',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'description': 'Admission threshold on accumulated Guaranteed Bit Rate (GBR) in the downlink,  expressed as a fraction of the downlink transport network bandwidth for LTE.',
                'immutable': false,
                'key': 'dlAccGbrAdmThresh',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'description': 'Downlink transport network bandwidth for LTE.',
                'immutable': false,
                'key': 'dlTransNwBandwidth',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'ON',
                'description': 'Controls if the Tracking Area Identity (TAI) is used to get IP addresses of MME nodes from the Domain Name System (DNS).\n\n\n\nThe RBS uses TAI to automatically obtain all MME IP addresses from the DNS when dnsLookupOnTai is switched on, or at RBS start or restart.\n\n\n\nThe MME IP address list is refreshed periodically and MME connections released and setup according to the new list. The MME IP address list can also be refreshed from OSS-RC.',
                'enumeration': {
                    'description': 'DnsLookup',
                    'enumMembers': [
                        {
                            'description': 'OFF',
                            'key': 'OFF',
                            'value': 0
                        },
                        {
                            'description': 'ON',
                            'key': 'ON',
                            'value': 1
                        }
                    ],
                    'key': 'DnsLookup'
                },
                'immutable': false,
                'key': 'dnsLookupOnTai',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'defaultValue': 0,
                'description': 'The interval to perform DNS Lookup to get potential new IP addresses of MME nodes. DNS lookup is performed for the TAI domain name. If the value is set to zero, then no periodic DNS Lookup is done.',
                'immutable': false,
                'key': 'dnsLookupTimer',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 63,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 24,
                'description': 'Static mapping of DiffServ label for control messages, Performance Management (PM), and Non-Access Stratum (NAS).',
                'immutable': false,
                'key': 'dscpLabel',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 1048575,
                            'minValue': -1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': -1,
                'description': 'The ENodeB ID that forms part of the Cell Global Identity, and is also used to identify the node over the S1 interface.',
                'immutable': false,
                'key': 'eNBId',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                                        'maxValue': 3,
                                        'minValue': 2
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': null,
                            'description': 'The length of the MNC part of a PLMN identity used in the radio network.',
                            'immutable': false,
                            'key': 'mncLength',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 999,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': null,
                            'description': 'The MCC part of a PLMN identity used in the radio network.',
                            'immutable': false,
                            'key': 'mcc',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                            }
                        },
                        {
                            'constraints': {
                                'nullable': true,
                                'valueRangeConstraints': [
                                    {
                                        'maxValue': 999,
                                        'minValue': 0
                                    }
                                ],
                                'valueResolution': null
                            },
                            'defaultValue': null,
                            'description': 'The MNC part of a PLMN identity used in the radio network.',
                            'immutable': false,
                            'key': 'mnc',
                            'type': 'LONG',
                            'writeBehavior': null,
                            'namespaceversions': {
                                'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                            }
                        }
                    ],
                    'description': 'Describes a PLMN id.',
                    'key': 'PlmnIdentity'
                },
                'constraints': null,
                'defaultValue': null,
                'description': 'The ENodeB Public Land Mobile Network (PLMN) ID that forms part of the ENodeB Global ID used to identify the node over the S1 interface. \n\n',
                'immutable': false,
                'key': 'eNodeBPlmnId',
                'type': 'COMPLEX_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'SYSTEM',
                'description': 'Used to set how the licensed capacity will be distributed between the baseband processing resources',
                'enumeration': {
                    'description': 'LicCapDistrMethod',
                    'enumMembers': [
                        {
                            'description': 'The RBS will distribute the licensed capacity evenly over the baseband processing resources.',
                            'key': 'SYSTEM',
                            'value': 0
                        },
                        {
                            'description': 'The RBS will distribute the licensed capacity over the baseband processing resources based on the value set in licCapDistr.',
                            'key': 'OPERATOR',
                            'value': 1
                        }
                    ],
                    'key': 'LicCapDistrMethod'
                },
                'immutable': false,
                'key': 'licCapDistrMethod',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 255,
                            'minValue': 2
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 255,
                'description': 'Rand range datatype is the eight most significant bit (MSB) of the Rand used for authentication \n\nThe RandcRange attribute controls the minimum and maximum random number values that can be generated. Typically a range of random numbers is allocated to each system using this attribute.',
                'immutable': false,
                'key': 'maxRandc',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 254,
                            'minValue': 1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 1,
                'description': 'Rand range datatype is the eight most significant bit (MSB) of the Rand used for authentication\n\nThe RandcRange attribute controls the minimum and maximum random number values that can be generated. Typically a range of random numbers is allocated to each system using this attribute.',
                'immutable': false,
                'key': 'minRandc',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'RPLMN_IF_SAME_AS_SPLMN',
                'description': 'The mode used by the RBS for the non-access stratum node selection.\n\n\n\nRegardless of the mode used, the function attempts to:\n\n\n\n- Reconnect every UE to its registered MME in any of the tracking areas of the cell. \n\n\n\n- Distribute the UEs that are not reconnected among MMEs that serve the Public Land Mobile Network selected by each UE.',
                'enumeration': {
                    'description': 'NnsfModeVals',
                    'enumMembers': [
                        {
                            'description': 'The function distributes all UEs which are not registered in any of the tracking areas of the cell (tries to reconnect if UE provides S-TMSI, thus registered in one of the tracking areas of the cell).',
                            'key': 'SPLMN',
                            'value': 0
                        },
                        {
                            'description': 'The function distributes all UEs which are not registered in the PLMN they select (tries to reconnect if UE provides S-TMSI or if otherwise registered in the PLMN that it selects).',
                            'key': 'RPLMN_IF_SAME_AS_SPLMN',
                            'value': 1
                        },
                        {
                            'description': 'The function distributes all UEs which are registered in some PLMN which is not served by any MME which is connected to eNB (tries to reconnect if UE provides S-TMSI or is otherwise registered in an MME which serves the PLMN that it selects).',
                            'key': 'RPLMN_IF_MME_SERVES_SPLMN',
                            'value': 2
                        }
                    ],
                    'key': 'NnsfModeVals'
                },
                'immutable': false,
                'key': 'nnsfMode',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': true,
                'description': 'Controls enabling and disabling  the supervision function that restarts the RBS when the O&M link is disabled.',
                'immutable': false,
                'key': 'oaMLinkSuperVisionActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'PDF for hardware utilization in the downlink direction.\n\n\n\nPDF ranges:\n\n[0]: [0..5]%,\n\n[1]: ]5..10]%,\n\n[2]: ]10..15]%,\n\n[3]: ]15..20]%,\n\n[4]: ]20..25]%,\n\n[5]: ]25..30]%,\n\n[6]: ]30..35]%,\n\n[7]: ]35..40]%,\n\n[8]: ]40..45]%,\n\n[9]: ]45..50]%,\n\n[10]: ]50..55]%,\n\n[11]: ]55..60]%,\n\n[12]: ]60..65]%,\n\n[13]: ]65..70]%,\n\n[14]: ]70..75]%,\n\n[15]: ]75..80]%,\n\n[16]: ]80..85]%,\n\n[17]: ]85..90]%,\n\n[18]: ]90..95]%,\n\n[19]: ]95..100]%\n\n',
                'immutable': false,
                'key': 'pmHwUtilDl',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'PDF for hardware utilization in the uplink direction.\n\n\n\nPDF ranges:\n\n[0]: [0..5]%,\n\n[1]: ]5..10]%,\n\n[2]: ]10..15]%,\n\n[3]: ]15..20]%,\n\n[4]: ]20..25]%,\n\n[5]: ]25..30]%,\n\n[6]: ]30..35]%,\n\n[7]: ]35..40]%,\n\n[8]: ]40..45]%,\n\n[9]: ]45..50]%,\n\n[10]: ]50..55]%,\n\n[11]: ]55..60]%,\n\n[12]: ]60..65]%,\n\n[13]: ]65..70]%,\n\n[14]: ]70..75]%,\n\n[15]: ]75..80]%,\n\n[16]: ]80..85]%,\n\n[17]: ]85..90]%,\n\n[18]: ]90..95]%,\n\n[19]: ]95..100]%\n\n',
                'immutable': false,
                'key': 'pmHwUtilUl',
                'type': 'LIST',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'The number of S1AP Paging messages that are discarded (and not routed to any cell) due to that the maximum number of incoming S1AP Paging messages during a certain time interval is reached. This counter is a subset of pmPagS1Received.',
                'immutable': false,
                'key': 'pmPagS1Discarded',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'This counter counts the number of received S1AP Paging messages in the RBS.',
                'immutable': false,
                'key': 'pmPagS1Received',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Total number of downlink DRB packets (PDCP SDUs) discarded in the Ethernet part of the eNB.',
                'immutable': false,
                'key': 'pmPdcpPktDiscDlEth',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Counts the number of times the corresponding downlink Sum counters has been incremented.\n\nAssociated ACC pmCounter pmRohcCidDlSum.',
                'immutable': false,
                'key': 'pmRohcCidDlSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Sum of all downlink sample values recorded for the number of Robust Header Compression context IDs',
                'immutable': false,
                'key': 'pmRohcCidDlSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Counts the number of times the corresponding uplink Sum counters has been incremented.\n\nAssociated ACC pmCounter pmRohcCidUlSum.',
                'immutable': false,
                'key': 'pmRohcCidUlSamp',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': null,
                    'valueResolution': null
                },
                'defaultValue': null,
                'description': 'Sum of all uplink sample values recorded for the number of Robust Header Compression context IDs',
                'immutable': false,
                'key': 'pmRohcCidUlSum',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'key': 'pmZtemporary34',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'key': 'pmZtemporary35',
                'type': 'LONG',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 1440,
                            'minValue': 15
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 200,
                'description': 'Random number update interval\n\nThis attribute specifies the time interval in minutes between random number generation. When this interval expires, the eNodeB generates a new random number between MinRandc and MaxRandc.',
                'immutable': false,
                'key': 'randUpdateInterval',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Indicates if the feature RRC Connection Reestablishment is ACTIVATED or DEACTIVATED.',
                'immutable': false,
                'key': 'rrcConnReestActive',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'S1 Handover data forwarding can be of two types, direct and indirect. Direct forwarding requires direct connectivity between source and target eNodeB. This parameter is used to indicate if such direct connectivity exist.',
                'immutable': false,
                'key': 's1HODirDataPathAvail',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 300,
                            'minValue': 1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 30,
                'description': 'Defines the frequency to perform re-establishment of SCTP and S1-AP connection,\n\nwhen the connection to a MME is lost.\n\n',
                'immutable': false,
                'key': 's1RetryTimer',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': 'ROUND_ROBIN',
                'description': 'The scheduling strategy that is used in the RBS.',
                'enumeration': {
                    'description': 'Deprecated: Since L12A.',
                    'enumMembers': [
                        {
                            'description': 'Deprecated: Since L12A.',
                            'key': 'STRICT_PRIORITY',
                            'value': 0
                        },
                        {
                            'description': 'Deprecated: Since L12A.',
                            'key': 'ROUND_ROBIN',
                            'value': 1
                        },
                        {
                            'description': 'Deprecated: Since L12A.',
                            'key': 'RESOURCE_FAIR',
                            'value': 3
                        },
                        {
                            'description': 'Deprecated: Since L12A.',
                            'key': 'PROPORTIONAL_FAIR_MEDIUM',
                            'value': 4
                        },
                        {
                            'description': 'Deprecated: Since L12A.',
                            'key': 'PROPORTIONAL_FAIR_LOW',
                            'value': 5
                        },
                        {
                            'description': 'Deprecated: Since L12A.',
                            'key': 'PROPORTIONAL_FAIR_HIGH',
                            'value': 6
                        },
                        {
                            'description': 'Deprecated: Since L12A.',
                            'key': 'MAXIMUM_CQI',
                            'value': 7
                        },
                        {
                            'description': 'Deprecated: Since L12A.',
                            'key': 'EQUAL_RATE',
                            'value': 8
                        }
                    ],
                    'key': 'SchedulingStrategy'
                },
                'immutable': false,
                'key': 'schedulingStrategy',
                'type': 'ENUM_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Refers to the SCTP instance that is used to configure the SCTP host for S1 and X2 connections.',
                'immutable': false,
                'key': 'sctpRef',
                'type': 'MO_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 3000,
                            'minValue': 1
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 50,
                'description': 'Target eNodeB supervision of the DL data forwarding activity.\n\nThe timer is started when DL data on S1-U is received. At expiry the tunnel end-point for DL forwarding is locally released.\n\n',
                'immutable': false,
                'key': 'tHODataFwdReordering',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': null,
                'description': 'Indicates that a technician on site has pushed the Maintenance Button.\n\nPersistently stored attribute not handled by CV.',
                'immutable': false,
                'key': 'technicianPresent',
                'type': 'BOOLEAN',
                'writeBehavior': 'NOT_ALLOWED',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': false,
                'description': 'Indicates if the cell can operate as an asynchronous cell under error conditions.',
                'immutable': false,
                'key': 'timeAndPhaseSynchCritical',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 100,
                            'minValue': 9
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 100,
                'description': 'Defines the maximum allowed time/phase deviation for time/phase synchronization of the eNodeB.',
                'immutable': false,
                'key': 'timePhaseMaxDeviation',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'description': 'Admission threshold on accumulated Guaranteed Bit Rate (GBR) in the uplink, expressed as a fraction of the uplink transport network bandwidth for LTE.',
                'immutable': false,
                'key': 'ulAccGbrAdmThresh',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': true,
                'description': 'Specifies if the advanced UL scheduler is enabled\n\n\n\n',
                'immutable': false,
                'key': 'ulSchedulerDynamicBWAllocationEnabled',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'description': 'Uplink transport network bandwidth for LTE.',
                'immutable': false,
                'key': 'ulTransNwBandwidth',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'Refers to the IpAccessHostEt instance to use for configuring the IP access host for S1 and X2 user plane connections. This attribute must contain a valid MO reference if the IPsec function is used.',
                'immutable': false,
                'key': 'upIpAccessHostRef',
                'type': 'MO_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'A list of blacklisted RBS IDs. X2 may not be set up to any neighbor RBS in the blacklist.',
                'immutable': false,
                'key': 'x2BlackList',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': true,
                'description': 'Indicates if the function X2 IP addresses over S1 is active in the RBS.',
                'immutable': false,
                'key': 'x2IpAddrViaS1Active',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true
                },
                'defaultValue': true,
                'description': 'This parameter indicates if two way relations shall be setup during X2 setup and eNB configuration. The RBS creates a two-way relation for each entry in the received neighbour information that contains a relation to a source cell. Neighbour information is sent in X2 setup and eNB configuration. Neighbour information is eUtranCellRelations per source cell from the sending node.',
                'immutable': false,
                'key': 'x2SetupTwoWayRelations',
                'type': 'BOOLEAN',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'The list of whitelisted RBS IDs. Automated Neighbor Relations (ANR) is not allowed to disconnect X2 for any neighbor RBS in the whitelist.',
                'immutable': false,
                'key': 'x2WhiteList',
                'type': 'LIST',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'valueRangeConstraints': [
                        {
                            'maxValue': 60000,
                            'minValue': 0
                        }
                    ],
                    'valueResolution': null
                },
                'defaultValue': 1440,
                'description': 'See attribute x2RetryTimerStart.',
                'immutable': false,
                'key': 'x2retryTimerMaxAuto',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'defaultValue': 30,
                'description': 'After failed X2 setup and after X2 link break the x2RetryTimer is used to control the time till next retry. x2RetryTimer is used for DNS, SCTP, X2AP retries and x2IpAddrViaS1.\n\n\n\nAfter first failed setup or missing IP address from DNS, x2RetryTimer = max(x2RetryTimerStart,W), where W is the timeToWait received in x2SetupFail. If W is not received, W=0.\n\n\n\nAfter link break, x2RetryTimer = random(0,x2RetryTimerStart). If the first setup after link break fails, the timer values according to the above and below paragraphs shall apply as for failed inital setup.\n\n\n\nAfter 2nd and following fails, if the X2 connection is not being setup by ANR in the S-RBS, x2RetryTimer = max(x2RetryTimerStart,W).\n\n\n\nAfter 2nd and following fails, if the X2 connection is being setup by ANR in the S-RBS, x2RetryTimer = max(min[2^(n-2)*x2RetryTimerStart, x2retryTimerMaxAuto], W), where n is failure number.\n\n\n\nEach W is only used in the first retry after it is received.',
                'immutable': false,
                'key': 'x2retryTimerStart',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary1',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'key': 'zzzTemporary10',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'key': 'zzzTemporary11',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'key': 'zzzTemporary12',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary2',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary3',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary4',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary5',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary6',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary7',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': {
                    'nullable': true,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'Temporary attributes are intended for temporary solutions, and their usage may vary depending on the installed software. It is strongly recommended to only set the attributes that correspond to a desired functionality and leave all other temporary attributes set to default value. Information in the descriptions about what attributes are in use may be overridden by the information in CPI Info documents. Note that a later release may use another attribute to control the functionality previously provided by a temporary attribute, or may remove the functionality altogether. In these cases, the change is documented in the NIR.',
                'immutable': false,
                'key': 'zzzTemporary8',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
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
                'key': 'zzzTemporary9',
                'type': 'LONG',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'PT_REF mock attribute.',
                'immutable': false,
                'key': 'ptRefMockAttr',
                'type': 'PT_REF',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            },
            {
                'constraints': null,
                'defaultValue': null,
                'description': 'MAP mock attribute.',
                'immutable': false,
                'key': 'mapMockAttr',
                'type': 'MAP',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
                }
            }
        ],
        'moType': 'ENodeBFunction',
        'writeBehavior': 'INHERITED',
        'namespaceversions': {
            'ERBS_NODE_MODEL': ['5.1.226','6.1.20','5.1.239','6.1.40','5.1.200','6.1.60','4.1.44','5.1.63','5.1.230','5.1.236','4.1.189']
        }
    };
});
