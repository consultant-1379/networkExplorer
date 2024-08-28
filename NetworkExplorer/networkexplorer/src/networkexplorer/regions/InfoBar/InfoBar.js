define([
    'jscore/core',
    'jscore/ext/net',
    'jscore/ext/locationController',
    'widgets/Notification',
    './InfoBarView',
    'i18n!networkexplorer/app.json',
    '../../utils/UrlHelper'
], function(core, net, LocationController, Notification, View, strings, UrlHelper) {

    return core.Region.extend({

        View: View,

        /**
         * Lifecycle Method
         */
        onStart: function() {
            this.getEventBus().subscribe('Results:showInfo', this.setInfo, this);
            this.getEventBus().subscribe('Results:showInfoSavedSearch', this.setInfo, this);
            this.getEventBus().subscribe('NetworkExplorer:defaultHash', this.showDefaultInfo, this);
            this.getEventBus().subscribe('NetworkExplorer:appLoaded', this.showDefaultInfo, this);
            this.getEventBus().subscribe('Results:collectionFetchError', this.showDefaultInfo, this);
            this.view.addFavoriteIconClickHandler(this.toggleFavorite, this);
            /*
             * Listen for changes in the favorites collection so the InfoBar region can update its favorite state when
             * the favorite state of the collection/saved search is changed in the sidebar.
             */
            this.options.favoritesCollection.addEventHandler('add', this.updateFavoriteState, this);
            this.options.favoritesCollection.addEventHandler('change', this.updateFavoriteState, this);
            this.locationController = new LocationController();
            this.view.getCloseCollectionButton().addEventHandler('click',this.closeCollection, this);
        },

        /**
         * Callback for Results:showInfo{SavedSearch} event
         *
         * Uses:
         * - this.poId
         *
         * @param {Object} info { name: {String}, type: {String}, poId: {String} }
         */
        setInfo: function(info) {
            this.poId = info.poId;
            this.favoriteId = info.favorite;
            this.view.showInfoEl();
            this.view.hideDefaultHeader();
            var infoBarTitle = info && info.name ? info.name : strings.get('unsavedSearch');
            this.view.setInfoName(infoBarTitle);
            this.setTooltipIfOverflow(infoBarTitle);

            if (!info.type) {
                this.view.hideInfoTypeWrapper();
            } else {
                this.view.showInfoTypeWrapper();
                this.view.setInfoType(strings.get(info.type));
            }
            this.updateFavoriteStateNew();

            if (info.type === 'collection') {
                this.view.showCloseCollectionButton();
                this.view.showCloseCollectionSeperator();
            } else {
                this.view.hideCloseCollectionButton();
                this.view.hideCloseCollectionSeperator();
            }
        },

        /**
         * Display default information
         */
        showDefaultInfo: function() {
            this.view.hideInfoEl();
            this.view.showDefaultHeader();
            this.view.setInfoNameEl('');
        },

        /**
         * Toggles the favorite state of the collection/saved search. Persists the state via REST.
         *
         * Uses:
         * - this.poId
         * - this.favorite
         */
        toggleFavorite: function() {
            var newState = !this.favorite;
            net.ajax({
                url: '/rest/ui/settings/networkexplorer/favorites',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: this.poId,
                    value: newState ? newState + '' : '' // Setting to empty string removes the item from favorites.
                }),
                success: function() {
                    this.toggleFavoriteSuccess(newState);
                }.bind(this),
                error: function() {
                    var notification = new Notification({
                        label: strings.get('favoriteError'),
                        icon: 'error',
                        color: 'red',
                        showCloseButton: true,
                        autoDismiss: true
                    });
                    notification.attachTo(this.getElement());
                }
            });
        },

        /**
         * Success callback for the REST call in toggleFavorite. Changes the icon to the new state and updates the
         * favorites collection with the new data.
         *
         * Uses:
         * - this.poId
         * - this.favorite
         *
         * @param {Boolean} newState The state that the favorite icon should be set to.
         */
        toggleFavoriteSuccess: function(newState) {
            this.favorite = newState;
            this.view.setFavoriteState(newState);
            // Get the favorite model for this poId
            var favoriteModel = this.options.favoritesCollection.getModel(this.poId);
            // If the model already exists, just update the value attribute on it.
            if (favoriteModel) {
                favoriteModel.setAttribute('value', newState + '');
            }
            // If the model doesn't exist, we need to add a new model to the favorites collection for this poId.
            else {
                this.options.favoritesCollection.addModel({
                    id: this.poId,
                    value: newState + ''
                });
            }
        },
        /**
         * Close the current collection context
         * Keep any parameters that are not associated with an open context
         *
         * Uses:
         * - this.poId
         */
        closeCollection: function() {
            this.poId = undefined;
            this.setInfo({});
            var currentParams = UrlHelper.getUrlParams(this.locationController.getLocation());
            delete currentParams.page;
            delete currentParams.size;
            var uri = '#networkexplorer';
            var currentParamKeys = Object.keys(currentParams);
            if (currentParamKeys.length > 0) {
                uri += '?';
                currentParamKeys.forEach(function(key) {
                    uri += encodeURIComponent(key)+'='+encodeURIComponent(currentParams[key])+'&';
                });
                uri = uri.slice(0, -1); // chop the last &
            }
            this.locationController.setLocation(uri);
        },

        /**
         * Checks the favorites collection and then
         *
         * Uses:
         * - this.poId
         * - this.favorite
         */
        updateFavoriteState: function() {
            /*
            * Favorites only apply to items that have a poId. There would be no poId for a new search for example, but
            * there would for a saved search or collection.
            */
           if (this.poId) {
               this.view.showFavoriteIcon();
               // Get the favorite model for this poId
               var favoriteModel = this.options.favoritesCollection.getModel(this.poId);
               /*
                * If the model exists, and has a value of true, set favorite to true, otherwise false. !! converts
                * truthy/falsey to an explicit boolean.
                */
               this.favorite = (!!favoriteModel && favoriteModel.getAttribute('value') === 'true');
               // Update the icon with the new state
               this.view.setFavoriteState(this.favorite);
           }
           // If there is no poId, hide the favorite icon.
           else {
               this.view.hideFavoriteIcon();
             }
        },
        updateFavoriteStateNew: function(){
            this.view.showFavoriteIcon();
            for (var i in this.favoriteId) {
                if(this.favoriteId[i] === this.poId){
                    this.view.setFavoriteState(true);
                    break;
                }
                else {
                    this.view.setFavoriteState(false);
                }
            }
         },


        /**
         * Adds tooltip to list item if overflow on name occurs
         * @param infoBarTitle the full infoBar name of the item
         */
        setTooltipIfOverflow: function(infoBarTitle) {
            var titleTooltip = this.view.getInfoNameTooltip();
            var titleScrollWidth = this.view.getInfoNameScrollWidth();
            var titleOffsetWidth = this.view.getInfoNameOffsetWidth();
            if (titleTooltip) {
                this.view.removeInfoNameTooltipText();
            }
            if (titleScrollWidth > titleOffsetWidth) {
                this.view.setInfoNameTooltipText(infoBarTitle);
            }
        }
    });
});
