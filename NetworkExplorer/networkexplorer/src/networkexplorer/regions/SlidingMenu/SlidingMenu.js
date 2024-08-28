/*
    ==Region Events==

    --Publishes--
    search
        options {Object} An object containing the searchTerm
        callback {Function} A function to be called when the collection for search is successfully fetched
    collectionInfo
        collectionInfo {Object} An object containing the collection information (name, type)

    --Subscribes--
    collectionCreated
        type {String} A string denoting the type of collection created.
    appContentScroll
*/

define([
    'jscore/core',
    './SlidingMenuView',
    './SidebarItemsCollection',
    '../../widgets/limitedList/LimitedList',
    'i18n!networkexplorer/SlidingMenu.json',
    '../../utils/httpHelper',
    'networkexplorerlib/ObjectConfigurationApi'
], function(core, View, SidebarItemsCollection, LimitedList, strings, httpHelper, ObjectConfigurationApi) {

    return core.Region.extend({

        View: View,

        /**
         * Lifecycle Method
         */
        onStart: function() {
            this.sticky = false; // this.sticky refers to whether the menu is stuck to the top of the app. By default, it isn't.
            this.top = null;
            this.menuOpen = true;
            this.favoritesLoaded = false;
            this.collectionsLoaded = false;
            this.savedSearchesLoaded = false;
            this.fetchCollectionsRetried = 0;
            this.fetchSavedSearchesRetried = 0;
            this.fetchFavoritesRetried = 0;
            this.RETRY_INTERVALS = [2000, 5000, 10000];

            this.collectionsCollection = new SidebarItemsCollection();
            this.savedSearchesCollection = new SidebarItemsCollection();
            this.favoritesCollection = this.options.favoritesCollection;
            this.favoritesCollection.addEventHandler('add', this.updateFavorites, this);
            this.favoritesCollection.addEventHandler('change', this.updateFavorites, this);

            this.collectionListWidget = null;
            this.savedSearchListWidget = null;

            this.getEventBus().subscribe('Results:searchSaved', this.fetchListData.bind(this));
            this.getEventBus().subscribe('Results:entityCreated', this.fetchListData.bind(this));
            this.getEventBus().subscribe('NetworkExplorer:appLoaded', this.clearListDataAndFetch, this);

            this.collectionListWidget = new LimitedList({
                limit: 5,
                viewAllUrl: '#networkexplorer/collections/my',
                favoritesEnabled: true,
                appId: 'networkexplorer',
                favoritesCollection: this.favoritesCollection
            });
            this.collectionListWidget.setClickHandler(this.setLocation, this);
            this.collectionListWidget.attachTo(this.view.getCollections());

            this.savedSearchListWidget = new LimitedList({
                limit: 5,
                viewAllUrl: '#networkexplorer/savedsearches/my',
                favoritesEnabled: true,
                appId: 'networkexplorer',
                favoritesCollection: this.favoritesCollection
            });
            this.savedSearchListWidget.setClickHandler(this.setLocation, this);
            this.savedSearchListWidget.attachTo(this.view.getSavedSearches());

            this.favoriteCollectionsListWidget = new LimitedList({
                showViewAllButton: false,
                favoritesEnabled: true,
                appId: 'networkexplorer',
                favoritesCollection: this.favoritesCollection
            });
            this.favoriteCollectionsListWidget.setClickHandler(this.setLocation, this);
            this.favoriteCollectionsListWidget.attachTo(this.view.getFavoriteCollections());

            this.favoriteSavedSearchesListWidget = new LimitedList({
                showViewAllButton: false,
                favoritesEnabled: true,
                appId: 'networkexplorer',
                favoritesCollection: this.favoritesCollection
            });
            this.favoriteSavedSearchesListWidget.setClickHandler(this.setLocation, this);
            this.favoriteSavedSearchesListWidget.attachTo(this.view.getFavoriteSavedSearches());
        },


        updateCollectionListWidget: function(collection) {
            var items = [];
            collection.each(function(model) {
                items.push({
                    name: model.getAttribute('name'),
                    category: model.getAttribute('sharing') || model.getAttribute('category'),
                    url: '#networkexplorer/collection/' + model.getAttribute('id'),
                    favoriteId: model.getAttribute('id'),
                    favorite: model.getAttribute('favorite'),
                    duplicate: model.getAttribute('duplicate') || false
                });
            });
            this.collectionListWidget.setItems(items);
            this.view.hideCollectionsLoadingAnimation();
            this.updateFavorites();
        },

        updateSavedSearchListWidget: function(collection) {
            var items = [];
            collection.each(function(model) {
                items.push({
                    name: model.getAttribute('name'),
                    url: '#networkexplorer/savedsearch/' + model.getAttribute('poId'),
                    favoriteId: model.getAttribute('poId'),
                    favorite: model.getAttribute('favorite'),
                    duplicate: model.getAttribute('duplicate') || false,
                    category: model.getAttribute('attributes').category
                });
            });

            this.savedSearchListWidget.setItems(items);
            this.view.hideSavedSearchesLoadingAnimation();
            this.updateFavorites();
        },

        updateFavorites: function() { // TODO
            var favoriteCollections = [];
            var favoriteSavedSearches = [];
            if (this.favoritesLoaded) {
                if (this.collectionsLoaded) {
                    this.mergeFavorites(this.collectionsCollection);
                    this.collectionsCollection.each(function(model) {
                        if (model.getAttribute('favorite')) {
                            favoriteCollections.push({
                                name: model.getAttribute('name'),
                                category: model.getAttribute('category'),
                                url: '#networkexplorer/collection/' + model.getAttribute('id'),
                                favoriteId: model.getAttribute('id'),
                                favorite: model.getAttribute('favorite'),
                                duplicate: model.getAttribute('duplicate') || false
                            });
                        }
                    });
                    if (favoriteCollections.length > 0) {
                        this.view.hidePlaceholderText();
                        this.view.hidePlaceholderStar();
                        this.view.showFavoriteCollections();
                        this.favoriteCollectionsListWidget.setItems(favoriteCollections);
                    } else {
                        this.view.hideFavoriteCollections();
                    }
                }
                if (this.savedSearchesLoaded) {
                    this.mergeFavorites(this.savedSearchesCollection);
                    this.savedSearchesCollection.each(function(model) {
                        if (model.getAttribute('favorite')) {
                            favoriteSavedSearches.push({
                                name: model.getAttribute('name'),
                                url: '#networkexplorer/savedsearch/' + model.getAttribute('poId'),
                                favoriteId: model.getAttribute('poId'),
                                favorite: model.getAttribute('favorite'),
                                duplicate: model.getAttribute('duplicate') || false,
                                category: model.getAttribute('attributes').category
                            });
                        }
                    });
                    if (favoriteSavedSearches.length > 0) {
                        this.view.hidePlaceholderText();
                        this.view.hidePlaceholderStar();
                        this.view.showFavoriteSavedSearches();
                        this.favoriteSavedSearchesListWidget.setItems(favoriteSavedSearches);
                    } else {
                        this.view.hideFavoriteSavedSearches();
                    }
                }
                if (favoriteCollections.length === 0 && favoriteSavedSearches.length === 0) {
                    this.view.showPlaceholderText();
                    this.view.showPlaceholderStar();
                }
            }
        },

        setLocation: function(href) {
            this.getEventBus().publish('SlidingMenu:setLocation', href, false);
        },

        clearListDataAndFetch: function() {
            this.collectionListWidget.setItems([]);
            this.savedSearchListWidget.setItems([]);
            this.favoriteSavedSearchesListWidget.setItems([]);
            this.favoriteCollectionsListWidget.setItems([]);
            this.stopRetryTimeout();
            this.view.hideFavoriteCollections();
            this.view.hideFavoriteSavedSearches();
            this.view.hidePlaceholderText();
            this.view.hidePlaceholderStar();
            this.view.hideCollectionsError();
            this.view.hideSavedSearchesError();
            this.fetchCollectionsRetried = 0;
            this.fetchSavedSearchesRetried = 0;
            this.fetchFavoritesRetried = 0;
            this.fetchListData();
        },

        /**
         * Loops through the favorites collection, and sets the favorite state on any model in the provided collection
         * with the same ID as in the favorites collection.
         *
         * @method mergeFavorites
         * @param {mvp.Collection} collection
         */
        mergeFavorites: function(collection) {
            this.favoritesCollection.each(function(favorite) {
                var collectionModel = collection.getModel(favorite.getAttribute('id'));
                if (collectionModel) {
                    collectionModel.setAttribute('favorite', favorite.getAttribute('value') === 'true');
                }
            }.bind(this));
        },

        /**
         * Success callback for fetching favorites. Will merge favorites with collections and saved searches if they're
         * loaded, then update the list widget with the merged collection.
         *
         * @method favoritesFetchSuccess
         */
        favoritesFetchSuccess: function() {
            this.favoritesLoaded = true;
            this.view.hideFavoritesLoadingAnimation();
            if (this.collectionsLoaded === true) {
                this.mergeFavorites(this.collectionsCollection);
                this.updateCollectionListWidget(this.collectionsCollection);
            }
            if (this.savedSearchesLoaded === true) {
                this.mergeFavorites(this.savedSearchesCollection);
                this.updateSavedSearchListWidget(this.savedSearchesCollection);
            }
            if (this.collectionsLoaded === false && this.savedSearchesLoaded === false) {
                this.view.showPlaceholderText();
                this.view.showPlaceholderStar();
            }
            if (this.fetchFavoritesRetried > 0) {
                this.getEventBus().publish('SlidingMenu:removeToast');
            }
        },

        /**
         * Success callback for fetching collections. Will merge favorites with collections if the favorites are
         * loaded, then update the list widget with the merged collection.
         *
         * @method collectionsFetchSuccess
         * @param {mvp.Collection} collection
         */
        collectionsFetchSuccess: function(collection) {
            this.collectionsLoaded = true;
            this.collectionsCollection.sort(this.sortSidebarList);
            if (this.favoritesLoaded === true) {
                this.mergeFavorites(collection);
                this.updateCollectionListWidget(collection);
                if (this.fetchCollectionsRetried > 0) {
                    this.getEventBus().publish('SlidingMenu:removeToast');
                }
            }
        },

        /**
         * Success callback for fetching saved searches. Will merge favorites with saved searches if the favorites are
         * loaded, then update the list widget with the merged collection.
         *
         * @method savedSearchesFetchSuccess
         * @param {mvp.Collection} collection
         */
        savedSearchesFetchSuccess: function(collection) {
            this.savedSearchesLoaded = true;
            this.savedSearchesCollection.sort(this.sortSidebarList);
            if (this.favoritesLoaded === true) {
                this.mergeFavorites(collection);
                this.updateSavedSearchListWidget(collection);
                if (this.fetchSavedSearchesRetried > 0) {
                    this.getEventBus().publish('SlidingMenu:removeToast');
                }
            }
        },

        /**
         * Sorts the sidebar list in order timeCreated. Newest created at top.
         *
         * @param model1
         * @param model2
         * @returns {number}
         */
        sortSidebarList: function(model1, model2) {
            var model1Time = model1.get('timeCreated') || model1.get('attributes').timeCreated;
            model1Time = parseInt(model1Time, 10);
            var model2Time = model2.get('timeCreated') || model2.get('attributes').timeCreated;
            model2Time = parseInt(model2Time, 10);
            if (model1Time < model2Time) {
                return 1;
            } else if (model1Time > model2Time) {
                return -1;
            } else {
                return 0;
            }
        },

        /*
         * Fetches the collections and/or saved searches depending on the type passed in. Always fetches the favorites.
         *
         * @method fetchListData
         * @param {String} type Defines which collection to fetch. Fetches both if undefined.
         */
        fetchListData: function(type) {
            this.favoritesLoaded = false;
            this.view.showFavoritesLoadingAnimation();
            this.fetchFavorites();
            if (type === 'collection' || type === undefined) {
                this.collectionsLoaded = false;
                this.view.showCollectionsLoadingAnimation();
                this.fetchCollections();
            }
            if (type === 'savedSearch' || type === undefined) {
                this.savedSearchesLoaded = false;
                this.view.showSavedSearchesLoadingAnimation();
                this.fetchSavedSearches();
            }
        },

        favoritesFetchError: function(xhr) {
            this.view.hideFavoritesLoadingAnimation();
            this.view.showPlaceholderText();
            this.view.showPlaceholderStar();
            this.showSidebarCollectionsErrorMessage(xhr);
            this.showSidebarSavedSearchesErrorMessage(xhr);
        },

        showSidebarCollectionsErrorMessage: function(xhr) {
            this.view.hideCollections();
            var errorMessage = httpHelper.getServerMessage(xhr.getStatus(), xhr.getResponseText());

            this.view.hideCollectionsLoadingAnimation();
            this.view.showCollectionsError();
            this.view.setCollectionsErrorMessage(errorMessage.userMessage.title);
            this.view.setCollectionsErrorParagraph(errorMessage.userMessage.body);
        },

        showSidebarSavedSearchesErrorMessage: function(xhr) {
            this.view.hideSavedSearches();
            var errorMessage = httpHelper.getServerMessage(xhr.getStatus(), xhr.getResponseText());

            this.view.hideSavedSearchesLoadingAnimation();
            this.view.showSavedSearchesError();
            this.view.setSavedSearchesErrorMessage(errorMessage.userMessage.title);
            this.view.setSavedSearchesErrorParagraph(errorMessage.userMessage.body);
        },

        retryFetch: function(type, xhr) {
            switch (type) {
            case 'Collections':
                if (this.fetchCollectionsRetried === 0) {
                    this.showRetryWarning();
                }
                if (this.RETRY_INTERVALS[this.fetchCollectionsRetried]) {
                    this.retryFetchTimeout(xhr, this.RETRY_INTERVALS[this.fetchCollectionsRetried], 'Collections');
                }
                break;
            case 'Saved Searches':
                if (this.fetchSavedSearchesRetried === 0) {
                    this.showRetryWarning();
                }
                if (this.RETRY_INTERVALS[this.fetchSavedSearchesRetried]) {
                    this.retryFetchTimeout(xhr, this.RETRY_INTERVALS[this.fetchSavedSearchesRetried], 'Saved Searches');
                }
                break;
            case 'Favorites':
                if (this.fetchFavoritesRetried === 0) {
                    this.showRetryWarning();
                }
                if (this.RETRY_INTERVALS[this.fetchFavoritesRetried]) {
                    this.retryFetchTimeout(xhr, this.RETRY_INTERVALS[this.fetchFavoritesRetried], 'Favorites');
                }
                break;
            default:
                break;
            }
        },

        retryFetchTimeout: function(xhr, duration, type) {
            switch (type) {
            case 'Collections':
                this.retryTimeout = setTimeout(function() {
                    this.fetchCollectionsRetried++;
                    this.fetchCollections();
                    if (duration === 10000) {
                        this.showSidebarCollectionsErrorMessage(xhr);
                        this.getEventBus().publish('SlidingMenu:removeToast');
                    }
                }.bind(this), duration);
                break;
            case 'Saved Searches':
                this.retryTimeout = setTimeout(function() {
                    this.fetchSavedSearchesRetried++;
                    this.fetchSavedSearches();
                    if (duration === 10000) {
                        this.showSidebarSavedSearchesErrorMessage(xhr);
                        this.getEventBus().publish('SlidingMenu:removeToast');
                    }
                }.bind(this), duration);
                break;
            case 'Favorites':
                this.retryTimeout = setTimeout(function() {
                    this.fetchFavoritesRetried++;
                    this.fetchFavorites();
                    if (duration === 10000) {
                        this.favoritesFetchError(xhr);
                        this.getEventBus().publish('SlidingMenu:removeToast');
                    }
                }.bind(this), duration);
                break;
            default:
                break;
            }
        },

        showRetryWarning: function() {
            this.getEventBus().publish('SlidingMenu:showToast', {
                label: strings.get('retryingToast'),
                color: 'yellow',
                icon: 'warning',
                autoDismiss: false,
                showAsToast: true,
                showCloseButton: false
            });
        },

        stopRetryTimeout: function() {
            clearTimeout(this.retryTimeout);
        },

        fetchCollections: function() {
            ObjectConfigurationApi.fetchCollectionsV4({
                data: {
                    onlyObjectCollections: true
                },
                success: function (data) {
                    this.collectionsCollection.setModels(this.collectionsCollection.parse({
                        collections: data
                    }));
                    this.collectionsFetchSuccess(this.collectionsCollection);
                }.bind(this),
                error: this.fetchCollectionsFallback.bind(this)
            });
        },

        fetchCollectionsFallback: function() {
            var v2_url = '/object-configuration/collections/v2';
            var fetchUsingUrl = function(url) {
                this.collectionsCollection.fetch({
                    url: url,
                    success: this.collectionsFetchSuccess.bind(this),
                    error: function(collection, xhr) {
                        try {
                            if (url===v2_url && this.isLoadCollectionV2EndPointAbsent(xhr)) { //fallback to v1
                                fetchUsingUrl('/object-configuration/v1/collections');
                            } else {
                                JSON.parse(xhr.getResponseText());
                                this.showSidebarCollectionsErrorMessage(xhr);
                            }
                        } catch (e) {
                            if (xhr.getStatus() === 404) {
                                // If transient
                                this.retryFetch('Collections', xhr);
                            } else {
                                // If faulted
                                this.showSidebarCollectionsErrorMessage(xhr);
                            }
                        }
                    }.bind(this),
                    reset: true
                });
            }.bind(this);
            fetchUsingUrl(v2_url);
        },

        /**
         * This method evaluates if the load collection v2 endpoint does not exist.
         *
         * @param xhr
         */
        isLoadCollectionV2EndPointAbsent: function(xhr) {
            var text = xhr.getResponseText();
            if (text.indexOf('RESTEASY001185') > -1) {
                return true; // Clear proof of non-existence
            } else {
                try {
                    var errorBody = JSON.parse(text);
                    return (xhr.getStatus() === 400) && errorBody.internalErrorCode === 10032; // Proof of partial existence
                } catch (e) {
                    return false;
                }
            }
        },

        fetchSavedSearches: function() {
            this.savedSearchesCollection.fetch({
                url: '/topologyCollections/savedSearches',
                success: this.savedSearchesFetchSuccess.bind(this),
                error: function(collection, xhr) {
                    try {
                        JSON.parse(xhr.getResponseText());
                        this.showSidebarSavedSearchesErrorMessage(xhr);
                    } catch (e) {
                        if (xhr.getStatus() === 404) {
                            // If transient
                            this.retryFetch('Saved Searches', xhr);
                        } else {
                            // If faulted
                            this.showSidebarSavedSearchesErrorMessage(xhr);
                        }
                    }
                }.bind(this),
                reset: true
            });
        },

        fetchFavorites: function() {
            this.favoritesCollection.fetch({
                url: '/rest/ui/settings/networkexplorer/favorites',
                success: this.favoritesFetchSuccess.bind(this),
                error: function(collection, xhr) {
                    try {
                        JSON.parse(xhr.getResponseText());
                        this.favoritesFetchError(xhr);
                    } catch (e) {
                        if (xhr.getStatus() === 404) {
                            // If transient
                            this.retryFetch('Favorites', xhr);
                        } else {
                            // If faulted
                            this.favoritesFetchError(xhr);
                        }
                    }
                }.bind(this),
                reset: true
            });
        },

        /**
         * Updates view links in collectionListWidget and savedSearchListWidget based on goto parameters, and resets the regions.
         *
         * @method updateViewLinks
         * @param {Object} urlParams
         */
        updateViewLinks: function(urlParams) {
            var urlParamsString;
            var collectionsViewAllUrl = '#networkexplorer/collections/my';
            var savedSearchesViewAllUrl = '#networkexplorer/savedsearches/my';

            if (urlParams.goto) {
                urlParamsString = '?goto=' + encodeURIComponent(urlParams.goto) + '&returnType=' +  urlParams.returnType;
                collectionsViewAllUrl += urlParamsString;
                savedSearchesViewAllUrl += urlParamsString;
            }
            if (this.collectionListWidget) {
                this.collectionListWidget.destroy();
            }
            if (this.savedSearchListWidget) {
                this.savedSearchListWidget.destroy();
            }

            this.collectionListWidget = new LimitedList({
                limit: 5,
                viewAllUrl: collectionsViewAllUrl,
                favoritesEnabled: true,
                appId: 'networkexplorer',
                favoritesCollection: this.favoritesCollection
            });
            this.collectionListWidget.setClickHandler(this.setLocation, this);
            this.collectionListWidget.attachTo(this.view.getCollections());

            this.savedSearchListWidget = new LimitedList({
                limit: 5,
                viewAllUrl: savedSearchesViewAllUrl,
                favoritesEnabled: true,
                appId: 'networkexplorer',
                favoritesCollection: this.favoritesCollection
            });
            this.savedSearchListWidget.setClickHandler(this.setLocation, this);
            this.savedSearchListWidget.attachTo(this.view.getSavedSearches());
            this.updateCollectionListWidget(this.collectionsCollection);
            this.updateSavedSearchListWidget(this.savedSearchesCollection);
        }
    });
});
