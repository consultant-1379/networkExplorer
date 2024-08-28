define([
    'test/bit/bitPromises',
    'jscore/core',
    'jscore/ext/locationController',
    'actionlibrary/ActionLibrary',
    'container/api',
    'networkexplorer/actions/AddTopologyData',
    'test/bit/viewmodels/ActionsViewModel',
    'test/bit/viewmodels/UISDKViewModel',
    'test/resources/restMock/REST_ui_settings',
    'test/resources/restMock/REST_uiaccesscontrol',
    'test/resources/restMock/REST_persistentobject',
    'test/resources/restMock/data/persistentObject/network/SimpleNetwork',
    'test/resources/restMock/REST_object_configuration',
    'test/resources/Grammar_scenario1',
    'test/resources/restMock/data/object-configuration/v1/collections/StandardCollectionsGenerator'
], function(promises, core, LocationController, ActionLibrary, Container, AddTopologyData, ActionsViewModel, UISDKViewModel,
    REST_ui_settings, REST_uiaccesscontrol, REST_persistentobject, SimpleNetwork, REST_object_configuration, Grammar_scenario1, StandardCollectionsGenerator) {

    var TIMEOUT = 60000;

    describe('AddTopologyData', function() {
        this.timeout(TIMEOUT);

        var actionContainer = document.getElementById('bitContainer'), currentApp, AppWithAddTopologyData, _server, _sandbox;

        var locationController;

        beforeEach(function(done) {
            // Setup fake server & sandbox
            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            _server = _sandbox.server;
            _server.autoRespond = true;
            _server.respondImmediately = true;
            Grammar_scenario1.applyScenario(_server);
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
            AppWithAddTopologyData = core.App.extend({
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

            // Create a location controller to set the url
            locationController = new LocationController();

            currentApp = new AppWithAddTopologyData();
            // start application.
            currentApp.start(actionContainer);
            done();
        });

        afterEach(function() {
            if (actionContainer.firstChild) {
                actionContainer.firstChild.remove();
            }
            currentApp = undefined;
            AppWithAddTopologyData = undefined;
            _sandbox.restore();
        });

        describe('When adding to a single Collection', function() {
            var selectedCollection = { id: '1' };
            [{
                description: 'select nothing',
                objectsToSelect: 0,
                assertions: function(label) {
                    expect(label.textContent).to.equal('Please make a selection and click the \'Add\' button.');
                    expect(actionContainer.hasChildNodes()).to.equal(true);
                    return Promise.resolve();
                }
            },{
                description: 'select one object',
                objectsToSelect: 1,
                assertions: function(label) {
                    expect(label.textContent).to.equal('Objects added (1)');
                    expect(actionContainer.hasChildNodes()).to.equal(false);
                    return Promise.resolve();
                }
            },{
                description: 'select two objects',
                objectsToSelect: 2,
                assertions: function(label) {
                    expect(label.textContent).to.equal('Objects added (2)');
                    expect(actionContainer.hasChildNodes()).to.equal(false);
                    return Promise.resolve();
                }
            }].forEach(function(test) {
                describe(test.description, function() {
                    describe('then add', function() {
                        it('successfully updates the collection (leaf collection, standard collection)', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, selectedCollection.id, {
                                id: '1',
                                objects: []
                            });
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id);
                            locationController.setLocation('networkexplorer/collections');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    return UISDKViewModel.getTopologyClickableItems();
                                },
                                function(items) {
                                    for (var i=0;i<test.objectsToSelect;i++) {
                                        promises.ctrlClickElement(items[i]);
                                    }
                                    return Promise.resolve();
                                },
                                ActionsViewModel.getAddButton,
                                promises.clickElement,
                                UISDKViewModel.getNotification,
                                test.assertions,
                                function() {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    return Promise.resolve();
                                },
                                done
                            ]);
                        });
                    });
                    describe('then cancel', function() {
                        it('dismisses the panel without any update attempted, no selections are sent', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            locationController.setLocation('networkexplorer/collections');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    return UISDKViewModel.getTopologyClickableItems();
                                },
                                function(items) {
                                    for (var i=0;i<test.objectsToSelect;i++) {
                                        promises.ctrlClickElement(items[i]);
                                    }
                                    return Promise.resolve();
                                },
                                ActionsViewModel.getCancelButton,
                                promises.clickElement,
                                function() {
                                    expect(actionContainer.hasChildNodes()).to.be.false;
                                    return Promise.resolve();
                                },
                                done
                            ]);
                        });
                    });
                });
            });
            [{
                description: 'if an unreachable server error occurs for get collection (network disconnected, apache timeout)',
                getCollectionResponse: {/* not used */},
                getCollectionResponseCode: 504,
                updateCollectionResponse: {/* not used */},
                updateCollectionResponseCode: -1,
                errorMessage: 'The server may be temporarily unavailable'
            },{
                description: 'if an unreachable server error occurs for update collection (network disconnected, apache timeout)',
                getCollectionResponse: {
                    id: '1',
                    objects: []
                },
                getCollectionResponseCode: 200,
                updateCollectionResponse: {/* not used */},
                updateCollectionResponseCode: -1,
                errorMessage: 'The server may be temporarily unavailable'
            },{
                description: 'if a specific server error occurs for get collection (deleted, null, branch collection, custom topology)',
                getCollectionResponse: {
                    userMessage: {
                        body: 'Collection not found'
                    }
                },
                getCollectionResponseCode: 404,
                updateCollectionResponse: {/* not used */},
                updateCollectionResponseCode: -1,
                errorMessage: 'Collection not found'
            },{
                description: 'if a specific server error occurs for update collection (deleted, null, branch collection, custom topology)',
                getCollectionResponse: {
                    id: '1',
                    objects: []
                },
                getCollectionResponseCode: 200,
                updateCollectionResponse: {
                    userMessage: {
                        body: 'Collection not found'
                    }
                },
                updateCollectionResponseCode: 404,
                errorMessage: 'Collection not found'
            }].forEach(function(test) {
                describe('select any number of objects', function() {
                    describe('then add', function() {
                        it(test.description + ', show an error dialog with message: ' + test.errorMessage, function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, selectedCollection.id, test.getCollectionResponse, test.getCollectionResponseCode);
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            locationController.setLocation('networkexplorer/collections');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    return UISDKViewModel.getTopologyClickableItems();
                                },
                                promises.clickElement, // just click one
                                ActionsViewModel.getAddButton,
                                promises.clickElement,
                                UISDKViewModel.getDialogTitle,
                                function(title) {
                                    expect(title.textContent).to.equal('Unable to Update Collection');
                                    return Promise.resolve();
                                },
                                UISDKViewModel.getDialogMessage,
                                function(body) {
                                    expect(body.textContent).to.equal('The Collection could not be updated for the following reason: ');
                                    return Promise.resolve();
                                },
                                UISDKViewModel.getDialogSubMessage,
                                function(body) {
                                    expect(body.textContent).to.equal(test.errorMessage);
                                    return Promise.resolve();
                                },
                                done
                            ]);
                        });
                    });
                });
            });
            [
                {
                    description: 'if a duplicate Node is detected a specific server error occurs for update collection',
                    getCollectionResponse: {
                        id: '1',
                        objects: []
                    },
                    getCollectionResponseCode: 200,
                    updateCollectionResponse: {
                        userMessage: {
                            title: 'Unknown Exception',
                            body: 'Duplicate nodes were found 1/-1 in {"coll_A":["NODE01"]} poIds [12345]'
                        },
                        internalErrorCode: 10906
                    },
                    updateCollectionResponseCode: 500,
                    errorMessage: 'Conflicting Nodes'
                }
            ].forEach(function(test) {
                describe('select one object', function() {
                    describe('then add', function() {
                        it(test.description + ', show an error dialog with message: ' + test.errorMessage, function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, selectedCollection.id, test.getCollectionResponse, test.getCollectionResponseCode);
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            locationController.setLocation('networkexplorer/collections');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    return UISDKViewModel.getTopologyClickableItems();
                                },
                                promises.clickElement,
                                ActionsViewModel.getAddButton,
                                promises.clickElement,
                                UISDKViewModel.getDialogTitle,
                                function(title) {
                                    expect(title.textContent).to.equal('Conflicting Nodes');
                                    return Promise.resolve();
                                },
                                UISDKViewModel.getAllDialogButtons,
                                function(buttons) {
                                    expect(buttons.length).to.equal(2);
                                    expect(buttons[0].textContent).to.equal('Continue');
                                    expect(buttons[1].textContent).to.equal('Cancel');
                                    promises.clickElement(buttons[0]);
                                    UISDKViewModel.waitForDialogToDisappear();
                                },
                                done
                            ]);
                        });
                    });
                });
            });

            [
                {
                    description: 'if a duplicate Node is detected a specific server error occurs for update collection',
                    getCollectionResponse: {
                        id: '1',
                        objects: []
                    },
                    getCollectionResponseCode: 200,
                    updateCollectionResponse: {
                        userMessage: {
                            title: 'Unknown Exception',
                            body: 'Duplicate nodes were found 2/-2 in {"coll_A":["NODE01","NODE02"]} poIds [12345,56789]'
                        },
                        internalErrorCode: 10906
                    },
                    updateCollectionResponseCode: 500
                }
            ].forEach(function(test) {
                describe('select two objects', function() {
                    describe('then add', function() {
                        it(test.description + ', show the conflicting dialog box and select View Conflicting Nodes. ', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, selectedCollection.id, test.getCollectionResponse, test.getCollectionResponseCode);
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            locationController.setLocation('networkexplorer/collections');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    return UISDKViewModel.getTopologyClickableItems();
                                },
                                promises.clickElement,
                                ActionsViewModel.getAddButton,
                                promises.clickElement,
                                UISDKViewModel.getDialogTitle,
                                function(title) {
                                    expect(title.textContent).to.equal('Conflicting Nodes');
                                    return Promise.resolve();
                                },
                                UISDKViewModel.getViewConflictingNodesButton,
                                function(buttons) {
                                    expect(buttons[0].textContent).to.equal('View conflicting nodes');
                                    promises.clickElement(buttons[0]);
                                },
                                UISDKViewModel.getAllDialogButtons,
                                function(buttons) {
                                    expect(buttons.length).to.equal(4);
                                    expect(buttons[2].textContent).to.equal('Close');
                                    expect(buttons[3].textContent).to.equal('Export');
                                    promises.clickElement(buttons[2]);
                                    UISDKViewModel.waitForDialogToDisappear();
                                },
                                done
                            ]);
                        });
                    });
                });
            });

            [
                {
                    description: 'if a duplicate Node is detected a specific server error occurs for update collection',
                    getCollectionResponse: {
                        id: '1',
                        objects: []
                    },
                    getCollectionResponseCode: 200,
                    updateCollectionResponse: {
                        userMessage: {
                            title: 'Unknown Exception',
                            body: 'Duplicate nodes were found 2/-2 in {"coll_A":["NODE01","NODE02"]} poIds [12345,56789]'
                        },
                        internalErrorCode: 10906
                    },
                    updateCollectionResponseCode: 500
                }
            ].forEach(function(test) {
                describe('select two objects', function() {
                    describe('then add', function() {
                        it(test.description + ', show the conflicting dialog box and select View Conflicting Nodes and filter the nodes. ', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, selectedCollection.id, test.getCollectionResponse, test.getCollectionResponseCode);
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            locationController.setLocation('networkexplorer/collections');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    return UISDKViewModel.getTopologyClickableItems();
                                },
                                promises.clickElement,
                                ActionsViewModel.getAddButton,
                                promises.clickElement,
                                UISDKViewModel.getDialogTitle,
                                function(title) {
                                    expect(title.textContent).to.equal('Conflicting Nodes');
                                    return Promise.resolve();
                                },
                                UISDKViewModel.getViewConflictingNodesButton,
                                function(buttons) {
                                    expect(buttons[0].textContent).to.equal('View conflicting nodes');
                                    promises.clickElement(buttons[0]);
                                },
                                UISDKViewModel.getAllDialogButtons,
                                function(buttons) {
                                    expect(buttons.length).to.equal(4);
                                    expect(buttons[2].textContent).to.equal('Close');
                                    expect(buttons[3].textContent).to.equal('Export');
                                },
                                UISDKViewModel.getNodeFilterInput,
                                function(input) {
                                    expect(input.value).to.equal('');
                                    return promises.enterInputFieldValue(input, 'NODE01');
                                },
                                UISDKViewModel.getCollectionFilterInput,
                                function(input) {
                                    expect(input.value).to.equal('');
                                    return promises.enterInputFieldValue(input, 'coll_A');
                                },
                                UISDKViewModel.getTableCells,
                                function(cell) {
                                    console.log(cell[1].textContent);
                                    expect(cell[0].textContent).to.equal('NODE01');
                                    expect(cell[1].textContent).to.equal('coll_A');
                                },
                                UISDKViewModel.getAllDialogButtons,
                                function(buttons) {
                                    expect(buttons.length).to.equal(4);
                                    expect(buttons[2].textContent).to.equal('Close');
                                    expect(buttons[3].textContent).to.equal('Export');
                                    promises.clickElement(buttons[3]);
                                    promises.clickElement(buttons[2]);
                                },
                                done
                            ]);
                        });
                    });
                });
            });

            [
                {
                    description: 'if child objects are detected a specific server error occurs for update collection',
                    getCollectionResponse: {
                        id: ['1','2'],
                        objects: []
                    },
                    getCollectionResponseCode: 200,
                    updateCollectionResponse: {
                        userMessage: {
                            title: 'Unknown Exception',
                            body: "Only 0 Managed Object(s) representing Network Elements can be added to the selected Transport collection, ID's to be sent[]"
                        },
                        internalErrorCode: 10907
                    },
                    updateCollectionResponseCode: 500,
                    errorMessage: 'Unable to add all selected Managed Objects'
                }
            ].forEach(function(test) {
                describe('select child objects', function() {
                    describe('then add', function() {
                        it(test.description + ', show an error dialog with message: ' + test.errorMessage, function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, selectedCollection.id, test.getCollectionResponse, test.getCollectionResponseCode);
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            locationController.setLocation('networkexplorer/collections');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    return UISDKViewModel.getTopologyClickableItems();
                                },
                                promises.clickElement,
                                ActionsViewModel.getAddButton,
                                promises.clickElement,
                                UISDKViewModel.getDialogTitle,
                                function(title) {
                                    expect(title.textContent).to.equal('Unable to add all selected Managed Objects');
                                    return Promise.resolve();
                                },
                                UISDKViewModel.getAllDialogButtons,
                                function(buttons) {
                                    expect(buttons.length).to.equal(1);
                                    expect(buttons[0].textContent).to.equal('Cancel');
                                    promises.clickElement(buttons[0]);
                                    UISDKViewModel.waitForDialogToDisappear();
                                },
                                done
                            ]);
                        });
                    });
                });
            });
            [
                {
                    description: 'if child objects and a valid node object are detected a specific server error occurs for update collection',
                    getCollectionResponse: {
                        id: ['1','2'],
                        objects: []
                    },
                    getCollectionResponseCode: 200,
                    updateCollectionResponse: {
                        userMessage: {
                            title: 'Unknown Exception',
                            body: "Only 2 Managed Object(s) representing Network Elements can be added to the selected Transport collection, ID's to be sent[123,100000]"
                        },
                        internalErrorCode: 10907
                    },
                    updateCollectionResponseCode: 500,
                    errorMessage: 'Unable to add all selected Managed Objects'
                }
            ].forEach(function(test) {
                describe('select child objects and a valid node object then click on continue', function() {
                    describe('then add', function() {
                        it(test.description + ', show an error dialog with continue option with message: ' + test.errorMessage, function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, selectedCollection.id, test.getCollectionResponse, test.getCollectionResponseCode);
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            locationController.setLocation('networkexplorer/collections');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    return UISDKViewModel.getTopologyClickableItems();
                                },
                                promises.clickElement,
                                ActionsViewModel.getAddButton,
                                promises.clickElement,
                                UISDKViewModel.getDialogTitle,
                                function(title) {
                                    expect(title.textContent).to.equal('Unable to add all selected Managed Objects');
                                    return Promise.resolve();
                                },
                                UISDKViewModel.getAllDialogButtons,
                                function(buttons) {
                                    expect(buttons.length).to.equal(2);
                                    expect(buttons[0].textContent).to.equal('Continue');
                                    expect(buttons[1].textContent).to.equal('Cancel');
                                    promises.clickElement(buttons[0]);
                                    UISDKViewModel.waitForDialogToDisappear();
                                },
                                done
                            ]);
                        });
                    });
                });
            });
            [
                {
                    description: 'if child objects and a valid node object are detected a specific server error occurs for update collection',
                    getCollectionResponse: {
                        id: ['1','2'],
                        objects: []
                    },
                    getCollectionResponseCode: 200,
                    updateCollectionResponse: {
                        userMessage: {
                            title: 'Unknown Exception',
                            body: "Only 2 Managed Object(s) representing Network Elements can be added to the selected Transport collection, ID's to be sent[123,100000]"
                        },
                        internalErrorCode: 10907
                    },
                    updateCollectionResponseCode: 500,
                    errorMessage: 'Unable to add all selected Managed Objects'
                }
            ].forEach(function(test) {
                describe('select child objects and a valid node object then click on cancel', function() {
                    describe('then add', function() {
                        it(test.description + ', show an error dialog with continue option with message: ' + test.errorMessage, function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, selectedCollection.id, test.getCollectionResponse, test.getCollectionResponseCode);
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            locationController.setLocation('networkexplorer/collections');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    return UISDKViewModel.getTopologyClickableItems();
                                },
                                promises.clickElement,
                                ActionsViewModel.getAddButton,
                                promises.clickElement,
                                UISDKViewModel.getDialogTitle,
                                function(title) {
                                    expect(title.textContent).to.equal('Unable to add all selected Managed Objects');
                                    return Promise.resolve();
                                },
                                UISDKViewModel.getAllDialogButtons,
                                function(buttons) {
                                    expect(buttons.length).to.equal(2);
                                    expect(buttons[0].textContent).to.equal('Continue');
                                    expect(buttons[1].textContent).to.equal('Cancel');
                                    promises.clickElement(buttons[1]);
                                    UISDKViewModel.waitForDialogToDisappear();
                                },
                                done
                            ]);
                        });
                    });
                });
            });

            [
                {
                    description: 'if child objects and a valid node object are added from collection tab',
                    objectsToSelect: 1,
                    getCollectionResponse: {
                        id: ['1','2'],
                        objects: []
                    },
                    getCollectionResponseCode: 200,
                    updateCollectionResponse: {
                        userMessage: {
                            title: 'Unknown Exception',
                            body: "Only 2 Managed Object(s) representing Network Elements can be added to the selected Transport collection, ID's to be sent[123,100000]"
                        },
                        internalErrorCode: 10907
                    },
                    updateCollectionResponseCode: 500,
                    errorMessage: 'Unable to add all selected Managed Objects'
                }
            ].forEach(function(test) {
                describe(test.description, function() {
                    describe('then add from collection tab', function() {
                        it('display dialog and click on continue', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_object_configuration.respondToCollectionListV1(_server, StandardCollectionsGenerator.with({numberOfCollection: test.objectsToSelect}), 200);
                            REST_object_configuration.respondToAddCollections(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            locationController.setLocation('topologybrowser');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTableRows,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    expect(tabs[2].textContent).to.equal('Collections');
                                    promises.clickElement(tabs[2]);
                                    return UISDKViewModel.getTableHeaderCheckboxes();
                                },
                                function(items) {
                                    if (test.objectsToSelect > 0) {
                                        return promises.ctrlClickElement(items[0]);
                                    } else {
                                        return Promise.resolve();
                                    }
                                },
                                ActionsViewModel.getAddButton,
                                promises.clickElement,
                                UISDKViewModel.getDialogTitle,
                                function(title) {
                                    expect(title.textContent).to.equal('Unable to add all selected Managed Objects');
                                    return Promise.resolve();
                                },
                                UISDKViewModel.getAllDialogButtons,
                                function(buttons) {
                                    expect(buttons.length).to.equal(2);
                                    expect(buttons[0].textContent).to.equal('Continue');
                                    expect(buttons[1].textContent).to.equal('Cancel');
                                    promises.clickElement(buttons[0]);
                                    UISDKViewModel.waitForDialogToDisappear();
                                },
                                done
                            ]);
                        });
                    });
                });
            });
        });

        describe('When adding to a single Collection', function() {
            var selectedCollection = { id: '1' };
            [{
                description: 'select nothing',
                objectsToSelect: 0,
                assertions: function(label) {
                    expect(label.textContent).to.equal('Please make a selection and click the \'Add\' button.');
                    expect(actionContainer.hasChildNodes()).to.equal(true);
                    return Promise.resolve();
                }
            },{
                description: 'select one collection',
                objectsToSelect: 1,
                assertions: function(label) {
                    expect(label.textContent).to.equal('Collections added (1)');
                    expect(actionContainer.hasChildNodes()).to.equal(false);
                    return Promise.resolve();
                }
            },{
                description: 'select 250 collections',
                objectsToSelect: 250,
                assertions: function(label) {
                    expect(label.textContent).to.equal('Collections added (250)');
                    expect(actionContainer.hasChildNodes()).to.equal(false);
                    return Promise.resolve();
                }
            }].forEach(function(test) {
                describe(test.description, function() {
                    describe('then add', function() {
                        it('successfully updates the collection', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_object_configuration.respondToCollectionListV1(_server, StandardCollectionsGenerator.with({numberOfCollection: test.objectsToSelect}), 200);
                            REST_object_configuration.respondToAddCollections(_server, selectedCollection.id);
                            locationController.setLocation('topologybrowser');
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddTopologyData();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTableRows,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    expect(tabs[2].textContent).to.equal('Collections');
                                    promises.clickElement(tabs[2]);
                                    return UISDKViewModel.getTableHeaderCheckboxes();
                                },
                                function(items) {
                                    if (test.objectsToSelect > 0) {
                                        return promises.ctrlClickElement(items[0]);
                                    } else {
                                        return Promise.resolve();
                                    }
                                },
                                ActionsViewModel.getAddButton,
                                promises.clickElement,
                                UISDKViewModel.getNotification,
                                test.assertions,
                                function() {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    return Promise.resolve();
                                },
                                done
                            ]);
                        });
                    });
                });
            });
        });

        describe('When adding to a single Collection, selecting more than 250 collections', function() {
            var selectedCollection = { id: '1' };
            describe('then add', function() {
                it('an error dialog with message: Max number of collections (250) has been exceeded', function(done) {
                    this.timeout(TIMEOUT);
                    REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                    REST_uiaccesscontrol.respondToResourceRequest(_server);
                    REST_uiaccesscontrol.respondToProfile(_server, 'user');
                    REST_object_configuration.respondToCollectionListV1(_server, StandardCollectionsGenerator.with({numberOfCollection: 260}), 200);
                    REST_object_configuration.respondToAddCollections(_server, selectedCollection.id);
                    locationController.setLocation('topologybrowser');
                    var callbacks = {
                        onReady: _sandbox.spy(),
                        onProgress: _sandbox.spy(),
                        onComplete: _sandbox.spy(),
                        onFail: _sandbox.spy()
                    };
                    var action = new AddTopologyData();
                    action.start(callbacks, [selectedCollection], []);
                    promises.runTestSteps([
                        UISDKViewModel.getTableRows,
                        UISDKViewModel.getTabs,
                        function(tabs) {
                            expect(tabs[0].textContent).to.equal('Topology');
                            expect(tabs[1].textContent).to.equal('Search');
                            expect(tabs[2].textContent).to.equal('Collections');
                            promises.clickElement(tabs[2]);
                            return UISDKViewModel.getTableHeaderCheckboxes();
                        },
                        promises.ctrlClickElement,
                        ActionsViewModel.getAddButton,
                        promises.clickElement,
                        UISDKViewModel.getDialogTitle,
                        function(title) {
                            expect(title.textContent).to.equal('Unable to Add Collections');
                            return Promise.resolve();
                        },
                        UISDKViewModel.getDialogMessage,
                        function(body) {
                            expect(body.textContent).to.equal('Max number of collections (250) has been exceeded. Only (250) collections can be added to a Topology at any one point. Try splitting up your selection and then add.');
                            return Promise.resolve();
                        },
                        done
                    ]);
                });
            });
        });

        describe('afterUseCase promise is', function() {
            beforeEach(function(done) {
                this.timeout(TIMEOUT);
                REST_uiaccesscontrol.respondToResourceRequest(_server);
                REST_uiaccesscontrol.respondToProfile(_server, 'user');
                REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, '1234', {
                    id: '1',
                    objects: []
                });
                done();
            });
            it('resolved when use case is successful', function(done) {
                REST_object_configuration.respondToUpdateCollection(_server, '1234');
                locationController.setLocation('networkexplorer/collections');
                var callbacks = {
                    onComplete: function(result) {
                        // ASSERT
                        expect(result.success).to.equal(true);
                        result.afterUseCase.then(function() {
                            done();
                        });
                        result.afterUseCase.catch(function() {
                            done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                        });
                    }
                };
                var action = new AddTopologyData();
                action.start(callbacks, [{id: '1234'}], []);
                promises.runTestSteps([
                    UISDKViewModel.getTopologyItems,
                    UISDKViewModel.getTabs,
                    function(tabs) {
                        expect(tabs[0].textContent).to.equal('Topology');
                        expect(tabs[1].textContent).to.equal('Search');
                        return UISDKViewModel.getTopologyClickableItems();
                    },
                    function(items) {
                        return promises.ctrlClickElement(items[0]);
                    },
                    ActionsViewModel.getAddButton,
                    promises.clickElement
                ]);
            });
            it('rejected when the update collection use case fails', function(done) {
                REST_object_configuration.respondToUpdateCollection(_server, '1234', {}, 400);
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
                var action = new AddTopologyData();
                action.start(callbacks, [{id: '1234'}], []);
                promises.runTestSteps([
                    UISDKViewModel.getTopologyItems,
                    UISDKViewModel.getTabs,
                    function(tabs) {
                        expect(tabs[0].textContent).to.equal('Topology');
                        return UISDKViewModel.getTopologyClickableItems();
                    },
                    function(items) {
                        return promises.ctrlClickElement(items[0]);
                    },
                    ActionsViewModel.getAddButton,
                    promises.clickElement
                ]);
            });
            it('rejected when the add collections use case fails', function(done) {
                REST_object_configuration.respondToAddCollections(_server, '1234', {}, 400);
                REST_object_configuration.respondToAddCollections(_server, 1);
                REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                REST_object_configuration.respondToCollectionListV1(_server, StandardCollectionsGenerator.with({numberOfCollection: 6}), 200);
                locationController.setLocation('topologybrowser');
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
                var action = new AddTopologyData();
                action.start(callbacks, [{id: '1234'}], []);
                promises.runTestSteps([
                    UISDKViewModel.getTableRows,
                    UISDKViewModel.getTabs,
                    function(tabs) {
                        expect(tabs[0].textContent).to.equal('Topology');
                        expect(tabs[1].textContent).to.equal('Search');
                        expect(tabs[2].textContent).to.equal('Collections');
                        promises.clickElement(tabs[2]);
                        return UISDKViewModel.getTableBodyCheckboxes();
                    },
                    promises.ctrlClickElement,
                    ActionsViewModel.getAddButton,
                    promises.clickElement
                ]);
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
                var action = new AddTopologyData();
                action.start(callbacks, [{id: '1234'}], []);
                promises.runTestSteps([
                    ActionsViewModel.getCancelButton,
                    promises.clickElement
                ]);
            });
        });
    });
});
