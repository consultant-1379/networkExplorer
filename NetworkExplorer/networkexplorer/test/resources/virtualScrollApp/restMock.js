module.exports = function(app) {

    Array.prototype.random = function() {
        return this[Math.floor((Math.random()*this.length))];
    };

    app.post('/managedObjects/getPosByPoIds', function(req, res) {

        var pos = req.body.poList.map(function(poId) {
            return {
                poId: poId,
                moType: ['MeContext','ManagedElement','NetworkElement'].random(),
                neType: ['ERBS','SGSN-MME','MINI-LINK-OUTDOOR',undefined].random()
            };
        });

        setTimeout(function() {
            if (Math.random() < 0.05) {
                res.set('Content-Type', 'application/json');
                res.status(404);
                res.send('<html jshdfkjsd>');
            } else if (req.body.poList.length > 50) {
                res.set('Content-Type', 'application/json');
                res.status(500);
                res.send('{"customErrorMessage": "OOM occurred, too many objects requested"}');
            } else {
                res.set('Content-Type', 'application/json');
                res.status(200);
                res.send(JSON.stringify(pos));
            }
        }, Math.floor(Math.random() * 2000) + 300);
    });
};
