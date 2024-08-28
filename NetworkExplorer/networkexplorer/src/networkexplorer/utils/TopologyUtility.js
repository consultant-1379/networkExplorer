define([
    'widgets/Dialog',
    'i18n/AdvancedDateTime'
], function(Dialog, advDateTime) {

    return {
        isCollection: function(object) {
            return (object.type === 'NESTED' || object.type === 'BRANCH' || object.type === 'LEAF');
        }

    };
});
