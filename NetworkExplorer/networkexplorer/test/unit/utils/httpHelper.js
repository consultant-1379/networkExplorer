define([
    'networkexplorer/utils/httpHelper',
    'i18n!networkexplorer/Results.json'
], function (httpHelper, strings) {

    describe('httpHelper', function () {
        describe('getServerMessage()', function () {
            describe('responseText is a valid JSON object', function () {
                it('Should provide userMessage when status code = 500.', function () {
                    // ARRANGE
                    var responseObject = {
                        userMessage: {
                            body: 'messageFromServer'
                        }
                    };
                    var responseText = JSON.stringify(responseObject);

                    var expectedResponseText = {
                        userMessage: {
                            body: 'messageFromServer'
                        }
                    };

                    // ACT
                    var formattedMessage = httpHelper.getServerMessage(500, responseText);

                    //ASSERT
                    expect(JSON.stringify(formattedMessage)).to.equal(JSON.stringify(expectedResponseText));
                });
            });
            describe('responseText is NOT a valid JSON object', function () {
                it('Should provide serverUnavailableError when status code = 404', function () {
                    // ACT
                    var formattedMessage = httpHelper.getServerMessage(404, 'unknown payload');

                    //ASSERT
                    expect(formattedMessage.userMessage.title).to.equal(strings.serverUnavailableErrorHeader);
                    expect(formattedMessage.userMessage.body).to.equal(strings.serverUnavailableErrorParagraph);
                });
                it('Should provide unknownServerError when status code = 500', function () {
                    // ACT
                    var formattedMessage = httpHelper.getServerMessage(500, 'unknown payload');

                    //ASSERT
                    expect(formattedMessage.userMessage.title).to.equal(strings.unknownServerErrorHeader);
                    expect(formattedMessage.userMessage.body).to.equal(strings.unknownServerErrorParagraph);
                });
                it('Should provide unknownServerError message when status code in not any of the above', function () {
                    // ACT
                    var formattedMessage = httpHelper.getServerMessage(0, 'unknown payload');

                    //ASSERT
                    expect(formattedMessage.userMessage.title).to.equal(strings.unknownServerErrorHeader);
                    expect(formattedMessage.userMessage.body).to.equal(strings.unknownServerErrorParagraph);
                });
            });
        });
    });
});

