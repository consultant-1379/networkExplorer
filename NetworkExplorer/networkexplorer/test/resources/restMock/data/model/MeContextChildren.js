if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return [
        {'name': 'Inventory', 'namespaceversions': {'CPP_NODE_MODEL': ['14.143.4', '14.143.3', '15.148.2', '14.125.5', '13.98.16', '14.146.2', '13.112.4', '15.150.2', '14.139.5']}},
        {'name': 'ManagedElement', 'namespaceversions': {'CPP_NODE_MODEL': ['14.143.4', '14.143.3', '15.148.2', '14.125.5', '13.98.16', '14.146.2', '13.112.4', '15.150.2', '14.139.5']}}
    ];
});
