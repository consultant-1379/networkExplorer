if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {

    return {
        poList: [
            '81'
        ],
        attributes: [
            'neType'
        ],
        attributeMappings: [{
            moType: 'NetworkElement',
            attributes: [
                'neType'
            ]
        }],
        metadata: {
            RESULT_SET_TOTAL_SIZE: 5,
            MAX_UI_CACHE_SIZE: 100000
        },
        sortable: true
    };
});
