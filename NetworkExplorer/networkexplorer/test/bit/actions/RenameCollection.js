define([
    'test/bit/bitPromises',
    'jscore/core',
    'container/api',
    'src/networkexplorer/actions/RenameCollection',
    'test/resources/restMock/REST_object_configuration',
    'test/bit/viewmodels/UISDKViewModel',
    'test/bit/viewmodels/NetworkExplorerViewModel'
], function(promises, core, Container, RenameCollection, REST_object_configuration, UISDKViewModel, NetworkExplorerViewModel) {

    'use strict';

    describe('RenameCollection', function() {

        var actionContainer = document.getElementById('bitContainer'), currentApp, AppWithRenameCollection, _sandbox, _server;

        beforeEach(function(done) {
            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            _server = _sandbox.server;
            _server = sinon.fakeServer.create();
            _server.autoRespond = true;
            _server.respondImmediately = true;

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
            AppWithRenameCollection = core.App.extend({
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
            currentApp = new AppWithRenameCollection();
            // start application.
            currentApp.start(actionContainer);
            done();
        });

        afterEach(function() {
            _sandbox.restore();
            _server.restore();
        });

        describe('when action use case is successful for collection type', function() {
            [
                {
                    description: 'standard (no type)',
                    type: undefined,
                    subType: undefined,
                    id: '1234'
                },
                {
                    description: 'LEAF',
                    type: 'NESTED',
                    subType: 'LEAF',
                    id: '1234',
                    level: 1,
                    parentId: '654'
                },
                {
                    description: 'LEAF with no level but has parentId',
                    type: 'NESTED',
                    subType: 'LEAF',
                    id: '1234',
                    parentId: '654'
                },
                {
                    description: 'LEAF with level but has no parentId',
                    type: 'NESTED',
                    subType: 'LEAF',
                    id: '1234',
                    parentId: '654'
                },
                {
                    description: 'BRANCH and has no children',
                    type: 'NESTED',
                    subType: 'BRANCH',
                    id: '1234',
                    level: 1,
                    parentId: '987'
                },
                {
                    description: 'BRANCH with no level but has parentId',
                    type: 'NESTED',
                    subType: 'BRANCH',
                    id: '1234',
                    parentId: '987'
                },
                {
                    description: 'BRANCH with level but no parentId',
                    type: 'NESTED',
                    subType: 'BRANCH',
                    id: '1234',
                    parentId: '987'
                }
            ].forEach(function(test) {
                it(test.description + ' the result is successful and afterUseCase promise is resolved', function(done) {

                    REST_object_configuration.respondToUpdateCollection(_server, '1234', {});
                    REST_object_configuration.respondToRenameCustomTopology(_server, '1234', {});

                    var selectedObjects = [{
                        id: test.id,
                        name: 'collection-name-' + test.id,
                        type: test.type,
                        subType: test.subType,
                        level: test.level,
                        parentId: test.parentId
                    }];

                    new RenameCollection().run({
                        onReady: function() {},
                        onProgress: function() {},
                        onComplete: function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.then(function() {
                                done();
                            });
                            result.afterUseCase.catch(function() {
                                done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                            });
                        },
                        onFail: function() {}
                    }, selectedObjects);

                    promises.runTestSteps([
                        UISDKViewModel.getInputField,
                        function(collectionNameInput) {
                            promises.enterInputFieldValue(collectionNameInput, selectedObjects[0].name);
                            return NetworkExplorerViewModel.getFlyoutSubmitButton();
                        },
                        promises.clickElement
                    ]);
                });
            });
        });

        describe('when action use case fails', function() {
            it('result is successful and afterUseCase promise is rejected', function(done) {
                REST_object_configuration.respondToUpdateCollection(_server, '1234', {}, 404);

                var selectedObjects = [{
                    id: '1234',
                    name: 'collection-name-1234'
                }];

                new RenameCollection().run({
                    onReady: function() {},
                    onProgress: function() {},
                    onComplete: function(result) {
                        // ASSERT
                        expect(result.success).to.equal(true);
                        if (result.afterUseCase) {
                            result.afterUseCase.then(function() {
                                done(new Error('Expected afterUseCase promise to be rejected but was resolved.'));
                            });
                            result.afterUseCase.catch(function() {
                                done();
                            });
                        }
                    },
                    onFail: function() {}
                }, selectedObjects);

                promises.runTestSteps([
                    UISDKViewModel.getInputField,
                    function(collectionNameInput) {
                        promises.enterInputFieldValue(collectionNameInput, selectedObjects[0].name);
                        return NetworkExplorerViewModel.getFlyoutSubmitButton();
                    },
                    promises.clickElement,
                    UISDKViewModel.getDialogOkButton,
                    promises.clickElement
                ]);
            });
        });
    });
});
