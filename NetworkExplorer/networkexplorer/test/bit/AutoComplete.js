define([
    'test/bit/bitPromises',
    'jscore/core',
    'networkexplorer/regions/Search/Search',
    'test/resources/Grammar_scenario1',
    'test/bit/viewmodels/SearchViewModel'
], function(promises, core, SearchRegion, Grammar_scenario1, SearchViewModel) {

    var TIMEOUT = 15000;

    function checkListItems(listItems, expectedSuggestions) {
        return new Promise(function(resolve, reject) {
            var id;
            try {
                id = setInterval(function() {
                    if (listItems.length === expectedSuggestions.length) {
                        for (var i = 0; i < expectedSuggestions.length; i++) {
                            expect(listItems[i].textContent.trim()).to.equal(expectedSuggestions[i]);
                        }
                        clearInterval(id);
                        resolve();
                    }
                }, 10);
            } catch (e) {
                clearInterval(id);
                reject(e);
            }
        });
    }

    describe('AutoComplete', function() {
        this.timeout(TIMEOUT);

        var currentApp, AppWithSearch, server, _sandbox;

        beforeEach(function(done) {

            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            server = _sandbox.server;
            Grammar_scenario1.applyScenario(server);

            // Create a generic app with View and root DOM element.
            AppWithSearch = core.App.extend({

                View: core.View.extend({
                    getTemplate: function() {
                        return '<div></div>';
                    }
                }),

                // Place Search Region into a generic app.
                onStart: function() {
                    this.search = new SearchRegion({context: this.getContext()});
                    this.search.start(this.getElement());
                }
            });
            currentApp = new AppWithSearch();
            // start application.
            currentApp.start(document.getElementById('bitContainer'));
            done();
        });

        afterEach(function() {
            window.location.hash = '';
            currentApp.stop();
            _sandbox.restore();
        });

        describe('Execute: Input text', function() {
            var tests = [{
                input: 'se',
                suggestions: [
                    'select',
                    'search'
                ]
            }, {
                input: 'select ',
                suggestions: [
                    '<Object Type(s)>',
                    'all objects of type',
                    'collection',
                    'object',
                    'search',
                    'type'
                ]
            }, {
                input: 'select all obj',
                suggestions: [
                    'all objects of type'
                ]
            }, {
                input: 'select MeContext ',
                suggestions: [
                    '<Attribute Name>',
                    'from',
                    'name',
                    'where',
                    'with',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext, ',
                suggestions: [
                    '<Object Type(s)>'
                ]
            }, {
                input: 'select ericsson:./$$MeContext:./, ',
                suggestions: [
                    '<Object Type(s)>'
                ]
            }, {
                input: 'select MeContext where ',
                suggestions: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'object'
                ]
            },{
                input: 'select ericsson:./$$MeContext:./ where ',
                suggestions: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'object'
                ]
            }, {
                input: 'select ericsson:./$$MeContext:./, where object ',
                suggestions: [
                    '<Object Type(s)>',
                    'type'
                ]
            }, {
                input: 'select MeContext where object ',
                suggestions: [
                    '<Object Type(s)>',
                    'type'
                ]
            }, {
                input: 'select MeContext where neType ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            }, {
                input: 'select MeContext where name ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            }, {
                input: 'select MeContext where object MeContext has attr neType ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            },  {
                input: 'select MeContext where object type MeContext has attr neType ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            }, {
                input: 'select MeContext where object MeContext ',
                suggestions: [
                    'has'
                ]
            }, {
                input: 'select MeContext where object type MeContext ',
                suggestions: [
                    'has'
                ]
            }, {
                input: 'select MeContext where object MeContext has ',
                suggestions: [
                    'attr',
                    'child',
                    'parent'
                ]
            }, {
                input: 'select MeContext where object MeContext has attr neType ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            }, {
                input: 'select MeContext where object MeContext has attr erricsson$$neType:/ ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            }, {
                input: 'select MeContext where object MeContext has attr neType = ERBS ',
                suggestions: [
                    'and',
                    'or',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext where object MeContext has attr name = Test* ',
                suggestions: [
                    'and',
                    'or',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext where object MeContext has attr name = *Test ',
                suggestions: [
                    'and',
                    'or',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext where object MeContext has attr name = *Test* ',
                suggestions: [
                    'and',
                    'or',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext where object MeContext has attr name = Test1%%Test2 ',
                suggestions: [
                    'and',
                    'or',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext where object MeContext has attr name = Test1%%Test2%%Test3 ',
                suggestions: [
                    'and',
                    'or',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'all objects of type networkelement from node type ERBS where name = test_node ',
                suggestions: [
                    'and',
                    'or',
                    'ignoring case',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext where object MeContext has attr neType = ERBS and ',
                suggestions: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'object',
                    'attr'
                ]
            }, {
                input: 'select MeContext where object MeContext has parent ',
                suggestions: [
                    '<Object Type>'
                ]
            }, {
                input: 'select MeContext where object MeContext has child ',
                suggestions: [
                    '<Object Type>'
                ]
            }, {
                input: 'select MeContext where object type ',
                suggestions: [
                    '<Object Type>'
                ]
            }, {
                input: 'select MeContext where MeContext has attr MeContextId and object type ',
                suggestions: [
                    '<Object Type>'
                ]
            }, {
                input: 'select MeContext where MeContext has attr MeContextId or object type ',
                suggestions: [
                    '<Object Type>'
                ]
            }, {
                input: 'select MeContext where object MeContext has child ericsson:./$$MeContext:./ and ',
                suggestions: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'object'
                ]
            }, {
                input: 'select MeContext where object MeContext has child EUtranCelFFD and ',
                suggestions: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'object'
                ]
            }, {
                input: 'select MeContext from ',
                suggestions: [
                    'collection',
                    'node',
                    'search'
                ]
            }, {
                input: 'select MeContext using ',
                suggestions: [
                    'collection'
                ]
            }, {
                input: 'select MeContext from node ',
                suggestions: [
                    '<Node Name>',
                    'type'
                ]
            }, {
                input: 'select MeContext from node type ',
                suggestions: [
                    '<Node Type>'
                ]
            }, {
                input: 'select MeContext from collection ',
                suggestions: [
                    '<Collection Name>'
                ]
            }, {
                input: 'select MeContext from collection Coll1, ',
                suggestions: [
                    'collection'
                ]
            }, {
                input: 'select MeContext from collection Coll1, collection ',
                suggestions: [
                    '<Collection Name>'
                ]
            }, {
                input: 'select MeContext using collection ',
                suggestions: [
                    '<Collection Name>'
                ]
            }, {
                input: 'select MeContext using collection Coll1 ',
                suggestions: [
                    'where',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'all nodes using collection Coll1 ',
                suggestions: [
                    'where'
                ]
            }, {
                input: 'select MeContext from collection where object MeContext has ',
                suggestions: [
                    'attr',
                    'child',
                    'parent'
                ]
            },
            {
                input: 'select MeContext with ',
                suggestions: [
                    '<Attribute Name(s)>',
                    '<Object Type(s)>',
                    '<Struct>[<Member>]',
                    'all attr',
                    'attr'
                ]
            }, {
                input: 'select MeContext with all attr ',
                suggestions: [
                    '<Attribute Name>',
                    'from',
                    'name',
                    'where',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext with attr ericsson$$neType ',
                suggestions: [
                    '<Attribute Name>',
                    'from',
                    'name',
                    'where',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext with attr neType ',
                suggestions: [
                    '<Attribute Name>',
                    'from',
                    'name',
                    'where',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext with neType ',
                suggestions: [
                    '<Attribute Name>',
                    'from',
                    'name',
                    'where',
                    'using'
                ]
            }, {
                input: 'select all objects of type NetworkElement ',
                suggestions: [
                    '<Attribute Name>',
                    'from',
                    'name',
                    'where',
                    'with',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType contains ',
                suggestions: [
                    '<Attribute Value>',
                    'any of',
                    'all of'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType containing ',
                suggestions: [
                    '<Attribute Value>',
                    'any of',
                    'all of'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType contains any of ',
                suggestions: [
                    '<Attribute Values>'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType contains all of ',
                suggestions: [
                    '<Attribute Values>'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType containing any of ',
                suggestions: [
                    '<Attribute Values>'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType containing all of ',
                suggestions: [
                    '<Attribute Values>'
                ]
            },  {
                input: 'MeContext where neType ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            },  {
                input: 'select MeContext where neType ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            },  {
                input: 'object mecontext where neType ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            },  {
                input: 'all nodes where name ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            },  {
                input: 'NetworkElement from collection coll-name ',
                suggestions: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'where',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            },  {
                input: 'mecontext netype contains ',
                suggestions: [
                   '<Attribute Value>',
                   'any of',
                   'all of'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType contains ',
                suggestions: [
                    '<Attribute Value>',
                    'any of',
                    'all of'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType containing ',
                suggestions: [
                    '<Attribute Value>',
                    'any of',
                    'all of'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType contains any of ',
                suggestions: [
                    '<Attribute Values>'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType contains all of ',
                suggestions: [
                    '<Attribute Values>'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType containing any of ',
                suggestions: [
                    '<Attribute Values>'
                ]
            },  {
                input: 'select MeContext where object MeContext has attr neType containing all of ',
                suggestions: [
                    '<Attribute Values>'
                ]
            },  {
                input: 'MeContext where neType ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            },  {
                input: 'select MeContext where neType ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            },  {
                input: 'object mecontext where neType ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            },  {
                input: 'all nodes where name ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing'
                ]
            },  {
                input: 'mecontext netype contains ',
                suggestions: [
                   '<Attribute Value>',
                   'any of',
                   'all of'
                ]
            }, {
                input: 'select all objects of type MeContext and ManagedElement ',
                suggestions: [
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select all objects of type MeContext with attr platformType ',
                suggestions: [
                    '<Attribute Name>',
                    'from',
                    'name',
                    'where',
                    'using',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select object type NetworkElement with all attr neType = ERBS ',
                suggestions: [
                    'and',
                    'or',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select object type NetworkElement with all attr neType = ERBS fil',
                suggestions: [
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select object type NetworkElement with all attr neType = ERBS filter by',
                suggestions: [
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select object type NetworkElement with all attr neType = ERBS filter by managementState = ',
                suggestions: [
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL'
                ]
            }, {
                input: 'select object type NetworkElement with all attr neType = ERBS filter by managementState = MAINT',
                suggestions: [
                    'filter by managementState = MAINTENANCE'
                ]
            }, {
                input: 'select object type NetworkElement with all attr neType = ERBS filter by managementState = NOR',
                suggestions: [
                    'filter by managementState = NORMAL'
                ]
            }, {
                input: 'select object type NetworkElement with all attr neType = ERBS filter by managementState = NORMAL ',
                suggestions: [
                    'ignoring case',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select all nodes of type RadioNode filter by managementState = MAINTENANCE filter by radioAccessTechnology contains ',
                suggestions: [
                    '<Attribute Value>',
                    'any of',
                    'all of'
                ]
            }, {
                input: 'select all nodes of type RadioNode filter by managementState = MAINTENANCE filter by radioAccessTechnology contains any of ',
                suggestions: [
                    '<Attribute Values>'
                ]
            }, {
                input: 'select MeContext with attr neType = ERBS and platformType = CPP ',
                suggestions: [
                    'and',
                    'or',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select MeContext with attr neType = ERBS or platformType = CPP ',
                suggestions: [
                    'and',
                    'or',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'all nodes ',
                suggestions: [
                    '<Attribute Name>',
                    'from',
                    'name',
                    'where',
                    'with',
                    '=',
                    '!=',
                    '<=',
                    '>=',
                    'equal to',
                    'not equal to',
                    'less than or equal to',
                    'greater than or equal to',
                    'contains',
                    'containing',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select all nodes of type ERBS ',
                suggestions: [
                    'ignoring case',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select all nodes from node type ERBS ',
                suggestions: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'where',
                    'ignoring case',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select all nodes from node LTE* ',
                suggestions: [
                    'ignoring case',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'get any node ',
                suggestions: [
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'select node type ERBS ',
                suggestions: [
                    '<Attribute Name>',
                    'from',
                    'name',
                    'where',
                    'with',
                    'ignoring case',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'all nodes of type ERBS from collection collection-name ',
                suggestions: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'where',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'all nodes from collection collection-name ',
                suggestions: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'where',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }, {
                input: 'all nodes from node test_node ',
                suggestions: [
                    '<Attribute Name>',
                    '<Struct>[<Member>]',
                    'name',
                    'where',
                    'ignoring case',
                    'filter by managementState = MAINTENANCE',
                    'filter by managementState = NORMAL',
                    'filter by radioAccessTechnology contains'
                ]
            }];



            for (var i = 0; i < tests.length; i++) {
                (function(testData) {
                    it('Verify: correct suggestions are shown for input "' + testData.input + '"', function(done) {
                        promises.runTestSteps([
                            function() {
                                return promises.sendKeys(currentApp.search.searchInput.view.getSearchField(), testData.input);
                            },
                            promises.getComponentListItems,
                            function(listItems) {
                                return checkListItems(listItems, testData.suggestions);
                            },
                            done
                        ]);
                    });
                })(tests[i]);
            }

            it('Verify: no suggestions are shown for queries with no space at the end like "select MeContext where object MeContext"', function(done) {
                promises.runTestSteps([
                    function() {
                        return promises.sendKeys(currentApp.search.searchInput.view.getSearchField(), 'select MeContext where object MeContext');
                    },
                    function() {
                        expect(document.querySelectorAll('.elWidgets-ComponentList').length).to.equal(0);
                    },
                    done
                ]);
            });

        });

        describe('Execute: Delete characters from populated input field', function() {
            it('Verify: correct suggestions are shown', function(done) {
                this.timeout(TIMEOUT);
                var searchField = currentApp.search.searchInput.view.getSearchField();

                promises.runTestSteps([
                    function() {
                        return promises.sendKeys(searchField, 'search cells with all at');
                    },
                    promises.skipFrames,
                    promises.getComponentListItems,
                    function(listItems) {
                        return checkListItems(listItems, ['all attr']);
                    },
                    function() {
                        return promises.backspace(searchField, 5);
                    },
                    promises.skipFrames,
                    promises.getComponentListItems,
                    function(listItems) {
                        return checkListItems(listItems, ['all attr', 'attr']);
                    },
                    function() {
                        return promises.backspace(searchField, 17);
                    },
                    promises.skipFrames,
                    promises.getComponentListItems,
                    function(listItems) {
                        return checkListItems(listItems, ['select','search']);
                    },
                    done
                ]);
            });
        });

        describe('Execute: Delete all characters from populated input field', function() {
            it('Verify: correct suggestions are shown', function(done) {
                this.timeout(TIMEOUT);
                var searchField = currentApp.search.searchInput.view.getSearchField();
                promises.runTestSteps([
                    function() {
                        return promises.sendKeys(searchField, 'select all obj');
                    },
                    promises.skipFrames,
                    promises.getComponentListItems,
                    function(listItems) {
                        return checkListItems(listItems, ['all objects of type']);
                    },
                    function() {
                        return promises.backspace(searchField, 14);
                    },
                    promises.skipFrames,
                    promises.getComponentListItems,
                    function(listItems) {
                        return checkListItems(listItems, [
                            '<Collection Name>',
                            '<Node Name>',
                            '<Object Type>',
                            '<Saved Search Name>',
                            '<Object Type(s)>',
                            'get',
                            'select',
                            'all objects of type',
                            'collection',
                            'object',
                            'search',
                            'type'
                        ]);
                    },
                    done
                ]);
            });
        });

        describe('Execute: Click an option', function() {
            it('Verify: Full text is inserted, when none of it has been typed', function(done) {
                this.timeout(TIMEOUT);
                var searchField = currentApp.search.searchInput.view.getSearchField();
                promises.runTestSteps([
                    function() {
                        return promises.sendKeys(searchField, 'select ');
                    },
                    promises.skipFrames,
                    promises.getComponentListItems,
                    function(listItems) {
                        core.Element.wrap(listItems[1]).trigger('click');
                        return Promise.resolve();
                    },
                    SearchViewModel.getSearchBox,
                    function(searchBox) {
                        expect(searchBox[0].value).to.equal('select all objects of type');
                        done();
                    }
                ]);
            });

            it('Verify: Remaining text is inserted, when some of it has been typed', function(done) {
                this.timeout(TIMEOUT);
                var searchField = currentApp.search.searchInput.view.getSearchField();
                promises.runTestSteps([
                    function() {
                        return promises.sendKeys(searchField, 'select all obj');
                    },
                    promises.skipFrames,
                    promises.getComponentListItems,
                    function(listItems) {
                        core.Element.wrap(listItems[0]).trigger('click');
                        return Promise.resolve();
                    },
                    SearchViewModel.getSearchBox,
                    function(searchBox) {
                        expect(searchBox[0].value).to.equal('select all objects of type');
                        done();
                    }
                ]);
            });

            it('Verify: No text is inserted, when all of the selected suggestion has been typed', function(done) {
                this.timeout(TIMEOUT);
                var searchField = currentApp.search.searchInput.view.getSearchField();
                promises.runTestSteps([
                    function() {
                        return promises.sendKeys(searchField, 'select all objects of type');
                    },
                    promises.skipFrames,
                    promises.getComponentListItems,
                    function(listItems) {
                        core.Element.wrap(listItems[0]).trigger('click');
                        return Promise.resolve();
                    },
                    SearchViewModel.getSearchBox,
                    function(searchBox) {
                        expect(searchBox[0].value).to.equal('select all objects of type');
                        done();
                    }
                ]);
            });
        });
    });

});
