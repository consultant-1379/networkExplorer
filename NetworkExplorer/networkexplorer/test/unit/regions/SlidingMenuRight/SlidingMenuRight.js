define([
    'jscore/core',
    'networkexplorer/regions/SlidingMenuRight/SlidingMenuRight',
    'networkexplorer/regions/SlidingMenuRight/SlidingMenuRightView',
    'networkobjectlib/AttributesRegion',
    'i18n!networkexplorer/SlidingMenuRight.json'
], function(core, SlidingMenuRight, SlidingMenuRightView, AttributesRegion, strings) {

    describe('SlidingMenuRight', function() {

        var _sandbox, classUnderTest;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            classUnderTest = new SlidingMenuRight();

            // EventBus mock object
            var eventBusStub = sinon.createStubInstance(core.EventBus);
            _sandbox.stub(classUnderTest, 'getEventBus', function() {
                return eventBusStub;
            });

            classUnderTest.attributesRegion = _sandbox.stub({
                start: function() {}
            });

            classUnderTest.view = sinon.createStubInstance(SlidingMenuRightView);

        });

        describe('onStart()', function() {
            it('should create and start sub-Region AttributesRegion', function() {
                // ACT
                classUnderTest.onStart();

                // ASSERT
                expect(classUnderTest.attributesRegion).to.not.equal(undefined);
                expect(classUnderTest.attributesRegion.start.callCount).to.equal(1);
            });
            it('should subscribe to success, clear, fetch error and save success events', function() {
                // ACT
                classUnderTest.onStart();
                // ASSERT
                expect(classUnderTest.getEventBus().subscribe.callCount).to.equal(5);
                expect(classUnderTest.getEventBus().subscribe.getCall(0).calledWith('attributesRegion:load')).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(1).calledWith('attributesRegion:fetch:persistent:success',
                    classUnderTest.showAttributesRegion, classUnderTest)).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(2).calledWith('attributesRegion:clear',
                    classUnderTest.showAttributesRegion, classUnderTest)).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(3).calledWith('attributesRegion:fetch:persistent:error',
                    classUnderTest.showInlineErrorMessage, classUnderTest)).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(4).calledWith('attributesRegion:save:success',
                    classUnderTest.showAttributesSavedToast, classUnderTest)).to.equal(true);
            });
        });

        describe('showInlineErrorMessage()', function() {
            it('should show inline error and hide Attributes Region component with deleted object message when error code = 1000', function() {
                _sandbox.spy(classUnderTest, 'createInlineError');
                // ARRANGE
                var mockError = {
                    title: 'Could not find requested object',
                    message: 'We cannot find the requested object. It may have been removed or is not available at this time. Please try again later.',
                    code: 1000
                };
                // ACT
                classUnderTest.showInlineErrorMessage(mockError);
                // ASSERT
                expect(classUnderTest.view.hideAttributesRegion.callCount).to.equal(1);
                expect(classUnderTest.createInlineError.calledWith(strings.objectDeletedTitle, strings.objectDeletedBody)).to.equal(true);
                expect(classUnderTest.view.showErrorMessage.callCount).to.equal(1);
                expect(classUnderTest.view.hideLoader.callCount).to.equal(1);
            });
            it('should show inline error and hide Attributes Region component with access denied message with error code = 10015', function() {
                _sandbox.spy(classUnderTest, 'createInlineError');
                // ARRANGE
                var mockError = {
                    title: 'Access Denied',
                    message: 'Your role does not allow you perform this operation. Contact your System Administrator to change your access rights.',
                    code: 10015
                };
                // ACT
                classUnderTest.showInlineErrorMessage(mockError);
                // ASSERT
                expect(classUnderTest.view.hideAttributesRegion.callCount).to.equal(1);
                expect(classUnderTest.createInlineError.calledWith(strings.accessDeniedTitle, strings.accessDeniedBody, 'error')).to.equal(true);
                expect(classUnderTest.view.showErrorMessage.callCount).to.equal(1);
                expect(classUnderTest.view.hideLoader.callCount).to.equal(1);
            });
            it('should show inline error and hide Attributes Region component with TBAC access denied message with error code = 10023', function() {
                _sandbox.spy(classUnderTest, 'createInlineError');
                // ARRANGE
                var mockError = {
                    title: 'Access Denied',
                    message: 'Your Target Based Access Control rights do not allow you to access this Managed Object. Contact your Security Administrator to change your access rights.',
                    code: 10023
                };
                // ACT
                classUnderTest.showInlineErrorMessage(mockError);
                // ASSERT
                expect(classUnderTest.view.hideAttributesRegion.callCount).to.equal(1);
                expect(classUnderTest.createInlineError.calledWith(strings.accessDeniedTitle, strings.accessDeniedBodyTBAC, 'error')).to.equal(true);
                expect(classUnderTest.view.showErrorMessage.callCount).to.equal(1);
                expect(classUnderTest.view.hideLoader.callCount).to.equal(1);
            });
            it('should show inline error and hide Attributes Region component with unknown error message when any other error code', function() {
                _sandbox.spy(classUnderTest, 'createInlineError');
                // ARRANGE
                var mockError = {
                    title: 'Unknown Error',
                    message: 'Unknown Error',
                    code: -1
                };
                // ACT
                classUnderTest.showInlineErrorMessage(mockError);
                // ASSERT
                expect(classUnderTest.view.hideAttributesRegion.callCount).to.equal(1);
                expect(classUnderTest.createInlineError.calledWith(strings.unknownServerErrorTitle, strings.unknownServerErrorBody, 'error')).to.equal(true);
                expect(classUnderTest.view.showErrorMessage.callCount).to.equal(1);
                expect(classUnderTest.view.hideLoader.callCount).to.equal(1);
            });
        });

        describe('showAttributesRegion()', function() {
            it('should show Attributes Region and hide inline error', function() {
                // ACT
                classUnderTest.showAttributesRegion();
                // ASSERT
                expect(classUnderTest.view.showAttributesRegion.callCount).to.equal(1);
                expect(classUnderTest.view.hideErrorMessage.callCount).to.equal(1);
            });
        });

        describe('showAttributesSavedToast', function() {
            it('should publish event to show toast with correct options', function() {
                // ARRANGE
                var options = {
                    color: 'green',
                    icon: 'ebIcon ebIcon_tick',
                    label: strings.attributeChangesSaved,
                    content: 'success',
                    showCloseButton: true,
                    showAsToast: true,
                    autoDismiss: true,
                    autoDismissDuration: 2000
                };
                // ACT
                classUnderTest.showAttributesSavedToast();
                // ASSERT
                expect(classUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(classUnderTest.getEventBus().publish.getCall(0).calledWith(
                    'SlidingMenuRight:showAttributesSavedToast', options)).to.equal(true);
            });
        });
    });

});
