define([
    'jscore/ext/mvp',
    'jscore/core',
    'networkexplorer/regions/SlidingMenu/SlidingMenu',
    'networkexplorer/regions/SlidingMenu/SlidingMenuView',
    'networkexplorer/widgets/limitedList/LimitedList',
    'i18n!networkexplorer/SlidingMenu.json',
    'networkexplorer/utils/httpHelper'
], function(mvp, core, SlidingMenu, SlidingMenuView, LimitedList, strings, httpHelper) {

    describe('SlidingMenu', function() {

        var _sandbox, objectUnderTest;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            var eventBusStub = _sandbox.stub({
                subscribe: function() {}
            });
            objectUnderTest = new SlidingMenu({
                context: {
                    eventBus: eventBusStub,
                    getApplicationPosition: function() {}
                }
            });
            objectUnderTest.view = _sandbox.stub(new SlidingMenuView());

            // EVENT BUS MOCK!
            var eventBusObject = {
                subscribe: function() {},
                publish: function() {}
            };
            var eventBusStub = _sandbox.stub(eventBusObject);
            objectUnderTest.getEventBus = function() {
                return eventBusStub;
            };
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('onStart()', function() {
            it('should instantiate menuOpen, collectionsCollection', function() {
                // ARRANGE

                // mock various collections
                var collectionsStub = {};
                objectUnderTest.view.getCollections.returns(collectionsStub);
                var savedSearchesStub = {};
                objectUnderTest.view.getSavedSearches.returns(savedSearchesStub);
                var favoriteCollectionsStub = {};
                objectUnderTest.view.getFavoriteCollections.returns(favoriteCollectionsStub);
                var favoriteSavedSearchesStub = {};
                objectUnderTest.view.getFavoriteSavedSearches.returns(favoriteSavedSearchesStub);
                objectUnderTest.options.favoritesCollection = new mvp.Collection();

                // Mock Limited List
                _sandbox.stub(LimitedList.prototype, 'init'); // used to spy on args input to constructor.
                _sandbox.stub(LimitedList.prototype, 'setClickHandler');
                _sandbox.stub(LimitedList.prototype, 'attachTo');
                _sandbox.stub(mvp.Collection.prototype, 'fetch');

                // define expected properties
                var collectionsViewAllUrl = '#networkexplorer/collections/my';
                var savedSearchesViewAllUrl = '#networkexplorer/savedsearches/my';

                // ACT
                objectUnderTest.onStart();

                //ASSERT
                expect(objectUnderTest.sticky).to.equal(false);
                expect(objectUnderTest.top).to.equal(null);
                expect(objectUnderTest.menuOpen).to.equal(true);
                expect(objectUnderTest.favoritesLoaded).to.equal(false);
                expect(objectUnderTest.collectionsLoaded).to.equal(false);
                expect(objectUnderTest.savedSearchesLoaded).to.equal(false);
                expect(objectUnderTest.collectionsCollection instanceof mvp.Collection).to.equal(true);
                expect(objectUnderTest.savedSearchesCollection instanceof mvp.Collection).to.equal(true);

                expect(objectUnderTest.getEventBus().subscribe.callCount).to.equal(3);
                expect(objectUnderTest.getEventBus().subscribe.getCall(0).calledWith('Results:searchSaved')).to.equal(true);
                expect(objectUnderTest.getEventBus().subscribe.getCall(1).calledWith('Results:entityCreated')).to.equal(true);
                expect(objectUnderTest.getEventBus().subscribe.getCall(2).calledWith('NetworkExplorer:appLoaded', objectUnderTest.clearListDataAndFetch, objectUnderTest)).to.equal(true);


                expect(LimitedList.prototype.init.callCount).to.equal(4);
                expect(LimitedList.prototype.init.getCall(0).calledWith({
                    limit: 5,
                    viewAllUrl: collectionsViewAllUrl,
                    favoritesEnabled: true,
                    appId: 'networkexplorer',
                    favoritesCollection: objectUnderTest.favoritesCollection
                })).to.equal(true);
                expect(LimitedList.prototype.init.getCall(1).calledWith({
                    limit: 5,
                    viewAllUrl: savedSearchesViewAllUrl,
                    favoritesEnabled: true,
                    appId: 'networkexplorer',
                    favoritesCollection: objectUnderTest.favoritesCollection
                })).to.equal(true);
                expect(LimitedList.prototype.init.getCall(2).calledWith({
                    showViewAllButton: false,
                    favoritesEnabled: true,
                    appId: 'networkexplorer',
                    favoritesCollection: objectUnderTest.favoritesCollection
                })).to.equal(true);
                expect(LimitedList.prototype.init.getCall(3).calledWith({
                    showViewAllButton: false,
                    favoritesEnabled: true,
                    appId: 'networkexplorer',
                    favoritesCollection: objectUnderTest.favoritesCollection
                })).to.equal(true);

                expect(LimitedList.prototype.setClickHandler.callCount).to.equal(4);
                expect(LimitedList.prototype.setClickHandler.alwaysCalledWith(objectUnderTest.setLocation, objectUnderTest)).to.equal(true);

                expect(LimitedList.prototype.attachTo.callCount).to.equal(4);
                expect(LimitedList.prototype.attachTo.getCall(0).calledWith(collectionsStub)).to.equal(true);
                expect(LimitedList.prototype.attachTo.getCall(1).calledWith(savedSearchesStub)).to.equal(true);
                expect(LimitedList.prototype.attachTo.getCall(2).calledWith(favoriteCollectionsStub)).to.equal(true);
                expect(LimitedList.prototype.attachTo.getCall(3).calledWith(favoriteSavedSearchesStub)).to.equal(true);
            });
        });

        describe('updateCollectionListWidget', function() {
            it('should set the items of the collectionListWidget based on the collection contents.', function() {
                // ARRANGE
                var sandbox = sinon.sandbox.create();

                var collectionMock = new mvp.Collection([
                    new mvp.Model({
                        id: '1',
                        name: 'name1',
                        category: 'Private',
                        favorite: true
                    }),
                    new mvp.Model({
                        id: '2',
                        name: 'name2',
                        category: 'Private',
                        favorite: false
                    }),
                    new mvp.Model({
                        id: '3',
                        name: 'name3',
                        category: 'Public',
                        favorite: false
                    })
                ]);

                var expectedItems = [{
                    name: 'name1',
                    url: '#networkexplorer/collection/1',
                    favoriteId: '1',
                    favorite: true,
                    duplicate: false,
                    category: 'Private'
                }, {
                    name: 'name2',
                    url: '#networkexplorer/collection/2',
                    favoriteId: '2',
                    favorite: false,
                    duplicate: false,
                    category: 'Private'
                }, {
                    name: 'name3',
                    url: '#networkexplorer/collection/3',
                    favoriteId: '3',
                    favorite: false,
                    duplicate: false,
                    category: 'Public'
                }];

                objectUnderTest.collectionListWidget = sandbox.stub({
                    setItems: function() {}
                });
                _sandbox.stub(objectUnderTest, 'updateFavorites');

                // ACT
                objectUnderTest.updateCollectionListWidget(collectionMock);

                //ASSERT
                expect(objectUnderTest.collectionListWidget.setItems.callCount).to.equal(1);
                expect(objectUnderTest.collectionListWidget.setItems.getCall(0).calledWith(expectedItems)).to.equal(true);
                expect(objectUnderTest.view.hideCollectionsLoadingAnimation.callCount).to.equal(1);
                expect(objectUnderTest.updateFavorites.callCount).to.equal(1);


                // RESTORE
                sandbox.restore();
            });
        });

        describe('updateSavedSearchListWidget', function() {
            it('should set the items of the savedSearchListWidget based on the collection contents.', function() {
                // ARRANGE
                var sandbox = sinon.sandbox.create();

                var collectionMock = new mvp.Collection([
                    new mvp.Model({
                        poId: '1',
                        name: 'name1',
                        favorite: true,
                        attributes: {
                            category: 'Private'
                        }
                    }),
                    new mvp.Model({
                        poId: '2',
                        name: 'name2',
                        favorite: true,
                        attributes: {
                            category: 'Private'
                        }
                    }),
                    new mvp.Model({
                        poId: '3',
                        name: 'name3',
                        favorite: false,
                        attributes: {
                            category: 'Public'
                        }
                    })
                ]);

                var expectedItems = [{
                    name: 'name1',
                    url: '#networkexplorer/savedsearch/1',
                    favoriteId: '1',
                    favorite: true,
                    duplicate: false,
                    category: 'Private'
                }, {
                    name: 'name2',
                    url: '#networkexplorer/savedsearch/2',
                    favoriteId: '2',
                    favorite: true,
                    duplicate: false,
                    category: 'Private'
                }, {
                    name: 'name3',
                    url: '#networkexplorer/savedsearch/3',
                    favoriteId: '3',
                    favorite: false,
                    duplicate: false,
                    category: 'Public'
                }];

                objectUnderTest.savedSearchListWidget = sandbox.stub({
                    setItems: function() {}
                });
                _sandbox.stub(objectUnderTest, 'updateFavorites');

                // TODO: CODE_REVIEW, suggested to test with non empty collection, to verify items var is passed to
                // new widget

                // ACT
                objectUnderTest.updateSavedSearchListWidget(collectionMock);

                //ASSERT
                expect(objectUnderTest.savedSearchListWidget.setItems.callCount).to.equal(1);
                expect(objectUnderTest.savedSearchListWidget.setItems.getCall(0).calledWith(expectedItems)).to.equal(true);
                expect(objectUnderTest.view.hideSavedSearchesLoadingAnimation.callCount).to.equal(1);
                expect(objectUnderTest.updateFavorites.callCount).to.equal(1);

                // RESTORE
                sandbox.restore();
            });
        });

        describe('updateFavorites()', function() {
            beforeEach(function() {
                _sandbox.stub(objectUnderTest, 'mergeFavorites');
                objectUnderTest.favoritesLoaded = true;
                objectUnderTest.collectionsLoaded = true;
                objectUnderTest.savedSearchesLoaded = true;

                objectUnderTest.collectionsCollection = new mvp.Collection();
                objectUnderTest.savedSearchesCollection = new mvp.Collection();
                objectUnderTest.favoriteCollectionsListWidget = _sandbox.stub({
                    setItems: function() {}
                });
                objectUnderTest.favoriteSavedSearchesListWidget = _sandbox.stub({
                    setItems: function() {}
                });
            });

            it('when there are favorited collections', function() {
                // ACT
                objectUnderTest.updateFavorites();

                // ASSERT
                expect(objectUnderTest.mergeFavorites.callCount).to.equal(2);
                expect(objectUnderTest.mergeFavorites.getCall(0).calledWith(
                    objectUnderTest.collectionsCollection
                )).to.equal(true);
                expect(objectUnderTest.mergeFavorites.getCall(1).calledWith(
                    objectUnderTest.savedSearchesCollection
                )).to.equal(true);

            });

            it('should set the items of the favorite collections list if there are favorited collections', function() {
                // ARRANGE
                objectUnderTest.collectionsCollection.setModels([{
                    favorite: true,
                    name: 'Name 1',
                    category: 'Private',
                    id: '1'
                }, {
                    favorite: false,
                    name: 'Name 2',
                    category: 'Private',
                    id: '2'
                }, {
                    favorite: true,
                    name: 'Name 3',
                    category: 'Public',
                    id: '3'
                }]);

                // ACT
                objectUnderTest.updateFavorites();

                // ASSERT
                expect(objectUnderTest.view.hidePlaceholderText.callCount).to.equal(1);
                expect(objectUnderTest.view.showFavoriteCollections.callCount).to.equal(1);
                //  favoriteCollections will get populated based on collectionsCollection.
                expect(objectUnderTest.favoriteCollectionsListWidget.setItems.callCount).to.equal(1);
                expect(objectUnderTest.favoriteCollectionsListWidget.setItems.getCall(0).calledWith([{
                    name: 'Name 1',
                    url: '#networkexplorer/collection/1',
                    favoriteId: '1',
                    favorite: true,
                    duplicate: false,
                    category: 'Private'
                }, {
                    name: 'Name 3',
                    url: '#networkexplorer/collection/3',
                    favoriteId: '3',
                    favorite: true,
                    duplicate: false,
                    category: 'Public'
                }])).to.equal(true);
            });

            it('should set the items of the favorite saved searches list if there are favorited saved searches', function() {
                // ARRANGE
                objectUnderTest.savedSearchesCollection.setModels([{
                    favorite: true,
                    name: 'Name 1',
                    poId: '1',
                    attributes: {
                        category: 'Private'
                    }
                }, {
                    favorite: false,
                    name: 'Name 2',
                    poId: '2',
                    attributes: {
                        category: 'Private'
                    }
                }, {
                    favorite: true,
                    name: 'Name 3',
                    poId: '3',
                    attributes: {
                        category: 'Public'
                    }
                }]);

                // ACT
                objectUnderTest.updateFavorites();

                // ASSERT
                expect(objectUnderTest.view.hidePlaceholderText.callCount).to.equal(1);
                expect(objectUnderTest.view.showFavoriteSavedSearches.callCount).to.equal(1);
                expect(objectUnderTest.favoriteSavedSearchesListWidget.setItems.callCount).to.equal(1);
                expect(objectUnderTest.favoriteSavedSearchesListWidget.setItems.getCall(0).calledWith([{
                    name: 'Name 1',
                    url: '#networkexplorer/savedsearch/1',
                    favoriteId: '1',
                    favorite: true,
                    duplicate: false,
                    category: 'Private'
                }, {
                    name: 'Name 3',
                    url: '#networkexplorer/savedsearch/3',
                    favoriteId: '3',
                    favorite: true,
                    duplicate: false,
                    category: 'Public'
                }])).to.equal(true);
            });

            it('should not set the items of the favorite collections list if there are no favorited collections', function() {
                // ARRANGE
                objectUnderTest.collectionsCollection.setModels([{
                    favorite: false,
                    name: 'Name 1',
                    poId: '1'
                }, {
                    favorite: false,
                    name: 'Name 2',
                    poId: '2'
                }]);

                // ACT
                objectUnderTest.updateFavorites();

                // ASSERT
                expect(objectUnderTest.view.hidePlaceholderText.callCount).to.equal(0);
                expect(objectUnderTest.view.showFavoriteCollections.callCount).to.equal(0);
                expect(objectUnderTest.favoriteCollectionsListWidget.setItems.callCount).to.equal(0);
                expect(objectUnderTest.view.hideFavoriteCollections.callCount).to.equal(1);
            });

            it('should not set the items of the favorite saved searches list if there are no favorited saved searches', function() {
                // ARRANGE
                objectUnderTest.savedSearchesCollection.setModels([{
                    favorite: false,
                    name: 'Name 1',
                    poId: '1'
                }, {
                    favorite: false,
                    name: 'Name 2',
                    poId: '2'
                }]);

                // ACT
                objectUnderTest.updateFavorites();

                // ASSERT
                expect(objectUnderTest.view.hidePlaceholderText.callCount).to.equal(0);
                expect(objectUnderTest.view.showFavoriteSavedSearches.callCount).to.equal(0);
                expect(objectUnderTest.favoriteSavedSearchesListWidget.setItems.callCount).to.equal(0);
                expect(objectUnderTest.view.hideFavoriteSavedSearches.callCount).to.equal(1);
            });

            it('should show the placeholder text if there are no favorite collections or saved searches', function() {
                // ARRANGE
                objectUnderTest.collectionsCollection.setModels([{
                    favorite: false,
                    name: 'Name 1',
                    poId: '1'
                }]);
                objectUnderTest.savedSearchesCollection.setModels([{
                    favorite: false,
                    name: 'Name 1',
                    poId: '1'
                }]);

                // ACT
                objectUnderTest.updateFavorites();

                // ASSERT
                expect(objectUnderTest.view.showPlaceholderText.callCount).to.equal(1);
            });

            [{
                favoritesLoaded: false,
                collectionsLoaded: true,
                savedSearchesLoaded: true,
                collectionFavourite: true,
                savedSearchesFavourite: true,
                descr: 'should do nothing if favorites not loaded',
                expResult: { }
            },{
                favoritesLoaded: true,
                collectionsLoaded: false,
                savedSearchesLoaded: false,
                collectionFavourite: true,
                savedSearchesFavourite: true,
                descr: 'should show placeholder text if collections and saved searches not loaded',
                expResult: { showPlaceholder: 1 }
            },{
                favoritesLoaded: true,
                collectionsLoaded: true,
                savedSearchesLoaded: false,
                collectionFavourite: true,
                savedSearchesFavourite: true,
                descr: 'should show only collection favourites if saved searches not loaded',
                expResult: { hidePlaceholder: 1, showCollection: 1 }
            },{
                favoritesLoaded: true,
                collectionsLoaded: false,
                savedSearchesLoaded: true,
                collectionFavourite: true,
                savedSearchesFavourite: true,
                descr: 'should show only saved search favourites if collections not loaded',
                expResult: { hidePlaceholder: 1, showSearches: 1 }
            },{
                favoritesLoaded: true,
                collectionsLoaded: true,
                savedSearchesLoaded: true,
                collectionFavourite: true,
                savedSearchesFavourite: true,
                descr: 'should show collection and saved search favourites if either are loaded',
                expResult: { hidePlaceholder: 2, showCollection: 1, showSearches: 1 }
            },{
                favoritesLoaded: true,
                collectionsLoaded: true,
                savedSearchesLoaded: true,
                collectionFavourite: true,
                savedSearchesFavourite: false,
                descr: 'should show only collection favourite if no saved searches are favourite',
                expResult: { hidePlaceholder: 1, showCollection: 1, hideSearches: 1 }
            },{
                favoritesLoaded: true,
                collectionsLoaded: true,
                savedSearchesLoaded: true,
                collectionFavourite: false,
                savedSearchesFavourite: true,
                descr: 'should show only saved searches favourite if no collections are favourite',
                expResult: { hidePlaceholder: 1, hideCollection: 1, showSearches: 1 }
            },{
                favoritesLoaded: true,
                collectionsLoaded: true,
                savedSearchesLoaded: false,
                collectionFavourite: false,
                savedSearchesFavourite: false,
                descr: 'should show placeholder text if collection loaded and no favourites are present',
                expResult: { showPlaceholder: 1, hideCollection: 1 }
            },{
                favoritesLoaded: true,
                collectionsLoaded: false,
                savedSearchesLoaded: true,
                collectionFavourite: false,
                savedSearchesFavourite: false,
                descr: 'should show placeholder text if saved searches loaded and no favourites are present',
                expResult: { showPlaceholder: 1, hideSearches: 1 }
            }].forEach(function(testParam) {
                it(testParam.descr, function() {
                    // ARRANGE
                    objectUnderTest.favoritesLoaded = testParam.favoritesLoaded;
                    objectUnderTest.collectionsLoaded = testParam.collectionsLoaded;
                    objectUnderTest.savedSearchesLoaded = testParam.savedSearchesLoaded;
                    objectUnderTest.collectionsCollection.setModels([{
                        attributes: {
                            category: 'Private'
                        },
                        favorite: testParam.collectionFavourite,
                        name: 'Name 1',
                        id: '1'
                    }]);
                    objectUnderTest.savedSearchesCollection.setModels([{
                        attributes: {
                            category: 'Private'
                        },
                        favorite: testParam.savedSearchesFavourite,
                        name: 'Name 1',
                        poId: '1'
                    }]);

                    // ACT
                    objectUnderTest.updateFavorites();

                    // ASSERT
                    expect(objectUnderTest.view.hidePlaceholderText.callCount).to.equal(('hidePlaceholder' in testParam.expResult)?testParam.expResult.hidePlaceholder:0);
                    expect(objectUnderTest.view.showPlaceholderText.callCount).to.equal(('showPlaceholder' in testParam.expResult)?testParam.expResult.showPlaceholder:0);
                    expect(objectUnderTest.view.showFavoriteCollections.callCount).to.equal(('showCollection' in testParam.expResult)?testParam.expResult.showCollection:0);
                    expect(objectUnderTest.favoriteCollectionsListWidget.setItems.callCount).to.equal(('showCollection' in testParam.expResult)?testParam.expResult.showCollection:0);
                    expect(objectUnderTest.view.hideFavoriteCollections.callCount).to.equal(('hideCollection' in testParam.expResult)?testParam.expResult.hideCollection:0);
                    expect(objectUnderTest.view.showFavoriteSavedSearches.callCount).to.equal(('showSearches' in testParam.expResult)?testParam.expResult.showSearches:0);
                    expect(objectUnderTest.favoriteSavedSearchesListWidget.setItems.callCount).to.equal(('showSearches' in testParam.expResult)?testParam.expResult.showSearches:0);
                    expect(objectUnderTest.view.hideFavoriteSavedSearches.callCount).to.equal(('hideSearches' in testParam.expResult)?testParam.expResult.hideSearches:0);

                });
            });

        });

        describe('clearListDataAndFetch()', function() {
            it('should clear the items in collection and saved search list widgets and refresh them and hide all favorites content', function() {
                // ARRANGE
                objectUnderTest.collectionListWidget = _sandbox.stub({
                    setItems: function() {}
                });
                objectUnderTest.savedSearchListWidget = _sandbox.stub({
                    setItems: function() {}
                });
                objectUnderTest.favoriteCollectionsListWidget = _sandbox.stub({
                    setItems: function() {}
                });
                objectUnderTest.favoriteSavedSearchesListWidget = _sandbox.stub({
                    setItems: function() {}
                });
                _sandbox.stub(objectUnderTest, 'fetchListData', function() {});

                // ACT
                objectUnderTest.clearListDataAndFetch();

                // ASSERT
                expect(objectUnderTest.collectionListWidget.setItems.callCount).to.equal(1);
                expect(objectUnderTest.collectionListWidget.setItems.getCall(0).calledWith([])).to.equal(true);
                expect(objectUnderTest.savedSearchListWidget.setItems.callCount).to.equal(1);
                expect(objectUnderTest.savedSearchListWidget.setItems.getCall(0).calledWith([])).to.equal(true);
                expect(objectUnderTest.favoriteCollectionsListWidget.setItems.callCount).to.equal(1);
                expect(objectUnderTest.favoriteCollectionsListWidget.setItems.getCall(0).calledWith([])).to.equal(true);
                expect(objectUnderTest.favoriteSavedSearchesListWidget.setItems.callCount).to.equal(1);
                expect(objectUnderTest.favoriteSavedSearchesListWidget.setItems.getCall(0).calledWith([])).to.equal(true);
                expect(objectUnderTest.view.hideFavoriteCollections.callCount).to.equal(1);
                expect(objectUnderTest.view.hideFavoriteSavedSearches.callCount).to.equal(1);
                expect(objectUnderTest.view.hidePlaceholderText.callCount).to.equal(1);
                expect(objectUnderTest.fetchListData.callCount).to.equal(1);
            });
        });

        describe('mergeFavorites()', function() {
            it('should merge the favorites collection and the provided collection based on their IDs', function() {
                objectUnderTest.favoritesCollection = new mvp.Collection([{
                    id: '1',
                    value: 'true'
                }, {
                    id: '4',
                    value: 'true'
                }]);
                var collectionMock = new mvp.Collection([{
                    id: '1',
                    name: 'Name 1'
                }, {
                    id: '2',
                    name: 'Name 2'
                }, {
                    id: '3',
                    name: 'Name 3'
                }, {
                    id: '4',
                    name: 'Name 4'
                }, {
                    id: '5',
                    name: 'Name 5'
                }]);

                // ACT
                objectUnderTest.mergeFavorites(collectionMock);

                // ASSERT
                expect(collectionMock.toJSON()).to.deep.equal([{
                    id: '1',
                    name: 'Name 1',
                    favorite: true
                }, {
                    id: '2',
                    name: 'Name 2'
                }, {
                    id: '3',
                    name: 'Name 3'
                }, {
                    id: '4',
                    name: 'Name 4',
                    favorite: true
                }, {
                    id: '5',
                    name: 'Name 5'
                }]);
            });
        });

        describe('favoritesFetchSuccess()', function() {
            beforeEach(function() {
                objectUnderTest.fetchFavoritesRetried = 1;
                _sandbox.stub(objectUnderTest, 'mergeFavorites');
                _sandbox.stub(objectUnderTest, 'updateCollectionListWidget');
                _sandbox.stub(objectUnderTest, 'updateSavedSearchListWidget');
                objectUnderTest.collectionsCollection = new mvp.Collection();
                objectUnderTest.savedSearchesCollection = new mvp.Collection();
                objectUnderTest.favoritesLoaded = false;
                objectUnderTest.collectionsLoaded = false;
                objectUnderTest.savedSearchesLoaded = false;
            });

            it('should set favoritesLoaded to true and not update the either list widget if collectionsLoaded and savedSearchesLoaded are false', function() {
                // ACT
                objectUnderTest.favoritesFetchSuccess();

                // ASSERT
                expect(objectUnderTest.favoritesLoaded).to.equal(true);
                expect(objectUnderTest.mergeFavorites.callCount).to.equal(0);
                expect(objectUnderTest.updateCollectionListWidget.callCount).to.equal(0);
                expect(objectUnderTest.updateSavedSearchListWidget.callCount).to.equal(0);
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.calledWith('SlidingMenu:removeToast')).to.equal(true);
            });
            it('should set favoritesLoaded to true and update the collections list widget if collectionsLoaded is true', function() {
                // ARRANGE
                objectUnderTest.collectionsLoaded = true;

                // ACT
                objectUnderTest.favoritesFetchSuccess();

                // ASSERT
                expect(objectUnderTest.favoritesLoaded).to.equal(true);
                expect(objectUnderTest.mergeFavorites.callCount).to.equal(1);
                expect(objectUnderTest.mergeFavorites.getCall(0).calledWith(objectUnderTest.collectionsCollection)).to.equal(true);
                expect(objectUnderTest.updateCollectionListWidget.callCount).to.equal(1);
                expect(objectUnderTest.updateCollectionListWidget.getCall(0).calledWith(objectUnderTest.collectionsCollection)).to.equal(true);
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.calledWith('SlidingMenu:removeToast')).to.equal(true);
                expect(objectUnderTest.view.showPlaceholderText.callCount).to.equal(0);
                expect(objectUnderTest.view.showPlaceholderStar.callCount).to.equal(0);
            });
            it('should hide favorite loading animation', function() {
                // ACT
                objectUnderTest.favoritesFetchSuccess();

                // ASSERT
                expect(objectUnderTest.view.hideFavoritesLoadingAnimation.callCount).to.equal(1);
            });
            it('should show placeholder text if either collectionsLoaded and savedSearchesLoaded are false', function() {
                // ACT
                objectUnderTest.favoritesFetchSuccess();

                // ASSERT
                expect(objectUnderTest.view.showPlaceholderText.callCount).to.equal(1);
                expect(objectUnderTest.view.showPlaceholderStar.callCount).to.equal(1);
            });
        });

        describe('collectionsFetchSuccess()', function() {
            var collectionMock;

            beforeEach(function() {
                objectUnderTest.fetchCollectionsRetried = 1;
                _sandbox.stub(objectUnderTest, 'mergeFavorites');
                _sandbox.stub(objectUnderTest, 'updateCollectionListWidget');
                objectUnderTest.collectionsCollection = new mvp.Collection([{
                    attributes: {
                        name: 'Name 1',
                        timeCreated: '1422461936466'
                    },
                    poId: '1'
                }, {
                    attributes: {
                        name: 'Name 2',
                        timeCreated: '1422461842062'
                    },
                    poId: '2'
                }, {
                    attributes: {
                        name: 'Name 3',
                        timeCreated: '1422461900446'
                    },
                    poId: '3'
                }]);
                collectionMock = new mvp.Collection();
                objectUnderTest.favoritesLoaded = false;
                objectUnderTest.collectionsLoaded = false;
            });

            it('should set collectionsLoaded to true, sort the collections and update the collection list widget if favoritesLoaded is true', function() {
                // ARRANGE
                objectUnderTest.favoritesLoaded = true;

                // ACT
                objectUnderTest.collectionsFetchSuccess(collectionMock);

                // ASSERT
                expect(objectUnderTest.collectionsLoaded).to.equal(true);
                expect(objectUnderTest.collectionsCollection.toJSON()).to.deep.equal([{
                    attributes: {
                        name: 'Name 1',
                        timeCreated: '1422461936466'
                    },
                    poId: '1'
                }, {
                    attributes: {
                        name: 'Name 3',
                        timeCreated: '1422461900446'
                    },
                    poId: '3'
                }, {
                    attributes: {
                        name: 'Name 2',
                        timeCreated: '1422461842062'
                    },
                    poId: '2'
                }]);
                expect(objectUnderTest.mergeFavorites.callCount).to.equal(1);
                expect(objectUnderTest.mergeFavorites.getCall(0).calledWith(collectionMock)).to.equal(true);
                expect(objectUnderTest.updateCollectionListWidget.callCount).to.equal(1);
                expect(objectUnderTest.updateCollectionListWidget.getCall(0).calledWith(collectionMock)).to.equal(true);
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.calledWith('SlidingMenu:removeToast')).to.equal(true);
            });

            it('should sort the collections and only set collectionsLoaded to true if favoritesLoaded is false', function() {

                // ACT
                objectUnderTest.collectionsFetchSuccess(collectionMock);

                // ASSERT
                expect(objectUnderTest.collectionsLoaded).to.equal(true);
                expect(objectUnderTest.collectionsCollection.toJSON()).to.deep.equal([{
                    attributes: {
                        name: 'Name 1',
                        timeCreated: '1422461936466'
                    },
                    poId: '1'
                }, {
                    attributes: {
                        name: 'Name 3',
                        timeCreated: '1422461900446'
                    },
                    poId: '3'
                }, {
                    attributes: {
                        name: 'Name 2',
                        timeCreated: '1422461842062'
                    },
                    poId: '2'
                }]);
                expect(objectUnderTest.mergeFavorites.callCount).to.equal(0);
                expect(objectUnderTest.updateCollectionListWidget.callCount).to.equal(0);
            });
        });

        describe('savedSearchesFetchSuccess()', function() {
            var collectionMock;

            beforeEach(function() {
                objectUnderTest.fetchSavedSearchesRetried = 1;
                _sandbox.stub(objectUnderTest, 'mergeFavorites');
                _sandbox.stub(objectUnderTest, 'updateSavedSearchListWidget');
                objectUnderTest.savedSearchesCollection = new mvp.Collection([{
                    attributes: {
                        name: 'Name 1',
                        timeCreated: '1422461936466'
                    },
                    poId: '1'
                }, {
                    attributes: {
                        name: 'Name 2',
                        timeCreated: '1422461399541'
                    },
                    poId: '2'
                }, {
                    attributes: {
                        name: 'Name 3',
                        timeCreated: '1422461531264'
                    },
                    poId: '3'
                }]);
                collectionMock = new mvp.Collection();
                objectUnderTest.favoritesLoaded = false;
                objectUnderTest.savedSearchesLoaded = false;
            });

            it('should set collectionsLoaded to true, sort the saved searches and update the collection list widget if favoritesLoaded is true', function() {
                // ARRANGE
                objectUnderTest.favoritesLoaded = true;

                // ACT
                objectUnderTest.savedSearchesFetchSuccess(collectionMock);

                // ASSERT
                expect(objectUnderTest.savedSearchesLoaded).to.equal(true);
                expect(objectUnderTest.savedSearchesCollection.toJSON()).to.deep.equal([{
                    attributes: {
                        name: 'Name 1',
                        timeCreated: '1422461936466'
                    },
                    poId: '1'
                }, {
                    attributes: {
                        name: 'Name 3',
                        timeCreated: '1422461531264'
                    },
                    poId: '3'
                }, {
                    attributes: {
                        name: 'Name 2',
                        timeCreated: '1422461399541'
                    },
                    poId: '2'
                }]);
                expect(objectUnderTest.mergeFavorites.callCount).to.equal(1);
                expect(objectUnderTest.mergeFavorites.getCall(0).calledWith(collectionMock)).to.equal(true);
                expect(objectUnderTest.updateSavedSearchListWidget.callCount).to.equal(1);
                expect(objectUnderTest.updateSavedSearchListWidget.getCall(0).calledWith(collectionMock)).to.equal(true);
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.calledWith('SlidingMenu:removeToast')).to.equal(true);
            });

            it('should sort the saved searches only set collectionsLoaded to true if favoritesLoaded is false', function() {
                // ACT
                objectUnderTest.savedSearchesFetchSuccess(collectionMock);

                // ASSERT
                expect(objectUnderTest.savedSearchesLoaded).to.equal(true);
                expect(objectUnderTest.savedSearchesCollection.toJSON()).to.deep.equal([{
                    attributes: {
                        name: 'Name 1',
                        timeCreated: '1422461936466'
                    },
                    poId: '1'
                }, {
                    attributes: {
                        name: 'Name 3',
                        timeCreated: '1422461531264'
                    },
                    poId: '3'
                }, {
                    attributes: {
                        name: 'Name 2',
                        timeCreated: '1422461399541'
                    },
                    poId: '2'
                }]);
                expect(objectUnderTest.mergeFavorites.callCount).to.equal(0);
                expect(objectUnderTest.updateSavedSearchListWidget.callCount).to.equal(0);
            });
        });

        describe('fetchListData()', function() {
            var slidingMenu, collectionListWidgetStub, savedSearchesListWidgetStub, sandbox, favoritesCollectionStub, collectionsCollectionStub, savedSearchesCollectionStub;

            beforeEach(function() {
                // ARRANGE
                collectionsCollectionStub = _sandbox.stub(new mvp.Collection());
                savedSearchesCollectionStub = _sandbox.stub(new mvp.Collection());
                favoritesCollectionStub = _sandbox.stub(new mvp.Collection());

                objectUnderTest.collectionsCollection = collectionsCollectionStub;
                objectUnderTest.savedSearchesCollection = savedSearchesCollectionStub;
                objectUnderTest.favoritesCollection = favoritesCollectionStub;
                objectUnderTest.collectionListWidget = collectionListWidgetStub;
                objectUnderTest.savedSearchListWidget = savedSearchesListWidgetStub;
                objectUnderTest.favoritesLoaded = true;
                objectUnderTest.collectionsLoaded = true;
                objectUnderTest.savedSearchesLoaded = true;

            });

            it('should fetch CollectionsCollection and favoritesCollection if type is "collection"', function() {
                // ARRANGE
                _sandbox.stub(objectUnderTest, 'fetchCollections');

                // ACT
                objectUnderTest.fetchListData('collection');

                // ASSERT
                expect(objectUnderTest.view.showFavoritesLoadingAnimation.callCount).to.equal(1);
                expect(objectUnderTest.favoritesLoaded).to.equal(false);
                expect(objectUnderTest.collectionsLoaded).to.equal(false);
                expect(objectUnderTest.savedSearchesLoaded).to.equal(true);
                expect(objectUnderTest.view.showCollectionsLoadingAnimation.callCount).to.equal(1);
                expect(objectUnderTest.fetchCollections.callCount).to.equal(1);
                expect(objectUnderTest.view.showSavedSearchesLoadingAnimation.callCount).to.equal(0);
                expect(savedSearchesCollectionStub.fetch.callCount).to.equal(0);
                expect(favoritesCollectionStub.fetch.callCount).to.equal(1);
                expect(favoritesCollectionStub.fetch.getCall(0).calledWithMatch({
                    url: '/rest/ui/settings/networkexplorer/favorites'
                })).to.equal(true);
                // no possibility to verify fetch has defined appropriate success function.
            });

            it('should fetch collectionsCollection and favoritesCollection if type is "savedSearch"', function() {
                // ACT
                objectUnderTest.fetchListData('savedSearch');

                // ASSERT
                expect(objectUnderTest.favoritesLoaded).to.equal(false);
                expect(objectUnderTest.collectionsLoaded).to.equal(true);
                expect(objectUnderTest.savedSearchesLoaded).to.equal(false);
                expect(objectUnderTest.view.showSavedSearchesLoadingAnimation.callCount).to.equal(1);
                expect(savedSearchesCollectionStub.fetch.callCount).to.equal(1);
                expect(objectUnderTest.view.showCollectionsLoadingAnimation.callCount).to.equal(0);
                expect(collectionsCollectionStub.fetch.callCount).to.equal(0);
                expect(favoritesCollectionStub.fetch.callCount).to.equal(1);
                expect(favoritesCollectionStub.fetch.getCall(0).calledWithMatch({
                    url: '/rest/ui/settings/networkexplorer/favorites'
                })).to.equal(true);
                // no possibility to verify fetch has defined appropriate success function.
            });

            it('should refresh all three collections if type is undefined', function() {
                // ARRANGE
                _sandbox.stub(objectUnderTest, 'fetchCollections');

                // ACT
                objectUnderTest.fetchListData();

                // ASSERT
                expect(objectUnderTest.favoritesLoaded).to.equal(false);
                expect(objectUnderTest.collectionsLoaded).to.equal(false);
                expect(objectUnderTest.savedSearchesLoaded).to.equal(false);
                expect(objectUnderTest.view.showCollectionsLoadingAnimation.callCount).to.equal(1);
                expect(objectUnderTest.fetchCollections.callCount).to.equal(1);
                expect(objectUnderTest.view.showSavedSearchesLoadingAnimation.callCount).to.equal(1);
                expect(savedSearchesCollectionStub.fetch.callCount).to.equal(1);
                expect(favoritesCollectionStub.fetch.callCount).to.equal(1);
                expect(favoritesCollectionStub.fetch.getCall(0).calledWithMatch({
                    url: '/rest/ui/settings/networkexplorer/favorites'
                })).to.equal(true);
            });

            it('should refresh only favoritesCollection if type is neither "collection" or "savedSearch" and not undefined', function() {
                // ACT
                objectUnderTest.fetchListData('string');

                // ASSERT
                expect(objectUnderTest.view.showCollectionsLoadingAnimation.callCount).to.equal(0);
                expect(collectionsCollectionStub.fetch.callCount).to.equal(0);
                expect(objectUnderTest.view.showSavedSearchesLoadingAnimation.callCount).to.equal(0);
                expect(savedSearchesCollectionStub.fetch.callCount).to.equal(0);
                expect(favoritesCollectionStub.fetch.callCount).to.equal(1);
                expect(favoritesCollectionStub.fetch.getCall(0).calledWithMatch({
                    url: '/rest/ui/settings/networkexplorer/favorites'
                })).to.equal(true);
            });

            it('should retry fetch if there is a fetch error', function() {
                // ACT
                objectUnderTest.fetchListData('string');

                // ASSERT
                expect(objectUnderTest.view.showCollectionsLoadingAnimation.callCount).to.equal(0);
                expect(collectionsCollectionStub.fetch.callCount).to.equal(0);
                expect(objectUnderTest.view.showSavedSearchesLoadingAnimation.callCount).to.equal(0);
                expect(savedSearchesCollectionStub.fetch.callCount).to.equal(0);
                expect(favoritesCollectionStub.fetch.callCount).to.equal(1);
                expect(favoritesCollectionStub.fetch.getCall(0).calledWithMatch({
                    url: '/rest/ui/settings/networkexplorer/favorites'
                })).to.equal(true);
            });
        });

        describe('favoritesFetchError()', function() {
            var xhrMock;
            beforeEach(function() {
                // ARRANGE
                _sandbox.stub(objectUnderTest, 'showSidebarCollectionsErrorMessage');
                _sandbox.stub(objectUnderTest, 'showSidebarSavedSearchesErrorMessage');
                xhrMock = 'xhr';
            });
            it('should hide favorite loading animation,show placeholder text and show' +
                'sidebar collections and saved searches error messages', function() {
                // ARRANGE

                // ACT
                objectUnderTest.favoritesFetchError(xhrMock);

                // ASSERT
                expect(objectUnderTest.view.hideFavoritesLoadingAnimation.callCount).to.equal(1);
                expect(objectUnderTest.view.showPlaceholderText.callCount).to.equal(1);
                expect(objectUnderTest.showSidebarCollectionsErrorMessage.callCount).to.equal(1);
                expect(objectUnderTest.showSidebarCollectionsErrorMessage.calledWith(xhrMock)).to.equal(true);
                expect(objectUnderTest.showSidebarSavedSearchesErrorMessage.callCount).to.equal(1);
                expect(objectUnderTest.showSidebarSavedSearchesErrorMessage.calledWith(xhrMock)).to.equal(true);
            });
        });

        describe('showSidebarCollectionsErrorMessage()', function() {
            var xhr;
            var serverMessage;
            var collection;
            beforeEach(function() {
                // ARRANGE
                _sandbox.stub(objectUnderTest, 'favoritesFetchError');
                // ARRANGE
                serverMessage = {
                    'userMessage': {
                        title: 'title',
                        'body': 'body'
                    }
                };
                collection = {};
                xhr = _sandbox.stub({
                    getStatus: function() {},
                    getResponseText: function() {}
                });
                _sandbox.stub(httpHelper, 'getServerMessage', function() {
                    return serverMessage;
                });
            });
            it('should show collections error message in sidebar', function() {
                // ACT
                objectUnderTest.showSidebarCollectionsErrorMessage(xhr);

                // ASSERT
                expect(objectUnderTest.view.hideCollections.callCount).to.equal(1);
                expect(objectUnderTest.view.hideCollectionsLoadingAnimation.callCount).to.equal(1);
                expect(objectUnderTest.view.showCollectionsError.callCount).to.equal(1);
                expect(objectUnderTest.view.setCollectionsErrorMessage.callCount).to.equal(1);
                expect(objectUnderTest.view.setCollectionsErrorMessage.getCall(0).calledWith('title')).to.equal(true);
                expect(objectUnderTest.view.setCollectionsErrorParagraph.callCount).to.equal(1);
                expect(objectUnderTest.view.setCollectionsErrorParagraph.getCall(0).calledWith('body')).to.equal(true);
                expect(objectUnderTest.favoritesFetchError.callCount).to.equal(0);
            });
        });

        describe('showSidebarSavedSearchesErrorMessage()', function() {
            var xhr;
            var serverMessage;
            var collection;
            beforeEach(function() {
                // ARRANGE
                _sandbox.stub(objectUnderTest, 'favoritesFetchError');
                // ARRANGE
                serverMessage = {
                    'userMessage': {
                        title: 'title',
                        'body': 'body'
                    }
                };
                collection = {};
                xhr = _sandbox.stub({
                    getStatus: function() {},
                    getResponseText: function() {}
                });
                _sandbox.stub(httpHelper, 'getServerMessage', function() {
                    return serverMessage;
                });
            });
            it('should show saved searches error message in sidebar', function() {
                // ACT
                objectUnderTest.showSidebarSavedSearchesErrorMessage(xhr);

                // ASSERT
                expect(objectUnderTest.view.hideSavedSearches.callCount).to.equal(1);
                expect(objectUnderTest.view.hideSavedSearchesLoadingAnimation.callCount).to.equal(1);
                expect(objectUnderTest.view.showSavedSearchesError.callCount).to.equal(1);
                expect(objectUnderTest.view.setSavedSearchesErrorMessage.callCount).to.equal(1);
                expect(objectUnderTest.view.setSavedSearchesErrorMessage.getCall(0).calledWith('title')).to.equal(true);
                expect(objectUnderTest.view.setSavedSearchesErrorParagraph.callCount).to.equal(1);
                expect(objectUnderTest.view.setSavedSearchesErrorParagraph.getCall(0).calledWith('body')).to.equal(true);
                expect(objectUnderTest.favoritesFetchError.callCount).to.equal(0);
            });
        });


        describe('retryFetch()', function() {

            var xhrMock;
            beforeEach(function() {
                // ARRANGE
                xhrMock = 'xhr';
                _sandbox.stub(objectUnderTest, 'retryFetchTimeout', function() {});
                _sandbox.stub(objectUnderTest, 'showRetryWarning', function() {});
                objectUnderTest.RETRY_INTERVALS = [2000, 5000, 10000];
            });

            it('should show retry warning and retry fetch for collections after 2 seconds', function() {
                objectUnderTest.fetchCollectionsRetried = 0;

                // ACT
                objectUnderTest.retryFetch('Collections', xhrMock);

                // ASSERT
                expect(objectUnderTest.showRetryWarning.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.getCall(0).calledWith(xhrMock, 2000, 'Collections')).to.equal(true);
            });
            it('should show retry warning and retry fetch for collections after 5 seconds', function() {
                objectUnderTest.fetchCollectionsRetried = 1;

                // ACT
                objectUnderTest.retryFetch('Collections', xhrMock);

                // ASSERT
                expect(objectUnderTest.showRetryWarning.callCount).to.equal(0);
                expect(objectUnderTest.retryFetchTimeout.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.getCall(0).calledWith(xhrMock, 5000, 'Collections')).to.equal(true);
            });
            it('should show retry warning and retry fetch for collections after 10 seconds', function() {
                objectUnderTest.fetchCollectionsRetried = 2;

                // ACT
                objectUnderTest.retryFetch('Collections', xhrMock);

                // ASSERT
                expect(objectUnderTest.showRetryWarning.callCount).to.equal(0);
                expect(objectUnderTest.retryFetchTimeout.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.getCall(0).calledWith(xhrMock, 10000, 'Collections')).to.equal(true);
            });
            it('should show retry warning and retry fetch for saved searches after 2 seconds', function() {
                objectUnderTest.fetchSavedSearchesRetried = 0;

                // ACT
                objectUnderTest.retryFetch('Saved Searches', xhrMock);

                // ASSERT
                expect(objectUnderTest.showRetryWarning.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.getCall(0).calledWith(xhrMock, 2000, 'Saved Searches')).to.equal(true);
            });
            it('should show retry warning and retry fetch for saved searches after 5 seconds', function() {
                objectUnderTest.fetchSavedSearchesRetried = 1;

                // ACT
                objectUnderTest.retryFetch('Saved Searches', xhrMock);

                // ASSERT
                expect(objectUnderTest.showRetryWarning.callCount).to.equal(0);
                expect(objectUnderTest.retryFetchTimeout.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.getCall(0).calledWith(xhrMock, 5000, 'Saved Searches')).to.equal(true);
            });
            it('should show retry warning and retry fetch for saved searches after 10 seconds', function() {
                objectUnderTest.fetchSavedSearchesRetried = 2;

                // ACT
                objectUnderTest.retryFetch('Saved Searches', xhrMock);

                // ASSERT
                expect(objectUnderTest.showRetryWarning.callCount).to.equal(0);
                expect(objectUnderTest.retryFetchTimeout.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.getCall(0).calledWith(xhrMock, 10000, 'Saved Searches')).to.equal(true);
            });
            it('should show retry warning and retry fetch for favorites after 2 seconds', function() {
                objectUnderTest.fetchFavoritesRetried = 0;

                // ACT
                objectUnderTest.retryFetch('Favorites', xhrMock);

                // ASSERT
                expect(objectUnderTest.showRetryWarning.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.getCall(0).calledWith(xhrMock, 2000, 'Favorites')).to.equal(true);
            });
            it('should show retry warning and retry fetch for favorites after 5 seconds', function() {
                objectUnderTest.fetchFavoritesRetried = 1;

                // ACT
                objectUnderTest.retryFetch('Favorites', xhrMock);

                // ASSERT
                expect(objectUnderTest.showRetryWarning.callCount).to.equal(0);
                expect(objectUnderTest.retryFetchTimeout.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.getCall(0).calledWith(xhrMock, 5000, 'Favorites')).to.equal(true);
            });
            it('should show retry warning and retry fetch for favorites after 10 seconds', function() {
                objectUnderTest.fetchFavoritesRetried = 2;

                // ACT
                objectUnderTest.retryFetch('Favorites', xhrMock);

                // ASSERT
                expect(objectUnderTest.showRetryWarning.callCount).to.equal(0);
                expect(objectUnderTest.retryFetchTimeout.callCount).to.equal(1);
                expect(objectUnderTest.retryFetchTimeout.getCall(0).calledWith(xhrMock, 10000, 'Favorites')).to.equal(true);
            });
        });

        describe('retryFetchTimeout()', function() {
            var xhrMock;
            beforeEach(function() {
                // ARRANGE
                xhrMock = 'xhr';
                _sandbox.stub(objectUnderTest, 'fetchCollections', function() {});
                _sandbox.stub(objectUnderTest, 'fetchSavedSearches', function() {});
                _sandbox.stub(objectUnderTest, 'fetchFavorites', function() {});
                _sandbox.stub(objectUnderTest, 'showSidebarCollectionsErrorMessage', function() {});
                _sandbox.stub(objectUnderTest, 'showSidebarSavedSearchesErrorMessage', function() {});
                _sandbox.stub(objectUnderTest, 'favoritesFetchError', function() {});
                _sandbox.stub(window, 'setTimeout', function(callback) {
                    callback();
                });
            });
            it('should retry fetch collections', function() {

                // ACT
                objectUnderTest.retryFetchTimeout(xhrMock, 2000, 'Collections');

                // ASSERT
                expect(objectUnderTest.fetchCollections.callCount).to.equal(1);
                expect(objectUnderTest.showSidebarCollectionsErrorMessage.callCount).to.equal(0);
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(0);
            });
            it('should retry fetch collections, show error and remove toast if final retry', function() {

                // ACT
                objectUnderTest.retryFetchTimeout(xhrMock, 10000, 'Collections');

                // ASSERT
                expect(objectUnderTest.fetchCollections.callCount).to.equal(1);
                expect(objectUnderTest.showSidebarCollectionsErrorMessage.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.getCall(0).calledWith('SlidingMenu:removeToast')).to.equal(true);
            });
            it('should retry fetch saved searches', function() {

                // ACT
                objectUnderTest.retryFetchTimeout(xhrMock, 2000, 'Saved Searches');

                // ASSERT
                expect(objectUnderTest.fetchSavedSearches.callCount).to.equal(1);
                expect(objectUnderTest.showSidebarSavedSearchesErrorMessage.callCount).to.equal(0);
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(0);
            });
            it('should retry fetch saved searches, show error and remove toast if final retry', function() {

                // ACT
                objectUnderTest.retryFetchTimeout(xhrMock, 10000, 'Saved Searches');

                // ASSERT
                expect(objectUnderTest.fetchSavedSearches.callCount).to.equal(1);
                expect(objectUnderTest.showSidebarSavedSearchesErrorMessage.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.getCall(0).calledWith('SlidingMenu:removeToast')).to.equal(true);
            });
            it('should retry fetch favorites', function() {

                // ACT
                objectUnderTest.retryFetchTimeout(xhrMock, 2000, 'Favorites');

                // ASSERT
                expect(objectUnderTest.fetchFavorites.callCount).to.equal(1);
                expect(objectUnderTest.favoritesFetchError.callCount).to.equal(0);
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(0);
            });
            it('should retry fetch favorites, show error and remove toast if final retry', function() {

                // ACT
                objectUnderTest.retryFetchTimeout(xhrMock, 10000, 'Favorites');

                // ASSERT
                expect(objectUnderTest.fetchFavorites.callCount).to.equal(1);
                expect(objectUnderTest.favoritesFetchError.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.getCall(0).calledWith('SlidingMenu:removeToast')).to.equal(true);
            });
        });

        describe('showRetryWarning()', function() {
            it('should show retry warning toast', function() {
                // ACT
                objectUnderTest.showRetryWarning();

                // ASSERT
                expect(objectUnderTest.getEventBus().publish.callCount).to.equal(1);
                expect(objectUnderTest.getEventBus().publish.calledWith('SlidingMenu:showToast', {
                    label: strings.retryingToast,
                    color: 'yellow',
                    icon: 'warning',
                    autoDismiss: false,
                    showAsToast: true,
                    showCloseButton: false
                })).to.equal(true);
            });
        });

        describe('stopRetryTimeout()', function() {
            it('should stop timer and remove toast', function() {
                // ARRANGE
                _sandbox.stub(window, 'clearTimeout', function() {});

                // ACT
                objectUnderTest.stopRetryTimeout();

                // ASSERT
                expect(window.clearTimeout.callCount).to.equal(1);
            });
        });
    });
});
