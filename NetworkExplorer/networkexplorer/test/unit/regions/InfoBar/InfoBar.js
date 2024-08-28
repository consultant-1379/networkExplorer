define([
    'networkexplorer/regions/InfoBar/InfoBar',
    'networkexplorer/regions/InfoBar/InfoBarView',
    'i18n!networkexplorer/app.json',
    'jscore/core',
    'jscore/ext/mvp',
    'jscore/ext/net',
    'test/resources/restMock/data/errorMessages',
    'jscore/ext/locationController'
], function(InfoBar, InfoBarView, strings, core, mvp, net, errorMessages, LocationController) {

    describe('InfoBar', function() {
        var _sandbox, classUnderTest,
            eventBusStub;  // eventBus is a global var since test case need reference in order to evaluate calls;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            classUnderTest = new InfoBar();

            // VIEW MOCK! spy on all view methods!
            // classUnderTest.view = _sandbox.stub(new InfoBarView());
            classUnderTest.view = sinon.createStubInstance(InfoBarView);

            // EVENT BUS MOCK!
            var eventBusObject = {
                subscribe: function() {}
            };
            eventBusStub = _sandbox.stub(eventBusObject);
            classUnderTest.getEventBus = function() {
                return eventBusStub;
            };

        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('onStart()', function() {
            it('should subscribe to events with appropriate handling functions".', function() {

                // ARRANGE
                //EventBus stubbed in global beforeEach
                classUnderTest.options = {
                    favoritesCollection: _sandbox.stub(new mvp.Collection())
                };

                var closeCollectionButton = {
                    addEventHandler: function() {
                    }
                };
                _sandbox.spy(closeCollectionButton, 'addEventHandler');
                classUnderTest.view.getCloseCollectionButton = function() {
                    return closeCollectionButton;
                };
                _sandbox.spy(classUnderTest.view, 'getCloseCollectionButton');

                // ACT
                classUnderTest.onStart();

                // ASSERT
                expect(classUnderTest.getEventBus().subscribe.callCount).to.equal(5);
                expect(classUnderTest.getEventBus().subscribe.getCall(0).calledWith(
                    'Results:showInfo',
                    classUnderTest.setInfo,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(1).calledWith(
                    'Results:showInfoSavedSearch',
                    classUnderTest.setInfo,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(2).calledWith(
                    'NetworkExplorer:defaultHash',
                    classUnderTest.showDefaultInfo,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(3).calledWith(
                    'NetworkExplorer:appLoaded',
                    classUnderTest.showDefaultInfo,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(4).calledWith(
                    'Results:collectionFetchError',
                    classUnderTest.showDefaultInfo,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.view.addFavoriteIconClickHandler.callCount).to.equal(1);
                expect(classUnderTest.view.addFavoriteIconClickHandler.getCall(0).calledWith(
                    classUnderTest.toggleFavorite,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.options.favoritesCollection.addEventHandler.callCount).to.equal(2);
                expect(classUnderTest.options.favoritesCollection.addEventHandler.getCall(0).calledWith(
                    'add',
                    classUnderTest.updateFavoriteState,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.options.favoritesCollection.addEventHandler.getCall(1).calledWith(
                    'change',
                    classUnderTest.updateFavoriteState,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.view.getCloseCollectionButton.callCount).to.equal(1);
                expect(classUnderTest.view.getCloseCollectionButton().addEventHandler.callCount).to.equal(1);
                expect(classUnderTest.view.getCloseCollectionButton().addEventHandler.getCall(0).calledWith(
                    'click',
                    classUnderTest.closeCollection,
                    classUnderTest
                )).to.equal(true);
            });
        });

        describe('setInfo()', function() {

            var baseTest = function(info) {
                // ARRANGE
                _sandbox.stub(classUnderTest, 'setTooltipIfOverflow');
                // ACT
                classUnderTest.setInfo(info);

                //ASSERT
                expect(classUnderTest.view.showInfoEl.callCount).to.equal(1);
                expect(classUnderTest.view.hideDefaultHeader.callCount).to.equal(1);
                expect(classUnderTest.view.setInfoName.callCount).to.equal(1);
                expect(classUnderTest.setTooltipIfOverflow.callCount).to.equal(1);
                expect(classUnderTest.view.hideCloseCollectionButton.callCount).to.equal(1);
                expect(classUnderTest.view.hideCloseCollectionSeperator.callCount).to.equal(1);
            };

            it('should set info name from info argument, when name provided, ' +
                '& hideInfoTypeWrapper if info.type is undefined', function() {

                // ARRANGE+ACT+ASSERT
                baseTest({ name: 'MySearch001', size: 10 });    // notice no type property defined  in argument

                // Extra asserts
                expect(classUnderTest.view.setInfoName.getCall(0).calledWith('MySearch001')).to.equal(true);
                expect(classUnderTest.setTooltipIfOverflow.getCall(0).calledWith('MySearch001')).to.equal(true);
                expect(classUnderTest.view.hideInfoTypeWrapper.callCount).to.equal(1);
            });

            it('should set info name from strings when name not provided, ' +
                '& showInfoTypeWrapper if info.type is provided', function() {

                // ARRANGE+ACT+ASSERT
                baseTest({ type: 'savedSearch', size: 10 });           // notice no name property defined in argument

                // Extra asserts
                expect(classUnderTest.view.setInfoName.getCall(0).calledWith(strings.unsavedSearch)).to.equal(true);
                expect(classUnderTest.setTooltipIfOverflow.getCall(0).calledWith(strings.unsavedSearch)).to.equal(true);
                expect(classUnderTest.view.showInfoTypeWrapper.callCount).to.equal(1);
            });

        });

        describe('showDefaultInfo()', function() {

            it('should hideInfoEl, showDefaultHeader & set infoName to blank', function() {

                // ARRANGE+ACT+ASSERT
                classUnderTest.showDefaultInfo();
                //ASSERT
                expect(classUnderTest.view.hideInfoEl.callCount).to.equal(1);
                expect(classUnderTest.view.showDefaultHeader.callCount).to.equal(1);
                expect(classUnderTest.view.setInfoNameEl.callCount).to.equal(1);
                expect(classUnderTest.view.setInfoNameEl.getCall(0).calledWith('')).to.equal(true);
            });
        });

        describe('closeCollection()', function() {

            it('should hide close collection button', function() {

                // ARRANGE
                classUnderTest.locationController = new LocationController();

                // ACT
                classUnderTest.closeCollection();

                // ASSERT
                expect(classUnderTest.locationController.getLocation()).to.equal('networkexplorer');
            });
        });


        describe('toggleFavorite()', function() {
            var currentFavoriteStateMock;

            beforeEach(function() {
                _sandbox.stub(net, 'ajax');
            });

            it('should pass appropriate arguments into ajax call when this.favorite = false', function() {
                // ARRANGE
                classUnderTest.favorite = false;
                classUnderTest.poId = '12345';

                // ACT
                classUnderTest.toggleFavorite();

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

            it('should pass appropriate arguments into ajax call when this.favorite = true', function() {
                // ARRANGE
                classUnderTest.favorite = true;
                classUnderTest.poId = '12345';

                // ACT
                classUnderTest.toggleFavorite();

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
            beforeEach(function() {
                classUnderTest.options.favoritesCollection = _sandbox.stub(new mvp.Collection());
            });

            it('should update the favorite state of the list item', function() {
                // ACT
                classUnderTest.toggleFavoriteSuccess(true);

                // ASSERT
                expect(classUnderTest.favorite).to.equal(true);
                expect(classUnderTest.view.setFavoriteState.callCount).to.equal(1);
                expect(classUnderTest.view.setFavoriteState.getCall(0).calledWith(true)).to.equal(true);
            });

            it('should update an existing favoritesCollection model if one exists for the favoriteId', function() {
                // ARRANGE
                var favoritesModelMock = _sandbox.stub({
                    setAttribute: function() {}
                });
                classUnderTest.options.favoritesCollection.getModel.returns(favoritesModelMock);

                // ACT
                classUnderTest.toggleFavoriteSuccess(true);

                // ASSERT
                expect(favoritesModelMock.setAttribute.callCount).to.equal(1);
                expect(favoritesModelMock.setAttribute.getCall(0).calledWith(
                    'value', 'true'
                )).to.equal(true);
            });

            it('should add a new model to favoritesCollection if one does not already exist for the favoriteId', function() {
                // ARRANGE
                classUnderTest.poId = '12345';

                // ACT
                classUnderTest.toggleFavoriteSuccess(true);

                // ASSERT
                expect(classUnderTest.options.favoritesCollection.addModel.callCount).to.equal(1);
                expect(classUnderTest.options.favoritesCollection.addModel.getCall(0).calledWith({
                    id: '12345',
                    value: 'true'
                })).to.equal(true);
            });
        });

        describe('updateFavoriteState()', function() {
            beforeEach(function() {
                classUnderTest.options.favoritesCollection = _sandbox.stub(new mvp.Collection());
            });

            it('should set the favorite state to false if model does not exist in favoritesCollection for favoriteId', function() {
               // ARRANGE
               classUnderTest.poId = '12345';
               classUnderTest.options.favoritesCollection.getModel.returns(null);

               // ACT
               classUnderTest.updateFavoriteState();

               // ASSERT
               expect(classUnderTest.favorite).to.equal(false);
               expect(classUnderTest.view.setFavoriteState.callCount).to.equal(1);
               expect(classUnderTest.view.setFavoriteState.getCall(0).calledWith(false)).to.equal(true);
            });

            it('should set the favorite state to true if model does exist in favoritesCollection for favoriteId and value is true', function() {
                // ARRANGE
                classUnderTest.poId = '12345';
                var favoriteModelMock = {
                    getAttribute: function() {
                        return 'true';
                    }
                };
                classUnderTest.options.favoritesCollection.getModel.returns(favoriteModelMock);

                // ACT
                classUnderTest.updateFavoriteState();

                // ASSERT
                expect(classUnderTest.favorite).to.equal(true);
                expect(classUnderTest.view.setFavoriteState.callCount).to.equal(1);
                expect(classUnderTest.view.setFavoriteState.getCall(0).calledWith(true)).to.equal(true);
            });

            it('should hide the favorite icon if favoriteId is not specified', function() {
                // ACT
                classUnderTest.updateFavoriteState();

                // ASSERT
                expect(classUnderTest.view.setFavoriteState.callCount).to.equal(0);
                expect(classUnderTest.view.hideFavoriteIcon.callCount).to.equal(1);
            });
        });

        describe('updateFavoriteStateNew()', function() {
        it('should Show the favoriteIcon', function() {
                // ARRANGE
                classUnderTest.poId = '12345';
                classUnderTest.favoriteId = ["11111","22222",'12345'];

                // ACT
                classUnderTest.updateFavoriteStateNew();

                // ASSERT
                expect(classUnderTest.favorite).to.equal(undefined);
              });
        });


        describe('setTooltipIfOverflow()', function() {
            var tooltipText = 'tooltipText';

            it('should remove existing tooltip and set a tooltip with the current item name if an overflow on the info bar name occurs', function() {
                // ARRANGE
                classUnderTest.view.getInfoNameTooltip.returns(tooltipText);
                classUnderTest.view.getInfoNameScrollWidth.returns(20);
                classUnderTest.view.getInfoNameOffsetWidth.returns(10);
                // ACT
                classUnderTest.setTooltipIfOverflow(tooltipText);
                // ASSERT
                expect(classUnderTest.view.removeInfoNameTooltipText.callCount).to.equal(1);
                expect(classUnderTest.view.setInfoNameTooltipText.callCount).to.equal(1);
                expect(classUnderTest.view.setInfoNameTooltipText.getCall(0).calledWith(tooltipText)).to.equal(true);
            });

            it('should remove existing tooltip and not set a tooltip with the current item name if no overflow on the info bar name occurs', function() {
                // ARRANGE
                classUnderTest.view.getInfoNameTooltip.returns(tooltipText);
                classUnderTest.view.getInfoNameScrollWidth.returns(10);
                classUnderTest.view.getInfoNameOffsetWidth.returns(10);
                // ACT
                classUnderTest.setTooltipIfOverflow(tooltipText);
                // ASSERT
                expect(classUnderTest.view.removeInfoNameTooltipText.callCount).to.equal(1);
                expect(classUnderTest.view.setInfoNameTooltipText.callCount).to.equal(0);
            });

            it('should not remove non-existent current tooltip and set a new tooltip with the current item name if overflow on the info bar name occurs', function() {
                // ARRANGE
                classUnderTest.view.getInfoNameTooltip.returns(undefined);
                classUnderTest.view.getInfoNameScrollWidth.returns(20);
                classUnderTest.view.getInfoNameOffsetWidth.returns(10);
                // ACT
                classUnderTest.setTooltipIfOverflow(tooltipText);
                // ASSERT
                expect(classUnderTest.view.removeInfoNameTooltipText.callCount).to.equal(0);
                expect(classUnderTest.view.setInfoNameTooltipText.callCount).to.equal(1);
                expect(classUnderTest.view.setInfoNameTooltipText.getCall(0).calledWith(tooltipText)).to.equal(true);
            });

            it('should not remove non-existent current tooltip and not set a new tooltip with the current item name if no overflow on the info bar name occurs', function() {
                // ARRANGE
                classUnderTest.view.getInfoNameTooltip.returns(undefined);
                classUnderTest.view.getInfoNameScrollWidth.returns(10);
                classUnderTest.view.getInfoNameOffsetWidth.returns(10);
                // ACT
                classUnderTest.setTooltipIfOverflow(tooltipText);
                // ASSERT
                expect(classUnderTest.view.removeInfoNameTooltipText.callCount).to.equal(0);
                expect(classUnderTest.view.setInfoNameTooltipText.callCount).to.equal(0);
            });
        });
    });
});
