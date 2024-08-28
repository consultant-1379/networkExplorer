if (!Object.values) {
    Object.values = function values(O) {
        var values = [];
        for (var key in O) {
            if (Object.prototype.hasOwnProperty.call(O, key)) {
                var val = O[key];
                values.push(val);
            }
        }
        return values;
    };
}
