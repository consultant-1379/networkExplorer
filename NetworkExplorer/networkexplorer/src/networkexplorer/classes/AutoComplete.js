define(function() {
    /**
     * A class for providing auto complete suggestions.
     *
     * Works off a grammar format in the form of:
     * {
     *     rules: [
     *         {
     *             keys: [
     *                 'select'
     *             ],
     *             regex: [
     *                 /^$/
     *             ]
     *         },
     *         {
     *             keys: [
     *                 'where',
     *                 'with'
     *             ],
     *             regex: [
     *                 /^(?:select )?([a-zA-Z0-9-_.]+) $/
     *             ]
     *         },
     *     ...
     *     ],
     *     keywords: [
     *         'select',
     *         'where',
     *         'with'
     *     ]
     * }
     *
     * All keywords should be non-matching groups, by having the first two characters in matching group as "?:".
     * Dynamic values should be matching groups. AutoComplete will only accept these patterns if the dynamic values do
     * not match keywords defined in the keywords array.
     *
     * @class AutoComplete
     * @constructor
     * @param {Object} grammar
     */
    var AutoComplete = function(grammar) {
        this.grammar = grammar;
        this.currentSuggestions = [];
        this.currentInput = '';
        this.suggestionPositions = [];
    };

    AutoComplete.prototype = {

        /**
         * Gets the list of suggestions valid for the current input. Gets a new base set of suggestions if the input
         * ends with a space, otherwise gets a filtered list based on the last base set and the input.
         *
         * @method getSuggestions
         * @param {String} input
         * @return {Array} suggestions
         */
        getSuggestions: function(input) {
            var filteredSuggestions = this.getFilteredSuggestions(input);
            if (filteredSuggestions.length === 0 && (input === '' || input.match(/ $/))) {
                return this.getBaseSuggestions(input);
            } else if (filteredSuggestions.length > 0) {
                return filteredSuggestions;
            } else {
                return [];
            }
        },

        /**
         * Gets the current list of suggestions. Updates the list of suggestions first if input has been shortened
         * beyond the generation of current list. If the input has changed in any way other than appending characters,
         * the suggestions and auto complete indexes are reset
         *
         * @method getCurrentSuggestions
         * @param {String} input
         * @return {Array} currentSuggestions
         */
        getCurrentSuggestions: function(input) {
            var currentIndexChanged = false;
            while (input.length <= this.getPositionOfLastSuggestions()) {
                currentIndexChanged = true;
                this.suggestionPositions.pop();
            }
            if (currentIndexChanged) {
                this.currentSuggestions = this.getBaseSuggestions(input.substr(0, this.getPositionOfLastSuggestions()));
            }
            this.currentInput = input;
            return this.currentSuggestions;
        },

        /**
         * Gets a filtered list of suggestions from the current suggestions based on input.
         *
         * @method getFilteredSuggestions
         * @param {String} input
         * @return {Array} filteredSuggestions
         */
        getFilteredSuggestions: function(input) {
            var currentSuggestions = this.getCurrentSuggestions(input);
            var currentKeyword = input.substr(this.getPositionOfLastSuggestions());
            var filteredSuggestions = [];
            if (currentKeyword !== '') {
                filteredSuggestions = filteredSuggestions.concat(this.filterMatchingKeywords(currentSuggestions, currentKeyword));
                var currentSuggestedFilters = currentSuggestions.find(function(obj) { return obj.filters; }) || { filters: [] };
                var validFilters = this.filterMatchingKeywords(currentSuggestedFilters.filters, currentKeyword);
                if (validFilters.length > 0) {
                    filteredSuggestions.push({filters: validFilters});
                }
            }
            return filteredSuggestions;
        },

        /**
         * Filter matching strings from the given list and keyword.
         *
         * @method filterMatchingKeywords
         * @param {Array} suggestions a list of autocomplete strings
         * @param {String} keyword the keyword to match
         * @returns {Array} a list of strings that match the given keyword
         */
        filterMatchingKeywords: function(suggestions, keyword) {
            return suggestions.filter(function(suggestion) {
                return typeof suggestion === 'string' && suggestion.indexOf(keyword) === 0;
            });
        },

        /**
         * Gets a new base set of suggestions from the input.
         * Will return keywords based solely on the regular expressions in the grammar.
         *
         * @method getBaseSuggestions
         * @param {String} input
         * @return {Array} baseSuggestions
         */
        getBaseSuggestions: function(input) {
            var suggestions = [];
            for (var i = 0; i < this.grammar.rules.length; i++) {
                for (var j = 0; j < this.grammar.rules[i].regex.length; j++) {
                    var matchesRegex = this.matchesRegex(input, this.grammar.rules[i].regex[j]);
                    if (matchesRegex) {
                        suggestions.push.apply(suggestions, this.grammar.rules[i].keys);
                        break;
                    }
                }
            }
            if (this.getPositionOfLastSuggestions() !== input.length) {
                this.suggestionPositions.push(input.length);
            }
            this.currentSuggestions = suggestions;
            return suggestions;
        },

        /**
         * Checks if the input matches the given regex, and that none of the matching groups are keywords.
         *
         * @method matchesRegex
         * @param {String} input
         * @param {RegExp} regex
         * @return {Boolean} matchesRegex
         */
        matchesRegex: function(input, regex) {
            var matches = input.match(regex);
            if (matches) {
                var matchesRegex = true;
                for (var i = 1; i < matches.length; i++) {
                    if (this.grammar.keywords.indexOf(matches[i]) > -1) {
                        matchesRegex = false;
                        break;
                    }
                }
                return matchesRegex;
            } else {
                return false;
            }
        },

        /**
         * Gets the last position from which a new set of suggestions was last given.
         *
         * @method getPositionOfLastSuggestions
         * @return {Number} suggestionPositions
         */
        getPositionOfLastSuggestions: function() {
            return this.suggestionPositions[this.suggestionPositions.length - 1];
        }
    };

    return AutoComplete;
});
