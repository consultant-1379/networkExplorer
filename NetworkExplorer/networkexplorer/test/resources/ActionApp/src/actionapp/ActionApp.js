define([
    'jscore/core',
    './ActionAppView',
    'layouts/TopSection',
    './widgets/DataSelector',
    './ext/Actions',
    'widgets/Dialog',
    'actionlibrary/ActionLibrary'
], function(core, View, TopSection, DataSelector, Actions, Dialog, ActionLibrary) {
    return core.App.extend({
        View: View,
        onStart: function() {
            // Header
            this.defaultActions = [{
                name: 'Construct a valid scenario to show Actions',
                type: 'button',
                flat: true,
                disabled: true
            }];
            this.topSection = new TopSection({
                context: this.getContext(),
                title: 'Action App',
                defaultActions: this.defaultActions
            });
            this.topSection.attachTo(this.getElement());
            // Body
            this.dataSelector = new DataSelector({callback: this.showActions.bind(this)});
            this.topSection.setContent(this.dataSelector);
        },
        showActions: function(data) {
            try {
                var selection = JSON.parse(data.selection),
                    metaObject = ActionLibrary.createMetaObject('networkexplorer', data.dataType, selection), //test validation only
                    actions = this.transformActions(Actions, selection);
                actions.concat();
                this.getContext().eventBus.publish('topsection:contextactions', actions);
            } catch (e) {
                this.getContext().eventBus.publish('topsection:leavecontext');
            }
        },

        /**
         * Reformat Actions into objects required by UISDK TopSection / ContextMenu
         */
        transformActions: function(returnedActions, objects) {
            return returnedActions.map(function(action) {
                var resultAction = {
                    type: 'button',
                    name: action.name,
                    action: function() {
                        this.launchAction(action, objects);
                    }.bind(this)
                };
                if (action.icon) {
                    resultAction.icon = action.icon;
                }
                return resultAction;
            }.bind(this));
        },

        /**
         * Execute the Action
         * @param action an Action object to execute
         * @param objects the user selection
         */
        launchAction: function(action, objects) {
            function getButtons(dialog) {
                return [{
                    caption: 'OK',
                    action: function() {
                        dialog.hide();
                    }.bind(this)
                }];
            }
            ActionLibrary.executeAction(action, objects, {
                onReady: function() {},
                onProgress: function() {},
                onComplete: function(result) {
                    if (result.success) {
                        if (!sessionStorage.getItem('hideActionResultState')) {
                            var dialog = new Dialog({
                                header: 'Action complete',
                                content: 'The Action was launched successfully',
                                buttons: [{
                                    caption: 'OK',
                                    action: function() {
                                        dialog.hide();
                                    }.bind(this)
                                },{
                                    caption: 'Don\'t show this again',
                                    action: function() {
                                        sessionStorage.setItem('hideActionResultState', 'true');
                                        dialog.hide();
                                    }.bind(this)
                                }]
                            });
                            dialog.show();
                        }
                    }
                    if (result.afterUseCase) {
                        result.afterUseCase.then(function(obj) {
                            var dialogOptions = {
                                header: 'Use Case complete',
                                content: 'The use case for action ['+action.plugin+'] finished successfully'
                            };
                            if (obj) {
                                dialogOptions.optionalContent = 'Extra info is available: ' + JSON.stringify(obj);
                            }
                            var dialog = new Dialog(dialogOptions);
                            dialog.setButtons(getButtons(dialog));
                            dialog.show();
                        },function() {
                            var dialog = new Dialog({
                                header: 'Use Case complete',
                                content: 'The Action\'s use case did not finish successfully',
                                optionalContent: 'No further steps are required.'
                            });
                            dialog.setButtons(getButtons(dialog));
                            dialog.show();
                        });
                    }
                },
                onFail: function(e) {
                    var dialog = new Dialog({
                        header: 'Action complete',
                        content: 'The Action was unable to launch successfully',
                        optionalContent: 'Reason: ' + e.message
                    });
                    dialog.setButtons(getButtons(dialog));
                    dialog.show();
                }
            });
        }
    });
});
