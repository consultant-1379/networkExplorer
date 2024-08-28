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
                'key': 'L1_Child4_Attr1',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'NAMESPACE_1': ['1.0.3'],
                    'NAMESPACE_2': ['1.0.3']
                }
            },
            {
                'constraints': {
                    'nullable': false,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'The value component of the RDN.\n\n',
                'immutable': true,
                'key': 'L1_Child4_Attr2',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'NAMESPACE_1': ['1.0.3']
                }
            },
            {
                'constraints': {
                    'nullable': false,
                    'validContentRegex': null,
                    'valueRangeConstraints': null
                },
                'defaultValue': null,
                'description': 'The value component of the RDN.\n\n',
                'immutable': true,
                'key': 'L1_Child4_Attr3',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'NAMESPACE_2': ['1.0.3']
                }
            }
        ],
        'moType': 'Level1ChildMO4',
        'writeBehavior': 'INHERITED',
        'namespaceversions': {
            'NAMESPACE_1': ['1.0.3']
        }
    };
});
