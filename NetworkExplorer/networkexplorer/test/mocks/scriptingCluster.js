module.exports = function(app) {
    app.get('/element-manager-services/desktop/credentials', function(req, res) {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({
            credentials: {
                'userId': 'mrUserman',
                'sessionId': '1234567890abcdef'
            }
        }));
    });
    app.get('/element-manager-services/desktop/app/:cendioapp/:poid', function(req, res) {
        res.set('Content-Type', 'application/json');
        res.send('');
    });
    app.post('/element-manager-services/desktop/app/:cendioapp/', function(req, res) {
        res.set('Content-Type', 'application/json');
        res.send('');
    });
};
