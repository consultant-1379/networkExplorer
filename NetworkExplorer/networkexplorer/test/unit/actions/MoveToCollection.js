define([
    'jscore/core',
    'container/api',
    'networkexplorer/actions/MoveToCollection',
    'actionlibrary/ActionLibrary'
], function(core, Container, MoveToCollection, ActionLibrary) {
    describe('MoveToCollection', function() {

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
                objectUnderTest = new MoveToCollection();
            });

            describe('Initialize successfully', function() {
                it('should initialize successfully when making a Single Selection, an EmbeddedScopingPanel is created and opens it in a flyout', function(done) {
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
                    var lifecycle = objectUnderTest.run(callbackObject, [{id: '1'}]);
                    // ASSERT #1
                    expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                });
            });

            describe('Initialize fails', function() {
                it('should fail when a collection is not selected', function(done) {
                    callbackObject.onFail = function(result) {
                        expect(result.message).to.equal('No collection selected');
                        expect(result.complete).to.equal(true);
                        done();
                    };
                    objectUnderTest.run(callbackObject, []);
                });

                it('should fail when the selections contains collections without a valid id key is not allowed', function(done) {
                    callbackObject.onFail = function(result) {
                        expect(result.message).to.equal('A valid identifier was not found for the selected collection');
                        expect(result.complete).to.equal(true);
                        done();
                    };
                    objectUnderTest.run(callbackObject, [{ ID: '1'}]);
                });

                it('should fail when the selection contains multiple collections and is not allowed', function(done) {
                    callbackObject.onFail = function(result) {
                        expect(result.message).to.equal('Multiple selection is not supported');
                        expect(result.complete).to.equal(true);
                        done();
                    };
                    objectUnderTest.run(callbackObject, [{ id: '1' }, { id: '2' }]);
                });
            });
        });

    });
});
