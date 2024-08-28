/**
 *    Define all REST mocks here that are required to run an application in a positive scenario
 *    (all known REST endpoints work).
 */

define([], function() {

    var path = '/topologyCollections/savedSearches';

    return {

        getLastRequestBody: function() {
            return this.lastRequestBody;
        },

        getLastResponseBody: function() {
            return this.lastResponseBody;
        },

        /**
         * @param server - sinon server object (any configuration of the server should be done inside
         * the test case.
         */
        applyScenario: function(server) {
            this.lastRequestBody = null;
            this.lastResponseBody = null;
            server.autoRespond = true;
            server.autoRespondAfter = 30;
            server.respondWith(
                'POST',
                path,
                function(xhr) {
                    this.lastRequestBody = xhr.requestBody;
                    this.lastResponseBody = ''+Math.floor(Math.random() * 10000000 + 1);
                    xhr.respond(200, {}, this.lastResponseBody);
                    if (window.consoleLogging) { console.log('SINON: XHR: returned for: ' + restPath); }
                }.bind(this)
            );
        }
    };
});
