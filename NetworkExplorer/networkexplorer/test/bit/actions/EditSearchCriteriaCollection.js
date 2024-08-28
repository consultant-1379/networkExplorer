define([
    'test/bit/bitPromises',
    'jscore/core',
    'container/api',
    'test/bit/viewmodels/UISDKViewModel',
    'test/bit/viewmodels/ActionsViewModel',
    'networkexplorer/actions/EditSearchCriteriaCollection',
    'test/resources/restMock/REST_object_configuration',
    'test/resources/restMock/REST_results',
    'test/resources/restMock/REST_ui_settings',
    'test/resources/restMock/REST_uiaccesscontrol',
    'test/resources/restMock/data/savedSearches',
    'i18n!networkexplorer/app_actions.json',
    'i18n!networkexplorerlib/searchcriteriacollections.json'
], function(promises, core, Container, UISDKViewModel, ActionsViewModel, EditSearchCriteriaCollection, REST_object_configuration,
            REST_results, REST_ui_settings, REST_uiaccesscontrol, savedSearchesData,  strings, stringsSearch) {

    var TIMEOUT = 5000;

    var responseValidJsonData = function (jsonData) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify(jsonData)];
    };
    var urlRest = "/topologyCollections/savedSearches";
    var responseAllSavedSearchesStringified = responseValidJsonData(savedSearchesData);
    var queryResponse = {
        poList: ['1']
    };

    describe('EditSearchCriteriaCollection', function() {
        this.timeout(TIMEOUT);

        var actionContainer = document.getElementById('bitContainer'), currentApp, AppWithEditSearchCriteriaCollection, _server, _sandbox;

        beforeEach(function(done) {
            // Setup fake server & sandbox
            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            _server = _sandbox.server;
            _server.autoRespond = true;
            _server.respondImmediately = true;
            // Override flyout behavior
            var eventBusStub = {
                subscribe: _sandbox.spy(),
                publish: _sandbox.spy(function(channel, value) {
                    switch (channel) {
                        case 'flyout:show':
                            currentApp.addRegion(value.content);
                            break;
                        case 'flyout:hide':
                            currentApp.stop();
                            break;
                    }
                })
            };
            _sandbox.stub(Container, 'getEventBus', function() {
                return eventBusStub;
            });
            // Create a generic app with View and root DOM element.
            AppWithEditSearchCriteriaCollection = core.App.extend({
                View: core.View.extend({
                    getTemplate: function() {
                        return '<div style=\'height:100%;\'></div>';
                    }
                }),
                addRegion: function(region) {
                    var child = new core.Element();
                    child.setStyle({height: 'calc(100% - 40px)'});
                    this.getElement().append(child);
                    region.attachTo(child);
                }
            });
            currentApp = new AppWithEditSearchCriteriaCollection();
            // start application.
            currentApp.start(actionContainer);
            done();
        });

        afterEach(function() {
            if (actionContainer.firstChild) {
                actionContainer.firstChild.remove();
            }
            currentApp = undefined;
            AppWithEditSearchCriteriaCollection = undefined;
            _sandbox.restore();
            _server.restore();
        });

        describe('Edit criteria for search criteria based collection is successful', function() {
            [
                {
                    type:'NESTED',
                    selectedCollection:{ id: '12345',  query:'anyQuery', type:'NESTED', parentId: 1234},
                    endpoint:'/object-configuration/custom-topology/v2/12345'
                },
                {
                    type:'STANDARD',
                    selectedCollection:{ id: '12345',  query:'anyQuery', type:'STANDARD'},
                    endpoint:'/object-configuration/collections/v3/12345'
                }
            ].forEach(function (testCase) {
                it('for '+testCase.type+' collection', function (done) {
                    this.timeout(TIMEOUT);
                    var responseObject = {
                        id: '12345',
                        name: 'dummycollection',
                        query: savedSearchesData[0].searchQuery
                    };
                    REST_uiaccesscontrol.respondToResourceRequest(_server);
                    REST_uiaccesscontrol.respondToProfile(_server, 'user');
                    REST_uiaccesscontrol.respondToProfile(_server, 'administrator');
                    REST_object_configuration.respondToUpdateNestedCollectionContents(_server, '12345', responseObject, 200);
                    REST_object_configuration.respondToUpdateCollectionContents(_server, '12345', responseObject, 200);
                    var favourites = [
                        {id: savedSearchesData[3].poId, value: true},
                        {id: savedSearchesData[1].poId, value: true},
                        {id: savedSearchesData[5].poId, value: true}
                    ];
                    _server.respondWith(urlRest, responseAllSavedSearchesStringified);
                    _server.respondWith(urlRest+'/'+savedSearchesData[0].poId, JSON.stringify(savedSearchesData[0]));
                    REST_results.respondToQuery(_server, savedSearchesData[0].searchQuery, 200, queryResponse);
                    REST_ui_settings.respondToNetworkExplorerFavorites(_server, favourites);
                    var callbacks = {
                        onReady: _sandbox.spy(),
                        onProgress: _sandbox.spy(),
                        onComplete: _sandbox.spy(),
                        onFail: _sandbox.spy()
                    };
                    var action = new EditSearchCriteriaCollection();
                    action.start(callbacks, [testCase.selectedCollection], []);
                    promises.runTestSteps([
                        UISDKViewModel.getTableRows,
                        function(rows) {
                            promises.clickElement(rows[0]);
                            return ActionsViewModel.getSaveButton();
                        },
                        function(submit) {
                            promises.clickElement(submit);
                            return UISDKViewModel.getNotification();
                        },
                        function(label) {
                            expect(label.textContent).to.equal(strings.get('networkexplorer-edit-search-criteria-collection.collectionUpdated'));
                            expect(callbacks.onComplete.callCount).to.equal(1);
                            expect(REST_object_configuration.getLastUrlRequested()).to.equal(testCase.endpoint);
                            expect(REST_object_configuration.getLastMethodRequested()).to.equal('PUT');
                            return Promise.resolve();
                        },
                        done
                    ]);
                });
            });
        });

        it('successfully updates the criteria for search criteria based collection when criteria returns empty set', function(done) {
            var selectedCollection = { id: '12345',  query:'anyQuery', type:'STANDARD'};
            this.timeout(TIMEOUT);
            var responseObject = {
                id: '12345',
                name: 'dummycollection',
                query: savedSearchesData[0].searchQuery
            };
            var queryResponse = {
                poList: []
            };
            REST_uiaccesscontrol.respondToResourceRequest(_server);
            REST_uiaccesscontrol.respondToProfile(_server, 'user');
            REST_uiaccesscontrol.respondToProfile(_server, 'administrator');
            REST_object_configuration.respondToUpdateNestedCollectionContents(_server, '12345', responseObject, 200);
            REST_object_configuration.respondToUpdateCollectionContents(_server, '12345', responseObject, 200);
            var favourites = [
                {id: savedSearchesData[3].poId, value: true},
                {id: savedSearchesData[1].poId, value: true},
                {id: savedSearchesData[5].poId, value: true}
            ];
            _server.respondWith(urlRest, responseAllSavedSearchesStringified);
            _server.respondWith(urlRest+'/'+savedSearchesData[0].poId, JSON.stringify(savedSearchesData[0]));
            REST_results.respondToQuery(_server, savedSearchesData[0].searchQuery, 200, queryResponse);
            REST_ui_settings.respondToNetworkExplorerFavorites(_server, favourites);

            var callbacks = {
                onReady: _sandbox.spy(),
                onProgress: _sandbox.spy(),
                onComplete: _sandbox.spy(),
                onFail: _sandbox.spy()
            };

            var action = new EditSearchCriteriaCollection();
            action.start(callbacks, [selectedCollection], []);
            promises.runTestSteps([
                UISDKViewModel.getTableRows,
                function(rows) {
                    promises.clickElement(rows[0]);
                    return ActionsViewModel.getSaveButton();
                },
                function(submit) {
                    promises.clickElement(submit);
                    return UISDKViewModel.getDialogMessage();
                },
                function(message) {
                    expect(message.textContent).to.equal(stringsSearch.get('errors.noResultsMessageEdit'));
                    return UISDKViewModel.getAllDialogButtons();
                },
                function (buttons) {
                    expect(buttons.length).to.equal(2);
                    expect(buttons[0].textContent).to.equal('Update Criteria');
                    expect(buttons[1].textContent).to.equal('Cancel');
                    promises.clickElement(buttons[0]);
                    UISDKViewModel.waitForDialogToDisappear();
                    return UISDKViewModel.getNotification();
                },
                function(label) {
                    expect(label.textContent).to.equal(strings.get('networkexplorer-edit-search-criteria-collection.collectionUpdated'));
                    expect(callbacks.onComplete.callCount).to.equal(1);
                    expect(REST_object_configuration.getLastUrlRequested()).to.equal('/object-configuration/collections/v3/12345');
                    expect(REST_object_configuration.getLastMethodRequested()).to.equal('PUT');
                    return Promise.resolve();
                },
                done
            ]);
        });

        it('Cancel button cancels the dialog during Edit of search criteria based collection when criteria returns empty set', function(done) {
            var selectedCollection = { id: '12345',  query:'anyQuery', type:'STANDARD'};
            this.timeout(TIMEOUT);
            var responseObject = {
                id: '12345',
                name: 'dummycollection',
                query: savedSearchesData[0].searchQuery
            };
            var queryResponse = {
                poList: []
            };
            REST_uiaccesscontrol.respondToResourceRequest(_server);
            REST_uiaccesscontrol.respondToProfile(_server, 'user');
            REST_uiaccesscontrol.respondToProfile(_server, 'administrator');
            REST_object_configuration.respondToUpdateNestedCollectionContents(_server, '12345', responseObject, 200);
            REST_object_configuration.respondToUpdateCollectionContents(_server, '12345', responseObject, 200);
            var favourites = [
                {id: savedSearchesData[3].poId, value: true},
                {id: savedSearchesData[1].poId, value: true},
                {id: savedSearchesData[5].poId, value: true}
            ];
            _server.respondWith(urlRest, responseAllSavedSearchesStringified);
            _server.respondWith(urlRest+'/'+savedSearchesData[0].poId, JSON.stringify(savedSearchesData[0]));
            REST_results.respondToQuery(_server, savedSearchesData[0].searchQuery, 200, queryResponse);
            REST_ui_settings.respondToNetworkExplorerFavorites(_server, favourites);

            var callbacks = {
                onReady: _sandbox.spy(),
                onProgress: _sandbox.spy(),
                onComplete: _sandbox.spy(),
                onFail: _sandbox.spy()
            };

            var action = new EditSearchCriteriaCollection();
            action.start(callbacks, [selectedCollection], []);
            promises.runTestSteps([
                UISDKViewModel.getTableRows,
                function(rows) {
                    promises.clickElement(rows[0]);
                    return ActionsViewModel.getSaveButton();
                },
                function(submit) {
                    promises.clickElement(submit);
                    return UISDKViewModel.getDialogMessage();
                },
                function(message) {
                    expect(message.textContent).to.equal(stringsSearch.get('errors.noResultsMessageEdit'));
                    return UISDKViewModel.getAllDialogButtons();
                },
                function (buttons) {
                    expect(buttons.length).to.equal(2);
                    expect(buttons[0].textContent).to.equal('Update Criteria');
                    expect(buttons[1].textContent).to.equal('Cancel');
                    promises.clickElement(buttons[1]);
                    return UISDKViewModel.waitForDialogToDisappear();
                },
                function() {
                    expect(callbacks.onComplete.callCount).to.equal(1);
                    expect(REST_results.getLastUrlRequested()).to.contain('/managedObjects/query?searchQuery='+savedSearchesData[0].searchQuery);
                    return Promise.resolve();
                },
                done
            ]);
        });

        describe('Edit collection based on search criteria fails', function() {
            [
                {
                    description:'when collection update fails',
                    errorMessage:stringsSearch.get('errors.internalServerErrorMessage'),
                    queryResponse:{poList: ['1']},
                    selectedCollection: { id: '12345',  query:'anyQuery', type:'NESTED', parentId: 1234},
                    status_mo:200,
                    status_collections:400,
                    assertions: function () {
                        expect(REST_object_configuration.getLastUrlRequested()).to.contain('/object-configuration/custom-topology/v2/12345');
                        expect(REST_object_configuration.getLastMethodRequested()).to.equal('PUT');
                    }
                },
                {
                    description:'when user is not authorized',
                    errorMessage:stringsSearch.get('errors.unauthorizedAccessErrorMessage'),
                    queryResponse:{poList: ['1']},
                    selectedCollection: { id: '12345',  query:'anyQuery', type:'NESTED', parentId: 1234},
                    status_mo:200,
                    status_collections:403,
                    assertions: function () {
                        expect(REST_object_configuration.getLastUrlRequested()).to.contain('/object-configuration/custom-topology/v2/12345');
                        expect(REST_object_configuration.getLastMethodRequested()).to.equal('PUT');
                    }
                },
                {
                    description:'when managed object search fails',
                    errorMessage:stringsSearch.get('errors.internalServerErrorMessage'),
                    queryResponse:null,
                    selectedCollection: { id: '12345',  query:'anyQuery', type:'NESTED', parentId: 1234},
                    status_mo:400,
                    status_collections:400,
                    assertions: function () {
                        expect(REST_results.getLastUrlRequested()).to.contain('/managedObjects/query?searchQuery='+savedSearchesData[0].searchQuery);
                    }
                },
                {
                    description:'when NESTED collection cannot have more than 2000 objects',
                    errorMessage:stringsSearch.get('errors.collectionSizeExceeded'),
                    queryResponse:{
                        poList: new Array(2001)
                            .join().split(',')
                            .map(function(item, index){ return ++index;})},
                    selectedCollection: { id: '12345',  query:'anyQuery', type:'NESTED', parentId: 1234},
                    status_mo:200,
                    status_collections:400,
                    assertions: function () {
                        expect(REST_results.getLastUrlRequested()).to.contain('/managedObjects/query?searchQuery='+savedSearchesData[0].searchQuery);
                    }
                },
                {
                    description:'when STANDARD collection cannot have more than 25000 objects',
                    errorMessage:stringsSearch.get('errors.collectionSizeExceeded'),
                    queryResponse:{
                        poList: new Array(25001)
                            .join().split(',')
                            .map(function(item, index){ return ++index;})},
                    selectedCollection: { id: '12345',  query:'anyQuery', type:'STANDARD'},
                    status_mo:200,
                    status_collections:400,
                    assertions: function () {
                        expect(REST_results.getLastUrlRequested()).to.contain('/managedObjects/query?searchQuery='+savedSearchesData[0].searchQuery);
                    }
                }
            ].forEach(function (testCase) {
                it(testCase.description, function (done) {
                    this.timeout(TIMEOUT);
                    var responseObject = {
                        id: '12345',
                        name: 'dummycollection',
                        query: savedSearchesData[0].searchQuery
                    };
                    REST_results.respondToQuery(_server, savedSearchesData[0].searchQuery, testCase.status_mo, testCase.queryResponse);
                    REST_uiaccesscontrol.respondToResourceRequest(_server);
                    REST_uiaccesscontrol.respondToProfile(_server, 'user');
                    REST_uiaccesscontrol.respondToProfile(_server, 'administrator');
                    REST_object_configuration.respondToUpdateNestedCollectionContents(_server, '12345', responseObject, testCase.status_collections);
                    REST_object_configuration.respondToUpdateCollectionContents(_server, '12345', responseObject, testCase.status_collections);
                    var favourites = [
                        {id: savedSearchesData[3].poId, value: true},
                        {id: savedSearchesData[1].poId, value: true},
                        {id: savedSearchesData[5].poId, value: true}
                    ];
                    _server.respondWith(urlRest, responseAllSavedSearchesStringified);
                    _server.respondWith(urlRest+'/'+savedSearchesData[0].poId, JSON.stringify(savedSearchesData[0]));
                    REST_ui_settings.respondToNetworkExplorerFavorites(_server, favourites);
                    var callbacks = {
                        onReady: _sandbox.spy(),
                        onProgress: _sandbox.spy(),
                        onComplete: _sandbox.spy(),
                        onFail: _sandbox.spy()
                    };
                    var action = new EditSearchCriteriaCollection();
                    action.start(callbacks, [testCase.selectedCollection], []);
                    promises.runTestSteps([
                        UISDKViewModel.getTableRows,
                        function(rows) {
                            promises.clickElement(rows[0]);
                            return ActionsViewModel.getSaveButton();
                        },
                        function(submit) {
                            promises.clickElement(submit);
                            return UISDKViewModel.getDialogMessage();
                        },
                        function(message) {
                            expect(message.textContent).to.equal(testCase.errorMessage);
                            return UISDKViewModel.getDialogOkButton();
                        },
                        function (button) {
                            expect(button.textContent).to.equal('OK');
                            promises.clickElement(button);
                            return UISDKViewModel.waitForDialogToDisappear();
                        },
                        function() {
                            expect(callbacks.onComplete.callCount).to.equal(1);
                            testCase.assertions();
                            return Promise.resolve();
                        },
                        done
                    ]);
                });
            });
        });

        describe('afterUseCase promise is', function() {
            var selectedCollection = { id: '12345',  query:'anyQuery', type:'STANDARD'};
            var responseObject = {
                id: '12345',
                name: 'dummycollection',
                query: savedSearchesData[0].searchQuery
            };
            var queryResponse = {
                poList: ['1']
            };
            beforeEach(function(done) {
                this.timeout(TIMEOUT);
                REST_results.respondToQuery(_server, savedSearchesData[0].searchQuery, 200, queryResponse);
                REST_uiaccesscontrol.respondToResourceRequest(_server);
                REST_uiaccesscontrol.respondToProfile(_server, 'user');
                REST_uiaccesscontrol.respondToProfile(_server, 'administrator');
                var favourites = [
                    {id: savedSearchesData[3].poId, value: true},
                    {id: savedSearchesData[1].poId, value: true},
                    {id: savedSearchesData[5].poId, value: true}
                ];
                _server.respondWith(urlRest, responseAllSavedSearchesStringified);
                _server.respondWith(urlRest+'/'+savedSearchesData[0].poId, JSON.stringify(savedSearchesData[0]));
                REST_ui_settings.respondToNetworkExplorerFavorites(_server, favourites);
                done();
            });
            it('rejected when the cancel button is pressed', function(done) {
                var callbacks = {
                    onComplete: function(result) {
                        // ASSERT
                        expect(result.success).to.equal(true);
                        result.afterUseCase.then(function() {
                            done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                        });
                        result.afterUseCase.catch(function() {
                            done();
                        });
                    }
                };
                var action = new EditSearchCriteriaCollection();
                action.start(callbacks, [selectedCollection], []);
                promises.runTestSteps([
                    ActionsViewModel.getCancelButtonForActionPanel,
                    promises.clickElement
                ]);
            });
            it('resolved when use case is successful', function(done) {
                REST_object_configuration.respondToUpdateCollectionContents(_server, '12345', responseObject, 200);
                var callbacks = {
                    onComplete: function(result) {
                        // ASSERT
                        expect(result.success).to.equal(true);
                        result.afterUseCase.then(function(data) {
                            expect(data.data.id).to.equal(responseObject.id);
                            expect(data.data.query).to.equal(responseObject.query);
                            done();
                        });
                        result.afterUseCase.catch(function() {
                            done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                        });
                    }
                };
                var action = new EditSearchCriteriaCollection();
                action.start(callbacks, [selectedCollection], []);
                promises.runTestSteps([
                    UISDKViewModel.getTableRows,
                    function(rows) {
                        promises.clickElement(rows[0]);
                        return ActionsViewModel.getSaveButton();
                    },
                    promises.clickElement
                ]);
            });
            it('rejected when use case fails', function(done) {
                REST_object_configuration.respondToUpdateCollectionContents(_server, '12345', responseObject, 400);
                var callbacks = {
                    onComplete: function(result) {
                        // ASSERT
                        expect(result.success).to.equal(true);
                        result.afterUseCase.then(function() {
                            done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                        });
                        result.afterUseCase.catch(function() {
                            done();
                        });
                    }
                };
                var action = new EditSearchCriteriaCollection();
                action.start(callbacks, [selectedCollection], []);
                promises.runTestSteps([
                    UISDKViewModel.getTableRows,
                    function(rows) {
                        promises.clickElement(rows[0]);
                        return ActionsViewModel.getSaveButton();
                    },
                    promises.clickElement,
                    UISDKViewModel.getDialogOkButton,
                    promises.clickElement
                ]);
            });
        });
    });
});
