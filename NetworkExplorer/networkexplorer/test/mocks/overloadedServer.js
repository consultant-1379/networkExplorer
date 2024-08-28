module.exports = function(app) {

    // Return capacity exceeded response for all netex requests
    app.get('/managedObjects/*', function (req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.get('/object-configuration/*', function (req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.get('/topologyCollections/*', function (req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.get('/modelInfo/*', function (req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.get('/persistentObject/*', function(req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.get('/persistentObject/fdn/*', function(req, res) { respond(req, res, 429, capacityExceededResponseLocateObjectError)});
    app.get('/persistentObject/network/poids', function(req, res) { respond(req, res, 200, poIds)});
    app.post('/persistentObject/v1/perform-mo-action/', function(req, res) { respond(req, res, 429, capacityExceededResponseDataRetrievalError)});
    app.get('/persistentObject/123?*', function(req, res) { respond(req, res, 429, capacityExceededResponseDataRetrievalError)});
    app.get('/persistentObject/456?*', function(req, res) { respond(req, res, 429, capacityExceededResponseDataRetrievalError)});
    app.get('/persistentObject/network/281474979176961 ', function(req, res) { respond(req, res, 429, capacityExceededResponseDataRetrievalError)});
    app.get('/persistentObject/network/*', function(req, res) { respond(req, res, 200, topology)});
    app.post('/persistentObject/rootAssociations/', function(req, res) { respond(req, res, 200, rootAssociationsResponse)});
    app.get('/rest/ui/settings/networkexplorer/favorites', function(req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.post('/object-configuration/*', function(req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.post('/topologyCollections/*', function(req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.put('/object-configuration/*', function(req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.put('/topologyCollections/*', function(req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.delete('/object-configuration/*', function(req, res) { respond(req, res, 429, capacityExceededResponse); });
    app.delete('/topologyCollections/*', function(req, res) { respond(req, res, 429, capacityExceededResponse); });

    // other responses
    app.get('/rest/system/time', function(req, res) { respond(req, res, 200, timeResponse); });
    app.get('/rest/*', function(req, res) { respond(req, res, 200, '[]'); });
    app.post('/rest/v1/apps/action-matches', function(req, res) { respond(req, res, 200, actionMatches); });
    app.get('/rest/*', function(req, res) { respond(req, res, 200, "[]"); });
    app.get('/editprofile', function(req, res) { respond(req, res, 304, {}); });
    app.get('/oss/idm/usermanagement/users/*', function(req, res) { respond(req, res, 200, userProfile); });
    app.get('/oss/uiaccesscontrol/resources/searchExecutor/actions', function(req, res) { respond(req, res, 200, accessControlMap.search); });
    app.get('/oss/uiaccesscontrol/resources/persistentobjectservice/actions', function(req, res) { respond(req, res, 200, accessControlMap.pos); });
    app.get('/oss/uiaccesscontrol/resources/topologySearchService/actions', function(req, res) { respond(req, res, 200, accessControlMap.tss); });
    app.get('/oss/uiaccesscontrol/resources/topologyCollectionsService/actions', function(req, res) { respond(req, res, 200, accessControlMap.tcs); });
    app.get('/oss/uiaccesscontrol/resources/Collections_Public/actions', function(req, res) { respond(req, res, 200, accessControlMap.collPub); });
    app.get('/oss/uiaccesscontrol/resources/Collections_Private/actions', function(req, res) { respond(req, res, 200, accessControlMap.collPriv); });
    app.get('/oss/uiaccesscontrol/resources/CollectionsOthers_Public/actions', function(req, res) { respond(req, res, 200, accessControlMap.collOthersPub); });
    app.get('/oss/uiaccesscontrol/resources/CollectionsOthers_Private/actions', function(req, res) { respond(req, res, 200, accessControlMap.collOthersPriv); });
    app.get('/oss/uiaccesscontrol/resources/SavedSearch_Public/actions', function(req, res) { respond(req, res, 200, accessControlMap.ssPub); });
    app.get('/oss/uiaccesscontrol/resources/SavedSearch_Private/actions', function(req, res) { respond(req, res, 200, accessControlMap.ssPriv); });
    app.get('/oss/uiaccesscontrol/resources/SavedSearchOthers_Public/actions', function(req, res) { respond(req, res, 200, accessControlMap.ssOthersPub); });
    app.get('/oss/uiaccesscontrol/resources/SavedSearchOthers_Private/actions', function(req, res) { respond(req, res, 200, accessControlMap.ssOthersPriv); });


    function respond(req, res, status, responseObj) {
        res.set('Content-Type', 'application/json');
        res.status(status);
        res.send(JSON.stringify(responseObj));
    }

    var rootAssociationsResponse = [{
        attributes: null,
        fdn: "NetworkElement=CORE13vEPGEVR001",
        id: "281474978964985",
        name: "CORE13vEPGEVR001",
        namespace: null,
        namespaceVersion: null,
        neType: null,
        networkDetails: null,
        poId: 281474978964985,
        type: "NetworkElement",
    }];

    var actionMatches = {
        actions: [{
            applicationId: "topologybrowser",
            category: "Configuration Management",
            defaultLabel: "Initiate CM Sync",
            multipleSelection: true,
            name: "topologybrowser-initiate-cm-sync",
            order: 300,
            plugin: "topologybrowser/topologybrowser-initiate-cm-sync",
            primary: false,
        }]
    };

    var poIds = {"treeNodes":[{"id":"281474978965023","moName":"CORE12EPGEVR001","moType":"SubNetwork","syncStatus":"","neType":null,"parentMoType":""}]};

    var topology = {
        treeNodes: [{
                id: "123",
                moName: "snA1",
                moType: "SubNetwork",
                syncStatus: "",
                neType: null,
                parentMoType: null,
                poId: 281474978964697,
                noOfChildrens: 1,
                childrens: [{
                    childrens: null,
                    id: "456",
                    moName: "LTE02ERBS00002",
                    moType: "MeContext",
                    neType: "ERBS",
                    noOfChildrens: 1,
                    parentMoType: null,
                    poId: 281474979019154,
                    syncStatus: "SYNCHRONIZED"
                }]
            }]
    };

    var capacityExceededResponse = {
        userMessage: {
            title: 'Unable to Retrieve Data',
            body: 'There is currently no capacity to process the request due to a large amount of activity on the server. Please try again later.'
        },
        internalErrorCode: 10101
    };

    var capacityExceededResponseDataRetrievalError = {
        userMessage: {
            title: 'Unable to Retrieve Data',
            body: 'There is currently no capacity to process the request due to a large amount of activity on the server. Please try again later.'
        },
        errorCode: 10106
    };

    var capacityExceededResponseLocateObjectError = {
        userMessage: {
            title: 'Unable to Locate Object',
            body: 'There is currently no capacity to process the request due to a large amount of activity on the server. Please try again later.'
        },
        errorCode: 10106
    };

    var userProfile = [{
        user: 'administrator',
        role: 'ADMINISTRATOR',
        targetGroup: 'ALL'
    }, {
        user: 'administrator',
        role: 'SECURITY_ADMIN',
        targetGroup: 'ALL'
    }];

    var timeResponse = {
        timestamp: new Date().getTime(),
        utcOffset: 1.0,
        timezone: 'IST',
        serverLocation: 'Europe/Dublin'
    };

    var accessControlMap = {
        search: {resource: 'searchExecutor',actions: ['read']},
        pos: {resource: 'persistentobjectservice',actions: ['read','update']},
        tss: {resource: 'topologySearchService',actions: ['read']},
        tcs: {resource: 'topologyCollectionsService',actions: ['create','delete','read','update']},
        collPub: {resource: 'Collections_Public',actions: ['create','delete','read','update']},
        collPriv: {resource: 'Collections_Private',actions: ['create','delete','read','update']},
        collOthersPub: {resource: 'CollectionsOthers_Public',actions: ['read','update','delete']},
        collOthersPriv: {resource: 'CollectionsOthers_Private',actions: ['read','update','delete']},
        ssPub: {resource: 'SavedSearch_Public',actions: ['create','delete','read','update']},
        ssPriv: {resource: 'SavedSearch_Private',actions: ['create','delete','read','update']},
        ssOthersPub: {resource: 'SavedSearchOthers_Public',actions: ['read','update','delete']},
        ssOthersPriv: {resource: 'SavedSearchOthers_Private',actions: ['read','update','delete']}
    };

};
