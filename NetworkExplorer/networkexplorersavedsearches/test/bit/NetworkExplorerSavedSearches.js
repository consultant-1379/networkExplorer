/*global define, describe, it, expect */
define([
    'networkexplorersavedsearches/NetworkExplorerSavedSearches'
], function (
      NetworkExplorerSavedSearches
    ) {
    'use strict';

    describe('NetworkExplorerSavedSearches', function () {
        it('check NetworkExplorerSavedSearches App', function() {
            // run test case
            expect(NetworkExplorerSavedSearches).not.to.be.undefined;
        });
   });
});
