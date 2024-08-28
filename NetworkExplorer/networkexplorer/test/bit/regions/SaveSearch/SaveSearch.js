/*global define, describe, it, expect */
define([
    'jscore/core',
    'container/api',
    'src/networkexplorer/regions/SaveSearch/SaveSearch',
    'test/bit/viewmodels/SaveSearchViewModel',
    'test/bit/bitPromises',
    'i18n!networkexplorer/SaveSearch.json'
],  function(core, container, SaveSearch, SaveSearchViewModel, promises, SaveSearchLocale) {
    'use strict';

    describe('SaveSearch', function() {
        var currentApp, AppWithRegionOnTest, server, _sandbox;
        var searchText = 'all objects of type networkElement';

        var beforeEachCreateApp = function() {
            window.location.hash = '';
            // Create a generic app with View and root DOM element.
            AppWithRegionOnTest = core.App.extend({

                View: core.View.extend({
                    getTemplate: function() {
                        return '<div></div>';
                    }
                }),

                // Place the Region into a generic app.
                onStart: function() {
                    this.regionOnTest = new SaveSearch({
                        context: this.getContext(),
                        data: searchText
                    });
                    this.regionOnTest.start(this.getElement());
                },

                onStop: function() {
                    this.regionOnTest.stop();
                }
            });

            currentApp = new AppWithRegionOnTest();
            currentApp.start(core.Element.wrap(document.getElementById('bitContainer')));
        };

        beforeEach(function(done) {
            //Create fake server
            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            server = _sandbox.server;
            server.autoRespond = true;
            server.autoRespondAfter = 10;
            beforeEachCreateApp();
            done();
        });

        afterEach(function() {
            currentApp.stop();
            currentApp.detach();
            _sandbox.restore();
        });

        it('should show the region and hide it when cancel selected', function(done) {
            var eventHide=false;

            currentApp.getEventBus().subscribe('savesearch:hide', function() { eventHide=true; });
            promises.runTestSteps([
                SaveSearchViewModel.getSearchNameInput,
                function(SearchNameInput) {
                    expect(promises.isElementVisible(SearchNameInput)).to.equal(true);
                    return SaveSearchViewModel.getRadioPublicSharingRadioButton();
                },
                function(radioPublic) {
                    expect(promises.isElementVisible(radioPublic)).to.equal(true);
                    return SaveSearchViewModel.getPrivateSharingRadioButton();
                },
                function(radioPrivate) {
                    expect(promises.isElementVisible(radioPrivate)).to.equal(true);
                    return SaveSearchViewModel.getSubmitButton();
                },
                function(submitButton) {
                    return SaveSearchViewModel.getCancelButton();
                },
                function(cancelButton) {
                    promises.clickElement(cancelButton);
                    expect(eventHide).to.equal(true);
                    done();
                }
            ]);
        });

        var validChars = 'abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ -_.     |!£$%&/()[]{}\'@#+*=?^;,:°§"';
        it('should accept a name containing only ' + validChars + ' characters', function(done) {
            promises.runTestSteps([
                SaveSearchViewModel.getSearchNameInput,
                function(SearchNameInput) {
                    promises.enterInputFieldValue(SearchNameInput, validChars);
                    return SaveSearchViewModel.getInputStatusErrorText();
                },
                function(errorLabel) {
                    // check the warning is not visible
                    expect(promises.isElementVisible(errorLabel)).to.equal(false);
                    done();
                }
            ]);
        });

        var inputTest = [
            {
                input: 'dummysearch',
                message: ''
            },{
                input: '',
                message: 'nameRequired'
            },{
                input: 'dummy*search',
                message: ''
            },{
                input: '',
                message: 'nameRequired'
            }
        ];
        it('should show/hide the error messages as expected while editing the saved search name field', function(done) {
            this.timeout(5000);
            var SearchNameInput;
            promises.runTestSteps([
                SaveSearchViewModel.getSearchNameInput,
                function(input) {
                    SearchNameInput = input;
                    return SaveSearchViewModel.getInputStatusErrorText(20);
                },
                function(errorLabel) {
                    // check initially no error message is show
                    expect(promises.isElementVisible(errorLabel)).to.equal(false);
                    // check the inputs and related messages one by one
                    inputTest.forEach(function(data) {
                        promises.enterInputFieldValue(SearchNameInput, data.input);
                        if (data.message !== '') {
                            // check error message is visible and right
                            expect(promises.isElementVisible(errorLabel)).to.equal(true);
                            expect(errorLabel.innerText).to.equal(SaveSearchLocale.get(data.message));
                        } else {
                            // check error message is not visible
                            expect(promises.isElementVisible(errorLabel)).to.equal(false);
                        }
                    });
                    done();
                }
            ]);
        });

        var submitTest = [
            {
                input: '',
                message: 'nameRequired',
                input2: 'dummysearch',
                message2: ''
            },{
                input: searchText,
                message: 'nameCannotEqualContentLabel',
                input2: 'dummysearch',
                message2: ''
            }
        ];
        it('insert an invalid/empty name, submit and reinsert, should show/hide error messages as expected', function(done) {
            this.timeout(5000);
            var searchNameInput, submitButton, inlineError;
            var submitButton;
            promises.runTestSteps([
                SaveSearchViewModel.getSearchNameInput,
                function(input) {
                    searchNameInput = input;
                    return SaveSearchViewModel.getSubmitButton();
                },
                function(submit) {
                    submitButton = submit;
                    return SaveSearchViewModel.getInlineError(20);
                },
                function(inlineerror) {
                    inlineError = inlineerror;
                    // check initially no error message is show
                    expect(promises.isElementVisible(inlineerror)).to.equal(false);
                    return SaveSearchViewModel.getInputStatusErrorText(20);
                },
                function(errorLabel) {
                    // check initially no error message is show
                    expect(promises.isElementVisible(errorLabel)).to.equal(false);
                    // check the inputs sequence and related errors
                    submitTest.forEach(function(data) {
                        // insert the first name, submit and check results
                        promises.enterInputFieldValue(searchNameInput, data.input);
                        promises.clickElement(submitButton);
                        if (data.message !== '') {
                            // check error message is visible and right
                            expect(promises.isElementVisible(errorLabel)).to.equal(true);
                            expect(errorLabel.innerText).to.equal(SaveSearchLocale.get(data.message));
                        } else {
                            expect(promises.isElementVisible(errorLabel)).to.equal(false);
                        }
                        // check the inline error is show on top of flyout
                        expect(promises.isElementVisible(inlineError)).to.equal(true);

                        // insert the second name and check results
                        promises.enterInputFieldValue(searchNameInput, data.input2);
                        if (data.message2 !== '') {
                            // check error message is visible and right
                            expect(promises.isElementVisible(errorLabel)).to.equal(true);
                            expect(errorLabel.innerText).to.equal(SaveSearchLocale.get(data.message2));
                        } else {
                            expect(promises.isElementVisible(errorLabel)).to.equal(false);
                        }
                        // check the inline error is shown on top of flyout
                        expect(promises.isElementVisible(inlineError)).to.equal(true);
                    });
                    done();
                }
            ]);
        });

        [
            {
                descr: 'create a public saved search with success response',
                name: 'dummysearch_public',
                category: 'Public',
                responseCode: 200,
                responseObj: {
                    'name': this.name,
                    'category': this.category,
                    'searchQuery': searchText
                }
            },{
                descr: 'create a private saved search with success response',
                name: 'dummysearch_private',
                category: 'Private',
                responseCode: 200,
                responseObj: {
                    'name': this.name,
                    'category': this.category,
                    'searchQuery': searchText
                }
            }
        ].forEach(function(test) {
            it(test.descr, function(done) {
                var loaderShowSpy = sinon.spy();
                var loaderHideSpy = sinon.spy();
                var successfulSpy = sinon.spy();
                server.respondWith('/topologyCollections/savedSearches', [test.responseCode, { 'Content-Type': 'application/json' },
                    JSON.stringify(test.responseObj)
                ]);
                container.getEventBus().subscribe('container:loader', loaderShowSpy, this);
                container.getEventBus().subscribe('container:loader-hide', loaderHideSpy, this);
                currentApp.getEventBus().subscribe('savesearch:on-save', function() {
                    server.respond();
                }, this);
                currentApp.getEventBus().subscribe('savesearch:success', successfulSpy, this);
                currentApp.getEventBus().subscribe('savesearch:hide',function() {
                    expect(successfulSpy.callCount).to.equal(1);
                    expect(loaderHideSpy.callCount).to.equal(1);
                    done();
                }, this);
                promises.runTestSteps([
                    SaveSearchViewModel.getSearchNameInput,
                    function(SearchNameInput) {
                        expect(SearchNameInput.value).to.equal('');
                        promises.enterInputFieldValue(SearchNameInput, test.name);
                        return (test.category === 'Public')?SaveSearchViewModel.getRadioPublicSharingRadioButton():SaveSearchViewModel.getPrivateSharingRadioButton();
                    },
                    promises.clickElement,
                    SaveSearchViewModel.getSubmitButton,
                    promises.clickElement,
                    function() {
                        expect(loaderShowSpy.callCount).to.equal(1);
                        return Promise.resolve();
                    }
                ]);
            });
        });

        [
            {
                descr: 'create saved search with 406 Service Unavailable error response',
                name: 'dummysearch_public',
                response: [406, { 'Content-Type': 'application/json' },
                    JSON.stringify({
                        'userMessage': {
                            'title': 'Service Unavailable',
                            'body': 'Service Unavailable. Cannot create saved search'
                        },
                        'internalErrorCode': 10025
                    }) ],
                expectedErrorText: 'Service Unavailable. Cannot create saved search'
            },{
                descr: 'create saved search with 409 name not unique error response',
                name: 'dummysearch_public',
                response: [409, { 'Content-Type': 'application/json' },
                    JSON.stringify({
                        'userMessage': {
                            'title': 'Saved Search already exists',
                            'body': 'Saved Search with the same name already exists'
                        },
                        'internalErrorCode': 10010
                    }) ],
                expectedErrorText: 'Saved Search with the same name already exists'
            },{
                descr: 'create saved search with 404 server internal error response',
                name: 'dummysearch_public',
                response: [404, { 'Content-Type': 'application/json' },
                    '<html 404 errbody>' ],
                expectedErrorText: 'The server encountered an internal error. Please try again later or contact your System Administrator.'
            },{
                descr: 'create saved search with 401 unauthorised error response',
                name: 'dummysearch_public',
                response: [401, { 'Content-Type': 'application/json' },
                    JSON.stringify({
                        userMessage: {
                            title: 'Unauthorised',
                            body: 'You are unauthorised to view this.'
                        }
                    }) ],
                expectedErrorText: 'You are unauthorised to view this.'
            },{
                descr: 'create saved search with 500 too many objects error response',
                name: 'dummysearch_public',
                response: [500, { 'Content-Type': 'application/json' },
                    JSON.stringify({
                        userMessage: {
                            title: 'OOM occurred',
                            body: 'OOM occurred, too many objects requested'
                        }
                    }) ],
                expectedErrorText: 'OOM occurred, too many objects requested'
            }
        ].forEach(function(test) {
            it(test.descr, function(done) {
                this.timeout(5000);
                var loaderShowSpy = sinon.spy();
                var loaderHideSpy = sinon.spy();
                var unexpectedSpy = sinon.spy();
                server.respondWith('/topologyCollections/savedSearches', test.response);
                container.getEventBus().subscribe('container:loader', loaderShowSpy, this);
                container.getEventBus().subscribe('container:loader-hide', loaderHideSpy, this);
                currentApp.getEventBus().subscribe('savesearch:on-save', function() {
                    server.respond();
                }, this);
                currentApp.getEventBus().subscribe('savesearch:success', unexpectedSpy, this);
                currentApp.getEventBus().subscribe('savesearch:hide', unexpectedSpy, this);
                promises.runTestSteps([
                    SaveSearchViewModel.getSearchNameInput,
                    function(SearchNameInput) {
                        return promises.enterInputFieldValue(SearchNameInput, test.name);
                    },
                    SaveSearchViewModel.getSubmitButton,
                    promises.clickElement,
                    SaveSearchViewModel.getErrorDialogBox,
                    function(dialogBox) {
                        expect(dialogBox[0]).not.to.be.undefined;
                        return SaveSearchViewModel.getDialogHeader();
                    },
                    function(dialogHeader) {
                        expect(dialogHeader.innerText).to.equal(SaveSearchLocale.get('unableToSaveSearchLabel'));
                        return SaveSearchViewModel.getDialogMessage();
                    },
                    function(dialogMessage) {
                        expect(dialogMessage.innerText).to.equal(test.expectedErrorText);
                        return SaveSearchViewModel.getErrorDialogOkButton();
                    },
                    promises.clickElement,
                    function() {
                        expect(loaderShowSpy.callCount).to.equal(1);
                        return Promise.resolve();
                    },
                    promises.skipFrames,
                    SaveSearchViewModel.getErrorDialogBox,
                    function(dialogBox) {
                        expect(dialogBox[0]).to.be.undefined;
                        expect(loaderHideSpy.callCount).to.equal(1);
                        expect(unexpectedSpy.callCount).to.equal(0);
                        done();
                    }
                ]);
            });
        });

        it('should work after a stop/start of the region', function(done) {
            var id = container.getEventBus().subscribe('container:loader', function() {
                container.getEventBus().unsubscribe('container:loader',id);
                done();
            }, this);
            promises.runTestSteps([
                function() {
                    currentApp.regionOnTest.stop();
                    currentApp.regionOnTest.start(currentApp.getElement());
                    return SaveSearchViewModel.getSearchNameInput();
                },
                function(SearchNameInput) {
                    expect(SearchNameInput.value).to.equal('');
                    return promises.enterInputFieldValue(SearchNameInput, 'dummysearch');
                },
                SaveSearchViewModel.getSubmitButton,
                promises.clickElement
            ]);
        });

    });
});
