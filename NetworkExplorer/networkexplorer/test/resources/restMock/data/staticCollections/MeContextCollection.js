// Compatibility for mocks
if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}
define(function() {
    return {
        category: 'Private',
        id: '381474976740688',
        name: 'All MeContext2',
        objects: [
            { id: '381474976741408' },
            { id: '381474976740410' },
            { id: '381474976740434' }
        ],
        readOnly: false,
        timeCreated: 1422461900446,
        userId: 'administrator'
    };
});
