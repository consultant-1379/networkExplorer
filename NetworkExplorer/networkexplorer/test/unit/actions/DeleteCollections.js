define([
    'test/bit/bitPromises',
    'jscore/core',
    'container/api',
    'networkexplorer/actions/DeleteCollections',
    'actionlibrary/ActionLibrary'
], function(promises, core, Container, DeleteCollection, ActionLibrary) {

    'use strict';

    describe('DeleteCollections', function() {

        var _sandbox, objectUnderTest, callbackObject;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('run()', function() {

            beforeEach(function() {
                objectUnderTest = new DeleteCollection();

                callbackObject = {
                    onReady: _sandbox.stub(),
                    onFail: _sandbox.stub(),
                    onComplete: _sandbox.stub()
                };
            });

            describe('Invalid inputs', function() {
                [
                    {
                        description: 'null',
                        selectedObjects: null,
                        errorMessage: 'Action supports single and multi selection only.'
                    },
                    {
                        description: 'undefined',
                        selectedObjects: undefined,
                        errorMessage: 'Action supports single and multi selection only.'
                    },
                    {
                        description: 'Empty selectedObjects',
                        selectedObjects: [],
                        errorMessage: 'Action supports single and multi selection only.'
                    },
                    {
                        description: 'root selected',
                        selectedObjects: [{id: '100', level: 0,  parentId: null}, {id: '102', level: 2}, {id: '103', level: 3}, {id: '104', level: 4}, {id: '105', level: 5}, {id: '10', level: 0}],
                        errorMessage: 'Action does not support ROOT Collections.'
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {
                        callbackObject.onFail = function(result) {
                            // ASSERT
                            expect(result.success).to.be.false;
                            expect(result.message).to.equal(test.errorMessage);
                            done();
                        };
                        // ACT
                        objectUnderTest.run(callbackObject, test.selectedObjects);
                    });
                });
            });

            describe('Valid inputs', function() {
                [
                    {
                        description: 'single selection',
                        selectedObjects: [{id: '100', level: 1}],
                        errorMessage: 'Action does not support ROOT Collections.'
                    },
                    {
                        description: 'multi selection',
                        selectedObjects: [{id: '100', level: 1}, {id: '102', level: 2}, {id: '103', level: 3}, {id: '104', level: 4}, {id: '105', level: 5}],
                        errorMessage: 'Action does not support ROOT Collections.'
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {
                        callbackObject.onComplete = function(result) {
                            // ASSERT
                            expect(result).to.be.an.instanceof(ActionLibrary.ActionResult);
                            expect(result.success).to.be.true;
                            expect(result.complete).to.be.true;
                            done();
                        };
                        // ACT
                        objectUnderTest.run(callbackObject, test.selectedObjects);
                    });
                });
            });
        });
    });
});
