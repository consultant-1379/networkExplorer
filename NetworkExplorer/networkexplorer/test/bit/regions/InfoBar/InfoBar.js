/*global define, describe, it, expect */
define([
    'jscore/core',
    'src/networkexplorer/regions/InfoBar/InfoBar',
    'jscore/ext/mvp'
], function(core, InfoBarRegion, mvp) {
    'use strict';

    describe('bit/regions/InfoBar/InfoBar.js', function() {

        var currentApp, AppWithCollectionActionBar;

        beforeEach(function(done) {

            // Create a generic app with View and root DOM element.
            AppWithCollectionActionBar = core.App.extend({

                View: core.View.extend({
                    getTemplate: function() {
                        return '<div></div>';
                    }
                }),

                // Place CollectionActionBar Region into a generic app.
                onStart: function() {
                    this.results = new InfoBarRegion({
                        context: this.getContext(),
                        favoritesCollection: new mvp.Collection()
                    });
                    this.results.start(this.getElement());
                }
            });
            currentApp = new AppWithCollectionActionBar();

            // start application.
            currentApp.start(document.getElementById('bitContainer'));
            done();
        });

        afterEach(function() {
            currentApp.stop();
        });

        describe('Execute: publish Results:showInfo event with generic Results:showInfo.', function() {
            it('Verify: Region has rendered correct collection data based on the Results:showInfo event.', function() {
                // ARRANGE
                var infoData = {
                    name: 'TestCollection',
                    type: 'collection'
                };

                // ACT
                currentApp.getContext().eventBus.publish('Results:showInfo', infoData);

                // ASSERT
                expect(currentApp.results.view.getInfoNameEl().getText()).to.equal('TestCollection');
                expect(currentApp.results.view.getInfoTypeEl().getText()).to.equal('Collection');

            });

            it('Verify: Region has rendered correct savedSearch data based on the Results:showInfo event.', function() {
                // ARRANGE
                var infoData = {
                    name: 'TestCollection',
                    type: 'savedSearch'
                };

                // ACT
                currentApp.getContext().eventBus.publish('Results:showInfo', infoData);

                // ASSERT
                expect(currentApp.results.view.getInfoNameEl().getText()).to.equal('TestCollection');
                expect(currentApp.results.view.getInfoTypeEl().getText()).to.equal('Saved Search');
            });
        });

        describe('Execute: trigger defaultHash event', function() {
            it('Verify: search field is cleared', function() {
                // ACT
                currentApp.getEventBus().publish('NetworkExplorer:defaultHash');

                // ASSERT
                expect(currentApp.results.view.getInfoNameEl().getText()).to.equal('');
                expect(currentApp.results.view.getInfoTypeEl().getText()).to.equal('');
            });
        });

        describe('Should show the close collection button and clicking on it should be navigated to network explorer page', function() {
            it('Verify: close collection button', function(done) {

                //ACT
                var closeCollectionButton = currentApp.getElement().find('.eaNetworkExplorer-rInfoBar-closeCollection');

                // ASSERT
                expect(closeCollectionButton).to.be.defined;
                expect(closeCollectionButton.children()[1].getText()).to.equal('Close');

                closeCollectionButton.children()[1].trigger('click');
                //wait for some millisecond
                setTimeout(function() {

                    expect(location.hash).to.be.equal('#networkexplorer');
                    done();

                }, 500);

            });
        });
    });
});
