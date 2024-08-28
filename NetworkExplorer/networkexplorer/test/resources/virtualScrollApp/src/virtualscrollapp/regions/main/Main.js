define([
    'jscore/core',
    'container/api',
    'widgets/Dialog',
    'tablelib/Table',
    'tablelib/plugins/VirtualSelection',
    'tablelib/plugins/SortableHeader',
    'tablelib/plugins/VirtualScrolling',
    'tablelib/plugins/ResizableHeader',
    '../../classes/VirtualScrollingData',
    '../../classes/SelectionObject',
    '../../classes/ActionManager',
    '../../widgets/resultstable/ResultsTable',
    './MainView'
], function(
    core,
    Container,
    Dialog,
    Table,
    VirtualSelection,
    SortableHeader,
    VirtualScrolling,
    ResizableHeader,
    VirtualScrollingData,
    SelectionObject,
    ActionManager,
    ResultsTable,
    View
) {

    'use strict';

    return core.Region.extend({

        View: View,

        // Lifecycle

        init: function(options) {
            // debugger
        },

        onStart: function() {
            // iPad doesn't like this // var poidList = Array.apply(null, {length: 100000}).map(Function.call, String);
            var poidList = new Array(100000);
            for (var i=0;i<poidList.length;i++) {
                poidList[i] = i;
            }
            // poidList.sort(function() { return 0.5 - Math.random() }); // creates array of shuffled string numbers 0...N-1

            this.counters = {
                contextualAction: 0
            };

            this.actionManager = new ActionManager();

            var options = {
                virtualScrollingData: new VirtualScrollingData({id: 'poId', list: poidList, errorCallback: this.onVirtualScrollingDataError}),
                selectionObject: new SelectionObject({id: 'poId', list: poidList}),
                context: this.getContext(),
                columns: [
                    {title: 'MO Name', attribute: 'poId', sortable: true},
                    {title: 'MO Type', attribute: 'moType', sortable: true},
                    {title: 'neType', attribute: 'neType', sortable: true}
                ]
            };

            this.resultsTable = new ResultsTable(options);
            this.resultsTable.attachTo(this.view.getResultsTable());

            this.getEventBus().subscribe('resultstable:sortchanged', this.onSortChanged, this);
            this.getEventBus().subscribe('resultstable:selectionchanged', this.onSelectionChanged, this);
            this.getEventBus().subscribe('resultstable:showcontextualactions', this.showContextualActionsFor, this);
        },

        // Callbacks

        /**
         * When any error from getPosByPoids occurs, come here
         *
         * @param msg
         * @param xhr
         */
        onVirtualScrollingDataError: function(msg, xhr) {
            alert(msg);
            // Handle as before
        },


        // Events

        onSortChanged: function(sort) {
            console.log(sort.attribute, sort.direction);
        },

        onSelectionChanged: function(selectionObject) {
            this.view.setSelectionCount(selectionObject.getCount());
        },

        // Contextual Actions
        showContextualActionsFor: function(objects) {
            var showContextualActionInstance = ++this.counters.contextualAction;
            if (objects.length > 0) {
                console.log('Action library ->', 'createMetaObject', objects, 'getAvailableActions', 'showActions');
                this.actionManager.getActions(objects, function(actionsToShow) {
                    if (showContextualActionInstance === this.counters.contextualAction) {
                        this.getEventBus().publish('topsection:contextactions', actionsToShow);
                        this.getEventBus().publish('topsection:loader:hide');
                    }
                }.bind(this));
            } else {
                this.getEventBus().publish('topsection:leavecontext');
            }
        }

    });

});
