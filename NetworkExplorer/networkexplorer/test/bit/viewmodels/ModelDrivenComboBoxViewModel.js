define([
    'test/bit/bitPromises',
], function(promises) {

    var modelDrivenComboBoxViewModel = {

        getModelDrivenComboBox: function() {
            return promises.waitForElementVisible('.ebCombobox', 3000);
        },

        getComponentListItems: function() {
            return promises.waitForElementVisible('.ebComponentList-item', 3000);
        },

        getComponentListInfo: function() {
            return promises.waitForElementVisible('.ebComponentList-info', 3000);
        }
    };

    return modelDrivenComboBoxViewModel;

});