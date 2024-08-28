define([
    'networkexplorer/utils/UrlHelper'
], function(UrlHelper) {
    describe('UrlHelper', function() {
        describe('getUrlParams()', function() {
            it('should return an object of the URI parameters of a given URL', function() {
                // ARRANGE
                // ACT
                var result = UrlHelper.getUrlParams('https://hoSTNAme/~user1%203/path?queryString=Value123&foo=blah');
                // ASSERT
                expect(result).to.deep.equal({
                    queryString: 'Value123',
                    foo: 'blah'
                });
            });
            it('should perform URL decoding', function() {
                // ARRANGE
                // ACT
                var result = UrlHelper.getUrlParams('https://hoSTNAme/~user1%203/path?queryString=Value%20123&foo=blah');
                // ASSERT
                expect(result).to.deep.equal({
                    queryString: 'Value 123',
                    foo: 'blah'
                });
            });
            it('should ignore empty parameters', function() {
                // ARRANGE
                // ACT
                var result = UrlHelper.getUrlParams('https://hoSTNAme/~user1%203/path?queryString=Value%20123&foo&bar=blah');
                // ASSERT
                expect(result).to.deep.equal({
                    queryString: 'Value 123',
                    bar: 'blah'
                });
            });
        });
    });
});
