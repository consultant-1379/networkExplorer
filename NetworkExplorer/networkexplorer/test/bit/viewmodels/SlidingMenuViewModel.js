define([
    'test/resources/cssNamespaces',
    'test/bit/bitPromises'
], function(css, promises) {

    var TIMEOUT = 8000;

    var slidingMenuViewModel = {

        getViewAllLinks: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-wLimitedList-showMore', TIMEOUT);
        },

        waitForFavoritesListTextToAppear: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenu-favoritesLists-placeholderText', TIMEOUT);
        },

        waitForFavoritesListTextToDisappear: function() {
            return promises.waitForElementToDisappear('.eaNetworkExplorer-rSlidingMenu-favoritesLists-placeholderText', TIMEOUT);
        },

        waitForFavoritesLoadingToDisappear: function() {
            return promises.waitForElementToDisappear('.ebLoader-Dots_size_small', TIMEOUT);
        },

        waitForListItems: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-wLimitedListItem', TIMEOUT);
        },

        waitForCollectionListItems: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenu-collectionList .eaNetworkExplorer-wLimitedList-collectionList .eaNetworkExplorer-wLimitedListItem', TIMEOUT);
        },

        waitForSavedSearchListItems: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenu-savedSearchesList .eaNetworkExplorer-wLimitedList-collectionList .eaNetworkExplorer-wLimitedListItem', TIMEOUT);
        },

        waitForCollectionsSavedSearches: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-wLimitedListItem-link', TIMEOUT);
        },

        getCollectionsSavedSearches: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-wLimitedListItem-link', TIMEOUT);
        },

        waitForCollectionError: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenu-collectionList-errorMessage', TIMEOUT);
        },

        waitForSavedSearchError: function() {
            return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenu-savedSearchesList-errorMessage', TIMEOUT);
        },

        clickNthStaticCollection: function(n, done) {
            // entire list : eaNetworkExplorer-rSlidingMenu-collectionList should be ready here
            this.waitForElementsByClassName(css.wLimitedListItem.link.val, function(listItems) {
                var evt = document.createEvent('MouseEvents');
                evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                listItems[n].dispatchEvent(evt);
                if (done) {
                    done();
                }
            });
        },

        clickNthSavedSearch: function(i, done) {
            this.waitForElementsByClassName(css.expandableListItemWidget.link.val, function(listItems) {
                var evt = document.createEvent('MouseEvents');
                evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                listItems[i].dispatchEvent(evt);
                if (done) {
                    done();
                }
            }.bind(this));
        },

        waitForElementsByClassName: function(className, callback, parent, timeout) {
            var wait = timeout ? timeout : 1000;
            var parElement = parent ? parent : null;
            return promises.waitForElementVisible('.' + className, wait, parElement)
                .then(function(el) {
                    callback(el);
                    return Promise.resolve();
                }.bind(this));
        }
    };

    return slidingMenuViewModel;

});
