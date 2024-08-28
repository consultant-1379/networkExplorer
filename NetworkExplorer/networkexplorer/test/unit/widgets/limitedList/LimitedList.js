define([
    'networkexplorer/widgets/limitedList/LimitedList',
    'networkexplorer/widgets/limitedList/LimitedListView',
    'networkexplorer/widgets/limitedListItem/LimitedListItem'
], function(LimitedList, LimitedListView, LimitedListItem) {


    describe('LimitedList', function() {

        describe('init()', function() {
            it('should initialise items, title, limit, viewAllUrl, and showViewAllButton to values specified when given options', function() {
                // ACT
                var options = {
                    items: [],
                    title: 'Test Title',
                    limit: 10,
                    viewAllUrl: '#viewallurl',
                    showViewAllButton: false
                };
                var limitedList = new LimitedList(options);

                // ASSERT
                expect(limitedList.items).to.equal(options.items);
                expect(limitedList.title).to.equal(options.title);
                expect(limitedList.limit).to.equal(options.limit);
                expect(limitedList.viewAllUrl).to.equal(options.viewAllUrl);
                expect(limitedList.showViewAllButton).to.equal(options.showViewAllButton);
                expect(limitedList.listItems).to.deep.equal([]);
            });
        });

        describe('view()', function() {
            var sandbox;

            beforeEach(function() {
                // ARRANGE
                sandbox = sinon.sandbox.create();
                sandbox.spy(LimitedListView.prototype, 'init');
            });

            afterEach(function() {
                // CLEANUP
                sandbox.restore();
            });

            it('should return a view with deafult values for title, viewAllUrl and showViewAllButton when constructor called with no options', function() {
                // ARRANGE
                var defaultShowViewAllButton = true;

                // ACT
                var limitedList = new LimitedList();

                // ASSERT
                expect(limitedList.view instanceof LimitedListView).to.equal(true);
                expect(LimitedListView.prototype.init.callCount).to.equal(1);
                expect(LimitedListView.prototype.init.getCall(0).calledWith({
                    title: undefined,
                    viewAllUrl: undefined,
                    showViewAllButton: defaultShowViewAllButton
                })).to.equal(true);
            });

            it('should return a view with deafult values for title, viewAllUrl and showViewAllButton when constructor called with no options', function() {
                // ARRANGE
                var options = {
                    title: 'Test Title',
                    viewAllUrl: '#viewallurl',
                    showViewAllButton: false
                };

                // ACT
                var limitedList = new LimitedList(options);

                // ASSERT
                expect(limitedList.view instanceof LimitedListView).to.equal(true);
                expect(LimitedListView.prototype.init.callCount).to.equal(1);
                expect(LimitedListView.prototype.init.getCall(0).calledWith(options)).to.equal(true);
            });
        });

        describe('onViewReady()', function() {
            var sandbox, limitedList;

            beforeEach(function() {
                // ARRANGE
                sandbox = sinon.sandbox.create();
                limitedList = new LimitedList();
                sandbox.stub(limitedList, 'setItems', function() {});
            });

            afterEach(function() {
                // CLEANUP
                sandbox.restore();
            });

            it('should call setItems if items exist', function() {
                // ARRANGE
                var items = [1, 2, 3];
                limitedList.items = [1, 2, 3];

                // ACT
                limitedList.onViewReady();

                // ASSERT
                expect(limitedList.setItems.callCount).to.equal(1);
                expect(limitedList.setItems.getCall(0).calledWith(items)).to.equal(true);
            });

            it('should not call setItems if items do not exist', function() {
                // ACT
                limitedList.onViewReady();

                // ASSERT
                expect(limitedList.setItems.callCount).to.equal(0);
            });
        });

        describe('setClickHandler()', function() {
            it('should set clickHandler', function() {
                // ARRANGE
                var sandbox = sinon.sandbox.create();
                var limitedList = new LimitedList();
                expect(limitedList.clickHandler).to.be.undefined; // check that clickHandler is undefined before method
                var handlerMock = function() {};
                sandbox.stub(handlerMock, 'bind', function() {});

                // ACT
                limitedList.setClickHandler(handlerMock, 1); // can't test context at unit level

                // ASSERT
                expect(limitedList.clickHandler).to.be.defined;
                expect(handlerMock.bind.callCount).to.equal(1);
                expect(handlerMock.bind.getCall(0).calledWith(1)).to.equal(true);
            });
        });

        describe('setItems()', function() {
            var sandbox, limitedList, viewStub, topListStub, listElsStub;

            beforeEach(function() {
                // ARRANGE
                sandbox = sinon.sandbox.create();
                limitedList = new LimitedList();
                topListStub = {};
                viewStub = {
                    getTopList: function() {
                        return topListStub;
                    }
                };
                limitedList.view = viewStub;
                sandbox.stub(limitedList, 'hideLoadingAnimation', function() {});
                sandbox.stub(LimitedListItem.prototype, 'init');
                sandbox.stub(LimitedListItem.prototype, 'attachTo');
            });

            afterEach(function() {
                sandbox.restore();
            });

            it('should set this.items to the specified items and call hideLoadingAnimation if there is a title specified', function() {
                // ARRANGE
                var items = [{
                    name: 'Name 1'
                }, {
                    name: 'Name 2'
                }, {
                    name: 'Name 3'
                }];
                limitedList.title = 'My Title';

                // ACT
                limitedList.setItems(items);

                // ASSERT
                expect(limitedList.items).to.equal(items);
                expect(limitedList.hideLoadingAnimation.callCount).to.equal(1);
            });

            it('should delete any existing children', function() {
                // ARRANGE
                var listItem1Stub = sandbox.stub({
                    destroy: function() {}
                });
                var listItem2Stub = sandbox.stub({
                    destroy: function() {}
                });
                limitedList.listItems = [listItem1Stub, listItem2Stub];

                // ACT
                limitedList.setItems([]);

                // ASSERT
                expect(listItem1Stub.destroy.callCount).to.equal(1);
                expect(listItem2Stub.destroy.callCount).to.equal(1);
            });

            it('should add links to the limit if items.length > limit', function() {
                // ARRANGE
                listElsStub = [];
                var items = [{
                    name: 'Name 1',
                    url: '#url1'
                }, {
                    name: 'Name 2',
                    url: '#url2'
                }, {
                    name: 'Name 3',
                    url: '#url3'
                }];
                limitedList.limit = 2;

                // ACT
                limitedList.setItems(items);

                // ASSERT
                expect(LimitedListItem.prototype.init.callCount).to.equal(2);
            });

            it('should add links to the items length if items.length < limit', function() {
                // ARRANGE
                listElsStub = [];
                var items = [{
                    name: 'Name 1',
                    url: '#url1'
                }, {
                    name: 'Name 2',
                    url: '#url2'
                }, {
                    name: 'Name 3',
                    url: '#url3'
                }];
                limitedList.limit = 5;

                // ACT
                limitedList.setItems(items);

                // ASSERT
                expect(LimitedListItem.prototype.init.callCount).to.equal(3);
            });

            it('should convert & to &amp; in the item name', function() {
                // ARRANGE
                var items = [{
                    name: 'Name &lt;1&gt;',
                    url: '#url1'
                }];

                // ACT
                limitedList.setItems(items);

                // ASSERT
                expect(LimitedListItem.prototype.init.getCall(0).calledWithMatch({
                    name: 'Name &amp;lt;1&amp;gt;'
                })).to.equal(true);
            });
        });

        describe('showLoadingAnimation()', function() {
            it('should call showLoadingAnimation on view', function() {
                // ARRANGE
                var sandbox = sinon.sandbox.create();
                var limitedList = new LimitedList();
                var viewStub = {
                    showLoadingAnimation: function() {}
                };
                sandbox.spy(viewStub, 'showLoadingAnimation');
                limitedList.view = viewStub;

                // ACT
                limitedList.showLoadingAnimation();

                // ASSERT
                expect(viewStub.showLoadingAnimation.callCount).to.equal(1);

                // CLEANUP
                sandbox.restore();
            });
        });

        describe('hideLoadingAnimation()', function() {
            it('should call hideLoadingAnimation on view', function() {
                // ARRANGE
                var sandbox = sinon.sandbox.create();
                var limitedList = new LimitedList();
                var viewStub = {
                    hideLoadingAnimation: function() {}
                };
                sandbox.spy(viewStub, 'hideLoadingAnimation');
                limitedList.view = viewStub;

                // ACT
                limitedList.hideLoadingAnimation();

                // ASSERT
                expect(viewStub.hideLoadingAnimation.callCount).to.equal(1);

                // CLEANUP
                sandbox.restore();
            });
        });

    });
});
