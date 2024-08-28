define([
    'networkexplorer/regions/Search/Search',
    'networkexplorer/regions/Search/SearchView',
    'jscore/core',
    'jscore/ext/net',
    'networkexplorer/widgets/SearchInput/SearchInput',
    'i18n!networkexplorer/app.json'
], function(Search, SearchView, core, net, SearchInput, strings) {

    describe('Search', function() {

        var _sandbox, classUnderTest, eventBusStub;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            classUnderTest = new Search();
            classUnderTest.view = sinon.createStubInstance(SearchView);
            eventBusStub = sinon.createStubInstance(core.EventBus);
            classUnderTest.getEventBus = function() {
                return eventBusStub;
            };
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('onStart()', function() {
            it('set subscribe to events with appropriate handlers and set actions on DOM elements.', function() {
                // ARRANGE
                /*
                 * net.ajax needs to be stubbed because GrammarParser will use it to try load the grammar file and fail,
                 * and as a result throw an Error, causing tests to fail.
                 */
                _sandbox.stub(net, 'ajax');
                _sandbox.spy(SearchInput.prototype, 'init');
                _sandbox.stub(SearchInput.prototype, 'addEventHandler');
                _sandbox.stub(SearchInput.prototype, 'attachTo');
                var searchInputStub = 'searchInput';
                classUnderTest.view.getSearchInput.returns(searchInputStub);

                //ACT
                classUnderTest.onStart();

                //ASSERT
                expect(classUnderTest.searchInput.init.callCount).to.equal(1);
                expect(classUnderTest.searchInput.addEventHandler.callCount).to.equal(2);
                expect(classUnderTest.searchInput.addEventHandler.getCall(0).calledWith(
                    'invalidQuery', classUnderTest.onInvalidQuery, classUnderTest
                )).to.equal(true);
                expect(classUnderTest.searchInput.addEventHandler.getCall(1).calledWith(
                    'validQuery', classUnderTest.onValidQuery, classUnderTest
                )).to.equal(true);
                expect(classUnderTest.searchInput.attachTo.callCount).to.equal(1);
                expect(classUnderTest.searchInput.attachTo.getCall(0).calledWith(
                    searchInputStub
                )).to.equal(true);

                expect(classUnderTest.getEventBus().subscribe.callCount).to.equal(8);

                expect(classUnderTest.getEventBus().subscribe.getCall(0).calledWith('NetworkExplorer:searchHash',
                    classUnderTest.decodeAndSetSearchField,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(1).calledWith('Results:setSearchField',
                    classUnderTest.setSearchField,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(2).calledWith('QueryBuilder:setSearchField',
                    classUnderTest.setSearchField,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(3).calledWith('NetworkExplorer:collectionHash',
                    classUnderTest.clearSearchField,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(4).calledWith('NetworkExplorer:defaultHash',
                    classUnderTest.clearSearchField,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(5).calledWith(
                    'QueryBuilder:showSearchRegion',
                    classUnderTest.show,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(6).calledWith(
                    'QueryBuilder:cancelSearch',
                    classUnderTest.cancelSearch,
                    classUnderTest
                )).to.equal(true);
                expect(classUnderTest.getEventBus().subscribe.getCall(7).calledWith(
                    'Results:collectionFetchError',
                    classUnderTest.clearSearchField,
                    classUnderTest
                )).to.equal(true);

                expect(classUnderTest.view.addSearchFormHandler.callCount).to.equal(1);
                expect(classUnderTest.view.addSearchFormHandler.getCall(0).calledWith(
                    'submit',
                    classUnderTest.handleSearch,
                    classUnderTest
                )).to.equal(true);

            });
        });

        describe('onInvalidQuery()', function() {
            beforeEach(function() {
                classUnderTest.searchInput = _sandbox.stub({
                    getValue: function() {}
                });
            });

            it('should disable the search button and hide the validation error icon '+
                'when the value is empty', function() {
                // ARRANGE
                classUnderTest.searchInput.getValue.returns('');

                // ACT
                classUnderTest.onInvalidQuery();

                // ASSERT
                expect(classUnderTest.view.disableSearchButton.callCount).to.equal(1);
                expect(classUnderTest.view.hideValidationErrorIcon.callCount).to.equal(1);
                expect(classUnderTest.view.showValidationErrorIcon.callCount).to.equal(0);
                expect(classUnderTest.view.setValidationErrorIconTitle.callCount).to.equal(0);
            });

            it('should disable the search button and show the validation error icon ' +
                'when the value is not empty and no errorIndex is provided', function() {
                // ARRANGE
                classUnderTest.searchInput.getValue.returns('test input');

                // ACT
                classUnderTest.onInvalidQuery();

                // ASSERT
                expect(classUnderTest.view.disableSearchButton.callCount).to.equal(1);
                expect(classUnderTest.view.hideValidationErrorIcon.callCount).to.equal(0);
                expect(classUnderTest.view.showValidationErrorIcon.callCount).to.equal(1);
                expect(classUnderTest.view.setValidationErrorIconTitle.callCount).to.equal(0);
            });

            it('should disable the search button, show the validation error icon ' +
                'and set the validation error message '+
                'when the value is not empty and an errorIndex is provided', function() {
                // ARRANGE
                classUnderTest.searchInput.getValue.returns('test input');

                // ACT
                classUnderTest.onInvalidQuery(4);

                // ASSERT
                expect(classUnderTest.view.disableSearchButton.callCount).to.equal(1);
                expect(classUnderTest.view.hideValidationErrorIcon.callCount).to.equal(0);
                expect(classUnderTest.view.showValidationErrorIcon.callCount).to.equal(1);
                expect(classUnderTest.view.setValidationErrorIconTitle.callCount).to.equal(1);
                expect(classUnderTest.view.setValidationErrorIconTitle.getCall(0).calledWith(
                    strings.errorAtCharacter.replace('$1', 4)
                )).to.equal(true);
            });
        });

        describe('onValidQuery()', function() {
            beforeEach(function() {
                classUnderTest.searchInput = _sandbox.stub({
                    getValue: function() {}
                });
            });

            it('should only hide the validation error icon if value is empty', function() {
                // ARRANGE
                classUnderTest.searchInput.getValue.returns('');

                // ACT
                classUnderTest.onValidQuery();

                // ASSERT
                expect(classUnderTest.view.hideValidationErrorIcon.callCount).to.equal(1);
                expect(classUnderTest.view.enableSearchButton.callCount).to.equal(0);
            });

            it('should hide the validation error icon and enable the search button if value is not empty', function() {
                // ARRANGE
                classUnderTest.searchInput.getValue.returns('test input');

                // ACT
                classUnderTest.onValidQuery();

                // ASSERT
                expect(classUnderTest.view.hideValidationErrorIcon.callCount).to.equal(1);
                expect(classUnderTest.view.enableSearchButton.callCount).to.equal(1);
            });
        });

        describe('show()', function() {
            it('should hide the view, and publish appropriate events', function() {
                // ARRANGE
                classUnderTest.searchInput = _sandbox.stub({
                    enableAutoComplete: function() {}
                });

                // ACT
                classUnderTest.show();

                // ASSERT
                expect(classUnderTest.view.show.callCount).to.equal(1);
                expect(classUnderTest.searchInput.enableAutoComplete.callCount).to.equal(1);
            });
        });

        describe('handleSearch()', function() {
            // ARRANGE
            var eventBusStub, domEventStub, objectUnderTest, searchFieldValue;

            beforeEach(function() {

                eventBusStub = {
                    subscribe: function() {
                    }
                };

                objectUnderTest = new Search({
                    context: {
                        eventBus: eventBusStub
                    }
                });
                var searchInputStub = {
                    getValue: function() {
                        return searchFieldValue;
                    }
                };
                objectUnderTest.searchInput = searchInputStub;
                eventBusStub = {
                    publish: function() {
                    }
                };
                _sandbox.stub(objectUnderTest, 'getEventBus', function() {
                    return eventBusStub;
                });
                _sandbox.spy(eventBusStub, 'publish');

                domEventStub = {
                    preventDefault: function() {
                    }
                };
                _sandbox.spy(domEventStub, 'preventDefault');
            });

            it('should trigger Search:setLocation event on eventBus if searchUrlPartHasChanged', function() {
                //ARRANGE
                searchFieldValue = 'mySearch';

                //ACT
                objectUnderTest.handleSearch(domEventStub);

                //ASSERT
                expect(eventBusStub.publish.callCount).to.equal(2);

                expect(eventBusStub.publish.getCall(0).calledWith('Search:resetLastLoadedSearchQuery', objectUnderTest)).to.equal(true);
                expect(eventBusStub.publish.getCall(1).calledWith('Search:setLocation', 'search/' + 'mySearch')).to.equal(true);
            });

            it('should trigger Search:searchSubmit event on eventBus if searchUrlPartHas NOT Changed', function() {
                //ARRANGE
                // set hash to reflect current search value taken from View.
                location.hash = 'search/mySearch';

                //ACT
                objectUnderTest.handleSearch(domEventStub);

                //ASSERT
                expect(eventBusStub.publish.callCount).to.equal(2);

                expect(eventBusStub.publish.getCall(0).calledWith('Search:resetLastLoadedSearchQuery', objectUnderTest)).to.equal(true);
                expect(eventBusStub.publish.getCall(1).calledWith('Search:searchSubmit', 'mySearch')).to.equal(true);
            });

            it('should trigger Search:searchSubmit event if searchUrlPart has NOT changed with a special character in query', function() {
                //ARRANGE
                //set hash to generic search
                location.hash = 'networkexplorer/search/' + encodeURIComponent('MeContext where Name ERBS*');
                searchFieldValue = 'MeContext where Name ERBS*';

                //ACT
                objectUnderTest.handleSearch(domEventStub);

                //ASSERT
                expect(eventBusStub.publish.callCount).to.equal(2);

                expect(eventBusStub.publish.getCall(0).calledWith('Search:resetLastLoadedSearchQuery', objectUnderTest)).to.equal(true);
                expect(eventBusStub.publish.getCall(1).calledWith('Search:searchSubmit', encodeURIComponent('MeContext where Name ERBS*'))).to.equal(true);
            });

            it('should update location hash', function() {
                //ARRANGE
                //set hash to generic search
                location.hash = 'networkexplorer/search/' + encodeURIComponent('MeContext where Name ERBS1');
                searchFieldValue = 'MeContext where Name ERBS1';

                //ACT
                objectUnderTest.handleSearch(domEventStub);

                //ASSERT
                expect(eventBusStub.publish.callCount).to.equal(2);

                expect(eventBusStub.publish.getCall(0).calledWith('Search:resetLastLoadedSearchQuery', objectUnderTest)).to.equal(true);
                expect(eventBusStub.publish.getCall(1).calledWith('Search:searchSubmit', encodeURIComponent('MeContext where Name ERBS1'))).to.equal(true);
            });

            it('should update location hash after search with shorter query length is executed', function() {
                //ARRANGE
                //set hash to generic search
                location.hash = 'networkexplorer/search/MeContext where Name ERBS1';
                searchFieldValue = 'MeContext';

                //ACT
                objectUnderTest.handleSearch(domEventStub);

                //ASSERT
                expect(eventBusStub.publish.callCount).to.equal(2);

                expect(eventBusStub.publish.getCall(0).calledWith('Search:resetLastLoadedSearchQuery', objectUnderTest)).to.equal(true);
                expect(eventBusStub.publish.getCall(1).calledWith('Search:setLocation', 'search/MeContext')).to.equal(true);
            });
        });

        describe('cancelSearch()', function() {
            it('should publish event to cancel search', function() {
                // ACT
                classUnderTest.cancelSearch();
                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('Search:cancelSearch'));
            });
        });

        describe('setSearchField()', function() {
            it('should set the search field value to the provided text & ' +
                'call setValue on searchInput', function() {
                // ARRANGE
                classUnderTest.searchInput = _sandbox.stub({
                    setValue: function() {}
                });
                var val = 'test search';

                // ACT
                classUnderTest.setSearchField(val);

                // ASSERT
                expect(classUnderTest.searchInput.setValue.callCount).to.equal(1);
                expect(classUnderTest.searchInput.setValue.getCall(0).calledWith(val)).to.equal(true);
            });

            it('should URI decode the provided text if decode is true, and set the search field value to ' +
                'the decoded text & call setValue on searchInput.', function() {
                // ARRANGE
                classUnderTest.searchInput = _sandbox.stub({
                    setValue: function() {}
                });
                var encodedVal = 'test%20search';
                var val = 'test search';

                // ACT
                classUnderTest.setSearchField(encodedVal, true);

                // ASSERT
                expect(classUnderTest.searchInput.setValue.callCount).to.equal(1);
                expect(classUnderTest.searchInput.setValue.getCall(0).calledWith(val)).to.equal(true);
            });
        });

        describe('clearSearchField()', function() {
            it('should set the search field value to an empty string', function() {
                // ARRANGE
                classUnderTest.searchInput = _sandbox.stub({
                    clearSearchField: function() {}
                });

                // ACT
                classUnderTest.clearSearchField();

                // ASSERT
                expect(classUnderTest.searchInput.clearSearchField.callCount).to.equal(1);
            });
        });

        describe('switchToQueryBuilderButtonAction()', function() {
            it('should hide the view, and publish appropriate events', function() {
                // ARRANGE
                classUnderTest.searchInput = _sandbox.stub({
                    disableAutoComplete: function() {},
                    getValue: function() {}
                });

                // ACT
                classUnderTest.switchToQueryBuilderButtonAction();

                // ASSERT
                expect(classUnderTest.searchInput.disableAutoComplete.callCount).to.equal(1);
                expect(classUnderTest.searchInput.getValue.callCount).to.equal(1);
                expect(classUnderTest.view.hide.callCount).to.equal(1);
                expect(classUnderTest.getEventBus().publish.callCount).to.equal(2);
                expect(classUnderTest.getEventBus().publish.getCall(0).calledWith('Search:showQueryBuilder')).to.equal(true);
                expect(classUnderTest.getEventBus().publish.getCall(1).calledWith('Search:SearchHidden')).to.equal(true);
            });
        });

    });
});
