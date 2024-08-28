if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {

    return {
        'userMessage': {
            'title': 'Invalid Type',
            'body': 'Sorry, you have not searched for a valid type. Please try again.'
        }
    };
});
