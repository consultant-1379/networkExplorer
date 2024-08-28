/*global define, describe, it, expect */
define([
    'networkexplorercollections/NetworkExplorerCollections'
], function(NetworkExplorerCollections) {
    'use strict';

    describe('bit/NetworkExplorerCollections', function() {
        it('check NetworkExplorerCollections App', function() {
                // run test case
                expect(NetworkExplorerCollections).not.to.be.undefined;
        });
    });
});