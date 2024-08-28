
define([
    'jscore/core',
    'jscore/ext/mvp',
    './MainView',
    '../InfoBar/InfoBar',
    '../Search/Search',
    '../../classes/ActionManager',
    'networkexplorerlib/regions/QueryBuilder',
    'networkexplorerlib/regions/Results'
], function(
    core,
    mvp,
    View,
    InfoBar,
    Search,
    ActionManager,
    QueryBuilder,
    Results
) {

    return core.Region.extend({

        View: View,

        /**
         * Lifecycle Method
         */
        onStart: function() {
            this.InfoBar = new InfoBar({
                context: this.getContext(),
                favoritesCollection: this.options.favoritesCollection
            });
            this.InfoBar.start(this.view.getContentPlaceholder());
            this.Search = new Search({context: this.getContext()});
            this.Search.start(this.view.getContentPlaceholder());
            this.QueryBuilder = new QueryBuilder({context: this.getContext()});
            this.QueryBuilder.start(this.view.getContentPlaceholder());
            this.Results = new Results({
                context: this.getContext(),
                showRightPanel: true,
                actionManagerConstructor: ActionManager
            });
            this.Results.start(this.view.getContentPlaceholder());
        }
    });

});
