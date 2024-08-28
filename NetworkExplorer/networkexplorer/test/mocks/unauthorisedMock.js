module.exports = function(app) {
    app.use('/managedObjects', function(req, res) {
        res.send(401, JSON.stringify({
            userMessage: {
                title: 'Unauthorised',
                body: 'You are unauthorised to view this.'
            }
        }));
    });
    app.use('/topologyCollections', function(req, res) {
        res.send(401, JSON.stringify({
            userMessage: {
                title: 'Unauthorised',
                body: 'You are unauthorised to view this.'
            }
        }));
    });
    app.use('/modelInfo', function(req, res) {
        res.send(401, JSON.stringify({
            userMessage: {
                title: 'Unauthorised',
                body: 'You are unauthorised to view this.'
            }
        }));
    });
    app.use('/rest', function(req, res) {
        res.send(401, JSON.stringify({
            userMessage: {
                title: 'Unauthorised',
                body: 'You are unauthorised to view this.'
            }
        }));
    });
};
