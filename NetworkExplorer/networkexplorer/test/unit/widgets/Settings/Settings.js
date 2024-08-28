define([
    'jscore/core',
    'networkexplorer/widgets/Settings/Settings',
    'networkexplorer/widgets/Settings/SettingsView',
    'tablelib/TableSettings',
    'widgets/Dialog',
    'i18n!networkexplorer/Settings.json'
], function(core, Settings, View, TableSettings, Dialog, strings) {

    describe('Settings', function() {
        var _sandbox, classUnderTest, eventBusStub, applyButtonStub;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            _sandbox.stub(TableSettings.prototype, 'init');
            _sandbox.stub(TableSettings.prototype, 'onViewReady');
            _sandbox.stub(TableSettings.prototype, 'attachTo');
            classUnderTest = new Settings({columns: []});
            eventBusStub = sinon.createStubInstance(core.EventBus);
            classUnderTest.getEventBus = function() {
                return eventBusStub;
            };
            applyButtonStub = sinon.createStubInstance(core.Element);
            classUnderTest.view = {
                getSettings: function() {},
                getApply: function() {
                    return applyButtonStub;
                }
            };
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('onStart()', function() {
            it('create tableColumns from options', function() {
                // ARRANGE
                classUnderTest.options = {
                    columns: [{
                        name: 'name',
                        value: 'value',
                        width: 0,
                        visible: true,
                        sortable: true
                    }]
                };
                var expectedTableSettingsOptions = {
                    columns: [{
                        title: 'name',
                        attribute: 'value',
                        width: 0,
                        resizable: true,
                        visible: true,
                        sortable: true
                    }]
                };

                // ACT
                classUnderTest.onStart();

                // ASSERT
                expect(TableSettings.prototype.init.callCount).to.equal(1);
                expect(TableSettings.prototype.init.getCall(0).calledWith(expectedTableSettingsOptions)).to.equal(true);
                expect(TableSettings.prototype.attachTo.callCount).to.equal(1);
                expect(applyButtonStub.addEventHandler.callCount).to.equal(1);
                expect(applyButtonStub.addEventHandler.getCall(0).calledWith(
                    'click', classUnderTest.apply, classUnderTest
                )).to.equal(true);
            });
        });

        describe('apply()', function() {
            beforeEach(function() {
                classUnderTest.tableSettings = _sandbox.stub({
                    getUpdatedColumns: function() {}
                });
                _sandbox.stub(classUnderTest, 'showDialog');
            });

            it('should get the updated columns and publish Settings:updateColumns if 1 or more is visible', function() {
                // ARRANGE
                var updateColumnsMock = [{name: 1, visible: true}, {name: 2, visible: false}, {name: 3, visible: true}];
                classUnderTest.tableSettings.getUpdatedColumns.returns(updateColumnsMock);

                // ACT
                classUnderTest.apply();

                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith(
                    'Settings:updateColumns', updateColumnsMock, true
                )).to.equal(true);
                expect(classUnderTest.showDialog.callCount).to.equal(0);
            });

            it('should get the updated columns and show the dialog if none are visible', function() {
                // ARRANGE
                var updateColumnsMock = [{name: 1, visible: false}, {name: 2, visible: false}, {name: 3, visible: false}];
                classUnderTest.tableSettings.getUpdatedColumns.returns(updateColumnsMock);

                // ACT
                classUnderTest.apply();

                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(0);
                expect(classUnderTest.showDialog.callCount).to.equal(1);

            });
        });

        describe('showDialog()', function() {
            beforeEach(function() {
                _sandbox.stub(Dialog.prototype, 'init');
                _sandbox.stub(Dialog.prototype, 'show');
            });

            it('should create a dialog if it doesnt already exist', function() {
                // ACT
                classUnderTest.showDialog();

                // ASSERT
                expect(classUnderTest.dialog).to.not.be.undefined;
                expect(classUnderTest.dialog.init.callCount).to.equal(1);
                expect(classUnderTest.dialog.init.getCall(0).calledWithMatch({
                    type: 'warning',
                    header: strings.noColumnsSelectedHeader,
                    content: strings.noColumnsSelectedBody
                })).to.equal(true);
                expect(classUnderTest.dialog.show.callCount).to.equal(1);
            });

            it('should not create a dialog if it one already exists', function() {
                // ARRANGE
                classUnderTest.dialog = _sandbox.stub({
                    init: function() {},
                    show: function() {}
                });

                // ACT
                classUnderTest.showDialog();

                // ASSERT
                expect(classUnderTest.dialog.init.callCount).to.equal(0);
                expect(classUnderTest.dialog.show.callCount).to.equal(1);
            });
        });

        describe('hideDialog()', function() {
            it('should hide the dialog', function() {
                // ARRANGE
                classUnderTest.dialog = _sandbox.stub({
                    hide: function() {}
                });

                // ACT
                classUnderTest.hideDialog();

                // ASSERT
                expect(classUnderTest.dialog.hide.callCount).to.equal(1);
            });
        });
    });
});
