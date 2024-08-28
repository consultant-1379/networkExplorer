define(function() {
    return {
        /**
         * Generates simple example responses from the actions service
         * Pass it an array of objects
         *
         * options: {
         *  defaultLabel (required)
         *  plugin (optional)
         *  applicationId (optional)
         * }
         * @param options
         * @returns {*}
         */
        generateResponse: function(options) {
            options = options || [];
            var response = {
                actions: []
            };
            for (var i = 0; i < options.length; i++) {
                var _appId = options[i].applicationId || 'externalapp',
                    _object = {
                        applicationId: _appId,
                        category: options[i].category || 'Category',
                        defaultLabel: options[i].defaultLabel,
                        multipleSelection: false,
                        name: _appId + '-action-' + (i+1),
                        plugin: (options[i].plugin||_appId + '/externalapp-action-') + (i+1),
                        primary: true
                    };
                response.actions.push(_object);
            }
            return response;
        }
    };
});
