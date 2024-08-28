define([
    'jscore/core',
    'networkexplorer/actions/SaveSearch',
    'networkexplorer/regions/SaveSearch/SaveSearch',
    'container/api',
    'i18n!networkexplorer/Results.json'
], function(
    core,
    SaveSearch,
    SaveSearchRegion,
    Container,
    strings
) {
    describe('action/SaveSearch', function() {
        var _sandbox,
            contextBusStub, contextStub, options;
        const SEARCH_TERM = 'searchTerm';

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            contextBusStub = sinon.createStubInstance(core.EventBus);
            contextStub = { eventBus: contextBusStub };
            options = { context: contextStub, searchTerm: SEARCH_TERM};
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('action()', function() {
            it('should create and show the saved search flyout', function() {
                // ARRANGE
                var rec_options;
                _sandbox.spy(Container.getEventBus(), 'publish');
                Container.getEventBus().subscribe('flyout:show', function(options) {
                    rec_options = options;
                }, this);
                // ACT
                SaveSearch.action(options);
                // ASSERT
                expect(Container.getEventBus().publish.callCount).to.equal(1);
                expect(Container.getEventBus().publish.calledWith('flyout:show')).to.equal(true);
                expect(rec_options.header).to.equal(strings.get('saveCurrentSearch'));
                expect(rec_options.content).not.to.equal(undefined);
                expect(rec_options.content instanceof SaveSearchRegion).to.equal(true);
                expect(rec_options.content.options.context).to.equal(contextStub);
                expect(rec_options.content.options.data).to.equal(SEARCH_TERM);
            });
            it('should register to flyout events', function() {
                // ACT
                SaveSearch.action(options);
                // ASSERT
                expect(contextBusStub.subscribe.callCount).to.equal(2);
                expect(contextBusStub.subscribe.getCall(0).calledWith('savesearch:success', SaveSearch.publishSearchIsSavedEvent, SaveSearch)).to.equal(true);
                expect(contextBusStub.subscribe.getCall(1).calledWith('savesearch:hide', SaveSearch.hideFlyout, SaveSearch)).to.equal(true);
            });
        });

        describe('publishSearchIsSaved()', function() {
            it('should publish the search saved message', function() {
                // ARRANGE
                var savedEntityType = 'savedSearch;';
                SaveSearch.context = contextStub;
                // ACT
                SaveSearch.publishSearchIsSavedEvent(savedEntityType);
                // ASSERT
                expect(contextBusStub.publish.callCount).to.equal(2);
                expect(contextBusStub.publish.getCall(0).calledWith('Results:searchSaved', savedEntityType)).to.equal(true);
            });
            it('should publish the show toast message', function() {
                // ARRANGE
                var savedEntityType = 'savedSearch;';
                SaveSearch.context = contextStub;
                // ACT
                SaveSearch.publishSearchIsSavedEvent(savedEntityType);
                // ASSERT
                expect(contextBusStub.publish.callCount).to.equal(2);
                expect(contextBusStub.publish.getCall(1).calledWith('Results:showToastSavedSearch', {
                    label: strings.get('savedSearchSavedToastLabel'),
                    color: 'green',
                    icon: 'tick',
                    showAsToast: true,
                    showCloseButton: true
                }
                )).to.equal(true);
            });
        });

        describe('hideFlyout()', function() {
            it('should publish the hide flyout message', function() {
                // ARRANGE
                _sandbox.spy(Container.getEventBus(), 'publish');
                // ACT
                SaveSearch.hideFlyout();
                // ASSERT
                expect(Container.getEventBus().publish.callCount).to.equal(1);
                expect(Container.getEventBus().publish.calledWith('flyout:hide')).to.equal(true);
            });
        });

    });
});
