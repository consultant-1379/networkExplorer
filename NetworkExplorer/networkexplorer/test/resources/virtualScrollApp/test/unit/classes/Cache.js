
define([
    'virtualScrollApp/classes/Cache',
    'jscore/core'
], function(Cache,
    core) {

    describe('Cache', function() {

        var _sandbox, classUnderTest;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            classUnderTest = new Cache();
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('isDataAvailable()', function() {
            [
                {
                    poIdListInput: ['123', '456'],
                    expected: true
                },
                {
                    poIdListInput: ['123', '456', '789', '987', '654', '321'],
                    expected: true
                },
                {
                    poIdListInput: ['123', '456', '789', '987', '654', '321', 'not_in_buffer'],
                    expected: false
                },
                {
                    poIdListInput: ['not_in_buffer'],
                    expected: false
                }
            ].forEach(function(test) {
                it('should be ' + test.expected + ' if the requested segment is '
                    + (test.expected ? '' : 'not') + ' in the buffer', function() {
                    // ARRANGE
                    classUnderTest.buffer = {'123': {}, '456': {}, '789': {}, '987': {}, '654': {}, '321': {}};

                    // ACT + ASSERT
                    expect(classUnderTest.isDataAvailable(test.poIdListInput)).to.equal(test.expected);
                });
            });
        });

        describe('get()', function() {
            [
                {
                    poIdListInput: ['123', '456'],
                    expectedReturned: [
                        {po1: 'po1'}, {po2: 'po2'}
                    ]
                }
            ].forEach(function(test) {
                it('should return the segment of data provided it is in the buffer', function() {
                    // ARRANGE
                    classUnderTest.buffer = {
                        '123': {po1: 'po1'},
                        '456': {po2: 'po2'},
                        '789': {},
                        '987': {},
                        '654': {},
                        '321': {}
                    };

                    // ACT + ASSERT
                    expect(classUnderTest.get(test.poIdListInput)).to.deep.equal(test.expectedReturned);
                });
            });
        });

        describe('cacheData()', function() {
            [
                {
                    buffer: {},
                    description: 'an empty buffer',
                    fetchedData: [{poId: '1'}, {poId: '2'}, {poId: '3'}, {poId: '4'}],
                    expected: {'1': {poId: '1'}, '2': {poId: '2'}, '3': {poId: '3'}, '4': {poId: '4'}},
                },
                {
                    buffer: {'123': {}, '456': {}, '789': {}, '987': {}, '654': {}, '321': {}},
                    description: 'and non-empty buffer',
                    fetchedData: [{poId: '1'}, {poId: '2'}],
                    expected: {
                        '1': {poId: '1'},
                        '2': {poId: '2'},
                        '123': {},
                        '456': {},
                        '789': {},
                        '987': {},
                        '654': {},
                        '321': {}
                    }
                }
            ].forEach(function(test) {
                it('should add data to ' + test.description, function() {
                    // ARRANGE
                    classUnderTest.buffer = test.buffer;
                    // ACT
                    classUnderTest.cacheData(test.fetchedData);
                    // ASSERT
                    expect(classUnderTest.buffer).to.deep.equal(test.expected);
                });
            });
        });

    });

});
