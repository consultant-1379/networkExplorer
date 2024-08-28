if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return [
        {
            name: 'Name',
            value: 'moName',
            visible: undefined,
            width: '300px'
        },
        {
            name: 'Mo Type',
            value: 'moType',
            visible: undefined,
            width: '200px'
        },
        {
            name: 'Node Name',
            value: 'mibRootName',
            visible: undefined,
            width: '200px'
        },{
            name: 'Sync Status (CM)',
            value: 'cmSyncStatus',
            visible: undefined,
            width: '200px'
        },
        {
            name: 'Parent MO',
            value: 'moType',
            visible: undefined,
            width: '200px'
        }
    ];
});
