/*global define, describe, it, expect */
define([
    'jscore/core',
    'test/bit/bitPromises',
    'test/resources/cssNamespaces',
    'test/resources/user_input_data',
    'test/resources/Grammar_scenario1',
    'test/resources/restMock/REST_results',
    'test/resources/restMock/data/managedObjects/search/v2/query/getXMeContexts',
    'test/resources/restMock/data/managedObjects/search/v2/query/getIdsFromResponseObject',
    'test/resources/restMock/data/managedObjects/getPosByPoids/_functions',
    'test/resources/restMock/REST_nodeTypes',
    'test/resources/restMock/REST_landscape_scenario1',
    'test/resources/restMock/REST_collection_scenarios',
    'test/resources/restMock/REST_savedSearch_scenarios',
    'test/resources/restMock/REST_ui_settings',
    'src/networkexplorer/NetworkExplorer',
    'test/bit/regions/Search/searchFunctions',
    'test/bit/viewmodels/NetworkExplorerViewModel',
    'test/bit/viewmodels/ResultsViewModel',
    'test/bit/viewmodels/SlidingMenuViewModel',
    'test/bit/viewmodels/QueryBuilderViewModel',
    'test/bit/viewmodels/SearchViewModel',
    'test/bit/viewmodels/ModelDrivenComboBoxViewModel',
    'test/resources/restMock/data/model/nodeTypes',
    'test/resources/restMock/data/model/ENODEBtypes',
    'test/resources/restMock/data/model/ENodeBFunctionChildren',
    'test/resources/restMock/data/model/ENodeBFunctionAttributes'
], function(
    core,
    promises,
    css,
    user,
    Grammar_scenario1,
    REST_results,
    getXMeContexts,
    getIdsFromResponseObject,
    getPosByPoIds,
    REST_nodeTypes,
    REST_scenario1,
    REST_collection_scenarios,
    REST_savedSearch_scenarios,
    REST_ui_settings,
    NetworkExplorer,
    searchFunctions,
    NetworkExplorerViewModel,
    ResultsViewModel,
    SlidingMenuViewModel
) {

    'use strict';

    describe('bit/RetainContext.js', function() {

        var server, currentApp, TIMEOUT, _sandbox;

        describe('Enter Network Explorer search page with return type', function() {
            var query = REST_scenario1.queryResponseMappings.MeContext.query;
            var collectionsUrl = '#networkexplorer/collections?goto=abc&returnType=';
            var savedSearchesUrl = '#networkexplorer/savedsearches?goto=abc&returnType=';
            var myCollectionsUrl = '#networkexplorer/collections/my?goto=abc&returnType=';
            var mySavedSearchesUrl = '#networkexplorer/savedsearches/my?goto=abc&returnType=';
            var networkExplorerUrl = '#networkexplorer/search/' + query + '?goto=abc&returnType=';
            var defaultNetworkExplorerUrl = '#networkexplorer?goto=abc&returnType=';
            var resultsToSelect = [5, 6];

            beforeEach(function() {
                _sandbox = sinon.sandbox.create({
                    useFakeServer: true
                });
                server = _sandbox.server;

                Grammar_scenario1.applyScenario(server);
                REST_collection_scenarios.applyScenario(server);
                REST_savedSearch_scenarios.applyScenario(server);
                REST_ui_settings.respondToNetworkExplorerFavorites(server);

                REST_results.respondToSearchQuery(server, query, 200, getXMeContexts(20));
                REST_results.respondToGetPosByPoids(server, 200, getPosByPoIds.generateResponse({poList: getIdsFromResponseObject(getXMeContexts(20))}));

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
                currentApp = new NetworkExplorer(options);
                // start application.
                currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
                TIMEOUT = 30000;
            });

            afterEach(function() {
                currentApp.stop();
                _sandbox.restore();
            });

            [{
                returnType: 'singleObject',
                disabledAfterOneSelection: false,
                disabledAfterMultipleSelections: true
            }, {
                returnType: 'multipleObjects',
                disabledAfterOneSelection: false,
                disabledAfterMultipleSelections: false
            }, {
                returnType: 'collections',
                disabledAfterOneSelection: true,
                disabledAfterMultipleSelections: true
            }, {
                returnType: 'savedSearches',
                disabledAfterOneSelection: true,
                disabledAfterMultipleSelections: true
            }, {
                returnType: 'invalidType',
                disabledAfterOneSelection: true,
                disabledAfterMultipleSelections: true
            }].forEach(function(returnTypeAsserts) {
                var returnType = returnTypeAsserts.returnType;
                var collectionsUrlReturn = collectionsUrl + returnType;
                var savedSearchesUrlReturn = savedSearchesUrl + returnType;
                var myCollectionsUrlReturn = myCollectionsUrl + returnType;
                var mySavedSearchesUrlReturn = mySavedSearchesUrl + returnType;
                var networkExplorerUrlReturn = networkExplorerUrl + returnType;
                var defaultNetworkExplorerUrlReturn = defaultNetworkExplorerUrl + returnType;
                it('Selecting results works correctly with ' + returnType + ' return type', function(done) {
                    this.timeout(TIMEOUT);
                    REST_scenario1.setResultsSize(20);
                    promises.runTestSteps([
                        function() {
                            return promises.hashChange(networkExplorerUrlReturn);
                        },
                        function() {
                            return ResultsViewModel.waitForTableRows(8);
                        },
                        NetworkExplorerViewModel.getReturnButton,
                        function(returnButton) {
                            expect(returnButton[0].disabled).to.equal(true);
                            return ResultsViewModel.getTableCheckboxes();
                        },
                        function(checkboxes) {
                            promises.clickElement(checkboxes[resultsToSelect[0]]);
                            return NetworkExplorerViewModel.getReturnButton();
                        },
                        function(returnButton) {
                            expect(returnButton[0].disabled).to.equal(returnTypeAsserts.disabledAfterOneSelection);
                            return ResultsViewModel.getTableCheckboxes();
                        },
                        function(checkboxes) {
                            promises.clickElement(checkboxes[resultsToSelect[1]]);
                            return NetworkExplorerViewModel.getReturnButton();
                        },
                        function(returnButton) {
                            expect(returnButton[0].disabled).to.equal(returnTypeAsserts.disabledAfterMultipleSelections);
                            done();
                        }
                    ]);
                });
            });
        });
    });
});
