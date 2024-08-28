if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

var largestCollectionSize = 25000;

define(function() {
    return {
        category: 'Private',
        id: '99999999999',
        name: 'Largest Collection Possible',
        objects: Array.apply(null, {length: largestCollectionSize}).map(function(e,i,a) { return { 'id': i.toString() }; }),
        readOnly: false,
        timeCreated: 1383216271628,
        userId: 'testuser',
        sortable: false
    };
});
