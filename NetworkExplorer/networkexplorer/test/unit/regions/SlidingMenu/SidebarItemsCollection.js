define([
    'networkexplorer/regions/SlidingMenu/SidebarItemsCollection'
], function(SidebarItemsCollection) {
    describe('SidebarItemsCollection', function() {
        var _sandbox, objectUnderTest;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            objectUnderTest = new SidebarItemsCollection();
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('parse()', function() {
            it('should copy the poId field of the data to the id field', function() {
                // ARRANGE
                var inputData = [{
                    poId: 1,
                    name: '1'
                }, {
                    poId: 2,
                    name: '2'
                }, {
                    poId: 3,
                    name: '3'
                }];
                var expectedOutput = [{
                    id: 1,
                    poId: 1,
                    name: '1'
                }, {
                    id: 2,
                    poId: 2,
                    name: '2'
                }, {
                    id: 3,
                    poId: 3,
                    name: '3'
                }];

                // ACT + ASSERT
                expect(objectUnderTest.parse(inputData)).to.deep.equal(expectedOutput);
            });

            it('should set duplicate to true on duplicate name', function() {
                // ARRANGE
                var inputData = [{
                    poId: 1,
                    name: 'MO1'
                }, {
                    poId: 2,
                    name: 'MO2'
                }, {
                    poId: 3,
                    name: 'MO3'
                }, {
                    poId: 4,
                    name: 'MO1'
                }, {
                    poId: 5,
                    name: 'MO5'
                }];
                var expectedOutput = [{
                    id: 1,
                    poId: 1,
                    name: 'MO1',
                    duplicate: true
                }, {
                    id: 2,
                    poId: 2,
                    name: 'MO2'
                }, {
                    id: 3,
                    poId: 3,
                    name: 'MO3'
                }, {
                    id: 4,
                    poId: 4,
                    name: 'MO1',
                    duplicate: true
                }, {
                    id: 5,
                    poId: 5,
                    name: 'MO5'
                }];

                // ACT + ASSERT
                expect(objectUnderTest.parse(inputData)).to.deep.equal(expectedOutput);
            });
        });
    });
});
