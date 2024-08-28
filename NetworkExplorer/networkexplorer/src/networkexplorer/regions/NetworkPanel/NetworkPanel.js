define([
    'jscore/core',
    'container/api',
    './NetworkPanelView',
    'scopingpanel/ScopingPanel',
    'widgets/Button',
    'i18n!networkexplorer/NetworkPanel.json',
], function(core, container, View, ScopingPanel, Button, strings) {
    'use strict';

    return core.Widget.extend({

        View: View,

        init: function(options) {
            this.options = options;
            this.eBus = options.context.eventBus;
        },

        onViewReady: function() {
            this.initContent();
            this.scopingPanel.start(this.view.getScopingPanel());
        },

        initContent: function() {
            this.scopingPanel = new ScopingPanel({
                context: this.options.context,
                applyRecursively : true,
                tabs: [
                    ScopingPanel.tabs.TOPOLOGY,
                    ScopingPanel.tabs.COLLECTIONS,
                    ScopingPanel.tabs.SAVED_SEARCHES
                ],
                tabsOptions: {
                    topology: {
                        showCustomTopology: {
                            excludeTopologies: [],
                            enableAllLevelSelection: true
                        },
                        selection: {
                            collectionOfCollections: 'single',
                            collectionOfObjects: 'single',
                            networkObjects: 'single',
                        }
                    }
                }
            });
        }

    });

});
