if (typeof define !== 'function') {
    var define = function(paths, callback) {
        console.log(require, typeof require);
        console.log(paths, typeof paths, callback, typeof callback);
        var arr = paths.map(function(path) {
            return require(path);
        });
        module.exports = callback.apply(null, arr);
    };
}

define([
    'test/resources/restMock/data/staticCollections/LargeCollection',
    'test/resources/restMock/data/staticCollections/SmallPrivateCollection',
    'test/resources/restMock/data/staticCollections/LongNameCollection',
    'test/resources/restMock/data/staticCollections/ManagedElementsCollection',
    'test/resources/restMock/data/staticCollections/MeContextCollection',
    'test/resources/restMock/data/staticCollections/MediumCollection'
], function(
    LargeCollection,
    SmallPrivateCollection,
    LongNameCollection,
    ManagedElementsCollection,
    MeContextCollection,
    MediumCollection
) {
    return {
        'collections': [
            LargeCollection,
            SmallPrivateCollection,
            LongNameCollection,
            ManagedElementsCollection,
            MeContextCollection,
            MediumCollection
        ]
    };
});
