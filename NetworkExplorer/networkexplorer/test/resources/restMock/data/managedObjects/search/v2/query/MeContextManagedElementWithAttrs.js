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
            { id: '-1', type: 'MeContext', targetTypeAttribute: 'ERBS'},
            { id: '-2', type: 'MeContext', targetTypeAttribute: 'ERBS'},
            { id: '-3', type: 'MeContext', targetTypeAttribute: 'ERBS'},
            { id: '-4', type: 'MeContext', targetTypeAttribute: 'ERBS'},
            { id: '-5', type: 'MeContext', targetTypeAttribute: 'ERBS'},
            { id: '-6', type: 'MeContext', targetTypeAttribute: 'ERBS'},
            { id: '-7', type: 'MeContext', targetTypeAttribute: 'ERBS'},
            { id: '-8', type: 'MeContext', targetTypeAttribute: 'ERBS'},
            { id: '-9', type: 'MeContext', targetTypeAttribute: 'ERBS'},
            { id: '-10', type: 'ManagedElement', targetTypeAttribute: 'ERBS'},
            { id: '11', type: 'ManagedElement', targetTypeAttribute: 'ERBS'},
            { id: '12', type: 'ManagedElement', targetTypeAttribute: 'ERBS'},
            { id: '13', type: 'ManagedElement', targetTypeAttribute: 'ERBS'},
            { id: '14', type: 'ManagedElement', targetTypeAttribute: 'ERBS'},
            { id: '15', type: 'ManagedElement', targetTypeAttribute: 'ERBS'},
            { id: '16', type: 'ManagedElement', targetTypeAttribute: 'ERBS'},
            { id: '17', type: 'ManagedElement', targetTypeAttribute: 'ERBS'},
            { id: '18', type: 'ManagedElement', targetTypeAttribute: 'ERBS'},
            { id: '19', type: 'ManagedElement', targetTypeAttribute: 'ERBS'},
            { id: '20', type: 'ManagedElement', targetTypeAttribute: 'ERBS'}
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
