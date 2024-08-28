/**
 * Respond to XHR
 */
define(function() {
    /**
     * @param server - sinon server object. Any configuration of the server should be done inside the test case.
     * @param path - pattern to match in AJAX request
     * @param responseObject - object the server will respond with
     * @param requestMethod - REST verb i.e. GET, PUT, HEAD, DELETE etc.
     * @param responseStatus - status code the server will respond with
     */
    function respond(server, path, responseObject, requestMethod, responseStatus) {
        // Defaults
        // None for responseObject, use captureGroup1
        requestMethod = requestMethod ? requestMethod : 'GET';
        responseStatus = responseStatus ? responseStatus : 200;
        if (window.consoleLogging) { console.log(requestMethod+' requests to '+path+' will return ['+responseStatus+'] '+JSON.stringify(responseObject)); }
        server.respondWith(
            requestMethod,
            path,
            function(xhr, captureGroup) {
                if (window.consoleLogging) { console.log('XHR returned from ' + xhr.url); }
                var tmp;
                if (!responseObject) {
                    tmp = {'resource': captureGroup,'actions': ['read']};
                } else {
                    tmp = responseObject;
                }
                xhr.respond(
                    responseStatus,
                    {'Content-type': 'application/json'},
                    JSON.stringify(tmp)
                );
            }
        );
    }
    return {
        respondToResourceRequest: function(server, responseObject, requestMethod, responseStatus) {
            respond(server, /oss\/uiaccesscontrol\/resources\/([0-9a-zA-Z_-]*)\/actions/, responseObject, requestMethod, responseStatus);
        },
        respondToProfile: function(server, username) {
            respond(server, '/editprofile', {
                username: username
            });
            respond(server, '/oss/idm/usermanagement/users/'+username, {
                'username': username,
                'password': '********',
                'status': 'enabled',
                'name': 'security',
                'surname': 'admin',
                'email': 'security@administrator.com',
                'description': null,
                'previousLogin': '20180612122450+0000',
                'lastLogin': '20180612122752+0000',
                'passwordResetFlag': null,
                'privileges': [],
                'passwordChangeTime': '20180611003200+0000',
                'maxSessionTime': null,
                'maxIdleTime': null,
                'authMode': 'local',
                'passwordAgeing': null
            });
            respond(server, '/oss/idm/usermanagement/users/'+username+'/privileges', {
                role: 'ADMINISTRATOR',
                targetGroup: 'ALL',
                user: username
            });
        }
    };
});
