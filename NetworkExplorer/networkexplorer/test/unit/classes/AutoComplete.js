define([
    'networkexplorer/classes/AutoComplete',
    './autoCompleteGrammarMock'
], function(AutoComplete, autoCompleteGrammar) {

    describe('AutoComplete', function() {

        var _sandbox, classUnderTest;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            classUnderTest = new AutoComplete(autoCompleteGrammar);
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('getSuggestions()', function() {
            beforeEach(function() {
                _sandbox.stub(classUnderTest, 'getFilteredSuggestions');
                _sandbox.stub(classUnderTest, 'getBaseSuggestions');
            });

            it('should return a new set of base suggestions ' +
                'when there are no filtered suggestions and input is an empty string', function() {
                // ARRANGE
                classUnderTest.getFilteredSuggestions.returns([]);
                classUnderTest.getBaseSuggestions.returns('baseSuggestions');

                // ACT + ASSERT
                expect(classUnderTest.getSuggestions('')).to.equal('baseSuggestions');
            });

            it('should return a new set of base suggestions ' +
                'when there are no filtered suggestions and input ends with a space', function() {
                // ARRANGE
                classUnderTest.getFilteredSuggestions.returns([]);
                classUnderTest.getBaseSuggestions.returns('baseSuggestions');

                // ACT + ASSERT
                expect(classUnderTest.getSuggestions('select ')).to.equal('baseSuggestions');
            });

            it('should return a this filtered suggestions if there is any', function() {
                // ARRANGE
                classUnderTest.getFilteredSuggestions.returns(['suggestion1']);

                // ACT + ASSERT
                expect(classUnderTest.getSuggestions('')).to.deep.equal(['suggestion1']);
            });

            it('should return an empty array and set currentSuggestions to an empty array ' +
                'when there are no filtered suggestions and input is not empty or end in a space', function() {
                // ARRANGE
                classUnderTest.getFilteredSuggestions.returns([]);

                // ACT + ASSERT
                expect(classUnderTest.getSuggestions('select')).to.deep.equal([]);
                expect(classUnderTest.currentSuggestions).to.deep.equal([]);

            });
        });

        describe('getCurrentSuggestions()', function() {
            beforeEach(function() {
                _sandbox.stub(classUnderTest, 'getBaseSuggestions');
            });

            it('should update currentInput and return the currentSuggestions '+
                'when input length is greater than the auto complete index', function() {
                // ARRANGE
                classUnderTest.suggestionPositions = [0, 7];
                classUnderTest.currentSuggestions = 'currentSuggestions';

                // ACT + ASSERT
                expect(classUnderTest.getCurrentSuggestions('select all')).to.equal('currentSuggestions');
                expect(classUnderTest.currentInput).to.equal('select all');
            });

            it('should pop from the suggestionPositions array until the last entry is <= the input length '+
                'and get a new base set of suggestions from the new suggestionPositions ' +
                'when input length is <= the auto complete index', function() {
                // ARRANGE
                classUnderTest.suggestionPositions = [0, 7, 14, 20];
                classUnderTest.currentSuggestions = 'currentSuggestions';
                classUnderTest.getBaseSuggestions.returns('newBaseSuggestions');

                // ACT + ASSERT
                expect(classUnderTest.getCurrentSuggestions('select all')).to.equal('newBaseSuggestions');
                expect(classUnderTest.suggestionPositions).to.deep.equal([0, 7]);
                expect(classUnderTest.currentSuggestions).to.equal('newBaseSuggestions');
                expect(classUnderTest.currentInput).to.equal('select all');
            });
        });

        describe('getFilteredSuggestions()', function() {
            beforeEach(function() {
                _sandbox.stub(classUnderTest, 'getCurrentSuggestions');
                _sandbox.stub(classUnderTest, 'getPositionOfLastSuggestions');
            });

            it('should return an empty array when currentKeyword is an empty string', function() {
                // ARRANGE
                classUnderTest.getCurrentSuggestions.returns(['test']);
                classUnderTest.getPositionOfLastSuggestions.returns(7);

                // ACT + ASSERT
                expect(classUnderTest.getFilteredSuggestions('select ')).to.deep.equal([]);
            });

            it('should return an empty array when there are no currentSuggestions', function() {
                // ARRANGE
                classUnderTest.getCurrentSuggestions.returns([]);
                classUnderTest.getPositionOfLastSuggestions.returns(0);

                // ACT+ ASSERT
                expect(classUnderTest.getFilteredSuggestions('test')).to.deep.equal([]);
            });

            it('should return an empty array when there are currentSuggestions, but none match the currentKeyword', function() {
                // ARRANGE
                classUnderTest.getCurrentSuggestions.returns(['all', 'search', 'collection']);
                classUnderTest.getPositionOfLastSuggestions.returns(7);

                // ACT+ ASSERT
                expect(classUnderTest.getFilteredSuggestions('select node')).to.deep.equal([]);
            });

            it('should return an empty array when there are currentSuggestions, but none match the currentKeyword', function() {
                // ARRANGE
                classUnderTest.getCurrentSuggestions.returns(['all', 'all objects of type', 'search', 'collection']);
                classUnderTest.getPositionOfLastSuggestions.returns(7);

                // ACT+ ASSERT
                expect(classUnderTest.getFilteredSuggestions('select al')).to.deep.equal(['all', 'all objects of type']);
            });
        });

        describe('getBaseSuggestions()', function() {
            it('should return the correct base suggestions for the input', function() {
                // ACT + ASSERT
                expect(classUnderTest.getBaseSuggestions('select MeContext ')).to.deep.equal(['where', 'from', 'with']);
                expect(classUnderTest.getBaseSuggestions('select MeContext where object MeContext ')).to.deep.equal(['has attr', 'has parent', 'has child', 'has']);
                expect(classUnderTest.getBaseSuggestions('select MeContext where object MeContext has attr neType = ERBS ')).to.deep.equal(['and', 'from', 'or attr']);
            });

            it('should return no suggestions if there are none for the input', function() {
                // ACT + ASSERT
                expect(classUnderTest.getBaseSuggestions('MeContext from node type ERBS ')).to.deep.equal([]);
            });

            it('should add the input length to the suggestionPositions array if the input length doesnt equal', function() {
                // ARRANGE
                classUnderTest.suggestionPositions = [0];

                // ACT
                classUnderTest.getBaseSuggestions('select ');

                // ASSERT
                expect(classUnderTest.suggestionPositions).to.deep.equal([0, 7]);
            });

            it('should not add the input length to the suggestionPositions array ' +
                'when the input length is the same as the last item in suggestionPositions', function() {
                // ARRANGE
                classUnderTest.suggestionPositions = [0, 7];

                // ACT
                classUnderTest.getBaseSuggestions('select ');

                // ASSERT
                expect(classUnderTest.suggestionPositions).to.deep.equal([0, 7]);
            });
        });

        describe('matchesRegex()', function() {
            it('should return false if there are no matches for the regex', function() {
                // ACT + ASSERT
                expect(classUnderTest.matchesRegex('something', /(else)/)).to.equal(false);
            });

            it('should return false if there are matches, but one match is a keyword', function() {
                // ARRANGE
                classUnderTest.grammar.keywords = ['keyword', 'key', 'word'];

                // ACT + ASSERT
                expect(classUnderTest.matchesRegex('this is a keyword', /(this) is a (keyword)/)).to.equal(false);
            });

            it('should return true if there are matches, and no matches are keyword', function() {
                // ARRANGE
                classUnderTest.grammar.keywords = ['select', 'all', 'search'];

                // ACT + ASSERT
                expect(classUnderTest.matchesRegex('this is not a keyword', /(this) is not a (keyword)/)).to.equal(true);
            });
        });

        describe('getPositionOfLastSuggestions()', function() {
            it('should return the last item in the suggestionPositions array', function() {
                // ARRANGE
                classUnderTest.suggestionPositions = [0, 7, 20];

                // ACT + ASSERT
                expect(classUnderTest.getPositionOfLastSuggestions()).to.equal(20);
            });
        });

    });

});
