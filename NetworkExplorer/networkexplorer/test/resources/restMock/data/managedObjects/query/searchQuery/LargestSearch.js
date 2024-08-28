if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

var maxSearchSize = 100000,
    largestSearchSize = 100001;

define(function() {
    return {
        'poList': Array.apply(null, {length: largestSearchSize}).map(Number.call, Number).map(String),
        'attributes': ['neType'],
        'attributeMappings': [{
            'moType': 'NetworkElement',
            'attributeNames': ['neType']
        }],
        'metadata': {
            'SORTABLE': false,
            'RESULT_SET_TOTAL_SIZE': largestSearchSize,
            'MAX_UI_CACHE_SIZE': maxSearchSize,
            'INFO_MESSAGE': 0
        }
    };
});
