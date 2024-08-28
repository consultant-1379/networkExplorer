define([
    'jscore/ext/net',
    'jscore/core',
    'networkexplorer/NetworkExplorer',
    'networkexplorer/NetworkExplorerView',
    'layouts/TopSection',
    'layouts/MultiSlidingPanels',
    'networkexplorer/regions/SlidingMenu/SlidingMenu',
    'widgets/Notification',
    'widgets/Button',
    'widgets/Dialog',
    'networkexplorer/utils/UrlHelper',
    'container/api',
    'i18n!networkexplorer/app.json',
    'webpush/main'
], function(net, core, NetworkExplorer, View, TopSection, MultiSlidingPanels, SlidingMenu, Notification, Button, Dialog, UrlHelper, container, strings, WebPush) {

    describe('NetworkExplorer', function() {

        var networkExplorer, _sandbox;

        beforeEach(function() {
            _sandbox = sinon.sandbox.create();
            networkExplorer = new NetworkExplorer();
        });

        afterEach(function() {
            _sandbox.restore();
        });

        it('NetworkExplorer is defined', function() {
            expect(NetworkExplorer).to.be.defined;
        });

        describe('onStart', function() {
            it('for the sake of code coverage', function() {
                // ARRANGE
                _sandbox.stub(SlidingMenu.prototype);
                _sandbox.stub(TopSection.prototype);
                _sandbox.stub(networkExplorer, 'handleHashChange');
                _sandbox.stub(networkExplorer, 'updateTopSection');
                networkExplorer.view =  sinon.createStubInstance(View);
                var eventBusStub = sinon.createStubInstance(core.EventBus);
                networkExplorer.getContext = function() {
                    var stub = sinon.createStubInstance(core.AppContext);
                    stub.eventBus = eventBusStub;
                    return stub;
                };
                networkExplorer.getEventBus = function() {
                    return eventBusStub;
                };

                // ACT
                networkExplorer.onStart();

                // ASSERT
                expect(networkExplorer.locationController).to.not.equal(undefined);

                // CLEANUP
                networkExplorer.onStop();
            });
        });

        describe('onStop', function() {
            it('for the sake of code coverage', function() {
                // ARRANGE
                networkExplorer.locationController = _sandbox.stub({
                    removeLocationListener: function() {}
                });

                //ACT
                networkExplorer.onStop();

                // ASSERT
                expect(networkExplorer.locationController.removeLocationListener.callCount).to.equal(1);
            });
        });

        describe('onResume()', function() {
            it('should publish NetworkExplorer:appLoaded event', function() {
                // ARRANGE
                var preserveState = "true";
                var eventBusStub = {
                    publish: function() {}
                };
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                    return eventBusStub;
                });
                _sandbox.spy(eventBusStub, 'publish');
                networkExplorer.slidingMenu = _sandbox.stub({
                    clearListDataAndFetch: function() {}
                });

                // ACT
                networkExplorer.onResume();

                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:appLoaded')).to.equal(true);
            });

            it('should not publish NetworkExplorer:appLoaded event', function() {
                // ARRANGE
                var preserveState = "false";
                var eventBusStub = {
                    publish: function() {}
                };
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                    return eventBusStub;
                });
                _sandbox.spy(eventBusStub, 'publish');
                networkExplorer.slidingMenu = _sandbox.stub({
                    clearListDataAndFetch: function() {}
                });

                // ACT
                networkExplorer.onResume();

                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:appLoaded')).to.equal(true);
            });
        });

        describe('init()',function() {
            it('should initialize the NetworkExplorer correctly', function(done) {
                _sandbox.stub(networkExplorer, 'onActionSuccessCallBack');
                _sandbox.stub(networkExplorer, 'onActionFailureCallBack');

                //ACT
                networkExplorer.init();

                done();
            });
        });

        describe('onActionSuccessCallBack()', function() {
            it('should call back if button click got success',function() {
                var eventBusStub = {
                    publish: function() {}
                };
                 _sandbox.spy(eventBusStub, 'publish');
                 _sandbox.stub(networkExplorer, 'getEventBus', function() {
                    return eventBusStub;
                 });

                var object = [{"action": "networkexplorer-set-to-public", data:[{"id":"1111"}]}];

                networkExplorer.onActionSuccessCallBack(object);

                expect(eventBusStub.publish.callCount).to.equal(0);
                //expect(eventBusStub.publish.getCall(0).calledWith('topologybrowser:reload-action-bar')).to.equal(true)
            });
        });

        describe("enableWebpush()", function () {

            it('should call disableWebPush()', function () {

                //ARRANGE
                networkExplorer.collectionEvent = []
                _sandbox.spy(networkExplorer, 'disableWebPush');
                _sandbox.stub(WebPush, 'subscribe', function() {});
                _sandbox.stub(WebPush, 'unsubscribe', function() {});
                _sandbox.spy(networkExplorer, 'handleWebPushEvent');

                //ACT
                networkExplorer.enableWebPush();
                //ASSERT
                expect(networkExplorer.disableWebPush.callCount).to.equal(1);

            });

            it('should call handleWebPushEvent', function () {
                networkExplorer.collectionId = "38831";
                var event = {
                    "collectionId": "38831",
                    "collectionName": "collection1"
                };
                 networkExplorer.view = sinon.createStubInstance(View);
                 networkExplorer.notification = null;
                 _sandbox.spy(networkExplorer, 'handleWebPushEvent');
                 _sandbox.stub(Notification.prototype, 'addEventHandler', function() {});
                 _sandbox.stub(Notification.prototype, 'attachTo', function() {});
                 _sandbox.stub(networkExplorer, 'addWebPushEventHandler', function () { });
                 _sandbox.spy(Notification.prototype, 'init');

                 //ACT
                networkExplorer.handleWebPushEvent(event);

                //ASSERT
                expect(Notification.prototype.init.callCount).to.equal(1);
                expect(Notification.prototype.attachTo.callCount).to.equal(1);
                expect(Notification.prototype.attachTo.getCall(0).calledWith(networkExplorer.view.getWebPushNotification())).to.equal(true);
                expect(Notification.prototype.addEventHandler.callCount).to.equal(0);
                expect(networkExplorer.addWebPushEventHandler.callCount).to.equal(1);
            });
            it('should call handleWebPushEvent with recursiveValue as true', function () {
                networkExplorer.collectionId = "38831";
                networkExplorer.applyRecursiveValue = true;

                var event = {
                    "collectionId": "38831",
                    "collectionName": "collection1"
                };
                 networkExplorer.view = sinon.createStubInstance(View);
                 networkExplorer.notification = null;
                 _sandbox.spy(networkExplorer, 'handleWebPushEvent');
                 _sandbox.stub(Notification.prototype, 'addEventHandler', function() {});
                 _sandbox.stub(Notification.prototype, 'attachTo', function() {});
                 _sandbox.stub(networkExplorer, 'addWebPushEventHandler', function () { });
                 _sandbox.spy(Notification.prototype, 'init');

                 //ACT
                networkExplorer.handleWebPushEvent(event);

                //ASSERT
                expect(Notification.prototype.addEventHandler.callCount).to.equal(0);
                expect(networkExplorer.addWebPushEventHandler.callCount).to.equal(0);
            });
            it('should call recursiveResponseSuccess', function () {
                var recursiveResponse = {
                                            "objects": [
                                                42001,
                                                42002,
                                                42003,
                                                42004
                                            ]
                                        };
                var applyRecursiveValue = {
                                              "collectionsIds": [
                                                  65032,
                                                  65033,
                                                  65034,
                                                  65031
                                              ]
                                          };

                var event = {
                    "collectionId": "38831",
                    "collectionName": "collection1"
                };
                 networkExplorer.view = sinon.createStubInstance(View);
                 networkExplorer.notification = null;
                 _sandbox.spy(networkExplorer, 'handleWebPushEvent');
                 _sandbox.stub(Notification.prototype, 'addEventHandler', function() {});
                 _sandbox.stub(Notification.prototype, 'attachTo', function() {});
                 _sandbox.stub(networkExplorer, 'notificationEventHandler', function () { });
                 _sandbox.spy(Notification.prototype, 'init');

                 //ACT
                networkExplorer.recursiveResponseSuccess(recursiveResponse, applyRecursiveValue, event);

                //ASSERT
                expect(Notification.prototype.addEventHandler.callCount).to.equal(0);
                expect(networkExplorer.notificationEventHandler.callCount).to.equal(0);
            });
            it('should call recursiveResponseSuccess without matching data', function () {
                var recursiveResponse = {
                                            "objects": [
                                                42001,
                                                42002,
                                                42003,
                                                42004
                                            ]
                                        };
                var applyRecursiveValue = {
                                              "collectionsIds": [
                                                  65032,
                                                  65033,
                                                  65034,
                                                  38831
                                              ]
                                          };

                var event = {
                    "collectionId": "38831",
                    "collectionName": "collection1"
                };
                 networkExplorer.view = sinon.createStubInstance(View);
                 networkExplorer.notification = null;
                 _sandbox.spy(networkExplorer, 'handleWebPushEvent');
                 _sandbox.stub(Notification.prototype, 'addEventHandler', function() {});
                 _sandbox.stub(Notification.prototype, 'attachTo', function() {});
                 _sandbox.stub(networkExplorer, 'notificationEventHandler', function () { });
                 _sandbox.spy(Notification.prototype, 'init');

                 //ACT
                networkExplorer.recursiveResponseSuccess(recursiveResponse, applyRecursiveValue, event);

                //ASSERT
                expect(Notification.prototype.addEventHandler.callCount).to.equal(0);
                expect(networkExplorer.notificationEventHandler.callCount).to.equal(1);
            });
            it('should call handleWebPushEvent with multiple collections', function () {
                networkExplorer.collectionId = "38831";
                var event = {
                    "collectionId": "38831",
                    "collectionName": "collection1,collection2"
                };
                 networkExplorer.view = sinon.createStubInstance(View);
                 networkExplorer.notification = null;
                 _sandbox.spy(networkExplorer, 'handleWebPushEvent');
                 _sandbox.stub(Notification.prototype, 'addEventHandler', function() {});
                 _sandbox.stub(Notification.prototype, 'attachTo', function() {});
                 _sandbox.stub(networkExplorer, 'addWebPushEventHandler', function () { });
                 _sandbox.spy(Notification.prototype, 'init');

                 //ACT
                networkExplorer.handleWebPushEvent(event);

                //ASSERT
                expect(Notification.prototype.init.callCount).to.equal(1);
                expect(Notification.prototype.attachTo.callCount).to.equal(1);
                expect(Notification.prototype.attachTo.getCall(0).calledWith(networkExplorer.view.getWebPushNotification())).to.equal(true);
                expect(Notification.prototype.addEventHandler.callCount).to.equal(0);
                expect(networkExplorer.addWebPushEventHandler.callCount).to.equal(1);
            });
        it('should not call handleWebPushEvent if different collection is updated', function () {
            networkExplorer.collectionId = "38832";
            var event = {
                "collectionId": "38831",
                "collectionName": "collection1"
            };
             networkExplorer.view = sinon.createStubInstance(View);
             networkExplorer.notification = null;
             _sandbox.spy(networkExplorer, 'handleWebPushEvent');
             _sandbox.stub(Notification.prototype, 'addEventHandler', function() {});
             _sandbox.stub(Notification.prototype, 'attachTo', function() {});
             _sandbox.stub(networkExplorer, 'addWebPushEventHandler', function () { });
             _sandbox.spy(Notification.prototype, 'init');

             //ACT
            networkExplorer.handleWebPushEvent(event);

            //ASSERT
            expect(Notification.prototype.init.callCount).to.equal(0);
        });

        it('should not call handleWebPushEvent if notification is not updated', function () {
            networkExplorer.collectionId = "38831";
            var event = {
                "collectionId": "38831",
                "collectionName": "collection1"
            };

            networkExplorer.view = sinon.createStubInstance(View);
            networkExplorer.notification = {
               detach: function () {},
               destroy: function () { }
             };
            _sandbox.spy(networkExplorer, 'handleWebPushEvent');
             _sandbox.stub(Notification.prototype, 'addEventHandler', function() {});
             _sandbox.stub(Notification.prototype, 'attachTo', function() {});
             _sandbox.stub(networkExplorer, 'addWebPushEventHandler', function () { });
             _sandbox.spy(Notification.prototype, 'init');

             //ACT
            networkExplorer.handleWebPushEvent(event);

            //ASSERT
            expect(Notification.prototype.init.callCount).to.equal(1);
        });

        it('should call CollectionRefresh Notification Message', function () {
            //ARRANGE
            var eventBusStub = {
            publish: function() {}
            };
             _sandbox.spy(eventBusStub, 'publish');
             _sandbox.stub(networkExplorer, 'getEventBus', function() {
             return eventBusStub;
             });
             _sandbox.spy(networkExplorer, 'CollectionRefresh');

             //ACT
             networkExplorer.CollectionRefresh();

             //ASSERT
             expect(networkExplorer.CollectionRefresh.callCount).to.be.equal(1);
             expect(eventBusStub.publish.callCount).to.equal(1);
             expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:collectionHash')).to.equal(true)
        });

        it('should call CollectionRefresh Notification Message with recursiveValue as true', function () {
            //ARRANGE
            networkExplorer.applyRecursiveValue = true;
            var eventBusStub = {
            publish: function() {}
            };
             _sandbox.spy(eventBusStub, 'publish');
             _sandbox.stub(networkExplorer, 'getEventBus', function() {
             return eventBusStub;
             });
             _sandbox.spy(networkExplorer, 'CollectionRefresh');

             //ACT
             networkExplorer.CollectionRefresh();

             //ASSERT
             expect(networkExplorer.CollectionRefresh.callCount).to.be.equal(1);
             expect(eventBusStub.publish.callCount).to.equal(1);
             expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:collectionHash')).to.equal(true)
        });

        });

        describe('enableOrDisableReturnButton', function() {

            beforeEach(function() {
                networkExplorer.returnButton = _sandbox.stub({
                    enable: function() {},
                    disable: function() {}
                });
            });

            it('When returnType is singleObject and the poidCount is equal to 1, it should enable the return button', function() {
                // ARRANGE
                networkExplorer.params = {
                    goto: 'testApp',
                    returnType: 'singleObject'
                };

                //ACT
                networkExplorer.enableOrDisableReturnButton(1);

                // ASSERT
                expect(networkExplorer.returnButton.enable.callCount).to.equal(1);
                expect(networkExplorer.returnButton.disable.callCount).to.equal(0);
            });

            it('When returnType is singleObject and the poidCount is equal to 0, it should disable the return button', function() {
                // ARRANGE
                networkExplorer.params = {
                    goto: 'testApp',
                    returnType: 'singleObject'
                };

                //ACT
                networkExplorer.enableOrDisableReturnButton(0);

                // ASSERT
                expect(networkExplorer.returnButton.enable.callCount).to.equal(0);
                expect(networkExplorer.returnButton.disable.callCount).to.equal(1);
            });

            it('When returnType is singleObject and the poidCount is greater than 1, it should disable the return button', function() {
                // ARRANGE
                networkExplorer.params = {
                    goto: 'testApp',
                    returnType: 'singleObject'
                };

                //ACT
                networkExplorer.enableOrDisableReturnButton(2);

                // ASSERT
                expect(networkExplorer.returnButton.enable.callCount).to.equal(0);
                expect(networkExplorer.returnButton.disable.callCount).to.equal(1);
            });

            it('When returnType is multipleObjects and the poidCount is 0, it should disable the return button', function() {
                // ARRANGE
                networkExplorer.params = {
                    goto: 'testApp',
                    returnType: 'multipleObjects'
                };

                //ACT
                networkExplorer.enableOrDisableReturnButton(0);

                // ASSERT
                expect(networkExplorer.returnButton.enable.callCount).to.equal(0);
                expect(networkExplorer.returnButton.disable.callCount).to.equal(1);
            });

            it('When returnType is multipleObjects and the poidCount is greater than 0, it should enable the return button', function() {
                // ARRANGE
                networkExplorer.params = {
                    goto: 'testApp',
                    returnType: 'multipleObjects'
                };

                //ACT
                networkExplorer.enableOrDisableReturnButton(1);

                // ASSERT
                expect(networkExplorer.returnButton.enable.callCount).to.equal(1);
                expect(networkExplorer.returnButton.disable.callCount).to.equal(0);
            });
        });

        describe('addReturnButton()', function() {
            it('should initialise the cancel button, and bind click event handler, and attach it to the view', function() {
                // ARRANGE
                _sandbox = sinon.sandbox.create();
                var returnButtonStub = {};
                var viewStub = {
                    getReturnButton: function() {
                        return returnButtonStub;
                    }
                };
                networkExplorer.view = viewStub;
                _sandbox.stub(Button.prototype, 'addEventHandler', function() {});
                _sandbox.stub(Button.prototype, 'attachTo', function() {});
                _sandbox.spy(Button.prototype, 'init');
                _sandbox.stub(networkExplorer, 'getReturnButtonCaption');

                networkExplorer.params = {};

                // ACT
                networkExplorer.addReturnButton();

                // ASSERT
                expect(networkExplorer.getReturnButtonCaption.callCount).to.equal(1);
                expect(networkExplorer.returnButton).to.not.equal(null);
                expect(Button.prototype.init.getCall(0).calledWith({
                    caption: networkExplorer.getReturnButtonCaption(),
                    modifiers: [{
                        name: 'color',
                        value: 'green'
                    }],
                    enabled: false
                })).to.equal(true);
                expect(Button.prototype.addEventHandler.callCount).to.equal(1);
                expect(Button.prototype.addEventHandler.getCall(0).
                    calledWith('click', networkExplorer.onReturnClicked, networkExplorer)).
                    to.equal(true);
                expect(Button.prototype.attachTo.callCount).to.equal(1);
                expect(Button.prototype.attachTo.getCall(0).calledWith(returnButtonStub)).to.equal(true);

                // CLEANUP
                _sandbox.restore();
            });
        });

        describe('addCancelButton()', function() {
            it('should initialise the cancel button, and bind click event handler, and attach it to the view', function() {
                // ARRANGE
                _sandbox = sinon.sandbox.create();
                var cancelButtonStub = {};
                var viewStub = {
                    getCancelButton: function() {
                        return cancelButtonStub;
                    }
                };
                networkExplorer.view = viewStub;
                _sandbox.stub(Button.prototype, 'addEventHandler', function() {});
                _sandbox.stub(Button.prototype, 'attachTo', function() {});
                _sandbox.spy(Button.prototype, 'init');

                // ACT
                networkExplorer.addCancelButton();

                // ASSERT
                expect(networkExplorer.cancelButton).to.not.equal(null);
                expect(Button.prototype.init.getCall(0).calledWith({
                    caption: 'Cancel'
                })).to.equal(true);
                expect(Button.prototype.addEventHandler.callCount).to.equal(1);
                expect(Button.prototype.addEventHandler.getCall(0).
                    calledWith('click', networkExplorer.redirectToGoto, networkExplorer)).
                    to.equal(true);
                expect(Button.prototype.attachTo.callCount).to.equal(1);
                expect(Button.prototype.attachTo.getCall(0).calledWith(cancelButtonStub)).to.equal(true);

                // CLEANUP
                _sandbox.restore();
            });
        });

        describe('handleLocationChange', function() {
            var networkExplorer, eventBusStub;

            beforeEach(function() {
                //ARRANGE
                _sandbox = sinon.sandbox.create();
                networkExplorer = new NetworkExplorer();
                networkExplorer.params = {};
                _sandbox.stub(networkExplorer, 'handleHashChange', function() {});
                _sandbox.stub(networkExplorer, 'updateTopSection', function() {});
                 networkExplorer.recursiveData = ['123456','123456'];
                 networkExplorer.applyRecursiveValues = true;
                networkExplorer.slidingMenu = _sandbox.stub({
                    updateViewLinks: function() {}
                });
                eventBusStub = {
                    publish: function() {}
                };
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                    return eventBusStub;
                });
                _sandbox.spy(eventBusStub, 'publish');
            });

            afterEach(function() {
                //CLEANUP
                _sandbox.restore();
            });

            it('Should initialize params object containing supported params.', function() {
                //ARRANGE
                var hash = 'networkexplorer/blah';
                var expectedParams = {};

                //ACT
                networkExplorer.handleLocationChange(hash);

                //ASSERT
                expect(JSON.stringify(networkExplorer.params)).to.equal(JSON.stringify(expectedParams));
            });

            it('Should call loadCollection if hash contains collection data', function() {
                //ARRANGE
                var expectedPoId = '455891564';
                var hash = 'networkexplorer/collection/' + expectedPoId;

                //ACT
                networkExplorer.handleLocationChange(hash);

                //ASSERT
                expect(eventBusStub.publish.callCount).to.equal(2);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:collectionHash', expectedPoId)).to.equal(false);
                 expect(eventBusStub.publish.getCall(1).calledWith('NetworkExplorer:hashChange')).to.equal(true);
                expect(networkExplorer.handleHashChange.callCount).to.equal(1);
                expect(networkExplorer.updateTopSection.callCount).to.equal(0);
                expect(networkExplorer.slidingMenu.updateViewLinks.callCount).to.equal(0);
                expect(networkExplorer.recursiveCollection).not.to.undefined;
                expect(networkExplorer.recursiveValue).to.be.undefined;
            });

            it('Should call loadSearch if hash contains search data', function() {
                //ARRANGE
                var expectedSearch = 'ERBS1';
                var hash = 'networkexplorer/search/' + expectedSearch;

                //ACT
                networkExplorer.handleLocationChange(hash);

                //ASSERT
                expect(eventBusStub.publish.callCount).to.equal(2);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:searchHash', expectedSearch)).to.equal(true);
                expect(eventBusStub.publish.getCall(1).calledWith('NetworkExplorer:hashChange')).to.equal(true);
                expect(networkExplorer.handleHashChange.callCount).to.equal(1);
                expect(networkExplorer.updateTopSection.callCount).to.equal(0);
                expect(networkExplorer.slidingMenu.updateViewLinks.callCount).to.equal(0);
            });

            it('Should do nothing if hash contains neither collection or search data', function() {
                //ACT
                networkExplorer.handleLocationChange('networkexplorer');

                //ASSERT
                expect(eventBusStub.publish.callCount).to.equal(2);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:defaultHash')).to.equal(true);
                expect(eventBusStub.publish.getCall(1).calledWith('NetworkExplorer:hashChange')).to.equal(true);
                expect(networkExplorer.handleHashChange.callCount).to.equal(1);
                expect(networkExplorer.updateTopSection.callCount).to.equal(0);
                expect(networkExplorer.slidingMenu.updateViewLinks.callCount).to.equal(0);
            });
        });

        describe('recursiveCollection',function(){

        it('Should pass recursive colletionIds and collectionId',function(){
            //ARRANGE
            var CollIds = '123';
            var recursiveIDs = ['123456','123456'];
            var applyRecursiveValues = true;
            var  eventBusStub;
             eventBusStub = {
                                publish: function() {}
                            };
                            _sandbox.stub(networkExplorer, 'getEventBus', function() {
                                return eventBusStub;
                            });
                            _sandbox.spy(eventBusStub, 'publish');
            var events = {
                            "collectionId": CollIds,
                            "recursrrayDataiveA":recursiveIDs,
                            "applyRecursiveValues":applyRecursiveValues
                        };

            //ACT
            networkExplorer.recursiveCollection(CollIds,recursiveIDs,applyRecursiveValues);

            //ASSERT
            expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:collectionHash', events)).to.equal(false);
            });
        });

        describe('getPathWithoutParams', function() {
            it('should get url without the goto', function() {
                //ARRANGE
                var hash = 'networkexplorer/collection/02123564?goto=asdf&otherParam=11';

                //ACT
                var returnValue = networkExplorer.getPathWithoutParams(hash);

                //ASSERT
                expect(returnValue).to.equal('networkexplorer/collection/02123564');
            });

            it('should return string up to "?", not inclusive', function() {
                // ARRANGE
                var result = null;

                // ACT
                result = networkExplorer.getPathWithoutParams('https://hoSTNAme/~user1%203/path?queryString=Value123');

                // ASSERT
                expect(result).to.equal('https://hoSTNAme/~user1%203/path');
            });

            it('should return input string when no "?" is present', function() {
                // ARRANGE
                var result = null;

                // ACT
                result = networkExplorer.getPathWithoutParams('https://hoSTNAme/~user1%203/path-queryString=Value123');

                // ASSERT
                expect(result).to.equal('https://hoSTNAme/~user1%203/path-queryString=Value123');
            });
        });

        describe('handleHashChange', function() {
            var eventBusStub, viewElem, returnButtonElem, networkExplorer;

            beforeEach(function() {
                //ARRANGE
                _sandbox = sinon.sandbox.create();
                eventBusStub = {
                    publish: function() {}
                };
                networkExplorer = new NetworkExplorer();
                networkExplorer.view =  sinon.createStubInstance(View);

                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                    return eventBusStub;
                });
                _sandbox.spy(eventBusStub, 'publish');

                // giv element someClass to satisfy API of setModifier
                viewElem = core.Element.parse('<div class="someClass"></div>');
                returnButtonElem = core.Element.parse('<div class="buttonStub"></div>');

                _sandbox.stub(networkExplorer, 'addCancelButton');
                _sandbox.stub(networkExplorer, 'getReturnButtonCaption');
                _sandbox.stub(viewElem, 'setModifier');
                _sandbox.stub(viewElem, 'removeModifier');

                networkExplorer.view.getElement.returns(viewElem);
                networkExplorer.view.getReturnButton.returns(returnButtonElem);

                // MOCK returnButton
                var returnButtonStub = {
                    setCaption: function() { },
                    getReturnCancelButtons: function() {
                        return returnButtonElem;
                    }
                };
                networkExplorer.returnButton = returnButtonStub;
                _sandbox.spy(networkExplorer.returnButton, 'setCaption', function() {});

                _sandbox.stub(networkExplorer, 'addReturnButton', function() {
                    networkExplorer.returnButton = returnButtonStub;
                });

            });

            afterEach(function() {
                //CLEANUP
                _sandbox.restore();
            });

            it('should setModifier("actionPage") if goto param exists' +
                ' & call addReturnButton() when button is null' +
                ' & call  publish("hashChange", this.params)', function() {

                // ARRANGE
                var params = {
                    goto: 'asfjgifo'
                };
                networkExplorer.params = {
                    goto: 'asfjgifo'
                };
                networkExplorer.returnButton = null;

                // ACT
                networkExplorer.handleHashChange();

                // ASSERT
                expect(viewElem.setModifier.callCount).to.equal(1);
                expect(viewElem.removeModifier.callCount).to.equal(0);
                expect(viewElem.setModifier.getCall(0).calledWith('actionPage')).to.equal(true);
                expect(networkExplorer.view.shiftScrollbarAboveObjectActions.callCount).to.equal(1);

                expect(networkExplorer.addReturnButton.callCount).to.equal(1);
                expect(networkExplorer.getReturnButtonCaption.callCount).to.equal(1);
                expect(networkExplorer.returnButton.setCaption.callCount).to.equal(1);
                expect(networkExplorer.returnButton.setCaption.getCall(0).calledWith(networkExplorer.getReturnButtonCaption())).to.equal(true);

                // should publish event regardless of conditions
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:hashChange', params)).to.equal(true);
            });

            it('should setModifier("actionPage") if goto param exists' +
                ' & add call this.returnButton.setCaption(strings.returnSelectedObjects) when selectionDisabled = false' +
                ' & call  publish("hashChange", this.params)', function() {
                // ARRANGE
                var params = {
                    goto: 'asfjgifo',
                    selectionDisabled: false
                };
                networkExplorer.params = {
                    goto: 'asfjgifo',
                    selectionDisabled: false
                };

                // ACT
                networkExplorer.handleHashChange();

                // ASSERT
                expect(viewElem.setModifier.callCount).to.equal(1);
                expect(viewElem.removeModifier.callCount).to.equal(0);
                expect(viewElem.setModifier.getCall(0).calledWith('actionPage')).to.equal(true);
                expect(networkExplorer.view.shiftScrollbarAboveObjectActions.callCount).to.equal(1);

                expect(networkExplorer.getReturnButtonCaption.callCount).to.equal(1);
                expect(networkExplorer.returnButton.setCaption.callCount).to.equal(1);
                expect(networkExplorer.returnButton.setCaption.getCall(0).calledWith(networkExplorer.getReturnButtonCaption())).to.equal(true);

                // should publish event regardless of conditions
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:hashChange', params)).to.equal(true);
            });

            it('should setModifier("actionPage") if goto param exists' +
                ' & call addCancelButton() if cancelButton = null' +
                ' & call  publish("hashChange", this.params)', function() {
                // ARRANGE
                var params = {
                    goto: 'asfjgifo'
                };
                networkExplorer.params = {
                    goto: 'asfjgifo'
                };
                networkExplorer.cancelButton = null;

                // ACT
                networkExplorer.handleHashChange();

                // ASSERT
                expect(viewElem.setModifier.callCount).to.equal(1);
                expect(viewElem.setModifier.getCall(0).calledWith('actionPage')).to.equal(true);

                expect(networkExplorer.addCancelButton.callCount).to.equal(1);
                expect(networkExplorer.view.shiftScrollbarAboveObjectActions.callCount).to.equal(1);

                // should publish event regardless of conditions
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:hashChange', params)).to.equal(true);
            });

            it('should removeModifier("actionPage") if goto param evaluates to false' +
                ' & call  publish("hashChange", this.params)', function() {
                // ARRANGE
                var params = {
                    goto: false
                };
                networkExplorer.params = {
                    goto: false
                };

                // ACT
                networkExplorer.handleHashChange();

                // ASSERT
                expect(viewElem.removeModifier.callCount).to.equal(1);
                expect(viewElem.removeModifier.getCall(0).calledWith('actionPage')).to.equal(true);
                expect(networkExplorer.view.unshiftScrollbar.callCount).to.equal(1);

                // should publish event regardless of conditions
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:hashChange', params)).to.equal(true);
            });
        });

        describe('updateActionBar', function() {
            beforeEach(function(done) {
                setTimeout(function() {
                    _sandbox.stub(networkExplorer.launcherUtils, 'createLauncherAction', function() {
                        return Promise.resolve([{name: strings.actionSearchWithNetworkExplorer},
                                {type: 'separator'},
                                {name: 'Locate in Topology'}
                        ]
                        );
                    });
                    done();
                });
            });

            it('should update action bar with available actions',function() {
                _sandbox.spy(networkExplorer, 'updateActionBar');

                var objects = [
                        { id: '316998628', type: 'SubNetwork', moType: 'SubNetwork'}
                ];

                networkExplorer.updateActionBar(objects);
                expect(networkExplorer.launcherUtils.createLauncherAction.callCount).to.equal(1);
            });

            it('should not update action bar when no objects are passed',function() {
                var eventBusStub = {
                    publish: function() {}
                };
                 _sandbox.spy(eventBusStub, 'publish');
                 _sandbox.stub(networkExplorer, 'getEventBus', function() {
                    return eventBusStub;
                 });

                _sandbox.spy(networkExplorer, 'updateActionBar');

                var objects = [];

                networkExplorer.updateActionBar();
                expect(networkExplorer.launcherUtils.createLauncherAction.callCount).to.equal(0);
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('topsection:contextactions')).to.equal(true)
            });
        });

        describe('onRightClick()', function() {
            it('should display context menu immediately if actions do not need to be fetched',function() {
                // ARRANGE
                _sandbox.stub(networkExplorer, 'displayContextMenu');
                // ACT
                networkExplorer.onRightClick('event', false);
                // ASSERT
                expect(networkExplorer.contextMenuEvent).to.equal('event');
                expect(networkExplorer.displayContextMenu.callCount).to.equal(1);
            });
            it('should not show context menu if actions need to be fetched',function() {
                // ARRANGE
                _sandbox.stub(networkExplorer, 'displayContextMenu');
                // ACT
                networkExplorer.onRightClick('event', true);
                // ASSERT
                expect(networkExplorer.contextMenuEvent).to.equal('event');
                expect(networkExplorer.displayContextMenu.callCount).to.equal(0);
            });
        });

        describe('displayContextMenu()', function() {
            beforeEach(function() {
                containerEventBusStub = sinon.createStubInstance(core.EventBus);
                _sandbox.stub(container, 'getEventBus', function() {
                    return containerEventBusStub;
                });
            });
            it('do not show actions in context menu if a right click event is not present',function() {
                // ARRANGE
                var actions = [{}];
                networkExplorer.contextMenuEvent = undefined;

                // ACT
                networkExplorer.displayContextMenu(actions);

                // ASSERT
                expect(networkExplorer.contextMenuEvent).to.equal(undefined);
                expect(container.getEventBus().publish.callCount).to.equal(0);
            });
            it('do not show actions in context menu if no actions are present',function() {
                // ARRANGE
                var actions = [];
                networkExplorer.contextMenuEvent = 'e';

                // ACT
                networkExplorer.displayContextMenu(actions);

                // ASSERT
                expect(networkExplorer.contextMenuEvent).to.equal(undefined);
                expect(container.getEventBus().publish.callCount).to.equal(0);
            });
            it('show actions in context menu if a right click event is present',function() {
                // ARRANGE
                var actions = {
                    contextMenuActions: ['']
                };
                networkExplorer.contextMenuEvent = 'e';

                // ACT
                networkExplorer.displayContextMenu(actions);

                // ASSERT
                expect(networkExplorer.contextMenuEvent).to.equal(undefined);
                expect(container.getEventBus().publish.callCount).to.equal(1);
            });
        });

        describe('setLocation', function() {
            var locationStub;

            beforeEach(function() {
                //ARRANGE
                _sandbox = sinon.sandbox.create();

                locationStub = {
                    setNamespaceLocation: function() {},
                    setLocation: function() {}
                };
                _sandbox.spy(locationStub, 'setNamespaceLocation');
                _sandbox.spy(locationStub, 'setLocation');
                networkExplorer.locationController = locationStub;
            });

            afterEach(function() {
                //CLEANUP
                _sandbox.restore();
            });

            it('if params.selectionDisabled evaluates to true,' +
                ' & params.goto evaluates to false:' +
                ' should append only selectionDisabled to location,' +
                ' & if namespaced argument = true:' +
                ' should call setNamespaceLocation(location)', function() {
                //ARRANGE
                var location = '#testApp';
                networkExplorer.params = {
                    selectionDisabled: true,
                    goto: false
                };

                //ACT
                networkExplorer.setLocation(location, true);

                //ASSERT
                expect(locationStub.setLocation.callCount).to.equal(1);
                expect(locationStub.setLocation.getCall(0).calledWith('networkexplorer/' + location + '?selectionDisabled=true')).to.equal(true);
            });

            it('if params.selectionDisabled evaluates to false,' +
                ' & params.goto evaluates to true:' +
                ' should append selectionDisabled and goto params to location,' +
                ' & if namespaced argument = true:' +
                ' should call setNamespaceLocation(location)', function() {
                //ARRANGE
                var location = '#testApp';
                var expectedAppendix = '?goto=abc&selectionDisabled=true&returnType=returnType';
                networkExplorer.params = {
                    selectionDisabled: true,
                    goto: 'abc',
                    returnType: 'returnType'
                };

                //ACT
                networkExplorer.setLocation(location, true);

                //ASSERT
                expect(locationStub.setLocation.callCount).to.equal(1);
                expect(locationStub.setLocation.getCall(0).calledWith('networkexplorer/' + location + expectedAppendix)).to.equal(true);
            });

            it('if params.selectionDisabled evaluates to false,' +
                ' & params.singleSelection evaluates to false:' +
                ' & params.goto evaluates to true:' +
                ' should append only goto param to location,' +
                ' & if namespaced argument = false:' +
                ' should call setLocation(location)', function() {
                //ARRANGE
                var location = '#testApp';
                var expectedAppendix = '?goto=abc&returnType=returnType';
                networkExplorer.params = {
                    selectionDisabled: false,
                    singleSelection: false,
                    goto: 'abc',
                    returnType: 'returnType'
                };

                //ACT
                networkExplorer.setLocation(location, false);

                //ASSERT
                expect(locationStub.setLocation.callCount).to.equal(1);
                expect(locationStub.setLocation.getCall(0).calledWith(location + expectedAppendix)).to.equal(true);
            });

            it('if params.selectionDisabled evaluates to false,' +
                ' & params.singleSelection evaluates to true:' +
                ' & params.goto evaluates to true:' +
                ' should append goto param and singleSelection param to location,' +
                ' & if namespaced argument = false:' +
                ' should call setLocation(location)', function() {

                //ARRANGE
                var location = 'search/MeContext';
                var expectedAppendix = '?goto=app%3Fpoid%3Dabc&returnType=returnType&singleSelection=true';
                networkExplorer.params = {
                    selectionDisabled: false,
                    singleSelection: true,
                    goto: 'app?poid=abc',
                    returnType: 'returnType'
                };

                //ACT
                networkExplorer.setLocation(location, false);

                //ASSERT
                expect(locationStub.setLocation.callCount).to.equal(1);
                expect(locationStub.setLocation.getCall(0).calledWith(location + expectedAppendix)).to.equal(true);
            });

            it('if params is not defined, should set location without contextual params', function() {

                //ARRANGE
                var location = 'topologybrowser?poId=123';
                networkExplorer.params = undefined;

                //ACT
                networkExplorer.setLocation(location, false);

                //ASSERT
                expect(locationStub.setLocation.callCount).to.equal(1);
                expect(locationStub.setLocation.getCall(0).calledWith(location)).to.equal(true);
            });

            it('if params is defined, but stripContext is true, should set location without contextual params', function() {

                //ARRANGE
                var location = '?goto=app%3Fpoid%3Dabc&returnType=returnType&singleSelection=true';
                networkExplorer.params = {
                    selectionDisabled: false,
                    singleSelection: true,
                    goto: 'app?poid=abc',
                    returnType: 'returnType'
                };

                //ACT
                networkExplorer.setLocation(location, false, false, true);

                //ASSERT
                expect(locationStub.setLocation.callCount).to.equal(1);
                expect(locationStub.setLocation.getCall(0).calledWith(location)).to.equal(true);
            });

            it('if singleSelection evaluates to true but returnType is not defined', function() {

                //ARRANGE
                var location = 'search/MeContext';
                var expectedAppendix = '?goto=app%3Fpoid%3Dabc&returnType=singleObject&singleSelection=true';
                networkExplorer.params = {
                    selectionDisabled: false,
                    singleSelection: true,
                    goto: 'app?poid=abc'
                };

                //ACT
                networkExplorer.setLocation(location, false);

                //ASSERT
                expect(locationStub.setLocation.callCount).to.equal(1);
                expect(locationStub.setLocation.getCall(0).calledWith(location + expectedAppendix)).to.equal(true);
            });

            it('Should call handleNodeSelect if hash contains node selected data', function() {
                //ARRANGE
                var data = { "networkObjects" : "607177382", "networkType" : "MeContext", "networkFdn" : "MeContext=RealNode_MLTN_08", "networkLabel" : "RealNode_MLTN_06", "networkObjectsData" : [], "nestedCollections" : []};
                var eventBusStub = {
                publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'setLocation');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                return eventBusStub;
                });

                //ACT
                networkExplorer.handleNodeSelect(data);

                //ASSERT
                expect(networkExplorer.setLocation.callCount).to.equal(1);
            });

            it('Should call handleNodeSelect if hash contains node selected data with SubNetwork', function() {
                //ARRANGE
                var data = { "networkObjects" : "607177381", "networkType" : "SubNetwork", "networkFdn" : "MeContext=RealNode_MLTN_08", "networkLabel" : "RealNode_MLTN_06", "networkObjectsData" : [], "nestedCollections" : []};
                var eventBusStub = {
                publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'setLocation');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                return eventBusStub;
                });

                //ACT
                networkExplorer.handleNodeSelect(data);

                //ASSERT
                expect(networkExplorer.setLocation.callCount).to.equal(1);
            });

            it('Should call handleNodeSelect if hash contains node selected data with nestedCollection', function() {
                //ARRANGE
                var data = { "networkObjects" : "607177381", "networkType" : "MeContext", "networkLabel" : "RealNode_MLTN_08", "networkObjectsData" : [], "nestedCollections" : [{"category":"Public","hybrid":"true","id":"1170909213","label":"Sample_Collection","type":"BRANCH"}]};
                var eventBusStub = {
                publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'setLocation');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                return eventBusStub;
                });

                //ACT
                networkExplorer.handleNodeSelect(data);

                //ASSERT
                expect(networkExplorer.setLocation.callCount).to.equal(1);
            });

            it('Should call handleNodeSelect if hash contains node selected data with networkObjects Data', function() {
                //ARRANGE
                var data = { "networkObjects" : "607177381", "networkType" : "MeContext", "networkLabel" : "RealNode_MLTN_08", "networkObjectsData" : [{"category":"Public","hybrid":"false","id":"1170909213","label":"Sample_Node","type":"MeContext"}], "nestedCollections" : []};

                var eventBusStub = {
                    publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'setLocation');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                return eventBusStub;
                });

                //ACT
                networkExplorer.handleNodeSelect(data);

                //ASSERT
                expect(networkExplorer.setLocation.callCount).to.equal(1);
            });

            it('Should call handleNodeSelect if hash contains Collections selected data', function() {
                //ARRANGE
                var data = {"networkObjects" : [], "networkType" : [],"collections": "607177382", "savedSearches" : [], "networkObjectsData" : [], "nestedCollections" : []};
                var eventBusStub = {
                publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'setLocation');
                _sandbox.stub(networkExplorer, 'enableWebPush');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                return eventBusStub;
                });

                //ACT
                networkExplorer.handleNodeSelect(data);

                //ASSERT
                expect(networkExplorer.setLocation.callCount).to.equal(1);
                expect(networkExplorer.enableWebPush.callCount).to.equal(1);
            });

            it('Should call handleNodeSelect if hash contains saved search selected data', function() {
                //ARRANGE
                var data = {"networkObjects" : [], "networkType" : [],"collections": [], "savedSearches" : "607177382", "networkObjectsData" : [], "nestedCollections" : []};
                var eventBusStub = {
                publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'setLocation');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                return eventBusStub;
                });

                //ACT
                networkExplorer.handleNodeSelect(data);

                //ASSERT
                expect(networkExplorer.setLocation.callCount).to.equal(1);
            });

            it('Should call handleNodeSelect if hash contains Neither of SavedSearch or collection or NetworkData', function() {
                //ARRANGE
                var data = {"networkObjects" : [], "networkType" : [],"collections": [], "savedSearches" : [], "networkObjectsData" : [], "nestedCollections" : []};
                var eventBusStub = {
                publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'setLocation');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                return eventBusStub;
                });

                //ACT
                networkExplorer.handleNodeSelect(data);

                //ASSERT
                expect(networkExplorer.setLocation.callCount).to.equal(1);
            });

            it('if the URL does not change, just call handleLocationChange', function() {
                //ARRANGE
                _sandbox.stub(networkExplorer, 'handleLocationChange');
                var location = window.location.hash;
                //ACT
                networkExplorer.setLocation(location, false);
                //ASSERT
                expect(locationStub.setLocation.callCount).to.equal(0);
                expect(networkExplorer.handleLocationChange.callCount).to.equal(1);
                expect(networkExplorer.handleLocationChange.getCall(0).calledWith(location)).to.equal(true);
            });
        });

        describe('showToast', function() {
            var elementStub = {};
            var mockOptions = {
                label: 'Notification'
            };
            _sandbox = sinon.sandbox.create();
            beforeEach(function() {
                // ARRANGE
                networkExplorer.notification = null;
                _sandbox.stub(networkExplorer, 'getElement', function() {
                    return elementStub;
                });
                _sandbox.stub(networkExplorer, 'removeToast');
                _sandbox.stub(Notification.prototype, 'addEventHandler', function() {});
                _sandbox.stub(Notification.prototype, 'attachTo', function() {});
                _sandbox.spy(Notification.prototype, 'init');
                // ACT
                networkExplorer.showToast(mockOptions);
            });
            it('Should show toast notification', function() {
                // ASSERT
                expect(networkExplorer.removeToast.callCount).to.equal(0);
                expect(Notification.prototype.init.callCount).to.equal(1);
                expect(Notification.prototype.init.getCall(0).calledWith(mockOptions)).to.equal(true);
                expect(Notification.prototype.attachTo.callCount).to.equal(1);
                expect(Notification.prototype.attachTo.getCall(0).calledWith(elementStub)).to.equal(true);
                expect(Notification.prototype.addEventHandler.callCount).to.equal(1);
                expect(Notification.prototype.addEventHandler.getCall(0).calledWith(
                    'close', networkExplorer.onCloseNotification, networkExplorer
                )).to.equal(true);

                //CLEANUP
                _sandbox.restore();
            });
            it('Should remove old toast before showing new toast', function() {
                // ACT
                networkExplorer.showToast({label: 'Notification 2'});
                // ASSERT
                expect(networkExplorer.removeToast.callCount).to.equal(1);
                //CLEANUP
                _sandbox.restore();
            });
        });

        describe('showToastForRemove', function() {
            var elementStub = {};
            var mockOptions = {
                label: 'Notification'
            };
            _sandbox = sinon.sandbox.create();
            beforeEach(function() {
                // ARRANGE
                networkExplorer.notification = null;
                _sandbox.stub(networkExplorer, 'getElement', function() {
                    return elementStub;
                });
                _sandbox.stub(networkExplorer, 'removeToast');
                _sandbox.stub(Notification.prototype, 'addEventHandler', function() {});
                _sandbox.stub(Notification.prototype, 'attachTo', function() {});
                _sandbox.spy(Notification.prototype, 'init');
                // ACT
                networkExplorer.showToastForRemove(mockOptions);
            });
            it('Should show toast notification from showToastForRemove', function() {
                // ASSERT
                expect(networkExplorer.removeToast.callCount).to.equal(0);
                expect(Notification.prototype.init.callCount).to.equal(1);
                expect(Notification.prototype.init.getCall(0).calledWith(mockOptions)).to.equal(true);
                expect(Notification.prototype.attachTo.callCount).to.equal(1);
                expect(Notification.prototype.attachTo.getCall(0).calledWith(elementStub)).to.equal(true);
                expect(Notification.prototype.addEventHandler.callCount).to.equal(1);
                expect(Notification.prototype.addEventHandler.getCall(0).calledWith(
                    'close', networkExplorer.onCloseNotification, networkExplorer
                )).to.equal(true);

                //CLEANUP
                _sandbox.restore();
            });
            it('Should remove old toast before showing new toast from showToastForRemove', function() {
                // ACT
                networkExplorer.showToastForRemove({label: 'Notification 2'});
                // ASSERT
                expect(networkExplorer.removeToast.callCount).to.equal(1);
                //CLEANUP
                _sandbox.restore();
            });
        });

        describe('removeToast', function() {
            it('Should close toast notification', function() {
                // ARRANGE
                _sandbox = sinon.sandbox.create();
                var notificationStub = {
                    close: function() {}
                };
                networkExplorer.toastCounter = 1;
                _sandbox.spy(notificationStub, 'close');
                //replace real controller with a stub, to keep the test lightweight.
                networkExplorer.notification = notificationStub;

                // ACT
                networkExplorer.removeToast();

                // ASSERT
                expect(notificationStub.close.callCount).to.equal(1);

                // CLEANUP
                _sandbox.restore();
            });
        });

        describe('onCloseNotification', function() {
            it('Should set notification to null and toast counter to zero', function() {
                // ARRANGE
                networkExplorer.notification = undefined;
                networkExplorer.toastCounter = 1;

                // ACT
                networkExplorer.onCloseNotification();

                // ASSERT
                expect(networkExplorer.notification).to.equal(null);
                expect(networkExplorer.toastCounter).to.equal(0);
            });
        });

        describe('redirectToGoto()', function() {
            it('should call setLocation on the LocationController with the gotoParam', function() {
                // ARRANGE
                _sandbox = sinon.sandbox.create();
                var locationControllerStub = {
                    setLocation: function() {}
                };
                _sandbox.spy(locationControllerStub, 'setLocation');
                //replace real controller with a stub, to keep the test lightweight.
                networkExplorer.locationController = locationControllerStub;
                var gotoParam = 'testapp';
                networkExplorer.params = {};
                networkExplorer.params.goto = gotoParam;

                // ACT
                networkExplorer.redirectToGoto();

                // ASSERT
                expect(locationControllerStub.setLocation.callCount).to.equal(1);
                expect(locationControllerStub.setLocation.getCall(0).calledWith(gotoParam)).to.equal(true);

                // CLEANUP
                _sandbox.restore();
            });
        });

        describe('redirectToGotoWithCollections()', function() {
            var networkExplorer, viewStub, poId, locationControllerStub;

            beforeEach(function() {
                // ARRANGE
                _sandbox = sinon.sandbox.create();
                networkExplorer = new NetworkExplorer();

                viewStub = {
                    hideLoadingAnimation: function() {}
                };
                networkExplorer.view = viewStub;
                _sandbox.spy(viewStub, 'hideLoadingAnimation');

                locationControllerStub = {
                    setLocation: function() { }
                };

                networkExplorer.locationController = locationControllerStub;
                _sandbox.spy(networkExplorer.locationController, 'setLocation');

                poId = '1234567890';
            });

            afterEach(function() {
                // CLEANUP
                _sandbox.restore();
                networkExplorer.params = {};
            });

            it('should append a collections GET parameter to the goto URL and navigate to it with a "?" ' +
                'if no GET params exist in gotoParam', function(done) {
                // ARRANGE
                networkExplorer.params = {};
                networkExplorer.params.goto = 'pmic/create';
                var expectedGotoUrl = 'pmic/create?collections=' + poId + '&generatedCollection=true';

                // ACT
                networkExplorer.redirectToGotoWithCollection(JSON.stringify({id: poId}));

                // ASSERT
                expect(networkExplorer.locationController.setLocation.callCount).to.equal(1);
                expect(networkExplorer.locationController.setLocation.getCall(0).calledWith(expectedGotoUrl)).to.equal(true);
                done();
            });

            it('should append a collections GET parameter to the goto URL and navigate to it with a "&" ' +
                'if GET params exist in gotoParam', function(done) {
                // ARRANGE
                networkExplorer.params = {};
                networkExplorer.params.goto = 'pmic/create?';
                var expectedGotoUrl = 'pmic/create?&collections=' + poId + '&generatedCollection=true';

                // ACT
                networkExplorer.redirectToGotoWithCollection(JSON.stringify({id: poId}));

                // ASSERT
                expect(networkExplorer.locationController.setLocation.callCount).to.equal(1);
                expect(networkExplorer.locationController.setLocation.getCall(0).calledWith(expectedGotoUrl)).to.equal(true);
                done();
            });
        });

        describe('showReturnObjectsError()', function() {
            var xhr,
                responseContent,
                collectionSize = 1000;
            beforeEach(function() {
                xhr = {
                    getResponseJSON: function() {
                        return responseContent;
                    }
                };
                responseContent = {
                    userMessage: {
                        body: 'some text ' + collectionSize + 'any other text'
                    }
                };
                _sandbox.spy(xhr, 'getResponseJSON');
            });
            it('should display a dialog with an appropriate error', function() {
                // ARRANGE
                networkExplorer.view = sinon.createStubInstance(View);
                _sandbox.stub(Dialog.prototype, 'init');
                _sandbox.stub(Dialog.prototype, 'show');

                // ACT
                networkExplorer.showReturnObjectsError('', xhr);

                // ASSERT
                expect(xhr.getResponseJSON.callCount).to.equal(1);
                expect(networkExplorer.view.hideLoadingAnimation.callCount).to.equal(1);
                expect(Dialog.prototype.init.callCount).to.equal(1);
                expect(Dialog.prototype.init.getCall(0).calledWithMatch({
                    header: strings.returnErrorHeader,
                    content: strings.returnErrorMessage,
                    type: 'error'
                })).to.equal(true);
                expect(Dialog.prototype.show.callCount).to.equal(1);
            });
            it('should display a dialog with a specific error for collection size exceeded', function() {
                // ARRANGE
                networkExplorer.view = sinon.createStubInstance(View);
                _sandbox.stub(Dialog.prototype, 'init');
                _sandbox.stub(Dialog.prototype, 'show');
                responseContent.internalErrorCode = 10022;
                var expectedHeader = strings.maximumLimitExceeded,
                    expectedBody = strings.selectionHasExceededLimit.replace('%1',collectionSize);

                // ACT
                networkExplorer.showReturnObjectsError('', xhr);

                // ASSERT
                expect(xhr.getResponseJSON.callCount).to.equal(1);
                expect(networkExplorer.view.hideLoadingAnimation.callCount).to.equal(1);
                expect(Dialog.prototype.init.callCount).to.equal(1);
                expect(Dialog.prototype.init.getCall(0).calledWithMatch({
                    header: expectedHeader,
                    content: expectedBody,
                    type: 'error'
                })).to.equal(true);
                expect(Dialog.prototype.show.callCount).to.equal(1);
            });
        });

        describe('redirectToGotoWithPoId()', function() {
            var newPoId;
            beforeEach(function() {
                // ARRANGE
                networkExplorer.locationController = _sandbox.stub({
                    setLocation: function() {}
                });
                networkExplorer.params = {};
                newPoId = '123456';
            });

            it('should replace the existing poId in goto if ?poid= is in it and call locationController.setLocation with it', function() {
                // ARRANGE
                networkExplorer.params.goto = 'topologybrowser?poid=098765';

                // ACT
                networkExplorer.redirectToGotoWithPoId([newPoId]);

                // ASSERT
                expect(networkExplorer.locationController.setLocation.callCount).to.equal(1);
                expect(networkExplorer.locationController.setLocation.getCall(0).calledWith(
                    'topologybrowser?poid=123456'
                )).to.equal(true);
            });

            it('should replace the existing poId in goto if &poid= is in it and call locationController.setLocation with it', function() {
                // ARRANGE
                networkExplorer.params.goto = 'topologybrowser?param1=val1&poid=098765';

                // ACT
                networkExplorer.redirectToGotoWithPoId([newPoId]);

                // ASSERT
                expect(networkExplorer.locationController.setLocation.callCount).to.equal(1);
                expect(networkExplorer.locationController.setLocation.getCall(0).calledWith(
                    'topologybrowser?param1=val1&poid=123456'
                )).to.equal(true);
            });

            it('should retain url params after the poid has been replaced', function() {
                // ARRANGE
                networkExplorer.params.goto = 'topologybrowser?poid=098765&param1=val1';

                // ACT
                networkExplorer.redirectToGotoWithPoId([newPoId]);

                // ASSERT
                expect(networkExplorer.locationController.setLocation.callCount).to.equal(1);
                expect(networkExplorer.locationController.setLocation.getCall(0).calledWith(
                    'topologybrowser?poid=123456&param1=val1'
                )).to.equal(true);
            });

            it('should append ?poid=<newPoId> the goto if no ? is in the goto and call locationController.setLocation with it', function() {
                // ARRANGE
                networkExplorer.params.goto = 'topologybrowser';

                // ACT
                networkExplorer.redirectToGotoWithPoId([newPoId]);

                // ASSERT
                expect(networkExplorer.locationController.setLocation.callCount).to.equal(1);
                expect(networkExplorer.locationController.setLocation.getCall(0).calledWith(
                    'topologybrowser?poid=123456'
                )).to.equal(true);
            });

            it('should append &poid=<newPoId> the goto if ? is already in the goto and call locationController.setLocation with it', function() {
                // ARRANGE
                networkExplorer.params.goto = 'topologybrowser?param1=val1';

                // ACT
                networkExplorer.redirectToGotoWithPoId([newPoId]);

                // ASSERT
                expect(networkExplorer.locationController.setLocation.callCount).to.equal(1);
                expect(networkExplorer.locationController.setLocation.getCall(0).calledWith(
                    'topologybrowser?param1=val1&poid=123456'
                )).to.equal(true);
            });
        });

        describe('onReturnClicked()', function() {
            it('should publish sendAllPoIdsToCallback if selectionDisabled = true', function() {
                // ARRANGE
                _sandbox = sinon.sandbox.create();
                var eventBusStub = {
                    publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                    return eventBusStub;
                });
                networkExplorer.params = {
                    selectionDisabled: true
                };

                // ACT
                networkExplorer.onReturnClicked();

                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:sendAllPoIdsToCallback')).to.equal(true);
            });

            it('should publish NetworkExplorer:sendSelectedPoIdsToCallback if selectionDisabled = false', function() {
                // ARRANGE
                _sandbox = sinon.sandbox.create();
                var eventBusStub = {
                    publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                    return eventBusStub;
                });
                networkExplorer.params = {
                    selectionDisabled: false
                };

                // ACT
                networkExplorer.onReturnClicked();

                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:sendSelectedPoIdsToCallback')).to.equal(true);
            });

            it('should publish sendSelectedPoIdstoCallback if singleSelection = true', function() {
                // ARRANGE
                _sandbox = sinon.sandbox.create();
                var eventBusStub = {
                    publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                    return eventBusStub;
                });
                networkExplorer.params = {
                    singleSelection: true
                };

                // ACT
                networkExplorer.onReturnClicked();

                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:sendSelectedPoIdsToCallback')).to.equal(true);
            });
            it('should publish sendSelectedPoIdstoCallback if returnType = this.SINGLE_OBJECT', function() {
                // ARRANGE
                _sandbox = sinon.sandbox.create();
                var eventBusStub = {
                    publish: function() {}
                };
                _sandbox.spy(eventBusStub, 'publish');
                _sandbox.stub(networkExplorer, 'getEventBus', function() {
                    return eventBusStub;
                });
                networkExplorer.params = {
                    returnType: 'singleObject'
                };

                // ACT
                networkExplorer.onReturnClicked();

                // ASSERT
                expect(eventBusStub.publish.callCount).to.equal(1);
                expect(eventBusStub.publish.getCall(0).calledWith('NetworkExplorer:sendSelectedPoIdsToCallback')).to.equal(true);
            });
        });

        describe('createTemporaryCollection()', function() {
            it('should make an ajax call to create a temporary collection for use by other application', function() {
                // ARRANGE
                _sandbox = sinon.sandbox.create();
                var viewStub = {
                        showLoadingAnimation: function() {}
                    },
                    datenow = 99999;
                _sandbox.spy(viewStub, 'showLoadingAnimation');
                _sandbox.stub(net, 'ajax', function() {});
                _sandbox.stub(Date, 'now', function() { return datenow; });
                networkExplorer.view = viewStub;

                // ACT
                networkExplorer.createTemporaryCollection(['1234']);

                // ASSERT
                expect(viewStub.showLoadingAnimation.callCount).to.equal(1);
                expect(net.ajax.callCount).to.equal(1);
                expect(net.ajax.getCall(0).calledWithMatch({
                    url: '/object-configuration/v1/collections',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        name: 'auto_generated_' + datenow,
                        objects: [{id: '1234'}],
                        category: 'autoGenerated'
                    })
                })).to.equal(true);
            });
        });

        describe('setURIParameters()', function() {
            it('should setLocation with the existing URL and the URI parameters to the provided params', function() {
                // ARRANGE
                networkExplorer.locationController = _sandbox.stub({
                    getLocation: function() {
                        return 'myapp/path?param1=val1';
                    }
                });
                _sandbox.stub(networkExplorer, 'getPathWithoutParams', function() {
                    return 'myapp/path';
                });
                _sandbox.stub(networkExplorer, 'setLocation');

                // ACT
                networkExplorer.setURIParameters({
                    page: 3,
                    size: 20
                },
                true);

                // ASSERT
                expect(networkExplorer.setLocation.callCount).to.equal(1);
                expect(networkExplorer.setLocation.getCall(0).calledWith('myapp/path?page=3&size=20', false, true, false)).to.equal(true);
            });
            it('should support redirect', function() {
                // ARRANGE
                networkExplorer.locationController = _sandbox.stub({
                    getLocation: function() {
                        return 'myapp/path?param1=val1';
                    }
                });
                _sandbox.stub(networkExplorer, 'getPathWithoutParams', function() {
                    return 'myapp/path';
                });
                _sandbox.stub(networkExplorer, 'setLocation');

                // ACT
                networkExplorer.setURIParameters({
                    page: 3,
                    size: 20
                },
                true,
                true);

                // ASSERT
                expect(networkExplorer.setLocation.callCount).to.equal(1);
                expect(networkExplorer.setLocation.getCall(0).calledWith('myapp/path?page=3&size=20', false, true, false, true)).to.equal(true);
            });
        });

        describe('updateTopSection()', function() {
            it('should reinstantiate topSection with updated breadcrumb', function() {
                // ARRANGE
                var topsection = _sandbox.stub({
                    destroy: function() {}
                });
                networkExplorer.layout = topsection;
                var slidingPanelsObject = sinon.createStubInstance(MultiSlidingPanels);
                _sandbox.stub(networkExplorer, 'createSlidingPanels').returns(slidingPanelsObject);
                _sandbox.stub(networkExplorer, 'getBreadcrumbWithContext');
                _sandbox.stub(TopSection.prototype, 'attachTo');
                _sandbox.stub(TopSection.prototype, 'setContent');
                _sandbox.spy(TopSection.prototype, 'init');
                var eventBusStub = sinon.createStubInstance(core.EventBus);
                networkExplorer.getContext = function() {
                    var stub = sinon.createStubInstance(core.AppContext);
                    stub.eventBus = eventBusStub;
                    return stub;
                };
                networkExplorer.view = sinon.createStubInstance(View);

                // ACT
                networkExplorer.updateTopSection();

                // ASSERT
                expect(topsection.destroy.callCount).to.equal(1);
                expect(networkExplorer.getBreadcrumbWithContext.callCount).to.equal(1);
                expect(TopSection.prototype.setContent.callCount).to.equal(1);
                expect(TopSection.prototype.setContent.getCall(0).calledWith(slidingPanelsObject)).to.equal(true);
                expect(TopSection.prototype.attachTo.callCount).to.equal(1);
                expect(TopSection.prototype.attachTo.getCall(0).calledWith(
                    networkExplorer.view.getContent()
                )).to.equal(true);
            });
        });

        describe('getBreadcrumbWithContext()', function() {
            it('should update breadcrumb links with parameters', function() {
                // ARRANGE
                networkExplorer.options = {
                    breadcrumb: [
                        {
                            name: 'ENM',
                            url: '#networkexplorer'
                        }, {
                            children: [{
                                name: 'Collections',
                                url: '#networkexplorer/collections'
                            }, {
                                name: 'Saved Searches',
                                url: '#networkexplorer/savedsearches'
                            }],
                            name: 'Network Explorer',
                            url: '#networkexplorer'
                        }
                    ]
                };
                networkExplorer.params = {
                    goto: 'goto',
                    returnType: 'returnType'
                };

                // ACT
                var result = networkExplorer.getBreadcrumbWithContext();

                // ASSERT
                expect(result).to.deep.equal([
                    {
                        name: 'ENM',
                        url: '#networkexplorer'
                    }, {
                        children: [{
                            name: 'Collections',
                            url: '#networkexplorer/collections?goto=goto&returnType=returnType'
                        }, {
                            name: 'Saved Searches',
                            url: '#networkexplorer/savedsearches?goto=goto&returnType=returnType'
                        }],
                        name: 'Network Explorer',
                        url: '#networkexplorer?goto=goto&returnType=returnType'
                    }
                ]);
            });
        });

        describe('getReturnButtonCaption()', function() {
            it('should return single object caption if returnType is singleObject', function() {
                // ARRANGE
                networkExplorer.params = {
                    returnType: 'singleObject'
                };

                // ACT
                var result = networkExplorer.getReturnButtonCaption();

                // ASSERT
                expect(result).to.equal(strings.returnSingleObject);
            });

            it('should return multiple object caption if returnType is multipleObjects', function() {
                // ARRANGE
                networkExplorer.params = {
                    returnType: 'multipleObjects'
                };

                // ACT
                var result = networkExplorer.getReturnButtonCaption();

                // ASSERT
                expect(result).to.equal(strings.returnMultipleObjects);
            });

            it('should return collections caption if returnType is collections', function() {
                // ARRANGE
                networkExplorer.params = {
                    returnType: 'collections'
                };

                // ACT
                var result = networkExplorer.getReturnButtonCaption();

                // ASSERT
                expect(result).to.equal(strings.returnSelectedCollections);
            });

            it('should return saved searches caption if returnType is savedSearches', function() {
                // ARRANGE
                networkExplorer.params = {
                    returnType: 'savedSearches'
                };

                // ACT
                var result = networkExplorer.getReturnButtonCaption();

                // ASSERT
                expect(result).to.equal(strings.returnSelectedSavedSearches);
            });

            it('should return invalid caption if returnType is none of the above', function() {
                // ARRANGE
                networkExplorer.params = {
                    returnType: 'invalid'
                };

                // ACT
                var result = networkExplorer.getReturnButtonCaption();

                // ASSERT
                expect(result).to.equal(strings.returnTypeInvalid);
            });
        });

        describe('showLoading()', function() {
            it('Should call showLoadingAnimation() from view model', function() {
                // ARRANGE
                networkExplorer.view = sinon.createStubInstance(View);
                // ACT
                networkExplorer.showLoading();
                // ASSERT
                expect(networkExplorer.view.showLoadingAnimation.callCount).to.equal(1);
            });
        });

        describe('hideLoading()', function() {
            it('Should call hideLoadingAnimation() from view model', function() {
                // ARRANGE
                networkExplorer.view = sinon.createStubInstance(View);
                // ACT
                networkExplorer.hideLoading();
                // ASSERT
                expect(networkExplorer.view.hideLoadingAnimation.callCount).to.equal(1);
            });
        });

        describe('setQueryBuilderOn()', function() {
            it('should enable flag on queryBuilderOn', function() {
                // ARRANGE
                networkExplorer.queryBuilderOn = false;
                // ACT
                networkExplorer.setQueryBuilderOn();
                // ASSERT
                expect(networkExplorer.queryBuilderOn).to.equal(true);
            });
        });

        describe('setQueryBuilderOff()', function() {
            it('should disable flag on queryBuilderOn', function() {
                // ARRANGE
                networkExplorer.queryBuilderOn = true;
                // ACT
                networkExplorer.setQueryBuilderOff();
                // ASSERT
                expect(networkExplorer.queryBuilderOn).to.equal(false);
            });
        });

        describe('resetLocation()', function() {
            it('should reset the location to networkexplorer', function() {
                // ARRANGE
                networkExplorer.locationController = _sandbox.stub({
                    setLocation: function() {}
                });
                // ACT
                networkExplorer.resetLocation();
                // ASSERT
                expect(networkExplorer.locationController.setLocation.callCount).to.equal(1);
                expect(networkExplorer.locationController.setLocation.getCall(0).calledWith('networkexplorer', true, true));
            });
        });

        describe('showCollectionErrorDialog()', function() {
            it('Should hide loading animation and show collection error dialog', function() {
                // ARRANGE
                networkExplorer.view = sinon.createStubInstance(View);
                var options = {
                    header: 'Mock Header',
                    content: 'Mock Content'
                };
                _sandbox.stub(Dialog.prototype, 'init');
                _sandbox.stub(Dialog.prototype, 'show');

                // ACT
                networkExplorer.showCollectionErrorDialog(options);

                // ASSERT
                expect(networkExplorer.view.hideLoadingAnimation.callCount).to.equal(1);
                expect(Dialog.prototype.init.callCount).to.equal(1);
                expect(Dialog.prototype.init.getCall(0).calledWithMatch({
                    header: 'Mock Header',
                    content: 'Mock Content',
                    type: 'error'
                })).to.equal(true);
                expect(Dialog.prototype.show.callCount).to.equal(1);
            });
        });

        describe('onCollectionFetchError()', function() {
            describe('given a valid error body', function() {
                var errorBodyMock = {
                    userMessage: {
                        title: 'headerMock',
                        body: 'messageMock'
                    },
                    isOffline: false,
                    objectNotFound: undefined
                };
                beforeEach(function() {
                    networkExplorer.slidingMenu = sinon.createStubInstance(SlidingMenu);
                });
                describe('when objectNotFound is true', function() {
                    it('then call the SlidingMenu fetchListData method', function() {
                        // ARRANGE
                        errorBodyMock.objectNotFound = true;
                        // ACT
                        networkExplorer.onCollectionFetchError(errorBodyMock);
                        //ASSERT
                        expect(networkExplorer.slidingMenu.fetchListData.callCount).to.equal(1);
                    });
                });
                describe('when objectNotFound is false', function() {
                    it('then do not call the SlidingMenu fetchListData method', function() {
                        // ARRANGE
                        errorBodyMock.objectNotFound = false;
                        // ACT
                        networkExplorer.onCollectionFetchError(errorBodyMock);
                        //ASSERT
                        expect(networkExplorer.slidingMenu.fetchListData.callCount).to.equal(0);
                    });
                });
            });
        });

    });
});
