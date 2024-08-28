define([
    'jscore/core',
    'template!./SlidingMenu.html',
    'styles!./SlidingMenu.less',
    'i18n!networkexplorer/SlidingMenu.json'
], function(core, template, style, strings) {

    return core.View.extend({

        getTemplate: function() {
            return template({
                strings: strings
            });
        },

        getStyle: function() {
            return style;
        },

        getCollections: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-collectionList-collections');
        },

        getSavedSearches: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-savedSearchesList-savedSearches');
        },

        getCollectionsErrorMessage: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-collectionList-errorMessage');
        },

        getCollectionsErrorMessageHeader: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-collectionList-errorMessageHeader');
        },

        getCollectionsErrorParagraph: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-collectionList-errorMessageParagraph');
        },

        setCollectionsErrorMessage: function(text) {
            this.getCollectionsErrorMessageHeader().setText(text);
        },

        setCollectionsErrorParagraph: function(text) {
            this.getCollectionsErrorParagraph().setText(text);
        },

        getSavedSearchesErrorMessage: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-savedSearchesList-errorMessage');
        },

        getSavedSearchesErrorMessageHeader: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-savedSearchesList-errorMessageHeader');
        },

        getSavedSearchesErrorParagraph: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-savedSearchesList-errorMessageParagraph');
        },

        setSavedSearchesErrorMessage: function(text) {
            this.getSavedSearchesErrorMessageHeader().setText(text);
        },

        setSavedSearchesErrorParagraph: function(text) {
            this.getSavedSearchesErrorParagraph().setText(text);
        },

        getPlaceholderStar: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-favoritesLists-starIcon');
        },

        getPlaceholderText: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-favoritesLists-placeholderText');
        },

        getCollectionsLoadingAnimation: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-collectionList-loadingAnimation');
        },

        getSavedSearchesLoadingAnimation: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-savedSearchesList-loadingAnimation');
        },

        getFavoritesLoadingAnimation: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-favoritesLists-loadingAnimation');
        },

        getFavoriteCollections: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-favoritesLists-collections');
        },

        getFavoriteSavedSearches: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-favoritesLists-savedSearches');
        },

        getFavoriteCollectionsList: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-favoritesLists-collectionsList');
        },

        getFavoriteSavedSearchesList: function() {
            return this.getElement().find('.eaNetworkExplorer-rSlidingMenu-favoritesLists-savedSearchesList');
        },

        showCollections: function() {
            this.getCollections().removeModifier('hidden');
        },

        hideCollections: function() {
            this.getCollections().setModifier('hidden');
        },

        showCollectionsError: function() {
            this.getCollectionsErrorMessage().removeModifier('hidden');
        },

        hideCollectionsError: function() {
            this.getCollectionsErrorMessage().setModifier('hidden');
        },

        showSavedSearches: function() {
            this.getSavedSearches().removeModifier('hidden');
        },

        hideSavedSearches: function() {
            this.getSavedSearches().setModifier('hidden');
        },

        showSavedSearchesError: function() {
            this.getSavedSearchesErrorMessage().removeModifier('hidden');
        },

        hideSavedSearchesError: function() {
            this.getSavedSearchesErrorMessage().setModifier('hidden');
        },

        showPlaceholderStar: function() {
            this.getPlaceholderStar().removeModifier('hidden');
        },

        hidePlaceholderStar: function() {
            this.getPlaceholderStar().setModifier('hidden');
        },

        showPlaceholderText: function() {
            this.getPlaceholderText().removeModifier('hidden');
        },

        hidePlaceholderText: function() {
            this.getPlaceholderText().setModifier('hidden');
        },

        showCollectionsLoadingAnimation: function() {
            this.getCollectionsLoadingAnimation().removeModifier('hidden');
        },

        hideCollectionsLoadingAnimation: function() {
            this.getCollectionsLoadingAnimation().setModifier('hidden');
        },

        showSavedSearchesLoadingAnimation: function() {
            this.getSavedSearchesLoadingAnimation().removeModifier('hidden');
        },

        hideSavedSearchesLoadingAnimation: function() {
            this.getSavedSearchesLoadingAnimation().setModifier('hidden');
        },

        showFavoritesLoadingAnimation: function() {
            this.getFavoritesLoadingAnimation().removeModifier('hidden');
        },

        hideFavoritesLoadingAnimation: function() {
            this.getFavoritesLoadingAnimation().setModifier('hidden');
        },

        showFavoriteCollections: function() {
            this.getFavoriteCollections().removeModifier('hidden');
        },

        hideFavoriteCollections: function() {
            this.getFavoriteCollections().setModifier('hidden');
        },

        showFavoriteSavedSearches: function() {
            this.getFavoriteSavedSearches().removeModifier('hidden');
        },

        hideFavoriteSavedSearches: function() {
            this.getFavoriteSavedSearches().setModifier('hidden');
        }
    });

});
