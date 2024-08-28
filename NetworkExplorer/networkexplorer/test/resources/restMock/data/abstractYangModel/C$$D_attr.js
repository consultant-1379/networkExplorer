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
                'key': 'C$$D_Attr1',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'YANG_ABSTRACT': ['1.0.0']
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
                'key': 'C$$D_Attr2',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'YANG_ABSTRACT': ['1.0.0']
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
                'key': 'C$$D_Attr3',
                'type': 'STRING',
                'writeBehavior': 'PERSIST_AND_DELEGATE',
                'namespaceversions': {
                    'YANG_ABSTRACT': ['1.0.0']
                }
            }
        ],
        'moType': 'C$$D',
        'writeBehavior': 'INHERITED',
        'namespaceversions': {
            'YANG_ABSTRACT': ['1.0.0']
        }
    };
});
