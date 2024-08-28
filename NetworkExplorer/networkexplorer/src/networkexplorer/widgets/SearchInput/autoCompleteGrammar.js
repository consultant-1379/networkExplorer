define(function() {
    return {
        rules: [
            {
                keys: [
                    '<Object Type(s)>'
                ],
                regex: [
                    /^(([a-zA-Z0-9-_.\/:$]+), )*$/,
                    /^select ([a-zA-Z0-9-_.\/:$]+, )*$/,
                    /^get ([a-zA-Z0-9-_.\/:$]+, )*$/,
                    /^(?:select |get )?(?:type|object type|all objects of type) ([a-zA-Z0-9-_.\/:$]+, )?$/
                ]
            },
            {
                keys: [
                    'get',
                    'select'
                ],
                regex: [
                    /^$/
                ]
            },
            {
                keys: [
                    'all objects of type',
                    'collection',
                    'object',
                    'search',
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
                    '<Attribute Name>',
                    'from',
                    'name',
                    'where'
                ],
                regex: [
                    /^(?:select |get )?(?:all objects of type |(?:object )?(?:type )?|search |collection |(?:any )?node |node type |all |\* )?([a-zA-Z0-9-_.\/:$]+|\"[^\"]+\")(,(?: )?[a-zA-Z0-9-_.\/:$]+)* $/,
                    /with (?:attr )?([a-zA-Z0-9-_.\/:$]+)(?:,(?: )?[a-zA-Z0-9-_.\/:$]+)* $/,
                    /with all attr $/
                ]
            },
            {
                keys: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'where'
                ],
                regex: [
                    /from (?:node(?: type)?|search) ([a-zA-Z0-9-_.\/:$]+)(,(?: )?[a-zA-Z0-9-_.\/:$]+)* $/,
                    /from collection ([a-zA-Z0-9-_.\/:$]+)(,(?: )?collection [a-zA-Z0-9-_.\/:$]+)* $/
                ]
            },
            {
                keys: [
                    'with'
                ],
                regex: [
                    /^(?:select |get )?(?:all objects of type |(?:object )?(?:type )?|search |collection |(?:any )?node |node type |all |\* )?([a-zA-Z0-9-_.\/:$]+|\"[^\"]+\") $/
                ]
            },
            {
                keys: [
                    '<Attribute Name(s)>',
                    '<Object Type(s)>',
                    '<Struct>[<Member>]'
                ],
                regex: [
                    /with(?: attr)? ([a-zA-Z0-9-_.\/:$]+, )*$/
                ]
            },
            {
                keys: [
                    'all attr',
                    'attr'
                ],
                regex: [
                    /^(?:select |get )?(?:all objects of type |(?:object )?(?:type )?|search |collection |(?:any )?node |node type |all |\* )?([a-zA-Z0-9-_.\/:$]+|\"[^\"]+\") with $/                ]
            },
            {
                keys: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'object'
                ],
                regex: [
                    /(?:where|and) $/
                ]
            },
            {
                keys: [
                    'attr'
                ],
                regex: [
                    new RegExp('([a-zA-Z0-9-_.\\/:$]+)(?:(?: )?(?:=|!=|>|<|>=|<=)(?: )?| equal to | not equal to | (?:greater|less) than(?: or equal to)? )' +
                        '((?:\\*)?[a-zA-Z0-9-_.\\/:$]+(?:\\*)?|\\"[^\\"]+\\") (?:and|or) $')
                ]
            },
            {
                keys: [
                    'has'
                ],
                regex: [
                    /(?:where|and|or) object (?:type )?([a-zA-Z0-9-_.\/:$]+|\"[^\"]+\") $/
                ]
            },
            {
                keys: [
                    'attr',
                    'child',
                    'parent'
                ],
                regex: [
                    /has $/
                ]
            },
            {
                keys: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name'
                ],
                regex: [
                    /has attr $/,
                    /has (?:parent |child )? ([a-zA-Z0-9-_.\/:$]+) with $/,
                    /(?:and|or) attr $/
                ]
            },
            {
                keys: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ],
                regex: [
                    /(?:where|and|or) (?:object (?:type )?)?([a-zA-Z0-9-_.\/:$]+) (?:has attr )?([a-zA-Z0-9-_.\/:$]+) $/,
                    /(?:where|and|or) ([a-zA-Z0-9-_.\/:$]+) $/,
                    /(?:and|or) attr ([a-zA-Z0-9-_.\/:$]+) $/,
                    /has (?:parent |child )?([a-zA-Z0-9-_.\/:$]+) with ([a-zA-Z0-9-_.\/:$]+) $/,
                    /^(?:select |get )?(?:all objects of type |(?:object )?(?:type )?|search |collection |(?:any )?node |node type |all |\* )?([a-zA-Z0-9-_.\/:$]+|\"[^\"]+\")(,(?: )?[a-zA-Z0-9-_.\/:$]+)* ([a-zA-Z0-9-_.\/:$]+) $/,
                    /with (?:attr )?([a-zA-Z0-9-_.\/:$]+)(?:,(?: )?[a-zA-Z0-9-_.\/:$]+)* ([a-zA-Z0-9-_.\/:$]+)$/,
                    /with all attr ([a-zA-Z0-9-_.\/:$]+) $/,
                    /from (?:node(?: type)?|search) ([a-zA-Z0-9-_.\/:$]+)(,(?: )?[a-zA-Z0-9-_.\/:$]+)* ([a-zA-Z0-9-_.\/:$]+) $/,
                    /from collection ([a-zA-Z0-9-_.\/:$]+)(,(?: )?collection [a-zA-Z0-9-_.\/:$]+)* ([a-zA-Z0-9-_.\/:$]+) $/
                ]
            },
            {
                keys: [
                    '<Attribute Value>'
                ],
                regex: [
                    /(?:=|!=|>=|<=|equal to|not equal to|(?:greater|less) than or equal to) $/
                ]
            },
            {
                keys: [
                    '<Attribute Value>',
                    'any of',
                    'all of'
                ],
                regex: [
                    /([a-zA-Z0-9-_.\/:$]*) contains $/,
                    /([a-zA-Z0-9-_.\/:$]*) containing $/
                ]
            },
            {
                keys: [
                    '<Attribute Values>'
                ],
                regex: [
                    /([a-zA-Z0-9-_.\/:$]*) contains any of $/,
                    /([a-zA-Z0-9-_.\/:$]*) contains all of $/,
                    /([a-zA-Z0-9-_.\/:$]*) containing all of $/,
                    /([a-zA-Z0-9-_.\/:$]*) containing any of $/
                ]
            },
            {
                keys: [
                    'and'
                ],
                regex: [
                    /(?:has (parent |child )?)([a-zA-Z0-9-_.\/:$]+) $/
                ]
            },
            {
                keys: [
                    'and',
                    'or'
                ],
                regex: [
                    new RegExp('[a-zA-Z0-9-_.\\/:$]+ (?:with attr|with all attr|where|has attr|and|or) ([a-zA-Z0-9-_.\\/:$]+)' +
                        '(?:(?: )?(?:=|!=|>=|<=)(?: )?| equal to | not equal to | (?:greater|less) than or equal to )((?:\\*)?' +
                        '[a-zA-Z0-9-_.\\/:$]+(%%[a-zA-Z0-9-_.\\/:$]+)*(?:\\*)?|\\"[^\\"]+\\") $')

                ]
            },
            {
                keys: [
                    'using'
                ],
                regex: [
                    /^(?:select |get )?(?:all objects of type |(?:object )?(?:type )?|\* )?([a-zA-Z0-9-_.\/:$]+|\"[^\"]+\")(,(?: )?[a-zA-Z0-9-_.\/:$]+)? $/,
                    /^((?!from).)* with (?:attr )?([a-zA-Z0-9-_.\/:$]+)(?:,(?: )?[a-zA-Z0-9-_.\/:$]+)* $/,
                    /^((?!from).)* with all attr $/,
                    new RegExp('^((?!from).)* where ([a-zA-Z0-9-_.\\/:$]+)(?:(?: )?(?:=|!=|>=|<=)(?: )?| equal to | not equal to | (?:greater|less) than or equal to )' +
                        '((?:\\*)?[a-zA-Z0-9-_.\\/:$]+(%%[a-zA-Z0-9-_.\\/:$]+)*(?:\\*)?|\"[^\\"]+\\") $'),
                    new RegExp('\(\?:where\|and\|or\) \(\?:object \(\?:type \)\?\)\?\(\[a-zA-Z0-9-_\.\\/:\$\]\+\) \(\?:has attr \)\?\(\[a-zA-Z0-9-_\.\\/:\$\]\+\) ' +
                        '\(\?:\(\?:=\|>=\|<=\)\(\?: \)\?\| equal to \| \(\?:greater\|less\) than or equal to \)\(\(\?:\\\*\)\?\[a-zA-Z0-9-_\.\\/:\$\]' +
                        '\+\(%%\[a-zA-Z0-9-_\.\\/:\$\]\+\)\*\(\?:\\\*\)\?\|\\"\[\^\\"\]\+\\"\) \$'),
                    /(?:has (parent |child )?)([a-zA-Z0-9-_.\/:$]+) $/
                ]
            },
            {
                keys: [
                    'collection',
                    'node',
                    'search'
                ],
                regex: [
                    /from $/
                ]
            },
            {
                keys: [
                    'collection'
                ],
                regex: [
                    /using $/
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
                    /from collection ([a-zA-Z0-9-_.]+, collection )*$/,
                    /using collection $/
                ]
            },
            {
                keys: [
                    'collection'
                ],
                regex: [
                    /from collection ([a-zA-Z0-9-_.]+, collection )*([a-zA-Z0-9-_.]+, )$/
                ]
            },
            {
                keys: [
                    'where',
                ],
                regex: [
                    /using collection ([a-zA-Z0-9-_.]+ )$/
                ]
            },
            {
                keys: [
                    '<Collection Name>'
                ],
                regex: [
                    /^(?:select |get )?collection $/
                ]
            },
            {
                keys: [
                    '<Object Type(s)>',
                    'type'
                ],
                regex: [
                    /object $/
                ]
            },
            {
                keys: [
                    '<Object Type>'
                ],
                regex: [
                    /has (?:parent|child) $/,
                    /(?:where|and|or) object type $/
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
            },
            {
                keys: [
                    'ignoring case'
                ],
                regex: [
                    /^(?:select |get )?(?:type|node|node type|nodes from|all nodes of type|all nodes from node type|all nodes from node) ([a-zA-Z0-9-_.\/:$*]+) ?$/,
                    /^(?:select |get )?(?:all nodes from) (?:node )?([a-zA-Z0-9-_.\/:$*]+)(( and|,| ,) (node )?([a-zA-Z0-9-_.\/:$]+))* ?$/,
                    /(?:with|where|and|or) (?:name)(?:(?: )?(?:=|!=)(?: )?| equals | equal to | not equal to )([a-zA-Z0-9-_.\/:$*]+) ?$/,
                    /(?:filter by managementState =) (MAINTENANCE|NORMAL) ?$/,
                    /(?:filter by radioAccessTechnology )(?:contains|contains all of|contains any of) ([a-zA-Z0-9-_.\/:$*]+)((,| ,) ([a-zA-Z0-9-_.\/:$]+))* ?$/
                ]
            },
            {
                keys: [
                    {
                        filters: [
                            'filter by managementState = MAINTENANCE',
                            'filter by managementState = NORMAL',
                            'filter by radioAccessTechnology contains'
                        ]
                    }
                ],
                regex: [
                    /^(?:select |get )?(?:type|node type|all nodes of type|all nodes from node type|all nodes from node) ([a-zA-Z0-9-_.\/:$*]+) ?$/,
                    /^(?:select |get )?(?:type|node type|all nodes of type|all nodes from node type|all nodes from node) ([a-zA-Z0-9-_.\/:$*]+) from collection ([a-zA-Z0-9-_.\/:$]+)(,(?: )?collection [a-zA-Z0-9-_.\/:$]+)* $/,
                    /^(?:select |get )?(?:any node|all nodes) $/,
                    /^(?:select |get )?(?:any node|all nodes) from collection ([a-zA-Z0-9-_.\/:$]+)(,(?: )?collection [a-zA-Z0-9-_.\/:$]+)* $/,
                    /^(?:select |get )?(?:type |object |object type |all objects of type |collection |search )?([a-zA-Z0-9-_.\/:$]+) from collection ([a-zA-Z0-9-_.\/:$]+)(,(?: )?collection [a-zA-Z0-9-_.\/:$]+)* $/,
                    /^(?:select |get )?(?:type |object |object type |all objects of type |collection |search )?([a-zA-Z0-9-_.\/:$]+) using collection ([a-zA-Z0-9-_.]+ )$/,
                    /^(?:select |get )?(?:type |object |object type |all objects of type |collection |search )?([a-zA-Z0-9-_.\/:$]+)(( and|,| ,) ([a-zA-Z0-9-_.\/:$]+))? ?$/,
                    /^(?:select |get )?(?:type |object |object type |all objects of type |collection |search )?([a-zA-Z0-9-_.\/:$]+)(( with attr) ([a-zA-Z0-9-_.\/:$]+))? ?$/,
                    /^(?:select |get )?(?:type |object |object type |all objects of type |collection |search )?([a-zA-Z0-9-_.\/:$]+)(( with all attr)) ?$/,
                    new RegExp('[a-zA-Z0-9-_.\\/:$]+ (?:with attr|with all attr|where|has attr|and|or) ([a-zA-Z0-9-_.\\/:$]+)' +
                        '(?:(?: )?(?:=|!=|>=|<=)(?: )?| equal to | not equal to | (?:greater|less) than or equal to )((?:\\*)?' +
                        '[a-zA-Z0-9-_.\\/:$]+(%%[a-zA-Z0-9-_.\\/:$]+)*(?:\\*)?|\\"[^\\"]+\\") $')
                ]
            },
            {
                keys: [
                    {
                        filters: [
                            'filter by managementState = MAINTENANCE',
                            'filter by managementState = NORMAL'
                        ]
                    }
                ],
                regex: [
                    /(?!.*?filter by managementState)^.*(?:filter by radioAccessTechnology contains [1-5]G)/,
                    /(?!.*?filter by managementState)^.*(?:filter by radioAccessTechnology contains any of (([1-5]G+)\,)+)/,
                    /(?!.*?filter by managementState)^.*(?:filter by radioAccessTechnology contains all of (([1-5]G+)\,)+)/,
                    /(?!.*?filter by managementState)^.*(?:filter by radioAccessTechnology containing [1-5]G)/,
                    /(?!.*?filter by managementState)^.*(?:filter by radioAccessTechnology containing any of (([1-5]G+)\,)+)/,
                    /(?!.*?filter by managementState)^.*(?:filter by radioAccessTechnology containing all of (([1-5]G+)\,)+)/
                ]
            },
            {
                keys: [
                    {
                        filters: [
                            'filter by radioAccessTechnology contains'
                        ]
                    }
                ],
                regex: [
                    /(?!.*?ignoring case|.*?filter by radioAccessTechnology)^.*(?:filter by managementState)/
                ]
            }
        ],
        keywords: [
            'search',
            'select',
            'get',
            'all objects of type',
            'object',
            'type',
            'collection',
            'node type',
            'where',
            'with',
            'has attr',
            'has parent',
            'has child',
            'object',
            'has',
            '=',
            '!=',
            '>=',
            '<=',
            'equal to',
            'not equal to',
            'greater than or equal to',
            'less than or equal to',
            'and',
            'or',
            'parent',
            'child',
            'attr',
            'all attr',
            'node',
            'from',
            'using',
            'contains',
            'containing',
            'contains any of',
            'contains all of',
            'containing any of',
            'containing all of',
            'ignoring case'
        ]
    };
});
