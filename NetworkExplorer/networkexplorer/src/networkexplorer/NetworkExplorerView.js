define([
    'jscore/core',
    'text!./NetworkExplorer.html',
    'styles!./NetworkExplorer.less'
], function(core, template, style) {
    return core.View.extend({
		
        getTemplate: function() {
            return template;
        },
		
        getStyle: function() {
            return style;
        },

        getContent: function() {
            return this.getElement().find('.eaNetworkExplorer-content');
        },

        getSlidingMenuHolder: function() {
            return this.getElement().find('.eaNetworkExplorer-slidingMenuHolder');
        },

        getWebPushNotification: function() {
            return this.getElement().find('.eaNetworkExplorer-rWebPush-Notification');
        },

        getContentHolder: function() {
            return this.getElement().find('.eaNetworkExplorer-contentHolder');
        },

        closeSidebar: function() {
            this.getContentHolder().setModifier('positionWhenSlidingMenuClosed');
        },

        openSidebar: function() {
            this.getContentHolder().removeModifier('positionWhenSlidingMenuClosed');
        },

        getReturnButton: function() {
            return this.getElement().find('.eaNetworkExplorer-returnButton');
        },

        getCancelButton: function() {
            return this.getElement().find('.eaNetworkExplorer-cancelButton');
        },

        getLoadingAnimationHolder: function() {
            return this.getElement().find('.eaNetworkExplorer-loaderHolder');
        },

        showLoadingAnimation: function() {
            this.getLoadingAnimationHolder().removeModifier('hidden');
        },

        hideLoadingAnimation: function() {
            this.getLoadingAnimationHolder().setModifier('hidden');
        },

        shiftScrollbarAboveObjectActions: function() {
            this.getElement().setModifier('shiftedUp');
        },

        unshiftScrollbar: function() {
            this.getElement().removeModifier('shiftedUp');
        }
    });

});
