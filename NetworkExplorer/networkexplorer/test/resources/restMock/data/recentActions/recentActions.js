if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {

    return {
        "actionList": [{
            "type": "button",
            "name": "Run Node Health Check",
            "timestamp": "1569843056904",
            "category": "Monitoring & Troubleshooting Actions"
        }]
    };
});
