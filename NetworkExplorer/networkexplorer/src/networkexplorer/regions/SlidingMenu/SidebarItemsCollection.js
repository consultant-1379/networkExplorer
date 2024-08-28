define([
    'jscore/ext/mvp'
], function(mvp) {
    return mvp.Collection.extend({
        parse: function(data) {
            if (data.collections) {
                data = data.collections;
            }
            var dataMappedByName = {};
            for (var i = 0; i < data.length; i++) {
                data[i].id = data[i].id || data[i].poId;
                if (dataMappedByName[data[i].name]) {
                    dataMappedByName[data[i].name].duplicate = true;
                    data[i].duplicate = true;
                } else {
                    dataMappedByName[data[i].name] = data[i];
                }
            }
            return data;
        }
    });
});
