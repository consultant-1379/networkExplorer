define([
    'widgets/ItemsControl',
    './SearchInputView',
    'grammarparsinglibrary/GrammarParser',
    '../../classes/AutoComplete',
    './autoCompleteGrammar',
    'i18n!networkexplorer/SearchInput.json'
], function(ItemsControl, View, GrammarParser, AutoComplete, autoCompleteGrammar, strings) {

    return ItemsControl.extend({

        View: View,

        SINGLE_WORD_QUERY_ITEMS: [
            {
                name: strings.get('collectionName'),
                value: strings.get('collectionName')
            },
            {
                name: strings.get('nodeName'),
                value: strings.get('nodeName')
            },
            {
                name: strings.get('objectType'),
                value: strings.get('objectType')
            },
            {
                name: strings.get('savedSearchName'),
                value: strings.get('savedSearchName')
            }
        ],

        /**
         * Lifecycle Method
         */
        onControlReady: function() {
            this.autoCompleteEnabled = true;
            this.suggestions = [];
            this.grammarParser = new GrammarParser({
                url: '/networkexplorerlib/NetworkExplorer.grammar.json',
                loadCallback: this.validateQuery.bind(this)
            });
            this.autoComplete = new AutoComplete(autoCompleteGrammar);
            // Hide the cancel button when cancel button is clicked..
            this.view.addCancelButtonClickHandler(this.onSearchFieldCancel, this);
            // React to "keyup" event generated when user types in the search term.
            this.view.addSearchFieldHandler('input', this.onSearchFieldInput, this);
            this.view.addSearchFieldHandler('keyup', this.hideSuggestionsIfNotAtEnd, this);
            this.view.addSearchFieldHandler('dragend', this.hideSuggestionsIfNotAtEnd, this);
            this.view.addSearchFieldHandler('click', this.hideSuggestionsIfNotAtEnd, this);
            this.updateSuggestions('', false);
        },

        /**
         * Hide suggestions if not at end
         */
        hideSuggestionsIfNotAtEnd: function() {
            requestAnimationFrame(function() {
                var searchTerm = this.view.getSearchFieldValue();
                if (this.view.getSearchField().getProperty('selectionStart') !== searchTerm.length) {
                    this.hideList();
                } else if (this.suggestions.length > 0 && this.autoCompleteEnabled && this.isFocused()) {
                    this.showList();
                }
            }.bind(this));
        },

        isFocused: function() {
            return this.view.getSearchField().getNative() === document.activeElement;
        },

        /**
         * Get focusable element
         *
         * @returns {Element} searchField
         */
        getFocusableElement: function() {
            return this.view.getSearchField();
        },

        /**
         * Item selection handler
         *
         * @param {Object} item
         */
        onItemSelected: function(item) {
            var searchTermBeforeAutocomplete = this.view.getSearchFieldValue().substr(0, this.autoComplete.getPositionOfLastSuggestions());
            var searchTermAfterAutoComplete = searchTermBeforeAutocomplete + item.value;
            this.view.setSearchFieldValue(searchTermAfterAutoComplete);
            this.validateQuery();
            this.hideShowCancelButton(searchTermAfterAutoComplete);
        },

        /**
         * Update suggestion list
         *
         * @param {String} searchTerm
         * @param {Boolean} showSuggestions specify whether autocomplete suggestions should be shown. Optional, default value is true.
         */
        updateSuggestions: function(searchTerm, showSuggestions) {
            showSuggestions = showSuggestions !== false;
            this.suggestions = this.autoComplete.getSuggestions(searchTerm);
            if (this.suggestions.length === 0) {
                this.hideList();
                this.disable();
            } else {
                var items = this.suggestions.map(function(suggestion) {
                    if (suggestion.filters) {
                        return {
                            header: strings.get('filters'),
                            items: suggestion.filters.map(function(filter) { return { name: filter, value: filter }; })
                        };
                    } else {
                        return { name: suggestion, value: suggestion };
                    }
                });
                if (searchTerm.trim() !== '') {
                    this.setItems(items);
                } else {
                    this.setItems([
                        {
                            header: strings.get('singleWordQueries'),
                            items: this.SINGLE_WORD_QUERY_ITEMS
                        },
                        {
                            header: strings.get('advancedQueries'),
                            items: items
                        }
                    ]);
                }
                this.enable();
                if (showSuggestions && this.view.getSearchField().getProperty('selectionStart') === searchTerm.length) {
                    // Needed to defer showList until after DOM events have triggered.
                    window.requestAnimationFrame(function() {
                        if (this.autoCompleteEnabled && this.isFocused()) {
                            this.showList();
                        }
                    }.bind(this));
                }
            }
        },

        /**
         * Search field input handler
         */
        onSearchFieldInput: function() {
            this.validateQuery();
            var searchTerm = this.view.getSearchFieldValue();
            this.updateSuggestions(searchTerm);
            this.hideShowCancelButton(searchTerm);
        },

        /**
         * Performs query validation
         */
        validateQuery: function() {
            var searchTerm = this.view.getSearchFieldValue();
            var validationResult = this.grammarParser.validate('search_expression', searchTerm.trim());
            if (validationResult.grammarLoaded) {
                // match is for single word queries. Done here instead of grammar to match server-side implementation
                if (validationResult.valid || searchTerm.match(/^\*?[a-zA-Z0-9-_.]+\*?$/)) {
                    this.trigger('validQuery');
                } else {
                    this.trigger('invalidQuery', validationResult.errorIndex);
                }
            }
        },

        /**
         * Search field cancel handler
         */
        onSearchFieldCancel: function() {
            this.hideShowCancelButton('');
            this.view.setSearchFieldValue('');
            this.trigger('invalidQuery');
            this.view.focusSearchField();
            this.updateSuggestions('');
        },

        /**
         * Toggle visibility of the cancel button if there is or isn't content present in the search.
         *
         * @param {String} text
         */
        hideShowCancelButton: function(text) {
            if (text.length > 0) {
                this.view.showCancelButton();
            } else {
                this.view.hideCancelButton();
            }
        },

        /**
         * Set search field value
         *
         * @param {String} value
         */
        setValue: function(value) {
            this.view.setSearchFieldValue(value);
            this.validateQuery();
            this.hideShowCancelButton(value);
            this.updateSuggestions(value);
        },

        /**
         * Get search field value
         *
         * @returns {String} searchTerm
         */
        getValue: function() {
            return this.view.getSearchFieldValue().trim();
        },

        /**
         * Clear search field
         */
        clearSearchField: function() {
            this.view.setSearchFieldValue('');
            this.hideShowCancelButton('');
            this.updateSuggestions('', false);
            this.trigger('invalidQuery');
        },

        enableAutoComplete: function() {
            this.autoCompleteEnabled = true;
        },

        disableAutoComplete: function() {
            this.autoCompleteEnabled = false;
        }

    });

});
