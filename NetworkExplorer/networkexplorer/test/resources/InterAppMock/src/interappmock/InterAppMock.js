define([
    'jscore/core',
    './InterAppMockView',
    'i18n!interappmock/dictionary.json',
    'layouts/TopSection',
    './widgets/LinkList',
], function(core, View, Dictionary, TopSection, LinkList) {

    return core.App.extend({

        view: function() {
            return new View({i18n: Dictionary});
        },

        onStart: function() {
            this.topSection = new TopSection({
                context: this.getContext(),
                title: Dictionary.title,
                breadcrumb: this.options.breadcrumb
            });
            this.topSection.attachTo(this.getElement());

            this.linkList = new LinkList();
            this.topSection.setContent(this.linkList);
        },

        onResume: function() {

        },

        onPause: function() {

        },

        onBeforeLeave: function() {
            
        }
    });

});
