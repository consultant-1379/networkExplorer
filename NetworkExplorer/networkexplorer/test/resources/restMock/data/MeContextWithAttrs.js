if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {

    return {
        poList: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10'
        ],
        attributes: [
            'neType',
            'lostSynchronization',
            'userLabel'
        ],
        attributeMappings: [{
            moType: 'MeContext',
            attributeNames: ['neType','lostSynchronization','userLabel']
        }],
        metadata: {
            RESULT_SET_TOTAL_SIZE: 10,
            MAX_UI_CACHE_SIZE: 100000
        },
        sortable: true
    };
});
