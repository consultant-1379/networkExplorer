/*global define, describe, it, expect */
define([
    'networkexplorercollections/NetworkExplorerCollections'
], function (NetworkExplorerCollections) {
    'use strict';

    describe('Unit tests NetworkExplorerCollections', function () {

        it("NetworkExplorerCollections should be defined", function () {
            expect(NetworkExplorerCollections).not.to.be.undefined;
        });

    });
});