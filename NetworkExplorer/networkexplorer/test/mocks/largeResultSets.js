var nodeTypes = require('../resources/restMock/data/model/nodeTypes');
var erbsTypes = require('../resources/restMock/data/model/ENODEBtypes');
var meContextChildren = require('../resources/restMock/data/model/MeContextChildren');
var managedElementChildren = require('../resources/restMock/data/model/ManagedElementChildren');
var managedElementAttributes = require('../resources/restMock/data/model/ManagedElementAttributes');

var LargestCollection = require('../resources/restMock/data/object-configuration/v1/collections/LargestCollection');

var staticCollections = [
        LargestCollection
    ], objectConfiguration = {
        'collections': staticCollections
    };
var LargestSavedSearch = require('../resources/restMock/data/topologyCollections/savedSearches/LargestSavedSearch');

var LargestSearchResponse = require('../resources/restMock/data/managedObjects/query/searchQuery/LargestSearch');

module.exports = function(app) {

    app.get('/modelInfo/model/nodeTypes/', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(nodeTypes));
        }, Math.floor(Math.random() * 500) + 300);
    });

    app.get('/modelInfo/model/ERBS/*/nodeChildTypes/', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(erbsTypes));
        }, Math.floor(Math.random() * 500) + 300);
    });

    app.get('/modelInfo/model/ERBS/MeContext/*/moChildTypes/', function(req, res) {
        setTimeout(function() {
            setTimeout(function() {
                res.set('Content-Type', 'application/json');
                res.send(JSON.stringify(meContextChildren));
            }, Math.floor(Math.random() * 500) + 300);
        }, 2000);
    });

    app.get('/modelInfo/model/MeContext/*/attributes', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify([]));
        }, 2000);
    });

    app.get('/modelInfo/model/ERBS/ManagedElement/*/moChildTypes/', function(req, res) {
        setTimeout(function() {
            setTimeout(function() {
                res.set('Content-Type', 'application/json');
                res.send(JSON.stringify(managedElementChildren));
            }, Math.floor(Math.random() * 500) + 300);
        }, 2000);
    });

    app.get('/modelInfo/model/ManagedElement/*/attributes', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(managedElementAttributes));
        }, 2000);
    });

    app.get('/object-configuration/v1/collections/*', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(LargestCollection));
        }, Math.floor(Math.random() * 2000) + 300);
    });

    app.get('/object-configuration/collections/v2/*', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(LargestCollection));
        }, Math.floor(Math.random() * 2000) + 300);
    });

    app.get('/topologyCollections/staticCollections', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(staticCollections));
        }, Math.floor(Math.random() * 2000) + 300);
    });

    app.get('/object-configuration/v1/collections', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(objectConfiguration));
        }, Math.floor(Math.random() * 2000) + 300);
    });

    app.get('/object-configuration/collections/v2', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(objectConfiguration));
        }, Math.floor(Math.random() * 2000) + 300);
    });

    app.get('/topologyCollections/savedSearches', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify([LargestSavedSearch]));
        }, Math.floor(Math.random() * 2000) + 300);
    });

    app.get('/topologyCollections/savedSearches/*', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(LargestSavedSearch));
        }, Math.floor(Math.random() * 2000) + 300);
    });

    Array.prototype.random = function() {
        return this[Math.floor((Math.random()*this.length))];
    };

    app.get('/managedObjects/query*', function(req, res) {
        setTimeout(function() {
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(LargestSearchResponse));
        }, Math.floor(Math.random() * 2000) + 300);
    });

    app.post('/managedObjects/getPosByPoIds', function(req, res) {
        var pos = req.body.poList.map(function(poId) {
            return {
                poId: poId,
                moName: poId,
                moType: ['MeContext', 'ManagedElement', 'NetworkElement'].random(),
                neType: ['ERBS', 'SGSN-MME', 'MINI-LINK-OUTDOOR', undefined].random()
            };
        });
        setTimeout(function() {
            if (Math.random() < 0.000005) {
                res.set('Content-Type', 'application/json');
                res.status(404);
                res.send('<html errbody>');
            } else if (req.body.poList.length > 50) {
                res.set('Content-Type', 'application/json');
                res.status(500);
                res.send('{"customErrorMessage": "OOM occurred, too many objects requested"}');
            } else {
                res.set('Content-Type', 'application/json');
                res.status(200);
                res.send(JSON.stringify(pos));
            }
        }, Math.floor(Math.random() * 2000) + 300);
    });
};
