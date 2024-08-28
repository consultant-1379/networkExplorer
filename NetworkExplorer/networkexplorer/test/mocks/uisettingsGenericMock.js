module.exports = function(app) {

    /**
     * e.g.
     * {
     *   networkexplorer: {
     *     9999: {
     *       id: 9999,
     *       value: true
     *     },
     *     ...
     *   },
     *   anotherapp: ...
     * }
     *
     * @type {{}}
     */
    var favoriteMap = {};

    function toFavorites(object) {
        return Object.keys(object).map(function(key) {
            return {
                id: key,
                value: object[key]
            };
        });
    }

    app.get('/rest/ui/settings/:app/favorites', function(req, res) {
        setTimeout(function() {
            if (favoriteMap[req.params.app] === undefined) {
                favoriteMap[req.params.app] = {};
            }
            res.status(200).send(JSON.stringify(toFavorites(favoriteMap[req.params.app])));
        }, Math.floor(Math.random() * 300 + 300));
    });

    app.put('/rest/ui/settings/:app/favorites', function(req, res) {
        setTimeout(function() {
            var favorite = {};
            favorite[req.body.id] = req.body.value;
            favoriteMap[req.params.app] = favorite;
            res.status(200).send();
        }, Math.floor(Math.random() * 300 + 300));
    });

};
