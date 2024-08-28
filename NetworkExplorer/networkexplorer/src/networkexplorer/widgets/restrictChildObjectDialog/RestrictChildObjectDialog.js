define([
    'jscore/core',
    './RestrictChildObjectDialogView',
    'widgets/Dialog',
    'i18n!networkexplorer/app_actions.json',

], function (core, View, Dialog, strings) {
    'use strict';
    /*jshint validthis:true */
    return core.Widget.extend({

        view: function () {
            return new View();
        },

        hideContinueMessage: function() {
            return this.view.hideContinueMessage();
        },

        showContinueMessage: function() {
            return this.view.showContinueMessage();
        },

        displayRestrictedDialogWithoutContinueButton: function() {
             var restrictChildObjectDialog = new Dialog({
                 header: strings.get("networkexplorer-add-topology-data.restrictedObjectDialogHeader"),
                 content:this,
                 optionalContent:'',
                 type:'error',
                 buttons:[
                          {
                         caption: strings.get("networkexplorer-add-topology-data.cancel"),
                         action: function () {
                             restrictChildObjectDialog.destroy();
                         }
             }]});
             this.hideContinueMessage();
             restrictChildObjectDialog.show();
        },

        getFilteredObjectsFromResponse: function(errorMessage){
            var validObjectIdArray=[],splittedMessage;
            splittedMessage = errorMessage.split(" sent");
            validObjectIdArray = JSON.parse(splittedMessage[1]);
            validObjectIdArray = validObjectIdArray.map(String);
            return validObjectIdArray;
        },

        numberOfSelectedObjectsInFilteredResponse: function(errorMessage){
            var responseBody, validObjectCount;
            responseBody = errorMessage.split("Managed");
            validObjectCount = responseBody[0].toString().split("Only");
            validObjectCount = JSON.parse(validObjectCount[1]);
            return validObjectCount;
        }

    });

});
