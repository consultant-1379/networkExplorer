if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return [
        {'name': 'A','namespaceversions': {'YANG_ABSTRACT': ['1.0.0']}},
        {'name': 'B','namespaceversions': {'YANG_ABSTRACT': ['1.0.0']}},
        {'name': 'C','namespaceversions': {'YANG_ABSTRACT': ['1.0.0']}},
        {'name': 'B$$D','namespaceversions': {'YANG_ABSTRACT': ['1.0.0']}},
        {'name': 'C$$D','namespaceversions': {'YANG_ABSTRACT': ['1.0.0']}},
        {'name': 'D$$F','namespaceversions': {'YANG_ABSTRACT': ['1.0.0']}},
        {'name': 'E','namespaceversions': {'YANG_ABSTRACT': ['1.0.0']}},
        {'name': 'E$$F','namespaceversions': {'YANG_ABSTRACT': ['1.0.0']}}
    ];
});
