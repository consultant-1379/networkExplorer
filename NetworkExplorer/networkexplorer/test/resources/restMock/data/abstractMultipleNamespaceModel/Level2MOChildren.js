if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return [
        {name: 'Level2ChildMO1','namespaceversions': {'NAMESPACE_1': ['1.0.9', '1.0.10']}}
    ];
});
