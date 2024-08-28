/* global module, require, process, console */
var request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// Usage: cdt2 serve -m proxyServer.js

module.exports = function(app) {
    'use strict';

    var cookieJar = request.jar();
    var settings = require('./proxyConfig.json');

    var proxy_protocol = settings.protocol;
    var proxy_host = settings.host;
    var proxy_port = settings.port;
    var baseUrl = proxy_protocol + '://' + proxy_host + ':' + proxy_port;
    var loginUrl = baseUrl + '/login';
    var proxy_username = settings.headers['X-Tor-UserID'];
    var proxy_password = settings.headers['X-Proxy-Password'];

    console.log('[[ Login init ]] ' + proxy_username + ':' + proxy_password + '@' + loginUrl);
    request.post(loginUrl, {
        form: {
            IDToken1: proxy_username,
            IDToken2: proxy_password
        }
    }, function(err, httpResponse) {
        if (err) {
            console.error('httpResponse: ', httpResponse);
            return console.error('[![ Login Error ]!]', err);
        }
        console.log('[[ Login Successful ]]', JSON.stringify(httpResponse.headers));
        var cookieArray = httpResponse.headers['set-cookie'] || [];
        cookieArray.forEach(function(e) {
            return cookieJar.setCookie(request.cookie(e), baseUrl);
        });
        console.log('[[ CookieJar Updated ]]', JSON.stringify(cookieJar));
    });

    settings.mappings.forEach(function(mapping) {
        app.use(mapping.source, function(req, res) {
            proxy_protocol = mapping.protocol || proxy_protocol;
            proxy_host = mapping.host || proxy_host;
            proxy_port = mapping.port || proxy_port;

            var url = baseUrl +
                (mapping.dest ? mapping.dest : mapping.source) +
                (req.url==='/'?'':req.url); // Fix /editprofile -> /editprofile/ issue
            req.on('error', function(e) {
                return console.log('[![ Request Error ]!]', req.url, e.message);
            });

            const headers = Object.assign({}, req.headers, {
                'X-Tor-UserId': proxy_username
            }, settings.headers);

            delete headers['host'];

            request({
                method: req.method,
                url: url,
                jar: cookieJar,
                json: req.method !== 'HEAD' ? req.body : undefined,
                headers: headers
            }, function(err) {
                return err ? console.log('[![ Response Error ]!]', err) : null;
            }).pipe(res);
        });
    });
};
