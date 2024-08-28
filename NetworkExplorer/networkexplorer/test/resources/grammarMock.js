define(function() {
    return {
        'search_expression': {
            type: 'nonterminal',
            options: [
                [
                    { rule: 'ANYTHING'}
                ]
            ]
        },
        'ANYTHING': {
            type: 'terminal',
            regex: '.*'
        }
    };
});
