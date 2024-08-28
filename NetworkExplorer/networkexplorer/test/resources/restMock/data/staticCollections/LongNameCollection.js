// Compatibility for mocks
if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}
define(function() {
    return {
        category: 'Private',
        id: '281474976808461',
        name: 'ManagedElements-LongName%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
        objects: [
            { 'id': '281474976740416' },
            { 'id': '281474976741412' },
            { 'id': '281474976741415' },
            { 'id': '281474976808338' }
        ],
        readOnly: false,
        timeCreated: 1422461531264,
        userId: 'administrator'
    };
});
