if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {

    return {
        poList: [
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30'
        ],
        attributes: [],
        attributeMappings: [],
        metadata: {
            RESULT_SET_TOTAL_SIZE: 10,
            MAX_UI_CACHE_SIZE: 100000
        },
        sortable: true
    };
});
