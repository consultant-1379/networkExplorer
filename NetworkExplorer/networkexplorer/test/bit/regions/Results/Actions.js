/*global define, describe, it, expect */
define([
    'test/bit/bitPromises',
    'jscore/core',
    'container/api',
    'test/resources/cssNamespaces',
    'test/resources/user_input_data',
    'test/resources/Grammar_scenario1',
    'test/resources/restMock/REST_action_matches',
    'test/resources/restMock/REST_results',
    'test/resources/restMock/REST_ui_settings',
    'test/resources/restMock/REST_landscape_base',
    'test/resources/restMock/REST_landscape_scenario2',
    'test/resources/restMock/REST_collection_scenarios',
    'test/resources/restMock/REST_savedSearch_scenarios',
    'test/resources/restMock/REST_topologyCollections',
    'test/resources/restMock/REST_object_configuration',
    'test/resources/restMock/data/settingsColumns',
    'networkexplorerlib/regions/Results',
    'src/networkexplorer/NetworkExplorer',
    'actionlibrary/ActionLibrary',
    'actionlibrary/RecentActions',
    'test/bit/viewmodels/NetworkExplorerViewModel',
    'test/bit/viewmodels/ResultsViewModel',
    'test/resources/restMock/data/type_MeContext',
    'test/resources/restMock/data/managedObjects/search/v2/query/getXMeContexts',
    'test/resources/restMock/data/managedObjects/search/v2/query/getXEUtranCellFDD',
    'test/resources/restMock/data/managedObjects/search/v2/query/SingleDeletedObject',
    'test/resources/restMock/data/managedObjects/search/v2/query/MultipleDeletedObjects',
    'test/resources/restMock/data/managedObjects/search/v2/query/SingleMeContext',
    'test/resources/restMock/data/managedObjects/search/v2/query/getIdsFromResponseObject',
    'test/resources/restMock/data/rest/v1/apps/action-matches/_functions',
    'test/resources/restMock/data/managedObjects/getPosByPoids/_functions',
    'test/resources/restMock/data/managedObjects/getPosByPoids/SingleDeletedObject',
    'test/resources/restMock/data/managedObjects/getPosByPoids/MultipleDeletedObjects',
    'test/resources/restMock/data/managedObjects/getPosByPoids/SingleMeContext',
    'i18n!networkexplorer/Results.json'
], function(
    promises,
    core,
    Container,
    css,
    user,
    Grammar_scenario1,
    REST_action_matches,
    REST_results,
    REST_ui_settings,
    REST_landscape_base,
    REST_scenario2,
    REST_collection_scenarios,
    REST_savedSearch_scenarios,
    REST_topologyCollections,
    REST_object_configuration,
    settingsColumns,
    ResultsRegion,
    NetworkExplorerApp,
    ActionLibrary,
    RecentActions,
    NetworkExplorerViewModel,
    ResultsViewModel,
    meContextResponse,
    getXMeContexts,
    getXEUtranCellFDD,
    SingleDeletedObject,
    MultipleDeletedObjects,
    SingleMeContext,
    getIdsFromResponseObject,
    actionMatches,
    getPosByPoids,
    SingleDeletedObjectGetPosByPoIds,
    MultipleDeletedGetPosByPoIds,
    SingleMeContextGetPosByPoIds,
    strings
) {
    'use strict';
    describe('bit/regions/Results/Actions.js', function() {
        var server, currentApp, _sandbox;

        beforeEach(function(done) {
            window.location.hash = '';
            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            server = _sandbox.server;
            server.autoRespond = true;
            server.respondImmediately = true;
            Grammar_scenario1.applyScenario(server);
            REST_ui_settings.respondToNetworkExplorerFavorites(server);
            _sandbox.stub(RecentActions, 'getRecentActions').returns(new Promise(function(resolve) { resolve([]); }));
            REST_object_configuration.respondToCollectionListV3(server);
            REST_topologyCollections.respondToSavedSearchesList(server);
            REST_landscape_base.applyScenario(server);
            REST_results.respondToSearchQuery(server, user.user1.query.EUtranCellFDD.value, 200, getXEUtranCellFDD(30));
            REST_savedSearch_scenarios.applyScenario(server);
            REST_topologyCollections.respondToSavedSearch(server, {
                'type': 'SavedSearch',
                'poId': '281474976794230',
                'name': 'SavedSearch_Test3te0uqmecrvuc3auiopjmqdeef7',
                'searchQuery': user.user1.query.MeContext.value,
                'attributes': {
                    'searchQuery': user.user1.query.MeContext.value,
                    'timeCreated': '1437394464306',
                    'category': 'Public',
                    'name': 'SavedSearch_Test3te0uqmecrvuc3auiopjmqdeef7',
                    'userId': 'topCollectionUser02'
                },
                'deletable': false
            });
            var poIdList = ['1','2','3','4','5'].map(function(obj) { return {id: obj}; });
            REST_object_configuration.respondToGetCollectionDefaultSortV3(server, '333333333333333333333', {
                'id': '333333333333333333333',
                'name': 'Collection_ContextualActions_A',
                'category': 'Private',
                'userId': 'administrator',
                'timeCreated': '1437482551896',
                'readOnly': false,
                'permissions': {'update': true, 'delete': true},
                'objects': poIdList
            });
            REST_object_configuration.respondToGetCollectionDefaultSortV3(server, '444444444444444444444', {
                'id': '444444444444444444444',
                'name': 'Collection_ContextualActions_B',
                'category': 'Private',
                'userId': 'administrator',
                'timeCreated': '1437482551896',
                'readOnly': false,
                'permissions': {'update': true, 'delete': true},
                'objects': poIdList
            });
            var options = {
                breadcrumb: [
                    {
                        name: 'ENM',
                        url: '#networkexplorer'
                    }, {
                        children: [{
                            name: 'Collections',
                            url: '#networkexplorer/collections'
                        }, {
                            name: 'Saved Searches',
                            url: '#networkexplorer/savedsearches'
                        }],
                        name: 'Network Explorer',
                        url: '#networkexplorer'
                    }
                ]
            };
            _sandbox.stub(core.Window, 'getProperty').withArgs('innerHeight').returns(1080);
            currentApp = new NetworkExplorerApp(options);
            // start application.
            currentApp.start(document.getElementById('bitContainer'));
            done();
        });
        afterEach(function() {
            currentApp.stop();
            REST_results.reset();
            REST_collection_scenarios.reset();
            REST_savedSearch_scenarios.reset();
            REST_object_configuration.reset();
            _sandbox.restore();
        });

        describe('When navigating between different URLs', function() {
            this.timeout(8000);
            var goto = '?goto=testApp&returnType=singleObject';
            [
                {
                    from: 'a search query',
                    fromUrl: '#networkexplorer/search/MeContext',
                    to: 'a different search query',
                    toUrl: '#networkexplorer/search/EUtranCellFDD',
                    expectedItemsInitially: 1,//Save
                    expectedItemsBeforeLoadStarted: 2, //Save,+Coll
                    managedObjectsAreUnselectedAfterLoad: true,
                    expectedItemsAfterLoadFinished: 1, //Save
                    expectedItemsFinally: 2 //Save,+Coll
                },
                {
                    from: 'a search query',
                    fromUrl: '#networkexplorer/search/MeContext',
                    to: 'a saved search',
                    toUrl: '#networkexplorer/savedsearch/111111111111111111111',
                    expectedItemsInitially: 1, //Save
                    expectedItemsBeforeLoadStarted: 2, //Save,+Coll
                    managedObjectsAreUnselectedAfterLoad: true,
                    expectedItemsAfterLoadFinished: 1, //Save
                    expectedItemsFinally: 2 //Save,+Coll
                },
                {
                    from: 'a search query',
                    fromUrl: '#networkexplorer/search/MeContext',
                    to: 'a collection',
                    toUrl: '#networkexplorer/collection/333333333333333333333',
                    expectedItemsInitially: 1, //Save
                    expectedItemsBeforeLoadStarted: 2, //Save,+Coll
                    managedObjectsAreUnselectedAfterLoad: true,
                    expectedItemsAfterLoadFinished: 0,
                    expectedItemsFinally: 2 //+Coll,-Coll
                },
                {
                    from: 'a saved search',
                    fromUrl: '#networkexplorer/savedsearch/111111111111111111111',
                    to: 'a search query',
                    toUrl: '#networkexplorer/search/EUtranCellFDD',
                    expectedItemsInitially: 1,//Save
                    expectedItemsBeforeLoadStarted: 2, //Save,+Coll
                    managedObjectsAreUnselectedAfterLoad: true,
                    expectedItemsAfterLoadFinished: 1, //Save
                    expectedItemsFinally: 2 //Save,+Coll
                },
                {
                    from: 'a saved search',
                    fromUrl: '#networkexplorer/savedsearch/111111111111111111111',
                    to: 'a different saved search',
                    toUrl: '#networkexplorer/savedsearch/222222222222222222222',
                    expectedItemsInitially: 1, //Save
                    expectedItemsBeforeLoadStarted: 2, //Save,+Coll
                    managedObjectsAreUnselectedAfterLoad: true,
                    expectedItemsAfterLoadFinished: 1, //Save
                    expectedItemsFinally: 2 //Save,+Coll
                },
                {
                    from: 'a saved search',
                    fromUrl: '#networkexplorer/savedsearch/111111111111111111111',
                    to: 'a collection',
                    toUrl: '#networkexplorer/collection/333333333333333333333',
                    expectedItemsInitially: 1, //Save
                    expectedItemsBeforeLoadStarted: 2, //Save,+Coll
                    managedObjectsAreUnselectedAfterLoad: true,
                    expectedItemsAfterLoadFinished: 0,
                    expectedItemsFinally: 2 //+Coll,Remove From Collection
                },
                {
                    from: 'a collection',
                    fromUrl: '#networkexplorer/collection/333333333333333333333',
                    to: 'a search query',
                    toUrl: '#networkexplorer/search/EUtranCellFDD',
                    expectedItemsInitially: 0,
                    expectedItemsBeforeLoadStarted: 2, //+Coll,Remove From Collection
                    managedObjectsAreUnselectedAfterLoad: true,
                    expectedItemsAfterLoadFinished: 1, //Save
                    expectedItemsFinally: 2 //Save,+Coll
                },
                {
                    from: 'a collection',
                    fromUrl: '#networkexplorer/collection/333333333333333333333',
                    to: 'a saved search',
                    toUrl: '#networkexplorer/savedsearch/111111111111111111111',
                    expectedItemsInitially: 0,
                    expectedItemsBeforeLoadStarted: 2, //+Coll,Remove From Collection
                    managedObjectsAreUnselectedAfterLoad: true,
                    expectedItemsAfterLoadFinished: 1, //Save
                    expectedItemsFinally: 2 //Save,+Coll
                },
                {
                    from: 'a collection',
                    fromUrl: '#networkexplorer/collection/333333333333333333333',
                    to: 'a different collection',
                    toUrl: '#networkexplorer/collection/444444444444444444444',
                    expectedItemsInitially: 0,
                    expectedItemsBeforeLoadStarted: 2, //+Coll,Remove From Collection
                    managedObjectsAreUnselectedAfterLoad: true,
                    expectedItemsAfterLoadFinished: 0,
                    expectedItemsFinally: 2 //+Coll,Remove From Collection
                }
            ].forEach(function(testCase) {
                describe(testCase.from + ' to ' + testCase.to + ' then the Context Bar should contain', function() {
                    it(testCase.expectedItemsBeforeLoadStarted + ' items initially and ' +
                        testCase.expectedItemsFinally + ' items finally', function(done) {
                        REST_results.respondToSearchQuery(server, user.user1.query.MeContext.value, 200, getXMeContexts(10));
                        REST_action_matches.respondToActionMatches(server);
                        window.location.hash = testCase.fromUrl + goto;
                        promises.runTestSteps([
                            ResultsViewModel.getDefaultActionButtons, //get initial default actions
                            function(defaultItems) {
                                expect(defaultItems.length).to.eql(testCase.expectedItemsInitially);
                                return NetworkExplorerViewModel.getReturnButton();
                            },
                            function(returnButton) {
                                expect(returnButton[0].disabled).to.equal(true); // Return button should be disabled initially
                                return ResultsViewModel.getTableBody();  //wait for Results to load
                            },
                            ResultsViewModel.getTableCheckboxesWithParent,
                            function(checkboxes) {
                                return promises.clickElement(checkboxes[2]); //select an MO
                            },
                            NetworkExplorerViewModel.getReturnButton,
                            ResultsViewModel.waitForButtonToBeEnabled,
                            ResultsViewModel.getContextActionButtons, //get selected context actions
                            function(contextItems) {
                                expect(contextItems.length).to.eql(testCase.expectedItemsBeforeLoadStarted);
                                server.respondImmediately = false;
                                server.autoRespondAfter = 500; //delay ajax requests
                                return promises.hashChange(testCase.toUrl + goto);
                            },
                            NetworkExplorerViewModel.getReturnButton,
                            ResultsViewModel.waitForButtonToBeDisabled,
                            ResultsViewModel.getTableBody, //wait for Results to load
                            ResultsViewModel.getDefaultActionButtons, //get loading context actions
                            function(defaultItems) {
                                expect(defaultItems.length).to.eql(testCase.expectedItemsAfterLoadFinished);
                                server.autoRespondAfter = 0;
                                server.respondImmediately = true;
                                return ResultsViewModel.getTableBody();
                            },
                            ResultsViewModel.getTableCheckboxesWithParent, //wait for Results to load
                            function(checkboxes) {
                                if (testCase.managedObjectsAreUnselectedAfterLoad) {
                                    return promises.clickElement(checkboxes[2]); //select an MO
                                } else {
                                    return Promise.resolve(); //MO is still selected
                                }
                            },
                            NetworkExplorerViewModel.getReturnButton,
                            ResultsViewModel.waitForButtonToBeEnabled,
                            ResultsViewModel.getContextActionButtons, //get post loading context actions
                            function(contextItems) {
                                expect(contextItems.length).to.eql(testCase.expectedItemsFinally);
                                done();
                            }
                        ]);
                    });
                });
            });
        });

        describe('Actions Framework', function() {
            [{
                description: 'When no Actions are returned by the framework only local actions appear in the Action Bar',
                actions: {actions: []},
                assertOnContextActionButtons: function(contextItems) {
                    expect(contextItems.length).to.eql(2);
                }
            },{
                description: 'A single Action returned by the framework appears in the Action Bar',
                actions: actionMatches.generateResponse([{
                    defaultLabel: 'Browse node model'
                }]),
                assertOnContextActionButtons: function(contextItems) {
                    expect(contextItems.length).to.eql(3);
                    expect(contextItems[contextItems.length - 1].textContent).to.eql('Browse node model');
                }
            },{
                description: 'Multiple Actions returned by the framework appears in the Action Bar',
                actions: actionMatches.generateResponse([{
                    defaultLabel: 'Action 1'
                },{
                    defaultLabel: 'Action 2'
                }]),
                assertOnContextActionButtons: function(contextItems) {
                    expect(contextItems.length).to.eql(4);
                    expect(contextItems[contextItems.length - 2].textContent).to.eql('Action 1');
                    expect(contextItems[contextItems.length - 1].textContent).to.eql('Action 2');
                }
            }].forEach(function(test) {
                it(test.description, function(done) {
                    this.timeout(8000);
                    REST_results.respondToSearchQuery(server, user.user1.query.MeContext.value, 200, getXMeContexts(10));
                    REST_action_matches.respondToActionMatches(server, test.actions);
                    promises.runTestSteps([
                        function() {
                            return promises.hashChange('#networkexplorer/search/MeContext');
                        },
                        ResultsViewModel.getTableBodyCheckboxes,  //wait for Results to load
                        function(checkboxes) {
                            return promises.clickElement(checkboxes[0]); //select an MO
                        },
                        ResultsViewModel.getContextActionButtons, //get selected context actions
                        test.assertOnContextActionButtons
                    ].concat(done));
                });
            });
            describe('Actions are cached', function() {
                var launchActionOriginal, launchActionSpy;
                beforeEach(function() {
                    launchActionOriginal = currentApp.slidingPanels.options.main.content.Results.actionManager.launchAction;
                    launchActionSpy = sinon.spy();
                    currentApp.slidingPanels.options.main.content.Results.actionManager.launchAction = launchActionSpy;
                });
                it('each cached Action should always be called with the current objects selected' , function(done) {
                    this.timeout(8000);
                    REST_results.respondToSearchQuery(server, user.user1.query.MeContext.value, 200, getXMeContexts(10));
                    REST_action_matches.respondToActionMatches(server, actionMatches.generateResponse([{
                        defaultLabel: 'demoAction'
                    }]));
                    promises.runTestSteps([
                        function() {
                            return promises.hashChange('#networkexplorer/search/MeContext');
                        },
                        ResultsViewModel.getTableBodyCheckboxes, //wait for Results to load
                        function(checkboxes) {
                            return promises.clickElement(checkboxes[0]); //select an MO
                        },
                        ResultsViewModel.getContextActionButtons, //get selected context actions
                        function(buttons) {
                            return promises.clickElement(buttons[buttons.length - 1]); //click last action
                        },
                        function() {
                            expect(launchActionSpy.callCount).to.eql(1);
                            expect(launchActionSpy.getCall(0).args[1].length).to.eql(1);
                            return Promise.resolve();
                        },
                        ResultsViewModel.getTableBodyCheckboxes,
                        function(checkboxes) {
                            return promises.clickElement(checkboxes[1]); //select another MO
                        },
                        ResultsViewModel.getContextActionButtons, //get selected context actions
                        function(buttons) {
                            return promises.clickElement(buttons[buttons.length - 1]); //click last action
                        },
                        function() {
                            expect(launchActionSpy.callCount).to.eql(2);
                            expect(launchActionSpy.getCall(1).args[1].length).to.eql(2);
                            done();
                        }
                    ]);
                });
            });

            describe('Multiple Action categories are separated in the Action Bar', function() {
                [{
                    description: 'When no remote Actions are returned by the framework, no separator should appear after the default Actions',
                    actions: {actions: []},
                    assertOnContextItems: function(contextItems, separators) {
                        // Expected number of separators
                        expect(separators.length).to.eql(0);

                        // Order the items appear on the Action Bar
                        expect(contextItems.length).to.eql(2);
                        expect(contextItems[0].textContent).to.eql('Save Search');
                        expect(contextItems[1].textContent).to.eql('Add to a Collection');
                    }
                }, {
                    description: 'When a single remote Action is returned by the framework, a single separator appears with it',
                    actions: actionMatches.generateResponse([{
                        defaultLabel: 'Browse node model'
                    }]),
                    assertOnContextItems: function(contextItems, separators) {
                        // Expected number of separators
                        expect(separators.length).to.eql(1);

                        // Order the items appear on the Action Bar
                        expect(contextItems.length).to.eql(4);
                        expect(contextItems[0].textContent).to.eql('Save Search');
                        expect(contextItems[1].textContent).to.eql('Add to a Collection');
                        expect(contextItems[2].className).to.include('elLayouts-actionBarSeparator');
                        expect(contextItems[3].textContent).to.eql('Browse node model');
                    }
                }, {
                    description: 'When multiple Action categories are returned by the framework, there will be a separator before each category',
                    actions: actionMatches.generateResponse([{
                        defaultLabel: 'Action 1',
                        category: 'Category A'
                    }, {
                        defaultLabel: 'Action 2',
                        category: 'Category B'
                    }, {
                        defaultLabel: 'Action 3',
                        category: 'Category B'
                    }, {
                        defaultLabel: 'Action 4',
                        category: 'Category C'
                    }]),
                    assertOnContextItems: function(contextItems, separators) {
                        // Expected number of separators
                        expect(separators.length).to.eql(3);

                        // Order the items appear on the Action Bar
                        expect(contextItems.length).to.eql(9);
                        expect(contextItems[0].textContent).to.eql('Save Search');
                        expect(contextItems[1].textContent).to.eql('Add to a Collection');
                        expect(contextItems[2].className).to.include('elLayouts-actionBarSeparator');
                        expect(contextItems[3].textContent).to.eql('Action 1');
                        expect(contextItems[4].className).to.include('elLayouts-actionBarSeparator');
                        expect(contextItems[5].textContent).to.eql('Action 2');
                        expect(contextItems[6].textContent).to.eql('Action 3');
                        expect(contextItems[7].className).to.include('elLayouts-actionBarSeparator');
                        expect(contextItems[8].textContent).to.eql('Action 4');
                    }
                }].forEach(function(test) {
                    it(test.description, function(done) {
                        this.timeout(8000);
                        REST_results.respondToSearchQuery(server, user.user1.query.MeContext.value, 200, getXMeContexts(10));
                        REST_action_matches.respondToActionMatches(server, test.actions);
                        promises.runTestSteps([
                            function() {
                                return promises.hashChange('#networkexplorer/search/MeContext');
                            },
                            ResultsViewModel.getTableBodyCheckboxes,  //wait for Results to load
                            function(checkboxes) {
                                return promises.clickElement(checkboxes[0]); //select an MO
                            },
                            ResultsViewModel.getActionBarContextItems, //get selected context separators
                            function(contextItems) {
                                var separators = [].slice.call(contextItems).filter(function(element) {
                                    return element.className === 'elLayouts-actionBarSeparator';
                                });
                                test.assertOnContextItems(contextItems, separators);
                                done();
                            }
                        ]);
                    });
                });
            });
        });

        // Skip until we can integrate Container into BIT
        describe.skip('Context menu contains actions', function() {
            describe('Collections', function() {
                it('The same actions as the action bar', function(done) {

                });
            });
            describe('Search', function() {
                it('The "Save Search" action appears in the action bar but not the Context menu', function(done) {
                    this.timeout(4000);
                    REST_results.respondToSearchQuery(server, user.user1.query.MeContext.value, 200, getXMeContexts(10));
                    REST_results.respondToGetPosByPoids(server, 200, getPosByPoids.generateResponse({ poList: getIdsFromResponseObject(getXMeContexts(10))}));
                    REST_action_matches.respondToActionMatches(server, actionMatches.generateResponse([{
                        defaultLabel: 'dummyAction'
                    }]));
                    promises.runTestSteps([
                        function() {
                            return promises.hashChange('#networkexplorer/search/MeContext');
                        },
                        ResultsViewModel.getTableBodyRows,
                        function(tableRows) {
                            return promises.rightClickElement(tableRows[0]);
                        },
                        ResultsViewModel.getContextActionButtons,
                        function(actions) {
                            expect(actions.length).to.equal(3);
                            expect(actions[actions.length - 1].textContent).to.equal('dummyAction');
                            done();
                        }
                    ]);
                });
            });
        });

        describe('When selecting a large number of objects', function() {
            it('Actions should be available after selecting a large result set', function(done) {
                this.timeout(8000);
                var tenThousandMeContexts = getXMeContexts(10000);
                REST_results.respondToSearchQuery(server, user.user1.query.MeContext.value, 200, tenThousandMeContexts);
                REST_results.respondToGetPosByPoids(server, 200, getPosByPoids.generateResponse({ poList: getIdsFromResponseObject(tenThousandMeContexts)}));
                REST_action_matches.respondToActionMatches(server, actionMatches.generateResponse([{
                    defaultLabel: 'dummyAction'
                }]));
                promises.runTestSteps([
                    function() {
                        return promises.hashChange('#networkexplorer/search/MeContext');
                    },
                    ResultsViewModel.getTableBody, //wait for Results to load
                    ResultsViewModel.getResultTableCheckboxHeader,
                    promises.clickElement,
                    ResultsViewModel.getContextActionButtons,
                    function(actions) {
                        expect(ResultsViewModel.isElementVisibleToUser(actions[actions.length - 1])).to.equal(true); // verify action button interactable
                        expect(actions[actions.length - 1].textContent).to.equal('dummyAction');
                        done();
                    }
                ]);
            });
        });

        describe('When the header checkbox is used to select 10000 objects and getPosByPoIds has only been called on the first 50 objects', function() {

            it('Actions should be executed with a defined id for every selected object', function(done) {
                this.timeout(8000);
                var tenThousandMeContexts = getXMeContexts(10000);
                REST_results.respondToSearchQuery(server, user.user1.query.MeContext.value, 200, tenThousandMeContexts);
                REST_results.respondToGetPosByPoids(server, 200, getPosByPoids.generateResponse({ poList: getIdsFromResponseObject(tenThousandMeContexts).slice(0, 50)}));
                REST_action_matches.respondToActionMatches(server, actionMatches.generateResponse([{
                    defaultLabel: 'dummyAction'
                }]));

                ActionLibrary.executeAction = function(actionItem, selectedObjects) {
                    for (var i = 0; i < selectedObjects.length; i++) {
                        expect(selectedObjects[i].id).not.to.be.undefined;
                    }
                    done();
                };

                promises.runTestSteps([
                    function() {
                        return promises.hashChange('#networkexplorer/search/MeContext');
                    },
                    ResultsViewModel.getTableBody, //wait for Results to load
                    ResultsViewModel.getResultTableCheckboxHeader,
                    promises.clickElement,
                    ResultsViewModel.getContextActionButtons,
                    function(actions) {
                        return promises.clickElement(actions[actions.length - 1]);
                    }
                ]);
            });
        });

        describe('When the Action service is unavailable', function() {
            it('The user is warned, the dialog message is shown correctly and local actions are available', function(done) {
                this.timeout(2000);
                REST_results.respondToSearchQuery(server, user.user1.query.MeContext.value, 200, getXMeContexts(10));
                REST_results.respondToGetPosByPoids(server, 200, getPosByPoids.generateResponse({ poList: getIdsFromResponseObject(getXMeContexts(10))}));
                REST_action_matches.respondToActionMatches(server, '<html content="Apache error etc." />', 404);
                promises.runTestSteps([
                    function() {
                        return promises.hashChange('#networkexplorer/search/MeContext');
                    },
                    ResultsViewModel.getTableBody, //wait for Results to load
                    ResultsViewModel.getResultTableCheckboxHeader,
                    promises.clickElement,
                    NetworkExplorerViewModel.getDialogTitle,
                    function(dialogTitle) {
                        expect(dialogTitle.textContent).to.equal(strings.actionFetchErrorHeader);
                        return NetworkExplorerViewModel.getDialogMessage();
                    },
                    function(dialogMessage) {
                        expect(dialogMessage.textContent).to.equal(strings.actionFetchErrorContent);
                        return NetworkExplorerViewModel.getDialogPrimaryButton();
                    },
                    function(okButton){
                        expect(okButton.textContent.trim()).to.equal('OK');
                        promises.clickElement(okButton);
                    },
                    ResultsViewModel.getContextActionButtons,
                    function(actions) {
                        expect(actions.length).to.equal(2); // Save Search, Add to Collection
                        done();
                    }
                ]);
            });
        });

        describe('When an Action fails to launch', function() {
            var sandbox, failingAction,
                plugin = 'failing-app',
                actionLabel = 'Launch Failing Action',
                actionMatchesResponse = {
                    plugin: plugin,
                    defaultLabel: actionLabel
                };
            beforeEach(function() {
                sandbox = sinon.sandbox.create();
                REST_results.respondToSearchQuery(server, user.user1.query.MeContext.value, 200, getXMeContexts(10));
                REST_results.respondToGetPosByPoids(server, 200, getPosByPoids.generateResponse({poList: getIdsFromResponseObject(getXMeContexts(10))}));
                REST_action_matches.respondToActionMatches(server, actionMatches.generateResponse([actionMatchesResponse]));
                sandbox.stub(ActionLibrary, 'executeAction', function(actionItem, selectedObjects, callbackObject) {
                    return failingAction.prototype.start(callbackObject, selectedObjects);
                });
            });
            afterEach(function() {
                sandbox.restore();
            });

            describe('An error dialog is shown with a message', function() {
                [
                    {
                        description: 'there is an error message reason from the action, should show default message and reason in optional message',
                        expectedErrorMessageContent: strings.actionLaunchErrorContent.replace('$1', actionLabel),
                        expectedErrorReason: 'Some reason for failure'
                    },
                    {
                        description: 'there is no error message reason from the action, should show default only',
                        expectedErrorMessageContent: strings.actionLaunchErrorContent.replace('$1', actionLabel),
                        expectedErrorReason: undefined
                    }
                ].forEach(function(test) {
                    it('when ' + test.description, function(done) {
                        this.timeout(4000);
                        failingAction = ActionLibrary.Action.extend({
                            run: function(callbackObject) {
                                var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);
                                var actionResult = new ActionLibrary.ActionResult({
                                    success: false,
                                    message: test.expectedErrorReason
                                });
                                // force action to fail with message
                                lifecycle.onFail(actionResult);
                                return lifecycle;
                            }
                        });
                        promises.runTestSteps([
                            function() {
                                return promises.hashChange('#networkexplorer/search/MeContext');
                            },
                            ResultsViewModel.getTableBody, //wait for Results to load
                            ResultsViewModel.getResultTableCheckboxHeader,
                            promises.clickElement,
                            ResultsViewModel.getContextActionButtons,
                            function(actions) {
                                var actionToLaunch = actions[actions.length - 1];
                                expect(ResultsViewModel.isElementVisibleToUser(actionToLaunch)).to.equal(true); // verify action button interactable
                                expect(actionToLaunch.textContent).to.equal(actionLabel);
                                return promises.clickElement(actionToLaunch);
                            },
                            NetworkExplorerViewModel.getDialogTitle,
                            function(dialogTitle) {
                                expect(dialogTitle.textContent).to.equal(strings.actionLaunchErrorHeader);
                                return NetworkExplorerViewModel.getDialogMessage();
                            },
                            function(dialogMessage) {
                                expect(dialogMessage.textContent).to.equal(test.expectedErrorMessageContent);
                                return NetworkExplorerViewModel.getDialogOptionalMessage();
                            },
                            function(dialogOptionalMessage) {
                                var optionalMessage = dialogOptionalMessage ? dialogOptionalMessage.textContent : dialogOptionalMessage;
                                expect(optionalMessage).to.equal(test.expectedErrorReason);
                                return NetworkExplorerViewModel.getDialogPrimaryButton();
                            },
                            function(dialogButton) {
                                expect(dialogButton.textContent).to.equal(strings.dialogOkButtonLabel);
                                promises.clickElement(dialogButton);
                                done();
                            }
                        ]);
                    });
                });
            });

        });
    });
});
