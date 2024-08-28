define([
    'jscore/core',
    'networkexplorer/actions/SaveSearch',
    'container/api',
    'widgets/Dialog',
    'networkexplorer/classes/Consumable',
    'networkexplorer/classes/ConsumableSet',
    'networkexplorer/classes/ActionManager',
    'actionlibrary/ActionLibrary',
    'actionlibrary/RecentActions',
    'networkexplorerlib/CollectionHandler',
    'networkexplorerlib/ObjectConfigurationApi',
    'i18n!networkexplorer/Results.json'
], function(
    core,
    SaveSearch,
    Container,
    Dialog,
    Consumable,
    ConsumableSet,
    ActionManager,
    ActionLibrary,
    RecentActions,
    CollectionHandler,
    ObjectConfigurationApi,
    strings
) {
    describe('ActionManager', function() {
        var _sandbox,
            classUnderTest;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            var eventBusStub = sinon.createStubInstance(core.EventBus);
            var options = {
                context: {
                    eventBus: eventBusStub
                },
                resultsData: {
                    isSavedSearchEnabled: _sandbox.stub(),
                    userHasUpdateRights: _sandbox.stub(),
                    getCurrentSearchData: _sandbox.stub(),
                    getSearchTerm: _sandbox.stub(),
                    recursiveValue: _sandbox.stub()
                }
            };
            classUnderTest = new ActionManager(options);
            _sandbox.stub(Container, 'getEventBus', function() {
                return eventBusStub;
            });
        });

        afterEach(function() {
            _sandbox.restore();
            if (classUnderTest.saveDialog) {
                classUnderTest.saveDialog.hide();
                classUnderTest.saveDialog.detach();
            }
        });

        describe('getActions()', function() {
            var callback, objects, index;
            beforeEach(function() {
                callback = _sandbox.spy();
                index = 0;
            });

            describe('Legacy', function() {
                beforeEach(function() {
                    _sandbox.stub(ActionLibrary, 'getAvailableActions').returns(new Promise(function(resolve) { resolve([]); }));
                    _sandbox.stub(RecentActions, 'getRecentActions').returns(new Promise(function(resolve) { resolve([]); }));
                });
                [
                    {
                        description: '"Saved search" when one deleted object is selected in search context',
                        objects: [{id: 1, moName: 'Deleted', moType: 'Deleted'}],
                        savedSearchEnabled: true,
                        updateRights: false,
                        expectedActions: [
                            {
                                name: strings.saveCurrentSearch,
                                type: 'button',
                                icon: 'save'
                            }
                        ]
                    },
                    {
                        description: '"Saved search" when multiple deleted objects are selected in search context',
                        objects: [{id: 1, moName: 'Deleted', moType: 'Deleted'},{id: 2, moName: 'Deleted', moType: 'Deleted'}],
                        savedSearchEnabled: true,
                        updateRights: false,
                        expectedActions: [
                            {
                                name: strings.saveCurrentSearch,
                                type: 'button',
                                icon: 'save'
                            }
                        ]
                    },
                    {
                        description: '"Saved Search" when multiple valid objects are selected with one deleted in search context',
                        objects: [
                            {id: 1, moName: 'LTE02ERBS00001', moType: 'MeContext'},
                            {id: 2, moName: 'LTE02ERBS00002', moType: 'NetworkElement'},
                            {id: 3, moName: 'Deleted', moType: 'Deleted'}],
                        savedSearchEnabled: true,
                        updateRights: false,
                        expectedActions: [
                            {
                                name: strings.saveCurrentSearch,
                                type: 'button',
                                icon: 'save'
                            }
                        ]
                    },
                    {
                        description: '"Saved search" and "Add to collection" when one object is selected in search context',
                        objects: [{id: 1,fullMoType: 'mustHaveAType'}],
                        savedSearchEnabled: true,
                        updateRights: false,
                        expectedActions: [
                            {
                                name: strings.saveCurrentSearch,
                                type: 'button',
                                icon: 'save'
                            },
                            {
                                name: strings.addToCollection,
                                type: 'button',
                                icon: 'addToFolder'
                            }
                        ]
                    },
                    {
                        description: '"Saved search" and "Add to collection" when more than one object are selected in search context',
                        objects: [{id: 1,fullMoType: 'mustHaveAType'},{id: 2,fullMoType: 'mustHaveAType'}],
                        savedSearchEnabled: true,
                        updateRights: false,
                        expectedActions: [
                            {
                                name: strings.saveCurrentSearch,
                                type: 'button',
                                icon: 'save'
                            },
                            {
                                name: strings.addToCollection,
                                type: 'button',
                                icon: 'addToFolder'
                            }
                        ]
                    },
                    {
                        description: '"Remove from Collection" when one deleted object is selected in collection context',
                        objects: [{id: 1, moName: 'Deleted', moType: 'Deleted'}],
                        savedSearchEnabled: false,
                        updateRights: true,
                        recursiveValue: false,
                        expectedActions: [
                            {
                                name: strings.removeFromCollection,
                                type: 'button'
                            }
                        ]
                    },
                    {
                        description: '"Remove from Collection" when one deleted object is selected in collection context',
                        objects: [{id: 1, moName: 'Deleted', moType: 'Deleted'}],
                        savedSearchEnabled: false,
                        updateRights: true,
                        recursiveValue: false,
                        expectedActions: [
                            {
                                name: strings.removeFromCollection,
                                type: 'button'
                            }
                        ]
                    },
                    {
                        description: '"Remove from Collection" when more than one deleted object is selected in collection context',
                        objects: [{id: 1, moName: 'Deleted', moType: 'Deleted'},{id: 2, moName: 'Deleted', moType: 'Deleted'}],
                        savedSearchEnabled: false,
                        updateRights: true,
                        recursiveValue: false,
                        expectedActions: [
                            {
                                name: strings.removeFromCollection,
                                type: 'button'
                            }
                        ]
                    },
                    {
                        description: '"Remove from Collection" when multiple valid objects are selected with one deleted in collection context',
                        objects: [
                            {id: 1, moName: 'LTE02ERBS00001', moType: 'MeContext'},
                            {id: 2, moName: 'LTE02ERBS00002', moType: 'NetworkElement'},
                            {id: 3, moName: 'Deleted', moType: 'Deleted'}],
                        savedSearchEnabled: false,
                        updateRights: true,
                        recursiveValue: false,
                        expectedActions: [
                            {
                                name: strings.removeFromCollection,
                                type: 'button'
                            }
                        ]
                    },
                    {
                       description: 'Remove "Remove from Collection" when one object is selected in collection context',
                       objects: [{id: 1, moName: 'Deleted', moType: 'Deleted'},{id: 2, moName: 'Deleted', moType: 'Deleted'}],
                       savedSearchEnabled: false,
                       updateRights: true,
                       recursiveValue: true,
                       expectedActions: [
                           {
                               name: strings.removeFromCollection,
                               type: 'button'
                           }
                       ]
                    },
                    {
                        description: '"Add to collection" and "Remove from Collection" when one object is selected in collection context',
                        objects: [{id: 1,fullMoType: 'mustHaveAType'}],
                        savedSearchEnabled: false,
                        updateRights: true,
                        recursiveValue: false,
                        expectedActions: [
                            {
                                name: strings.addToCollection,
                                type: 'button',
                                icon: 'addToFolder'
                            },
                            {
                                name: strings.removeFromCollection,
                                type: 'button'
                            }
                        ]
                    },
                    {
                        description: '"Add to collection" and "Remove from Collection" when more than one object is selected in collection context',
                        objects: [{id: 1,fullMoType: 'mustHaveAType'},{id: 2,fullMoType: 'mustHaveAType'}],
                        savedSearchEnabled: false,
                        updateRights: true,
                        recursiveValue: false,
                        expectedActions: [
                            {
                                name: strings.addToCollection,
                                type: 'button',
                                icon: 'addToFolder'
                            },
                            {
                                name: strings.removeFromCollection,
                                type: 'button'
                            }
                        ]
                    }
                ].forEach(function(test) {
                    it('should add: ' + test.description, function(done) {
                        // ARRANGE
                        classUnderTest.resultsData.isSavedSearchEnabled.returns(test.savedSearchEnabled);
                        classUnderTest.resultsData.userHasUpdateRights.returns(test.updateRights);
                        classUnderTest.resultsData.recursiveValue =false;
                        // ACT
                        classUnderTest.getActions(test.objects, function(results) {
                            // ASSERT
                            expect(results.actionBar.length).to.equal(test.expectedActions.length);
                            results.actionBar.forEach(function(action) {
                                expect(action.icon).to.equal(test.expectedActions[index].icon);
                                expect(action.name).to.equal(test.expectedActions[index].name);
                                expect(action.type).to.equal(test.expectedActions[index++].type);
                            });
                            done();
                        });
                    });
                });

                [
                    {
                        description: 'no action when one deleted object is selected in collection context based on Search Criteria',
                        objects: [{id: 1, moName: 'Deleted', moType: 'Deleted'}],
                        savedSearchEnabled: false,
                        updateRights: true
                    },
                    {
                        description: 'no action when more than one deleted object is selected in collection context based on Search Criteria',
                        objects: [{id: 1, moName: 'Deleted', moType: 'Deleted'},{id: 2, moName: 'Deleted', moType: 'Deleted'}],
                        savedSearchEnabled: false,
                        updateRights: true
                    },
                    {
                        description: 'no action when multiple valid objects are selected with one deleted in collection context based on Search Criteria',
                        objects: [
                            {id: 1, moName: 'LTE02ERBS00001', moType: 'MeContext'},
                            {id: 2, moName: 'LTE02ERBS00002', moType: 'NetworkElement'},
                            {id: 3, moName: 'Deleted', moType: 'Deleted'}],
                        savedSearchEnabled: false,
                        updateRights: true
                    }
                ].forEach(function(test) {
                    it('should add: ' + test.description, function(done) {
                        // ARRANGE
                        classUnderTest.resultsData.isSavedSearchEnabled.returns(test.savedSearchEnabled);
                        classUnderTest.resultsData.userHasUpdateRights.returns(test.updateRights);
                        classUnderTest.resultsData.getCurrentSearchData.returns({id: '456', subType: 'SEARCH_CRITERIA'});
                        // ACT
                        classUnderTest.getActions(test.objects, function(results) {
                            // ASSERT
                            expect(results.actionBar).to.deep.equal([]);
                            expect(results.contextMenu).to.deep.equal([]);
                            done();
                        });
                    });
                });
            });

            describe('Actions Framework', function() {
                describe('should skip creating the MetaObject when', function() {
                    beforeEach(function() {
                        _sandbox.stub(ActionLibrary, 'createMetaObject');
                    });
                    // ARRANGE
                    [
                        {
                            description: 'a single deleted object is selected',
                            objects: [{id: 1, moType: 'Deleted', moName: 'Deleted'}]
                        },
                        {
                            description: 'multiple delted objects are selected',
                            objects: [{id: 1, moType: 'Deleted', moName: 'Deleted'}, {id: 2, moType: 'Deleted', moName: 'Deleted'}]
                        },
                        {
                            description: 'multiple different objects are selected but some are deleted',
                            objects: [
                                {id: 1, fullMoType: 'MeContext', moType: 'MeContext', attributes: {neType: 'RadioNode'}},
                                {id: 2, moName: 'Deleted', moType: 'Deleted'},
                                {id: 3, fullMoType: 'NetworkElement', moType: 'NetworkElement', attributes: {neType: 'ERBS'}},
                                {id: 4, moName: 'Deleted', moType: 'Deleted'}
                            ]
                        }
                    ].forEach(function(test) {
                        it(test.description , function(done) {
                            // ACT
                            classUnderTest.getActions(test.objects, function() {
                                // ASSERT
                                expect(ActionLibrary.createMetaObject.callCount).to.eq(0);
                                done();
                            });
                        });
                    });
                });
                describe('should create the MetaObject when', function() {
                    beforeEach(function() {
                        _sandbox.spy(ActionLibrary, 'createMetaObject');
                        _sandbox.stub(ActionLibrary, 'getAvailableActions').returns(new Promise(function(resolve) { resolve([]); }));
                        _sandbox.stub(RecentActions, 'getRecentActions').returns(new Promise(function(resolve) { resolve([]); }));
                    });
                    [
                        {
                            description: 'a single object is selected but only id is known about object',
                            objects: [{id: '123'}],
                            expectedObjects: [{id: '123'}]
                        },
                        {
                            description: 'a single object is selected',
                            objects: [{fullMoType: 'MeContext', moType: 'MeContext', attributes: {neType: 'ERBS'}}],
                            expectedObjects: [{fullMoType: 'MeContext', moType: 'MeContext', attributes: {neType: 'ERBS'}}]
                        },
                        {
                            description: 'multiple different objects are selected',
                            objects: [
                                {fullMoType: 'MeContext', moType: 'MeContext', attributes: {neType: 'RadioNode'}},
                                {fullMoType: 'NetworkElement', moType: 'NetworkElement', attributes: {neType: 'ERBS'}}
                            ],
                            expectedObjects: [
                                {fullMoType: 'MeContext', moType: 'MeContext', attributes: {neType: 'RadioNode'}},
                                {fullMoType: 'NetworkElement', moType: 'NetworkElement', attributes: {neType: 'ERBS'}}
                            ]
                        }
                    ].forEach(function(test) {
                        it(test.description, function(done) {
                            // ACT
                            classUnderTest.getActions(test.objects, function() {
                                // ASSERT
                                expect(ActionLibrary.createMetaObject.getCall(0).calledWith(
                                    'networkexplorer',
                                    'ManagedObject',
                                    test.expectedObjects
                                ));
                                done();
                            });
                        });
                    });
                });

                describe('should call transformActions with objects with a defined id when', function() {
                    it('selected objects are a mix of POs with id and poId, and objects with id and type', function(done) {
                        // ARRANGE
                        _sandbox.spy(ActionLibrary, 'createMetaObject');
                        _sandbox.stub(ActionLibrary, 'getAvailableActions').returns(new Promise(function(resolve) { resolve([]); }));
                        _sandbox.stub(RecentActions, 'getRecentActions').returns(new Promise(function(resolve) { resolve([]); }));
                        var objects = [{
                            id: '1234',
                            type: 'MeContext'
                        }, {
                            poId: '5678',
                            id: '5678',
                            fullMoType: 'MeContext',
                            moName: 'LTE02ERBS00001'
                        }];
                        _sandbox.spy(classUnderTest, 'transformActions');

                        // ACT
                        classUnderTest.getActions(objects, function() {
                            // ASSERT
                            expect(classUnderTest.transformActions.callCount).to.equal(1);
                            expect(classUnderTest.transformActions.getCall(0).args[1]).to.deep.equal([{id: '1234'}, {id: '5678'}]);
                            done();
                        });
                    });
                });
            });
        });

        describe('updateDefaultActions()', function() {
            it('should add saved search action', function() {
                // ARRANGE
                _sandbox.stub(classUnderTest, 'createSave');
                classUnderTest.resultsData.isSavedSearchEnabled.returns(true);
                // ACT
                classUnderTest.updateDefaultActions();
                // ASSERT
                expect(classUnderTest.context.eventBus.publish.callCount).to.equal(1);
                expect(classUnderTest.context.eventBus.publish.getCall(0).calledWith(
                    'topsection:defaultactions', [{
                        name: strings.get('saveCurrentSearch'),
                        action: classUnderTest.createSave.bind(this),
                        type: 'button',
                        icon: 'save'
                    }]));
            });
            it('should not add the saved search action', function() {
                // ARRANGE
                classUnderTest.resultsData.isSavedSearchEnabled.returns(true);
                // ACT
                classUnderTest.updateDefaultActions();
                expect(classUnderTest.context.eventBus.publish.callCount).to.equal(1);
                expect(classUnderTest.context.eventBus.publish.getCall(0).calledWith(
                    'topsection:defaultactions', []));
            });
        });

        describe('checkForDisabled()', function() {
            it('should call removeActionsForUnVsn', function () {
                var actions = [ { 'name': 'Monitor Alarms' }, { 'name': 'Upgrade Node Software' } ];
                classUnderTest.hasUnVsn = true;
                _sandbox.spy(classUnderTest, 'removeActionsForUnVsn');
                classUnderTest.removeActionsForUnVsn(actions);
                expect(classUnderTest.removeActionsForUnVsn.callCount).to.equal(1);
            });
        });

        describe('mergeActions()', function() {
            [{
                description: 'returns empty if both local and remote are empty',
                local: {actionBar: [], contextMenu: []},
                remote: [],
                result: []
            },{
                description: 'returns one action if local has one action and remote is empty',
                local: {actionBar: [{}], contextMenu: [{}]},
                remote: [],
                result: [{}]
            },{
                description: 'returns one action if local is empty and remote has one action',
                local: {actionBar: [], contextMenu: []},
                remote: [{}],
                result: [{}]
            },{
                description: 'returns two actions with a separator if local has one action and remote has one action',
                local: {actionBar: [{}], contextMenu: [{}]},
                remote: [{}],
                result: [{},{type: 'separator'},{}]
            },{
                description: 'returns three actions with a separator between each if local has one action and remote has two actions of different categories',
                local: {actionBar: [{}], contextMenu: [{}]},
                remote: [{category: 'categoryA'},{category: 'categoryB'}],
                result: [{},{type: 'separator'},{category: 'categoryA'},{type: 'separator'},{category: 'categoryB'}]
            },{
                description: 'returns three actions with a separator between local and remote if local has one action and remote has two actions of same categories',
                local: {actionBar: [{}], contextMenu: [{}]},
                remote: [{category: 'categoryA'},{category: 'categoryA'}],
                result: [{},{type: 'separator'},{category: 'categoryA'},{category: 'categoryA'}]
            },{
                description: 'returns six actions with a separator between local and remote actions of different categories if local has two actions and remote has four actions of various categories',
                local: {actionBar: [{}, {}], contextMenu: [{}, {}]},
                remote: [{category: 'categoryA'},{category: 'categoryB'},{category: 'categoryB'},{category: 'categoryC'}],
                result: [{},{},{type: 'separator'},{category: 'categoryA'},{type: 'separator'},{category: 'categoryB'},{category: 'categoryB'},{type: 'separator'},{category: 'categoryC'}]
            }].forEach(function(test) {
                it(test.description, function() {
                    // ACT
                    var result = classUnderTest.mergeActions(test.local, test.remote);
                    // ASSERT
                    expect(result.actionBar).to.deep.equal(test.result);
                });
            });
        });

        describe('reset()', function() {
            it('should reset the visible actions', function() {
                // ACT
                classUnderTest.reset();
                // ASSERT
                expect(classUnderTest.context.eventBus.publish.callCount).to.equal(2);
                expect(classUnderTest.context.eventBus.publish.getCall(0).calledWith('topsection:defaultactions', [])).to.equal(true);
                expect(classUnderTest.context.eventBus.publish.getCall(1).calledWith('topsection:leavecontext')).to.equal(true);
            });
        });

        describe('onActionFail()', function() {
            it('should show error dialog', function() {
                // ARRANGE
                var action = {
                    defaultLabel: 'TestAction'
                };
                var actionResult = {
                    message: 'Some error message'
                };
                _sandbox.stub(Dialog.prototype, 'init');
                _sandbox.stub(Dialog.prototype, 'show');
                // ACT
                classUnderTest.onActionFail(action, actionResult);
                // ASSERT
                expect(Dialog.prototype.init.callCount).to.equal(1);
                expect(Dialog.prototype.init.getCall(0).calledWithMatch({
                    header: strings.get('actionLaunchErrorHeader'),
                    content: strings.get('actionLaunchErrorContent').replace('$1', action.defaultLabel),
                    optionalContent: actionResult.message,
                    type: 'error'
                })).to.equal(true);
                expect(Dialog.prototype.show.callCount).to.equal(1);
            });
        });

        describe('createSave()', function() {
            it('should create the saved search flyout', function() {
                // ARRANGE
                const SEARCH_TERM = 'searchTerm';
                classUnderTest.resultsData.getSearchTerm.returns(SEARCH_TERM);
                _sandbox.stub(SaveSearch, 'action');
                // ACT
                classUnderTest.createSave();
                // ASSERT
                expect(SaveSearch.action.callCount).to.equal(1);
                expect(SaveSearch.action.getCall(0).calledWithMatch({context: classUnderTest.context, searchTerm: SEARCH_TERM})).to.equal(true);
            });
        });

        describe('handleAddToCollectionAction()', function() {
            it('should launch the "Add to Collection" Action', function() {
                // ARRANGE
                _sandbox.stub(classUnderTest, 'launchAction');
                classUnderTest.objects = [{id: '1'}];
                // ACT
                classUnderTest.handleAddToCollectionAction();
                // ASSERT
                expect(classUnderTest.launchAction.callCount).to.equal(1);
                expect(classUnderTest.launchAction.getCall(0).calledWithMatch({
                    plugin: 'networkexplorer/networkexplorer-add-to-collection'
                }, classUnderTest.objects)).to.equal(true);
            });
        });

        describe('handleRemoveFromCollectionAction()', function() {
            it('should remove objects from the current collection', function() {
                // ARRANGE
                classUnderTest.objects = [{id: '123'}];
                _sandbox.stub(ObjectConfigurationApi, 'removeObjects');
                classUnderTest.resultsData.getCurrentSearchData.returns({id: '456', subType: 'SEARCH_CRITERIA'});
                _sandbox.stub(classUnderTest, 'handleCollectionHandlerOperationDone');
                _sandbox.stub(classUnderTest, 'handleSubmitError');
                // ACT
                classUnderTest.handleRemoveFromCollectionAction();
                // ASSERT
                expect(ObjectConfigurationApi.removeObjects.callCount).to.equal(1);
                expect(ObjectConfigurationApi.removeObjects.getCall(0).calledWith({
                    collection: {
                        id: '456'
                    },
                    objects: '123',
                    onSuccess: classUnderTest.handleCollectionHandlerOperationDone.bind(classUnderTest),
                    onFailure: classUnderTest.handleSubmitError.bind(classUnderTest)
                }));
            });
        });

        describe('handleCollectionHandlerOperationDone()', function() {
            it('should publish "CollectionHandler:showToastForRemove" event', function() {
                // ARRANGE
                var id = '456';
                classUnderTest.resultsData.getCurrentSearchData.returns({id: id});
                // ACT
                classUnderTest.handleCollectionHandlerOperationDone('label');
                // ASSERT
                expect(classUnderTest.context.eventBus.publish.callCount).to.equal(2);
                expect(classUnderTest.context.eventBus.publish.getCall(0).calledWith('CollectionHandler:showToastForRemove', {
                    label: 'label',
                    color: 'green',
                    icon: 'tick',
                    showAsToast: true,
                    showCloseButton: true,
                    removeCollection: true
                })).to.equal(true);
                expect(classUnderTest.context.eventBus.publish.getCall(1).calledWith(
                    'NetworkExplorer:collectionHash', id, undefined, undefined, true)).to.equal(true);
            });
        });

        describe('publishCollectionIsSaved()', function() {
            it('should publish event for collection saved and to display saved toast', function() {
                // ARRANGE
                const SAVED_ENTITY_TYPE = 'savedEntityType';
                // ACT
                classUnderTest.publishCollectionIsSaved(SAVED_ENTITY_TYPE);
                // ARRANGE
                expect(classUnderTest.context.eventBus.publish.callCount).to.equal(2);
                expect(classUnderTest.context.eventBus.publish.getCall(0).calledWith(
                    'Results:entityCreated', SAVED_ENTITY_TYPE)).to.equal(true);
                expect(classUnderTest.context.eventBus.publish.getCall(1).calledWith(
                    'Results:showToast', {
                        label: 'Saved',
                        color: 'green',
                        icon: 'tick',
                        showAsToast: true,
                        showCloseButton: true
                    })).to.equal(true);
            });
        });

        describe('handleSubmitError()', function() {
            beforeEach(function() {
                classUnderTest.getErrorMessage = function() {};
            });
            it('should provide editCollectionErrorBody error message for error code 10007', function() {
                _sandbox.stub(classUnderTest.errorHandler, 'getErrorMessage', function() {
                    return {
                        internalErrorCode: 10007
                    };
                });
                // ACT
                classUnderTest.handleSubmitError();
                // ASSERT
                expect(classUnderTest.context.eventBus.publish.callCount).to.equal(1);
                expect(classUnderTest.context.eventBus.publish.getCall(0).calledWith('CollectionHandler:showErrorDialog', {
                    header: strings.removeError,
                    content: strings.editCollectionErrorBody
                })).to.equal(true);
            });
            it('should provide error message from xhr for any other error code', function() {
                var errorMessage = 'errorMessage';
                _sandbox.stub(classUnderTest.errorHandler, 'getErrorMessage', function() {
                    return {
                        internalErrorCode: 123456,
                        userMessage: {
                            body: errorMessage
                        }
                    };
                });
                // ACT
                classUnderTest.handleSubmitError();
                // ASSERT
                expect(classUnderTest.context.eventBus.publish.callCount).to.equal(1);
                expect(classUnderTest.context.eventBus.publish.getCall(0).calledWith('CollectionHandler:showErrorDialog', {
                    header: strings.removeError,
                    content: errorMessage
                })).to.equal(true);
            });
        });
    });
});
