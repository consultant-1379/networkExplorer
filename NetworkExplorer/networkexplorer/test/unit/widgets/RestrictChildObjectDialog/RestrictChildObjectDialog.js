/*global define, describe, it, expect */
define([
    'jscore/core',
    'networkexplorer/widgets/restrictChildObjectDialog/RestrictChildObjectDialog',
    'networkexplorer/widgets/restrictChildObjectDialog/RestrictChildObjectDialogView',
    'widgets/Dialog'
], function(core, RestrictChildObjectDialog, RestrictChildObjectDialogView, Dialog) {
    'use strict';

    describe('RestrictChildObjectDialog', function() {
        var sandbox, objectUnderTest, dummyElement, dummyContinueContentFragment;
        beforeEach(function() {
            sandbox = sinon.sandbox.create();
            objectUnderTest = new RestrictChildObjectDialog();
            objectUnderTest.view = new RestrictChildObjectDialogView();
            dummyElement = new core.Element();
            dummyContinueContentFragment = sinon.createStubInstance(core.Element);
            sandbox.stub(dummyElement, 'find')
                .withArgs('.eaNetworkExplorer-wRestrictChildObjectCellDialog-content-continue').returns(dummyContinueContentFragment);
            sandbox.stub(objectUnderTest.view, 'getElement').returns(dummyElement);
        });
        afterEach(function() {
            sandbox.restore();
        });

        describe('hideContinueMessage()', function() {
            it('Should return a style display of "none" for the continue fragment if method is called', function() {
                // ACT
                objectUnderTest.hideContinueMessage();
                // ASSERT
                expect(dummyContinueContentFragment.setStyle.callCount).to.equal(1);
            });
        });

        describe('showContinueMessage()', function() {
            it('Should return a style display of "block" for the continue fragment if method is called', function() {
                // ACT
                objectUnderTest.showContinueMessage();
                // ASSERT
                expect(dummyContinueContentFragment.setStyle.callCount).to.equal(1);
            });
        });

        describe('displayRestrictedDialogWithoutContinueButton()', function() {
            it('Should hide the continue fragment if dialog is displayed', function() {
                // ACT
                objectUnderTest.displayRestrictedDialogWithoutContinueButton();
                // ASSERT
                expect(dummyContinueContentFragment.setStyle.callCount).to.equal(1);
            });
        });

        describe('getFilteredObjectsFromResponse()', function() {
            it('Should return a valid array of length "2" if the error message contains two objects ID', function() {
                // ACT
                var retvalue = objectUnderTest.getFilteredObjectsFromResponse("Only 2 Managed Object(s) representing Network Elements can be added to the selected Transport collection, ID's to be sent[123,1234]");
                // ASSERT
                expect(retvalue.length).to.equal(2);
            });
            it('Should return an empty array if the error message contains no objects Id', function() {
                // ACT
                var retvalue = objectUnderTest.getFilteredObjectsFromResponse("Only 0 Managed Object(s) representing Network Elements can be added to the selected Transport collection, ID's to be sent[]");
                // ASSERT
                expect(retvalue.length).to.equal(0);
            });
        });

       describe('numberOfSelectedObjectsInFilteredResponse()', function() {
            it('Should return "1" if the number of selected object in filtered error message is one', function() {
                var errorMessage = "Only 1 Managed Object(s) representing Network Elements can be added to the selected Transport collection, ID's to be sent[41000]";
                var validObjectIdInErrorResponse = [1, 2, 3, 12];
                // ACT
                var retvalue = objectUnderTest.numberOfSelectedObjectsInFilteredResponse(errorMessage);
                // ASSERT
                expect(retvalue).to.equal(1);
            });
            it('Should return "0" if there are no selected object in the filtered error message', function() {
                var errorMessage = "Only 0 Managed Object(s) representing Network Elements can be added to the selected Transport collection, ID's to be sent[]";
                // ACT
                var retvalue = objectUnderTest.numberOfSelectedObjectsInFilteredResponse(errorMessage);
                // ASSERT
                expect(retvalue).to.equal(0);
            });
        });

    });
});
