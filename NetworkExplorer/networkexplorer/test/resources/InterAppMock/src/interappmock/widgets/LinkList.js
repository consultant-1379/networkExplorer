define([
    'jscore/core',
    'jscore/ext/net',
    'template!./LinkList.html',
    './LinkListView',
], function(core, net, Template, View) {
    return core.Widget.extend({

        View: View,

        /**
         * Lifecycle Method
         */
        onViewReady: function() {
            [].forEach.call(this.view.getAllLinks(), function(link) {
                var hash = link.getAttribute('hash') || '';
                var encodedGotoValue = encodeURIComponent(link.getAttribute('goto')) || '';
                encodedGotoValue = encodedGotoValue.replace('%3D','='); //= separating key and value should not be encoded
                var returnType = link.getAttribute('returnType') || '';
                var url = hash + encodedGotoValue + returnType;
                link.setText(url);
                link.setAttribute('href', url);
            });
        }
    });
});
