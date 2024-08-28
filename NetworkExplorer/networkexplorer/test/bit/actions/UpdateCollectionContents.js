define([
    'test/bit/bitPromises',
    'jscore/core',
    'container/api',
    'test/bit/viewmodels/UISDKViewModel',
    'networkexplorer/actions/UpdateCollectionContents',
    'test/resources/restMock/REST_object_configuration',
    'test/resources/restMock/REST_results',
    'i18n!networkexplorer/app_actions.json'
], function(promises, core, Container, UISDKViewModel, UpdateCollectionContents, REST_object_configuration, REST_results, strings) {

    var TIMEOUT = 60000;

    describe('UpdateCollectionContents', function() {
        this.timeout(TIMEOUT);

        var actionContainer = document.getElementById('bitContainer'), currentApp, AppWithUpdateCollectionContents, _server, _sandbox;

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
            AppWithUpdateCollectionContents = core.App.extend({
                View: core.View.extend({
                    getTemplate: function() {
                        return '<div style=\'height:100%;\'></div>';
                    }
                }),
                addRegion: function(region) {
                    var child = new core.Element();
                    child.setStyle({height: 'calc(100% - 40px)'});
                    this.getElement().append(child);
                    region.start(child);
                }
            });
            currentApp = new AppWithUpdateCollectionContents();
            // start application.
            currentApp.start(actionContainer);
            done();
        });

        afterEach(function() {
            if (actionContainer.firstChild) {
                actionContainer.firstChild.remove();
            }
            currentApp = undefined;
            AppWithUpdateCollectionContents = undefined;
            _sandbox.restore();
            _server.restore();
        });

        describe('update of criteria based collection contents is successful', function() {
            [
                {
                    'type':'Branch',
                    'selectedCollection':{ id: '12345',  query:'anyQuery', parentId: 123, type:'NESTED'},
                    'endpoint':'/object-configuration/collections/v4/12345'
                },
                {
                    'type':'Leaf',
                    'selectedCollection':{ id: '12345',  query:'anyQuery', parentId: undefined, type:'STANDARD'},
                    'endpoint':'/object-configuration/collections/v4/12345'
                }
            ].forEach(function (testCase) {
                it('for '+testCase.type+' collection', function (done) {
                    this.timeout(TIMEOUT);
                    var responseObject = {
                        'id': '12345',
                        'name': 'dummycollection',
                        'query': 'anyQuery'
                    };
                    var queryResponse = {
                        'poList': ['1']
                    };
                    REST_object_configuration.respondForUpdateCollectionV4(_server, '12345', responseObject, 200);
                    REST_results.respondToQuery(_server, 'anyQuery', 200, queryResponse);
                    var callbacks = {
                        onReady: _sandbox.spy(),
                        onProgress: _sandbox.spy(),
                        onComplete: _sandbox.spy(),
                        onFail: _sandbox.spy()
                    };
                    var action = new UpdateCollectionContents();
                    action.start(callbacks, [testCase.selectedCollection], []);
                    promises.runTestSteps([
                        UISDKViewModel.getNotification,
                        function(label) {
                            expect(label.textContent).to.equal(strings.get('networkexplorer-update-collection-contents.collectionUpdated'));
                        },
                        function() {
                            expect(callbacks.onComplete.callCount).to.equal(1);
                            expect(callbacks.onFail.callCount).to.equal(0);
                        },
                        done
                    ]);
                });
            });
        });

        describe('update of criteria based collection contents is successful fallback', function() {
            [
                {
                    'type':'NESTED',
                    'selectedCollection':{ id: '12345',  query:'anyQuery', parentId: 123, type:'NESTED'},
                    'endpoint':'/object-configuration/custom-topology/v2/12345'
                },
                {
                    'type':'STANDARD',
                    'selectedCollection':{ id: '12345',  query:'anyQuery', parentId: undefined, type:'STANDARD'},
                    'endpoint':'/object-configuration/collections/v3/12345'
                }
            ].forEach(function (testCase) {
                it('for '+testCase.type+' collection', function (done) {
                    this.timeout(TIMEOUT);
                    var responseObject = {
                        'id': '12345',
                        'name': 'dummycollection',
                        'query': 'anyQuery'
                    };
                    var queryResponse = {
                        'poList': ['1']
                    };
                    REST_object_configuration.respondToUpdateNestedCollectionContents(_server, '12345', responseObject, 200);
                    REST_object_configuration.respondToUpdateCollectionContents(_server, '12345', responseObject, 200);
                    REST_results.respondToQuery(_server, 'anyQuery', 200, queryResponse);
                    var callbacks = {
                        onReady: _sandbox.spy(),
                        onProgress: _sandbox.spy(),
                        onComplete: _sandbox.spy(),
                        onFail: _sandbox.spy()
                    };
                    var action = new UpdateCollectionContents();
                    action.start(callbacks, [testCase.selectedCollection], []);
                    promises.runTestSteps([
                        UISDKViewModel.getNotification,
                        function(label) {
                            expect(label.textContent).to.equal(strings.get('networkexplorer-update-collection-contents.collectionUpdated'));
                        },
                        function() {
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

        it('successfully updates the empty content to standard collection', function(done) {
                var selectedCollection = { id: '12345',  query:'anyQuery', type:'STANDARD'};
                this.timeout(TIMEOUT);
                var responseObject = {
                    'id': '12345',
                    'name': 'dummycollection',
                    'query': 'anyQuery'
                };
                var queryResponse = {
                    'poList': []
                };
                REST_object_configuration.respondToUpdateCollectionContents(_server, '12345', responseObject, 200);
                REST_results.respondToQuery(_server, 'anyQuery', 200, queryResponse);
                var callbacks = {
                    onReady: _sandbox.spy(),
                    onProgress: _sandbox.spy(),
                    onComplete: _sandbox.spy(),
                    onFail: _sandbox.spy()
                };

                var action = new UpdateCollectionContents();
                action.start(callbacks, [selectedCollection], []);
                promises.runTestSteps([
                    UISDKViewModel.getDialogMessage,
                    function(message) {
                        expect(message.textContent).to.equal(strings.get('networkexplorer-update-collection-contents.noResultsMessage'));
                    },
                    UISDKViewModel.getAllDialogButtons,
                    function (buttons) {
                        expect(buttons.length).to.equal(2);
                        expect(buttons[0].textContent).to.equal('Update Contents');
                        expect(buttons[1].textContent).to.equal('Keep Contents');
                        promises.clickElement(buttons[0]);
                        UISDKViewModel.waitForDialogToDisappear();
                    },
                    UISDKViewModel.getNotification,
                    function(label) {
                        expect(label.textContent).to.equal(strings.get('networkexplorer-update-collection-contents.collectionUpdated'));
                    },
                    function() {
                        expect(callbacks.onComplete.callCount).to.equal(1);
                        expect(REST_object_configuration.getLastUrlRequested()).to.equal('/object-configuration/collections/v3/12345');
                        expect(REST_object_configuration.getLastMethodRequested()).to.equal('PUT');
                        return Promise.resolve();
                    },
                    done
                ]);
        });

        it('successfully keeps the content in standard collection when query returns empty list', function(done) {
                var selectedCollection = { id: '12345',  query:'anyQuery', type:'STANDARD'};
                this.timeout(TIMEOUT);
                var responseObject = {
                    'id': '12345',
                    'name': 'dummycollection',
                    'query': 'anyQuery'
                };
                var queryResponse = {
                    'poList': []
                };
                REST_object_configuration.respondToUpdateCollectionContents(_server, '12345', responseObject, 200);
                REST_results.respondToQuery(_server, 'anyQuery', 200, queryResponse);
                var callbacks = {
                    onReady: _sandbox.spy(),
                    onProgress: _sandbox.spy(),
                    onComplete: _sandbox.spy(),
                    onFail: _sandbox.spy()
                };
                var action = new UpdateCollectionContents();
                action.start(callbacks, [selectedCollection], []);
                promises.runTestSteps([
                    UISDKViewModel.getDialogMessage,
                    function(message) {
                        expect(message.textContent).to.equal(strings.get('networkexplorer-update-collection-contents.noResultsMessage'));
                    },
                    UISDKViewModel.getAllDialogButtons,
                    function (buttons) {
                        expect(buttons.length).to.equal(2);
                        expect(buttons[0].textContent).to.equal('Update Contents');
                        expect(buttons[1].textContent).to.equal('Keep Contents');
                        promises.clickElement(buttons[1]);
                        UISDKViewModel.waitForDialogToDisappear();
                    },
                    function() {
                        expect(callbacks.onComplete.callCount).to.equal(1);
                        expect(REST_results.getLastUrlRequested()).to.contain('/managedObjects/query?searchQuery=anyQuery');
                        return Promise.resolve();
                    },
                    done
                ]);
        });

        describe('Update collection based on search criteria fails', function() {
            [
                {
                    'description':'when update operation fails',
                    'errorMessage':strings.get('networkexplorer-update-collection-contents.internalServerErrorMessage'),
                    'queryResponse':{'poList': ['1']},
                    'selectedCollection': { id: '12345',  query:'anyQuery', parentId: 123, type:'NESTED'},
                    'status_mo':200,
                    'status_collections':400,
                    'assertions': function () {
                        expect(REST_object_configuration.getLastUrlRequested()).to.contain('/object-configuration/custom-topology/v2/12345');
                        expect(REST_object_configuration.getLastMethodRequested()).to.equal('PUT');
                    }
                },
                {
                    'description':'when update operation fails because user is not authorized',
                    'errorMessage':strings.get('networkexplorer-update-collection-contents.unauthorizedAccessErrorMessage'),
                    'queryResponse':{'poList': ['1']},
                    'selectedCollection': { id: '12345',  query:'anyQuery', parentId: 123, type:'NESTED'},
                    'status_mo':200,
                    'status_collections':403,
                    'assertions': function () {
                        expect(REST_object_configuration.getLastUrlRequested()).to.contain('/object-configuration/custom-topology/v2/12345');
                        expect(REST_object_configuration.getLastMethodRequested()).to.equal('PUT');
                    }
                },
                {
                    'description':'when managed object search fails',
                    'errorMessage':strings.get('networkexplorer-update-collection-contents.internalServerErrorMessage'),
                    'queryResponse':null,
                    'selectedCollection': { id: '12345',  query:'anyQuery', parentId: 123, type:'NESTED'},
                    'status_mo':400,
                    'status_collections':400,
                    'assertions': function () {
                        expect(REST_results.getLastUrlRequested()).to.contain('/managedObjects/query?searchQuery=anyQuery');
                    }
                },
                {
                    'description':'when managed object search fails because user is not authorized.',
                    'errorMessage':strings.get('networkexplorer-update-collection-contents.unauthorizedAccessErrorMessage'),
                    'queryResponse':null,
                    'selectedCollection': { id: '12345',  query:'anyQuery', parentId: 123, type:'NESTED'},
                    'status_mo':403,
                    'status_collections':400,
                    'assertions': function () {
                        expect(REST_results.getLastUrlRequested()).to.contain('/managedObjects/query?searchQuery=anyQuery');
                    }
                },
                {
                    'description':'when NESTED collection cannot have more than 2000 objects',
                    'errorMessage':strings.get('networkexplorer-update-collection-contents.collectionSizeExceeded'),
                    'queryResponse':{
                        'poList': new Array(2001)
                            .join().split(',')
                            .map(function(item, index){ return ++index;})},
                    'selectedCollection': { id: '12345',  query:'anyQuery', parentId: 123, type:'NESTED'},
                    'status_mo':200,
                    'status_collections':400,
                    'assertions': function () {
                        expect(REST_results.getLastUrlRequested()).to.contain('/managedObjects/query?searchQuery=anyQuery');
                    }
                },
                {
                    'description':'when STANDARD collection cannot have more than 25000 objects',
                    'errorMessage':strings.get('networkexplorer-update-collection-contents.collectionSizeExceeded'),
                    'queryResponse':{
                        'poList': new Array(25001)
                            .join().split(',')
                            .map(function(item, index){ return ++index;})},
                    'selectedCollection': { id: '12345',  query:'anyQuery', parentId: null, type:'STANDARD'},
                    'status_mo':200,
                    'status_collections':400,
                    'assertions': function () {
                        expect(REST_results.getLastUrlRequested()).to.contain('/managedObjects/query?searchQuery=anyQuery');
                    }
                }
            ].forEach(function (testCase) {
                it(testCase.description, function (done) {
                    this.timeout(TIMEOUT);
                    var responseObject = {
                        'id': '12345',
                        'name': 'dummycollection',
                        'query': 'anyQuery'
                    };
                    REST_results.respondToQuery(_server, 'anyQuery', testCase.status_mo, testCase.queryResponse);
                    REST_object_configuration.respondToUpdateNestedCollectionContents(_server, '12345', responseObject, testCase.status_collections);
                    var callbacks = {
                        onReady: _sandbox.spy(),
                        onProgress: _sandbox.spy(),
                        onComplete: _sandbox.spy(),
                        onFail: _sandbox.spy()
                    };
                    var action = new UpdateCollectionContents();
                    action.start(callbacks, [testCase.selectedCollection], []);
                    promises.runTestSteps([
                        UISDKViewModel.getDialogMessage,
                        function(message) {
                            expect(message.textContent).to.equal(testCase.errorMessage);
                        },
                        UISDKViewModel.getDialogOkButton,
                        function (button) {
                            expect(button.textContent).to.equal('OK');
                            promises.clickElement(button);
                            UISDKViewModel.waitForDialogToDisappear();
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
    });
});
