/*global define, describe, it, expect */
define([
    'test/bit/bitPromises',
    'jscore/core',
    'jscore/ext/mvp',
    'test/resources/cssNamespaces',
    'test/resources/app_constants',
    'test/resources/user_input_data',
    'test/resources/restMock/REST_results',
    'test/resources/restMock/REST_ui_settings',
    'test/resources/restMock/REST_collection_scenarios',
    'test/resources/restMock/REST_savedSearch_scenarios',
    'test/resources/restMock/REST_topologyCollections',
    'test/resources/restMock/REST_object_configuration',
    'test/resources/Grammar_scenario1',
    'test/resources/restMock/data/managedObjects/search/v2/query/getXMeContexts',
    'test/resources/restMock/data/staticCollections/LargeCollection',
    'test/resources/restMock/data/managedObjects/search/v2/query/getXEUtranCellFDD',
    'test/resources/restMock/data/managedObjects/search/v2/query/getIdsFromResponseObject',
    'test/resources/restMock/data/managedObjects/getPosByPoids/_functions',
    'test/bit/viewmodels/NetworkExplorerViewModel',
    'test/bit/viewmodels/SlidingMenuViewModel',
    'test/bit/viewmodels/ResultsViewModel',
    'src/networkexplorer/NetworkExplorer',
    'i18n!networkexplorer/Results.json'
], function(
    promises,
    core,
    mvp,
    css,
    appConstants,
    user,
    REST_results,
    REST_ui_settings,
    REST_collection_scenarios,
    REST_savedSearch_scenarios,
    REST_topologyCollections,
    REST_object_configuration,
    Grammar_scenario1,
    getXMeContexts,
    largeCollection,
    getXEUtranCellFDD,
    getIdsFromResponseObject,
    getPosByPoids,
    NetworkExplorerViewModel,
    SlidingMenuViewModel,
    ResultsViewModel,
    NetworkExplorer,
    strings
) {
    'use strict';
    describe('bit/regions/Results/ResultContext.js', function() {
        var server,
            _sandbox,
            currentApp,
            TIMEOUT = 8000;

        function setupSandbox() {
            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            server = _sandbox.server;
            server.autoRespond = true;
            server.respondImmediately = true;
            _sandbox.stub(core.Window, 'getProperty').withArgs('innerHeight').returns(1080);
        }

        beforeEach(function(done) {
            setupSandbox();
            Grammar_scenario1.applyScenario(server);
            REST_ui_settings.respondToNetworkExplorerFavorites(server);
            // Create a generic app with View and root DOM element.
            var options = {
                breadcrumb: [{
                    name: 'ENM',
                    url: '#networkexplorer'
                }]
            };
            currentApp = new NetworkExplorer(options);
            // start application.
            currentApp.start(document.getElementById('bitContainer'));
            done();
        });

        afterEach(function() {
            currentApp.stop();
            REST_object_configuration.reset();
            REST_topologyCollections.reset();
            REST_results.reset();
            _sandbox.restore();
        });

        describe('Load a collection into the Result Context', function() {
            describe('then close it', function() {
                beforeEach(function() {
                    REST_results.respondToGetPosByPoids(server, 200, getPosByPoids.generateResponse({poList: getIdsFromResponseObject(getXMeContexts(10000))}));
                    REST_object_configuration.respondToCollectionListV3(server);
                    REST_object_configuration.respondToGetCollectionDefaultSortV3(server, '281474978599688', {
                        id: '281474978599688',
                        name: 'testRemove',
                        category: 'Private',
                        readOnly: false,
                        sortable: true,
                        metadata: {
                            models: []
                        },
                        timeCreated: 1478708099117,
                        userId: 'administrator',
                        objects: [{id: '1001'}]
                    });
                });
                it('The default message is displayed', function(done) {
                    this.timeout(TIMEOUT);
                    promises.runTestSteps([
                        function() {
                            return promises.hashChange('testapp/collection/281474978599688');
                        },
                        ResultsViewModel.getCloseCollectionButton,
                        promises.clickElement,
                        ResultsViewModel.getInfoMessage,
                        function(infoMessage) {
                            expect(infoMessage[0].textContent).to.equal('Searching your Network');
                            done();
                        }
                    ]);
                });
                it('If there are query parameters that are not related to the Results Region, they are retained', function(done) {
                    this.timeout(TIMEOUT);
                    var someAdditionalParams = '?goto=anotherApp&returnType=Object';
                    promises.runTestSteps([
                        function() {
                            return promises.hashChange('testapp/collection/281474978599688' + someAdditionalParams);
                        },
                        ResultsViewModel.getCloseCollectionButton,
                        promises.clickElement,
                        ResultsViewModel.getInfoMessage,
                        function(infoMessage) {
                            expect(infoMessage[0].textContent).to.equal('Searching your Network');
                            expect(window.location.hash).to.contain(someAdditionalParams);
                            done();
                        }
                    ]);
                });
            });
        });
    });
});
