if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return [{
        'name': 'ManagedElement',
        'namespaceversions': {
            'CPP_NODE_MODEL': [
                '14.143.4',
                '15.148.2',
                '14.143.3',
                '14.125.5',
                '15.156.2',
                '13.98.16',
                '14.146.2',
                '15.150.2',
                '13.112.4',
                '15.152.3',
                '14.139.5']}
    }, {
        'name': 'MeContext',
        'namespaceversions': {
            'OSS_TOP': [
                '3.0.0'
            ]
        }
    }, {
        'name': 'SubNetwork',
        'namespaceversions': {
            'OSS_TOP': [
                '3.0.0'
            ]
        }
    }];
});
