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
        poList: [
            '-1',
            '-2',
            '-3',
            '-4',
            '-5',
            '-6',
            '-7',
            '-8',
            '-9',
            '-10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20'
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
