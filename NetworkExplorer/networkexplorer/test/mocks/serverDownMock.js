
module.exports = function(app) {
    app.use('/managedObjects', function(req, res) {
        setTimeout(function() {
            res.send(404, JSON.stringify({
                userMessage: {
                    title: 'Unknown Server Error',
                    body: 'The server encountered an internal error. Please try again later or contact your System Administrator.'
                }
            }));
        }, 1000);
    });
    app.use('/topologyCollections', function(req, res) {
        setTimeout(function() {
            res.send(404, JSON.stringify({
                userMessage: {
                    title: 'Unknown Server Error',
                    body: 'The server encountered an internal error. Please try again later or contact your System Administrator.'
                }
            }));
        }, 1000);
    });
    app.use('/modelInfo', function(req, res) {
        setTimeout(function() {
            res.send(404, JSON.stringify({
                userMessage: {
                    title: 'Unknown Server Error',
                    body: 'The server encountered an internal error. Please try again later or contact your System Administrator.'
                }
            }));
        }, 1000);
    });

    app.use('/rest', function(req, res) {
        setTimeout(function() {
            res.send(404, JSON.stringify({
                userMessage: {
                    title: 'Unknown Server Error',
                    body: 'The server encountered an internal error. Please try again later or contact your System Administrator.'
                }
            }));
        }, 500);
    });

//    var favorites = [{"id":"281474976740688","value":"true"}];
//
//    app.put('/rest/ui/settings/networkexplorer/favorites', function (req, res) {
//        if (req.body.value && req.body.value !== '') {
//            var alreadyInFavorites = false;
//            favorites.forEach(function (favorite) {
//                if (favorite.id === req.body.id) {
//                    alreadyInFavorites = true;
//                }
//            });
//            if (!alreadyInFavorites) {
//                favorites.push(req.body);
//            }
//        } else {
//            for (var i = 0; i < favorites.length; i++) {
//                if (favorites[i].id === req.body.id) {
//                    favorites.splice(i, 1);
//                }
//            }
//        }
//        res.send(204, '');
//    });
//
//    app.get('/rest/ui/settings/networkexplorer/favorites', function (req, res) {
//        setTimeout(function () {
//            res.send(200, JSON.stringify(favorites));
//        }, Math.floor(Math.random() * 300 + 300));
//    });
};
