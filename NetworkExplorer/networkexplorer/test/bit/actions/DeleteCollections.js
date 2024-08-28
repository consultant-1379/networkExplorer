define([
    'test/bit/bitPromises',
    'jscore/core',
    'container/api',
    'src/networkexplorer/actions/DeleteCollections',
    'test/resources/restMock/REST_object_configuration',
    'test/bit/viewmodels/NetworkExplorerViewModel',
    'test/bit/viewmodels/UISDKViewModel'
], function(promises, core, Container, DeleteCollection, REST_object_configuration, NetworkExplorerViewModel, UISDKViewModel) {

    'use strict';

    describe('DeleteCollections', function() {

        var _sandbox, _server;

        beforeEach(function() {
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

        afterEach(function() {
            _sandbox.restore();
            _server.restore();
        });


        describe('When action is executed by clicking Delete button', function() {

            describe('Delete request is made to batch endpoint for single select of ', function() {
                [
                    {
                        description: '(no type)',
                        selectedObjects: [
                            {
                                id:'100',
                                name: 'collection-name-100',
                                type: undefined
                            }
                        ],
                        succeeded: 1,
                        failed: 0,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, {});
                        },
                        url: '/object-configuration/collections/v4'
                    },
                    {
                        description: 'LEAF',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'LEAF',
                                name: 'collection-name-100',
                                parentId: '654'
                            }
                        ],
                        succeeded: 1,
                        failed: 0,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, {});
                        },
                        url: '/object-configuration/collections/v4'
                    },
                    {
                        description: 'BRANCH and has no children',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'BRANCH',
                                name: 'collection-name-100',
                                parentId: '654'
                            }
                        ],
                        succeeded: 1,
                        failed: 0,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, {});
                        },
                        url: '/object-configuration/collections/v4'
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {

                        test.setupServerMock();
                        runDeleteCollectionAction(test.selectedObjects, function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.then(function() {
                                done();
                            });
                            result.afterUseCase.catch(function() {
                                done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                            });
                        });

                        promises.runTestSteps([
                            //STEP 1 execute action
                            NetworkExplorerViewModel.getDialogPrimaryButton,
                            function(button) {
                                expect(button.textContent).to.equal('Delete');
                                return promises.clickElement(button);
                            },

                            //STEP 2 verify delete result
                            NetworkExplorerViewModel.getFailureFeedbackSuccessCount,
                            function(succeededCount) {
                                expect(succeededCount.textContent.split(' ')[0]).to.equal(test.succeeded.toString());
                                return NetworkExplorerViewModel.getFailureFeedbackFailedCount();
                            },
                            function(failedCount) {
                                expect(failedCount.textContent.split(' ')[0]).to.equal(test.failed.toString());
                                return Promise.resolve();
                            },

                            //STEP 3 Verify delete rest call
                            function() {
                                expect(REST_object_configuration.getLastUrlRequested()).to.equal(test.url);
                                expect(REST_object_configuration.getLastMethodRequested()).to.equal('DELETE');
                                return NetworkExplorerViewModel.getDialogPrimaryButton();
                            },

                            //STEP 4 Close  summary dialog
                            function(button) {
                                expect(button.textContent).to.equal('OK');
                                promises.clickElement(button);
                                return UISDKViewModel.waitForDialogToDisappear();
                            }
                        ]);
                    });
                });
            });

            describe('Delete request is made to batch endpoint for multi select of ', function() {
                [
                    {
                        description: '(no type)',
                        selectedObjects: [
                            {
                                id:'100',
                                name: 'collection-name-100',
                                type: undefined
                            },
                            {
                                id:'101',
                                name: 'collection-name-101',
                                type: undefined
                            }
                        ],
                        succeeded: 2,
                        failed: 0,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, {});
                        },
                        url: '/object-configuration/collections/v4'
                    },
                    {
                        description: 'LEAF',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'LEAF',
                                name: 'collection-name-100',
                                parentId: '654'
                            },
                            {
                                id:'101',
                                type: 'LEAF',
                                name: 'collection-name-101',
                                level: 1,
                                parentId: '654'
                            }
                        ],
                        succeeded: 2,
                        failed: 0,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, {});
                        },
                        url: '/object-configuration/collections/v4'
                    },
                    {
                        description: 'BRANCH and has no children',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'BRANCH',
                                name: 'collection-name-100',
                                parentId: '654'
                            },
                            {
                                id:'101',
                                type: 'BRANCH',
                                name: 'collection-name-101',
                                parentId: '654'
                            }
                        ],
                        succeeded: 2,
                        failed: 0,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, {});
                        },
                        url: '/object-configuration/collections/v4'
                    },
                    {
                        description: 'LEAFs and BRANCH in batches',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'LEAF',
                                name: 'collection-name-100',
                                parentId: '654'
                            },
                            {
                                id:'101',
                                type: 'LEAF',
                                name: 'collection-name-101',
                                parentId: '654'
                            },
                            {
                                id:'102',
                                type: 'LEAF',
                                name: 'collection-name-102',
                                parentId: '654'
                            },
                            {
                                id:'103',
                                type: 'LEAF',
                                name: 'collection-name-103',
                                parentId: '654'
                            },
                            {
                                id:'104',
                                type: 'BRANCH',
                                name: 'collection-name-104',
                                parentId: '654'
                            }
                        ],
                        succeeded: 5,
                        failed: 0,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, {});
                        },
                        url: '/object-configuration/collections/v4'
                    },
                    {
                        description: 'LEAF and BRANCH',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'LEAF',
                                name: 'collection-name-100',
                                parentId: '654'
                            },
                            {
                                id:'101',
                                type: 'BRANCH',
                                name: 'collection-name-101',
                                parentId: '654'
                            }
                        ],
                        succeeded: 2,
                        failed: 0,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, {});
                        },
                        url: '/object-configuration/collections/v4'
                    },
                    {
                        description: 'LEAF and BRANCH with failed',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'LEAF',
                                name: 'collection-name-100',
                                parentId: '654'
                            },
                            {
                                id:'101',
                                type: 'BRANCH',
                                name: 'collection-name-101',
                                parentId: '654'
                            }
                        ],
                        succeeded: 1,
                        failed: 1,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server,
                                [
                                    {
                                        id:'101',
                                        title:'Object Not Found',
                                        body:'Collection does not exist or it\'s not a nested collection',
                                        internalErrorCode:10007
                                    }
                                ], 200
                            );
                        },
                        url: '/object-configuration/collections/v4'
                    },
                    {
                        description: 'LEAFs and BRANCH when all failing',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'BRANCH',
                                name: 'collection-name-100',
                                parentId: '654'
                            },
                            {
                                id:'101',
                                type: 'LEAF',
                                name: 'collection-name-101',
                                parentId: '654'
                            }
                        ],
                        succeeded: 0,
                        failed: 2,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server,
                                [
                                    {
                                        id:'100',
                                        title:'Object Not Found',
                                        body:'Collection does not exist or it\'s not a nested collection',
                                        internalErrorCode:10007
                                    },{
                                        id:'101',
                                        title:'Object Not Found',
                                        body:'Collection does not exist or it\'s not a nested collection',
                                        internalErrorCode:10007
                                    }
                                ], 200
                            );
                        },
                        url: '/object-configuration/collections/v4'
                    },
                ].forEach(function(test) {
                    it(test.description, function(done) {
                        test.setupServerMock();
                        runDeleteCollectionAction(test.selectedObjects, function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.then(function() {
                                done();
                            });
                            result.afterUseCase.catch(function() {
                                done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                            });
                        });

                        promises.runTestSteps([
                            //STEP 1 execute action
                            NetworkExplorerViewModel.getDialogPrimaryButton,
                            function(button) {
                                expect(button.textContent).to.equal('Delete');
                                promises.clickElement(button);
                                return NetworkExplorerViewModel.getFailureFeedbackSuccessCount();
                            },

                            //STEP 2 verify delete result
                            function(succeededCount) {
                                expect(succeededCount.textContent.split(' ')[0]).to.equal(test.succeeded.toString());
                                return NetworkExplorerViewModel.getFailureFeedbackFailedCount();
                            },
                            function(failedCount) {
                                expect(failedCount.textContent.split(' ')[0]).to.equal(test.failed.toString());
                                return Promise.resolve();
                            },

                            //STEP 3 Verify delete rest call
                            function() {
                                expect(REST_object_configuration.getLastUrlRequested()).to.equal(test.url);
                                expect(REST_object_configuration.getLastMethodRequested()).to.equal('DELETE');
                                return NetworkExplorerViewModel.getDialogPrimaryButton();
                            },

                            //STEP 4 Close  summary dialog
                            function(button) {
                                expect(button.textContent).to.equal('OK');
                                promises.clickElement(button);
                                return UISDKViewModel.waitForDialogToDisappear();
                            }
                        ]);
                    });
                });
            });

            describe('Fallback from v4 to v3 when ', function() {
                [
                    {
                        description: 'single selection',
                        selectedObjects: [
                            {
                                id:'100',
                                name: 'collection-name-100',
                                type: undefined
                            }
                        ],
                        succeeded: 1,
                        failed: 0,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, {}, 400);
                            REST_object_configuration.respondToDeleteCollectionsV3(_server, {});
                        },
                        url: '/object-configuration/collections/v3'
                    },
                    {
                        description: 'Multi selection',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'LEAF',
                                name: 'collection-name-100',
                                level: 1,
                                parentId: '654'
                            },
                            {
                                id:'101',
                                type: 'LEAF',
                                name: 'collection-name-101',
                                level: 1,
                                parentId: '654'
                            }
                        ],
                        succeeded: 2,
                        failed: 0,
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, {}, 400);
                            REST_object_configuration.respondToDeleteCollectionsV3(_server, {});
                        },
                        url: '/object-configuration/collections/v3'
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {

                        test.setupServerMock();
                        runDeleteCollectionAction(test.selectedObjects, function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.then(function() {
                                done();
                            });
                            result.afterUseCase.catch(function() {
                                done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                            });
                        });

                        promises.runTestSteps([
                            //STEP 1 execute action
                            NetworkExplorerViewModel.getDialogPrimaryButton,
                            function(button) {
                                expect(button.textContent).to.equal('Delete');
                                return promises.clickElement(button);
                            },

                            //STEP 2 verify delete result
                            NetworkExplorerViewModel.getFailureFeedbackSuccessCount,
                            function(succeededCount) {
                                expect(succeededCount.textContent.split(' ')[0]).to.equal(test.succeeded.toString());
                                return NetworkExplorerViewModel.getFailureFeedbackFailedCount();
                            },
                            function(failedCount) {
                                expect(failedCount.textContent.split(' ')[0]).to.equal(test.failed.toString());
                                return Promise.resolve();
                            },

                            //STEP 3 Verify delete rest call
                            function() {
                                expect(REST_object_configuration.getLastUrlRequested()).to.equal(test.url);
                                expect(REST_object_configuration.getLastMethodRequested()).to.equal('DELETE');
                                return NetworkExplorerViewModel.getDialogPrimaryButton();
                            },

                            //STEP 4 Close  summary dialog
                            function(button) {
                                expect(button.textContent).to.equal('OK');
                                promises.clickElement(button);
                                return UISDKViewModel.waitForDialogToDisappear();
                            }
                        ]);
                    });
                });
            });

            describe('Delete request is failed for ', function() {
                [
                    {
                        description: 'empty selections',
                        selectedObjects: [],
                        errorMessage: 'Action supports single and multi selection only.'
                    },
                    {
                        description: 'root collections',
                        selectedObjects: [{ id: '101', level: 0, parentId: null}],
                        errorMessage: 'Action does not support ROOT Collections.'
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {

                        runDeleteCollectionAction(test.selectedObjects, function() {}, function(error) {
                            expect(error.success).to.false;
                            expect(error.message).to.equals(test.errorMessage);
                            expect(error.complete).to.true;
                            done();
                        });
                    });
                });

            });

            describe('Delete request is failed for status code ', function() {
                [
                    {
                    description: '401',
                    selectedObjects: [
                        {
                            id:'100',
                            type: 'LEAF',
                            name: 'collection-name-100',
                            level: 1,
                            parentId: '654'
                        }
                    ],
                    responseObj:{
                        internalErrorCode: 10019,
                        userMessage: {
                            title: 'Access Forbidden',
                            body: 'No user information was provided!'
                        }
                    },
                    statusCode: 401,
                    succeeded: 0,
                    failed: 1,
                    url: '/object-configuration/collections/v4',
                    errorMsg: {
                        title: 'Access Forbidden',
                        body: 'No user information was provided!'
                    }
                },
                    {
                        description: '403',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'LEAF',
                                name: 'collection-name-100',
                                level: 1,
                                parentId: '654'
                            }
                        ],
                        responseObj:{
                            internalErrorCode: 10024,
                            userMessage: {
                                title: 'Access Forbidden',
                                body: 'This user does not have access to this feature!'
                            }
                        },
                        statusCode: 403,
                        succeeded: 0,
                        failed: 1,
                        url: '/object-configuration/collections/v4',
                        errorMsg: {
                            title: 'Access Forbidden',
                            body: 'This user does not have access to this feature!'
                        }
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {

                        REST_object_configuration.respondToDeleteCollectionsV4(_server,test.responseObj, test.statusCode);
                        runDeleteCollectionAction(test.selectedObjects, function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.then(function() {
                                done();
                            });
                            result.afterUseCase.catch(function() {
                                done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                            });
                        });

                        promises.runTestSteps([
                            //STEP 1 execute action
                            NetworkExplorerViewModel.getDialogPrimaryButton,
                            function(button) {
                                expect(button.textContent).to.equal('Delete');
                                promises.clickElement(button);
                                return NetworkExplorerViewModel.getFailureFeedbackSuccessCount();
                            },

                            //STEP 2 verify delete result
                            function(succeededCount) {
                                expect(succeededCount.textContent.split(' ')[0]).to.equal(test.succeeded.toString());
                                return NetworkExplorerViewModel.getFailureFeedbackFailedCount();
                            },
                            function(failedCount) {
                                expect(failedCount.textContent.split(' ')[0]).to.equal(test.failed.toString());
                                return UISDKViewModel.getDialogTableRows();
                            },
                            function(rows) {
                                expect(rows[0].cells[2].textContent).to.equal(test.errorMsg.body);
                                return Promise.resolve();
                            },


                            //STEP 3 Verify delete rest call
                            function() {
                                expect(REST_object_configuration.getLastUrlRequested()).to.equal(test.url);
                                expect(REST_object_configuration.getLastMethodRequested()).to.equal('DELETE');
                                return NetworkExplorerViewModel.getDialogPrimaryButton();
                            },

                            //STEP 4 Close  summary dialog
                            function(button) {
                                expect(button.textContent).to.equal('OK');
                                promises.clickElement(button);
                                return UISDKViewModel.waitForDialogToDisappear()
                            }
                        ]);
                    });
                });
            });

            describe('Delete request is made to v1 call on failed v3 call with ', function() {
                [
                    {
                        description: 'RESTEASY001185',
                        selectedObjects: [
                            {
                                id:'100',
                                name: 'collection-name-100',
                                type: undefined
                            }
                        ],
                        succeeded: 1,
                        failed: 0,
                        statusCode: 500,
                        responseObj: {
                            userMessage: {
                                title:'Unknown Exception',
                                body: 'RESTEASY001185: Could not find resource for relative : /collections/v3 of full path: https://<hostname>/object-configuration/collections/v3'
                            },
                            'internalErrorCode':0
                        },
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollectionsV3(_server, this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollection(_server, this.selectedObjects[0].id, {});
                        },
                        url: '/object-configuration/v1/collections/100'
                    },
                    {
                        description: 'RESTEASY001545',
                        selectedObjects: [
                            {
                                id:'100',
                                name: 'collection-name-100',
                                type: undefined
                            }
                        ],
                        succeeded: 1,
                        failed: 0,
                        statusCode: 500,
                        responseObj: {
                            userMessage: {
                                title:'Unknown Exception',
                                body: 'RESTEASY001545: No resource method found for DELETE, return 405 with Allow header'
                            },
                            'internalErrorCode':0
                        },
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollectionsV3(_server, this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollection(_server, this.selectedObjects[0].id, {});
                        },
                        url: '/object-configuration/v1/collections/100'
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {

                        test.setupServerMock();
                        runDeleteCollectionAction(test.selectedObjects, function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.then(function() {
                                done();
                            });
                            result.afterUseCase.catch(function() {
                                done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                            });
                        });

                        promises.runTestSteps([
                            //STEP 1 execute action
                            NetworkExplorerViewModel.getDialogPrimaryButton,
                            function(button) {
                                expect(button.textContent).to.equal('Delete');
                                promises.clickElement(button);
                                return NetworkExplorerViewModel.getFailureFeedbackSuccessCount();
                            },

                            //STEP 2 verify delete result
                            function(succeededCount) {
                                expect(succeededCount.textContent.split(' ')[0]).to.equal(test.succeeded.toString());
                                return NetworkExplorerViewModel.getFailureFeedbackFailedCount();
                            },
                            function(failedCount) {
                                expect(failedCount.textContent.split(' ')[0]).to.equal(test.failed.toString());
                                return UISDKViewModel.getDialogTableRows();
                            },
                            function(rows) {
                                expect(rows[0].cells[2].textContent).to.equal('');
                                return Promise.resolve();
                            },

                            //STEP 3 Verify delete rest call
                            function() {
                                expect(REST_object_configuration.getLastUrlRequested()).to.equal(test.url);
                                expect(REST_object_configuration.getLastMethodRequested()).to.equal('DELETE');
                                return NetworkExplorerViewModel.getDialogPrimaryButton();
                            },

                            //STEP 4 Close  summary dialog
                            function(button) {
                                expect(button.textContent).to.equal('OK');
                                promises.clickElement(button);
                                return UISDKViewModel.waitForDialogToDisappear();
                            }
                        ]);
                    });
                });
            });

            describe('Delete request is made to v1 call (upgrade fall back) and failed on', function() {
                [
                    {
                        description: 'multi select',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'LEAF',
                                name: 'collection-name-100',
                                level: 1,
                                parentId: '654'
                            },
                            {
                                id:'101',
                                type: 'LEAF',
                                name: 'collection-name-101',
                                level: 1,
                                parentId: '654'
                            }
                        ],
                        succeeded: 1,
                        failed: 0,
                        statusCode: 500,
                        errorMessage: '',
                        responseObj: {
                            userMessage: {
                                title:'Unknown Exception',
                                body: 'RESTEASY001185: Could not find resource for relative : /collections/v3 of full path: https://<hostname>/object-configuration/collections/v3'
                            },
                            'internalErrorCode': 0
                        },
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV3(_server, this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollection(_server, this.selectedObjects[0].id, {});
                        }
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {
                        test.setupServerMock();
                        runDeleteCollectionAction(test.selectedObjects, function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            done();
                        });

                        promises.runTestSteps([
                            //STEP 1 execute action
                            NetworkExplorerViewModel.getDialogPrimaryButton,
                            function(button) {
                                expect(button.textContent).to.equal('Delete');
                                promises.clickElement(button);
                                return NetworkExplorerViewModel.getDialogMessage();
                            },

                            //STEP 2 check body of error dialog
                            function (message) {
                                expect(message.textContent).to.equal('Bulk delete may be temporarily unavailable during upgrade.');
                                return NetworkExplorerViewModel.getDialogPrimaryButton();
                            },

                            //STEP 2 Close  summary dialog
                            function(button) {
                                expect(button.textContent).to.equal('OK');
                                promises.clickElement(button);
                                return UISDKViewModel.waitForDialogToDisappear();
                            }
                        ]);
                    });
                });
            });

            describe('Delete request is made to v1 call (upgrade fall back) for', function() {
                [
                    {
                        description: '(no type)',
                        selectedObjects: [
                            {
                                id:'100',
                                name: 'collection-name-100',
                                type: undefined
                            }
                        ],
                        succeeded: 1,
                        failed: 0,
                        statusCode: 500,
                        errorMessage: '',
                        responseObj: {
                            userMessage: {
                                title:'Unknown Exception',
                                body: 'RESTEASY001185: Could not find resource for relative : /collections/v3 of full path: https://<hostname>/object-configuration/collections/v3'
                            },
                            'internalErrorCode': 0
                        },
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollectionsV3(_server, this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollection(_server, this.selectedObjects[0].id, {});
                        },
                        url: '/object-configuration/v1/collections/100',
                        method: 'DELETE'
                    },
                    {
                        description: 'LEAF',
                        selectedObjects: [
                            {
                                id:'100',
                                type: 'LEAF',
                                name: 'collection-name-100',
                                level: 1,
                                parentId: '654'
                            }
                        ],
                        succeeded: 1,
                        failed: 0,
                        statusCode: 500,
                        errorMessage: '',
                        responseObj: {
                            userMessage: {
                                title:'Unknown Exception',
                                body: 'RESTEASY001185: Could not find resource for relative : /collections/v3 of full path: https://<hostname>/object-configuration/collections/v3'
                            },
                            'internalErrorCode':0
                        },
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server, this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollectionsV3(_server, this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCustomTopology(_server, this.selectedObjects[0].id, {});
                        },
                        url: '/object-configuration/custom-topology/v1/100',
                        method: 'DELETE'
                    },
                    {
                        description: 'BRANCH and has no children',
                        selectedObjects: [
                            {
                                type: 'BRANCH',
                                id: '789',
                                name: 'collection-name-789',
                                level: 1,
                                parentId: '987'
                            }
                        ],
                        succeeded: 1,
                        failed: 0,
                        statusCode: 500,
                        errorMessage: '',
                        responseObj: {
                            userMessage: {
                                title:'Unknown Exception',
                                body: 'RESTEASY001185: Could not find resource for relative : /collections/v3 of full path: https://<hostname>/object-configuration/collections/v3'
                            },
                            'internalErrorCode': 0
                        },
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server,this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollectionsV3(_server,this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCustomTopology(_server, this.selectedObjects[0].id, {});
                            REST_object_configuration.respondToGetCustomTopologyChildren(_server, this.selectedObjects[0].id, []);
                        },
                        url: '/object-configuration/custom-topology/v1/789',
                        method: 'DELETE'
                    },
                    {
                        description: 'BRANCH and has children',
                        selectedObjects: [
                            {
                                type: 'BRANCH',
                                id: '789',
                                name: 'collection-name-789',
                                level: 1,
                                parentId: '987'
                            }
                        ],
                        succeeded: 0,
                        failed: 1,
                        statusCode: 500,
                        errorMessage: 'Unable to remove Collection that contains a referenced Collection.',
                        responseObj: {
                            userMessage: {
                                title:'Unknown Exception',
                                body: 'RESTEASY001185: Could not find resource for relative : /collections/v3 of full path: https://<hostname>/object-configuration/collections/v3'
                            },
                            'internalErrorCode': 0
                        },
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server,this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollectionsV3(_server,this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCustomTopology(_server, this.selectedObjects[0].id, {});
                            REST_object_configuration.respondToGetCustomTopologyChildren(_server, this.selectedObjects[0].id, [{"id":"789","name":"child_leaf","parentId":"987","type":"LEAF","category":"Public","level":2,"customTopology":false}]);
                        },
                        url: '/object-configuration/custom-topology/v1?customTopology=false&parentId=789',
                        method: 'GET'
                    },
                    {
                        description: 'BRANCH and children check failed',
                        selectedObjects: [
                            {
                                type: 'BRANCH',
                                id: '789',
                                name: 'collection-name-789',
                                level: 1,
                                parentId: '987'
                            }
                        ],
                        succeeded: 0,
                        failed: 1,
                        statusCode: 500,
                        errorMessage: 'Unable to check if Collection contains a referenced Collection.',
                        responseObj: {
                            userMessage: {
                                title:'Unknown Exception',
                                body: 'RESTEASY001185: Could not find resource for relative : /collections/v3 of full path: https://<hostname>/object-configuration/collections/v3'
                            },
                            'internalErrorCode': 0
                        },
                        setupServerMock: function() {
                            REST_object_configuration.respondToDeleteCollectionsV4(_server,this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCollectionsV3(_server,this.responseObj, this.statusCode);
                            REST_object_configuration.respondToDeleteCustomTopology(_server, this.selectedObjects[0].id, {});
                            REST_object_configuration.respondToGetCustomTopologyChildren(_server, this.selectedObjects[0].id, [], 500);
                        },
                        url: '/object-configuration/custom-topology/v1?customTopology=false&parentId=789',
                        method: 'GET'
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {

                        test.setupServerMock();
                        runDeleteCollectionAction(test.selectedObjects, function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                            result.afterUseCase.then(function() {
                                done();
                            });
                            result.afterUseCase.catch(function() {
                                done(new Error('Expected afterUseCase promise to be resolved but was rejected.'));
                            });
                        });

                        promises.runTestSteps([
                            //STEP 1 execute action
                            NetworkExplorerViewModel.getDialogPrimaryButton,
                            function(button) {
                                expect(button.textContent).to.equal('Delete');
                                promises.clickElement(button);
                                return NetworkExplorerViewModel.getFailureFeedbackSuccessCount();
                            },

                            //STEP 2 verify delete result
                            function(succeededCount) {
                                expect(succeededCount.textContent.split(' ')[0]).to.equal(test.succeeded.toString());
                                return UISDKViewModel.getDialogTableRows();
                            },
                            function(rows) {
                                expect(rows[0].cells[2].textContent).to.equal(test.errorMessage);
                            },

                            //STEP 3 Verify delete rest call
                            function() {
                                expect(REST_object_configuration.getLastUrlRequested()).to.equal(test.url);
                                expect(REST_object_configuration.getLastMethodRequested()).to.equal(test.method);
                                return NetworkExplorerViewModel.getDialogPrimaryButton();
                            },

                            //STEP 4 Close  summary dialog
                            function(button) {
                                expect(button.textContent).to.equal('OK');
                                promises.clickElement(button);
                                return UISDKViewModel.waitForDialogToDisappear();
                            }
                        ]);
                    });
                });
            });

        });
    });

    function runDeleteCollectionAction(selectedObjects, onComplete, onFail) {
        var deleteCollection = new DeleteCollection();
        deleteCollection.DELETE_BATCH_SIZE = 2;
        deleteCollection.run({
                onReady: function() {},
                onProgress: function() {},
                onComplete: onComplete,
                onFail: (typeof onFail === 'function') ? onFail : function() {}
            }, selectedObjects
        );
    }
});
