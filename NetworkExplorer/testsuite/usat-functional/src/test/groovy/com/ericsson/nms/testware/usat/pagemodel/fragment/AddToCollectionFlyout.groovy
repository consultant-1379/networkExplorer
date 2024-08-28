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

package com.ericsson.nms.testware.usat.pagemodel.fragment

import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

import static org.jboss.arquillian.graphene.Graphene.waitAjax
import static org.jboss.arquillian.graphene.Graphene.waitModel

class AddToCollectionFlyout extends Flyout {

    @FindBy(css = ".elNetworkExplorerLib-wChooseCollection-newButton-radioNewCollection")
    WebElement addToNewCollectionRadioButton

    @FindBy(css = ".elNetworkExplorerLib-wChooseCollection-existingButton-radioExistingCollection")
    WebElement addToExistingCollectionRadioButton

    @FindBy(css = ".elNetworkExplorerLib-wChooseCollection-replaceButton-replaceCheckbox")
    WebElement replaceExistingObjectsCheckbox

    @FindBy(css = ".elNetworkExplorerLib-wInsertCollection-collectionNameInput")
    WebElement collectionNameInput

    @FindBy(css = "input[class*='-wSharingPermissions-radioPublic']")
    WebElement publicRadioButton

    @FindBy(xpath = "//button[contains(@class,'ebBtn') and text() = 'Add']")
    WebElement addButton

    @FindBy(css = ".elNetworkExplorerLib-FilterSelection-filters-filterByName")
    WebElement collectionNameFilter

    @FindBy(css = ".elNetworkExplorerLib-rCollectionsCommon-content_tableCollections")
    Table collectionsTable

    @Override
    void waitForLoad() {
        waitAjax().until().element(addToNewCollectionRadioButton).is().present()
    }

    void setAddToNewCollection() {
        waitAjax().until().element(addToNewCollectionRadioButton).is().enabled()
        addToNewCollectionRadioButton.click()
    }

    void setCollectionName(String name) {
        waitAjax().until().element(collectionNameInput).is().enabled()
        collectionNameInput.sendKeys(name)
    }

    void setAddToExistingCollection() {
        waitAjax().until().element(addToExistingCollectionRadioButton).is().present()
        addToExistingCollectionRadioButton.click()
    }

    void setOverwriteExistingCollection() {
        waitAjax().until().element(replaceExistingObjectsCheckbox).is().enabled()
        replaceExistingObjectsCheckbox.click()
    }

    void setPublic() {
        waitAjax().until().element(publicRadioButton).is().enabled()
        publicRadioButton.click()
    }

    void selectCollectionByName(String name) {
        waitAjax().until().element(collectionNameFilter).is().present()
        waitAjax().until().element(collectionNameFilter).is().visible()
        collectionNameFilter.sendKeys(name)
        collectionsTable.waitForLoad()
        collectionsTable.selectFirstRow()
    }

    void add() {
        waitAjax().until().element(addButton).is().enabled()
        addButton.click()
        waitModel().until().element(addButton).is().not().present()
    }
}