if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return [
        {'name': 'B','namespaceversions': {'YANG_ABSTRACT': ['1.0.0']}},
        {'name': 'C','namespaceversions': {'YANG_ABSTRACT': ['1.0.0']}}
    ];
});
