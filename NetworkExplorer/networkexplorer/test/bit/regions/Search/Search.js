/*global define, describe, it, expect */
define([
    'jscore/core',
    'test/resources/user_input_data',
    'test/resources/restMock/REST_landscape_scenario2',
    'src/networkexplorer/regions/Search/Search',
    'test/bit/regions/Search/searchFunctions',
    'test/bit/regions/Search/testData/searchesByValidity',
    'test/bit/bit_util',
    'test/bit/bitPromises',
    'test/bit/viewmodels/SearchViewModel'
], function(core, user, REST_scenario2, SearchRegion, searchFunctions, searches, bit_util, promises, SearchViewModel) {
    'use strict';

    describe('bit/regions/Search/Search', function() {

        var currentApp, AppWithSearch, server;

        beforeEach(function(done) {

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
        });

        describe('Execute: provoke publish of search event via search region\'s natural (user) input.', function() {
            it('Verify: search event, Search:showInfo event and resetLastLoadedSearchQuery event were published.', function(done) {
                var resetLastLoadedSearchQueryCallCounter = 0;
                currentApp.getContext().eventBus.subscribe('Search:resetLastLoadedSearchQuery', function() {
                    resetLastLoadedSearchQueryCallCounter++;
                });

                currentApp.getContext().eventBus.subscribe('Search:setLocation', function(location) {
                    expect(location).to.equal('search/' + encodeURIComponent(user.user1.query.ERBS1));
                    expect(resetLastLoadedSearchQueryCallCounter).to.equal(1);
                    done();
                });

                searchFunctions.executeSearch(user.user1.query.ERBS1, currentApp.search);
            });
        });

        describe('Execute: trigger defaultHash event', function() {
            it('Verify: search field is cleared', function() {
                currentApp.getEventBus().publish('defaultHash');

                expect(currentApp.search.searchInput.view.getSearchField().getValue()).to.equal('');
            });
        });

        describe('Execute: trigger NetworkExplorer:collectionHash event', function() {
            it('Verify: search field is cleared', function() {
                currentApp.getEventBus().publish('NetworkExplorer:collectionHash', '1234567');

                expect(currentApp.search.searchInput.view.getSearchField().getValue()).to.equal('');
                expect(currentApp.search.view.getSearchButton().getProperty('disabled')).to.equal(true);
            });
        });

        describe('Execute: trigger searchUpdate event with search string.', function() {
            it('Verify: search field is populated', function() {
                var searchTerm = 'test search';
                currentApp.getEventBus().publish('NetworkExplorer:searchHash', searchTerm);

                expect(currentApp.search.searchInput.view.getSearchField().getValue()).to.equal(searchTerm);
            });
        });

        describe('Execute: hide region and publish QueryBuilder:showSearchRegion event.', function() {
            it('Verify: region is shown !', function(done) {
                // ARRANGE
                currentApp.getContext().eventBus.subscribe('QueryBuilder:showSearchRegion', function(data) {
                    // verify event was published with appropriate data
                    expect(currentApp.search.view.getElement().hasModifier('hidden')).to.equal(false);
                    done();
                });
                currentApp.search.view.getElement().setModifier('hidden');

                // ACT
                currentApp.getEventBus().publish('QueryBuilder:showSearchRegion');
            });
        });

        describe('Execute: hide saveExisting link and publish QueryBuilder:setSearchField event with data representing query string.', function() {
            it('Verify: appropriate DOM manipulations were executed !', function(done) {
                // ARRANGE
                currentApp.getContext().eventBus.subscribe('QueryBuilder:setSearchField', function(data) {
                    // ASSERT
                    // search field has been populated!
                    expect(currentApp.search.searchInput.view.getSearchField().getValue()).to.equal('Boom!');
                    done();
                });

                // ACT
                currentApp.getEventBus().publish('QueryBuilder:setSearchField', 'Boom!');
            });
        });

        describe('Input queries', function() {
            describe('Valid', function() {
                searches.valid.forEach(function(query) {
                    it(query, function(done) {
                        currentApp.search.searchInput.view.setSearchFieldValue(query);
                        currentApp.search.searchInput.addEventHandler('validQuery', function() {
                            expect(currentApp.search.view.getValidationErrorIcon().getProperty('className').indexOf('_visible')).to.equal(-1);
                            done();
                        });
                        currentApp.search.searchInput.onSearchFieldInput();
                    });
                });
            });
            describe('Invalid', function() {
                searches.invalid.forEach(function(query) {
                    it(query, function(done) {
                        currentApp.search.searchInput.view.setSearchFieldValue(query);
                        currentApp.search.searchInput.addEventHandler('invalidQuery', function() {
                            expect(currentApp.search.view.getValidationErrorIcon().getProperty('className').indexOf('_visible')).to.be.above(-1);
                            done();
                        });
                        currentApp.search.searchInput.onSearchFieldInput();
                    });
                });
            });
        });

    });
});
