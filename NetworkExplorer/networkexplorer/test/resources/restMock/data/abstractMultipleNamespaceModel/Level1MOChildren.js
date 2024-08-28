if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return [
        {name: 'Level1ChildMO1','namespaceversions': {'NAMESPACE_1': ['1.0.3', '1.0.4', '1.0.5', '1.0.6', '1.0.7', '1.0.8', '1.0.9', '1.0.10']}},
        {name: 'Level1ChildMO2','namespaceversions': {'NAMESPACE_1': ['1.0.5', '1.0.6', '1.0.7', '1.0.8', '1.0.9', '1.0.10']}},
        {name: 'Level1ChildMO3','namespaceversions': {'NAMESPACE_1': ['1.0.7', '1.0.8', '1.0.9', '1.0.10']}},
        {name: 'Level1ChildMO4','namespaceversions': {'NAMESPACE_1': ['1.0.3']}}
    ];
});
