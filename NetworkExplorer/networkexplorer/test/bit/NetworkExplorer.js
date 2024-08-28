/*global define, describe, it, expect */
define([
    'jscore/core',
    'jscore/ext/net',
    'container/api',
    'test/bit/bitPromises',
    'test/resources/cssNamespaces',
    'test/resources/user_input_data',
    'test/resources/restMock/REST_results',
    'test/resources/restMock/data/managedObjects/search/v2/query/getXMeContexts',
    'test/resources/restMock/data/managedObjects/search/v2/query/getXEUtranCellFDD',
    'test/resources/restMock/data/managedObjects/search/v2/query/getIdsFromResponseObject',
    'test/resources/restMock/data/managedObjects/getPosByPoids/_functions',
    'test/resources/Grammar_scenario1',
    'test/resources/restMock/REST_nodeTypes',
    'test/resources/restMock/REST_landscape_base',
    'test/resources/restMock/REST_landscape_scenario1',
    'test/resources/restMock/REST_landscape_scenario2',
    'test/resources/restMock/REST_collection_scenarios',
    'test/resources/restMock/REST_savedSearch_scenarios',
    'test/resources/restMock/REST_ui_settings',
    'test/resources/restMock/REST_topologyCollections',
    'test/resources/restMock/REST_object_configuration',
    'test/resources/restMock/REST_action_matches',
    'src/networkexplorer/NetworkExplorer',
    'actionlibrary/RecentActions',
    'test/bit/regions/Search/searchFunctions',
    'test/bit/viewmodels/NetworkExplorerViewModel',
    'test/bit/viewmodels/ResultsViewModel',
    'test/bit/viewmodels/SlidingMenuViewModel',
    'test/bit/viewmodels/QueryBuilderViewModel',
    'test/bit/viewmodels/SearchViewModel',
    'test/bit/viewmodels/ModelDrivenComboBoxViewModel',
    'test/bit/viewmodels/SettingsViewModel',
    'test/bit/viewmodels/UISDKViewModel',
    'test/resources/restMock/data/staticCollections',
    'test/resources/restMock/data/savedSearches',
    'test/resources/restMock/data/model/nodeTypes',
    'test/resources/restMock/data/model/ENODEBtypes',
    'test/resources/restMock/data/model/MeContextChildren',
    'test/resources/restMock/data/model/MeContextAttributes',
    'test/resources/restMock/data/model/ManagedElementChildren',
    'test/resources/restMock/data/model/ManagedElementAttributes',
    'test/resources/restMock/data/model/ENodeBFunctionChildren',
    'test/resources/restMock/data/model/ENodeBFunctionAttributes',
    'test/resources/restMock/data/model/EUtranCellFDDChildren',
    'test/resources/restMock/data/model/EUtranCellFDDAttributes',
    'test/resources/restMock/data/recentActions/recentActions',
    'i18n!networkexplorerlib/QueryBuilder.json'
], function(
    core,
    net,
    containerApi,
    promises,
    css,
    user,
    REST_results,
    getXMeContexts,
    getXEUtranCellFDD,
    getIdsFromResponseObject,
    getPosByPoIds,
    Grammar_scenario1,
    REST_nodeTypes,
    REST_landscape_base,
    REST_scenario1,
    REST_scenario2,
    REST_collection_scenarios,
    REST_savedSearch_scenarios,
    REST_ui_settings,
    REST_topologyCollections,
    REST_object_configuration,
    REST_action_matches,
    NetworkExplorer,
    RecentActions,
    searchFunctions,
    NetworkExplorerViewModel,
    ResultsViewModel,
    SlidingMenuViewModel,
    QueryBuilderViewModel,
    SearchViewModel,
    ModelDrivenComboBoxViewModel,
    SettingsViewModel,
    UISDKViewModel,
    staticCollections,
    savedSearches,
    nodeTypes,
    erbsTypes,
    meContextChildren,
    meContextAttributes,
    managedElementChildren,
    managedElementAttributes,
    eNodeBFunctionChildren,
    eNodeBFunctionAttributes,
    eUtranCellFDDChildren,
    eUtranCellFDDAttributes,
    recentActionsMock,
    queryBuilderStrings
) {
    'use strict';

    /*
        Due to an issue with the UISDK loadAppModule some test functionality involving the flyout has been commented out.
        Require.js is not configured correctly and is not finding the flyout.config
        This issue occurred as part of the clientsdk update from 1.66.2 -> 1.70.1. Once the issues have been fixed, the tests can be put back in.
        Gerrit for this change: https://gerrit.ericsson.se/#/c/7479469/
     */

    describe('bit/NetworkExplorer.js', function() {

        var server, currentApp, TIMEOUT = 30000, _sandbox, recentActionsStub;
        var options = {
            breadcrumb: [{
                name: 'ENM',
                url: '#networkexplorer'
            }]
        };

        beforeEach(function() {
            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            server = _sandbox.server;
            server.autoRespond = true;
            _sandbox.stub(core.Window, 'getProperty').withArgs('innerHeight').returns(1080);
            Grammar_scenario1.applyScenario(server);
            REST_landscape_base.applyScenario(server);
            recentActionsStub = _sandbox.stub(RecentActions, 'getRecentActions');
            recentActionsStub.returns(new Promise(function(resolve) { resolve([]); }));
            REST_results.respondToSearchQuery(server, REST_scenario1.queryResponseMappings.MeContext.query, 200, getXMeContexts(50));
            REST_results.respondToSearchQuery(server, REST_scenario1.queryResponseMappings.EUtranCellFDD.query, 200, getXEUtranCellFDD(50));
            REST_results.respondToSearchQuery(server, 'select all nodes of type ERBS', 200, getXMeContexts(50));
            REST_results.respondToSearchQuery(server, 'select all objects of type NetworkElement from node type RNC', 200, getXMeContexts(50));
            REST_results.respondToGetPosByPoids(server, 200, getPosByPoIds.generateResponse({poList: getIdsFromResponseObject(getXMeContexts(20))}));
            REST_action_matches.respondToActionMatches(server);
        });

        afterEach(function() {
            currentApp.stop();
            currentApp.detach();
            currentApp = undefined;
            _sandbox.restore();
        });

        // load and init the flyout module, and preset it for showing on message 'flyout:show'
        //  todo: This is currently not working due to an issue with the UISDK containerApi.loadAppModule.
        //     See the comment at the top of this file for more info.
        var flyoutMock, flyoutId;
        var setFlyoutMock = function(document, done) {
            containerApi.loadAppModule('flyout/Flyout', function(flyout) {
                flyoutMock = new flyout();
                flyoutMock.start(document);
                flyoutId = containerApi.getEventBus().subscribe('flyout:show', function(options) {
                    options.content !== flyoutMock._uiElement && (flyoutMock.contentOnHide(),
                    flyoutMock.setHeader(options.header || ''),
                    flyoutMock.width = options.width || '400px',
                    flyoutMock.show(options));
                    done();
                }.bind(this));
            }, function (error) {
                console.log('error');
                console.log(error.requester);
                console.log(error.src);
                done(error);
            });
        };

        var stopFlyoutMock = function() {
            if(flyoutMock){
                containerApi.getEventBus().unsubscribe('flyout:show', flyoutId);
                flyoutMock.stop();
                flyoutMock = undefined;
            }
        };

        describe('When using the goto param', function() {

            beforeEach(function(done) {
                window.location.hash = '';
                REST_scenario2.applyScenario(server);
                REST_collection_scenarios.applyScenario(server);
                REST_object_configuration.respondToGetAnyCollectionV3(server, {
                    'name': 'Collection_NetworkExplorer',
                    'id': '281474988009993',
                    'category': 'Private',
                    'userId': 'administrator',
                    'timeCreated': 1437482551896,
                    'readOnly': false,
                    'objects': [{ id: '1001'}]
                });
                REST_ui_settings.respondToNetworkExplorerFavorites(server);
                REST_topologyCollections.respondToSavedSearchesList(server);

                currentApp = new NetworkExplorer(options);

                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                done();
            });

            it('Network Explorer content and scrollbar shifts up above the object actions panel when using goto and shifts back', function(done) {
                this.timeout(TIMEOUT);
                var defaultNetexHeight;
                var defaultHash = '#networkexplorer/';
                var gotoHash = '#networkexplorer/?goto=testgoto';
                window.location.hash = defaultHash;

                promises.runTestSteps([
                    NetworkExplorerViewModel.getContent,
                    function(content) {
                        defaultNetexHeight = content[0].clientHeight;
                        return promises.hashChange(gotoHash);
                    },
                    NetworkExplorerViewModel.getContent,
                    function(content) {
                        var gotoNetexHeight = content[0].clientHeight;
                        expect(gotoNetexHeight).to.be.below(defaultNetexHeight);
                        var pixelOffset = defaultNetexHeight - gotoNetexHeight;
                        expect(pixelOffset).to.equal(50);
                        return promises.hashChange(defaultHash);
                    },
                    NetworkExplorerViewModel.getContent,
                    function(content) {
                        expect(defaultNetexHeight).to.equal(content[0].clientHeight);
                        done();
                    }
                ]);
            });
            it('goto is retained in URL when "setLocation" event is published', function(done) {
                this.timeout(TIMEOUT);
                var gotoUrl = 'pmic';
                window.location.hash = '#networkexplorer/?goto=' + gotoUrl;
                promises.runTestSteps([
                    NetworkExplorerViewModel.getNetworkExplorer,
                    function() {
                        expect(window.location.hash.indexOf('?goto=' + gotoUrl)).to.be.above(-1);
                        return Promise.resolve();
                    },
                    done
                ]);
            });
        });

        describe('When using the goto param and selecting a collection', function() {
            beforeEach(function(done) {

                REST_scenario2.applyScenario(server);
                REST_ui_settings.respondToNetworkExplorerFavorites(server);
                REST_topologyCollections.respondToSavedSearchesList(server);

                currentApp = new NetworkExplorer(options);

                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                done();
            });
            it('Clicking "Return Selected Objects" when goto does not have GET parameters will append the id of an autogenerated collection using ?', function(done) {
                this.timeout(TIMEOUT);
                var createdPoid = '0987654321';
                REST_object_configuration.respondForCreateCollection(server, 200, {
                    'id': createdPoid,
                    'category': 'autoGenerated',
                    'objects': [{
                        'id': '3'
                    },{
                        'id': '4'
                    },{
                        'id': '5'
                    }]
                });
                var gotoUrl = 'testapp';
                var returnType = 'multipleObjects';

                window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query + '?goto=' + gotoUrl + '&returnType=' + returnType;

                promises.runTestSteps([
                    ResultsViewModel.getResultTableRows,
                    ResultsViewModel.getResultTableCheckboxHeader,
                    promises.clickElement,
                    NetworkExplorerViewModel.getReturnCancelButtons,
                    function(returnAndCancelButtons) {
                        return  promises.clickElement(returnAndCancelButtons[0]);
                    },
                    promises.skipFrames,
                    function() {
                        expect(window.location.hash).to.equal('#' + gotoUrl + '?collections=' + createdPoid + '&generatedCollection=true');
                        return Promise.resolve();
                    },
                    done
                ]);
            });
            it('Clicking "Return Selected Objects" where goto has GET parameters will append the id of an autogenerated collection using &', function(done) {
                this.timeout(TIMEOUT);
                var createdPoid = '1234567890';
                REST_object_configuration.respondForCreateCollection(server, 200, {
                    'id': createdPoid,
                    'category': 'autoGenerated',
                    'objects': [{
                        'id': '3'
                    },{
                        'id': '4'
                    },{
                        'id': '5'
                    }]
                });
                var gotoUrl = 'testapp?mode=edit';
                var returnType = 'multipleObjects';

                window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query + '?goto=' + encodeURIComponent(gotoUrl) + '&returnType=' + returnType;

                promises.runTestSteps([
                    ResultsViewModel.getResultTableRows,
                    ResultsViewModel.getResultTableCheckboxHeader,
                    promises.clickElement,
                    NetworkExplorerViewModel.getReturnCancelButtons,
                    function(returnAndCancelButtons) {
                        return  promises.clickElement(returnAndCancelButtons[0]);
                    },
                    promises.skipFrames,
                    function() {
                        expect(window.location.hash).to.equal('#' + gotoUrl + '&collections=' + createdPoid + '&generatedCollection=true');
                        return Promise.resolve();
                    },
                    done
                ]);
            });
            it('Attempting to return more selected objects than the server is configured to handle shows an exception dialog', function(done) {
                this.timeout(TIMEOUT);
                var gotoUrl = 'testapp';
                var returnType = 'multipleObjects';

                window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query + '?goto=' + gotoUrl + '&returnType=' + returnType;

                promises.runTestSteps([
                    ResultsViewModel.getResultTableRows,
                    ResultsViewModel.getResultTableCheckboxHeader,
                    promises.clickElement,
                    NetworkExplorerViewModel.getReturnCancelButtons,
                    function(returnAndCancelButtons) {
                        REST_object_configuration.respondForCreateCollection(server, 400, {internalErrorCode: 10022,userMessage: {body: 'text 10000 text'}});
                        return promises.clickElement(returnAndCancelButtons[0]);
                    },
                    promises.skipFrames,
                    NetworkExplorerViewModel.getDialogMessage,
                    function(message) {
                        expect(message.textContent).to.have.string('1000');
                        return Promise.resolve();
                    },
                    NetworkExplorerViewModel.getDialogPrimaryButton,
                    function(okButton) {
                        expect(okButton.textContent.trim()).to.equal('OK');
                        return promises.clickElement(okButton);
                    },
                    done
                ]);
            });
            it('Clicking "Cancel" changes the URL to the goto parameter', function(done) {
                this.timeout(TIMEOUT);
                var gotoParam = 'testapp';

                window.location.hash = 'networkexplorer/?goto=' + encodeURIComponent(gotoParam);

                promises.runTestSteps([
                    NetworkExplorerViewModel.getReturnCancelButtons,
                    function(returnAndCancelButtons) {
                        return  promises.clickElement(returnAndCancelButtons[1]);
                    },
                    promises.skipFrames,
                    function() {
                        expect(window.location.hash).to.equal('#' + gotoParam);
                        return Promise.resolve();
                    },
                    done
                ]);
            });
        });

        describe('Switching between Criteria Builder and search bar', function() {

            beforeEach(function(done) {
                REST_scenario2.applyScenario(server);
                REST_ui_settings.respondToNetworkExplorerFavorites(server);
                REST_topologyCollections.respondToSavedSearchesList(server);

                currentApp = new NetworkExplorer(options);

                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                done();
            });

            describe('Execute: switch to criteria builder.', function() {
                it('Verify: User switches to criteria builder.', function(done) {
                    this.timeout(TIMEOUT);
                    REST_nodeTypes.respondToModelNodeTypes(server, 200, nodeTypes);
                    window.location.hash = '#networkexplorer';
                    promises.runTestSteps([
                        NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                        function(switchToCriteriaBuilderLink) {
                            return promises.clickElement(switchToCriteriaBuilderLink[0]);
                        },
                        function() {
                            return QueryBuilderViewModel.getModelDrivenComboboxByIndex(0);
                        },
                        function(nodeTypeCombobox) {
                            expect(promises.isElementVisible(nodeTypeCombobox)).to.equal(true);
                            done();
                        }
                    ]);
                });
            });

            describe('Execute: switch to criteria builder with results showing.', function() {
                it('Verify: Results table is visible after switching to criteria builder.', function(done) {
                    this.timeout(TIMEOUT);
                    window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query;
                    promises.runTestSteps([
                        ResultsViewModel.getResultTableRows,
                        function(rows) {
                            expect(rows).to.be.defined;
                            expect(promises.isElementVisible(rows[0])).to.equal(true);
                            return NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink();
                        },
                        function(switchToCriteriaBuilderLink) {
                            return promises.clickElement(switchToCriteriaBuilderLink[0]);
                        },
                        ResultsViewModel.getResultTableRows,
                        function(rows) {
                            expect(promises.isElementVisible(rows[0])).to.equal(true);
                            done();
                        }
                    ]);
                });
            });

            describe('Execute: Enter a string into search bar, switch to Criteria Builder and switch back to search bar', function() {
                it('Verify: The string should stay persisted in the search bar', function(done) {
                    this.timeout(TIMEOUT);
                    var query = 'Mecontext,NetworkElement,ManagedElement';
                    REST_nodeTypes.respondToModelNodeTypes(server, 200, nodeTypes);
                    window.location.hash = '#networkexplorer';
                    promises.runTestSteps([
                        SearchViewModel.getSearchBox,
                        function(searchBox) {
                            promises.enterInputFieldValue(searchBox[0], query);
                        },
                        NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                        function(switchToCriteriaBuilderLink) {
                            return promises.clickElement(switchToCriteriaBuilderLink[0]);
                        },
                        QueryBuilderViewModel.getSwitchToSearchLink,
                        promises.clickElement,
                        SearchViewModel.getSearchBox,
                        function(searchBox) {
                            expect(searchBox[0].value).to.equal(query);
                            done();
                        }
                    ]);
                });
            });

            describe('Execute: Enter a string into search bar, switch to Criteria Builder, hit the clear button and switch back to search bar', function() {
                it('Verify: The search bar should be empty of any string', function(done) {
                    this.timeout(TIMEOUT);
                    var query = 'Mecontext,NetworkElement,ManagedElement';
                    REST_nodeTypes.respondToModelNodeTypes(server, 200, nodeTypes);
                    window.location.hash = '#networkexplorer';
                    promises.runTestSteps([
                        SearchViewModel.getSearchBox,
                        function(searchBox) {
                            promises.enterInputFieldValue(searchBox[0], query);
                        },
                        NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                        function(switchToCriteriaBuilderLink) {
                            return promises.clickElement(switchToCriteriaBuilderLink[0]);
                        },
                        QueryBuilderViewModel.getClearButton,
                        promises.clickElement,
                        QueryBuilderViewModel.getSwitchToSearchLink,
                        promises.clickElement,
                        SearchViewModel.getSearchBox,
                        function(searchBox) {
                            expect(searchBox[0].value).to.be.empty;
                            done();
                        }
                    ]);
                });
            });

            describe('Execute: Switch to Criteria Builder, specify a node type, add a child to the node type and then switch back to search bar', function() {
                it('Verify: Search query is built as expected', function(done) {
                    this.timeout(TIMEOUT);
                    var query = 'select all objects of type MeContext from node type ERBS';
                    REST_nodeTypes.respondToModelNodeTypes(server, 200, nodeTypes);
                    REST_nodeTypes.respondToERBSNodeChildTypes(server, 200, erbsTypes);
                    REST_nodeTypes.respondToMoChildTypesENodeBFunction(server,200,eNodeBFunctionChildren);
                    REST_nodeTypes.respondToENodeBFunctionAttributes(server,200, eNodeBFunctionAttributes);
                    window.location.hash = '#networkexplorer';
                    promises.runTestSteps([
                        NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                        function(switchToCriteriaBuilderLink) {
                            return promises.clickElement(switchToCriteriaBuilderLink[0]);
                        },
                        function() {
                            return QueryBuilderViewModel.getModelDrivenComboboxByIndex(0);
                        },
                        promises.clickElement,
                        promises.getComponentListItems,
                        function(comboboxListItems) {
                            return promises.getComboboxItemByName(comboboxListItems, 'ERBS');
                        },
                        promises.clickElement,
                        function() {
                            return QueryBuilderViewModel.getAddChildByIndex(0);
                        },
                        promises.clickElement,
                        function() {
                            return QueryBuilderViewModel.getModelDrivenComboboxByIndex(1);
                        },
                        promises.clickElement,
                        promises.getComponentListItems,
                        function(comboboxListItems) {
                            return promises.getComboboxItemByName(comboboxListItems, 'MeContext');
                        },
                        promises.clickElement,
                        QueryBuilderViewModel.getSwitchToSearchLink,
                        function(switchToSearchLink) {
                            promises.clickElement(switchToSearchLink[0]);
                            return SearchViewModel.getSearchBox();
                        },
                        function(searchBox) {
                            expect(searchBox[0].value).to.equal(query);
                            done();
                        }
                    ]);
                });
            });

            describe('Execute: Enter a string into search bar, switch to Criteria Builder, select a node type, hit the clear button and switch back to search bar', function() {
                it('Verify: The search bar should be empty of any string', function(done) {
                    this.timeout(TIMEOUT);
                    var query = 'select all objects of type MeContext from node type ERBS';
                    REST_nodeTypes.respondToModelNodeTypes(server, 200, nodeTypes);
                    REST_nodeTypes.respondToERBSNodeChildTypes(server, 200, erbsTypes);
                    REST_nodeTypes.respondToMoChildTypesENodeBFunction(server,200,eNodeBFunctionChildren);
                    REST_nodeTypes.respondToENodeBFunctionAttributes(server,200, eNodeBFunctionAttributes);
                    window.location.hash = '#networkexplorer';
                    promises.runTestSteps([
                        SearchViewModel.getSearchBox,
                        function(searchBox) {
                            promises.enterInputFieldValue(searchBox[0], query);
                        },
                        NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                        function(switchToCriteriaBuilderLink) {
                            return promises.clickElement(switchToCriteriaBuilderLink[0]);
                        },
                        function() {
                            return QueryBuilderViewModel.getModelDrivenComboboxByIndex(0);
                        },
                        promises.clickElement,
                        promises.getComponentListItems,
                        function(comboboxListItems) {
                            return promises.getComboboxItemByName(comboboxListItems, 'ERBS');
                        },
                        promises.clickElement,
                        QueryBuilderViewModel.getClearButton,
                        promises.clickElement,
                        function() {
                            return QueryBuilderViewModel.getSwitchToSearchLink();
                        },
                        function(switchToSearchLink) {
                            promises.clickElement(switchToSearchLink[0]);
                            return SearchViewModel.getSearchBox();
                        },
                        function(searchBox) {
                            expect(searchBox[0].value).to.be.empty;
                            done();
                        }
                    ]);
                });
            });
        });

        //todo: Add flyout mock back in
        describe('Execute: switch to criteria builder, perform a search, clear the search', function() {
            beforeEach(function(done) {
                currentApp = new NetworkExplorer(options);
                // start application.
                server.autoRespond = true;
                server.respondImmediately = true;
                window.location.hash = 'networkexplorer';
                REST_nodeTypes.respondToModelNodeTypes(server, 200, nodeTypes);
                REST_nodeTypes.respondToERBSNodeChildTypes(server, 200, erbsTypes);
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                //setFlyoutMock(core.Element.wrap(document.getElementById('bitContainer')), done);
                var eventBusStub = {
                    subscribe: _sandbox.spy(),
                    publish: _sandbox.spy(function(channel) {
                        switch (channel) {
                            case 'flyout:show':
                                net.ajax({
                                    url: '/topologyCollections/savedSearches',
                                    type: 'POST',
                                    contentType: 'application/json',
                                    data: JSON.stringify({
                                        name: 'searchname',
                                        category: 'Private',
                                        searchQuery: 'select all nodes of type ERBS'
                                    })
                                });
                                break;
                            case 'flyout:hide':
                                break;
                        }
                    })
                };
                _sandbox.stub(containerApi, 'getEventBus', function() {
                    return eventBusStub;
                });
                done();
            });

            afterEach(function() {
                stopFlyoutMock();
                server.restore();
            });

            it('Verify: The last completed executed search can be saved to a saved search', function(done) {
                this.timeout(TIMEOUT);
                REST_topologyCollections.recordSavedSearchPost(server);
                promises.runTestSteps([
                    NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                    function(switchToCriteriaBuilderLink) {
                        return promises.clickElement(switchToCriteriaBuilderLink[0]);
                    },
                    promises.skipFrames,
                    promises.skipFrames,
                    function() {
                        return QueryBuilderViewModel.getModelDrivenComboboxByIndex(0);
                    },
                    promises.clickElement,
                    promises.skipFrames,
                    promises.getComponentListItems,
                    function(comboboxListItems) {
                        var selectItem = promises.getComboboxItemByName(comboboxListItems, 'ERBS');
                        return promises.clickElement(selectItem);
                    },
                    QueryBuilderViewModel.getSearchButton,
                    promises.clickElement,
                    function() {
                        return ResultsViewModel.waitForTableRows(5);
                    },
                    QueryBuilderViewModel.getClearButton,
                    promises.clickElement,
                    ResultsViewModel.getDefaultActionButtons,
                    ResultsViewModel.getSaveSearchButton,
                    promises.clickElement,
                    // NetworkExplorerViewModel.getSaveSearchNameInput,
                    // function(searchName) {
                    //     return promises.enterInputFieldValue(searchName, 'searchname');
                    // },
                    // NetworkExplorerViewModel.getFlyoutSubmitButton,
                    // promises.clickElement,
                    function() {
                        server.respond();
                        expect(REST_topologyCollections.getRequestBody()).to.equal('{"name":"searchname","category":"Private","searchQuery":"select all nodes of type ERBS"}');
                        done();
                    }
                ]);
            });

            it('Verify: Loading animation is cleared and results table and info message are not shown when clear is triggered while fetching results', function(done) {
                this.timeout(TIMEOUT);
                promises.runTestSteps([
                    NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                    function(switchToCriteriaBuilderLink) {
                        return promises.clickElement(switchToCriteriaBuilderLink[0]);
                    },
                    function() {
                        return QueryBuilderViewModel.getModelDrivenComboboxByIndex(0);
                    },
                    promises.clickElement,
                    promises.getComponentListItems,
                    function(comboboxListItems) {
                        var selectItem = promises.getComboboxItemByName(comboboxListItems, 'ERBS');
                        return promises.clickElement(selectItem);
                    },
                    QueryBuilderViewModel.getSearchButton,
                    function(searchButton) {
                        server.respondImmediately = false;
                        server.autoRespondAfter = 30000; // delay search response
                        return promises.clickElement(searchButton);
                    },
                    QueryBuilderViewModel.getClearButton,
                    function(clearButton) {
                        return promises.clickElement(clearButton);
                    },
                    ResultsViewModel.getTableBody,
                    function(getTableBody) {
                        expect(getTableBody).to.be.undefined;
                        return ResultsViewModel.getResultsLoaderDots();
                    },
                    function(loaderDots) {
                        expect(ResultsViewModel.isElementVisibleToUser(loaderDots)).to.be.false;
                        return ResultsViewModel.getResultsLoaderMessage();
                    },
                    function(loaderMessage) {
                        expect(ResultsViewModel.isElementVisibleToUser(loaderMessage)).to.be.false;
                        return ResultsViewModel.getInfoMessage();
                    },
                    function(infoMessage) {
                        expect(ResultsViewModel.isElementVisibleToUser(infoMessage)).to.be.false;
                        expect(location.hash).to.equal('#networkexplorer');
                        done();
                    }
                ]);
            });
        });

        describe('Execute: Set Node Type and Filters in criteria builder, swap to search bar, swap back to criteria builder', function() {
            beforeEach(function(done) {
                currentApp = new NetworkExplorer(options);
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                done();
            });

            it('Node Type and Filter stay persistent when switching from search bar', function (done) {
                this.timeout(TIMEOUT);
                REST_nodeTypes.respondToModelNodeTypes(server, 200, nodeTypes);
                REST_nodeTypes.respondToERBSNodeChildTypes(server, 200, erbsTypes);

                var query = 'select all nodes of type ERBS filter by managementState = MAINTENANCE';
                var node = 'ERBS';

                promises.runTestSteps([
                    NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                    function(switchToCriteriaBuilderLink) {
                        promises.clickElement(switchToCriteriaBuilderLink[0]);
                        return QueryBuilderViewModel.getModelDrivenComboboxByIndex(0);
                    },
                    promises.clickElement,
                    promises.getComponentListItems,
                    function(comboboxListItems) {
                        var listItem = promises.getComboboxItemByName(comboboxListItems, node);
                        return promises.clickElement(listItem);
                    },
                    QueryBuilderViewModel.getFilterItemsBox,
                    promises.clickElement,
                    UISDKViewModel.getCheckBoxItems,
                    function (checkBoxItems) {
                        promises.clickElement(checkBoxItems[1]);
                        return QueryBuilderViewModel.getSwitchToSearchLink();
                    },
                    promises.clickElement,
                    SearchViewModel.getSearchBox,
                    function(searchBox) {
                        expect(searchBox[0].value).to.equal(query);
                        return NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink();
                    },
                    promises.clickElement,
                    QueryBuilderViewModel.getModelDrivenCombobox,
                    function(comboBox){
                        expect(comboBox[0].firstElementChild.value).to.equal(node);
                        return QueryBuilderViewModel.getFilterItemsBox();
                    },
                    promises.clickElement,
                    UISDKViewModel.getCheckBoxItems,
                    function(checkBoxItems) {
                        expect(checkBoxItems[1].checked).to.equal(true);
                        done();
                    }
                ]);
            });
        });

        describe('Execute: switch to criteria builder and perform a multiple children query', function() {

            beforeEach(function(done) {
                currentApp = new NetworkExplorer(options);
                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                done();
            });

            it('Verify: The loading message is always displayed', function(done) {
                this.timeout(TIMEOUT);
                REST_nodeTypes.respondToModelNodeTypes(server, 200, nodeTypes);
                REST_nodeTypes.respondToERBSNodeChildTypes(server, 200, erbsTypes);
                REST_nodeTypes.respondToMoChildTypesMeContext(server, 200, meContextChildren);
                REST_nodeTypes.respondToMeContextAttributes(server, 200, meContextAttributes);
                REST_nodeTypes.respondToMoChildTypesManagedElement(server, 200, managedElementChildren);
                REST_nodeTypes.respondToManagedElementAttributes(server, 200, managedElementAttributes);
                REST_nodeTypes.respondToMoChildTypesENodeBFunction(server, 200, eNodeBFunctionChildren);
                REST_nodeTypes.respondToENodeBFunctionAttributes(server, 200, eNodeBFunctionAttributes);
                REST_nodeTypes.respondToMoChildTypesEUtranCellFDD(server, 200, eUtranCellFDDChildren);
                REST_nodeTypes.respondToEUtranCellFDDAttributes(server, 200, eUtranCellFDDAttributes);
                REST_topologyCollections.recordSavedSearchPost(server);
                promises.runTestSteps([
                    NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                    promises.clickElement,
                    function() {
                        return QueryBuilderViewModel.getModelDrivenComboboxByIndex(0);
                    },
                    promises.clickElement,
                    promises.getComponentListItems,
                    function(nodeTypeListItems) {
                        var selectItem = promises.getComboboxItemByName(nodeTypeListItems, 'ERBS');
                        return promises.clickElement(selectItem);
                    },
                    function() {
                        return QueryBuilderViewModel.getAddChildByIndex(0);
                    },
                    promises.clickElement,
                    function() {
                        return QueryBuilderViewModel.getModelDrivenComboboxByIndex(1);
                    },
                    function(childCombobox) {
                        promises.clickElement(childCombobox);
                        return promises.getComponentListItems();
                    },
                    function(comboboxListItems) {
                        var meContextItem = promises.getComboboxItemByName(comboboxListItems, 'MeContext');
                        promises.clickElement(meContextItem);
                        return QueryBuilderViewModel.getAddChildByIndex(1);
                    },
                    function(addChild) {
                        promises.clickElement(addChild);
                        return QueryBuilderViewModel.getModelDrivenComboboxByIndex(2);
                    },
                    function(childCombobox) {
                        promises.clickElement(childCombobox);
                        return promises.getComponentListItems();
                    },
                    function(comboboxListItems) {
                        var managedElementItem = promises.getComboboxItemByName(comboboxListItems, 'ManagedElement');
                        promises.clickElement(managedElementItem);
                        return QueryBuilderViewModel.getAddChildByIndex(2);
                    },
                    promises.clickElement,
                    function() {
                        return QueryBuilderViewModel.getModelDrivenComboboxByIndex(3);
                    },
                    function(childCombobox) {
                        promises.clickElement(childCombobox);
                        return promises.getComponentListItems();
                    },
                    function(comboboxListItems) {
                        var eNodeBFunctionItem = promises.getComboboxItemByName(comboboxListItems, 'ENodeBFunction');
                        promises.clickElement(eNodeBFunctionItem);
                        return QueryBuilderViewModel.getAddChildByIndex(3);
                    },
                    promises.clickElement,
                    function() {
                        return QueryBuilderViewModel.getModelDrivenComboboxByIndex(4);
                    },
                    function(childCombobox) {
                        promises.clickElement(childCombobox);
                        return promises.getComponentListItems();
                    },
                    function(comboboxListItems) {
                        var eUtranCellFddItem = promises.getComboboxItemByName(comboboxListItems, 'EUtranCellFDD');
                        return promises.clickElement(eUtranCellFddItem);
                    },
                    QueryBuilderViewModel.getSearchButton,
                    promises.clickElement,
                    ResultsViewModel.getResultsLoaderDots,
                    function(resultsLoaderDots) {
                        expect(resultsLoaderDots.length).to.equal(1);
                        expect(ResultsViewModel.isElementVisibleToUser(resultsLoaderDots)).to.be.true;
                        return ResultsViewModel.getResultsLoaderMessage();
                    },
                    function(resultsLoaderMessage) {
                        expect(ResultsViewModel.isElementVisibleToUser(resultsLoaderMessage)).to.be.true;
                        expect(resultsLoaderMessage[0].textContent).to.have.string('Loading');
                        done();
                    }
                ]);
            });
        });

        //todo: Add flyout mock back in
        describe('Enter a valid search string, select "Save Search", then add category and name and save', function() {

            beforeEach(function(done) {
                currentApp = new NetworkExplorer(options);
                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                // setFlyoutMock(core.Element.wrap(document.getElementById('bitContainer')));
                var eventBusStub = {
                    subscribe: _sandbox.spy(),
                    publish: _sandbox.spy(function(channel) {
                        switch (channel) {
                            case 'flyout:show':
                                net.ajax({
                                    url: '/topologyCollections/savedSearches',
                                    type: 'POST',
                                    contentType: 'application/json',
                                    data: JSON.stringify({
                                        name: 'searchname',
                                        category: 'Private',
                                        searchQuery: 'select all nodes of type ERBS'
                                    })
                                });
                                break;
                            case 'flyout:hide':
                                break;
                        }
                    }.bind(this))
                };
                _sandbox.stub(containerApi, 'getEventBus', function() {
                    return eventBusStub;
                });
                done();
            });

            afterEach(function() {
                stopFlyoutMock();
            });
            //todo: Add these tests back in once flyout mock is fixed

            // it('When 409 response received because the name provided is not unique across categories, show a specific error', function(done) {
            //     this.timeout(TIMEOUT);
            //     REST_nodeTypes.respondToERBSSearch(server, 200, [{'poList': [],'attributes': ['neType'],'metadata': {'RESULT_SET_TOTAL_SIZE': 0,'MAX_UI_CACHE_SIZE': 100000}}]);
            //     REST_nodeTypes.respondToManagedObjectGetObjectByPoIds(server, 200);
            //     REST_nodeTypes.respondToSavedSearchPost(server, 409, {'userMessage': {'title': 'Unknown Server Error','body': 'Saved Search with the same name already exists'},'internalErrorCode': 10010});
            //     promises.runTestSteps([
            //         SearchViewModel.getSearchBox,
            //         function(searchBox) {
            //             promises.enterInputFieldValue(searchBox[0], 'select all objects of type NetworkElement from node type RNC');
            //             return SearchViewModel.getSearchButton();
            //         },
            //         function(searchButton) {
            //             return promises.clickElement(searchButton[0]);
            //         },
            //         ResultsViewModel.getDefaultActionButtons,
            //         ResultsViewModel.getSaveSearchButton,
            //         promises.clickElement,
            //         NetworkExplorerViewModel.getSaveSearchNameInput,
            //         function(searchName) {
            //             return promises.enterInputFieldValue(searchName, 'searchname');
            //         },
            //         NetworkExplorerViewModel.getFlyoutSubmitButton,
            //         promises.clickElement,
            //         NetworkExplorerViewModel.getDialogMessage,
            //         function(errorMessage) {
            //             expect(errorMessage.textContent.trim()).to.equal('Saved Search with the same name already exists');
            //             return Promise.resolve();
            //         },
            //         NetworkExplorerViewModel.getDialogPrimaryButton,
            //         promises.clickElement,
            //         done
            //     ]);
            // });
            //
            // it('When 404 response received due to service offline, show a generic error', function(done) {
            //     this.timeout(TIMEOUT);
            //     REST_nodeTypes.respondToERBSSearch(server, 200, [{'poList': [],'attributes': ['neType'],'metadata': {'RESULT_SET_TOTAL_SIZE': 0,'MAX_UI_CACHE_SIZE': 100000}}]);
            //     REST_nodeTypes.respondToManagedObjectGetObjectByPoIds(server, 200);
            //     /*
            //      Do not mock: mocking will return json and we need non-json content. 404 and non-json is the default
            //      REST_nodeTypes.respondToSavedSearchPost(server, 404, '<html>404</html>');
            //      */
            //     promises.runTestSteps([
            //         SearchViewModel.getSearchBox,
            //         function(searchBox) {
            //             promises.enterInputFieldValue(searchBox[0], 'select all objects of type NetworkElement from node type RNC');
            //             return SearchViewModel.getSearchButton();
            //         },
            //         function(searchButton) {
            //             return promises.clickElement(searchButton[0]);
            //         },
            //         ResultsViewModel.getDefaultActionButtons,
            //         ResultsViewModel.getSaveSearchButton,
            //         promises.clickElement,
            //         NetworkExplorerViewModel.getSaveSearchNameInput,
            //         function(searchName) {
            //             return promises.enterInputFieldValue(searchName, 'searchname');
            //         },
            //         NetworkExplorerViewModel.getFlyoutSubmitButton,
            //         promises.clickElement,
            //         NetworkExplorerViewModel.getDialogMessage,
            //         function(errorMessage) {
            //             expect(errorMessage.textContent.trim()).to.equal('The server encountered an internal error. Please try again later or contact your System Administrator.');
            //             return Promise.resolve();
            //         },
            //         NetworkExplorerViewModel.getDialogPrimaryButton,
            //         promises.clickElement,
            //         done
            //     ]);
            // });
        });

        describe('User selected Objects are', function() {
            var numberOfResults = 1001;
            var poIdList = [];
            for (var poId = 1; poId <= numberOfResults; poId++) {
                poIdList.push({id: ''+poId});
            }
            beforeEach(function() {
                // reset hash
                window.location.hash = 'networkexplorer';
                REST_topologyCollections.respondToSavedSearch(server, {
                    'type': 'SavedSearch',
                    'poId': '281474976794230',
                    'name': 'SavedSearch_NetworkExplorer',
                    'searchQuery': 'MeContext',
                    'attributes': {
                        'searchQuery': 'MeContext',
                        'timeCreated': '1437394464306',
                        'category': 'Public',
                        'name': 'SavedSearch_NetworkExplorer',
                        'userId': 'topCollectionUser02'
                    },
                    'deletable': false
                });
                REST_object_configuration.respondToGetAnyCollectionV3(server, {
                    'name': 'Collection_NetworkExplorer',
                    'id': '281474988009993',
                    'category': 'Private',
                    'userId': 'administrator',
                    'timeCreated': 1437482551896,
                    'readOnly': false,
                    'objects': poIdList
                });
                REST_ui_settings.respondToNetworkExplorerFavorites(server);
                REST_topologyCollections.respondToSavedSearchesList(server);
                REST_results.respondToGetPosByPoids(server, 200, getPosByPoIds.generateResponse({poList: getIdsFromResponseObject(getXEUtranCellFDD(50))}));
                // create application
                currentApp = new NetworkExplorer(options);
                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
            });
            describe('not retained', function() {
                describe('when the user loads a different', function() {
                    [
                        {
                            type: 'Search',
                            url: 'networkexplorer/search/EUtranCellFDD'
                        },
                        {
                            type: 'Collection',
                            url: 'networkexplorer/collection/33333333333333333333333333'
                        },
                        {
                            type: 'Saved Search',
                            url: 'networkexplorer/savedsearch/555555555555555555555555'
                        }
                    ].forEach(function(test) {
                        it(test.type, function(done) {
                            this.timeout(TIMEOUT);
                            promises.runTestSteps([
                                function() {
                                    return promises.hashChange('networkexplorer/search/MeContext');
                                },
                                ResultsViewModel.getTableBody,
                                ResultsViewModel.getTableCheckboxesWithParent,
                                function(checkboxes) {
                                    return promises.clickElement(checkboxes[0]); // Select object #1
                                },
                                function() {
                                    return promises.hashChange(test.url);
                                },
                                ResultsViewModel.getTableBody,
                                ResultsViewModel.getTableCheckboxesWithParent,
                                function(checkboxes) {
                                    expect(checkboxes[0].checked).to.equal(false); // Check object is not selected
                                },
                                done
                            ]);
                        });
                    });
                });
            });
        });

        describe('Execute: resume Network Explorer.', function() {
            beforeEach(function(done) {
                REST_ui_settings.respondToNetworkExplorerFavorites(server);
                REST_topologyCollections.respondToSavedSearchesList(server);

                currentApp = new NetworkExplorer(options);
                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                done();
            });
        });

        describe('Actions', function() {
            var sandbox = sinon.sandbox.create();
            beforeEach(function() {
                REST_action_matches.respondToActionMatches(server);
            });
            afterEach(function() {
                sandbox.restore();
            });
            describe('Add to a Collection should be visible', function() {
                it('when a single object is selected', function(done) {
                    this.timeout(TIMEOUT);
                    currentApp = new NetworkExplorer(options);

                    // start application.
                    currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));

                    window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query;

                    promises.runTestSteps([
                        function() {
                            return ResultsViewModel.waitForTableRows(10);
                        },
                        ResultsViewModel.getResultTableRows,
                        ResultsViewModel.getTableCheckboxes,
                        function(checkboxes) {
                            return promises.clickElement(checkboxes[3]);
                        },
                        ResultsViewModel.getContextActionButtons,
                        ResultsViewModel.getSaveCollectionButton,
                        function(saveCollectionButton) {
                            expect(saveCollectionButton.textContent).to.equal('Add to a Collection');
                            done();
                        }
                    ]);
                });

                it('when multiple objects are selected', function(done) {
                    this.timeout(TIMEOUT);
                    currentApp = new NetworkExplorer(options);

                    // start application.
                    currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));

                    var objectsToSelect = [3, 4, 5];

                    window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query;

                    promises.runTestSteps([
                        function() {
                            return ResultsViewModel.waitForTableRows(10);
                        },
                        ResultsViewModel.getResultTableRows,
                        ResultsViewModel.getTableCheckboxes,
                        function(checkboxes) {
                            objectsToSelect.forEach(function(n) {
                                promises.clickElement(checkboxes[n]);
                            });
                            return ResultsViewModel.getContextActionButtons();
                        },
                        ResultsViewModel.getSaveCollectionButton,
                        function(saveCollectionButton) {
                            expect(saveCollectionButton.textContent).to.equal('Add to a Collection');
                            done();
                        }
                    ]);
                });
            });
        });

        describe('User select Node and Model Service returns an error. User switch to search box and perform a search. User switch back to criteria builder. ', function() {
            it('Verify: Error message is still displayed.', function(done) {
                REST_nodeTypes.respondToModelNodeTypes(server, 404, nodeTypes);
                this.timeout(40000);

                currentApp = new NetworkExplorer(options);

                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                promises.runTestSteps([
                    NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                    function(switchToCriteriaBuilderLink) {
                        return promises.clickElement(switchToCriteriaBuilderLink[0]);
                    },
                    QueryBuilderViewModel.getQueryBuilderInlineErrorLabel,
                    function(queryBuilderInlineErrorLabel) {
                        expect(queryBuilderInlineErrorLabel[0].textContent).to.contain(queryBuilderStrings.nodeTypeLoadFailure);
                        return QueryBuilderViewModel.getSwitchToSearchLink();
                    },
                    function(switchToSearchLink) {
                        return promises.clickElement(switchToSearchLink[0]);
                    },
                    SearchViewModel.getSearchBox,
                    function(searchBox) {
                        promises.enterInputFieldValue(searchBox[0], 'select all objects of type NetworkElement from node type RNC');
                        return SearchViewModel.getSearchButton();
                    },
                    function(searchButton) {
                        return promises.clickElement(searchButton[0]);
                    },
                    NetworkExplorerViewModel.getSwitchToCriteriaBuilderLink,
                    function(switchToCriteriaBuilderLink) {
                        return promises.clickElement(switchToCriteriaBuilderLink[0]);
                    },
                    QueryBuilderViewModel.getQueryBuilderInlineErrorLabel,
                    function(queryBuilderInlineErrorLabel) {
                        expect(queryBuilderInlineErrorLabel[0].textContent).to.contain(queryBuilderStrings.nodeTypeLoadFailure);
                        done();
                    }
                ]);
            });

        });

        describe('Ensure action bar is cleared when returning to default screen', function() {

            it('Check that save search button is cleared from action bar when default screen is shown', function(done) {
                this.timeout(TIMEOUT);
                var expectedNumberOfActions = 1;
                currentApp = new NetworkExplorer(options);
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));

                window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query;

                promises.runTestSteps([
                    function() {
                        return ResultsViewModel.waitForActions(1);
                    },
                    ResultsViewModel.getDefaultActionButtons,
                    function(contextItems) {
                        expect(contextItems[0].textContent.trim()).to.equal('Save Search');
                        expect(contextItems.length).to.eql(expectedNumberOfActions);
                        return promises.hashChange('networkexplorer');
                    },
                    ResultsViewModel.waitForActionsToClear,
                    ResultsViewModel.getDefaultActionButtons,
                    function(contextItems) {
                        expect(contextItems.length).to.eql(0);
                        done();
                    }
                ]);
            });

            it('Check that "Save collection" button is cleared from action bar when default screen is shown', function(done) {
                this.timeout(TIMEOUT);
                currentApp = new NetworkExplorer(options);

                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));

                var objectsToSelect = [3, 4, 5];
                var expectedNumberOfActions = 2;

                window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query;

                promises.runTestSteps([
                    function() {
                        return ResultsViewModel.waitForTableRows(10);
                    },
                    ResultsViewModel.getResultTableRows,
                    ResultsViewModel.getTableCheckboxes,
                    function(checkboxes) {
                        objectsToSelect.forEach(function(n) {
                            promises.clickElement(checkboxes[n]);
                        });
                        return ResultsViewModel.waitForActions(2);
                    },
                    ResultsViewModel.getContextActionButtons,
                    function(contextItems) {
                        expect(contextItems[1].textContent.trim()).to.equal('Add to a Collection');
                        expect(contextItems.length).to.eql(expectedNumberOfActions);
                        return promises.hashChange('#networkexplorer/');
                    },
                    ResultsViewModel.waitForContextActionsToClear,
                    done
                ]);
            });
        });

        describe('When a collection is in context show', function() {

            [
                {
                    'update': true,
                    'delete': true,
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'description': 'the add and remove actions when a single object is selected from a collection with update and delete permissions',
                    'objectsToSelect': [1],
                    'expectedActions': ['Add to a Collection', 'Remove from this Collection']
                },{
                    'update': true,
                    'delete': false,
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'description': 'the add and remove actions when a single object is selected from a collection with update permission',
                    'objectsToSelect': [1],
                    'expectedActions': ['Add to a Collection', 'Remove from this Collection']
                },{
                    'update': false,
                    'delete': true,
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'description': 'the add action when a single object is selected from a collection with delete permission',
                    'objectsToSelect': [1],
                    'expectedActions': ['Add to a Collection']
                },{
                    'update': false,
                    'delete': false,
                    'readOnly': true,
                    'userId': 'NormalUser1',
                    'description': 'the add action when a single object is selected from a collection with no permission',
                    'objectsToSelect': [1],
                    'expectedActions': ['Add to a Collection']
                },{
                    'update': true,
                    'delete': true,
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'description': 'the add and remove actions when multiple objects are selected from a collection with update and delete permissions',
                    'objectsToSelect': [1,2],
                    'expectedActions': ['Add to a Collection', 'Remove from this Collection']
                },{
                    'update': true,
                    'delete': false,
                    'readOnly': false,
                    'userId': 'administrator',
                    'description': 'the add and remove actions when multiple objects are selected from a collection with update permission',
                    'objectsToSelect': [1,2],
                    'expectedActions': ['Add to a Collection', 'Remove from this Collection']
                },{
                    'update': false,
                    'delete': true,
                    'readOnly': false,
                    'userId': 'administrator',
                    'description': 'the add action when multiple objects are selected from a collection with delete permission',
                    'objectsToSelect': [1,2],
                    'expectedActions': ['Add to a Collection']
                },{
                    'update': false,
                    'delete': false,
                    'readOnly': true,
                    'userId': 'administrator',
                    'description': 'the add action when multiple objects are selected from a collection with no permission',
                    'objectsToSelect': [1,2],
                    'expectedActions': ['Add to a Collection']
                },{
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'description': 'the add and remove actions when multiple objects are selected from a collection with no permission, readOnly is false',
                    'objectsToSelect': [1,2],
                    'expectedActions': ['Add to a Collection', 'Remove from this Collection']
                },{
                    'readOnly': true,
                    'userId': 'NormalUser1',
                    'description': 'the add action when multiple objects are selected from a collection with no permission, readOnly is true',
                    'objectsToSelect': [1,2],
                    'expectedActions': ['Add to a Collection']
                },{
                    'update': undefined,
                    'delete': undefined,
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'description': 'the add and remove actions when multiple objects are selected from a collection update and delete permissions are undefined, readOnly is false',
                    'objectsToSelect': [1,2],
                    'expectedActions': ['Add to a Collection', 'Remove from this Collection']
                },{
                    'update': undefined,
                    'delete': undefined,
                    'readOnly': true,
                    'userId': 'NormalUser1',
                    'description': 'the add action when multiple objects are selected from a collection update and delete permissions are undefined, readOnly is true',
                    'objectsToSelect': [1,2],
                    'expectedActions': ['Add to a Collection']
                }
            ].forEach(function(testCase) {
                it('"Remove from this Collection" button should be ' + testCase.description, function(done) {
                    this.timeout(TIMEOUT);
                    currentApp = new NetworkExplorer(options);

                    // start application.
                    currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                    var poIdList = ['1001', '1002'];

                    REST_object_configuration.respondToGetCollectionDefaultSortV3(server, '501', {
                        'id': '501',
                        'name': 'Collection_501',
                        'category': 'Public',
                        'readOnly': testCase.readOnly,
                        'timeCreated': 1437482551896,
                        'userId': testCase.userId,
                        'delete': testCase.delete,
                        'update': testCase.update,
                        'subType': testCase.subType,
                        'objects': [
                            {'id': poIdList[0]},
                            {'id': poIdList[1]}
                        ]
                    });

                    window.location.hash = '#networkexplorer/collection/501';

                    promises.runTestSteps([
                        ResultsViewModel.getResultTableRows,
                        ResultsViewModel.getTableCheckboxes,
                        function(checkboxes) {
                            testCase.objectsToSelect.forEach(function(n) {
                                promises.clickElement(checkboxes[n]);
                            });
                            return ResultsViewModel.getContextActionButtons();
                        },
                        function(contextItems) {
                            expect(contextItems.length).to.eql(testCase.expectedActions.length);
                            testCase.expectedActions.forEach(function(txt, i) {
                                expect(contextItems[i].textContent.trim()).to.equal(txt);
                            });
                            done();
                        }
                    ]);
                });
            });
        });

        describe('When a  "SEARCH_CRITERIA" collection is in context show', function() {

            [
                {
                    'update': true,
                    'delete': true,
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add and remove actions when a single object is selected from a collection based on SEARCH CRITERIA with update and delete permissions',
                    'objectsToSelect': [1],
                    'expectedActions': ['Add to a Collection']
                },{
                    'update': true,
                    'delete': false,
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add and remove actions when a single object is selected from a collection based on SEARCH CRITERIA with update permission',
                    'objectsToSelect': [1],
                    'expectedActions': ['Add to a Collection']
                },{
                    'update': false,
                    'delete': true,
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add actions when a single object is selected from a collection based on SEARCH CRITERIA with delete permission',
                    'objectsToSelect': [1],
                    'expectedActions': ['Add to a Collection']
                },{
                    'update': false,
                    'delete': false,
                    'readOnly': true,
                    'userId': 'NormalUser1',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add actions when a single object is selected from a collection based on SEARCH CRITERIA with no permission',
                    'objectsToSelect': [1],
                    'expectedActions': ['Add to a Collection']
                },{
                    'update': true,
                    'delete': true,
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add and remove when multiple objects are selected from a collection based on SEARCH CRITERIA with update and delete permissions',
                    'objectsToSelect': [1,2],
                      'expectedActions': ['Add to a Collection']
                },{
                    'update': true,
                    'delete': false,
                    'readOnly': false,
                    'userId': 'administrator',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add and remove actions when multiple objects are selected from a collection based on SEARCH CRITERIA with update permission',
                    'objectsToSelect': [1,2],
                      'expectedActions': ['Add to a Collection']
                },{
                    'update': false,
                    'delete': true,
                    'readOnly': false,
                    'userId': 'administrator',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add action when multiple objects are selected from a collection based on SEARCH CRITERIA with delete permission',
                    'objectsToSelect': [1,2],
                      'expectedActions': ['Add to a Collection']
                },{
                    'update': false,
                    'delete': false,
                    'readOnly': true,
                    'userId': 'administrator',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add action when multiple objects are selected from a collection based on SEARCH CRITERIA with no permission',
                    'objectsToSelect': [1,2],
                      'expectedActions': ['Add to a Collection']
                },{
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add actions when multiple objects are selected from a collection based on SEARCH CRITERIA with no permissions',
                    'objectsToSelect': [1,2],
                      'expectedActions': ['Add to a Collection']
                },{
                    'readOnly': true,
                    'userId': 'NormalUser1',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add and remove actions when multiple objects are selected from a collection based on SEARCH CRITERIA with no permissions',
                    'objectsToSelect': [1,2],
                       'expectedActions': ['Add to a Collection']
                },{
                    'update': undefined,
                    'delete': undefined,
                    'readOnly': false,
                    'userId': 'NormalUser1',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add and remove actions when multiple objects are selected from a collection based on search criteria update and delete permissions are undefined, readOnly is false',
                    'objectsToSelect': [1,2],
                    'expectedActions': ['Add to a Collection']
                },{
                    'update': undefined,
                    'delete': undefined,
                    'readOnly': true,
                    'userId': 'NormalUser1',
                    'subType': 'SEARCH_CRITERIA',
                    'description': 'the add action when multiple objects are selected from a collection based on search criteria update and delete permissions are undefined, readOnly is true',
                    'objectsToSelect': [1,2],
                    'expectedActions': ['Add to a Collection']
                }
            ].forEach(function(testCase) {
                it('"Remove from this Collection" button should not add ' + testCase.description, function(done) {
                    this.timeout(TIMEOUT);
                    currentApp = new NetworkExplorer(options);

                    // start application.
                    currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                    var poIdList = ['1001', '1002'];

                    REST_object_configuration.respondToGetCollectionDefaultSortV3(server, '501', {
                        'id': '501',
                        'name': 'Collection_501',
                        'category': 'Public',
                        'readOnly': testCase.readOnly,
                        'timeCreated': 1437482551896,
                        'userId': testCase.userId,
                        'delete': testCase.delete,
                        'update': testCase.update,
                        'subType': testCase.subType,
                        'objects': [
                            {'id': poIdList[0]},
                            {'id': poIdList[1]}
                        ]
                    });

                    window.location.hash = '#networkexplorer/collection/501';

                    promises.runTestSteps([
                        ResultsViewModel.getResultTableRows,
                        ResultsViewModel.getTableCheckboxes,
                        function(checkboxes) {
                            testCase.objectsToSelect.forEach(function(n) {
                                promises.clickElement(checkboxes[n]);
                            });
                            return ResultsViewModel.getContextActionButtons();
                        },
                        function(contextItems) {
                            expect(contextItems.length).to.eql(testCase.expectedActions.length);
                            testCase.expectedActions.forEach(function(txt, i) {
                                expect(contextItems[i].textContent.trim()).to.equal(txt);
                            });
                            done();
                        }
                    ]);
                });
            });
        });

        describe('Uncheck one column in settings', function() {

            it('Results should still be sortable', function(done) {
                this.timeout(TIMEOUT);
                currentApp = new NetworkExplorer(options);

                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));

                window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query;

                promises.runTestSteps([
                    ResultsViewModel.getResultTableHeadersSort,
                    function(sortableHeaders) {
                        expect(sortableHeaders.length).to.be.above(0);
                        return ResultsViewModel.getSettingsButton();
                    },
                    promises.clickElement,
                    SettingsViewModel.getSettingItemCheckboxes,
                    promises.clickElement,
                    ResultsViewModel.getResultTableHeadersSort,
                    function(sortableHeaders) {
                        expect(sortableHeaders.length).to.be.above(0);
                        done();
                    }
                ]);
            });

        });

        describe('Recent Actions', function() {
            var sandbox = sinon.sandbox.create();
            beforeEach(function() {
                REST_action_matches.respondToActionMatches(server);
                recentActionsStub.returns(new Promise(function(resolve) { resolve(recentActionsMock); }));
            });
            afterEach(function() {
                sandbox.restore();
            });
            describe('Recent Actions dropdown should be visible', function() {
                it('when a single object is selected', function(done) {
                    this.timeout(TIMEOUT);
                    currentApp = new NetworkExplorer(options);

                    // start application.
                    currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));

                    window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query;

                    promises.runTestSteps([
                        function() {
                            return ResultsViewModel.waitForTableRows(10);
                        },
                        ResultsViewModel.getResultTableRows,
                        ResultsViewModel.getTableCheckboxes,
                        function(checkboxes) {
                            return promises.clickElement(checkboxes[3]);
                        },
                        ResultsViewModel.getContextActionButtons,
                        ResultsViewModel.getRecentActionsButton,
                        function(recentActionsButton) {
                            expect(recentActionsButton[0].textContent.trim()).to.equal('Recent');
                            return promises.clickElement(recentActionsButton[0]);
                        },
                        ResultsViewModel.getRecentActionsItems,
                        function(recentActionsItems) {
                            expect(recentActionsItems[0].textContent).to.equal('Run Node Health Check');
                            done();
                        }
                    ]);
                });

                it('when multiple objects are selected', function(done) {
                    this.timeout(TIMEOUT);
                    currentApp = new NetworkExplorer(options);

                    // start application.
                    currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));

                    var objectsToSelect = [3, 4, 5];

                    window.location.hash = 'networkexplorer/search/' + REST_scenario1.queryResponseMappings.MeContext.query;

                    promises.runTestSteps([
                        function() {
                            return ResultsViewModel.waitForTableRows(10);
                        },
                        ResultsViewModel.getResultTableRows,
                        ResultsViewModel.getTableCheckboxes,
                        function(checkboxes) {
                            objectsToSelect.forEach(function(n) {
                                promises.clickElement(checkboxes[n]);
                            });
                            return ResultsViewModel.getContextActionButtons();
                        },
                        ResultsViewModel.getRecentActionsButton,
                        function(recentActionsButton) {
                            return promises.clickElement(recentActionsButton[0]);
                        },
                        ResultsViewModel.getRecentActionsItems,
                        function(recentActionsItems) {
                            expect(recentActionsItems[0].textContent).to.equal('Run Node Health Check');
                            done();
                        }
                    ]);
                });
            });
        });

        describe('Error Handling', function() {
            var numberOfResults = 1001;
            var poIdList = [];
            for (var poId = 1; poId <= numberOfResults; poId++) {
                poIdList.push({id: ''+poId});
            }
            beforeEach(function() {
                // reset hash
                window.location.hash = 'networkexplorer';
                // Default sidebar
                REST_object_configuration.respondToCollectionListV3(server, staticCollections);
                REST_topologyCollections.respondToSavedSearchesList(server, savedSearches);
                REST_ui_settings.respondToNetworkExplorerFavorites(server);
                // create application
                currentApp = new NetworkExplorer(options);
                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
            });
        });

    });
});
