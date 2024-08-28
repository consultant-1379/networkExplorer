if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return {
        'attributes': [
            {
                'constraints': {
                    'nullable': false,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'The value component of the RDN.\n\n',
                'immutable': true,
                'key': 'L1_Child2_Attr1',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'NAMESPACE_1': ['1.0.6', '1.0.7', '1.0.8', '1.0.9', '1.0.10']
                }
            }
        ],
        'moType': 'Level1ChildMO2',
        'writeBehavior': 'INHERITED',
        'namespaceversions': {
            'NAMESPACE_1': ['1.0.5', '1.0.6', '1.0.7', '1.0.8', '1.0.9', '1.0.10']
        }
    };
});
