define([
    'jscore/core',
    'container/api',
    'networkexplorer/actions/CreateNestedCollection',
    'actionlibrary/ActionLibrary'
], function(
    core,
    Container,
    CreateNestedCollection,
    ActionLibrary
) {
    describe('CreateNestedCollection', function() {
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
                objectUnderTest = new CreateNestedCollection();
            });
            describe('Sending', function() {
                [{
                    description: 'root BRANCH collection data',
                    objects: [{
                        'id': '281474978820195',
                        'name': 'Transport Topology',
                        'parentId': null,
                        'type': 'NESTED',
                        'subType': 'BRANCH',
                        'category' : 'Public',
                        'level': 0
                    }]
                }, {
                    description: 'BRANCH collection with parent data',
                    objects: [{
                        'id': '281495019759743',
                        'name': 'branch_with_parent',
                        'parentId': '281474978820195',
                        'type': 'NESTED',
                        'subType': 'BRANCH',
                        'category' : 'Private',
                        'level': 1
                    }]
                }].forEach(function(test) {
                    it(test.description +  ' creates a CollectionCreator object passing Create Collection header, parent object and no isCustomTopology value and opens it in a flyout', function(done) {
                        // ARRANGE
                        callbackObject.onComplete = function(result) {
                            // ASSERT #2
                            expect(result).to.be.an.instanceof(ActionLibrary.ActionResult);
                            expect(result.success).to.equal(true);
                            expect(containerEventBus.publish.callCount).to.equal(1);
                            expect(containerEventBus.publish.getCall(0).args[0]).to.equal('flyout:show');
                            expect(containerEventBus.publish.getCall(0).args[1].content.options.parent).to.equal(test.objects[0]);
                            expect(containerEventBus.publish.getCall(0).args[1].content.options.isCustomTopology).to.equal(undefined);
                            expect(containerEventBus.publish.getCall(0).args[1].header).to.equal('Create Collection');
                            done();
                        };
                        // ACT
                        var lifecycle = objectUnderTest.run(callbackObject, test.objects);
                        // ASSERT #1
                        expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                    });
                });

                describe('Sending no selected collection data ', function() {
                    it('creates a CollectionCreator object passing Create Custom Topology header, no parent and isCustomTopology value as true and opens it in a flyout', function(done) {
                        // ARRANGE
                        callbackObject.onComplete = function(result) {
                            // ASSERT #2
                            expect(result).to.be.an.instanceof(ActionLibrary.ActionResult);
                            expect(result.success).to.equal(true);
                            expect(containerEventBus.publish.callCount).to.equal(1);
                            expect(containerEventBus.publish.getCall(0).args[0]).to.equal('flyout:show');
                            expect(containerEventBus.publish.getCall(0).args[1].content.options.parent.id).to.equal(undefined);
                            expect(containerEventBus.publish.getCall(0).args[1].content.options.isCustomTopology).to.equal(true);
                            expect(containerEventBus.publish.getCall(0).args[1].header).to.equal('Create Custom Topology');
                            done();
                        };
                        // ACT
                        var lifecycle = objectUnderTest.run(callbackObject, [{'id' : '', 'isCustomTopology' : true}]);
                        // ASSERT #1
                        expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                    });
                });
            });
            describe('When selection is', function() {
                [
                    {
                        description: 'empty the promise is rejected',
                        callbackObject: [],
                        rejectMessage: 'No Collection selected'
                    }, {
                        description: 'an invalid id and no isCustomTopology value the promise is rejected',
                        callbackObject: [{ ID: '1'}],
                        rejectMessage: 'A valid id property was not found for a custom topology to be managed'
                    }, {
                        description: 'more than one id the promise is rejected',
                        callbackObject: [{ id: '1'}, {id: '2'}],
                        rejectMessage: 'Multiple selection is not supported'
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {
                        callbackObject.onFail = function(result) {
                            expect(result.message).to.equal(test.rejectMessage);
                            expect(result.complete).to.equal(true);
                            done();
                        };
                        objectUnderTest.run(callbackObject, test.callbackObject);
                    });
                });
            });
        });
    });
});
