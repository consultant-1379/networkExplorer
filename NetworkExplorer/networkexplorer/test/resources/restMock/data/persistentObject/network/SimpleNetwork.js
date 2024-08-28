if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}
define(function() {
    return {
        /**
         *
         * @param options: networkSize, networkDepth
         */
        with: function(options) {
            options.size = options.size || 1;
            options.depth = options.depth || 1;

            var moType = 'SubNetwork'; // 1
            if (options.depth === 2) {
                moType = 'MeContext';
            }
            return {
                treeNodes: Array.apply(null, {length: options.size}).map(function(e, i, a) {
                    return {
                        id: ((100000*options.depth) + i).toString(),
                        childrens: null,
                        moName: moType + '_' + i,
                        moType: moType,
                        noOfChildrens: 1,
                        syncStatus: ''
                    };
                })
            };
        }
    };
});
