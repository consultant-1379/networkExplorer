if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}
define(function() {
    return {
        'poList': Array.apply(null, {length: 10000}).map(Number.call, Number).map(String),
        'attributes': ['neType'],
        'attributeMappings': [{
            'moType': 'NetworkElement',
            'attributeNames': ['neType']
        }],
        'metadata': {
            'SORTABLE': true,
            'RESULT_SET_TOTAL_SIZE': 10000,
            'MAX_UI_CACHE_SIZE': 100000,
            'INFO_MESSAGE': 0
        }
    };
});
