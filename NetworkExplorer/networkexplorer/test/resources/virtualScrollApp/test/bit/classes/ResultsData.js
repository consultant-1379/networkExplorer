define([
    'virtualScrollApp/classes/Cache',
    'virtualScrollApp/classes/VirtualScrollingData',
    'jscore/core'
], function(Cache,
    VirtualScrollingData,
    core) {

    describe('ResultsData', function() {


        var server;
        // array of strings with ID 0...N-1
        var posRequest = Array.apply(null, {length: 10}).map(Function.call, String);
        var resultsData = new VirtualScrollingData();
        var posResponse = posRequest
            .map(function(poId) {
                return {poId: poId};
            });

        var posResponseStringified = [
            200,
            {'Content-type': 'application/json'},
            JSON.stringify(posResponse)
        ];


        beforeEach(function() {
            server = sinon.fakeServer.create();
            server.autoRespond = true;
            server.autoRespondAfter = 10;
            server.respondWith(
                'POST',
                '/managedObjects/getPosByPoIds',
                posResponseStringified
            );
        });

        afterEach(function() {
            server.restore();
        });

        describe('Load data', function() {
            it('should return return the requested data', function(done) {
                var dataPromise = resultsData.loadData(0, 10);
                dataPromise.then(function(response) {
                    expect(response.data).to.deep.equal(posResponse);
                    done();
                });
            });

            it('should return only a subset of the available objects', function(done) {
                var dataPromise = resultsData.loadData(0, 5);
                dataPromise.then(function(response) {
                    expect(response.data).to.deep.equal(posResponse.slice(0, 5));
                    done();
                });
            });
        });
    });
});
