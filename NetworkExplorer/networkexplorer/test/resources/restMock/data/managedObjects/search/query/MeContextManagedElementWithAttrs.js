if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {

    /**
     * Negative PoId means attributes do not apply to that object and will be displayed as a dash i.e. '-'
     */
    return {
        objects: [
            { id: '-1', type: 'MeContext'},
            { id: '-2', type: 'MeContext'},
            { id: '-3', type: 'MeContext'},
            { id: '-4', type: 'MeContext'},
            { id: '-5', type: 'MeContext'},
            { id: '-6', type: 'MeContext'},
            { id: '-7', type: 'MeContext'},
            { id: '-8', type: 'MeContext'},
            { id: '-9', type: 'MeContext'},
            { id: '-10', type: 'ManagedElement'},
            { id: '11', type: 'ManagedElement'},
            { id: '12', type: 'ManagedElement'},
            { id: '13', type: 'ManagedElement'},
            { id: '14', type: 'ManagedElement'},
            { id: '15', type: 'ManagedElement'},
            { id: '16', type: 'ManagedElement'},
            { id: '17', type: 'ManagedElement'},
            { id: '18', type: 'ManagedElement'},
            { id: '19', type: 'ManagedElement'},
            { id: '20', type: 'ManagedElement'},
        ],
        attributes: [
            'neType',
            'site',
            'siteLocation',
            'faultTolerantCoreStates',
            'networkManagedElementId',
            'productRevision',
            'healthCheckSchedule',
            'healthCheckResult',
            'dateTimeOffset',
            'timeZone',
            'localDateTime',
            'managedElementType',
            'userLabel',
            'productName',
            'productType',
            'productNumber',
            'platformType',
            'mimInfo',
            'logicalName',
            'mimName',
            'release',
            'applicationConfiguration'
        ],
        attributeMappings: [
            {
                moType: 'MeContext',
                attributeNames: [
                    'platformType',
                    'neType'
                ]
            },{
                moType: 'ManagedElement',
                attributeNames: [
                    'neType',
                    'site',
                    'siteLocation',
                    'faultTolerantCoreStates',
                    'networkManagedElementId',
                    'productRevision',
                    'healthCheckSchedule',
                    'healthCheckResult',
                    'dateTimeOffset',
                    'timeZone',
                    'localDateTime',
                    'managedElementType',
                    'userLabel',
                    'productName',
                    'productType',
                    'productNumber',
                    'platformType',
                    'mimInfo',
                    'logicalName',
                    'mimName',
                    'release',
                    'applicationConfiguration'
                ]
            }
        ],
        metadata: {
            RESULT_SET_TOTAL_SIZE: 20,
            MAX_UI_CACHE_SIZE: 100000
        },
        sortable: true
    };
});
