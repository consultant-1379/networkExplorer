if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}
define(function() {

    return function(objectCount) {
        objectCount = objectCount || 10; // default number of objects is 10
        return {
            'poList': Array.apply(null, {length: objectCount}).map(Number.call, Number).map(String),
            'attributes': ['neType'],
            'attributeMappings': [{
                'moType': 'NetworkElement',
                'attributeNames': ['neType']
            }],
            'metadata': {
                'SORTABLE': true,
                'RESULT_SET_TOTAL_SIZE': objectCount,
                'MAX_UI_CACHE_SIZE': 100000,
                'INFO_MESSAGE': 0
            }
        };
    };
});
