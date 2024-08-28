define([
    'test/bit/bitPromises',
    'src/networkexplorer/actions/RemoveLeafCollection',
    'test/resources/restMock/REST_object_configuration',
    'test/bit/viewmodels/UISDKViewModel',
    'test/bit/viewmodels/RemoveLeafCollectionViewModel'
], function (promises, RemoveLeafCollection, REST_object_configuration, UISDKViewModel, RemoveLeafCollectionViewModel) {

    'use strict';

    describe('RemoveLeafCollection', function () {

        var _sandbox, _server;

        beforeEach(function () {
            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            _server = _sandbox.server;
            _server = sinon.fakeServer.create();
            _server.autoRespond = true;
            _server.respondImmediately = true;

            // prevent sinon bug on abort that forces success callback to be called repeatedly
            _sandbox.stub(sinon.FakeXMLHttpRequest.prototype, 'abort');
        });

        afterEach(function () {
            _sandbox.restore();
            _server.restore();
        });
        describe('When action is executed by clicking Remove button', function() {
            describe('Remove request is made to appropriate endpoint for', function () {
                [{
                    description: 'a single LEAF collection',
                    collections: [{
                        id: '101',
                        name: 'LEAF 1',
                        type: 'NESTED',
                        subType: 'LEAF',
                        level: 1,
                        parentId: '110'
                    }],
                    setupServerMock: function() {
                        REST_object_configuration.respondToRemoveLeafCollection(_server, this.collections[0].id, this.collections[0].parentId, {});
                    },
                    lastUrlRequested: '/object-configuration/custom-topology/v1/101/110'
                },
                {
                    description: 'multiple LEAF collections',
                    collections: [{
                        id: '101',
                        name: 'LEAF 1',
                        type: 'NESTED',
                        subType: 'LEAF',
                        level: 1,
                        parentId: '110'
                    },
                    {
                        id: '102',
                        name: 'LEAF 2',
                        type: 'NESTED',
                        subType: 'LEAF',
                        level: 1,
                        parentId: '110'
                    }],
                    setupServerMock: function() {
                        REST_object_configuration.respondToRemoveLeafCollection(_server, this.collections[0].id, this.collections[0].parentId, {});
                        REST_object_configuration.respondToRemoveLeafCollection(_server, this.collections[1].id, this.collections[1].parentId, {});
                    },
                    lastUrlRequested: '/object-configuration/custom-topology/v1/102/110'
                }].forEach(function(test) {
                    it(test.description, function (done) {
                        test.setupServerMock();
                        runRemoveLeafCollectionAction(test.collections, function (result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.catch(function () {
                                done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                            });
                        });

                        promises.runTestSteps([
                            UISDKViewModel.getDialogOkButton,
                            function (button) {
                                expect(button.textContent).to.equal('Remove');
                                promises.clickElement(button);
                                UISDKViewModel.waitForDialogToDisappear();
                                return UISDKViewModel.getNotification();
                            },
                            function (toast) {
                                expect(toast.textContent.trim() === 'Collections Removed ('+ test.collections.length +')').to.equal(true);
                                return UISDKViewModel.getNotificationCloseButton();
                            },
                            promises.clickElement,
                            promises.delay,
                            function(){
                                expect(REST_object_configuration.getLastUrlRequested()).to.equal(test.lastUrlRequested);
                                expect(REST_object_configuration.getLastMethodRequested()).to.equal('PUT');
                                done();
                            }
                        ]);
                    });
                });
            });
            describe('Error dialog should show when remove fails for', function () {
                [{
                    description: 'a single LEAF collection',
                    collections: [{
                        id: '101',
                        name: 'LEAF 1',
                        type: 'NESTED',
                        subType: 'LEAF',
                        level: 1,
                        parentId: '110'
                    }],
                    succeeded: 0,
                    failed: 1,
                    failureMessage: 'Non Existent Collection',
                    setupServerMock: function() {
                        REST_object_configuration.respondToRemoveLeafCollection(_server,  this.collections[0].id, this.collections[0].parentId, {internalErrorCode:10007}, 404);
                    }
                },
                {
                    description: 'a LEAF collection with no parent',
                    collections: [{
                        id: '101',
                        name: 'LEAF 1',
                        type: 'NESTED',
                        subType: 'LEAF',
                        level: 1
                    }],
                    succeeded: 0,
                    failed: 1,
                    failureMessage: 'The collection cannot be removed as it is not part of a topology.',
                    setupServerMock: function() {
                        REST_object_configuration.respondToRemoveLeafCollection(_server,  this.collections[0].id, this.collections[0].parentId, {});
                    }
                },
                {
                    description: 'multiple LEAF collections where only one fails',
                    collections: [{
                        id: '101',
                        name: 'LEAF 1',
                        type: 'NESTED',
                        subType: 'LEAF',
                        level: 1,
                        parentId: '110'
                    },
                    {
                        id: '102',
                        name: 'LEAF 2',
                        type: 'NESTED',
                        subType: 'LEAF',
                        level: 1,
                        parentId: '110'
                    }],
                    succeeded: 1,
                    failed: 1,
                    failureMessage: 'Non Existent Collection',
                    setupServerMock: function() {
                        REST_object_configuration.respondToRemoveLeafCollection(_server, this.collections[0].id,  this.collections[0].parentId, {internalErrorCode:10007}, 404);
                        REST_object_configuration.respondToRemoveLeafCollection(_server, this.collections[1].id,  this.collections[1].parentId, {});
                    }
                }].forEach(function(test) {
                    it(test.description, function (done) {
                        test.setupServerMock();
                        runRemoveLeafCollectionAction(test.collections, function (result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.catch(function () {
                                done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                            });
                        });

                        promises.runTestSteps([
                            UISDKViewModel.getDialogOkButton,
                            function (button) {
                                expect(button.textContent).to.equal('Remove');
                                return promises.clickElement(button);
                            },
                            RemoveLeafCollectionViewModel.getResultCounters,
                            function (resultCounters) {
                                var counters = resultCounters.children;
                                expect(counters[0].textContent).to.equal('Total ('+test.collections.length+')');
                                expect(counters[1].innerText).to.contain(test.succeeded);
                                expect(counters[2].innerText).to.contain(test.failed);
                                return UISDKViewModel.getTableCells();
                            },
                            function (cells) {
                                expect(cells[0].textContent).to.equal(test.collections[0].name);
                                expect(cells[1].textContent).to.equal(test.failureMessage);
                                return UISDKViewModel.getDialogOkButton();
                            },
                            promises.clickElement,
                            done
                        ]);
                    });
                });
            });
            describe('Action is rejected for', function () {
                var collections= [{
                    id: '101',
                    name: 'BRANCH 1',
                    type: 'NESTED',
                    subType: 'BRANCH',
                    level: 1,
                    parentId: '110'
                }];
                it('a BRANCH collection', function (done) {
                    runRemoveLeafCollectionAction(collections, null, function (result) {
                        // ASSERT
                        expect(result.success).to.equal(false);
                        expect(result.message).to.equal('Action supports Leaf and search criteria collections only.');
                        done();
                    });
                });
            });
        });
    });

    function runRemoveLeafCollectionAction(selectedObjects, onComplete, onFail) {
        new RemoveLeafCollection().run({
            onReady: function () { },
            onProgress: function () { },
            onComplete: onComplete,
            onFail: onFail
        }, selectedObjects
        );
    }
});
