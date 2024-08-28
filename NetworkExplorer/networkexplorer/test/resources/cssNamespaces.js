/**
 *  Css Name Spaces : provides a centralized point where css data is stored for use with
 *  Unit,Integration and Acceptance test
 *
 *  When editing this file consider:
 *      - Variable naming to be intuitive when using code completion by the developer.
 *      - Every property must be an object "{}" to allow extensibility.
 *      - Widgets may have namespaces independent from app or regions.
 *      - This library is to be used with either Unit, Integration or Acceptance lvl tests .
 */

// use amdefine library to ensure nodejs can also use this module.
if (typeof define !== 'function') {
    var define = require('../acceptance/node_modules/amdefine')(module);
}

define([

],function() {

    var app = {};
    app.val = 'eaNetworkExplorer';

    /**  Header (not a region just a child of app element) */

    app.header = {} ;
    app.header.val = app.val + '-header';

    app.contentHolder = {};
    app.contentHolder.val = app.val + '-contentHolder';

    app.cancelButton = {};
    app.cancelButton.val = app.val + '-cancelButton';

    app.returnButton = {};
    app.returnButton.val = app.val + '-returnButton';

    /** Search Region */

    app.rSearch = {} ;
    app.rSearch.val = app.val + '-rSearch';

    app.rSearch.searchInput                     = {};
    app.rSearch.searchInput.val                 = app.rSearch.val + '-form-searchInput';

    app.rSearch.searchBtn                       = {};
    app.rSearch.searchBtn.val                   = app.rSearch.val + '-form-searchBtn';

    app.rCollectionActionBar                    = {};
    app.rCollectionActionBar.val                = app.val + '-rInfoBar';


    /** Results Region */

    app.rResults = {} ;
    app.rResults.val = app.val + '-rResults';
    app.rResults.infoMessage = {};
    app.rResults.infoMessage.val = app.rResults.val + '-infoMessage';
    app.rResults.errorMessage = {};
    app.rResults.errorMessage.val = app.rResults.val + '-errorMessage';
    app.rResults.errorMessageHeader = {};
    app.rResults.errorMessageHeader.val = app.rResults.val + '-messageHeader';
    app.rResults.errorMessageParagraph = {};
    app.rResults.errorMessageParagraph.val = app.rResults.val + '-messageParagraph';
    app.rResults.noResultsMessage = {};
    app.rResults.noResultsMessage.val = app.rResults.val + '-noResultsMessage';
    app.rResults.actionPanel = {};
    app.rResults.actionPanel.val = app.rResults.val + '-actionPanel';
    app.rResults.resultCount = {};
    app.rResults.resultCount.val = app.rResults.val + '-resultCount';
    app.rResults.tableHolder = {};
    app.rResults.tableHolder.val = app.rResults.val + '-tableHolder';

    app.rResults.wTable = {};

    /** Table Library */
    app.tableLibWidget = {};
    app.tableLibWidget.value = 'elTablelib-Table';
    app.tableLibWidget.body = {};
    app.tableLibWidget.body.value = app.tableLibWidget.value + '-body';
    app.tableLibWidget.row = {};
    app.tableLibWidget.row.value = 'ebTableRow';

    /** Dialog Widget */
    app.dialogWidget = {};
    app.dialogWidget.val = 'ebDialog';
    app.dialogWidget.primaryActionButton = {};
    app.dialogWidget.primaryActionButton.val = app.dialogWidget.val + '-primaryActionButton';
    app.dialogWidget.secondaryActionButton = {};
    app.dialogWidget.secondaryActionButton.val = app.dialogWidget.val + '-secondaryActionButton';

    /** Notification Widget */
    app.notificationWidget = {};
    app.notificationWidget.val = 'ebNotification';

    /** Checkbox Asset */
    app.checkboxAsset = {};
    app.checkboxAsset.val = 'ebCheckbox';

    /** InfoBar Region **/
    app.rCollectionActionBar.defaultHeader = {};
    app.rCollectionActionBar.defaultHeader.val = app.rCollectionActionBar.val + '-defaultHeader';
    app.rCollectionActionBar.collectionDetails = {};
    app.rCollectionActionBar.collectionDetails.val = app.rCollectionActionBar.val + '-info';
    app.rCollectionActionBar.collectionName = {};
    app.rCollectionActionBar.collectionName.val = app.rCollectionActionBar.val + '-infoName';
    app.rCollectionActionBar.collectionType = {};
    app.rCollectionActionBar.collectionType.val = app.rCollectionActionBar.val + '-infoType';
    app.rCollectionActionBar.collectionTypeText = {};
    app.rCollectionActionBar.collectionTypeText.val = app.rCollectionActionBar.val + '-collectionTypeText';
    //    app.rCollectionActionBar.saveAs = {};
    //    app.rCollectionActionBar.saveAs.val = app.rCollectionActionBar.val + "-saveAs";               // save as no longer there

    app.wSaveDialog = {};
    app.wSaveDialog.val = app.val + '-wSaveDialog';
    app.wSaveDialog.collectionNameLabel = {};
    app.wSaveDialog.collectionNameLabel.val = app.wSaveDialog.val + '-collectionNameLabel';
    app.wSaveDialog.collectionName = {};
    app.wSaveDialog.collectionName.val = app.wSaveDialog.val + '-collectionName';
    app.wSaveDialog.savedSearchButtonVal = app.wSaveDialog.val + '-savedSearchRadioButton';
    app.wSaveDialog.saveButtonVal = 'ebDialog-primaryActionButton';
    app.wSaveDialog.cancelButtonVal = 'ebDialog-secondaryActionButton';
    //TODO: redo the naming of vars for the above region for more intuitive.

    app.rSlidingMenu = {};
    app.rSlidingMenu.val = app.val + '-rSlidingMenu';
    app.rSlidingMenu.closed = {};
    app.rSlidingMenu.closed.val = app.rSlidingMenu.val + '_closed';
    app.rSlidingMenu.toggle = {};
    app.rSlidingMenu.toggle.val = app.rSlidingMenu.val + '-toggle';
    app.rSlidingMenu.collections = {};
    app.rSlidingMenu.searches = {};
    app.rSlidingMenu.collections.val = app.rSlidingMenu.val + '-collectionList';
    app.rSlidingMenu.searches.val = app.rSlidingMenu.val + '-savedSearchesList';

    app.wLimitedList = {};
    app.wLimitedList.val = app.val + '-wLimitedList';
    app.wLimitedList.showMore = {};
    app.wLimitedList.showMore.val = app.wLimitedList.val + '-showMore';

    app.wLimitedList.topList = {};
    app.wLimitedList.topList.val = app.wLimitedList.val + '-topList';

    app.wLimitedListItem = {};
    app.wLimitedListItem.val = 'eaNetworkExplorer-wLimitedListItem';

    app.wLimitedListItem.link = {};
    app.wLimitedListItem.link.val = app.wLimitedListItem.val + '-link';

    return app;
});
