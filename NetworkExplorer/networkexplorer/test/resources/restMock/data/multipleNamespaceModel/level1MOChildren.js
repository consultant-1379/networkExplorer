if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return [
        {name: 'Level1ChildMO1','namespaceversions': {'NAMESPACE_1': ['1.0.1']}},
        {name: 'Level1ChildMO2','namespaceversions': {'NAMESPACE_1': ['1.0.1']}},
        {name: 'Level1ChildMO3','namespaceversions': {'NAMESPACE_1': ['1.0.1']}}
    ];
});
