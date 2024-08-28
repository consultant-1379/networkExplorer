define([
    'jscore/core',
    'container/api',
    'networkexplorer/actions/SetToPublic',
    'networkexplorerlib/ObjectConfigurationApi',
    'networkexplorerlib/widgets/CollectionDialog',
    'networkexplorerlib/classes/CollectionErrorHandler',
    'widgets/Notification',
    'actionlibrary/ActionLibrary',
    'i18n!networkexplorer/app_actions.json'
], function(
    core,
    Container,
    SetToPublic,
    ObjectConfigurationApi,
    CollectionDialog,
    CollectionErrorHandler,
    Notification,
    ActionLibrary,
    appActionsStrings
) {
    describe('SetToPublic', function() {
        var sandbox, objectUnderTest, callbackObject, containerEventBus;
        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });
        afterEach(function() {
            sandbox.restore();
        });
        describe('run()', function() {
            beforeEach(function() {
                // ARRANGE
                containerEventBus = sinon.createStubInstance(core.EventBus);
                sandbox.stub(Container, 'getEventBus', function() { return containerEventBus; });
                callbackObject = {
                    onReady: sandbox.stub(),
                    onFail: sandbox.stub(),
                    onComplete: sandbox.stub()
                };
                objectUnderTest = new SetToPublic();
            });
            describe('Should change to Public', function() {
                [{
                    description: 'a Private BRANCH collection',
                    objects: [{
                        id: '281474978820195',
                        name: 'branch_with_parent',
                        parentId: '1234',
                        type: 'BRANCH',
                        level: 1,
                        category: 'Private'
                    }]
                }, {
                    description: 'a Private LEAF collection',
                    objects: [{
                        id: '281495019759743',
                        name: 'leaf_with_parent',
                        parentId: '1234',
                        type: 'LEAF',
                        level: 1,
                        category: 'Private'
                    }]
                }, {
                    description: 'a Private regular collection',
                    objects: [{
                        category: 'Private',
                        id: '281495019759743',
                        name: 'collection'
                    }]
                }].forEach(function(test) {
                    it(test.description +  ' calling updateCollection API', function(done) {
                        // ARRANGE
                        sandbox.stub(ObjectConfigurationApi, 'updateCollectionV4');
                        callbackObject.onComplete = function(result) {
                            // ASSERT #2
                            expect(result).to.be.an.instanceof(ActionLibrary.ActionResult);
                            expect(result.success).to.equal(true);
                            expect(containerEventBus.publish.callCount).to.equal(1);
                            expect(containerEventBus.publish.getCall(0).args[0]).to.equal('container:loader');
                            expect(ObjectConfigurationApi.updateCollectionV4.callCount).to.equal(1);
                            done();
                        };
                        // ACT
                        var lifecycle = objectUnderTest.run(callbackObject, test.objects);
                        // ASSERT #1
                        expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                    });
                });
            });
            describe('A Private', function() {
                [{
                    description: 'BRANCH',
                    objects: [{
                        id: '281474978820195',
                        name: 'branch_with_parent',
                        parentId: '1234',
                        type: 'BRANCH',
                        level: 1,
                        category: 'Private'
                    }]
                }, {
                    description: 'LEAF',
                    objects: [{
                        id: '281495019759743',
                        name: 'leaf_with_parent',
                        parentId: '1234',
                        type: 'LEAF',
                        level: 1,
                        category: 'Private'
                    }]
                }, {
                    description: 'regular',
                    objects: [{
                        category: 'Private',
                        id: '281495019759743',
                        name: 'collection'
                    }]
                }].forEach(function(test) {
                    it(test.description +  ' collection should show and hide loader, show Notification onSuccess and reload collection', function(done) {
                        // ARRANGE
                        sandbox.stub(ObjectConfigurationApi, 'updateCollectionV4');
                        sandbox.stub(Notification.prototype, 'attachTo');
                        sandbox.stub(Notification.prototype, 'init');
                        callbackObject.onComplete = function() {
                            // ASSERT #2
                            ObjectConfigurationApi.updateCollectionV4.getCall(0).args[0].onSuccess();
                            expect(containerEventBus.publish.callCount).to.equal(2);
                            expect(containerEventBus.publish.getCall(0).args[0]).to.equal('container:loader');
                            expect(containerEventBus.publish.getCall(1).args[0]).to.equal('container:loader-hide');
                            expect(Notification.prototype.attachTo.callCount).to.equal(1);
                            expect(Notification.prototype.init.callCount).to.equal(1);
                            expect(Notification.prototype.init.getCall(0).calledWithMatch({
                                showAsGlobalToast: true,
                                icon: 'tick',
                                color: 'green',
                                label: appActionsStrings.get("networkexplorer-set-to-public.successMessage")
                            })).to.equal(true);
                            done();
                        };
                        // ACT
                        var lifecycle = objectUnderTest.run(callbackObject, test.objects);
                        // ASSERT #1
                        expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                    });
                });
            });
            describe('A Private Fallback Error', function() {
                [{
                    description: 'BRANCH',
                    objects: [{
                        id: '281474978820195',
                        name: 'branch_with_parent',
                        parentId: '1234',
                        type: 'BRANCH',
                        level: 1,
                        category: 'Private'
                    }]
                }, {
                    description: 'LEAF',
                    objects: [{
                        id: '281495019759743',
                        name: 'leaf_with_parent',
                        parentId: '1234',
                        type: 'LEAF',
                        level: 1,
                        category: 'Private'
                    }]
                }, {
                    description: 'regular',
                    objects: [{
                        category: 'Private',
                        id: '281495019759743',
                        name: 'collection'
                    }]
                }].forEach(function(test) {
                    it(test.description +  ' collection should show and hide loader and show Error Dialog onFailure', function(done) {
                        // ARRANGE
                        sandbox.stub(ObjectConfigurationApi, 'updateCollection');
                        sandbox.stub(ObjectConfigurationApi, 'updateCollectionV4');
                        sandbox.stub(CollectionErrorHandler, 'getErrorMessage').returns('error');
                        sandbox.stub(CollectionDialog.prototype, 'show');
                        callbackObject.onComplete = function() {
                            // ASSERT #2
                            ObjectConfigurationApi.updateCollectionV4.getCall(0).args[0].onFailure();
                            ObjectConfigurationApi.updateCollection.getCall(0).args[0].onFailure();
                            expect(containerEventBus.publish.callCount).to.equal(2);
                            expect(containerEventBus.publish.getCall(0).args[0]).to.equal('container:loader');
                            expect(containerEventBus.publish.getCall(1).args[0]).to.equal('container:loader-hide');
                            expect(CollectionDialog.prototype.show.callCount).to.equal(1);
                            expect(CollectionDialog.prototype.show.getCall(0).calledWithMatch(
                                appActionsStrings.get('networkexplorer-set-to-public.errorDialogHeader'),
                                'error'
                            )).to.equal(true);
                            done();
                        };
                        // ACT
                        var lifecycle = objectUnderTest.run(callbackObject, test.objects);
                        // ASSERT #1
                        expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                    });
                });
            });
            describe('When selection data is', function() {
                [
                    {
                        description: 'empty',
                        data: [],
                        rejectMessage: 'Action supports single-selection only.'
                    }, {
                        description: 'more than one id',
                        data: [{id: '1'}, {id: '2'}],
                        rejectMessage: 'Action supports single-selection only.'
                    }, {
                        description: 'a Public Branch collection',
                        data: [{id: '1', type: 'BRANCH', category: 'Public'}],
                        rejectMessage: 'Action only supported for Private Collections.'
                    }, {
                        description: 'a public Leaf',
                        data: [{id: '1', type: 'LEAF', category: 'Public'}],
                        rejectMessage: 'Action only supported for Private Collections.'
                    }
                ].forEach(function(test) {

                    it(test.description + ', the promise is rejected', function(done) {
                        callbackObject.onFail = function(result) {
                            expect(result.message).to.equal(test.rejectMessage);
                            expect(result.complete).to.equal(true);
                            expect(result.success).to.equal(false);
                            done();
                        };
                        var lifecycle = objectUnderTest.run(callbackObject, test.data);
                        expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                    });
                });
            });
        });
    });
});
