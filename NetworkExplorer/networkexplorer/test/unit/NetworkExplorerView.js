/*global define, describe, it, expect */
define([
    'networkexplorer/NetworkExplorerView'
], function(NetworkExplorerView) {
    'use strict';

    describe('NetworkExplorerView', function() {

        it('NetworkExplorerView should be defined', function() {
            expect(NetworkExplorerView).not.to.be.undefined;
        });

        describe('Check that NetworkExplorerView contain methods', function() {
            var networkExplorerMethods = [
                'getTemplate',
                'getStyle'
            ];

            networkExplorerMethods.forEach(function(methodName) {
                var itTitle = 'Contains method ' + methodName;
                it(itTitle, function() {
                    expect(NetworkExplorerView.prototype[methodName]).to.be.defined;
                });
            });
        });
    });
});
