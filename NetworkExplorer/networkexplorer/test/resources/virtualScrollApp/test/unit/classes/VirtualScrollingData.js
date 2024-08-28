define([
    'virtualScrollApp/classes/Cache',
    'virtualScrollApp/classes/VirtualScrollingData',
    'jscore/core'
], function(Cache,
    ResultsData,
    core) {

    describe('ResultsData', function() {

        var _sandbox, classUnderTest;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            classUnderTest = new ResultsData();

        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('setPoIdsStateToRequested()', function() {
            [
                {
                    description: 'a new map',
                    requestedPoIds: {},
                    poIdList: ['1', '2', '5'],
                    expected: {'1': true, '2': true, '5': true}
                },
                {
                    description: 'an existing map',
                    requestedPoIds: {'1': true},
                    poIdList: ['3', '2', '5'],
                    expected: {'1': true, '2': true, '3': true, '5': true}
                }
            ].forEach(function(test) {
                it('should set the poIds ' + JSON.stringify(test.poIdList) + ' for ' + test.description, function() {
                    // ARRANGE
                    classUnderTest.requestedPoIds = test.requestedPoIds;
                    // ACT
                    classUnderTest.setPoIdsStateToRequested(test.poIdList);
                    // ASSERT
                    expect(classUnderTest.requestedPoIds).to.deep.equal(test.expected);
                });
            });
        });

        describe('filterAlreadyFetchedPoIds()', function() {
            [
                {
                    description: 'some of are already fetched',
                    poIdList: ['1', '2', '3', '4', '5'],
                    alreadyFetchedPoIds: {'2': true, '3': true},
                    expected: ['1', '4', '5']
                },
                {
                    description: 'none has been fetched',
                    poIdList: ['1', '2', '3', '4', '5'],
                    alreadyFetchedPoIds: {},
                    expected: ['1', '2', '3', '4', '5']
                }
            ].forEach(function(test) {
                it('should return poIds when ' + test.description, function() {
                    // ARRANGE
                    classUnderTest.requestedPoIds = test.alreadyFetchedPoIds;

                    // ACT + ASSERT
                    expect(classUnderTest.filterAlreadyFetchedPoIds(test.poIdList)).to.deep.equal(test.expected);
                });

            });
        });


        describe('getPoIdsFromIndexes()', function() {
            [
                {
                    description: 'entire range of poIds',
                    start: 0,
                    end: 6,
                    expected: ['123', '456', '789', '987', '654', '321']
                },
                {
                    description: 'a subset of range of poIds',
                    start: 0,
                    end: 4,
                    expected: ['123', '456', '789', '987']
                }
            ].forEach(function(test) {
                it('should get ' + test.description, function() {
                    // ARRANGE
                    classUnderTest.poIds = ['123', '456', '789', '987', '654', '321'];

                    // ACT + ASSERT
                    expect(classUnderTest.getPoIdsFromIndexes(test.start, test.end)).to.deep.equal(test.expected);
                });
            });
        });

    });
});
