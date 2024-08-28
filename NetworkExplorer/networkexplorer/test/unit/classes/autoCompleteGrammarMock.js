define(function() {
    return {
        rules: [
            {
                keys: [
                    'select',
                    'get'
                ],
                regex: [
                    /^$/
                ]
            },
            {
                keys: [
                    'object',
                    'all objects of type',
                    'search',
                    'collection',
                    'node',
                    'type'
                ],
                regex: [
                    /^$/,
                    /^select $/,
                    /^get $/
                ]
            },
            {
                keys: [
                    '<Object Type>'
                ],
                regex: [
                    /^select $/,
                    /^get $/,
                    /^(?:select |get )?(?:type|object type|all objects of type) $/
                ]
            },
            {
                keys: [
                    'where',
                    'from'
                ],
                regex: [
                    /^(?:select |get )?(?:all objects of type |(?:object )?(?:type )?|search |collection |(?:any )?node |node type |all |\* )?([a-zA-Z0-9-_.]+|\"[^\"]+\") $/,
                    /with (?:attr )?([a-zA-Z0-9-_.]+)(?:,[a-zA-Z0-9-_.]+)* $/,
                    /with all attr $/
                ]
            },
            {
                keys: [
                    'with'
                ],
                regex: [
                    /^(?:select |get )?(?:all objects of type |(?:object )?(?:type )?|search |collection |(?:any )?node |node type |all |\* )?([a-zA-Z0-9-_.]+|\"[^\"]+\") $/
                ]
            },
            {
                keys: [
                    'attr',
                    'all attr'
                ],
                regex: [
                    /^(?:select |get )?(?:all objects of type |(?:object )?(?:type )?|search |collection |(?:any )?node |node type |all |\* )?([a-zA-Z0-9-_.]+|\"[^\"]+\") with $/                ]
            },
            {
                keys: [
                    '<Attribute Name>'
                ],
                regex: [
                    /with (attr )?$/
                ]
            },
            {
                keys: [
                    '<Object Type>',
                    'object'
                ],
                regex: [
                    /(?:where|and|or) $/
                ]
            },
            {
                keys: [
                    'has attr',
                    'has parent',
                    'has child',
                    'has'
                ],
                regex: [
                    /(?:where|and|or) (?:object )?([a-zA-Z0-9-_.]+|\"[^\"]+\") $/
                ]
            },
            {
                keys: [
                    '<Attribute Name>'
                ],
                regex: [
                    /has attr $/,
                    /has (?:parent |child )? ([a-zA-Z0-9-_.]+) with $/
                ]
            },
            {
                keys: [
                    '=',
                    '>',
                    '<',
                    '>=',
                    '<=',
                    'equal to',
                    'is',
                    'greater than',
                    'less than',
                    'greater than or equal to',
                    'less than or equal to'
                ],
                regex: [
                    /(?:where|with|and|or) (?:object )?([a-zA-Z0-9-_.]+) (?:has attr )?([a-zA-Z0-9-_.]+) $/,
                    /or attr ([a-zA-Z0-9-_.]+) $/,
                    /has (?:parent |child )?([a-zA-Z0-9-_.]+) with ([a-zA-Z0-9-_.]+) $/
                ]
            },
            {
                keys: [
                    '<Attribute Value>'
                ],
                regex: [
                    /(?:=|>|<|>=|<=|equal to|is|(?:greater|less) than(?: or equal to)?) $/
                ]
            },
            {
                keys: [
                    'and',
                    'from'
                ],
                regex: [
                    /(?:has (parent |child )?)([a-zA-Z0-9-_.]+) $/
                ]
            },
            {
                keys: [
                    'and',
                    'from',
                    'or attr'
                ],
                regex: [
                    /([a-zA-Z0-9-_.]+)(?:(?: )?(?:=|>|<|>=|<=)(?: )?| equal to | is | (?:greater|less) than(?: or equal to)? )([a-zA-Z0-9-_.]+|\"[^\"]+\") $/
                ]
            },
            {
                keys: [
                    'node',
                    'search',
                    'collection',
                    'all'
                ],
                regex: [
                    /from $/
                ]
            },
            {
                keys: [
                    '<Saved Search Name>'
                ],
                regex: [
                    /search $/
                ]
            },
            {
                keys: [
                    '<Collection Name>'
                ],
                regex: [
                    /collection $/
                ]
            },
            {
                keys: [
                    '<Object Type>'
                ],
                regex: [
                    /object $/,
                    /has (?:parent |child )?$/
                ]
            },
            {
                keys: [
                    '<Node Name>',
                    'type'
                ],
                regex: [
                    /from node $/
                ]
            },
            {
                keys: [
                    '<Node Type>'
                ],
                regex: [
                    /from node type $/
                ]
            }
        ],
        keywords: [
            'select',
            'get',
            'all objects of type',
            'object',
            'type',
            'search',
            'collection',
            'any',
            'node type',
            'all',
            '*',
            'where',
            'with',
            'has attr',
            'has parent',
            'has child',
            'object',
            'has',
            '=',
            '>',
            '<',
            '>=',
            '<=',
            'equal to',
            'is',
            'greater than',
            'less than',
            'greater than or equal to',
            'less than or equal to',
            'and',
            'or',
            'has',
            'parent',
            'child',
            'attr',
            'all attr',
            'node'
        ]
    };
});
