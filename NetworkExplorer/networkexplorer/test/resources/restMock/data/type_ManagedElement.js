if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {

    return {
        poList: [
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
        attributes: ['neType'],
        attributeMappings: [{
            moType: 'MeContext',
            attributeNames: ['neType']
        }],
        metadata: {
            RESULT_SET_TOTAL_SIZE: 5,
            MAX_UI_CACHE_SIZE: 100000
        },
        sortable: true
    };
});
