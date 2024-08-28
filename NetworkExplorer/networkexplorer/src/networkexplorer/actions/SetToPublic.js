define([
    'jscore/core',
    'jscore/ext/net',
    'container/api',
    'actionlibrary/ActionLibrary',
    'networkexplorerlib/classes/CollectionErrorHandler',
    'networkexplorerlib/widgets/CollectionDialog',
    'widgets/Notification',
    'networkexplorerlib/ObjectConfigurationApi',
    'i18n!networkexplorer/app_actions.json',
    'i18n!networkexplorer/keywords.json'
], function (core, net, Container, ActionLibrary, CollectionErrorHandler, CollectionDialog, Notification, ObjectConfigurationApi, appActionsStrings, keywordStrings) {

    'use strict';

    /**
     * SetToPublic
     * ===
     * id: networkexplorer-set-to-public
     *
     * This action allows a single PRIVATE Collection to be changed to PUBLIC.
     *
     * Expected parameters:
     * # Array containing a single Collection object
     *
     * Expected contents:
     * * id - id of the Collection
     * * category - PUBLIC or PRIVATE
     * * browsableCollection - true if Browse button to browse in Topology Browser should be shown in case of error
     */
    return ActionLibrary.Action.extend({

        run: function (callbackObject, data) {

            var lifecycle = new ActionLibrary.ActionLifecycle(callbackObject);

            // Notify calling app that Action is starting
            lifecycle.onReady({message: appActionsStrings.get('networkexplorer-set-to-public.launchingAction')});

            // Provide Use Case feedback
            var useCasePromiseCallbacks = {};
            var useCasePromise = new Promise(function (resolve, reject) {
                useCasePromiseCallbacks.resolve = resolve;
                useCasePromiseCallbacks.reject = reject;
            });

            new Promise(function (resolve, reject) {

                if (!(data && data.length && data.length === 1)) {
                    reject({message: 'Action supports single-selection only.'});
                    return;
                }

                var collection = data[0];

                if ((!collection.category && !collection.sharing) || (collection.category !== 'Private' && collection.sharing !== 'Private')) {
                    reject({message: 'Action only supported for Private Collections.'});
                    return;
                }

                Container.getEventBus().publish('container:loader');
                ObjectConfigurationApi.updateCollectionV4({
                    collectionData: {
                        id: collection.id,
                        sharing: 'Public'
                    },
                    onSuccess: handleSuccess,
                    onFailure: updateCollectionFallBack
                });
                // Action's job is done
                resolve();

                function updateCollectionFallBack() {
                    ObjectConfigurationApi.updateCollection({
                        collectionData: {
                            id: collection.id,
                            category: 'Public'
                        },
                        onSuccess: handleSuccess,
                        onFailure: handleFailure
                    });
                    // Action's job is done
                    resolve();
                }

                function handleSuccess(data) {
                    Container.getEventBus().publish('container:loader-hide');
                    var notification = new Notification({
                        showAsGlobalToast: true,
                        icon: 'tick',
                        color: 'green',
                        label: appActionsStrings.get("networkexplorer-set-to-public.successMessage")
                    });
                    notification.attachTo(core.Element.wrap(document.body));
                    useCasePromiseCallbacks.resolve({ data: data , action: 'networkexplorer-set-to-public'});
                }

                function handleFailure(msg, xhr) {
                    Container.getEventBus().publish('container:loader-hide');
                    var errorDialog = new CollectionDialog();
                    var buttons;
                    if(data.browsableCollection){
                        buttons =  [
                            {
                                caption: appActionsStrings.get('networkexplorer-set-to-public.browse'),
                                action: function() {
                                    errorDialog.close();
                                    core.Window.open('#topologybrowser?topology='+collection.id, '_blank');
                                }
                            },
                            {
                                caption: keywordStrings.get('cancel'),
                                action: function() {
                                    errorDialog.close();
                                }
                            }
                        ];
                    }
                    errorDialog.show(
                        appActionsStrings.get('networkexplorer-set-to-public.errorDialogHeader'),
                        CollectionErrorHandler.getErrorMessage(xhr),
                        buttons
                    );
                    useCasePromiseCallbacks.resolve();
                }
            }).then(function () {
                lifecycle.onComplete(new ActionLibrary.ActionResult({success: true, afterUseCase: useCasePromise}));
            }).catch(function (reason) {
                lifecycle.onFail(new ActionLibrary.ActionResult({success: false, message: reason.message}));
            });
            return lifecycle;
        }
    });
});
