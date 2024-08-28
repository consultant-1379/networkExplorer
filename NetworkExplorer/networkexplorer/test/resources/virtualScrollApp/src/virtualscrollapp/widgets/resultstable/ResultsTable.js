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
    './ResultsTableView'
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
    View
) {
    'use strict';

    return core.Widget.extend({

        View: View,

        // Lifecycle,

        init: function(options) {

            this.virtualScrollingData = options.virtualScrollingData;
            this.selectionObject = options.selectionObject;
            this.columns = options.columns;
            this.context = options.context;

            this.counters = {
                getData: 0
            };

            this.table = new Table({
                plugins: [
                    new SortableHeader(),
                    new VirtualScrolling({
                        totalRows: this.virtualScrollingData.getIdCount(),
                        getData: this.getData.bind(this),
                        redrawMode: VirtualScrolling.RedrawMode.SOFT
                    }),
                    new VirtualSelection({
                        bind: true,
                        checkboxes: true,
                        multiselect: true, //VirtualSelection.MultiSelectMode.PRESERVE_SELECTION_ORDER,
                        selectableRows: true,
                        idAttribute: 'poId',
                        getIds: this.virtualScrollingData.getIds.bind(this.virtualScrollingData),
                        getAllIds: this.virtualScrollingData.getAllIds.bind(this.virtualScrollingData)
                    })
                ],
                columns: this.columns,
                tooltips: true
            });
            this.table.addEventHandler('check',this.onCheck, this);
            this.table.addEventHandler('idselectend', this.onIdSelectEnd, this);
            this.table.addEventHandler('sort', this.onSortChanged, this);
        },

        // Callbacks

        /**
         * When any error from getPosByPoids occurs, come here
         *
         * @method
         * @param msg
         * @param xhr
         */
        onVirtualScrollingDataError: function(msg, xhr) {
            alert(msg);
            // Handle as before
        },

        /**
         * VirtualScrolling callback
         * We catch it for a few reasons:
         * * so we can control the rate of getData calls
         * * so we can discard stale getData calls
         * * so we can have table actions
         *
         * @method
         * @param start
         * @param length
         * @param success
         */
        getData: function(start, length, success) {
            var getDataInstance = ++this.counters.getData;
            // If a previous getData is in progress, cancel it
            clearTimeout(this.getDataTimeoutId);
            // show the range we are about to load
            this.table.getVirtualScrollBar().setAnnotationText(start + ' - ' + (start + length));
            this.getDataTimeoutId = setTimeout(function() {
                console.log('getData(' +JSON.stringify(arguments)+ ')');
                this.virtualScrollingData.loadData(start, length)
                    .then(function(response) {
                        if (getDataInstance === this.counters.getData) {
                            // Check if a subsequent getData call was made
                            // Recalculate for "Column Highlighting"
                            // TODO
                            // Show data in table
                            success(response.data);
                        }
                        else {
                            console.log('Skipping getData, user has moved on');
                        }
                    }.bind(this))
                    .catch(function(error) {
                        // This should never happen
                        console.log(JSON.stringify(arguments));
                        this.onVirtualScrollingDataError('Unknown error');
                    }.bind(this));
            }.bind(this), 200);
        },

        // Table Event Handlers

        onSortChanged: function(direction, attribute) {
            this.context.eventBus.publish('resultstable:sortchanged', {
                direction: direction,
                attribute: attribute
            });
        },

        onCheck: function(row, checked) {
            if (checked) {
                this.selectionObject.add(row.getData());
            } else {
                this.selectionObject.remove(row.getData());
            }
            this.notifySelectionChange();
            this.showContextualActionsFor(this.selectionObject.getObjects());
            console.log('onCheck', this.selectionObject.getObjects().length, this.selectionObject.getObjects(), this.selectionObject.getLast());
        },

        onIdSelectEnd: function(ids) {
            this.context.eventBus.publish('topsection:loader:show');
            if (ids.length === 0) { // All unselected
                this.selectionObject.clear();
                this.notifySelectionChange();
                this.showContextualActionsFor(this.selectionObject.getObjects());
                console.log('onIdSelectEnd', this.selectionObject.getObjects().length, this.selectionObject.getObjects(), this.selectionObject.getLast());
            } else if (ids.length === 1) { // Single selection (row click or checkbox click)
                this.virtualScrollingData.loadDataList(ids).then(function(response) {
                    this.selectionObject.setObjects(response.data);
                    this.notifySelectionChange();
                    this.showContextualActionsFor(this.selectionObject.getObjects());
                    console.log('onIdSelectEnd', this.selectionObject.getObjects().length, this.selectionObject.getObjects(), this.selectionObject.getLast());
                }.bind(this));
            } else if (ids.length !== this.selectionObject.getCount()) { // Multi selection
                // var unFetchedIds = this.virtualScrollingData.filterAlreadyFetchedIds(ids);
                if (ids.length >= this.virtualScrollingData.getThreshold()) { // above threshold
                    alert('More than ' + this.virtualScrollingData.getThreshold() + ' objects are selected, so general actions only');
                    this.selectionObject.clear();
                    this.selectionObject.addIds(ids);
                    this.notifySelectionChange();
                    this.showContextualActionsFor(this.selectionObject.getObjects());
                    console.log('onIdSelectEnd', this.selectionObject.getObjects().length, this.selectionObject.getObjects(), this.selectionObject.getLast());
                } else { // under threshold
                    var dialogWidget,
                        uxTimeoutId = setTimeout(function() {
                            Container.getEventBus().publish('container:loader', {content: 'Calculating available actions for up to ' + ids.length + ' selected objects'});
                            uxTimeoutId = setTimeout(function() {
                                Container.getEventBus().publish('container:loader-hide');
                                dialogWidget = new Dialog({
                                    type: 'information',
                                    header: 'User Action Required',
                                    content: 'Downloading data for ' + ids.length + ' objects may take a long time. Do you wish to continue waiting?',
                                    buttons: [{
                                        caption: 'Continue',
                                        action: function() {
                                            console.log('Continuing...');
                                            if (dialogWidget.isVisible()) {
                                                dialogWidget.hide();
                                                Container.getEventBus().publish('container:loader', {content: 'Calculating available actions for up to ' + ids.length + ' selected objects'});
                                            }
                                        }
                                    }, {
                                        caption: 'Cancel',
                                        action: function() {
                                            this.virtualScrollingData.cancelFetch();
                                            //  Unblock screen
                                            dialogWidget.hide();
                                            Container.getEventBus().publish('container:loader-hide');
                                        }.bind(this)
                                    }]
                                });
                                dialogWidget.attachTo(this.getElement());
                                dialogWidget.show();
                            }.bind(this), 5000);
                        }.bind(this), 1000);
                    this.virtualScrollingData.loadDataList(ids).then(function(response) {
                        // If all data loaded is loaded before timeout, this will be cancelled
                        clearTimeout(uxTimeoutId);
                        // If the dialog is still on screen, dismiss it
                        if (dialogWidget && dialogWidget.isVisible()) {
                            dialogWidget.hide();
                        }
                        // Unblock screen
                        Container.getEventBus().publish('container:loader-hide');
                        var selectedObjects = response.data;
                        // If cancelled, the missing objects should be added to the selection as ids only.
                        if (response.cancelled) {
                            this.selectionObject.clear();
                            // Remove undefined objects
                            selectedObjects = selectedObjects.filter(function(object) {
                                return object;
                            });
                            var unFetchedIds = this.virtualScrollingData.filterAlreadyFetchedIds(ids);
                            // TODO Put in original user selection order? Would need to be recalculated
                            this.selectionObject.setObjects(selectedObjects);
                            this.selectionObject.addIds(unFetchedIds);
                        } else {
                            this.selectionObject.setObjects(selectedObjects);
                        }
                        this.notifySelectionChange();
                        this.showContextualActionsFor(this.selectionObject.getObjects());
                        console.log('onIdSelectEnd', this.selectionObject.getObjects().length, this.selectionObject.getObjects(), this.selectionObject.getLast());
                    }.bind(this));
                }
            }
        },

        notifySelectionChange: function() {
            this.context.eventBus.publish('resultstable:selectionchanged', this.selectionObject);
        },

        // Contextual Actions

        showContextualActionsFor: function(objects) {
            this.context.eventBus.publish('resultstable:showcontextualactions', objects);
        },

        // View handlers

        onViewReady: function() {
            this.table.attachTo(this.getElement());
            this.windowResizeEvtId = core.Window.addEventHandler('resize', this.setFullHeight.bind(this));
        },

        onDestroy: function() {
            core.Window.removeEventHandler(this.windowResizeEvtId);
        },

        setFullHeight: function() {
            var windowHeight = core.Window.getProperty('innerHeight'),
                element = this.getElement(),
                eltPosition = element.getPosition();
            element.setStyle({height: Math.max(200, (windowHeight - eltPosition.top)) + 'px'});
            if (this.table) {
                this.table.redraw();
            }
        }

    });

});
