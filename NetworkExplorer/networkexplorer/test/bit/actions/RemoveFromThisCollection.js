define([
    'test/bit/bitPromises',
    'jscore/core',
    'actionlibrary/ActionLibrary',
    'container/api',
    'networkexplorer/actions/RemoveFromThisCollection',
    'test/bit/viewmodels/UISDKViewModel',
    'test/resources/restMock/REST_object_configuration'
], function(promises, core, ActionLibrary, Container, RemoveFromThisCollection, UISDKViewModel, REST_object_configuration) {

    var TIMEOUT = 10000;

    describe('RemoveFromThisCollection', function() {
        var currentApp, AppWithRemoveFromThisCollection, _server, _sandbox;
        beforeEach(function(done) {
            // Setup fake server & sandbox
            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            _server = _sandbox.server;
            _server.autoRespond = true;
            _server.respondImmediately = true;
            _sandbox.stub(core.Window, 'getProperty').withArgs('innerHeight').returns(1080);
            // Create a generic app with View and root DOM element.
            AppWithRemoveFromThisCollection = core.App.extend({
                View: core.View.extend({
                    getTemplate: function() {
                        return '<div></div>';
                    }
                })
            });
            currentApp = new AppWithRemoveFromThisCollection();
            // start application.
            currentApp.start(document.getElementById('bitContainer'));
            done();
        });
        afterEach(function() {
            currentApp = undefined;
            AppWithRemoveFromThisCollection = undefined;
            _sandbox.restore();
        });
        describe('Remove from a valid leaf collection or standard collection', function() {
            describe('when successful, updates the collection given', function() {
                [{
                    description: 'a single object',
                    selection: { id: '0', objects: [{id: '2'}] }
                },{
                    description: 'multiple objects',
                    selection: { id: '0', objects: [{id: '2'},{id: '3'}] }
                }].forEach(function(test) {
                    it(test.description, function(done) {
                        this.timeout(TIMEOUT);
                        REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, test.selection.id, {
                            id: test.selection.id,
                            objects: [{id: '2'},{id: '3'}]
                        });
                        REST_object_configuration.respondToUpdateCollection(_server, test.selection.id);
                        var callbacks = {
                            onReady: _sandbox.spy(),
                            onProgress: _sandbox.spy(),
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
                            onFail: _sandbox.spy()
                        };
                        var action = new RemoveFromThisCollection();
                        action.start(callbacks, [test.selection], []);
                        promises.runTestSteps([
                            UISDKViewModel.getNotification,
                            function(label) {
                                expect(label.textContent).to.equal('Objects removed ('+test.selection.objects.length+')');
                                expect(callbacks.onComplete.callCount).to.equal(1);
                                return Promise.resolve();
                            }
                        ]);
                    });
                });
            });
            describe('when unsuccessful, an error dialog is displayed', function() {
                [{
                    description: 'an unexpected error occurred (with server message)',
                    selection: { id: '0', objects: [{id: '1'}] },
                    title: 'Custom Error Header',
                    body: 'Custom Error Body',
                    setup: function() {
                        REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, this.selection.id, {
                            userMessage: {
                                title: this.title,
                                body: this.body
                            }
                        }, 500);
                    }
                },{
                    description: 'an unexpected error occurred (without server message)',
                    selection: { id: '0', objects: [{id: '1'}] },
                    title: 'Unknown Server Error',
                    body: 'The server encountered an internal error. Please try again later or contact your System Administrator.',
                    setup: function() {
                        /* nothing */
                    }
                },{
                    description: 'the collection cannot be retrieved by the user',
                    selection: { id: '0', objects: [{id: '1'}] },
                    title: 'Permission denied',
                    body: 'The user is not permitted to retrieve the collection.',
                    setup: function() {
                        REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, this.selection.id, {
                            userMessage: {
                                title: this.title,
                                body: this.body
                            }
                        }, 403);
                    }
                },{
                    description: 'the collection to update exists but cannot be updated',
                    selection: { id: '0', objects: [{id: '1'}] },
                    title: 'Permission denied',
                    body: 'The user is not permitted to update the collection.',
                    setup: function() {
                        REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, this.selection.id, {
                            id: this.selection.id,
                            objects: this.selection.objects.concat([{id: '2'}])
                        }, 200);
                        REST_object_configuration.respondToUpdateCollection(_server, this.selection.id, {
                            userMessage: {
                                title: this.title,
                                body: this.body
                            }
                        }, 403);
                    }
                },{
                    description: 'the collection no longer exists (10007) before it is read',
                    selection: { id: '0', objects: [{id: '1'}] },
                    title: 'Permission denied',
                    body: 'This collection no longer exists. Please select a different collection and try again.',
                    setup: function() {
                        REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, this.selection.id, {
                            internalErrorCode: 10007,
                            userMessage: {
                                title: this.title,
                                body: this.body
                            }
                        }, 404);
                    }
                },{
                    description: 'the collection no longer exists (10007) before it is updated',
                    selection: { id: '0', objects: [{id: '1'}] },
                    title: 'Permission denied',
                    body: 'This collection no longer exists. Please select a different collection and try again.',
                    setup: function() {
                        REST_object_configuration.respondToGetCollectionWithoutSortV3(_server, this.selection.id, {
                            id: this.selection.id,
                            objects: this.selection.objects.concat([{id: '2'}])
                        }, 200);
                        REST_object_configuration.respondToUpdateCollection(_server, this.selection.id, {
                            internalErrorCode: 10007,
                            userMessage: {
                                title: this.title,
                                body: this.body
                            }
                        }, 404);
                    }
                }].forEach(function(test) {
                    it(test.description, function(done) {
                        this.timeout(TIMEOUT);
                        var action = new RemoveFromThisCollection();
                        var callbacks = {
                            onReady: _sandbox.spy(),
                            onProgress: _sandbox.spy(),
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
                            onFail: _sandbox.spy()
                        };
                        test.setup();
                        action.start(callbacks, [test.selection], []);
                        promises.runTestSteps([
                            function() {
                                return promises.waitUntil(function() {
                                    return callbacks.onComplete.callCount === 1;
                                }, {timeout: 2000, errorMessage: 'Action never finished'});
                            },
                            function() {
                                return promises.waitUntil(function() {
                                    return document.querySelectorAll('.ebDialog').length === 1;
                                }, {timeout: 2000, errorMessage: 'Dialog never appeared'});
                            },
                            UISDKViewModel.getDialogTitle,
                            function(title) {
                                expect(title.textContent).to.equal(test.title);
                                return UISDKViewModel.getDialogMessage();
                            },
                            function(body) {
                                expect(body.textContent).to.equal(test.body);
                                return UISDKViewModel.getDialogButtons();
                            },
                            promises.clickElement
                        ], done);
                    });
                });
            });
        });
    });
});
