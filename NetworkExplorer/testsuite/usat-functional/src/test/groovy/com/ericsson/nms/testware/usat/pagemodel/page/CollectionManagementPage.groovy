/*------------------------------------------------------------------------------
 *******************************************************************************
 * COPYRIGHT Ericsson 2017
 *
 * The copyright to the computer program(s) herein is the property of
 * Ericsson Inc. The programs may be used and/or copied only with written
 * permission from Ericsson Inc. or in accordance with the terms and
 * conditions stipulated in the agreement/contract under which the
 * program(s) have been supplied.
 *******************************************************************************
 *----------------------------------------------------------------------------*/

package com.ericsson.nms.testware.usat.pagemodel.page

import com.ericsson.nms.testware.usat.pagemodel.fragment.*
import org.jboss.arquillian.graphene.page.Location
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

@Location("/#networkexplorer/collections/")
class CollectionManagementPage implements PageObject {

    @FindBy(css = ".elLayouts-QuickActionBarWrapper")
    ActionBar actionBar

    @FindBy(css = ".elNetworkExplorerLib-FilterSelection-filters-filterByName")
    WebElement nameFilter

    @FindBy(css = ".eaCollectionManagement-Main-Content")
    Table collectionsTable

    @Override
    void waitForLoad() {
        collectionsTable.waitForLoad()
    }

    boolean isActionButtonDisplayed(final String buttonText) {
        return actionBar.isButtonDisplayed(buttonText)
    }

    void clickActionBarButton(final String buttonText) {
        isActionButtonDisplayed(buttonText)
        actionBar.clickActionBarButton(buttonText)
    }

    void setNameFilter(String name) {
        waitPresent(nameFilter)
        waitVisible(nameFilter)
        nameFilter.sendKeys(name)
    }

    void selectAllCollections() {
        getCollectionsTable().selectAll()
    }

    void viewContents() {
        clickActionBarButton("View Contents")
    }

    void deleteSelected() {
        clickActionBarButton("Delete")
        getDialog().clickConfirmButton()
    }

    void createCollection(String collectionName, boolean isPublic) {
        getCollectionsTableTable().selectAll()
        clickActionBarButton("Create a Collection")
        //addToANewCollection(collectionName, isPublic) TODO
    }
}
