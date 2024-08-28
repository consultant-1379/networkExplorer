define([
    'jscore/core',
    'jscore/ext/net',
    'template!./DataSelector.html',
    './DataSelectorView',
    'widgets/Combobox',
    'widgets/TextArea',
    'widgets/SelectBox',
    '../ext/Scenarios'
], function(core, net, Template, View, Combobox, TextArea, SelectBox, Scenarios) {
    return core.Widget.extend({
        View: View,
        /**
         * Lifecycle Method
         */
        onViewReady: function() {
            this.noScenarioSelected = {name: '[None selected]'};
            this.selectbox = new SelectBox({
                value: this.noScenarioSelected,
                modifiers: [{
                    name: 'width',
                    value: 'full'
                }],
                items: Scenarios
            });
            this.selectbox.addEventHandler('change', function() {
                var valueList = this.selectbox.getValue().value;
                this.combobox.setValue({name: valueList[0].dataType, value: valueList[0].dataType});
                this.textarea.setValue(JSON.stringify(this.selectbox.getValue().value.reduce(function(accumulator, currentValue) { currentValue.payload.forEach(function(content) { accumulator.push(content); }); return accumulator; }, []), null, 2));
                this.setData();
            }.bind(this));
            this.selectbox.attachTo(this.view.getSelectBox());

            this.combobox = new Combobox({
                items: [
                    {name: 'ManagedObject', value: 'ManagedObject'},
                    {name: 'Collection', value: 'Collection'},
                    {name: 'Alarm', value: 'Alarm'},
                ],
                placeholder: 'Enter a DataType...',
                autoComplete: {
                    message: {notFound: 'Custom Value...'}
                },
                modifiers: [{
                    name: 'width',
                    value: 'full'
                }],
            });
            this.combobox.addEventHandler('change', function() {
                this.setData();
                this.selectbox.setValue(this.noScenarioSelected);
            }.bind(this));
            this.combobox.attachTo(this.view.getComboBox());

            this.textarea = new TextArea({
                placeholder: 'Payload',
                autoResize: true,
                width: '100%'
            });
            this.textarea.addEventHandler('change', function() {
                this.setData();
                this.selectbox.setValue(this.noScenarioSelected);
            }.bind(this));
            this.textarea.attachTo(this.view.getTextArea());
        },

        setData: function() {
            this.options.callback({
                dataType: this.combobox.getValue().value,
                selection: this.textarea.getValue()
            });
        }
    });
});
