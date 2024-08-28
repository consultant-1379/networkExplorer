if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return {
        'moType': 'SubNetwork',
        'writeBehavior': null,
        'attributes': [{
            'key': 'SubNetworkId',
            'writeBehavior': 'INHERITED',
            'immutable': true,
            'type': 'STRING',
            'constraints': {
                'nullable': false,
                'valueRangeConstraints': null,
                'validContentRegex': null
            },
            'defaultValue': null,
            'description': 'The ID of this SubNetwork.',
            'namespaceversions': {
                'OSS_TOP': [
                    '3.0.0'
                ]
            }
        }]
    };
});
