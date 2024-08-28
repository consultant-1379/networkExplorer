/*global define, describe, it, expect */
define([
    'jscore/core',
    'networkexplorer/widgets/SharingPermissions/SharingPermissions',
    'networkexplorer/widgets/SharingPermissions/SharingPermissionsView'
], function(core, SharingPermissions, SharingPermissionsView) {
    'use strict';

    describe('SharingPermissions', function() {
        var sandbox, objectUnderTest, dummyElement, dummyRadioPrivate, dummyRadioPublic;
        beforeEach(function() {
            sandbox = sinon.sandbox.create();
            objectUnderTest = new SharingPermissions();
            objectUnderTest.view = new SharingPermissionsView();
            dummyElement = new core.Element();
            dummyRadioPrivate = sinon.createStubInstance(core.Element);
            dummyRadioPublic = sinon.createStubInstance(core.Element);
            sandbox.stub(dummyElement, 'find')
                .withArgs('.eaNetworkExplorer-wSharingPermissions-radioPrivate').returns(dummyRadioPrivate)
                .withArgs('.eaNetworkExplorer-wSharingPermissions-radioPublic').returns(dummyRadioPublic);
            sandbox.stub(objectUnderTest.view, 'getElement').returns(dummyElement);
        });
        afterEach(function() {
            sandbox.restore();
        });

        describe('getSharingPermission()', function() {
            it('Should return "Private" if private checkbox is selected', function() {
                // ARRANGE
                dummyRadioPrivate.getProperty.withArgs('checked').returns(true);
                dummyRadioPublic.getProperty.withArgs('checked').returns(false);
                // ACT
                var retvalue = objectUnderTest.getSharingPermission();
                // ASSERT
                expect(retvalue).to.equal('Private');
            });
            it('Should return "Public" if public checkbox is selected', function() {
                // ARRANGE
                dummyRadioPrivate.getProperty.withArgs('checked').returns(false);
                dummyRadioPublic.getProperty.withArgs('checked').returns(true);
                // ACT
                var retvalue = objectUnderTest.getSharingPermission();
                // ASSERT
                expect(retvalue).to.equal('Public');
            });
        });

        describe('setEnabled()', function() {
            it('Should enable the checkboxes if passed true', function() {
                // ACT
                objectUnderTest.setEnabled(true);
                // ASSERT
                expect(dummyRadioPrivate.setProperty.callCount).to.equal(1);
                expect(dummyRadioPrivate.setProperty.getCall(0).calledWith('disabled', false)).to.equal(true);
                expect(dummyRadioPublic.setProperty.callCount).to.equal(1);
                expect(dummyRadioPublic.setProperty.getCall(0).calledWith('disabled', false)).to.equal(true);
            });
            it('Should disable the checkboxes if passed false', function() {
                // ACT
                objectUnderTest.setEnabled(false);
                // ASSERT
                expect(dummyRadioPrivate.setProperty.callCount).to.equal(1);
                expect(dummyRadioPrivate.setProperty.getCall(0).calledWith('disabled', true)).to.equal(true);
                expect(dummyRadioPublic.setProperty.callCount).to.equal(1);
                expect(dummyRadioPublic.setProperty.getCall(0).calledWith('disabled', true)).to.equal(true);
            });
        });

    });
});
