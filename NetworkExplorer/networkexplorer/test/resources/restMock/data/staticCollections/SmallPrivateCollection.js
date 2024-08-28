// Compatibility for mocks
if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}
define(function() {
    return {
        category: 'Private',
        id: '281474976740691',
        name: 'ManagedElements',
        objects: [
            { id: '281474976741408' },
            { id: '281474976740410' },
            { id: '281474976740343' }
        ],
        readOnly: false,
        timeCreated: 1422461531264,
        userId: 'administrator'
    };
});
