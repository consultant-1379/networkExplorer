define([
    'jscore/core',
    'jscore/ext/net',
    'networkexplorer/actions/ExportCollection',
    'networkexplorerlib/widgets/ExportDialog',
    'networkexplorerlib/widgets/CollectionDialog',
    'networkexplorerlib/classes/CommonActions',
    'actionlibrary/ActionLibrary'
], function(
    core,
    net,
    ExportCollection,
    ExportDialog,
    CollectionDialog,
    CommonActions,
    ActionLibrary
) {
    describe('ExportCollection', function() {
        var sandbox, objectUnderTest, callbackObject;
        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });
        afterEach(function() {
            sandbox.restore();
        });
        describe('run()', function() {
            var executeExportOptions;

            beforeEach(function() {
                // ARRANGE
                objectUnderTest = new ExportCollection();

                callbackObject = {
                    onReady: sandbox.stub(),
                    onFail: sandbox.stub(),
                    onComplete: sandbox.stub()
                };
            });
            describe('Should export ', function() {
                it('a leaf collection', function(done) {
                    var objects = [{
                        id: '281474978820195',
                        name: 'leaf1',
                        type: 'NESTED',
                        subType: 'LEAF'
                    }];
                    // ARRANGE
                    sandbox.stub(ExportDialog.prototype);

                    sandbox.stub(CommonActions.prototype, "executeExport", function(options) {
                        executeExportOptions = options;
                        options.success({});
                    });

                    callbackObject.onComplete = function(result) {
                        expect(result).to.be.an.instanceof(ActionLibrary.ActionResult);
                        expect(result.success).to.equal(true);
                        expect(executeExportOptions.idList.collections.length).to.equal(objects.length);
                        for(var index=0; index<objects.length; index++) {
                            expect(executeExportOptions.idList.collections[index]).to.equal(objects[index].id);
                        }
                        done();
                    };
                    // ACT
                    var lifecycle = objectUnderTest.run(callbackObject, objects);
                    // ASSERT #1
                    expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                });
            });

            describe('Should export hybrid collection', function() {
                it('a hybrid collection', function(done) {
                    var objects = [{
                        id: '281474978820195',
                        name: 'leaf1',
                        type: 'NESTED',
                        subType: 'LEAF',
                        hybrid: true
                    }];
                    // ARRANGE
                    sandbox.stub(ExportDialog.prototype);

                    sandbox.stub(CommonActions.prototype, "executeExportNested", function(options) {
                        executeExportOptions = options;
                        options.success({});
                    });

                    callbackObject.onComplete = function(result) {
                        expect(result).to.be.an.instanceof(ActionLibrary.ActionResult);
                        expect(result.success).to.equal(true);
                        expect(executeExportOptions.idList.collections.length).to.equal(objects.length);
                        for(var index=0; index<objects.length; index++) {
                            expect(executeExportOptions.idList.collections[index]).to.equal(objects[index].id);
                        }
                        done();
                    };
                    // ACT
                    var lifecycle = objectUnderTest.run(callbackObject, objects);
                    // ASSERT #1
                    expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                });
            });

            describe('Export fails ', function() {
                it('when the export start request returns a fail', function(done) {
                    var objects =  [{
                        id: '281474978820195',
                        name: 'leaf1',
                        type: 'NESTED',
                        subType: 'LEAF'
                    }];
                    // ARRANGE
                    sandbox.stub(CollectionDialog.prototype, "show", function(){ });

                    sandbox.stub(CommonActions.prototype, "executeExport", function(options) {
                        executeExportOptions = options;
                        options.error({});
                    });

                    callbackObject.onFail = function(result) {
                        expect(executeExportOptions.idList.collections.length).to.equal(objects.length);
                        for(var index=0; index<objects.length; index++) {
                            expect(executeExportOptions.idList.collections[index]).to.equal(objects[index].id);
                        }
                        done();
                    };
                    // ACT
                    var lifecycle = objectUnderTest.run(callbackObject, objects);
                    // ASSERT #1
                    expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                });
            });

            describe('Export hybrid collection fails ', function() {
                it('when the export start request returns a fail hybrid collection', function(done) {
                    var objects =  [{
                        id: '281474978820195',
                        name: 'leaf1',
                        type: 'NESTED',
                        subType: 'LEAF',
                        hybrid: true
                    }];
                    // ARRANGE
                    sandbox.stub(CollectionDialog.prototype, "show", function(){ });

                    sandbox.stub(CommonActions.prototype, "executeExportNested", function(options) {
                        executeExportOptions = options;
                        options.error({});
                    });

                    callbackObject.onFail = function(result) {
                        expect(executeExportOptions.idList.collections.length).to.equal(objects.length);
                        for(var index=0; index<objects.length; index++) {
                            expect(executeExportOptions.idList.collections[index]).to.equal(objects[index].id);
                        }
                        done();
                    };
                    // ACT
                    var lifecycle = objectUnderTest.run(callbackObject, objects);
                    // ASSERT #1
                    expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                });
            });

            describe('When selection is ', function() {
                it('empty the promise is rejected', function() {
                    var callbackObject = [];
                    rejectMessage: 'No Collection selected';
                    callbackObject.onFail = function(result) {
                        expect(result.message).to.equal(rejectMessage);
                        expect(result.complete).to.equal(true);
                        done();
                    };
                    objectUnderTest.run(callbackObject, callbackObject);
                });
            });
        });
    });
});