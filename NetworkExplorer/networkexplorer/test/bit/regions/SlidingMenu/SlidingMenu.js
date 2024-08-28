/*global define, describe, it, expect */
define([
    'jscore/core',
    'jscore/ext/mvp',
    'test/resources/cssNamespaces',
    'test/resources/user_input_data',
    'test/resources/restMock/data/staticCollections',
    'test/resources/restMock/data/savedSearches',
    'test/resources/restMock/REST_collection_scenarios',
    'test/resources/restMock/REST_savedSearch_scenarios',
    'test/resources/restMock/REST_ui_settings',
    'test/resources/restMock/REST_object_configuration',
    'test/resources/restMock/REST_topologyCollections',
    'src/networkexplorer/regions/SlidingMenu/SlidingMenu',
    'test/bit/viewmodels/SlidingMenuViewModel',
    'test/bit/bitPromises'
], function(
    core,
    mvp,
    css,
    user,
    staticCollections,
    savedSearches,
    REST_collection_scenarios,
    REST_savedSearch_scenarios,
    REST_ui_settings,
    REST_object_configuration,
    REST_topologyCollections,
    SlidingMenuRegion,
    SlidingMenuViewModel,
    promises
) {
    'use strict';

    describe('bit/regions/SlidingMenu/SlidingMenu', function() {

        var currentApp, container, server, _sandbox;

        beforeEach(function(done) {
            _sandbox = sinon.sandbox.create({
                useFakeServer: true
            });
            server = _sandbox.server;

            server.autoRespond = true;
            server.respondImmediately = true;

            // Create a generic app with View and root DOM element.
            var AppWithSlidingMenu = core.App.extend({

                View: core.View.extend({
                    getTemplate: function() {
                        return '<div></div>';
                    }
                }),

                // Place SlidingMenu Region into a generic app.
                onStart: function() {
                    this.getContext().getApplicationPosition = this.getApplicationPosition.bind(this);
                    this.slidingMenu = new SlidingMenuRegion({
                        context: this.getContext(),
                        favoritesCollection: new mvp.Collection()
                    });
                    this.slidingMenu.start(this.getElement());
                },

                getApplicationPosition: function() {
                    return this.view.getElement().getPosition();
                }
            });
            currentApp = new AppWithSlidingMenu();
            container = document.getElementById('bitContainer');

            // start application in test

            done();
        });

        afterEach(function() {
            //Start TODO: Use promises instead
            window.onhashchange = null;
            window.location.hash = '';
            //End
            currentApp.stop();
            REST_collection_scenarios.reset();
            REST_savedSearch_scenarios.reset();
            _sandbox.restore();
        });

        describe('In the Collections section', function() {
            beforeEach(function() {
                REST_savedSearch_scenarios.applyScenario(server);
                REST_ui_settings.respondToNetworkExplorerFavorites(server, []); //no reset
                // start application
                currentApp.start(container);
            });
            [
                {
                    usingVersion: 'v4 Call',
                    useV4: true,
                    staticCollection: staticCollections.collections[1].id,
                    staticCollection2: staticCollections.collections[0].id,
                },
                {
                    usingVersion: 'Fallback',
                    useV4: false,
                    staticCollection: staticCollections.collections[3].id,
                    staticCollection2: staticCollections.collections[4].id
                }
            ].forEach(function (test) {
                it('Generate Links using ' + test.usingVersion + '. Clicking a link changes the location hash to #networkexplorer/collections/[poid]', function(done) {
                    var changeCount = 0;

                    if(test.useV4) {
                        REST_collection_scenarios.respondToV4Search(server);
                    } else {
                        REST_collection_scenarios.applyScenario(server);
                    }
                    currentApp.getEventBus().subscribe('SlidingMenu:setLocation', function(location) {
                        changeCount++;
                        if (changeCount == 1) {
                            expect(location).to.equal('#networkexplorer/collection/' + test.staticCollection);
                            SlidingMenuViewModel.clickNthStaticCollection(1);
                        }

                        if (changeCount == 2) {
                            expect(location).to.equal('#networkexplorer/collection/' + test.staticCollection2);
                            done();
                        }
                    });

                    SlidingMenuViewModel.waitForElementsByClassName(css.wLimitedList.showMore.val, function(showMoreEls) {
                        SlidingMenuViewModel.clickNthStaticCollection(0);
                    });
                    currentApp.getEventBus().publish('NetworkExplorer:appLoaded'); //?
                });
            });
            it('Clicking the "View all" button changes the location hash to #networkexplorer/collections/my', function(done) {
                REST_collection_scenarios.applyScenario(server);

                window.onhashchange = function() {
                    expect(window.location.hash).to.equal('#networkexplorer/collections/my');
                    done();
                };
                SlidingMenuViewModel.waitForElementsByClassName(css.wLimitedList.showMore.val, function(showMoreEls) {
                    var evt = document.createEvent('MouseEvents');
                    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    showMoreEls[0].dispatchEvent(evt);
                });
                currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
            });
        });

        // There is no
        //   describe('Clicking items in the Saved Searches section', function () {});
        // because the behaviour is the same as 'Clicking items in the Collections section'

        describe('Handle failures due to no contact with the server by ratcheting timeouts upwards', function() {
            beforeEach(function() {
                REST_collection_scenarios.applyScenario(server);
                REST_savedSearch_scenarios.applyScenario(server);
                REST_ui_settings.respondToNetworkExplorerFavorites(server, []);
                // start application
                currentApp.start(container);
            });
            it('Clicking a collection will fail thrice and then succeed after a total of 17 seconds (2, 5, 10 wait between retries)', function(done) {
                this.timeout(25000);

                REST_collection_scenarios.setRetryCountInput(3);

                SlidingMenuViewModel.waitForElementsByClassName(css.wLimitedListItem.val, function(listItemEls) {
                    expect(listItemEls.length).to.be.above(0);
                    done();
                }, document.getElementsByClassName(css.rSlidingMenu.collections.val)[0], 18000);

                currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
            });
            it('Clicking a saved search will fail thrice and then succeed after a total of 17 seconds (2, 5, 10 wait between retries)', function(done) {
                this.timeout(25000);

                REST_savedSearch_scenarios.setRetryCountInput(3);

                SlidingMenuViewModel.waitForElementsByClassName(css.wLimitedListItem.val, function(listItemEls) {
                    expect(listItemEls.length).to.be.above(0);
                    done();
                }, document.getElementsByClassName(css.rSlidingMenu.searches.val)[0], 18000);

                currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
            });
        });

        describe('Handle failures due to errorCode 1001', function() {
            beforeEach(function() {
                REST_collection_scenarios.applyScenario(server);
                REST_savedSearch_scenarios.applyScenario(server);
                REST_ui_settings.respondToNetworkExplorerFavorites(server, []);
                // start application
                currentApp.start(container);
            });
            it('Clicking a collection will fail and then succeed after a total of 2 seconds', function(done) {
                this.timeout(3000);

                REST_collection_scenarios.setRetryCountInput(1);
                REST_collection_scenarios.setResponseCode(500);
                REST_collection_scenarios.setErrorCode(1001);

                SlidingMenuViewModel.waitForElementsByClassName(css.wLimitedListItem.val, function(listItemEls) {
                    expect(listItemEls.length).to.be.above(0);
                    done();
                }, document.getElementsByClassName(css.rSlidingMenu.collections.val)[0], 3000);

                currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
            });
            it('Clicking a saved search will fail and then succeed after a total of 2 seconds', function(done) {
                this.timeout(20000);

                REST_savedSearch_scenarios.setRetryCountInput(1);
                REST_savedSearch_scenarios.setResponseCode(500);
                REST_savedSearch_scenarios.setErrorCode(1001);

                SlidingMenuViewModel.waitForElementsByClassName(css.wLimitedListItem.val, function(listItemEls) {
                    expect(listItemEls.length).to.be.above(0);
                    done();
                }, document.getElementsByClassName(css.rSlidingMenu.searches.val)[0], 18000);

                currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
            });
        });

        describe('Handle errors returned while loading list', function() {
            var errBody = {
                internalErrorCode: 1001,
                userMessage: { title: 'Access Denied', body: 'Dummy text'}
            };
            it('Show the Access Denied error in saved searches area when no capabilities for saved searches', function(done) {
                var favouriteId = REST_collection_scenarios.queryResponseMappings.MediumCollection.response.id;
                var favouriteName = REST_collection_scenarios.queryResponseMappings.MediumCollection.response.name;
                REST_ui_settings.respondToNetworkExplorerFavorites(server, [{'id': favouriteId, 'value': 'true' }]);
                REST_collection_scenarios.applyScenario(server);
                // the get for saved searches should return Access Denied error
                server.respondWith('GET', '/topologyCollections/savedSearches',
                    function(xhr) { xhr.respond(403, {'Content-type': 'application/json'}, JSON.stringify(errBody)); });

                // start application
                currentApp.start(container);

                promises.runTestSteps([
                    function() {
                        currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
                        return SlidingMenuViewModel.waitForCollectionListItems();
                    },
                    function(listItems) {
                        expect(listItems.length).to.be.above(0);
                        return SlidingMenuViewModel.waitForSavedSearchError();
                    },
                    function(elError) {
                        expect(elError[0].textContent.trim()).to.contain('Access Denied');
                        return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenu-favoritesLists-collections .eaNetworkExplorer-wLimitedListItem-link[href="#networkexplorer/collection/'+favouriteId+'"]', 3000);
                    },
                    function(linkElement) {
                        expect(linkElement[0].textContent.trim()).to.contain(favouriteName);
                        done();
                    }
                ]);
            });
            it('Show the Access Denied error in collection area when no capabilities for collection', function(done) {
                var favouriteId = REST_savedSearch_scenarios.queryResponseMappings.savedSearch5.response.poId;
                var favouriteName = REST_savedSearch_scenarios.queryResponseMappings.savedSearch5.response.name;
                REST_ui_settings.respondToNetworkExplorerFavorites(server, [{'id': favouriteId, 'value': 'true' }]);
                REST_savedSearch_scenarios.applyScenario(server);
                // the get for collections return Access Denied error
                REST_object_configuration.respondToCollectionList(server, errBody, 403);

                // start application
                currentApp.start(container);

                promises.runTestSteps([
                    function() {
                        currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
                        return SlidingMenuViewModel.waitForSavedSearchListItems();
                    },
                    function(listItems) {
                        expect(listItems.length).to.be.above(0);
                        return SlidingMenuViewModel.waitForCollectionError();
                    },
                    function(elError) {
                        expect(elError[0].textContent.trim()).to.contain('Access Denied');
                        return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenu-favoritesLists-savedSearches .eaNetworkExplorer-wLimitedListItem-link[href="#networkexplorer/savedsearch/'+favouriteId+'"]', 30000);
                    },
                    function(linkElement) {
                        expect(linkElement[0].textContent.trim()).to.contain(favouriteName);
                        done();
                    }
                ]);
            });
            it('Show the Access Denied error in either areas when no capabilities for collection and saved searches', function(done) {
                REST_ui_settings.respondToNetworkExplorerFavorites(server, [{'id': 123456, 'value': 'true' }]);
                // the get for collections return Access Denied error
                REST_object_configuration.respondToCollectionList(server, errBody, 403);
                // the get for saved searches should return Access Denied error
                server.respondWith('GET', '/topologyCollections/savedSearches',
                    function(xhr) { xhr.respond(403, {'Content-type': 'application/json'}, JSON.stringify(errBody)); });

                // start application
                currentApp.start(container);

                promises.runTestSteps([
                    function() {
                        currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
                        return SlidingMenuViewModel.waitForCollectionError();
                    },
                    function(elError) {
                        expect(elError[0].textContent.trim()).to.contain('Access Denied');
                        return SlidingMenuViewModel.waitForSavedSearchError();
                    },
                    function(elError) {
                        expect(elError[0].textContent.trim()).to.contain('Access Denied');
                        return SlidingMenuViewModel.waitForFavoritesListTextToAppear();
                    },
                    function(p$placeholderText) {
                        expect(p$placeholderText[0].textContent.trim()).to.equal('You have no favorite searches or collections. To Favorite one, just click the star icon next to the item.');
                        done();
                    }
                ]);
            });
            it('Show the error either in collection and saved searches area when error returned loading favourites', function(done) {
                REST_collection_scenarios.applyScenario(server);
                REST_savedSearch_scenarios.applyScenario(server);
                // the get for favourites return Access Denied error
                REST_savedSearch_scenarios.setErrorCode(1001);
                server.respondWith('GET', '/rest/ui/settings/networkexplorer/favorites',
                    function(xhr) { xhr.respond(500, {'Content-type': 'application/json'}, '{dummy'); });

                // start application
                currentApp.start(container);

                promises.runTestSteps([
                    function() {
                        currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
                        return SlidingMenuViewModel.waitForCollectionError();
                    },
                    function(elError) {
                        expect(elError[0].textContent.trim()).to.contain('Unknown Server Error');
                        return SlidingMenuViewModel.waitForSavedSearchError();
                    },
                    function(elError) {
                        expect(elError[0].textContent.trim()).to.contain('Unknown Server Error');
                        return SlidingMenuViewModel.waitForFavoritesListTextToAppear();
                    },
                    function(p$placeholderText) {
                        expect(p$placeholderText[0].textContent.trim()).to.equal('You have no favorite searches or collections. To Favorite one, just click the star icon next to the item.');
                        done();
                    }
                ]);
            });
            it('Backward compatibility: When services are up but an unknown endpoint error is returned while loading collections v2, fallback to v1', function(done) {
                // v2 is not present
                REST_object_configuration.respondToCollectionList(server, {
                    'userMessage': {
                        'title': 'Unknown Exception',
                        'body': 'RESTEASY001185: Could not find resource for relative : /collections/v2 of full path: ...'
                    },
                    'internalErrorCode': 0
                }, 500); // 17.11 - (17.14?)
                // v1 returns a collection
                var collectionName = 'x';
                REST_object_configuration.respondToCollectionListV1(server, {'collections': [
                    {'name': collectionName,'id': '1','timeCreated': 1,'lastUpdated': 1,'userId': 'a','category': 'Private','readOnly': false,'update': true,'delete': true,'sortable': false}
                ]}, 200);
                REST_savedSearch_scenarios.setErrorCode(1001);
                // No favorites
                REST_ui_settings.respondToNetworkExplorerFavorites(server);
                currentApp.start(container); // Init test application
                promises.runTestSteps([
                    function() {
                        currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
                        return SlidingMenuViewModel.waitForCollectionListItems();
                    },
                    function(items) {
                        expect(items[0].textContent.trim()).to.equal(collectionName);
                        done();
                    }
                ]);
            });
        });

        describe('Load lists with duplicate names', function() {
            beforeEach(function() {
                REST_collection_scenarios.applyScenario(server);
                REST_savedSearch_scenarios.applyScenario(server);
                REST_ui_settings.respondToNetworkExplorerFavorites(server, []);
                // start application
                currentApp.start(container);
            });
            it('The order of the collections is correct and Duplicates show the category (Private/Public) beside the collection', function(done) {
                promises.runTestSteps([
                    SlidingMenuViewModel.waitForCollectionListItems,
                    function(listItems) {
                        // Relies on the mock staying as having duplicates at index 0 and 4
                        expect(listItems[0].textContent.trim().replace(/\s+/g, ' ')).to.equal(
                            REST_collection_scenarios.queryResponseMappings.ManagedElementsCollection.response.name +
                            ' (' + REST_collection_scenarios.queryResponseMappings.ManagedElementsCollection.response.category + ')'
                        );
                        expect(listItems[1].textContent.trim().replace(/\s+/g, ' ')).to.equal(
                            REST_collection_scenarios.queryResponseMappings.MeContextCollection.response.name
                        );
                        expect(listItems[2].textContent.trim().replace(/\s+/g, ' ')).to.equal(
                            REST_collection_scenarios.queryResponseMappings.MediumCollection.response.name
                        );
                        expect(listItems[3].textContent.trim().replace(/\s+/g, ' ')).to.equal(
                            REST_collection_scenarios.queryResponseMappings.SmallPrivateCollection.response.name +
                            ' (' + REST_collection_scenarios.queryResponseMappings.SmallPrivateCollection.response.category + ')'
                        );
                        expect(listItems[4].textContent.trim().replace(/\s+/g, ' ')).to.equal(
                            REST_collection_scenarios.queryResponseMappings.LongNameCollection.response.name
                        );
                        done();
                    }
                ]);
                currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
            });
            it('The order of the saved searches is correct and Duplicates show the category (Private/Public) beside the saved search', function(done) {
                promises.runTestSteps([
                    SlidingMenuViewModel.waitForSavedSearchListItems,
                    function(listItems) {
                        // Relies on the mock staying as having duplicates at index 1 and 3
                        expect(listItems[0].textContent.trim().replace(/\s+/g, ' ')).to.equal(
                            REST_savedSearch_scenarios.queryResponseMappings.savedSearch8.response.name
                        );
                        expect(listItems[1].textContent.trim().replace(/\s+/g, ' ')).to.equal(
                            REST_savedSearch_scenarios.queryResponseMappings.savedSearch1.response.name +
                            ' (' + REST_savedSearch_scenarios.queryResponseMappings.savedSearch1.response.attributes.category + ')'
                        );
                        expect(listItems[2].textContent.trim().replace(/\s+/g, ' ')).to.equal(
                            REST_savedSearch_scenarios.queryResponseMappings.savedSearch5.response.name
                        );
                        expect(listItems[3].textContent.trim().replace(/\s+/g, ' ')).to.equal(
                            REST_savedSearch_scenarios.queryResponseMappings.savedSearch4.response.name +
                            ' (' + REST_savedSearch_scenarios.queryResponseMappings.savedSearch4.response.attributes.category + ')'
                        );
                        expect(listItems[4].textContent.trim().replace(/\s+/g, ' ')).to.equal(
                            REST_savedSearch_scenarios.queryResponseMappings.savedSearch7.response.name
                        );
                        done();
                    }
                ]);
                currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
            });
        });

        describe('Load favorites', function() {
            it('When there are no favourites the correct message appears', function(done) {
                REST_ui_settings.respondToNetworkExplorerFavorites(server, []);
                REST_object_configuration.respondToCollectionList(server, []); //must load too
                REST_topologyCollections.respondToSavedSearchesList(server, []); //must load too
                // start application.
                currentApp.start(container);
                promises.runTestSteps([
                    function() {
                        currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
                        return Promise.resolve();
                    },
                    SlidingMenuViewModel.waitForFavoritesListTextToAppear,
                    function(p$placeholderText) {
                        expect(p$placeholderText[0].textContent.trim()).to.equal('You have no favorite searches or collections. To Favorite one, just click the star icon next to the item.');
                        done();
                    }
                ]);
            });
            it('Favourite collections appear in the correct section', function(done) {
                this.timeout(10000);
                var collectionId = '123';
                var aFavoriteObject = [{
                    'id': collectionId,
                    'value': 'true'
                }];
                var collections = [{
                    'name': 'CollectionName',
                    'id': collectionId,
                    'category': 'Private',
                    'userId': 'xxxxxxx',
                    'timeCreated': '10000000000000000'
                }];
                REST_ui_settings.respondToNetworkExplorerFavorites(server, aFavoriteObject);
                REST_object_configuration.respondToCollectionList(server, collections);
                REST_topologyCollections.respondToSavedSearchesList(server, []); //must load too
                // start application.
                currentApp.start(container);
                promises.runTestSteps([
                    function() {
                        currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
                        return Promise.resolve();
                    },
                    //SlidingMenuViewModel.waitForFavoritesListTextToDisappear,
                    //SlidingMenuViewModel.waitForFavoritesLoadingToDisappear,
                    function() {
                        return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenu-favoritesLists-collections .eaNetworkExplorer-wLimitedListItem-link[href="#networkexplorer/collection/'+collectionId+'"]', 3000);
                    },
                    function(linkElement) {
                        expect(linkElement[0].textContent.trim()).to.equal('CollectionName');
                        done();
                    }
                ]);
            });
            it('Favourite saved searches appear in the correct section', function(done) {
                var savedSearchId = '123';
                var aFavoriteObject = [{
                    'id': savedSearchId,
                    'value': 'true'
                }];
                var collections = [{
                    'name': 'SavedSearchName',
                    'type': 'SavedSearch',
                    'poId': savedSearchId,
                    'attributes': {
                        'category': 'Private',
                        'name': 'SavedSearchName',
                        'userId': 'xxxxxxx',
                        'timeCreated': '10000000000000000'
                    },
                    'deletable': false
                }];
                REST_ui_settings.respondToNetworkExplorerFavorites(server, aFavoriteObject);
                REST_object_configuration.respondToCollectionList(server);
                REST_topologyCollections.respondToSavedSearchesList(server, collections);
                // start application.
                currentApp.start(container);
                promises.runTestSteps(
                    [
                        function() {
                            currentApp.getEventBus().publish('NetworkExplorer:appLoaded');
                            return Promise.resolve();
                        },
                        SlidingMenuViewModel.waitForFavoritesListTextToDisappear,
                        SlidingMenuViewModel.waitForFavoritesLoadingToDisappear,
                        function() {
                            return promises.waitForElementVisible('.eaNetworkExplorer-rSlidingMenu-favoritesLists-savedSearches .eaNetworkExplorer-wLimitedListItem-link[href="#networkexplorer/savedsearch/'+savedSearchId+'"]', 30000);
                        },
                        function(linkElement) {
                            expect(linkElement[0].textContent.trim()).to.equal('SavedSearchName');
                            return Promise.resolve();
                        },
                        done
                    ]
                );
            });
        });

    });

});
