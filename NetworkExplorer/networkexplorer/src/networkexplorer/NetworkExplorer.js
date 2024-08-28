define([
    'jscore/core',
    'jscore/ext/locationController',
    'jscore/ext/net',
    'jscore/ext/mvp',
    'layouts/TopSection',
    'layouts/MultiSlidingPanels',
    'widgets/Notification',
    'widgets/Button',
    'widgets/Dialog',
    './NetworkExplorerView',
    './regions/NetworkPanel/NetworkPanel',
    './regions/SlidingMenu/SlidingMenu',
    './regions/SlidingMenuRight/SlidingMenuRight',
    './regions/Main/Main',
    './utils/UrlHelper',
    './utils/LauncherUtils',
    'container/api',
    'i18n!networkexplorer/NetworkPanel.json',
    'i18n!networkexplorer/app.json',
    'webpush/main'
], function(
    core,
    LocationController,
    net,
    mvp,
    TopSection,
    MultiSlidingPanels,
    Notification,
    Button,
    Dialog,
    View,
    NetworkPanel,
    SlidingMenu,
    SlidingMenuRight,
    Main,
    UrlHelper,
    LauncherUtils,
    container,
    constants,
    strings,
    WebPush
) {
    return core.App.extend({

        View: View,
        SINGLE_OBJECT: 'singleObject',
        MULTIPLE_OBJECTS: 'multipleObjects',
        COLLECTIONS: 'collections',
        SAVED_SEARCHES: 'savedSearches',


       init: function () {
        var actionCallback = {
            successCallBack: this.onActionSuccessCallBack,
            failureCallBack: this.onActionFailureCallBack
        };
        this.collectionDatas = [];
        this.launcherUtils = new LauncherUtils(this.defaultActions, actionCallback);
        this.collectionId=[];
        this.collectionEvent=null;
        this.collName = [];
        this.collectionName = [];
        this.collections=[];
        this.recursiveData = [];
        this.applyRecursiveValue = false;
        this.recursiveObjects = [];

        },

        onActionSuccessCallBack: function(object) {
            if (object && object.action === 'networkexplorer-set-to-public') {
                container.getEventBus().publish('topologybrowser:reload-action-bar',  object.data.id);
            }
            return container.getEventBus().publish('topologybrowser:action-successful', object);
        },

        onActionFailureCallBack: function() {
            return container.getEventBus().publish('topologybrowser:action-failed');
        },

        /**
         * Lifecycle method
         */
        onStart: function() {
            this.getEventBus().subscribe('QueryBuilder:setLocation', this.setLocation, this);
            this.getEventBus().subscribe('QueryBuilder:showSearchRegion', this.setQueryBuilderOff, this);
            this.getEventBus().subscribe('Search:showQueryBuilder', this.setQueryBuilderOn, this);
            this.getEventBus().subscribe('Search:setLocation', this.setLocation, this);
            //this.getEventBus().subscribe('SlidingMenu:setLocation', this.setLocation, this);
            //this.getEventBus().subscribe('SlidingMenu:showToast', this.showToast, this);
            this.getEventBus().subscribe('NetworkPanel:setLocation', this.setLocation, this);
            this.getEventBus().subscribe('SlidingMenuRight:showAttributesSavedToast', this.showToast, this);
            //this.getEventBus().subscribe('SlidingMenu:removeToast', this.removeToast, this);
            this.getEventBus().subscribe('CollectionHandler:showToast', this.showToast, this);
            this.getEventBus().subscribe('CollectionHandler:showToastForRemove', this.showToastForRemove, this);
            this.getEventBus().subscribe('CollectionHandler:showErrorDialog', this.showCollectionErrorDialog, this);
            this.getEventBus().subscribe('Results:setLocation', this.setLocation, this);
            this.getEventBus().subscribe('Results:setURIParameters', this.setURIParameters, this);
            this.getEventBus().subscribe('Results:selectionUpdated', this.enableOrDisableReturnButton, this);
            this.getEventBus().subscribe('Results:showToast', this.showToast, this);
            this.getEventBus().subscribe('Results:showToastSavedSearch', this.showToast, this);
            this.getEventBus().subscribe('Results:removeToast', this.removeToast, this);
            this.getEventBus().subscribe('Results:showLoading', this.showLoading, this);
            this.getEventBus().subscribe('Results:hideLoading', this.hideLoading, this);
            this.getEventBus().subscribe('Results:collectionFetchError', this.onCollectionFetchError, this);
            this.getEventBus().subscribe('Results:searchCancelled', this.resetLocation, this);

            this.params = {};
            this.returnButton = null;
            this.cancelButton = null;
            this.notification = null;
            this.toastCounter = 0;
            this.queryBuilderOn = false;

            // Created in application as it is used and modified by multiple regions.
            this.favoritesCollection = new mvp.Collection();

            this.mainPanel = new Main({
                context: this.getContext(),
                favoritesCollection: this.favoritesCollection
            });

/*            // Collections & Saved Searches panel
            this.slidingMenu = new SlidingMenu({
                context: this.getContext(),
                favoritesCollection: this.favoritesCollection
            });*/

            //Network Panel
            this.scopingPanel = new NetworkPanel({
                context: this.getContext()
            });

            // Attributes Panel
            this.slidingMenuRight = new SlidingMenuRight({
                context: this.getContext()
            });

            this.updateTopSection();
            //this.slidingMenu.updateViewLinks(this.params);

            this.getEventBus().publish('NetworkExplorer:appLoaded');
            this.locationController = new LocationController({
                autoUrlDecode: false,
                namespace: this.options.namespace
            });
            this.locationListenerId = this.locationController.addLocationListener(this.handleLocationChange, this);
            this.locationController.start();
            this.initEventHandlers();

            this.defaultActions = [];

        },
        /**
         * Lifecycle method
         */
        onStop: function() {
            this.locationController.removeLocationListener(this.locationListenerId);
        },

        /**
         * Lifecycle method
         */
        onPause: function() {
            this.preserveState = true;
        },

        /**
         * Lifecycle method
         */
        onResume: function() {
            if (this.preserveState) {
                this.preserveState = undefined;
            } else {
                this.getEventBus().publish('NetworkExplorer:appLoaded');
            }
            //this.slidingMenu.clearListDataAndFetch();
        },

        initEventHandlers: function() {
            //this.getEventBus().subscribe('scopingPanel:tabChange', this.handleTabSelectInNetworkPanel.bind(this));
            this.getEventBus().subscribe('scopingPanel:select',this.handleNodeSelect, this);
            this.getEventBus().subscribe('scopingPanel:rightClick',this.onRightClick, this);
        },

        onRightClick: function(e, fetchActions) {
            this.contextMenuEvent = e;
            if (!fetchActions) {
                this.displayContextMenu(this.currentActions);
            }
        },

        updateActionBar: function(objects) {
            objects = objects || [];
            if (objects.length > 0) {
                this.launcherUtils.createLauncherAction(objects, this.updateActionBar.bind(this))
                .then(function(actions) {
                    this.getEventBus().publish('topsection:contextactions', actions.actionBarActions);
                    this.currentActions = actions;
                    this.displayContextMenu(actions);
                }.bind(this))
                .catch(this.showActionsErrorDialog);
            } else {
                this.getEventBus().publish('topsection:contextactions', this.defaultActions);
            }
        },

        /**
         * Populates context menu with current actions.
         *
         * @private
         * @method displayContextMenu
         * @param {Array} actions: actions fetched from Action Library
         */
        displayContextMenu: function(actions) {
            if (this.contextMenuEvent) {
                if (actions && actions.contextMenuActions && actions.contextMenuActions.length > 0) {
                    actions = actions.contextMenuActions.filter(function(action) {
                        return action.actionBarOnly !== true;
                    });
                    container.getEventBus().publish('contextmenu:show', this.contextMenuEvent, actions, { persistent: true, autoHide: false });
                }
                delete this.contextMenuEvent;
            }
        },

        createSlidingPanels: function() {
            return new MultiSlidingPanels({
                context: this.getContext(),
                leftWidth: 350,
                rightWidth: 300,
                leftMinWidth:220,
                rightMinWidth: 300, //Used rightMinWidth as workaround, for a UISDK bug (rightWidth not working anymore with resizeable).
                resizeable: true,
                redrawMode: MultiSlidingPanels.RESIZE_MODE.ON_DRAG,
                main: {
                    label: strings.get('mainPanel'),
                    content: this.mainPanel
                },
                left: [{
                    name: strings.get('network'),
                    value: 'network',
                    icon: 'topology',
                    label: strings.get('network'),
                    content: this.scopingPanel,
                    expanded: true
                }],
                right: [{
                    value: 'attributesPanel',
                    icon: 'info',
                    label: strings.get('attributesPanelTitle'),
                    content: this.slidingMenuRight,
                    expanded: true
                }]
            });
        },

        handleNodeSelect: function(data) {
            this.collectionId=[];
            this.applyRecursiveValue = data.recursiveValue;
            this.recursiveData = data.recursivelyFoundNetworkObjects;
            var objects=[];
            if(data.nestedCollections[0]) {
                var collectionObj = {};
                collectionObj.category = data.nestedCollections[0].category;
                collectionObj.enableMoveToCollectionButton = data.nestedCollections[0].enableMoveToCollectionButton;
                collectionObj.enableRemoveNodeButton = data.nestedCollections[0].enableRemoveNodeButton;
                collectionObj.hybrid = data.nestedCollections[0].hybrid;
                collectionObj.id = data.nestedCollections[0].id;
                collectionObj.query = data.nestedCollections[0].query;
                collectionObj.type = data.nestedCollections[0].type;
                collectionObj.subType = data.nestedCollections[0].subType;
                collectionObj.moType = data.nestedCollections[0].type;
                collectionObj.neType = data.nestedCollections[0].neType;
                collectionObj.parentId = data.nestedCollections[0].parentId;
                collectionObj.level = data.nestedCollections[0].level;
                collectionObj.name = data.nestedCollections[0].label;
                objects.push(collectionObj);
            }
            if(data.networkObjectsData[0]) {
                var networkObj = {};
                networkObj.category = data.networkObjectsData[0].category;
                networkObj.enableMoveToCollectionButton = data.networkObjectsData[0].enableMoveToCollectionButton;
                networkObj.enableRemoveNodeButton = data.networkObjectsData[0].enableRemoveNodeButton;
                networkObj.hybrid = data.networkObjectsData[0].hybrid;
                networkObj.id = data.networkObjectsData[0].id;
                networkObj.query = data.networkObjectsData[0].query;
                networkObj.type = data.networkObjectsData[0].type;
                networkObj.subType = data.networkObjectsData[0].subType;
                networkObj.moType = data.networkObjectsData[0].type;
                networkObj.neType = data.networkObjectsData[0].neType;
                networkObj.parentId = data.networkObjectsData[0].parent;
                networkObj.level = data.networkObjectsData[0].level;
                networkObj.name = data.networkObjectsData[0].label;
                objects.push(networkObj);
            }

            if(data.nestedCollections[0] || data.networkObjectsData[0]) {
                this.updateActionBar(objects);
            }
            var href, namespaced = false, id = data.networkObjects[0] ? data.networkLabel[0] : (data.collections[0] ? data.collections[0] : data.savedSearches[0]);
            if(data.networkObjects[0] && (data.networkType[0] !== 'SubNetwork')) {
                 var name = "name=";
                 var node = data.networkType[0].concat(" ", name, id);
                 href = '#networkexplorer/search/' + node;
                 this.setLocation(href, namespaced);
            } else if (data.networkObjects[0] && (data.networkType[0] === 'SubNetwork')) {
                 href = '#networkexplorer/search/' + '"'+data.networkFdn[0]+'"';
                 this.setLocation(href, namespaced);
            } else if (data.collections[0]) {
                 href = '#networkexplorer/collection/' + id;
                 this.setLocation(href, namespaced);
                 this.collectionId=data.collections[0];
                 this.enableWebPush();
            } else if (data.savedSearches[0]) {
                 href = '#networkexplorer/savedsearch/' + id;
                 this.setLocation(href, namespaced);
            } else {
                 this.setLocation('#networkexplorer', namespaced);
            }
        },

        /**
         UI Clients subscribe to WebPush Collection-Change Notification if there is update in the Collections in CollectionTab/TopologyTab
         */
         enableWebPush: function () {
              this.disableWebPush();
              this.collectionEvent = WebPush.subscribe('/collection:update', this.handleWebPushEvent.bind(this));

         },

         handleWebPushEvent: function (event) {
            var inputCollectionId = [];
            inputCollectionId.push(this.collectionId);
            if (this.applyRecursiveValue === true) {
                  net.ajax({
                      url: '/object-configuration/collections/v4/recursiveCollections',
                      type: 'POST',
                      contentType: 'application/json',
                      dataType: 'json',
                      data: JSON.stringify(inputCollectionId),
                      success: function(response) {
                          net.ajax({
                              url: '/object-configuration/collections/v4/recursive',
                              type: 'POST',
                              contentType: 'application/json',
                              dataType: 'json',
                              data: JSON.stringify(inputCollectionId),
                              success: function(recursiveResponse) {
                                  this.recursiveResponseSuccess(recursiveResponse, response, event);
                              }.bind(this)
                          });
                      }.bind(this),
                      error: function(postError) {
                          console.error("Error in POST call:", postError);
                      }.bind(this)
                  });
            } else {
                if (event.collectionId === this.collectionId) {
                      this.notificationEventHandler(event);
                }
            }
         },

         recursiveResponseSuccess : function(recursiveResponse, response, event){
               this.recursiveObjects = recursiveResponse.objects;
               if (response.collectionsIds.indexOf(parseInt(event.collectionId)) >= 0) {
                     this.notificationEventHandler(event);
               }
         },

         notificationEventHandler: function(event) {
              if (this.notification) {
                 this.notification.detach();
                 this.notification.destroy();
             }
             this.notification = new Notification({
                 label : "",
                 icon: 'ebIcon ebIcon_infoMsgIndicator',
                 color: 'paleBlue',
                 showCloseButton: true,
                 showAsToast: true,
                 autoDismiss: false
              });
              this.notification.attachTo(this.view.getWebPushNotification());
              var collectionName = event.collectionName.split(', ');
              var el = document.createElement('a');
              el.className = 'Topology-refresh';
              el.innerHTML = 'Refresh';
              el.style = 'cursor:pointer!important;text-decoration:underline!important';

              if (Array.isArray(collectionName)) {
                  this.collections = this.collections.concat(collectionName);
              }
              var uniqCollections = [];
              for (var i = 0; i < this.collections.length; i++) {
                  if (uniqCollections.indexOf(this.collections[i]) === -1) {
                      uniqCollections.push(this.collections[i]);
                  }
              }
              this.collections=uniqCollections;
              this.addWebPushEventHandler(el, uniqCollections.join('", "'));
         },

         addWebPushEventHandler: function (el, collectionName) {
            this.view.getWebPushNotification().find('.ebNotification-label').getNative().innerHTML = resultText = (this.collections.length>5) ? "Collections  "+' "'+this.collections[0]+'" '+", "+' "'+this.collections[1]+'" '+", "+' "'+this.collections[2]+'" '+", "+' "'+this.collections[3]+'" '+", "+' "'+this.collections[4]+'" '+"  and "+(this.collections.length-5)+" more have been updated."+ el.outerHTML : (this.collections.length<=5 && this.collections.length>1) ? "Collections  "+' "'+collectionName+'" '+"  have been updated."+ el.outerHTML : "Collection  "+' "'+collectionName+'" '+"  has been updated." + el.outerHTML;
            this.view.getWebPushNotification().find('.Topology-refresh').addEventHandler("click", this.CollectionRefresh,this);
         },

         CollectionRefresh: function () {
             if (this.applyRecursiveValue === true) {
                 this.collectionDatas = {collectionId : this.collectionId, recursiveArrayData : this.recursiveObjects};
                 this.getEventBus().publish('NetworkExplorer:collectionHash', this.collectionDatas);
                 container.getEventBus().publish('topologyTree:refresh');
                 this.hideRefreshNotification();
                 this.onCloseNotification();
             } else {
                  this.getEventBus().publish('NetworkExplorer:collectionHash', this.collectionId);
                  container.getEventBus().publish('topologyTree:refresh');
                  this.hideRefreshNotification();
                  this.onCloseNotification();
             }
         },
         hideRefreshNotification: function() {
            if (this.notification) {
                this.notification.detach();
                this.notification = undefined;
            }
            this.collections = [];
         },

         disableWebPush: function () {
             if (this.collectionEvent) {
                  WebPush.unsubscribe(this.collectionEvent);
              }
         },

        /**
         * DISABLES return button when nothing is selected in table
         * DISABLES return button when singleSelection is true & exactly 1 item is not selected in table
         * Otherwise return button will be ENABLED
         *
         * @param poidCount
         */
        enableOrDisableReturnButton: function(poidCount) {
            if (this.params.goto) {
                if ((this.params.returnType === this.SINGLE_OBJECT && poidCount === 1) || (this.params.returnType === this.MULTIPLE_OBJECTS && poidCount >= 1)) {
                    this.returnButton.enable();
                } else {
                    this.returnButton.disable();
                }
            }
        },

        /**
         * Adds a return objects button to the actions div and binds click event handlers.
         */
        addReturnButton: function() {
            this.returnButton = new Button({
                caption: this.getReturnButtonCaption(),
                modifiers: [{
                    name: 'color',
                    value: 'green'
                }],
                enabled: false
            });
            this.returnButton.addEventHandler('click', this.onReturnClicked, this);
            this.returnButton.attachTo(this.view.getReturnButton());
        },

        /**
         * Adds a cancel button to the actions div and binds click event handlers.
         */
        addCancelButton: function() {
            this.cancelButton = new Button({
                caption: strings.get('cancel')
            });
            this.cancelButton.addEventHandler('click', this.redirectToGoto, this);
            this.cancelButton.attachTo(this.view.getCancelButton());
        },

        /**
         * LocationChangeEvent handler
         *
         * @param hash new Hash value e.g. #networkexplorer/newvalue?newParam=newValue
         */

        handleLocationChange: function(hash) {

            // extract values after slash ...
            var pathWithoutParams = this.getPathWithoutParams(hash);
            var updateLinksAndTopSection = false;
            var updatedParams = UrlHelper.getUrlParams(hash);
            if (this.params.goto !== updatedParams.goto || this.params.returnType !== updatedParams.returnType) {
                updateLinksAndTopSection = true;
            }
            this.params = updatedParams;
            var collectionData = pathWithoutParams.match(/collection\/(.*)/i);
            collectionData = collectionData === null ? null : collectionData[1];
            var savedSearchData = pathWithoutParams.match(/savedSearch\/(.*)/i);
            savedSearchData = savedSearchData === null ? null : savedSearchData[1];
            var searchData = pathWithoutParams.match(/search\/(.*)/i);
            searchData = searchData === null ? null : searchData[1];

            this.handleHashChange();

            if (updateLinksAndTopSection) {
                this.updateTopSection();
                //this.slidingMenu.updateViewLinks(this.params);
            }

            // Triggers a generic event for the hash change based on the type of hash.
            if (collectionData !== null) {
                if (this.recursiveData.length > 0)
                {
                    this.recursiveCollection(collectionData ,this.recursiveData,this.applyRecursiveValue);
                } else {
                    this.getEventBus().publish('NetworkExplorer:collectionHash', collectionData);
                }
            } else if (savedSearchData !== null) {
                this.getEventBus().publish('NetworkExplorer:savedSearchHash', savedSearchData);
            } else if (searchData !== null) {
                this.getEventBus().publish('NetworkExplorer:searchHash', searchData);
            } else if (!this.queryBuilderOn) {
                this.getEventBus().publish('NetworkExplorer:defaultHash');
            }
            this.getEventBus().publish('NetworkExplorer:hashChange', this.params);
        },

        recursiveCollection : function(collId, recusiveData, applyRecursiveValue){
            this.collectionDatas = {collectionId : collId, recursiveArrayData : recusiveData , applyRecursiveValues : applyRecursiveValue};
            this.getEventBus().publish('NetworkExplorer:collectionHash', this.collectionDatas);
        },

        /**
         * Returns a specified string up to and excluding "?"
         *
         * @param string A string containing a question mark character
         * @returns {String} A substring of the input
         */
        getPathWithoutParams: function(string) {
            var match = string.split('?')[0];
            if (match) {
                return match;
            } else {
                return string;
            }
        },

        /**
         * goto param is handled in root of NetworkExplorer because more than one region will use it.
         * Will trigger isActionPage with a boolean denoting whether there is a gotoParam or not.
         */
        handleHashChange: function() {
            if (this.params.goto) {
                this.view.getElement().setModifier('actionPage');
                this.view.shiftScrollbarAboveObjectActions();

                if (this.returnButton === null) {
                    this.addReturnButton();
                }
                this.returnButton.setCaption(this.getReturnButtonCaption());

                if (this.cancelButton === null) {
                    this.addCancelButton();
                }
            } else {
                this.view.getElement().removeModifier('actionPage');
                this.view.unshiftScrollbar();
            }

            // Double exclamation marks will convert variable to boolean. Falsey values become false, truthy become true
            this.getEventBus().publish('NetworkExplorer:hashChange', this.params);
        },

        /**
         * Sets the location using the LocationController. It will ensure that the all GET parameters are retained when
         * the location is set. namespaced is true by default, causing setLocation to automatically prepend the
         * application namespace (#networkexplorer).
         *
         * @param {String} location
         * @param {Boolean} namespaced
         * @param {Boolean} preventListeners
         * @param {Boolean} stripContext false by default. When true, goto and singleSelection contexts are not added to the URL.
         * @param {Boolean} isRedirect false by default. When true, browser history is not updated.
         */
        setLocation: function(location, namespaced, preventListeners, stripContext, isRedirect) {
            namespaced = (namespaced !== false);
            preventListeners = preventListeners || false;
            // If the same URL is detected, simply force a refresh of results
            if (window.location.hash === location) {
                this.handleLocationChange(location);
                return;
            }
            if (this.params && !stripContext) {
                var nextParamChar = location.indexOf('?') < 0 ? '?' : '&';
                if (this.params.goto) {
                    location += nextParamChar + 'goto=' + encodeURIComponent(this.params.goto);
                    nextParamChar = '&';
                }
                if (this.params.selectionDisabled) {
                    location += nextParamChar + 'selectionDisabled=' + encodeURIComponent(this.params.selectionDisabled);
                    nextParamChar = '&';
                }
                if (this.params.singleSelection && !this.params.returnType) {
                    this.params.returnType = this.SINGLE_OBJECT;
                }
                if (this.params.returnType) {
                    location += nextParamChar + 'returnType=' + encodeURIComponent(this.params.returnType);
                    nextParamChar = '&';
                }
                if (this.params.singleSelection) {
                    location += nextParamChar + 'singleSelection=' + this.params.singleSelection;
                }
            }
            if (namespaced) {
                this.locationController.setLocation('networkexplorer/' + location, preventListeners, isRedirect);
            } else {
                this.locationController.setLocation(location, preventListeners, isRedirect);
            }
        },

        /**
         * Takes the current URL and changes the URI parameters to the given key/value pairs.
         *
         * @method setURIParameters
         * @param {Object} uriParams
         * @param {Boolean} preventListeners
         * @param {Boolean} isRedirect false by default. When true, browser history is not updated by URI change.
         */
        setURIParameters: function(uriParams, preventListeners, isRedirect) {
            var currentLocation = this.locationController.getLocation();
            var newLocation = this.getPathWithoutParams(currentLocation);
            var firstParamAppended = false;
            for (var key in uriParams) {
                if (firstParamAppended) {
                    newLocation += '&';
                } else {
                    newLocation += '?';
                    firstParamAppended = true;
                }
                newLocation += key + '=' + encodeURIComponent(uriParams[key]);
            }
            this.setLocation(newLocation, false, preventListeners, false, isRedirect);
        },

        /**
         * Shows a notification as a toast at the top of the page. Takes the same parameters as the Notification
         * constructor
         */
        showToast: function(options) {
            if (this.notification) {
                this.removeToast();
            }
            this.toastCounter++;
            if (this.notification === null) {
                options.showAsToast = options.showAsToast || true;
                this.notification = new Notification(options);
                this.notification.attachTo(this.getElement());
                this.notification.addEventHandler('close', this.onCloseNotification, this);
            }
        },

        /**
         * Shows a notification for Remove object from the collections as a toast at the top of the page.
         * Takes the same parameters as the Notification constructor
         *
         * @method showToastForRemove
         * @param {Object} options contains parameters to be displayed in the notification
         */
        showToastForRemove: function(options) {
            if (this.notification) {
                this.removeToast();
            }
            options.showAsToast = options.showAsToast || true;
            this.notification = new Notification(options);
            this.notification.attachTo(this.getElement());
            this.notification.addEventHandler('close', this.onCloseNotification, this);
        },

        /**
         * Removes a notification from the top of the page
         */
        removeToast: function() {
            this.toastCounter = this.toastCounter === 0 ? 0 : this.toastCounter - 1;
            if (this.toastCounter === 0 && this.notification !== null) {
                this.notification.close();
            }
        },

        /**
         * Called when notification receives a close event.
         * Sets notification to null and toast counter to zero
         */
        onCloseNotification: function() {
            this.notification = null;
            this.toastCounter = 0;

        },

        /**
         * Redirect browser to the specified goto Param without the collections GET parameter.
         */
        redirectToGoto: function() {
            this.locationController.setLocation(this.params.goto);
        },

        /**
         * Redirect browser to the specified goto parameter, including a GET parameter of key 'collections', with the
         * value being the collection id of the created temporary collection. For example "#pmic/?collections=12345"
         *
         * @param collection Stringified collection object, represents the collection that was created successfully
         */
        redirectToGotoWithCollection: function(collection) {
            collection = JSON.parse(collection);
            var gotoParamWithCollections = this.params.goto;
            // If the goto URL already has GET parameters, we need to use & instead of ?
            if (this.params.goto.indexOf('?') > -1) {
                gotoParamWithCollections += '&collections=' + collection.id;
            } else {
                gotoParamWithCollections += '?collections=' + collection.id;
            }
            gotoParamWithCollections += '&generatedCollection=true';
            this.view.hideLoadingAnimation();
            this.locationController.setLocation(gotoParamWithCollections);
        },

        /**
         * Shows an error dialog when creating a temporary collection fails.
         *
         * @param shortMessage descriptive message from REST service. Useful for logging only
         * @param xhr response object
         */
        showReturnObjectsError: function(shortMessage, xhr) {
            var headerString,
                contentString,
                errorObject = xhr.getResponseJSON();
            if(errorObject.internalErrorCode === 10022) {
                var limit = errorObject.userMessage.body.replace(/\D/g, '');
                headerString = strings.get('maximumLimitExceeded');
                contentString = strings.get('selectionHasExceededLimit').replace('%1', limit);
            } else {
                headerString = strings.get('returnErrorHeader');
                contentString = strings.get('returnErrorMessage');
            }
            this.view.hideLoadingAnimation();
            var dialog = new Dialog({
                header: headerString,
                content: contentString,
                type: 'error',
                buttons: [{
                    caption: strings.get('ok'),
                    action: function() {
                        dialog.destroy();
                    },
                    color: 'darkBlue'
                }]
            });
            dialog.show();
        },

        /**
         * Redirects to the the goto URL from this.params.goto and includes the selected poId as a URI parameter.
         *
         * @method redirectToGotoWithPoId
         * @param {Array} poIds
         */
        redirectToGotoWithPoId: function(poIds) {
            var newPoId = poIds[0]; // Event passes an array, we just want the first item.
            var newLocation;

            /*
             * if poid is already specified in the goto url, we want to replace that value instead of append
             * e.g. if the new poId is 987654, then topologybrowser?poid=123456 will become topologybrowser?poid=987654,
             *      and topologybrowser?param1=val1&poid=123456 will become topologybrowser?param1=val1&poid=987654
             */
            if (this.params.goto.match(/[&?]poid\=\d+/gi)) {
                /*
                 * Replaces the poid URI param in the goto. $1 will reference exactly what ([?&]poid\=) matched, newPoId
                 * will replace what matched (\d+), and $3 will reference what (.*) matched.
                 */
                newLocation = this.params.goto.replace(/([?&]poid\=)(\d+)(.*)/gi, '$1' + newPoId + '$3');
            }
            /*
             * if there's already a ? in the goto url and no poid param already exists, append the poid with an &
             * e.g. if the selected poId is 987654 topologybrowser?param1=val1 becomes
             *      topologybrowser?param1=val1&poid=987654
             */
            else if (this.params.goto.indexOf('?') >= 0) {
                newLocation = this.params.goto + '&poid=' + newPoId;
            }
            /*
             * if there is NOT already a ? in the goto url and no poid param already exists, append the poid with an ?
             * e.g. if the selected poId is 987654 topologybrowser becomes topologybrowser?poid=987654
             */
            else {
                newLocation = this.params.goto + '?poid=' + newPoId;
            }

            this.locationController.setLocation(newLocation);
        },

        /**
         * Trigger the NetworkExplorer:sendSelectedPoIdsToCallback event to get all the selected poIds from a region that can provide them
         */
        onReturnClicked: function() {
            if (this.params.singleSelection || this.params.returnType === this.SINGLE_OBJECT) {
                this.getEventBus().publish('NetworkExplorer:sendSelectedPoIdsToCallback', this.redirectToGotoWithPoId.bind(this));
            } else {
                this.getEventBus().publish(this.params.selectionDisabled ? 'NetworkExplorer:sendAllPoIdsToCallback' :
                    'NetworkExplorer:sendSelectedPoIdsToCallback', this.createTemporaryCollection.bind(this));
            }
        },

        /**
         * Create a collection with the name "auto_generated_<timestamp>" to provide to calling application.
         *
         * @param poIds Array of poIds
         */
        createTemporaryCollection: function(poIds) {
            this.view.showLoadingAnimation();
            net.ajax({
                url: '/object-configuration/v1/collections',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: 'auto_generated_' + Date.now(),
                    objects: poIds.map(function(obj) { return {id: obj}; }),
                    category: 'autoGenerated'
                }),
                success: this.redirectToGotoWithCollection.bind(this),
                error: this.showReturnObjectsError.bind(this)
            });
        },

        /**
         * Updates the topsection with updated breadcrumb with goto params in the links.
         *
         * @method updateTopSection
         */
        updateTopSection: function() {
            if (this.layout) {
                this.layout.destroy();
            }
            this.layout = new TopSection({
                title: strings.get('networkExplorer'),
                breadcrumb: this.getBreadcrumbWithContext(),
                context: this.getContext(),
                showBackToTop: false,
                actionsCaption: strings.get('actionsDropdownCaption')
            });
            this.slidingPanels = this.createSlidingPanels();
            this.layout.setContent(this.slidingPanels);
            this.layout.attachTo(this.view.getContent());
        },

        /**
         * Updates the breadcrumb with goto params in the links.
         *
         * @method getBreadcrumbWithContext
         * @returns {Object} params URL parameters as a 1-level deep object
         */
        getBreadcrumbWithContext: function() {
            var breadcrumb = JSON.parse(JSON.stringify(this.options.breadcrumb));
            if (this.params.goto) {
                var urlParams = '?goto=' + encodeURIComponent(this.params.goto) + '&returnType=' +  this.params.returnType;
                for (var i = 1; i < breadcrumb.length; i++) {
                    breadcrumb[i].url += urlParams;
                    for (var j = 0; breadcrumb[i].children && j < breadcrumb[i].children.length; j++) {
                        breadcrumb[i].children[j].url += urlParams;
                    }
                }
            }
            return breadcrumb;
        },

        /**
         * Returns return button captions based on current return type.
         *
         * @method getReturnButtonCaption
         * @returns String
         */
        getReturnButtonCaption: function() {
            var returnButtonCaption;
            switch (this.params.returnType) {
            case this.SINGLE_OBJECT: returnButtonCaption = strings.get('returnSingleObject');
                break;

            case this.MULTIPLE_OBJECTS: returnButtonCaption = strings.get('returnMultipleObjects');
                break;

            case this.COLLECTIONS: returnButtonCaption = strings.get('returnSelectedCollections');
                break;

            case this.SAVED_SEARCHES: returnButtonCaption = strings.get('returnSelectedSavedSearches');
                break;

            default: returnButtonCaption = strings.get('returnTypeInvalid');
            }
            return returnButtonCaption;
        },

        hideLoading: function() {
            this.view.hideLoadingAnimation();
        },

        showLoading: function() {
            this.view.showLoadingAnimation();
        },

        /**
         * Sets enabled flag on Criteria Builder.
         */
        setQueryBuilderOn: function() {
            this.queryBuilderOn = true;
        },

        /**
         * Sets disabled flag on Criteria Builder.
         */
        setQueryBuilderOff: function() {
            this.queryBuilderOn = false;
        },

        /**
         * Sets the location back to default networkexplorer.
         */
        resetLocation: function() {
            this.locationController.setLocation('networkexplorer', true, true);
        },

        /**
         * Called when a notification of a failed TopologyCollectionService request occurs.
         *
         * @method onCollectionFetchError
         * @param errorBody
         */
        onCollectionFetchError: function(errorBody) {
            if (errorBody && errorBody.objectNotFound) {
                this.slidingMenu.fetchListData();
            }
        },

        showCollectionErrorDialog: function(options) {
            this.view.hideLoadingAnimation();
            var dialog = new Dialog({
                header: options.header,
                content: options.content,
                type: 'error',
                buttons: [{
                    caption: strings.get('ok'),
                    action: function() {
                        dialog.hide();
                    },
                    color: 'darkBlue'
                }]
            });
            dialog.show();
        }

    });
});
