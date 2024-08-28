define([
    'jscore/core',
    'jscore/ext/net',
    'widgets/Notification',
    './LimitedListItemView',
    'i18n!networkexplorer/app.json'
], function(core, net, Notification, View, strings) {
    return core.Widget.extend({

        /**
         * Lifecycle method
         */
        view: function() {
            return new View(this.options);
        },

        /**
         * Lifecycle method
         */
        init: function() {
            /*
             * Listen for changes in the favorites collection so the LimitedListItem widget can update its favorite
             * state when the favorite state of the collection/saved search is changed in the InfoBar region.
             */
            this.options.favoritesCollection.addEventHandler('add', this.updateFavoriteState, this);
            this.options.favoritesCollection.addEventHandler('change', this.updateFavoriteState, this);
        },

        /**
         * Lifecycle method
         */
        onViewReady: function() {
            if (this.options.clickHandler) {
                this.view.addLinkClickHandler(this.options.clickHandler);
            }
            if (this.options.favoriteId) {
                this.view.addFavoriteIconClickHandler(this.toggleFavorite, this);
            } else {
                this.view.hideFavoriteIcon();
            }
        },

        onAttach: function() {
            this.setTooltipIfOverflow(this.options.name);
        },

        /**
         * Toggles the favorite state and persists it using REST.
         */
        toggleFavorite: function() {
            var newState = !this.options.favorite;
            net.ajax({
                url: '/rest/ui/settings/' + this.options.appId + '/favorites',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: this.options.favoriteId,
                    value: newState ? newState + '' : ''
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
         * @param {Boolean} newState The state that the favorite icon should be set to.
         */
        toggleFavoriteSuccess: function(newState) {
            this.options.favorite = newState;
            this.view.setFavoriteState(newState);
            var favoriteModel = this.options.favoritesCollection.getModel(this.options.favoriteId);
            if (favoriteModel) {
                favoriteModel.setAttribute('value', newState + '');
            } else {
                this.options.favoritesCollection.addModel({
                    id: this.options.favoriteId,
                    value: newState + ''
                });
            }
        },

        /**
         * Checks the favorites collection and then
         */
        updateFavoriteState: function() {
            // Favorites only apply to items that have a favoriteId
            if (this.options.favoriteId) {
                // Get the favorite model for this favoriteId
                var favoriteModel = this.options.favoritesCollection.getModel(this.options.favoriteId);
                /*
                 * If the model exists, and has a value of true, set favorite to true, otherwise false. !! converts
                 * truthy/falsey to an explicit boolean.
                 */
                this.options.favorite = (!!favoriteModel && favoriteModel.getAttribute('value') === 'true');
                // Update the icon with the new state
                this.view.setFavoriteState(this.options.favorite);
            }
        },

        /**
         * Adds tooltip to list item if overflow on name occurs
         *
         * @param {String} itemName the full name of the item
         */
        setTooltipIfOverflow: function(itemName) {
            var scrollWidth = this.view.getScrollWidth();
            var offsetWidth = this.view.getOffsetWidth();
            if (scrollWidth > offsetWidth) {
                this.view.setTooltipText(itemName);
            }
        }
    });
});
