console.log('Loading enmInstallMock.js');
module.exports = function(app) {

    function handler(req, res) {
        res.status(404).send('<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">' +
            '<html><head>' +
            '<title>404 Not Found</title>' +
            '</head><body>' +
            '<h1>Not Found</h1>' +
            '<p>The requested URL '+ req.path +' was not found on this server.</p>' +
            '</body></html>');
    }

    app.use('/object-configuration', function(req, res) {
        handler(req, res);
    });
    app.use('/topologyCollections', function(req, res) {
        handler(req, res);
    });
    app.use('/managedObjects', function(req, res) {
        handler(req, res);
    });
    app.use('/rest/ui/settings', function(req, res) {
        handler(req, res);
    });

};
