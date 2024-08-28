/**
 * @class LimitedList
 * @extends WidgetCore
 *
 * Overview: renders list based on data from mvp collection
 * Optional: limits number of items displayed.
 *
 */


define([
    'jscore/core',
    './LimitedListView',
    '../limitedListItem/LimitedListItem'
], function(core, View, LimitedListItem) {
    return core.Widget.extend({

        View: this.view,

        /**
         * Lifecycle method
         */
        init: function(options) {
            this.options = options || {};

            this.items = this.options.items;
            this.title = this.options.title;
            this.limit = this.options.limit;
            this.viewAllUrl = this.options.viewAllUrl;
            // showViewAllButton will be true unless option specify otherwise.
            this.showViewAllButton = (this.options.showViewAllButton !== false);
            this.listItems = [];
        },

        /**
         * Lifecycle method
         */
        view: function() {
            return new View({
                title: this.title,
                viewAllUrl: this.viewAllUrl,
                showViewAllButton: this.showViewAllButton
            });
        },

        /**
         * Lifecycle method
         */
        onViewReady: function() {
            if (this.items) {
                this.setItems(this.items);
            }
        },

        /**
         * Set handler for click event
         *
         * @param {Function} handler
         * @param {Object} context
         */
        setClickHandler: function(handler, context) {
            context = context || this;
            this.clickHandler = handler.bind(context);
        },

        /**
         * Call click handler with param
         *
         * @param {String} href Param for click handler
         */
        callClickHandler: function(href) {
            if (this.clickHandler) {
                this.clickHandler(href);
            }
        },

        /**
         * This removes all existing list element and creates new ones from the LimitedListItem template.
         * We use this instead of doing it in the base template as we need to be able to update the items on demand.
         * We don't create another widget for it because it is basic and has very little logic. A widget would be too
         * much overhead.
         *
         * @param {Array{Object}} items Array of LimitedListItems
         */
        setItems: function(items) {
            this.items = items;
            this.listItems.forEach(function(listItem) {
                listItem.destroy();
            });
            this.listItems = [];
            for (var i = 0; i < items.length && (this.limit === undefined || i < this.limit); i++) {
                var limitedListItem = new LimitedListItem({
                    name: items[i].name.replace(/\&/g, '&amp;'), // replace & with &amp; to ensure HTML entities show correctly.
                    favorite: items[i].favorite,
                    favoriteId: items[i].favoriteId,
                    url: items[i].url,
                    clickHandler: this.callClickHandler.bind(this),
                    appId: this.options.appId,
                    favoritesCollection: this.options.favoritesCollection,
                    duplicate: items[i].duplicate,
                    category: items[i].category
                });
                limitedListItem.attachTo(this.view.getTopList());
                this.listItems.push(limitedListItem);
            }
            if (this.title) {
                this.hideLoadingAnimation();
            }
        },

        /**
         * To expose the view.showLoadingAnimation method to the parent of the widget
         */
        showLoadingAnimation: function() {
            this.view.showLoadingAnimation();
        },

        /**
         * To expose the view.showLoadingAnimation method to the parent of the widget
         */
        hideLoadingAnimation: function() {
            this.view.hideLoadingAnimation();
        }
    });
});



