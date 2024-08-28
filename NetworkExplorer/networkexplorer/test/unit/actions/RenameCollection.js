define([
    'jscore/core',
    'container/api',
    'networkexplorer/actions/RenameCollection',
    'actionlibrary/ActionLibrary'
], function(
    core,
    Container,
    RenameCollection,
    ActionLibrary
) {
    describe('RenameCollection', function() {
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
                objectUnderTest = new RenameCollection();
            });
            describe('Should rename', function() {
                [{
                    description: 'a BRANCH collection',
                    objects: [{
                        id: '281474978820195',
                        name: 'branch_with_parent',
                        parentId: '1234',
                        type: 'NESTED',
                        subType: 'BRANCH',
                        level: 1
                    }],
                    isNestedCollection: true
                }, {
                    description: 'LEAF collection',
                    objects: [{
                        id: '281495019759743',
                        name: 'leaf_with_parent',
                        parentId: '1234',
                        type: 'NESTED',
                        subType: 'BRANCH',
                        level: 1
                    }],
                    isNestedCollection: true
                }, {
                    description: 'regular collection',
                    objects: [{
                        category: 'Private',
                        id: '281495019759743',
                        name: 'collection'
                    }],
                    isNestedCollection: false
                }].forEach(function(test) {
                    it(test.description +  ' creates a CollectionCreator object with the selected object id and opens it in a flyout', function(done) {
                        // ARRANGE
                        callbackObject.onComplete = function(result) {
                            // ASSERT #2
                            expect(result).to.be.an.instanceof(ActionLibrary.ActionResult);
                            expect(result.success).to.equal(true);
                            expect(containerEventBus.publish.callCount).to.equal(1);
                            expect(containerEventBus.publish.getCall(0).args[0]).to.equal('flyout:show');
                            expect(containerEventBus.publish.getCall(0).args[1].content.options.isNestedCollection).to.equal(test.isNestedCollection);
                            expect(containerEventBus.publish.getCall(0).args[1].content.options.id).to.equal(test.objects[0].id);
                            done();
                        };
                        // ACT
                        var lifecycle = objectUnderTest.run(callbackObject, test.objects);
                        // ASSERT #1
                        expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                    });
                });
            });
            describe('When selection data is', function() {
                [
                    {
                        description: 'empty',
                        data: [],
                        rejectMessage: 'Action supports single-selection only.'
                    }, {
                        description: 'a root BRANCH at level 0',
                        data: [{ id: '1', type: 'NESTED', subType: 'BRANCH', level: 0}],
                        rejectMessage: 'Action does not support ROOT Collections.'
                    }, {
                        description: 'a root BRANCH with no parent',
                        data: [{ id: '1', type: 'NESTED', subType: 'BRANCH', parentId: undefined}],
                        rejectMessage: 'Action does not support ROOT Collections.'
                    }, {
                        description: 'more than one id',
                        data: [{ id: '1'}, {id: '2'}],
                        rejectMessage: 'Action supports single-selection only.'
                    }
                ].forEach(function(test) {
                    it(test.description + ', the promise is rejected', function(done) {
                        callbackObject.onFail = function(result) {
                            expect(result.message).to.equal(test.rejectMessage);
                            expect(result.complete).to.equal(true);
                            done();
                        };
                        objectUnderTest.run(callbackObject, test.data);
                    });
                });
            });
        });
    });
});
