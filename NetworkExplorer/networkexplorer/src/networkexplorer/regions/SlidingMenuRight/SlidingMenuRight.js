define([
    'jscore/core',
    './SlidingMenuRightView',
    'i18n!networkexplorer/SlidingMenuRight.json',
    'widgets/InlineMessage',
    'networkobjectlib/AttributesRegion'
], function(core, View, strings,InlineMessage, AttributesRegion) {

    return core.Region.extend({

        view: function() {
            return new View();
        },

        init: function(options) {
            this.options = options || {};
            this.attributesRegion = new AttributesRegion({context: this.getContext()});
        },

        /**
         * Lifecycle method.
         */
        onStart: function() {

            this.attributesRegion.start(this.view.getAttributesRegionHolder());

            this.getEventBus().subscribe('attributesRegion:load', this.showLoaderForNewLoadEvent, this);
            this.getEventBus().subscribe('attributesRegion:fetch:persistent:success', this.showAttributesRegion, this);
            this.getEventBus().subscribe('attributesRegion:clear', this.showAttributesRegion, this);
            this.getEventBus().subscribe('attributesRegion:fetch:persistent:error', this.showInlineErrorMessage, this);
            this.getEventBus().subscribe('attributesRegion:save:success', this.showAttributesSavedToast, this);

            this.showAttributesRegion();
        },

        /**
         * Display inline error message when a deleted object has been encountered in attributes region.
         */
        showInlineErrorMessage: function(error) {
            if (this.errorWidget) {
                this.errorWidget.destroy();
            }

            switch (error.code) {
            case 1000:
                this.errorWidget = this.createInlineError(strings.get('objectDeletedTitle'), strings.get('objectDeletedBody'));
                break;
            case 10015:
                this.errorWidget = this.createInlineError(strings.get('accessDeniedTitle'), strings.get('accessDeniedBody'), 'error');
                break;
            case 10023:
                this.errorWidget = this.createInlineError(strings.get('accessDeniedTitle'), strings.get('accessDeniedBodyTBAC'), 'error');
                break;
            default:
                this.errorWidget = this.createInlineError(strings.get('unknownServerErrorTitle'), strings.get('unknownServerErrorBody'), 'error');
                break;
            }

            this.errorWidget.attachTo(this.view.getErrorMessageArea());

            this.view.showErrorMessage();
            this.view.hideAttributesRegion();
            this.view.hideLoader();
        },

        createInlineError: function(header, description, icon) {
            return  new InlineMessage({
                header: header,
                description: description,
                icon: icon
            });
        },

        /**
         * Show the Attributes Region common component.
         */
        showAttributesRegion: function() {
            this.view.hideErrorMessage();
            this.view.showAttributesRegion();
            this.view.hideLoader();
        },

        /**
         * Show loader if poId has changed in latest load event.
         */
        showLoaderForNewLoadEvent: function(poId) {
            if (!this.lastPoId || this.lastPoId !== poId) {
                this.lastPoId = poId;
                this.view.showLoader();
            }
        },

        /**
         * Show toast message when attributes have been successfully saved.
         */
        showAttributesSavedToast: function() {
            this.getEventBus().publish('SlidingMenuRight:showAttributesSavedToast', {
                color: 'green',
                icon: 'ebIcon ebIcon_tick',
                label: strings.get('attributeChangesSaved'),
                content: 'success',
                showCloseButton: true,
                showAsToast: true,
                autoDismiss: true,
                autoDismissDuration: 2000
            });
        }

    });

});
