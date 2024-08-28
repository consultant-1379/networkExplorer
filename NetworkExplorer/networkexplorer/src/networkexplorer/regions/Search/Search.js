define([
    'jscore/core',
    'jscore/ext/net',
    './SearchView',
    'widgets/InfoPopup',
    '../../widgets/SearchInput/SearchInput',
    'i18n!networkexplorer/app.json'
], function(core, net, View, InfoPopup, SearchInput, strings) {

    return core.Region.extend({
        View: View,

        /**
         * Lifecycle Method
         */
        onStart: function() {
            this.currentSearch = null;
            this.searchInput = new SearchInput();
            this.searchInput.addEventHandler('invalidQuery', this.onInvalidQuery, this);
            this.searchInput.addEventHandler('validQuery', this.onValidQuery, this);
            this.searchInput.attachTo(this.view.getSearchInput());
            // popup to appear when info icon is clicked.
            this.infoPopup = new InfoPopup({
                content: strings.get('sampleSearches')
            });
            this.infoPopup.attachTo(this.view.getInfoIconHolder());

            this.getEventBus().subscribe('NetworkExplorer:searchHash', this.decodeAndSetSearchField, this);
            this.getEventBus().subscribe('Results:setSearchField', this.setSearchField, this);
            this.getEventBus().subscribe('QueryBuilder:setSearchField', this.setSearchField, this); // compliant with team's event naming strategy
            this.getEventBus().subscribe('NetworkExplorer:collectionHash', this.clearSearchField, this);
            this.getEventBus().subscribe('NetworkExplorer:defaultHash', this.clearSearchField, this);
            this.getEventBus().subscribe('QueryBuilder:showSearchRegion', this.show, this);
            this.getEventBus().subscribe('QueryBuilder:cancelSearch', this.cancelSearch, this);
            this.getEventBus().subscribe('Results:collectionFetchError', this.clearSearchField, this);

            this.view.addSearchFormHandler('submit', this.handleSearch, this);
            this.view.addSwitchButtonClickHandler(this.switchToQueryBuilderButtonAction, this);
        },

        onInvalidQuery: function(errorIndex) {
            this.view.disableSearchButton();
            if (this.searchInput.getValue() === '') {
                this.view.hideValidationErrorIcon();
            } else {
                this.view.showValidationErrorIcon();
                if (errorIndex) {
                    this.view.setValidationErrorIconTitle(strings.get('errorAtCharacter').replace('$1', errorIndex));
                }
            }
        },

        onValidQuery: function() {
            this.view.hideValidationErrorIcon();
            if (this.searchInput.getValue() !== '') {
                this.view.enableSearchButton();
            }
        },

        // method like this enhance visibility of Class behaviour!
        show: function() {
            this.searchInput.enableAutoComplete();
            this.view.show();
        },

        // Publish a search event on the eventBus with search details for other Regions to subscribe to.
        handleSearch: function() {
            this.currentSearch = this.searchInput.getValue();

            var searchUrlPart = 'search/' + encodeURIComponent(this.currentSearch);

            // Escape all special characters. Fixes issue when asterisk symbol from query is treated as a regex reserved
            // symbol. Escaping special characters makes asterisk a part of a match instead.
            var searchUrlEscapedSpecialCharacters = searchUrlPart.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            var searchPattern = new RegExp(searchUrlEscapedSpecialCharacters + '(\\?|$)');

            this.getEventBus().publish('Search:resetLastLoadedSearchQuery', this);

            // when search hash has not changed.
            var currentLocation = location.href.substr(location.href.indexOf('#') + 1);
            if (currentLocation.match(searchPattern)) {
                this.getEventBus().publish('Search:searchSubmit', encodeURIComponent(this.currentSearch));
            } else { // when search hash changed
                this.getEventBus().publish('Search:setLocation', searchUrlPart);
            }
        },

        cancelSearch: function() {
            this.getEventBus().publish('Search:cancelSearch');
        },

        decodeAndSetSearchField: function(val) {
            this.setSearchField(val, true);
        },

        setSearchField: function(val, decode) {
            if (decode) {
                this.currentSearch = decodeURIComponent(val);
            } else {
                this.currentSearch = val;
            }
            this.searchInput.setValue(this.currentSearch);
        },

        clearSearchField: function() {
            this.searchInput.clearSearchField();
        },

        switchToQueryBuilderButtonAction: function() {
            this.searchInput.disableAutoComplete();
            // hide this region!
            this.view.hide();
            // notify other regions!
            this.getEventBus().publish('Search:showQueryBuilder',this.searchInput.getValue());
            this.getEventBus().publish('Search:SearchHidden');
        }
    });
});
