define([
    'jscore/core',
    './ConflictingTableView',
    'tablelib/Table',
    'tablelib/plugins/SmartTooltips',
    'tablelib/plugins/QuickFilter',
    'tablelib/plugins/StickyHeader',
    'tablelib/plugins/SortableHeader'

], function(core, View, Table, SmartTooltips, QuickFilter, StickyHeader, SortableHeader) {
    'use strict';
    return core.Widget.extend({

        view: function() {
            return new View(this.options);
        },

        init: function(options) {
            this.options = {ids: sortData(options.ids, 'node', 'asc')};
            this.ids = options.ids;
        },

        onViewReady: function() {
            this.cellsTable = new Table({
                columns: [
                    {
                        title: 'Node Name',
                        attribute: 'node',
                        width: '50%',
                        resizable: true,
                        filter: {
                            type: 'text',
                            options: {
                                submitOn: 'input',
                                submitDelay: 250,
                                placeholder: '  Type to filter'
                            }
                        },
                        sortable: true
                    },
                    {
                        title: 'Current Collection',
                        attribute: 'location',
                        width: '50%',
                        resizable: true,
                        filter: {
                            type: 'text',
                            options: {
                                submitOn: 'input',
                                submitDelay: 250,
                                placeholder: '  Type to filter'
                            }
                        },
                        sortable: true
                    }
                ],

                plugins: [
                    new SortableHeader(),
                    new QuickFilter({visible: true}),
                    new StickyHeader({
                        topOffset: 0
                    })
                ]
            });

            this.cellsTable.addEventHandler('filter:change',this.tableFilter.bind(this.cellsTable,this.ids,this));

            this.cellsTable.addEventHandler('sort', function(mode, attribute) {
                this.cellsTable.setData(sortData(this.options.ids, attribute, mode));
            }.bind(this));

            this.cellsTable.setSortIcon('asc', 'node');

            for (var i = 0; i < this.options.ids.length; ++i) {
                this.cellsTable.addRow({
                    node: this.options.ids[i].node,
                    location: this.options.ids[i].location
                });
            }
            this.cellsTable.attachTo(this.view.getTablePlaceholder());
        },

        tableFilter: function(tableData,datas,filters) {
            var filterArr=Object.keys(filters).map(function(key) {
                var val = filters[key];

                return {
                    name: key,
                    value: val
                };
            });
            var data = filterData(filterArr, tableData);
            var filtersApplied = areFiltersApplied(filters);

            if (filtersApplied) {
                this.getElement().setModifier('filtered');
            }
            else {
                this.getElement().removeModifier('filtered');
            }
            this.setData(sortData(data, 'node', 'asc'));
        }

    });

    function sortData(data, attribute, mode) {
        return data.sort(function(a, b) {
            if (mode === 'asc') {
                if (a[attribute] > b[attribute]) {
                    return 1;
                } else {
                    return -1;
                }
            }
            if (a[attribute] < b[attribute]) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    function filterData(filterArr, data) {
        filterArr.forEach(function(filter) {
            var attr = filter.name,
                filterValue = filter.value;
            if (filterValue === undefined || filterValue === '') {
                return;
            }
            data = data.filter(function(item) {
                var value = item[attr];
                return value.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) !== -1;
            });
        });
        return data;
    }

    function areFiltersApplied(filters) {
        return Object.keys(filters).some(function(key) {
            if(key === 'node' || 'location' ) {
                return filters[key] !== '';
            }
        });
    }
});
