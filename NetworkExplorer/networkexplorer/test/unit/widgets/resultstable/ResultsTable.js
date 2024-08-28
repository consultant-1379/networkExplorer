define([
    'jscore/core',
    'tablelib/Table',
    'networkexplorer/widgets/resultstable/ResultsTable',
    'networkexplorer/widgets/resultstable/ResultsTableView',
    'networkexplorer/classes/VirtualScrollingData'
], function(core, Table, ResultsTable, ResultsTableView, VirtualScrollingData) {

    describe('ResultsTable', function() {

        var _sandbox,
            objectUnderTest,
            resultsTableOptions,
            mockVSD;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();

            mockVSD = sinon.createStubInstance(VirtualScrollingData);
            mockVSD.idAttribute = 'id';
            mockVSD.idList = [];
            mockVSD.errorCallback = sinon.spy();
            mockVSD.attributeMappings = [];

            resultsTableOptions = {
                virtualScrollingData: mockVSD,
                selectionObject: {},
                columns: [],
                sort: {},
                context: {
                    eventBus: sinon.createStubInstance(core.EventBus)
                }
            };

            Table.prototype.setSortIcon = sinon.spy();
            Table.prototype.disableSort = sinon.spy();

            objectUnderTest = new ResultsTable(resultsTableOptions);
            objectUnderTest.view = sinon.createStubInstance(ResultsTableView);
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('init()', function() {
            it('should initialize instance variables', function() {
                // ARRANGE
                objectUnderTest.counters = undefined;
                objectUnderTest.handlers = undefined;
                _sandbox.stub(objectUnderTest, 'initTable');
                // ACT
                objectUnderTest.init(resultsTableOptions);
                // ASSERT
                expect(objectUnderTest.virtualScrollingData).to.equal(resultsTableOptions.virtualScrollingData);
                expect(objectUnderTest.selectionObject).to.equal(resultsTableOptions.selectionObject);
                expect(objectUnderTest.columns).to.equal(resultsTableOptions.columns);
                expect(objectUnderTest.sortOptions).to.equal(resultsTableOptions.sort);
                expect(objectUnderTest.context).to.equal(resultsTableOptions.context);
                expect(objectUnderTest.handlers).to.not.be.undefined;
                expect(objectUnderTest.initTable.callCount).to.equal(1);
            });
        });

        describe('initTable()', function() {
            it('should initialize table', function() {
                // ARRANGE
                var sortOptions = 'sortOptions';
                _sandbox.spy(Table.prototype, 'addEventHandler');
                _sandbox.stub(objectUnderTest, 'sort');
                objectUnderTest.sortOptions = sortOptions;
                // ACT
                objectUnderTest.initTable();
                // ASSERT
                var indexToStartAsserting = Table.prototype.addEventHandler.callCount - 3;
                expect(Table.prototype.addEventHandler.getCall(indexToStartAsserting++)
                    .calledWith('check', objectUnderTest.onCheck, objectUnderTest)).to.equal(true);
                expect(Table.prototype.addEventHandler.getCall(indexToStartAsserting++)
                    .calledWith('idselectend', objectUnderTest.onIdSelectEnd, objectUnderTest)).to.equal(true);
                expect(Table.prototype.addEventHandler.getCall(indexToStartAsserting)
                    .calledWith('sort', objectUnderTest.onSortChanged, objectUnderTest)).to.equal(true);
                expect(objectUnderTest.sort.callCount).to.equal(1);
                expect(objectUnderTest.sort.getCall(0).calledWith(sortOptions)).to.equal(true);
            });
        });

        describe('sort()', function() {
            it('should sort an attribute given direction', function() {
                // ARRANGE
                _sandbox.stub(objectUnderTest.table, 'setSortIcon');
                var sortOptions = {
                    direction: 'asc',
                    attribute: 'name'
                };
                // ACT
                objectUnderTest.sort(sortOptions);
                // ASSERT
                expect(objectUnderTest.table.setSortIcon.callCount).to.equal(1);
                expect(objectUnderTest.table.setSortIcon.getCall(0).calledWith(sortOptions.direction, sortOptions.attribute))
                    .to.equal(true);
            });

            it('should sort an attribute given direction', function() {
                // ARRANGE
                _sandbox.stub(objectUnderTest.table, 'disableSort');
                var sortOptions = undefined;
                // ACT
                objectUnderTest.sort(sortOptions);
                // ASSERT
                expect(objectUnderTest.table.disableSort.callCount).to.equal(1);
            });
        });

        describe('updateColumns()', function() {
            it('update columns property and reload table', function() {
                // ARRANGE
                Table.prototype.destroy = sinon.spy();
                var columns = [], //any Array object
                    initTable =_sandbox.stub(objectUnderTest, 'initTable'),
                    onViewReady = _sandbox.stub(objectUnderTest, 'onViewReady');
                // ACT
                objectUnderTest.updateColumns(columns);
                // ASSERT
                expect(Table.prototype.destroy.callCount).to.equal(1);
                expect(objectUnderTest.columns).to.equal(columns);
                expect(initTable.callCount).to.equal(1);
                expect(onViewReady.callCount).to.equal(1);
            });
        });

        describe('onVirtualScrollingDataError()', function() {
            it('triggers the VirtualScrollingData error callback', function() {
                // ARRANGE
                var mockXhr = {};
                // ACT
                objectUnderTest.onVirtualScrollingDataError('string', mockXhr);
                // ASSERT
                expect(objectUnderTest.virtualScrollingData.errorCallback.callCount).to.equal(1);
                expect(objectUnderTest.virtualScrollingData.errorCallback.getCall(0).calledWith(mockXhr)).to.equal(true);
            });
        });

        describe.skip('getData()', function() {
            // test in BIT
        });

        describe('onSortChanged()', function() {
            beforeEach(function() {
                // ARRANGE
                objectUnderTest.sortOptions = {
                    direction: 'asc',
                    attribute: 'name'
                };
            });
            [
                {
                    description: 'sort direction has changed',
                    direction: 'desc',
                    attribute: 'name'
                },
                {
                    description: 'attribute has changed',
                    direction: 'asc',
                    attribute: 'moType'
                },
                {
                    description: 'attribute and sort direction changed',
                    direction: 'desc',
                    attribute: 'moType'
                }
            ].forEach(function(test) {
                it('should detect sort change when ' + test.description, function() {
                    // ACT
                    objectUnderTest.onSortChanged(test.direction, test.attribute);
                    // ASSERT
                    expect(objectUnderTest.context.eventBus.publish.callCount).to.equal(1);
                    expect(objectUnderTest.context.eventBus.publish.getCall(0).calledWith(
                        'resultstable:sortchanged', {
                            direction: test.direction,
                            attribute: test.attribute
                        })).to.equal(true);
                });
            });
            it('should not detect sort when nothing has changed', function() {
                // ACT
                objectUnderTest.onSortChanged('asc', 'name');
                // ASSERT
                expect(objectUnderTest.context.eventBus.publish.callCount).to.equal(0);
            });
        });

        describe('onCheck()', function() {
            var row;
            var selectionObject = {
                add: function() {},
                remove: function() {},
                getObjects: function() { return []; },
                getLast: function() { return 'last'; }
            };
            beforeEach(function() {
                // ARRANGE
                row = {
                    getData: function() {
                        return 'data';
                    }
                };
                objectUnderTest.selectionObject = selectionObject;
                _sandbox.stub(objectUnderTest.selectionObject, 'add');
                _sandbox.stub(objectUnderTest.selectionObject, 'remove');
                _sandbox.stub(objectUnderTest, 'notifySelectionChange');
                _sandbox.stub(objectUnderTest, 'showContextualActionsFor');
            });
            function baseTest() {
                expect(objectUnderTest.notifySelectionChange.callCount).to.equal(1);
                expect(objectUnderTest.showContextualActionsFor.callCount).to.equal(1);
                expect(objectUnderTest.showContextualActionsFor.getCall(0).calledWith(selectionObject.getObjects()))
                    .to.equal(true);
            }
            it('should add row data to selectionObject', function() {
                // ACT
                objectUnderTest.onCheck(row, true);
                // ASSERT
                expect(objectUnderTest.selectionObject.add.callCount).to.equal(1);
                expect(objectUnderTest.selectionObject.add.getCall(0).calledWith(row.getData())).to.equal(true);
                baseTest();
            });
            it('should remove row data from selectionObject', function() {
                // ACT
                objectUnderTest.onCheck(row, false);
                // ASSERT
                expect(objectUnderTest.selectionObject.remove.callCount).to.equal(1);
                expect(objectUnderTest.selectionObject.remove.getCall(0).calledWith(row.getData())).to.equal(true);
                baseTest();
            });
        });

        describe.skip('onIdSelectEnd()', function() {
            // test in BIT
        });

        describe('notifySelectionChange()', function() {
            it('should publish event that SelectionObject has changed', function() {
                // ARRANGE
                var selectionObject = 'selectionObject';
                objectUnderTest.selectionObject = selectionObject;
                // ACT
                objectUnderTest.notifySelectionChange();
                // ASSERT
                expect(objectUnderTest.context.eventBus.publish.callCount).to.equal(1);
                expect(objectUnderTest.context.eventBus.publish.getCall(0).calledWith(
                    'resultstable:selectionchanged', selectionObject)).to.equal(true);
            });
        });

        describe('showContextualActionsFor()', function() {
            it('should send message requesting actions for objects', function() {
                // ARRANGE
                var objects = ['objects'];
                // ACT
                objectUnderTest.showContextualActionsFor(objects);
                // ASSERT
                expect(objectUnderTest.context.eventBus.publish.callCount).to.equal(1);
                expect(objectUnderTest.context.eventBus.publish.getCall(0).calledWith(
                    'resultstable:showcontextualactions', objects)).to.equal(true);
            });
        });

        describe('onViewReady()', function() {
            it('should resize table to full height', function() {
                Table.prototype.attachTo = function() {};
                _sandbox.spy(Table.prototype, 'attachTo');
                _sandbox.stub(core.Window, 'addEventHandler', function() {
                    return 'windowSizeEventId';
                });
                _sandbox.stub(objectUnderTest, 'setFullHeight');
                // ACT
                objectUnderTest.onViewReady();
                // ASSERT
                expect(objectUnderTest.table.attachTo.callCount).to.equal(1);
                expect(objectUnderTest.table.attachTo.getCall(0).calledWith(objectUnderTest.getElement())).to.equal(true);
                expect(core.Window.addEventHandler.callCount).to.equal(1);
                expect(core.Window.addEventHandler.getCall(0).calledWithMatch('resize')).to.equal(true);
                expect(objectUnderTest.setFullHeight.callCount).to.equal(1);
            });
        });

        describe('onDestroy()', function() {
            it('should remove window resize event handler', function() {
                _sandbox.stub(core.Window, 'removeEventHandler');
                // ACT
                objectUnderTest.onDestroy();
                // ASSERT
                expect(core.Window.removeEventHandler.callCount).to.equal(1);
            });
        });

        describe.skip('setFullHeight', function() {
            // test in BIT
        });
    });
});
