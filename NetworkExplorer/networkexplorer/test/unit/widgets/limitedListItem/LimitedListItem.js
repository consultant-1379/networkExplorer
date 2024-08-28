define([
    'networkexplorer/widgets/limitedListItem/LimitedListItem',
    'networkexplorer/widgets/limitedListItem/LimitedListItemView',
    'jscore/ext/mvp',
    'jscore/ext/net'
], function(LimitedListItem, LimitedListItemView, mvp, net) {


    describe('LimitedListItem', function() {
        var _sandbox, objectUnderTest;


        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            objectUnderTest = new LimitedListItem({
                favoritesCollection: _sandbox.stub(new mvp.Collection())
            });
            objectUnderTest.view = _sandbox.stub(new LimitedListItemView());
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('init()', function() {
            it('should add add and change to favorites collection', function() {
                // ASSERT
                expect(objectUnderTest.options.favoritesCollection.addEventHandler.callCount).to.equal(2);
                expect(objectUnderTest.options.favoritesCollection.addEventHandler.getCall(0).calledWith(
                    'add', objectUnderTest.updateFavoriteState, objectUnderTest
                )).to.equal(true);
                expect(objectUnderTest.options.favoritesCollection.addEventHandler.getCall(1).calledWith(
                    'change', objectUnderTest.updateFavoriteState, objectUnderTest
                )).to.equal(true);
            });
        });

        describe('onViewReady()', function() {
            it('should add the link click handler if clickHandler is defined in options', function() {
                // ARRANGE
                objectUnderTest.options = {
                    clickHandler: function() {}
                };

                // ACT
                objectUnderTest.onViewReady();

                // ASSERT
                expect(objectUnderTest.view.addLinkClickHandler.callCount).to.equal(1);
                expect(objectUnderTest.view.addLinkClickHandler.getCall(0).calledWith(
                    objectUnderTest.options.clickHandler
                )).to.equal(true);
            });
            
            it('should add the favorite icon click handler if favoriteId is defined in options', function() {
                // ARRANGE
                objectUnderTest.options = {
                    favoriteId: '123'
                };

                // ACT
                objectUnderTest.onViewReady();

                // ASSERT
                expect(objectUnderTest.view.addFavoriteIconClickHandler.callCount).to.equal(1);
                expect(objectUnderTest.view.addFavoriteIconClickHandler.getCall(0).calledWith(
                    objectUnderTest.toggleFavorite, objectUnderTest
                )).to.equal(true);
            });

            it('should not add the link click handler if clickHandler is not defined in options', function() {
                // ARRANGE
                objectUnderTest.options = {};

                // ACT
                objectUnderTest.onViewReady();

                // ASSERT
                expect(objectUnderTest.view.addLinkClickHandler.callCount).to.equal(0);
            });

            it('should hide the favorite icon if favoriteId is not defined in options', function() {
                // ARRANGE
                objectUnderTest.options = {};

                // ACT
                objectUnderTest.onViewReady();

                // ASSERT
                expect(objectUnderTest.view.addFavoriteIconClickHandler.callCount).to.equal(0);
                expect(objectUnderTest.view.hideFavoriteIcon.callCount).to.equal(1);
            });
        });

        describe('onAttach()', function() {
            it('should set tooltip if overflow occurs when item is attached to the DOM', function() {
                // ARRANGE
                _sandbox.stub(objectUnderTest, 'setTooltipIfOverflow');

                // ACT
                objectUnderTest.onAttach();

                // ASSERT
                expect(objectUnderTest.setTooltipIfOverflow.callCount).to.equal(1);
            });
        });

        describe('toggleFavorite()', function() {
            beforeEach(function() {
                _sandbox.stub(net, 'ajax');
            });

            it('should change the favorite state to true if it is currently false', function() {
                // ARRANGE
                objectUnderTest.options = {
                    favorite: false,
                    favoriteId: '12345',
                    appId: 'networkexplorer'
                };

                // ACT
                objectUnderTest.toggleFavorite();

                // ASSERT
                expect(net.ajax.callCount).to.equal(1);
                expect(net.ajax.getCall(0).calledWithMatch({
                    url: '/rest/ui/settings/networkexplorer/favorites',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        id: '12345',
                        value: 'true'
                    })
                })).to.equal(true);
            });

            it('should change the favorite state to false if it is currently true', function() {
                // ARRANGE
                objectUnderTest.options = {
                    favorite: true,
                    favoriteId: '12345',
                    appId: 'networkexplorer'
                };

                // ACT
                objectUnderTest.toggleFavorite();

                // ASSERT
                expect(net.ajax.callCount).to.equal(1);
                expect(net.ajax.getCall(0).calledWithMatch({
                    url: '/rest/ui/settings/networkexplorer/favorites',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        id: '12345',
                        value: ''
                    })
                })).to.equal(true);
            });
        });

        describe('toggleFavoriteSuccess()', function() {
            it('should update the favorite state of the list item', function() {
                // ACT
                objectUnderTest.toggleFavoriteSuccess(true);

                // ASSERT
                expect(objectUnderTest.options.favorite).to.equal(true);
                expect(objectUnderTest.view.setFavoriteState.callCount).to.equal(1);
                expect(objectUnderTest.view.setFavoriteState.getCall(0).calledWith(true)).to.equal(true);
            });

            it('should update an existing favoritesCollection model if one exists for the favoriteId', function() {
                // ARRANGE
                var favoritesModelMock = _sandbox.stub({
                    setAttribute: function() {}
                });
                objectUnderTest.options.favoritesCollection.getModel.returns(favoritesModelMock);

                // ACT
                objectUnderTest.toggleFavoriteSuccess(true);

                // ASSERT
                expect(favoritesModelMock.setAttribute.callCount).to.equal(1);
                expect(favoritesModelMock.setAttribute.getCall(0).calledWith(
                    'value', 'true'
                )).to.equal(true);
            });

            it('should add a new model to favoritesCollection if one does not already exist for the favoriteId', function() {
                // ARRANGE
                objectUnderTest.options.favoriteId = '12345';

                // ACT
                objectUnderTest.toggleFavoriteSuccess(true);

                // ASSERT
                expect(objectUnderTest.options.favoritesCollection.addModel.callCount).to.equal(1);
                expect(objectUnderTest.options.favoritesCollection.addModel.getCall(0).calledWith({
                    id: '12345',
                    value: 'true'
                })).to.equal(true);
            });
        });

        describe('updateFavoriteState()', function() {
            it('should set the favorite state to false if model does not exist in favoritesCollection for favoriteId', function() {
                // ARRANGE
                objectUnderTest.options.favoriteId = '12345';
                objectUnderTest.options.favoritesCollection.getModel.returns(null);

                // ACT
                objectUnderTest.updateFavoriteState();

                // ASSERT
                expect(objectUnderTest.options.favorite).to.equal(false);
                expect(objectUnderTest.view.setFavoriteState.callCount).to.equal(1);
                expect(objectUnderTest.view.setFavoriteState.getCall(0).calledWith(false)).to.equal(true);
            });

            it('should set the favorite state to true if model does exist in favoritesCollection for favoriteId and value is true', function() {
                // ARRANGE
                objectUnderTest.options.favoriteId = '12345';
                var favoriteModelMock = {
                    getAttribute: function() {
                        return 'true';
                    }
                };
                objectUnderTest.options.favoritesCollection.getModel.returns(favoriteModelMock);

                // ACT
                objectUnderTest.updateFavoriteState();

                // ASSERT
                expect(objectUnderTest.options.favorite).to.equal(true);
                expect(objectUnderTest.view.setFavoriteState.callCount).to.equal(1);
                expect(objectUnderTest.view.setFavoriteState.getCall(0).calledWith(true)).to.equal(true);
            });

            it('should do nothing if favoriteId is not specified', function() {
                // ACT
                objectUnderTest.updateFavoriteState();

                // ASSERT
                expect(objectUnderTest.view.setFavoriteState.callCount).to.equal(0);
            });
        });

        describe('setTooltipIfOverflow()', function() {
            it('should set a tooltip on the list item if there is an overflow', function() {
                // ARRANGE
                objectUnderTest.view.getScrollWidth.returns(20);
                objectUnderTest.view.getOffsetWidth.returns(10);
                var itemName = 'itemName';
                // ACT
                objectUnderTest.setTooltipIfOverflow(itemName);
                // ASSERT
                expect(objectUnderTest.view.setTooltipText.callCount).to.equal(1);
                expect(objectUnderTest.view.setTooltipText.getCall(0).calledWith(itemName)).to.equal(true);
            });

            it('should not set a tooltip on the list item if there is no overflow', function() {
                // ARRANGE
                objectUnderTest.view.getScrollWidth.returns(10);
                objectUnderTest.view.getOffsetWidth.returns(10);
                var itemName = 'itemName';
                // ACT
                objectUnderTest.setTooltipIfOverflow(itemName);
                // ASSERT
                expect(objectUnderTest.view.setTooltipText.callCount).to.equal(0);
            });
        });
    });
});
