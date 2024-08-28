define([
    'test/bit/bitPromises',
    'jscore/core',
    'container/api',
    'networkexplorerlib/ObjectConfigurationApi',
    'networkexplorer/actions/RemoveFromThisCollection'
], function(promises, core, Container, ObjectConfigurationApi, RemoveFromThisCollection) {

    'use strict';

    describe('RemoveFromThisCollection', function() {

        var _sandbox, objectUnderTest, callbackObject;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('run()', function() {

            beforeEach(function() {
                objectUnderTest = new RemoveFromThisCollection();

                callbackObject = {
                    onReady: _sandbox.stub(),
                    onFail: _sandbox.stub(),
                    onComplete: _sandbox.stub()
                };
            });

            describe('Valid inputs', function() {
                [
                    {
                        description: 'a Collection with valid contents (single) is supported',
                        selectedObjects: [{
                            id: '123',
                            objects: [{
                                id: '456'
                            }]
                        }]
                    },
                    {
                        description: 'a Collection with valid contents (multiple) is supported',
                        selectedObjects: [{
                            id: '123',
                            objects: [{
                                id: '456'
                            },{
                                id: '789'
                            }]
                        }]
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {
                        // ARRANGE
                        _sandbox.stub(ObjectConfigurationApi, 'removeObjects');
                        callbackObject.onComplete = function(result) {
                            // ASSERT
                            expect(result.complete).to.be.true;
                            done();
                        };
                        // ACT
                        objectUnderTest.run(callbackObject, test.selectedObjects);
                    });
                });
            });
            describe('Invalid inputs', function() {
                [
                    {
                        description: 'null',
                        selectedObjects: null,
                        errorMessage: 'No Collection selected'
                    },
                    {
                        description: 'undefined',
                        selectedObjects: undefined,
                        errorMessage: 'No Collection selected'
                    },
                    {
                        description: 'a number',
                        selectedObjects: 1,
                        errorMessage: 'No Collection selected'
                    },
                    {
                        description: 'an object',
                        selectedObjects: {},
                        errorMessage: 'No Collection selected'
                    },
                    {
                        description: 'a boolean',
                        selectedObjects: true,
                        errorMessage: 'No Collection selected'
                    },
                    {
                        description: 'an empty array',
                        selectedObjects: [],
                        errorMessage: 'No Collection selected'
                    },
                    {
                        description: 'something selected, but not identifiable as a Collection',
                        selectedObjects: [{poid: '123'}],
                        errorMessage: 'A valid identifier was not found for the selected Collection'
                    },
                    {
                        description: 'something selected, but not a valid id string',
                        selectedObjects: [{id: 123}],
                        errorMessage: 'A valid identifier was not found for the selected Collection'
                    },
                    {
                        description: 'somehow multi-select happens',
                        selectedObjects: [{id: '123'}, {id: '321'}],
                        errorMessage: 'Multiple selection of Collections is not supported'
                    },
                    {
                        description: 'a Collection without contents is not supported',
                        selectedObjects: [{
                            id: '123'
                        }],
                        errorMessage: 'A valid identifier was not found for each item in the selected Collection\'s contents'
                    },
                    {
                        description: 'a Collection with empty contents is not supported',
                        selectedObjects: [{
                            id: '123',
                            objects: []

                        }],
                        errorMessage: 'A valid identifier was not found for each item in the selected Collection\'s contents'
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {
                        // ARRANGE
                        callbackObject.onFail = function(result) {
                            // ASSERT
                            expect(result.complete).to.be.true;
                            expect(result.message).to.equal(test.errorMessage);
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
