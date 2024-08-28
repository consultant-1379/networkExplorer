if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}
define(function() {
    return function(responseObject) {
        var objects = responseObject.objects || [];
        return objects.map(function(obj) {
            return obj.id;
        });
    };
});
