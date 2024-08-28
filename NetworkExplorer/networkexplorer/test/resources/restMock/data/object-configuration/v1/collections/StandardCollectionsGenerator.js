if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return {
        /**
         *
         * @param options: numberOfCollection
         */
        with: function(options) {
            options.numberOfCollection = options.numberOfCollection || 1;
            return {
                collections: Array.apply(null, {length: options.numberOfCollection}).map(function(e, i, a) {
                    return {
                        id: (1000000000 + i).toString(),
                        name: "Coll"+i,
                        parentId: 281474978402895,
                        type: "STANDARD",
                        subtype: null,
                        customTopology: false,
                        level: 1,
                        sharing: "Public",
                        owner: "administrator",
                        lastUpdatedTime: 1468576420614,
                        update:true,
                        delete:true
                    };
                })
            };
        }
    };
});
