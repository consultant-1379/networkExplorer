define([
    'networkexplorer/actions/RemoveLeafCollection',
    'actionlibrary/ActionLibrary'
], function(
    RemoveLeafCollection,
    ActionLibrary
) {
    describe('RemoveLeafCollection', function() {
        var sandbox, objectUnderTest, callbackObject;
        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });
        afterEach(function() {
            sandbox.restore();
        });
        describe('run()', function() {
            beforeEach(function() {
                // ARRANGE
                callbackObject = {
                    onReady: sandbox.stub(),
                    onFail: sandbox.stub(),
                    onComplete: sandbox.stub()
                };
                objectUnderTest = new RemoveLeafCollection();
            });
            describe('When selection data is', function() {
                [
                    {
                        description: 'empty',
                        data: [],
                        rejectMessage: 'No Collection selected'
                    }, {
                        description: 'a BRANCH collection',
                        data: [{
                            id: '1',
                            type: 'NESTED',
                            subType: 'BRANCH',
                            level: 0
                        }],
                        rejectMessage: 'Action supports Leaf and search criteria collections only.'
                    },
                ].forEach(function(test) {
                    it(test.description + ', the promise is rejected', function(done) {
                        callbackObject.onFail = function(result) {
                            expect(result.message).to.equal(test.rejectMessage);
                            done();
                        };
                        var lifecycle = objectUnderTest.run(callbackObject, test.data);
                        expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                    });
                });
                [
                    {
                        description: 'Single Leaf Collection',
                        data: [{
                            id: '1',
                            type: 'NESTED',
                            subType: 'LEAF',
                            level: 3,
                            parentId: 3,
                            name: 'Collection1'
                        }]
                    }, {
                        description: 'Multiple Leaf Collections',
                        data: [{
                            id: '1',
                            type: 'NESTED',
                            subType: 'LEAF',
                            level: 3,
                            parentId: 3,
                            name: 'Collection1'
                        }, {
                            id: '2',
                            type: 'NESTED',
                            subType: 'LEAF',
                            level: 2,
                            parentId: 4,
                            name: 'Collection2'
                        }]
                    },
                ].forEach(function(test) {
                    it(test.description + ', the promise is resolved', function(done) {
                        callbackObject.onComplete = function(result) {
                            expect(result).to.be.an.instanceof(ActionLibrary.ActionResult);
                            expect(result.success).to.equal(true);
                            done();
                        };
                        var lifecycle = objectUnderTest.run(callbackObject, test.data);
                        expect(lifecycle).to.be.an.instanceof(ActionLibrary.ActionLifecycle);
                    });
                });
            });
        });
    });
});
