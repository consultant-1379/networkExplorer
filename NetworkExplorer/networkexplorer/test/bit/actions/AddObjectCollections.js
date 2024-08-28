define([
    'test/bit/bitPromises',
    'jscore/core',
    'actionlibrary/ActionLibrary',
    'container/api',
    'networkexplorer/actions/AddObjectCollections',
    'test/bit/viewmodels/ActionsViewModel',
    'test/bit/viewmodels/UISDKViewModel',
    'test/resources/restMock/REST_ui_settings',
    'test/resources/restMock/REST_uiaccesscontrol',
    'test/resources/restMock/REST_object_configuration',
    'test/resources/restMock/data/object-configuration/v1/collections/StandardCollectionsGenerator',
    'test/resources/Grammar_scenario1',
    'test/resources/restMock/REST_persistentobject',
    'test/resources/restMock/data/persistentObject/network/SimpleNetwork'
], function(promises, core, ActionLibrary, Container, AddObjectCollections, ActionsViewModel, UISDKViewModel,
    REST_ui_settings, REST_uiaccesscontrol, REST_object_configuration,StandardCollectionsGenerator, Grammar_scenario1, REST_persistentobject, SimpleNetwork) {

    var TIMEOUT = 60000;

    describe('AddObjectCollections', function() {
        this.timeout(TIMEOUT);

        var actionContainer = document.getElementById('bitContainer'), currentApp, AppWithAddObjectCollections, _server, _sandbox;

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
            AppWithAddObjectCollections = core.App.extend({
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
            currentApp = new AppWithAddObjectCollections();
            // start application.
            currentApp.start(actionContainer);
            done();
        });

        afterEach(function() {
            if (actionContainer.firstChild) {
                actionContainer.firstChild.remove();
            }
            currentApp = undefined;
            AppWithAddObjectCollections = undefined;
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
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddObjectCollections();
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
                    describe('then cancel', function() {
                        it('dismisses the panel without any update attempted, no selections are sent', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_object_configuration.respondToCollectionListV1(_server, StandardCollectionsGenerator.with({numberOfCollection: 260}), 200);
                            REST_object_configuration.respondToAddCollections(_server, selectedCollection.id);
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddObjectCollections();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTableRows,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(callbacks.onComplete.callCount).to.equal(1);
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    expect(tabs[2].textContent).to.equal('Collections');
                                    promises.clickElement(tabs[2]);
                                    return UISDKViewModel.getTableHeaderCheckboxes();
                                },
                                promises.ctrlClickElement,
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
                        var callbacks = {
                            onReady: _sandbox.spy(),
                            onProgress: _sandbox.spy(),
                            onComplete: _sandbox.spy(),
                            onFail: _sandbox.spy()
                        };
                        var action = new AddObjectCollections();
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
                describe('then cancel', function() {
                    it('dismisses the panel without any update attempted, no selections are sent', function(done) {
                        this.timeout(TIMEOUT);
                        REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                        REST_uiaccesscontrol.respondToResourceRequest(_server);
                        REST_uiaccesscontrol.respondToProfile(_server, 'user');
                        REST_object_configuration.respondToCollectionListV1(_server, StandardCollectionsGenerator.with({numberOfCollection: 260}), 200);
                        REST_object_configuration.respondToAddCollections(_server, selectedCollection.id);
                        var callbacks = {
                            onReady: _sandbox.spy(),
                            onProgress: _sandbox.spy(),
                            onComplete: _sandbox.spy(),
                            onFail: _sandbox.spy()
                        };
                        var action = new AddObjectCollections();
                        action.start(callbacks, [selectedCollection], []);
                        promises.runTestSteps([
                            UISDKViewModel.getTableRows,
                            UISDKViewModel.getTabs,
                            function(tabs) {
                                expect(callbacks.onComplete.callCount).to.equal(1);
                                expect(tabs[0].textContent).to.equal('Topology');
                                expect(tabs[1].textContent).to.equal('Search');
                                expect(tabs[2].textContent).to.equal('Collections');
                                promises.clickElement(tabs[2]);
                                return UISDKViewModel.getTableHeaderCheckboxes();
                            },
                            promises.ctrlClickElement,
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

            [{
                description: 'Adding an object to a branch collection',
                objectsToSelect: 1,
                assertions: function(label) {
                    expect(label.textContent).to.equal('Objects added (1)');
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
                            REST_object_configuration.respondToGetCollectionWithoutSortIncludingContentsV4(
                                _server,
                                selectedCollection.id,
                                {id: '1', contents: []},
                                200
                            );
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 3}));
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id);
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddObjectCollections();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    expect(tabs[2].textContent).to.equal('Collections');
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
                });
            });

            [{
                description: 'Adding a duplicate object to a branch collection',
                objectsToSelect: 1,
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
                errorMessage: 'Conflicting Nodes',
                assertions: function(label) {
                    expect(label.textContent).to.equal('Objects added (1)');
                    expect(actionContainer.hasChildNodes()).to.equal(false);
                    return Promise.resolve();
                }
            }].forEach(function(test) {
                describe(test.description, function() {
                    describe('then add', function() {
                        it('shows the conflicting nodes dialog box', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortIncludingContentsV4(
                                _server,
                                selectedCollection.id,
                                test.getCollectionResponse,
                                test.getCollectionResponseCode
                            );
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddObjectCollections();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    expect(tabs[2].textContent).to.equal('Collections');
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
                                UISDKViewModel.getDialogTitle,
                                function(title) {
                                    expect(title.textContent).to.equal('Conflicting Nodes');
                                    console.log('GETTING TITLE TEXT');
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


            [{
                description: 'Adding a Restricted child object to a branch collection',
                objectsToSelect: 1,
                getCollectionResponse: {
                    id: '1',
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
                errorMessage: 'Unable to add all selected Managed Objects',
                assertions: function(label) {
                    expect(label.textContent).to.equal('Objects added (1)');
                    expect(actionContainer.hasChildNodes()).to.equal(false);
                    return Promise.resolve();
                }
            }].forEach(function(test) {
                describe(test.description, function() {
                    describe('then add', function() {
                        it('shows the restricted child object dialog box', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortIncludingContentsV4(
                                _server,
                                selectedCollection.id,
                                test.getCollectionResponse,
                                test.getCollectionResponseCode
                            );
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddObjectCollections();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    expect(tabs[2].textContent).to.equal('Collections');
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

            [{
                description: 'Adding a Restricted child object and a valid Node object to a branch collection',
                objectsToSelect: 1,
                getCollectionResponse: {
                    id: '1',
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
                errorMessage: 'Unable to add all selected Managed Objects',
                assertions: function(label) {
                    expect(label.textContent).to.equal('Objects added (1)');
                    expect(actionContainer.hasChildNodes()).to.equal(false);
                    return Promise.resolve();
                }
            }].forEach(function(test) {
                describe(test.description, function() {
                    describe('then add', function() {
                        it('shows the restricted child object dialog box with continue option', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortIncludingContentsV4(
                                _server,
                                selectedCollection.id,
                                test.getCollectionResponse,
                                test.getCollectionResponseCode
                            );
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddObjectCollections();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    expect(tabs[2].textContent).to.equal('Collections');
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

            [{
                description: 'Adding a Restricted child object and and clicking cancel to a branch collection',
                objectsToSelect: 1,
                getCollectionResponse: {
                    id: '1',
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
                errorMessage: 'Unable to add all selected Managed Objects',
                assertions: function(label) {
                    expect(label.textContent).to.equal('Objects added (1)');
                    expect(actionContainer.hasChildNodes()).to.equal(false);
                    return Promise.resolve();
                }
            }].forEach(function(test) {
                describe(test.description, function() {
                    describe('then add', function() {
                        it('shows the restricted child object dialog box with continue option', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_persistentobject.respondToSubNetRequest(_server, SimpleNetwork.with({size: 2}));
                            REST_persistentobject.respondToOtherNodesRequest(_server,SimpleNetwork.with({size: 2,depth: 2}));
                            REST_object_configuration.respondToGetCollectionWithoutSortIncludingContentsV4(
                                _server,
                                selectedCollection.id,
                                test.getCollectionResponse,
                                test.getCollectionResponseCode
                            );
                            REST_object_configuration.respondToUpdateCollection(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddObjectCollections();
                            action.start(callbacks, [selectedCollection], []);
                            promises.runTestSteps([
                                UISDKViewModel.getTopologyItems,
                                UISDKViewModel.getTabs,
                                function(tabs) {
                                    expect(tabs[0].textContent).to.equal('Topology');
                                    expect(tabs[1].textContent).to.equal('Search');
                                    expect(tabs[2].textContent).to.equal('Collections');
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

            [{
                description: 'Adding a Restricted child object to a branch collection using collection tab',
                objectsToSelect: 1,
                getCollectionResponse: {
                    id: '1',
                    objects: []
                },
                getCollectionResponseCode: 200,
                updateCollectionResponse: {
                    userMessage: {
                        title: 'Unknown Exception',
                        body: "Only 2 Managed Object(s) representing Network Elements can be added to the selected Transport collection, ID's to be sent[123,1234]"
                    },
                    internalErrorCode: 10907
                },
                updateCollectionResponseCode: 500,
                errorMessage: 'Unable to add all selected Managed Objects',
                assertions: function(label) {
                    expect(label.textContent).to.equal('Objects added (1)');
                    expect(actionContainer.hasChildNodes()).to.equal(false);
                    return Promise.resolve();
                }
            }].forEach(function(test) {
                describe(test.description, function() {
                    describe('then add', function() {
                        it('display restrict child object dialog from collection tab', function(done) {
                            this.timeout(TIMEOUT);
                            REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                            REST_uiaccesscontrol.respondToResourceRequest(_server);
                            REST_uiaccesscontrol.respondToProfile(_server, 'user');
                            REST_object_configuration.respondToCollectionListV1(_server, StandardCollectionsGenerator.with({numberOfCollection: test.objectsToSelect}), 200);
                            REST_object_configuration.respondToAddCollections(_server, selectedCollection.id, test.updateCollectionResponse, test.updateCollectionResponseCode);
                            var callbacks = {
                                onReady: _sandbox.spy(),
                                onProgress: _sandbox.spy(),
                                onComplete: _sandbox.spy(),
                                onFail: _sandbox.spy()
                            };
                            var action = new AddObjectCollections();
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

            describe('afterUseCase promise is', function() {
                beforeEach(function(done) {
                    this.timeout(TIMEOUT);
                    REST_uiaccesscontrol.respondToResourceRequest(_server);
                    REST_uiaccesscontrol.respondToProfile(_server, 'user');
                    REST_object_configuration.respondToAddCollections(_server, selectedCollection.id);
                    REST_ui_settings.respondToNetworkExplorerFavorites(_server);
                    REST_object_configuration.respondToCollectionListV1(_server, StandardCollectionsGenerator.with({numberOfCollection: 6}), 200);
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
                    var action = new AddObjectCollections();
                    action.start(callbacks, [{id: '1234'}], []);
                    promises.runTestSteps([
                        ActionsViewModel.getCancelButton,
                        promises.clickElement
                    ]);
                });
                it('resolved when use case is successful', function(done) {
                    REST_object_configuration.respondToAddCollections(_server, '1234');
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
                    var action = new AddObjectCollections();
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
                it('rejected when use case fails', function(done) {
                    REST_object_configuration.respondToAddCollections(_server, '1234', {}, 400);
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
                    var action = new AddObjectCollections();
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
            });
        });
    });
});
