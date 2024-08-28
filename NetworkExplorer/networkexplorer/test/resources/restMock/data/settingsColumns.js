if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {
    return [
        {
            title: 'Parent MO',
            enabled: true,
            attribute: 'parentRDN',
            visible: true,
            width: '200px',
            pinned: false,
            resizable: true
        },
        {
            title: 'MO Type',
            enabled: true,
            attribute: 'moType',
            visible: true,
            width: '200px',
            pinned: false,
            resizable: true
        },
        {
            title: 'Node Name',
            enabled: true,
            attribute: 'mibRootName',
            visible: false,
            width: '200px',
            pinned: false,
            resizable: true
        },
        {
            title: 'Sync Status (CM)',
            enabled: true,
            attribute: 'cmSyncStatus',
            visible: true,
            width: '200px',
            pinned: false,
            resizable: true
        },
        {
            title: 'Name',
            enabled: true,
            attribute: 'moName',
            visible: true,
            width: '300px',
            pinned: false,
            resizable: true
        }
    ];
});
