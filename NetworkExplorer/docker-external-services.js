module.exports = function (app) {

    /******************************************************************************
     *                         EditProfile REST endpoints                         *
     ******************************************************************************/

    app.get('/editprofile', asJson.bind(this, function (req) {
        return {username: req['x-tor-userid']||'administrator'};
    }));

    app.get('/oss/idm/usermanagement/users/:USERNAME/privileges', asJson.bind(this, function (req) {
        return [{
            "user": req.params.USERNAME,
            "role": "ADMINISTRATOR",
            "targetGroup": "ALL"
        }, {
            "user": req.params.USERNAME,
            "role": "SECURITY_ADMIN",
            "targetGroup": "ALL"
        }];
    }));

    app.get('/oss/uiaccesscontrol/resources/:RESOURCE/actions', asJson.bind(this, function (req) {
        return {"resource":req.params.RESOURCE,"actions":["create","delete","execute","read","update"]};
    }));

    var codes = {
        'NOT_FOUND': 404,
        'OK': 200,
        'CREATED': 201,
        'BAD_REQUEST': 400,
        'INTERNAL_SERVER_ERROR': 500,
        'ACCEPTED': 202,
        'GATEWAY_UNAVAILABLE': 504
    };

    /******************************************************************************
     *                            Private Functions                               *
     ******************************************************************************/

    /**
     * Delay a response by a number of milliseconds
     * @param callback Execute after delay
     * @param specificTimeout {Optional} Wait this long or a random value between 200 and 700
     */
    function delayResponse(callback, specificTimeout) {
        setTimeout(callback, specificTimeout || (Math.floor(Math.random() * 500) + 200));
    }

    function asJson(callback, req, res) {
        delayResponse(function () {
            try {
                var result = callback(req, res);
                res.status(codes['OK']).json(result);
            } catch (err) {
                console.error(err);
                res.status(codes[err.code]).json(err);
            }
        });
    }
};
