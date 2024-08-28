if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

var largestCollectionSize = 25000;

define(function() {
    return {
        'type': 'SavedSearch',
        'poId': '88888888888888888',
        'name': 'All Cells and Relations',
        'searchQuery': 'EUtranCellFDD,EUtranCellTDD,EUtranCellRelations',
        'attributes': {
            'searchQuery': 'EUtranCellFDD,EUtranCellTDD,EUtranCellRelations',
            'name': 'All Cells and Relations',
            'timeCreated': '1422461900446',
            'userId': 'testuser',
            'category': 'Private'
        }
    };
});
