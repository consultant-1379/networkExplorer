define([
    'jscore/core',
    'container/api',
    'test/bit/bitPromises',
    'test/bit/viewmodels/ResultsViewModel',
    'test/bit/viewmodels/SlidingMenuRightViewModel',
    'src/networkexplorer/NetworkExplorer',
    'test/resources/Grammar_scenario1',
    'test/resources/restMock/REST_results',
    'test/resources/restMock/REST_topologyCollections',
    'test/resources/restMock/REST_object_configuration',
    'test/resources/restMock/REST_ui_settings',
    'i18n!networkexplorer/SlidingMenuRight.json',
    'test/resources/restMock/data/managedObjects/search/v2/query/getXMeContexts',
    'test/resources/restMock/data/managedObjects/search/v2/query/getIdsFromResponseObject',
    'test/resources/restMock/data/managedObjects/getPosByPoids/_functions'
], function(
    core,
    Container,
    promises,
    ResultsViewModel,
    SlidingMenuRightViewModel,
    NetworkExplorer,
    Grammar_scenario1,
    REST_results,
    REST_topologyCollections,
    REST_object_configuration,
    REST_ui_settings,
    strings,
    getXMeContexts,
    getIdsFromResponseObject,
    getPosByPoids
) {

    describe('bit/SlidingMenuRight.js', function() {

        var server,
            currentApp,
            _sandbox,
            options = {
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

            // setting container config for this test
            Container.setConfig({
                'defaultApp': 'networkexplorer',
                'name': 'ENM'
            });
            currentApp = new NetworkExplorer(options);
            currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
        });

        afterEach(function() {
            currentApp.stop();
            REST_results.reset();
            _sandbox.restore();
        });

        describe('Clear event is sent to Attributes Region', function() {
            var isListeningToClearEvent;
            beforeEach(function() {
                REST_results.respondToSearchQuery(server, 'MeContext', 200, getXMeContexts(10));
                REST_results.respondToGetPosByPoids(server, 200, getPosByPoids.generateResponse({ poList: getIdsFromResponseObject(getXMeContexts(10))}));
                currentApp.getEventBus().publish('Search:searchSubmit', 'MeContext');
                isListeningToClearEvent = false;
            });
            it('when a single row is selected and then deselected', function(done) {
                var rowToClick = 0;
                currentApp.getContext().eventBus.publish('Search:searchSubmit', 'MeContext');
                currentApp.getEventBus().subscribe('attributesRegion:clear', function() {
                    if (isListeningToClearEvent) {
                        done();
                    }
                });
                promises.runTestSteps([
                    ResultsViewModel.getTableBodyRows,
                    function(rows) {
                        isListeningToClearEvent = true;
                        promises.clickElement(rows[rowToClick]); // select row
                        promises.clickElement(rows[rowToClick]); // deselect row
                    }
                ]);
            });
            it('when multiple rows are selected and then deselected using checkboxes', function(done) {
                var rowsToClick = [0, 1, 2];
                currentApp.getEventBus().subscribe('attributesRegion:clear', function() {
                    if (isListeningToClearEvent) {
                        done();
                        isListeningToClearEvent = false;
                    }
                });
                promises.runTestSteps([
                    ResultsViewModel.getTableBodyCheckboxes,
                    function(checkboxes) {
                        isListeningToClearEvent = true;
                        // select rows
                        rowsToClick.forEach(function(rowIndex) {
                            promises.clickElement(checkboxes[rowIndex]);
                        });
                        // deselect rows
                        rowsToClick.forEach(function(rowIndex) {
                            promises.clickElement(checkboxes[rowIndex]);
                        });
                    }
                ]);
            });
            it('when multiple rows are selected and then deselected using the header checkbox', function(done) {
                var rowsToClick = [3, 4, 6];
                currentApp.getEventBus().subscribe('attributesRegion:clear', function() {
                    if (isListeningToClearEvent) {
                        done();
                    }
                });
                promises.runTestSteps([
                    ResultsViewModel.getTableBodyCheckboxes,
                    function(tableBodyCheckboxes) {
                        isListeningToClearEvent = true;
                        rowsToClick.forEach(function(rowIndex) {
                            promises.clickElement(tableBodyCheckboxes[rowIndex]);
                        });
                        return ResultsViewModel.getTableCheckboxes();
                    },
                    function(tableCheckboxes) {
                        promises.clickElement(tableCheckboxes[0]);
                    }
                ]);
            });
        });

        describe('Attributes Region component error handling', function() {
            it('should display object deleted message if a persistent:fetch:error event occurs due to a non-existent object', function(done) {
                currentApp.getEventBus().publish('Search:searchSubmit', 'singleDeletedObject');

                var mockError = {
                    title: 'Could not find requested object',
                    message: 'We cannot find the requested object. It may have been removed or is not available at this time. Please try again later.',
                    code: 1000
                };

                currentApp.getEventBus().publish('attributesRegion:fetch:persistent:error', mockError);

                promises.runTestSteps([
                    SlidingMenuRightViewModel.getErrorMessageTitle,
                    function(title) {
                        expect(title[0].textContent).to.equal(strings.objectDeletedTitle);
                        return SlidingMenuRightViewModel.getErrorMessageBody();
                    },
                    function(message) {
                        expect(message[0].textContent).to.equal(strings.objectDeletedBody);
                        done();
                    }
                ]);
            });

            it('should display unknown server error message if persistent:fetch:error event occurs without error code', function(done) {
                currentApp.getEventBus().publish('Search:searchSubmit', 'singleDeletedObject');

                var mockError = {
                    data: 'Not Found'
                };

                currentApp.getEventBus().publish('attributesRegion:fetch:persistent:error', mockError);

                promises.runTestSteps([
                    SlidingMenuRightViewModel.getErrorMessageTitle,
                    function(title) {
                        expect(title[0].textContent).to.equal(strings.unknownServerErrorTitle);
                        return SlidingMenuRightViewModel.getErrorMessageBody();
                    },
                    function(message) {
                        expect(message[0].textContent).to.equal(strings.unknownServerErrorBody);
                        done();
                    }
                ]);
            });
        });

        describe('Attributes Region success handling', function() {
            it('should show a toast message when attributes are successfully saved', function(done) {

                REST_object_configuration.respondToCollectionList(server, [], 200);
                REST_topologyCollections.respondToSavedSearchesList(server, [], 200);
                REST_ui_settings.respondToNetworkExplorerFavorites(server);

                window.location.hash = 'networkexplorer';

                var toastOptions = {
                    color: 'green',
                    icon: 'ebIcon ebIcon_tick',
                    label: strings.attributeChangesSaved,
                    content: 'success',
                    showCloseButton: true,
                    showAsToast: true,
                    autoDismiss: true,
                    autoDismissDuration: 2000
                };

                currentApp.getEventBus().publish('attributesRegion:save:success', toastOptions);

                promises.runTestSteps([
                    SlidingMenuRightViewModel.getAttributesSavedToast,
                    function(toastMessage) {
                        expect(toastMessage[0].textContent).to.contain(strings.attributeChangesSaved);
                        done();
                    }
                ]);
            });
        });
    });
});


