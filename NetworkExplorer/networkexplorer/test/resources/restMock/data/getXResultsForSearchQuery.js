define(function() {
    return function(totalNum, attributeMappings, isSortable) {
        var isSortable = !!isSortable;
        var response =  {
            poList: (function(quantity) {
                var list = [];
                for (var i = 100000; i < 100000 + quantity; i++) {
                    list.push(i.toString());
                }
                return list;
            })(totalNum),
            attributeMappings: attributeMappings || [],
            attributes: (function(mappings) {
                if (!(mappings instanceof Object) || !mappings.length) { return []; }
                var nameLists = mappings.map(function(map) {
                    return map.attributeNames;
                });
                var names = nameLists.reduce(function(prev, curr) {
                    return prev.concat(curr);
                });
                return names.sort().filter(function(item, pos, ary) {
                    return !pos || item != ary[pos - 1];
                });
            })(attributeMappings),
            metadata: {
                RESULT_SET_TOTAL_SIZE: totalNum,
                MAX_UI_CACHE_SIZE: 100000
            },
            sortable: isSortable
        };
        return response;
    };
});
