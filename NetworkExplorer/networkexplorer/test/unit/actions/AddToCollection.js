define([
    'jscore/core',
    'container/api',
    'networkexplorer/actions/AddToCollection',
    'actionlibrary/ActionLibrary'
], function(
    core,
    Container,
    AddToCollection,
    ActionLibrary
) {
    describe('AddToCollection', function() {
        var sandbox, objectUnderTest, callbackObject, containerEventBus;
        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });
        afterEach(function() {
            sandbox.restore();
        });
        describe('run()', function() {
            beforeEach(function() {
                // ARRANGE
                containerEventBus = sinon.createStubInstance(core.EventBus);
                sandbox.stub(Container, 'getEventBus', function() { return containerEventBus; });
                callbackObject = {
                    onReady: sandbox.stub(),
                    onFail: sandbox.stub(),
                    onComplete: sandbox.stub()
                };
                objectUnderTest = new AddToCollection();
            });
            describe('Positive flows', function() {
                [{
                    description: 'Making a Single Selection creates a CollectionHandler with single selected object and opens it in a flyout',
                    objects: [{id: '1'}]
                },{
                    description: 'Making a Multiple Selection creates a CollectionHandler with multiple selected objects and opens it in a flyout',
                    objects: [{id: '1'},{id: '2'}]
                }].forEach(function(test) {
                    it(test.description, function(done) {
                        // ARRANGE
                        callbackObject.onComplete = function(result) {
                            // ASSERT #2
                            expect(result).to.be.an.instanceof(ActionLibrary.ActionResult);
                            expect(result.success).to.equal(true);
                            expect(containerEventBus.publish.callCount).to.equal(1);
                            expect(containerEventBus.publish.getCall(0).args[0]).to.equal('flyout:show');
                            done();
                        };
                        // ACT
                        var lifecycle = objectUnderTest.run(callbackObject, test.objects);
                        // ASSERT #1
                        expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                    });
                });
            });
            describe('Negative flows', function() {
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
                        expect(result.message).to.equal('A valid id property was not found in the first selected object');
                        expect(result.complete).to.equal(true);
                        done();
                    };
                    objectUnderTest.run(callbackObject, [{ ID: '1'}]);
                });
            });
        });
    });
});
