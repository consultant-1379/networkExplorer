define([
    'jscore/core',
    'template!./LimitedListItem.hbs',
    'styles!./LimitedListItem.less'
], function(core, template, styles) {
    return core.View.extend({

        getTemplate: function() {
            return template(this.options);
        },

        getStyle: function() {
            return styles;
        },

        getLink: function() {
            return this.getElement().find('.eaNetworkExplorer-wLimitedListItem-link');
        },

        getFavoriteIcon: function() {
            return this.getElement().find('.eaNetworkExplorer-wLimitedListItem-favoriteIcon');
        },

        getOffsetWidth: function() {
            return this.getLink().getNative().offsetWidth;
        },

        getScrollWidth: function() {
            return this.getLink().getNative().scrollWidth;
        },

        hideFavoriteIcon: function() {
            this.getFavoriteIcon().setModifier('hidden');
        },

        setFavoriteState: function(state) {
            if (state === true) {
                this.getFavoriteIcon().setModifier('favorited');
            } else {
                this.getFavoriteIcon().removeModifier('favorited');
            }
        },

        setTooltipText: function(text) {
            this.getElement().setAttribute('title', text);
        },

        addLinkClickHandler: function(callback, context) {
            var link = this.getLink();
            link.addEventHandler('click', function(e) {
                e.preventDefault();
                if (context) {
                    callback.call(context, link.getAttribute('href'));
                } else {
                    callback(link.getAttribute('href'));
                }
            });
        },

        addFavoriteIconClickHandler: function(callback, context) {
            this.getFavoriteIcon().addEventHandler('click', function(e) {
                e.preventDefault();
                if (context) {
                    callback.call(context);
                } else {
                    callback();
                }
            });
        }

    });

});
