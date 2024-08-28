define([
    'networkexplorer/widgets/SearchInput/SearchInput',
    'networkexplorer/widgets/SearchInput/SearchInputView',
    'grammarparsinglibrary/GrammarParser',
    'i18n!networkexplorer/SearchInput.json'
], function(SearchInput, SearchInputView, GrammarParser, strings) {

    describe('SearchInput', function() {

        var _sandbox, classUnderTest, eventBusStub;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            _sandbox.stub(GrammarParser.prototype, 'fetchGrammar');
            classUnderTest = new SearchInput();

            // VIEW MOCK!
            classUnderTest.view = sinon.createStubInstance(SearchInputView);  // spy on all view method
            classUnderTest.view.getSearchFieldValue.returns('');
            _sandbox.stub(classUnderTest, 'isFocused');
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('onControlReady()', function() {
            it('set subscribe to events with appropriate handlers and set actions on DOM elements.', function() {
                // ARRANGE
                _sandbox.stub(classUnderTest, 'updateSuggestions');

                //ACT
                classUnderTest.onControlReady();

                //ASSERT
                expect(classUnderTest.view.addCancelButtonClickHandler.callCount).to.equal(1);
                expect(classUnderTest.view.addCancelButtonClickHandler.getCall(0).calledWith(
                    classUnderTest.onSearchFieldCancel,
                    classUnderTest
                )).to.equal(true);

                expect(classUnderTest.view.addSearchFieldHandler.callCount).to.equal(4);
                expect(classUnderTest.view.addSearchFieldHandler.getCall(0).calledWith(
                    'input',
                    classUnderTest.onSearchFieldInput,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.view.addSearchFieldHandler.getCall(1).calledWith(
                    'keyup',
                    classUnderTest.hideSuggestionsIfNotAtEnd,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.view.addSearchFieldHandler.getCall(2).calledWith(
                    'dragend',
                    classUnderTest.hideSuggestionsIfNotAtEnd,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.view.addSearchFieldHandler.getCall(3).calledWith(
                    'click',
                    classUnderTest.hideSuggestionsIfNotAtEnd,
                    classUnderTest
                )).to.equal(true);

                expect(classUnderTest.updateSuggestions.callCount).to.equal(1);
                expect(classUnderTest.updateSuggestions.getCall(0).calledWith('', false)).to.equal(true);

            });
        });

        describe('hideSuggestionsIfNotAtEnd()', function() {
            var searchFieldMock;

            beforeEach(function() {
                searchFieldMock = _sandbox.stub({
                    getProperty: function() {}
                });
                classUnderTest.view.getSearchField.returns(searchFieldMock);
                _sandbox.stub(classUnderTest, 'hideList');
                _sandbox.stub(classUnderTest, 'showList');
            });

            it('should hide suggestions if not at end of the search input', function(done) {
                // ARRANGE
                searchFieldMock.getProperty.returns(5);
                classUnderTest.view.getSearchFieldValue.returns('select all obj');

                // ACT
                classUnderTest.hideSuggestionsIfNotAtEnd();

                // ASSERT
                requestAnimationFrame(function() {
                    expect(classUnderTest.hideList.callCount).to.equal(1);
                    expect(classUnderTest.showList.callCount).to.equal(0);
                    done();
                });
            });

            it('should show suggestions if at end of the search input and suggestions exist', function(done) {
                // ARRANGE
                searchFieldMock.getProperty.returns(14);
                classUnderTest.view.getSearchFieldValue.returns('select all obj');
                classUnderTest.suggestions = ['test'];
                classUnderTest.isFocused.returns(true);

                // ACT
                classUnderTest.hideSuggestionsIfNotAtEnd();

                // ASSERT
                requestAnimationFrame(function() {
                    expect(classUnderTest.hideList.callCount).to.equal(0);
                    expect(classUnderTest.showList.callCount).to.equal(1);
                    done();
                });
            });

            it('should do nothingif at end of the search input and suggestions do not exist', function(done) {
                // ARRANGE
                searchFieldMock.getProperty.returns(14);
                classUnderTest.view.getSearchFieldValue.returns('select all obj');
                classUnderTest.suggestions = [];

                // ACT
                classUnderTest.hideSuggestionsIfNotAtEnd();

                // ASSERT
                requestAnimationFrame(function() {
                    expect(classUnderTest.hideList.callCount).to.equal(0);
                    expect(classUnderTest.showList.callCount).to.equal(0);
                    done();
                });
            });
        });

        describe('getFocusableElement()', function() {
            it('should return the search field', function() {
                // ARRANGE
                var searchField = 'searchField';
                classUnderTest.view.getSearchField.returns(searchField);

                // ACT + ASSERT
                expect(classUnderTest.getFocusableElement()).to.equal(searchField);
            });
        });

        describe('onItemSelected()', function() {
            it('should replace the text after the auto complete index with the selected value', function() {
                // ARRANGE
                var suggestionPositions = 7;
                classUnderTest.autoComplete = {
                    getPositionOfLastSuggestions: function() {
                        return suggestionPositions;
                    }
                };
                classUnderTest.view.getSearchFieldValue.returns('select all obj');
                var item = {
                    value: 'all objects of type'
                };
                _sandbox.stub(classUnderTest, 'validateQuery');
                _sandbox.stub(classUnderTest, 'hideShowCancelButton');

                // ACT
                classUnderTest.onItemSelected(item);

                // ASSERT
                expect(classUnderTest.view.setSearchFieldValue.callCount).to.equal(1);
                expect(classUnderTest.view.setSearchFieldValue.getCall(0).calledWith(
                    'select all objects of type'
                )).to.equal(true);
                expect(classUnderTest.validateQuery.callCount).to.equal(1);
                expect(classUnderTest.hideShowCancelButton.callCount).to.equal(1);
            });
        });

        describe('updateSuggestions()', function() {
            var searchFieldMock;

            beforeEach(function() {
                searchFieldMock = _sandbox.stub({
                    getProperty: function() {}
                });
                classUnderTest.view.getSearchField.returns(searchFieldMock);
                classUnderTest.autoComplete = _sandbox.stub({
                    getSuggestions: function() {}
                });
                _sandbox.stub(classUnderTest, 'hideList');
                _sandbox.stub(classUnderTest, 'setItems');
                _sandbox.stub(classUnderTest, 'showList');
                _sandbox.stub(classUnderTest, 'enable');
                _sandbox.stub(classUnderTest, 'disable');
            });

            it('should hide the list if suggestions length is 0', function(done) {
                // ARRANGE
                classUnderTest.autoComplete.getSuggestions.returns([]);

                // ACT
                classUnderTest.updateSuggestions();

                // ASSERT
                requestAnimationFrame(function() {
                    expect(classUnderTest.hideList.callCount).to.equal(1);
                    expect(classUnderTest.disable.callCount).to.equal(1);
                    expect(classUnderTest.setItems.callCount).to.equal(0);
                    expect(classUnderTest.showList.callCount).to.equal(0);
                    expect(classUnderTest.enable.callCount).to.equal(0);
                    done();
                });
            });

            it('should populate the list with returned suggestions ' +
                'when suggestions length is greater than 0 and searchTerm isnt an empty string ' +
                'and search field caret is at end', function(done) {
                // ARRANGE
                classUnderTest.autoComplete.getSuggestions.returns(['suggestion2', 'suggestion1']);
                var expectedItems = [{
                    name: 'suggestion2',
                    value: 'suggestion2'
                }, {
                    name: 'suggestion1',
                    value: 'suggestion1'
                }];
                searchFieldMock.getProperty.returns(7);
                classUnderTest.isFocused.returns(true);

                // ACT
                classUnderTest.updateSuggestions('select ');

                // ASSERT
                requestAnimationFrame(function() {
                    expect(classUnderTest.hideList.callCount).to.equal(0);
                    expect(classUnderTest.disable.callCount).to.equal(0);
                    expect(classUnderTest.setItems.callCount).to.equal(1);
                    expect(classUnderTest.setItems.getCall(0).calledWith(expectedItems)).to.equal(true);
                    expect(classUnderTest.showList.callCount).to.equal(1);
                    expect(classUnderTest.enable.callCount).to.equal(1);
                    done();
                });
            });

            it('should not populate the list with returned suggestions ' +
                'when suggestions length is greater than 0 and searchTerm isnt an empty string ' +
                'and search field caret is not at end', function(done) {
                // ARRANGE
                classUnderTest.autoComplete.getSuggestions.returns(['suggestion2', 'suggestion1']);
                var expectedItems = [{
                    name: 'suggestion2',
                    value: 'suggestion2'
                }, {
                    name: 'suggestion1',
                    value: 'suggestion1'
                }];
                searchFieldMock.getProperty.returns(3);

                // ACT
                classUnderTest.updateSuggestions('select ');

                // ASSERT
                requestAnimationFrame(function() {
                    expect(classUnderTest.hideList.callCount).to.equal(0);
                    expect(classUnderTest.disable.callCount).to.equal(0);
                    expect(classUnderTest.setItems.callCount).to.equal(1);
                    expect(classUnderTest.setItems.getCall(0).calledWith(expectedItems)).to.equal(true);
                    expect(classUnderTest.showList.callCount).to.equal(0);
                    expect(classUnderTest.enable.callCount).to.equal(1);
                    done();
                });
            });

            it('should not show list if showSuggestions is false and suggestions length is greater than 0', function(done) {
                // ARRANGE
                classUnderTest.autoComplete.getSuggestions.returns(['suggestion2', 'suggestion1']);
                var expectedItems = [{
                    name: 'suggestion2',
                    value: 'suggestion2'
                }, {
                    name: 'suggestion1',
                    value: 'suggestion1'
                }];
                searchFieldMock.getProperty.returns(7);

                // ACT
                classUnderTest.updateSuggestions('select ', false);

                // ASSERT
                requestAnimationFrame(function() {
                    expect(classUnderTest.hideList.callCount).to.equal(0);
                    expect(classUnderTest.disable.callCount).to.equal(0);
                    expect(classUnderTest.setItems.callCount).to.equal(1);
                    expect(classUnderTest.setItems.getCall(0).calledWith(expectedItems)).to.equal(true);
                    expect(classUnderTest.showList.callCount).to.equal(0);
                    expect(classUnderTest.enable.callCount).to.equal(1);
                    done();
                });
            });

            it('should populate the list with single word queries and returned suggestions ' +
                'when suggestions length is greater than 0 and searchTerm is an empty string ' +
                'and search field caret is at the end', function(done) {
                // ARRANGE
                classUnderTest.autoComplete.getSuggestions.returns(['suggestion2', 'suggestion1']);
                var expectedItems = [{
                    header: strings.singleWordQueries,
                    items: classUnderTest.SINGLE_WORD_QUERY_ITEMS
                }, {
                    header: strings.advancedQueries,
                    items: [
                        {
                            name: 'suggestion2',
                            value: 'suggestion2'
                        }, {
                            name: 'suggestion1',
                            value: 'suggestion1'
                        }
                    ]
                }];
                searchFieldMock.getProperty.returns(0);
                classUnderTest.isFocused.returns(true);

                // ACT
                classUnderTest.updateSuggestions('');

                // ASSERT
                requestAnimationFrame(function() {
                    expect(classUnderTest.hideList.callCount).to.equal(0);
                    expect(classUnderTest.disable.callCount).to.equal(0);
                    expect(classUnderTest.setItems.callCount).to.equal(1);
                    expect(classUnderTest.setItems.getCall(0).calledWith(expectedItems)).to.equal(true);
                    expect(classUnderTest.showList.callCount).to.equal(1);
                    expect(classUnderTest.enable.callCount).to.equal(1);
                    done();
                });
            });

            describe('filter suggestions should be', function() {
                [
                    {
                        description: 'displayed with header when only filters are available',
                        query: 'get all nodes of type of type ERBS ',
                        suggestionsMock: [{
                            filters: [
                                'filter by managementState = MAINTENANCE',
                                'filter by managementState = NORMAL'
                            ]
                        }],
                        expectedItems: [{
                            header: 'Filters',
                            items: [
                                {
                                    name: 'filter by managementState = MAINTENANCE',
                                    value: 'filter by managementState = MAINTENANCE'
                                }, {
                                    name: 'filter by managementState = NORMAL',
                                    value: 'filter by managementState = NORMAL'
                                }
                            ]
                        }]
                    }, {
                        description: 'grouped with header when other suggestions are available',
                        query: 'MeContext with attr platformType ',
                        suggestionsMock: [
                            '<Attribute Name>',
                            'from',
                            'name',
                            'where',
                            'with',
                            'using',
                            {
                                filters: [
                                    'filter by managementState = MAINTENANCE',
                                    'filter by managementState = NORMAL'
                                ]
                            }
                        ],
                        expectedItems: [{
                            name: '<Attribute Name>',
                            value: '<Attribute Name>'
                        }, {
                            name: 'from',
                            value: 'from'
                        }, {
                            name: 'name',
                            value: 'name'
                        }, {
                            name: 'where',
                            value: 'where'
                        }, {
                            name: 'with',
                            value: 'with'
                        }, {
                            name: 'using',
                            value: 'using'
                        }, {
                            header: 'Filters',
                            items: [
                                {
                                    name: 'filter by managementState = MAINTENANCE',
                                    value: 'filter by managementState = MAINTENANCE'
                                }, {
                                    name: 'filter by managementState = NORMAL',
                                    value: 'filter by managementState = NORMAL'
                                }
                            ]
                        }]
                    }
                ].forEach(function(test) {
                    it(test.description, function(done) {
                        // ARRANGE
                        classUnderTest.autoComplete.getSuggestions.returns(test.suggestionsMock);
                        searchFieldMock.getProperty.returns(0);
                        classUnderTest.isFocused.returns(true);
                        // ACT
                        classUnderTest.updateSuggestions(test.query);
                        // ASSERT
                        requestAnimationFrame(function() {
                            expect(classUnderTest.setItems.callCount).to.equal(1);
                            expect(classUnderTest.setItems.getCall(0).calledWith(test.expectedItems)).to.equal(true);
                            done();
                        });
                    });
                });
            });
        });

        describe('onSearchFieldInput()', function() {
            it('should call hideShowCancelButton and toggleDisableSearchButton with search term as argument', function() {
                // ARRANGE
                // override view method
                classUnderTest.view.getSearchFieldValue.returns('BOOM!');
                _sandbox.stub(classUnderTest, 'validateQuery');
                _sandbox.stub(classUnderTest, 'hideShowCancelButton');
                _sandbox.stub(classUnderTest, 'updateSuggestions');

                // ACT
                classUnderTest.onSearchFieldInput();

                // ASSERT
                expect(classUnderTest.validateQuery.callCount).to.equal(1);
                expect(classUnderTest.hideShowCancelButton.callCount).to.equal(1);
                expect(classUnderTest.hideShowCancelButton.getCall(0).calledWith(
                    'BOOM!'
                )).to.equal(true);
                expect(classUnderTest.updateSuggestions.callCount).to.equal(1);
                expect(classUnderTest.updateSuggestions.getCall(0).calledWith(
                    'BOOM!'
                )).to.equal(true);
            });
        });

        describe('validateQuery()', function() {
            beforeEach(function() {
                // ARRANGE
                classUnderTest.grammarParser = _sandbox.stub({
                    validate: function() {}
                });
                _sandbox.stub(classUnderTest, 'trigger');
            });

            it('should trigger a validQuery event if the query is valid', function() {
                // ARRANGE
                classUnderTest.grammarParser.validate.returns({
                    valid: true,
                    grammarLoaded: true
                });
                var query = 'something';
                classUnderTest.view.getSearchFieldValue.returns(query);

                // ACT
                classUnderTest.validateQuery();

                // ASSERT
                expect(classUnderTest.trigger.callCount).to.equal(1);
                expect(classUnderTest.trigger.getCall(0).calledWith('validQuery')).to.equal(true);
            });

            it('should trigger an invalidQuery event with the error index if the query is invalid', function() {
                // ARRANGE
                classUnderTest.grammarParser.validate.returns({
                    valid: false,
                    errorIndex: 4,
                    grammarLoaded: true
                });
                var query = 'select something';
                classUnderTest.view.getSearchFieldValue.returns(query);

                // ACT
                classUnderTest.validateQuery();

                // ASSERT
                expect(classUnderTest.trigger.callCount).to.equal(1);
                expect(classUnderTest.trigger.getCall(0).calledWith('invalidQuery', 4)).to.equal(true);
            });

            it('should trigger nothing if validate returns grammarLoaded: false', function() {
                // ARRANGE
                classUnderTest.grammarParser.validate.returns({
                    grammarLoaded: false
                });
                var query = 'select something';
                classUnderTest.view.getSearchFieldValue.returns(query);

                // ACT
                classUnderTest.validateQuery();

                // ASSERT
                expect(classUnderTest.trigger.callCount).to.equal(0);
            });

            it('should trigger a validQuery event if the validationResult is false, but the search term is a single word with a preceding asterisk.', function() {
                // ARRANGE
                classUnderTest.grammarParser.validate.returns({
                    valid: false,
                    errorIndex: 0,
                    grammarLoaded: true
                });
                var query = '*TestNode';
                classUnderTest.view.getSearchFieldValue.returns(query);

                // ACT
                classUnderTest.validateQuery();

                // ASSERT
                expect(classUnderTest.trigger.callCount).to.equal(1);
                expect(classUnderTest.trigger.getCall(0).calledWith('validQuery')).to.equal(true);
            });

            it('should trigger a validQuery event if the validationResult is false, but the search term is a single word asterisks on both sides.', function() {
                // ARRANGE
                classUnderTest.grammarParser.validate.returns({
                    valid: false,
                    errorIndex: 0,
                    grammarLoaded: true
                });
                var query = '*TestNode*';
                classUnderTest.view.getSearchFieldValue.returns(query);

                // ACT
                classUnderTest.validateQuery();

                // ASSERT
                expect(classUnderTest.trigger.callCount).to.equal(1);
                expect(classUnderTest.trigger.getCall(0).calledWith('validQuery')).to.equal(true);
            });
        });

        describe('onSearchFieldCancel()', function() {
            it('should hideCancelButton, setSearchFieldValue, trigger an invalidQuery event and focus the searchField', function() {
                //ARRANGE
                _sandbox.stub(classUnderTest, 'hideShowCancelButton');
                _sandbox.stub(classUnderTest, 'trigger');
                _sandbox.stub(classUnderTest, 'updateSuggestions');

                //ACT
                classUnderTest.onSearchFieldCancel();

                //ASSERT
                expect(classUnderTest.hideShowCancelButton.callCount).to.equal(1);
                expect(classUnderTest.hideShowCancelButton.getCall(0).calledWith('')).to.equal(true);
                expect(classUnderTest.view.setSearchFieldValue.callCount).to.equal(1);
                expect(classUnderTest.view.setSearchFieldValue.getCall(0).calledWith('')).to.equal(true);
                expect(classUnderTest.trigger.callCount).to.equal(1);
                expect(classUnderTest.trigger.getCall(0).calledWith('invalidQuery')).to.equal(true);
                expect(classUnderTest.view.focusSearchField.callCount).to.equal(1);
            });
        });

        describe('hideShowCancelButton()', function() {
            it('should show cancel button when text length is greater than 0', function() {
                // ACT
                classUnderTest.hideShowCancelButton('text');

                // ASSERT
                expect(classUnderTest.view.showCancelButton.callCount).to.equal(1);
                expect(classUnderTest.view.hideCancelButton.callCount).to.equal(0);
            });

            it('should hide cancel button when text length is 0', function() {
                // ACT
                classUnderTest.hideShowCancelButton('');

                // ASSERT
                expect(classUnderTest.view.showCancelButton.callCount).to.equal(0);
                expect(classUnderTest.view.hideCancelButton.callCount).to.equal(1);
            });
        });

        describe('getValue()', function() {
            it('should return the search field value', function() {
                // ARRANGE
                var searchFieldValue = 'searchFieldValue';
                classUnderTest.view.getSearchFieldValue.returns(searchFieldValue);

                // ACT + ASSERT
                expect(classUnderTest.getValue()).to.equal(searchFieldValue);
            });
        });

        describe('clearSearchField()', function() {
            it('should set the search field value to an empty string', function() {
                // ARRANGE
                _sandbox.stub(classUnderTest, 'trigger');
                _sandbox.stub(classUnderTest, 'hideShowCancelButton');
                _sandbox.stub(classUnderTest, 'updateSuggestions');

                // ACT
                classUnderTest.clearSearchField();

                // ASSERT
                expect(classUnderTest.view.setSearchFieldValue.callCount).to.equal(1);
                expect(classUnderTest.view.setSearchFieldValue.getCall(0).calledWith('')).to.equal(true);
                expect(classUnderTest.hideShowCancelButton.callCount).to.equal(1);
                expect(classUnderTest.hideShowCancelButton.getCall(0).calledWith('')).to.equal(true);
                expect(classUnderTest.updateSuggestions.callCount).to.equal(1);
                expect(classUnderTest.updateSuggestions.getCall(0).calledWith('', false)).to.equal(true);
                expect(classUnderTest.trigger.callCount).to.equal(1);
                expect(classUnderTest.trigger.getCall(0).calledWith('invalidQuery')).to.equal(true);
            });
        });
    });
});
