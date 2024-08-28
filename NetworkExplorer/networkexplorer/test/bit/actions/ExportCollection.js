
define([
    'test/bit/bitPromises',
    'jscore/core',
    'container/api',
    'src/networkexplorer/actions/ExportCollection',
    'test/resources/restMock/REST_network_explorer_import',
    'test/bit/viewmodels/NetworkExplorerViewModel'
], function(promises, core, Container, ExportCollection, REST_network_explorer_import, NetworkExplorerViewModel) {

    'use strict';

    describe('ExportCollection', function() {

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


        describe('When action is executed by clicking Export Collection button', function() {
            var sessionId = 'r6732069-9938-4173-84b6-9e6666412047';
            describe('Export Collection request is made to appropriate endpoint for LEAF collection type', function() {
                [{
                    description: 'LEAF',
                    selectedObjects: [{
                        id: '456',
                        type: 'NESTED',
                        subType: 'LEAF'
                    }],
                    setupServerMock: function() {
                        REST_network_explorer_import.respondToExportObjectCollection(
                            _server,
                            {
                                sessionId: sessionId,
                                startTime: 1528450705216,
                                timeZone: 'Europe/Dublin'
                            });
                        REST_network_explorer_import.respondToExportStatus(
                            _server,
                            sessionId,
                            {
                                status: 'COMPLETED_WITH_SUCCESS',
                                failure: [],
                                processed: 1,
                                total: 1
                            });
                    },
                    exportStatusUrl: '/network-explorer-import/v1/collection/export/status/'
                },{
                    description: 'Multiselection of LEAF',
                    selectedObjects: [{
                        id: '456',
                        type: 'NESTED',
                        subType: 'LEAF'
                    },{
                        id: '803',
                        type: 'NESTED',
                        subType: 'LEAF'
                    },{
                        id: '999',
                        type: 'NESTED',
                        subType: 'LEAF'
                    }],
                    setupServerMock: function() {
                        REST_network_explorer_import.respondToExportObjectCollection(
                            _server,
                            {
                                sessionId: sessionId,
                                startTime: 1528450705216,
                                timeZone: 'Europe/Dublin'
                            });
                        REST_network_explorer_import.respondToExportStatus(
                            _server,
                            sessionId,
                            {
                                status: 'COMPLETED_WITH_SUCCESS',
                                failure: [],
                                processed: 3,
                                total: 3
                            });
                    },
                    exportStatusUrl: '/network-explorer-import/v1/collection/export/status/'
                }].forEach(function(test) {
                    it(test.description, function(done) {
                        test.setupServerMock();
                        runExportCollectionAction(test.selectedObjects, function(result) {
                            // ASSERT
                            expect(result.success).to.equal(true);
                        }, function() {});

                        promises.runTestSteps([
                            NetworkExplorerViewModel.getDialogPrimaryButton,
                            function(button) {
                                expect(button.textContent).to.equal('Download');
                                promises.clickElement(button);
                                return promises.waitUntil(function() {
                                    return !document.querySelector('.ebDialogBox');
                                });
                            },
                            function() {
                                expect(REST_network_explorer_import.getLastUrlRequested()).to.equal(test.exportStatusUrl + sessionId);
                                expect(REST_network_explorer_import.getLastMethodRequested()).to.equal('GET');
                                return done();
                            }
                        ]);
                    });
                });
            });

            describe('Export Collection request fails if selecting BRANCH and LEAF collections together', function() {
                [{
                    description: 'Multiselection mixing BRANCH and LEAF',
                    selectedObjects: [{
                        id: '789',
                        type: 'NESTED',
                        subType: 'BRANCH'
                    },{
                        id: '803',
                        type: 'NESTED',
                        subType: 'LEAF'
                    },{
                        id: '999',
                        type: 'NESTED',
                        subType: 'BRANCH'
                    }]
                }].forEach(function(test) {
                    it(test.description, function(done) {

                        runExportCollectionAction(test.selectedObjects, function() {}, function(result) {
                            // ASSERT
                            expect(result.message).to.equal('Action supports Leaf and search criteria collections only.');
                            done();
                        });
                    });
                });
            });
        });
    });

    function runExportCollectionAction(selectedObjects, onComplete, onFail) {
        new ExportCollection().run({
            onReady: function() {},
            onProgress: function() {},
            onComplete: onComplete,
            onFail: onFail
        },
        selectedObjects
        );
    }
});
