define([
    'jscore/core',
    'container/api',
    'networkexplorer/actions/UpdateCollectionContents',
    'actionlibrary/ActionLibrary'
], function(
    core,
    Container,
    UpdateCollectionContents,
    ActionLibrary
) {
    describe('UpdateCollectionContents', function() {
        var _sandbox, objectUnderTest, callbackObject, containerEventBus;
        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
        });
        afterEach(function() {
            _sandbox.restore();
        });
        describe('run()', function() {
            beforeEach(function() {
                // ARRANGE
                containerEventBus = sinon.createStubInstance(core.EventBus);
                _sandbox.stub(Container, 'getEventBus', function() { return containerEventBus; });
                callbackObject = {
                    onReady: _sandbox.stub(),
                    onFail: _sandbox.stub(),
                    onComplete: _sandbox.stub()
                };
                objectUnderTest = new UpdateCollectionContents();
            });
            describe('Initialize successfully', function() {
                it('when making a Single Selection, action is initialized successfully', function(done) {
                    // ARRANGE
                    callbackObject.onComplete = function(result) {
                        // ASSERT #2
                        expect(result).to.be.an.instanceof(ActionLibrary.ActionResult);
                        expect(result.success).to.equal(true);
                        done();
                    };
                    // ACT
                    var lifecycle = objectUnderTest.run(callbackObject, [{id: '1', query:"MeContext", parentId:"123", type:'LEAF'}]);
                    // ASSERT #1
                    expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                });
            });
            describe('Initialize fails', function() {
                it('An empty Selection is not allowed', function(done) {
                    callbackObject.onFail = function(result) {
                        expect(result.message).to.equal('No object selected');
                        expect(result.complete).to.equal(true);
                        done();
                    };
                    objectUnderTest.run(callbackObject, []);
                });
                it('A Selection which contains objects without a valid id key is not allowed', function(done) {
                    callbackObject.onFail = function(result) {
                        expect(result.message).to.equal('A valid identifier was not found for the selected object');
                        expect(result.complete).to.equal(true);
                        done();
                    };
                    objectUnderTest.run(callbackObject, [{ ID: '1'}]);
                });
                it('A Selection which contains multiple objects is not allowed', function(done) {
                    callbackObject.onFail = function(result) {
                        expect(result.message).to.equal('Multiple selection is not supported');
                        expect(result.complete).to.equal(true);
                        done();
                    };
                    objectUnderTest.run(callbackObject, [{ id: '1' }, { id: '2' }]);
                });
                it('A Selection which does not contains query is not allowed', function(done) {
                    callbackObject.onFail = function(result) {
                        expect(result.message).to.equal('A valid search criteria was not found for the selected object');
                        expect(result.complete).to.equal(true);
                        done();
                    };
                    objectUnderTest.run(callbackObject, [{ id: '1' }]);
                });
            });
        });
    });
});
