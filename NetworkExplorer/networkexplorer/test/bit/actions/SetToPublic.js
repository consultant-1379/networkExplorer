define([
    'test/bit/bitPromises',
    'jscore/core',
    'container/api',
    'src/networkexplorer/actions/SetToPublic',
    'test/resources/restMock/REST_object_configuration'
], function(promises, core, Container, SetToPublic, REST_object_configuration) {

    'use strict';

    describe('SetToPublic', function() {

        var actionContainer = document.getElementById('bitContainer'), currentApp, AppWithSetToPublic, _sandbox, _server;

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
            AppWithSetToPublic = core.App.extend({
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
            currentApp = new AppWithSetToPublic();
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
                    id: '1234',
                    sharing : 'Private'
                },
                {
                    description: 'LEAF',
                    type: 'NESTED',
                    subType: 'LEAF',
                    id: '1234',
                    level: 1,
                    parentId: '654',
                    sharing : 'Private'
                },
                {
                    description: 'BRANCH and has no children',
                    type: 'NESTED',
                    subType: 'BRANCH',
                    id: '1234',
                    level: 1,
                    parentId: '987',
                    sharing : 'Private'
                }
            ].forEach(function(test) {
                it(test.description + ' the result is successful and afterUseCase promise is resolved', function(done) {

                    REST_object_configuration.respondForUpdateCollectionV4(_server, '1234', {});
                    var selectedObjects = [{
                        id: test.id,
                        name: 'collection-name-' + test.id,
                        type: test.type,
                        level: test.level,
                        parentId: test.parentId,
                        sharing : test.sharing
                    }];

                    new SetToPublic().run({
                        onReady: function() {},
                        onProgress: function() {},
                        onComplete: function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.then(function(obj) {
                                expect(obj.action).to.equal('networkexplorer-set-to-public');
                                done();
                            });
                        },
                        onFail: function() {}
                    }, selectedObjects);

                });
            });
        });
        describe('when action use case is successful for collection type FallBack', function() {
            [
                {
                    description: 'standard (no type)',
                    type: undefined,
                    id: '1234',
                    sharing : 'Private'
                },
                {
                    description: 'LEAF',
                    type: 'NESTED',
                    subType: 'LEAF',
                    id: '1234',
                    level: 1,
                    parentId: '654',
                    sharing : 'Private'
                },
                {
                    description: 'BRANCH and has no children',
                    type: 'NESTED',
                    subType: 'BRANCH',
                    id: '1234',
                    level: 1,
                    parentId: '987',
                    sharing : 'Private'
                }
            ].forEach(function(test) {
                it(test.description + ' the result is successful and afterUseCase promise is resolved', function(done) {

                    REST_object_configuration.respondToUpdateCollection(_server, '1234', {});
                    var selectedObjects = [{
                        id: test.id,
                        name: 'collection-name-' + test.id,
                        type: test.type,
                        level: test.level,
                        parentId: test.parentId,
                        sharing : test.sharing
                    }];

                    new SetToPublic().run({
                        onReady: function() {},
                        onProgress: function() {},
                        onComplete: function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.then(function(obj) {
                                expect(obj.action).to.equal('networkexplorer-set-to-public');
                                done();
                            });
                        },
                        onFail: function() {}
                    }, selectedObjects);

                });
            });
        });
        describe('afterUseCase promise is ', function() {
            it('resolved when use case is successful', function(done) {
                REST_object_configuration.respondForUpdateCollectionV4(_server, '1234', {});
                var callbacks = {
                    onComplete: function(result) {
                        // ASSERT
                        expect(result.success).to.equal(true);
                        result.afterUseCase.then(function(obj) {
                            expect(obj.action).to.equal('networkexplorer-set-to-public');
                            done();
                        });
                    }
                };
                new SetToPublic().run(callbacks, [{id: '1234', sharing: 'Private'}], []);
            });
        });
        describe('when action use case fails', function() {
            it('result is successful and afterUseCase promise is rejected', function(done) {
                var selectedObjects = [{
                    id: '1234',
                    name: 'collection-name-1234'
                }];

                new SetToPublic().run({
                    onReady: function() {},
                    onProgress: function() {},
                    onComplete: function(result) {},
                    onFail: function(result) {
                        // ASSERT
                        expect(result.success).to.equal(false);
                        done();
                    }
                }, selectedObjects);
            });
        });
    });
});
