define([
    'jscore/core',
    'jscore/ext/mvp',
    'networkexplorer/regions/Main/Main',
    'networkexplorer/regions/Main/MainView',
    'networkexplorer/regions/InfoBar/InfoBar',
    'networkexplorer/regions/Search/Search',
    'networkexplorerlib/regions/Results',
    'networkexplorerlib/regions/QueryBuilder'

], function(core, mvp, Main, View, InfoBar, Search, Results, QueryBuilder) {
    describe('Main', function() {
        var _sandbox, classUnderTest;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();

            _sandbox.stub(InfoBar.prototype);
            _sandbox.stub(Search.prototype);
            _sandbox.stub(Results.prototype);
            _sandbox.stub(QueryBuilder.prototype);

            classUnderTest = new Main();
            classUnderTest.view = _sandbox.stub(new View());
        });

        afterEach(function() {
            _sandbox.restore();
        });

        describe('onStart()', function() {
            it('should create and start sub-Regions', function() {
                // ARRANGE

                // ACT
                classUnderTest.onStart();

                // ASSERT
                expect(classUnderTest.InfoBar).to.not.equal(undefined);
                expect(classUnderTest.InfoBar.start.callCount).to.equal(1);
                expect(classUnderTest.Search).to.not.equal(undefined);
                expect(classUnderTest.Search.start.callCount).to.equal(1);
                expect(classUnderTest.QueryBuilder).to.not.equal(undefined);
                expect(classUnderTest.QueryBuilder.start.callCount).to.equal(1);
                expect(classUnderTest.Results).to.not.equal(undefined);
                expect(classUnderTest.Results.start.callCount).to.equal(1);
            });
        });
    });
});
