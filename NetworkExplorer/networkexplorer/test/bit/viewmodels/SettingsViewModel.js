define([
    'test/bit/bitPromises',
], function(promises) {

    var settingsViewModel = {

        getSettingsItems: function() {
            return promises.waitForElementVisible('.elTablelib-TableSettingsItem', 1000);
        },

        getSettingItemCheckboxes: function() {
            return promises.waitForElementVisible('.ebCheckbox', 1000);
        },

        getApplyButton: function() {
            return promises.waitForElementVisible('.ebBtn', 1000);
        },

        getDialog: function() {
            return promises.waitForElementVisible('.ebDialog', 1000);
        }
    };

    return settingsViewModel;

});
