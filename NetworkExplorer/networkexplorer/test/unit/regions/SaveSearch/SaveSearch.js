/*global define, describe, it, expect */
define([
    'jscore/core',
    'jscore/ext/net',
    'container/api',
    'widgets/Button',
    'widgets/Dialog',
    'widgets/Notification',
    'networkexplorer/regions/SaveSearch/SaveSearch',
    'networkexplorer/regions/SaveSearch/SaveSearchView',
    'networkexplorer/widgets/SharingPermissions/SharingPermissions',
    'i18n!networkexplorer/SaveSearch.json'
], function(core, net, container, Button, Dialog, Notification, SaveSearch, SaveSearchView,
    SharingPermissions, saveSearchLocale) {
    'use strict';

    describe('SaveSearch', function() {
        var sandbox, objectUnderTest, dummyElement, findStub;
        beforeEach(function() {
            sandbox = sinon.sandbox.create();
            objectUnderTest = new SaveSearch();
        });
        afterEach(function() {
            sandbox.restore();
        });

        describe('onViewReady', function() {
            it('should add event handlers for input field', function() {
                // ARRANGE
                var inputStub = sinon.createStubInstance(core.Element);
                sandbox.stub(objectUnderTest.view, 'getInput').returns(inputStub);
                // ACT
                objectUnderTest.onViewReady();
                // ASSERT
                expect(inputStub.addEventHandler.callCount).to.equal(2);
                expect(inputStub.addEventHandler.getCall(0).calledWith('input', objectUnderTest.onNameInput, objectUnderTest)).to.equal(true);
                expect(inputStub.addEventHandler.getCall(1).calledWith('invalid', objectUnderTest.onNameInvalid, objectUnderTest)).to.equal(true);
            });
            it('handler for input field input event should call the expected callback', function() {
                // ARRANGE
                sandbox.stub(objectUnderTest, 'onNameInput');
                // ACT
                objectUnderTest.onViewReady();
                objectUnderTest.view.getInput().trigger('input');
                // ASSERT
                expect(objectUnderTest.onNameInput.callCount).to.equal(1);
            });
            it('handler for input field invalid event should call the expected callback', function() {
                // ARRANGE
                sandbox.stub(objectUnderTest, 'onNameInvalid');
                // ACT
                objectUnderTest.onViewReady();
                objectUnderTest.view.getInput().trigger('invalid');
                // ASSERT
                expect(objectUnderTest.onNameInvalid.callCount).to.equal(1);
            });
            it('should create and attach the SharingPermissions widget', function() {
                // ARRANGE
                sandbox.spy(SharingPermissions.prototype, 'attachTo');
                objectUnderTest.sharingPermissions = undefined;
                //ACT
                objectUnderTest.onViewReady();
                //ASSERT
                expect(objectUnderTest.sharingPermissions).not.to.equal(undefined);
                expect(objectUnderTest.sharingPermissions instanceof SharingPermissions).to.equal(true);
                expect(SharingPermissions.prototype.attachTo.callCount).to.equal(1);
                expect(SharingPermissions.prototype.attachTo.getCall(0).calledWith(objectUnderTest.view.getSharingPermissions())).to.equal(true);
            });
            it('should add event handlers for submit button', function() {
                // ARRANGE
                var submitBtnStub = sinon.createStubInstance(core.Element);
                sandbox.stub(objectUnderTest.view, 'getSubmitButton').returns(submitBtnStub);
                // ACT
                objectUnderTest.onViewReady();
                // ASSERT
                expect(submitBtnStub.addEventHandler.callCount).to.equal(1);
                expect(submitBtnStub.addEventHandler.getCall(0).calledWith('click')).to.equal(true);
            });
            it('should add event handlers for cancel button', function() {
                // ARRANGE
                var cancelBtnStub = sinon.createStubInstance(core.Element);
                sandbox.stub(objectUnderTest.view, 'getCancelButton').returns(cancelBtnStub);
                // ACT
                objectUnderTest.onViewReady();
                // ASSERT
                expect(cancelBtnStub.addEventHandler.callCount).to.equal(1);
                expect(cancelBtnStub.addEventHandler.getCall(0).calledWith('click')).to.equal(true);
            });
            it('should manage submit button click events', function() {
                // ARRANGE
                sandbox.stub(objectUnderTest, 'clickSubmit');
                // ACT
                objectUnderTest.onViewReady();
                objectUnderTest.view.getSubmitButton().trigger('click');
                // ASSERT
                expect(objectUnderTest.clickSubmit.callCount).to.equal(1);
            });
            it('should manage cancel button click events', function() {
                // ARRANGE
                var eventBusStub = sinon.createStubInstance(core.EventBus);
                sandbox.stub(objectUnderTest, 'getContext').returns({eventBus: eventBusStub});
                sandbox.stub(objectUnderTest, 'hideComponent');
                // ACT
                objectUnderTest.onViewReady();
                objectUnderTest.view.getCancelButton().trigger('click');
                // ASSERT
                expect(objectUnderTest.hideComponent.callCount).to.equal(1);
            });
            it('should enable the widget', function() {
                // ARRANGE
                sandbox.stub(objectUnderTest, 'setEnabled');
                // ACT
                objectUnderTest.onViewReady();
                // ASSERT
                expect(objectUnderTest.setEnabled.callCount).to.equal(1);
                expect(objectUnderTest.setEnabled.getCall(0).calledWithMatch(true)).to.equal(true);
            });
        });

        describe('onNameInput', function() {
            var inputNativeStub, inputFieldStub;
            beforeEach(function() {
                var dummyElement = new core.Element();
                sandbox.stub(objectUnderTest.view, 'getElement').returns(dummyElement);
                var findStub = sandbox.stub(dummyElement, 'find');
                inputNativeStub = { checkValidity: function() { },
                    setCustomValidity: function() { }
                };
                inputFieldStub = sinon.createStubInstance(core.Element);
                inputFieldStub.getNative.returns(inputNativeStub);
                findStub.withArgs('.eaNetworkExplorer-rSaveSearch-nameInput').returns(inputFieldStub);
            });
            it('should check the input field validity', function() {
                // ARRANGE
                sandbox.stub(inputNativeStub, 'checkValidity');
                // ACT
                objectUnderTest.onNameInput();
                // ASSERT
                expect(inputFieldStub.getNative().checkValidity.callCount).to.equal(1);
            });
            it('should reset the field custom validity', function() {
                // ARRANGE
                sandbox.stub(inputNativeStub, 'setCustomValidity');
                // ACT
                objectUnderTest.onNameInput();
                // ASSERT
                expect(inputFieldStub.getNative().setCustomValidity.callCount).to.equal(1);
                expect(inputFieldStub.getNative().setCustomValidity.calledWith('')).to.equal(true);
            });
            it('should set the required attribute', function() {
                // ACT
                objectUnderTest.onNameInput();
                // ASSERT
                expect(inputFieldStub.setAttribute.callCount).to.equal(1);
                expect(inputFieldStub.setAttribute.calledWith('required')).to.equal(true);
            });
        });

        describe('onNameInvalid', function() {
            var inputFieldStub, inputStatusStub;
            beforeEach(function() {
                inputFieldStub = {
                    getValue: function() { },
                    focus: function() { },
                };
                inputStatusStub = {
                    text: '',
                    setText: function(value) { this.text = value; },
                    getText: function() { return this.text; },
                };
                var dummyElement = new core.Element();
                sandbox.stub(objectUnderTest.view, 'getElement').returns(dummyElement);
                var findStub = sandbox.stub(dummyElement, 'find');
                findStub.withArgs('.eaNetworkExplorer-rSaveSearch-nameInput').returns(inputFieldStub);
                findStub.withArgs('.ebInput-statusError').returns(inputStatusStub);
                sandbox.spy(objectUnderTest.view, 'getInputValue');
                sandbox.stub(inputFieldStub, 'focus');
            });
            it('if the saved search name is empty should show the expected message', function() {
                // ARRANGE
                sandbox.stub(inputFieldStub, 'getValue').returns('');
                // ACT
                objectUnderTest.onNameInvalid();
                // ASSERT
                expect(objectUnderTest.view.getInputValue.callCount).to.equal(1);
                expect(inputFieldStub.focus.callCount).to.equal(1);
                expect(inputFieldStub.getValue.callCount).to.equal(1);
                expect(inputStatusStub.getText()).to.equal(saveSearchLocale.get('nameRequired'));
            });
            it('if the saved search name is equal to search query should show the expected message', function() {
                // ARRANGE
                objectUnderTest.options.data = 'some dummy search';
                sandbox.stub(inputFieldStub, 'getValue').returns(objectUnderTest.options.data);
                // ACT
                objectUnderTest.onNameInvalid();
                // ASSERT
                expect(objectUnderTest.view.getInputValue.callCount).to.equal(1);
                expect(inputFieldStub.focus.callCount).to.equal(1);
                expect(inputFieldStub.getValue.callCount).to.equal(1);
                expect(inputStatusStub.getText()).to.equal(saveSearchLocale.get('nameCannotEqualContentLabel'));
            });
        });

        describe('clickSubmit', function() {
            var eventCtxStub, eventBusStub;
            beforeEach(function() {
                sandbox.stub(objectUnderTest, 'getContext').returns({eventBus: eventCtxStub});
                container.getEventBus = function() { return eventBusStub; };
                objectUnderTest.options = { data: 'some search text' };
                objectUnderTest.sharingPermissions = { getValue: function() { return 'Private'; } };
                sandbox.stub(objectUnderTest, 'postSavedSearch');
                sandbox.stub(objectUnderTest, 'setEnabled');
                sandbox.stub(objectUnderTest, 'hideNotification');
                sandbox.stub(objectUnderTest, 'showNotification');
            });
            it('should hide the notification message', function() {
                // ARRANGE
                sandbox.stub(objectUnderTest.view, 'getInputValue').returns('savedsearch');
                sandbox.stub(objectUnderTest.view, 'isNameValid').returns(true);
                // ACT
                objectUnderTest.clickSubmit();
                // ASSERT
                expect(objectUnderTest.hideNotification.callCount).to.equal(1);
            });
            it('should disable the widget before invoke rest', function() {
                // ARRANGE
                sandbox.stub(objectUnderTest.view, 'getInputValue').returns('savedsearch');
                sandbox.stub(objectUnderTest.view, 'isNameValid').returns(true);
                // ACT
                objectUnderTest.clickSubmit();
                // ASSERT
                expect(objectUnderTest.setEnabled.callCount).to.equal(1);
                expect(objectUnderTest.setEnabled.getCall(0).calledWithMatch(true)).to.equal(false);
            });
            it('should call the rest operation if saved search name is valid', function() {
                // ARRANGE
                sandbox.stub(objectUnderTest.view, 'getInputValue').returns('savedsearch');
                sandbox.stub(objectUnderTest.view, 'isNameValid').returns(true);
                // ACT
                objectUnderTest.clickSubmit();
                // ASSERT
                expect(objectUnderTest.postSavedSearch.callCount).to.equal(1);
            });
            it('should show notification bar on top of widget if saved search name is not valid', function() {
                // ARRANGE
                sandbox.stub(objectUnderTest.view, 'getInputValue').returns('saveDsearch');
                sandbox.stub(objectUnderTest.view, 'isNameValid').returns(false);
                // ACT
                objectUnderTest.clickSubmit();
                // ASSERT
                expect(objectUnderTest.showNotification.callCount).to.equal(1);
            });
            it('should show the expected error message if saved search name is equal to search query', function() {
                // ARRANGE
                objectUnderTest.options.data = 'some dummy search';
                sandbox.stub(objectUnderTest.view, 'getInputValue').returns(objectUnderTest.options.data);
                sandbox.stub(objectUnderTest.view, 'isNameValid').returns(false);
                sandbox.stub(objectUnderTest.view, 'setCustomError');
                // ACT
                objectUnderTest.clickSubmit();
                // ASSERT
                expect(objectUnderTest.view.setCustomError.callCount).to.equal(1);
                expect(objectUnderTest.view.setCustomError.getCall(0).calledWithMatch(saveSearchLocale.get('nameCannotEqualContentLabel'))).to.equal(true);
            });

        });

        describe('postSavedSearch', function() {
            var eventCtxStub, eventBusStub;
            var queryUrl;
            beforeEach(function() {
                sandbox.useFakeServer();
                eventCtxStub = sinon.createStubInstance(core.EventBus);
                eventBusStub = sinon.createStubInstance(core.EventBus);
                sandbox.stub(objectUnderTest, 'getContext').returns({eventBus: eventCtxStub});
                container.getEventBus = function() { return eventBusStub; };
                sandbox.stub(objectUnderTest.view, 'getInputValue').returns('savedsearch');
                objectUnderTest.options = { data: 'some search text' };
                objectUnderTest.sharingPermissions = { getSharingPermission: function() { return 'Private'; } };
                sandbox.stub(objectUnderTest, 'showNotification');
                queryUrl = '/topologyCollections/savedSearches';
            });
            it('should publish the show loader message', function() {
                // ACT
                objectUnderTest.postSavedSearch();
                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWithMatch('container:loader')).to.equal(true);
            });
            it('should do the expected POST rest operation', function() {
                // ARRANGE
                sandbox.stub(net, 'ajax');
                // ACT
                objectUnderTest.postSavedSearch();
                // ASSERT
                expect(net.ajax.callCount).to.equal(1);
                expect(net.ajax.getCall(0).calledWithMatch({
                    url: queryUrl,
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        name: objectUnderTest.view.getInputValue(),
                        category: objectUnderTest.sharingPermissions.getSharingPermission(),
                        searchQuery: objectUnderTest.options.data
                    })
                })).to.equal(true);
            });
            it('should publish the hide loader  message if server response is success', function() {
                // ARRANGE
                sandbox.server.respondWith(queryUrl, [ 200, {}, JSON.stringify([ '' ]) ]);
                sandbox.stub(objectUnderTest, 'hideComponent');
                sandbox.stub(objectUnderTest, 'setEnabled');
                // ACT
                objectUnderTest.postSavedSearch();
                sandbox.server.respond();
                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(2);
                expect(eventBusStub.publish.getCall(1).calledWithMatch('container:loader-hide')).to.equal(true);
            });
            it('should publish savedsearch success message if server response is success', function() {
                // ARRANGE
                sandbox.server.respondWith(queryUrl, [ 200, {}, JSON.stringify([ '' ]) ]);
                sandbox.stub(objectUnderTest, 'hideComponent');
                sandbox.stub(objectUnderTest, 'setEnabled');
                // ACT
                objectUnderTest.postSavedSearch();
                sandbox.server.respond();
                // ASSERT
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.getCall(0).calledWithMatch('savesearch:success')).to.equal(true);
            });
            it('should hide the component if server response is success', function() {
                // ARRANGE
                sandbox.server.respondWith(queryUrl, [ 200, {}, JSON.stringify([ '' ]) ]);
                sandbox.stub(objectUnderTest, 'hideComponent');
                sandbox.stub(objectUnderTest, 'setEnabled');
                // ACT
                objectUnderTest.postSavedSearch();
                sandbox.server.respond();
                // ASSERT
                expect(objectUnderTest.setEnabled.callCount).to.equal(1);
                expect(objectUnderTest.setEnabled.getCall(0).calledWithMatch(true)).to.equal(true);
                expect(objectUnderTest.hideComponent.callCount).to.equal(1);
            });
            it('should show the error notification dialog in case of REST error response', function() {
                // ARRANGE
                sandbox.server.respondWith(queryUrl, [ 400, {}, JSON.stringify([ '' ]) ]);
                sandbox.stub(objectUnderTest, 'handleSubmitError');
                // ACT
                objectUnderTest.postSavedSearch();
                sandbox.server.respond();
                // ASSERT
                expect(objectUnderTest.handleSubmitError.callCount).to.equal(1);
            });
        });

        describe('handleSubmitError', function() {
            var eventBusStub, mockResponse, xhrMock;
            beforeEach(function() {
                // ARRANGE
                mockResponse = {
                    'message': 'mockMessage',
                    'userMessage': {'title': 'mockTitle', 'body': 'mockBody'},
                    'internalErrorCode': 12345
                };
                xhrMock = new core.XHR();
                sandbox.stub(xhrMock, 'getResponseText').returns(JSON.stringify(mockResponse));
                sandbox.stub(xhrMock, 'getStatus').returns(406);
                eventBusStub = sinon.createStubInstance(core.EventBus);
                container.getEventBus = function() { return eventBusStub; };
            });
            it('should publish the hide loader  message if server response is success', function() {
                // ARRANGE
                objectUnderTest.dialog = undefined;
                // ACT
                objectUnderTest.handleSubmitError('', xhrMock);
                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWithMatch('container:loader-hide')).to.equal(true);
            });
            it('if should create and show the dialog error', function() {
                // ARRANGE
                objectUnderTest.dialog = undefined;
                // ACT
                objectUnderTest.handleSubmitError('', xhrMock);
                // ASSERT
                expect(objectUnderTest.dialog).not.to.equal(undefined);
                expect(objectUnderTest.dialog instanceof Dialog).to.equal(true);
                expect(JSON.stringify(objectUnderTest.dialog.options)).to.equal(JSON.stringify({
                    header: saveSearchLocale.get('unableToSaveSearchLabel'),
                    content: 'mockBody',
                    type: 'error',
                    buttons: [{
                        caption: saveSearchLocale.get('ok'),
                        color: 'darkBlue',
                        action: objectUnderTest.closeDialog.bind(objectUnderTest)
                    }],
                    visible: true
                }));
            });
            it('clicking the ok button on dialog should close it', function() {
                // ARRANGE
                objectUnderTest.dialog = undefined;
                sandbox.stub(objectUnderTest, 'closeDialog');
                // ACT
                objectUnderTest.handleSubmitError('', xhrMock);
                objectUnderTest.dialog.getButtons()[0].trigger('click');
                // ASSERT
                expect(objectUnderTest.closeDialog.callCount).to.equal(1);
            });
            it('if should not create the dialog if it already exist', function() {
                // ARRANGE
                var mockDialog = sinon.createStubInstance(core.Element);
                objectUnderTest.dialog = mockDialog;
                // ACT
                objectUnderTest.handleSubmitError('', xhrMock);
                // ASSERT
                expect(objectUnderTest.dialog).to.equal(mockDialog);
            });
        });

        describe('closeDialog', function() {
            it('if should hide and detach the dialog', function() {
                // ARRANGE
                var mockDialog = sinon.createStubInstance(Dialog);
                objectUnderTest.dialog = mockDialog;
                // ACT
                objectUnderTest.closeDialog();
                // ASSERT
                expect(mockDialog.hide.callCount).to.equal(1);
                expect(objectUnderTest.dialog).to.equal(undefined);
            });
        });

        describe('setEnabled', function() {
            var inputstub, sharingPermissionsStub, submitStub, cancelStub;
            beforeEach(function() {
                inputstub = sinon.createStubInstance(core.Element);
                submitStub = sinon.createStubInstance(core.Element);
                cancelStub = sinon.createStubInstance(core.Element);
                sharingPermissionsStub = { setEnabled: function() {} };
                sandbox.stub(objectUnderTest.view, 'getInput').returns(inputstub);
                sandbox.stub(objectUnderTest.view, 'getSubmitButton').returns(submitStub);
                sandbox.stub(objectUnderTest.view, 'getCancelButton').returns(cancelStub);
                objectUnderTest.sharingPermissions = sharingPermissionsStub;
                sandbox.stub(sharingPermissionsStub, 'setEnabled');
            });
            it('should enable the flyout widgets if parameter true', function() {
                // ACT
                objectUnderTest.setEnabled(true);
                // ASSERT
                expect(inputstub.setProperty.getCall(0).calledWithMatch('disabled', false)).to.equal(true);
                expect(submitStub.setProperty.getCall(0).calledWithMatch('disabled', false)).to.equal(true);
                expect(cancelStub.setProperty.getCall(0).calledWithMatch('disabled', false)).to.equal(true);
                expect(sharingPermissionsStub.setEnabled.getCall(0).calledWithMatch(true)).to.equal(true);
            });
            it('should disable the flyout widgets if parameter false', function() {
                // ACT
                objectUnderTest.setEnabled(false);
                // ASSERT
                expect(inputstub.setProperty.getCall(0).calledWithMatch('disabled', true)).to.equal(true);
                expect(submitStub.setProperty.getCall(0).calledWithMatch('disabled', true)).to.equal(true);
                expect(cancelStub.setProperty.getCall(0).calledWithMatch('disabled', true)).to.equal(true);
                expect(sharingPermissionsStub.setEnabled.getCall(0).calledWithMatch(false)).to.equal(true);
            });
        });

        describe('showNotification', function() {
            it('should create and show the notification field on top of widget', function() {
                // ARRANGE
                var offsetWidth = 135;
                var nativeStub = { offsetWidth: offsetWidth };
                var elementStub = sinon.createStubInstance(core.Element);
                elementStub.getNative.returns(nativeStub);
                sandbox.stub(objectUnderTest.view, 'getElement').returns(elementStub);
                sandbox.stub(Notification.prototype, 'attachTo');
                objectUnderTest.defaultNotification = undefined;
                // ACT
                objectUnderTest.showNotification();
                // ASSERT
                expect(objectUnderTest.defaultNotification).not.to.equal(undefined);
                expect(objectUnderTest.defaultNotification instanceof Notification).to.equal(true);
                expect(JSON.stringify(objectUnderTest.defaultNotification.options)).to.equal(JSON.stringify({
                    color: 'red',
                    icon: 'error',
                    label: saveSearchLocale.get('correctErrorsAndTryAgainLabel'),
                    autoDismiss: false,
                    width: offsetWidth
                }));
                expect(Notification.prototype.attachTo.callCount).to.equal(1);
                expect(Notification.prototype.attachTo.getCall(0).calledWith(objectUnderTest.view.getSharingPermissions())).to.equal(true);
            });
            it('should not create the notification field if already exists', function() {
                // ARRANGE
                var notificationStub = sinon.createStubInstance(core.Element);
                sandbox.stub(Notification.prototype, 'attachTo');
                objectUnderTest.defaultNotification = notificationStub;
                // ACT
                objectUnderTest.showNotification();
                // ASSERT
                expect(objectUnderTest.defaultNotification).to.equal(notificationStub);
                expect(Notification.prototype.attachTo.callCount).to.equal(0);
            });
        });

        describe('hideNotification', function() {
            it('should hide and detach the notification field if exists', function() {
                // ARRANGE
                var notificationStub = sinon.createStubInstance(Notification);
                objectUnderTest.defaultNotification = notificationStub;
                // ACT
                objectUnderTest.hideNotification();
                // ASSERT
                expect(objectUnderTest.defaultNotification).to.be.undefined;
                expect(notificationStub.detach.callCount).to.equal(1);
            });
            it('should do nothing if the notification field doesn\'t exist', function() {
                // ARRANGE
                sandbox.stub(Notification.prototype, 'detach');
                objectUnderTest.defaultNotification = undefined;
                // ACT
                objectUnderTest.hideNotification();
                // ASSERT
                expect(objectUnderTest.defaultNotification).to.be.undefined;
                expect(Notification.prototype.detach.callCount).to.equal(0);
            });
        });

        describe('hideComponent', function() {
            it('should publish the hide message', function() {
                // ARRANGE
                var eventBusStub = sinon.createStubInstance(core.EventBus);
                sandbox.stub(objectUnderTest, 'getEventBus').returns(eventBusStub);
                // ACT
                objectUnderTest.hideComponent();
                // ASSERT
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.getCall(0).calledWithMatch('savesearch:hide')).to.equal(true);
            });
        });
    });
});
