/**
 *    Define all REST mocks here that are required to run an application in a positive scenario
 *    (all known REST endpoints work).
 */

define([
    'test/resources/grammarMock'
], function(grammarMock) {

    return {
        /**
         * @param server - sinon server object (any configuration of the server should be done inside
         * the test case.
         */
        applyScenario: function(server) {

            server.autoRespond = true;
            server.autoRespondAfter = 30;

            server.respondWith(
                'GET',
                '/networkexplorerlib/NetworkExplorer.grammar.json',
                function(xhr) {
                    xhr.respond(
                        200,
                        {'Content-type': 'application/json'},
                        JSON.stringify(grammarMock)
                    );
                    if (window.consoleLogging) { console.log('SINON: XHR: returned for: /networkexplorerlib/NetworkExplorer.grammar.json'); }
                }
            );
        }
    };
});
