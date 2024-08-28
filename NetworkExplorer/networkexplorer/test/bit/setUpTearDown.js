define([
    'jscore/core'
], function(core) {
    var isTouch;
    // Will execute before every test as it is outside of a describe block.
    beforeEach(function() {
        // Control level of our additional Sinon logging
        window.consoleLogging = false;
        // Sinon Fake Implementation of abort is incorrect.
        // In real browser scenarios the onload and onerror 
        // do not trigger when you abort a request.
        var __FakeAbort = sinon.FakeXMLHttpRequest.prototype.abort;
        sinon.FakeXMLHttpRequest.prototype.abort = function() {
            this.onload = function() {};
            this.onerror = function() {};
            __FakeAbort.call(this);
        };
        // PhantomJS workaround for setInterval/setTimeout failing to execute callback (CDS-4464)
        for (var i = 0; i < 100000; i++) {
            clearInterval(i);
            clearTimeout(i);
        }
        // stub out touch device check
        isTouch = sinon.stub(core.Window, 'isTouch').returns(false);
    });

    // Will execute after every test
    afterEach(function() {
    	// Remove orphaned Component List elements
        var componentLists = document.getElementsByClassName('elWidgets-ComponentList');
        for (var i = 0; i < componentLists.length; i++) {
            componentLists[i].parentNode.removeChild(componentLists[i]);
        }
        // Remove orphaned Notification elements
        var notifications = document.getElementsByClassName('ebNotification');
        for (var i = 0; i < notifications.length; i++) {
            notifications[i].parentNode.removeChild(notifications[i]);
        }
        // Remove orphaned Dialog elements
        var dialogs = document.getElementsByClassName('ebDialog');
        for (var i = 0; i < dialogs.length; i++) {
            dialogs[i].parentNode.removeChild(dialogs[i]);
        }
        // restore touch device check
        isTouch.restore();
    });

    describe('PhantomJS Workaround', function() {
        it('Empty test required to prevent crash when separating beforeEach into separate file from test.', function() {
            console.log('   ' + window.navigator.userAgent);
            if (window.callPhantom) {
                console.log('    PhantomJS version: ' + (window.navigator.userAgent.indexOf('PhantomJS/1.')?'1.x.x':'2.x.x+'));
            }
        });
    });

});
