//Intl.DateTimeFormat().resolvedOptions().timeZone;
if (!window.Intl) {
    (function () {
        window.Intl = {
            DateTimeFormat: function() {
                return {
                    resolvedOptions: function() {
                        return {
                            timeZone: 'Europe/Dublin'
                        };
                    },
                    format: function(date) {
                        return date instanceof Date ? date.toLocaleString('en-US') : new Date().toLocaleString('en-US');
                    }
                };
            }
        };
    })();
}