define([
    'i18n!networkexplorer/Results.json'
], function (strings) {
    return {
        /**
         * Create object representing server's response message
         *
         * @param statusCode HTTP status code
         * @param responseText HTTP response body
         * @returns {Object} serverMessage
         */
        getServerMessage: function (statusCode, responseText) {
            var serverMessage;
            try {
                serverMessage = JSON.parse(responseText);
            } catch (e) {
                if (statusCode === 404) {
                    serverMessage = {
                        userMessage: {
                            title: strings.get('serverUnavailableErrorHeader'),
                            body: strings.get('serverUnavailableErrorParagraph')
                        }
                    };
                } else {
                    serverMessage = {
                        userMessage: {
                            title: strings.get('unknownServerErrorHeader'),
                            body: strings.get('unknownServerErrorParagraph')
                        }
                    };
                }
            }
            return serverMessage;
        }
    };
});
