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

class AddToSavedSearchFlyout extends Flyout {

    @FindBy(css = "input[class*='-rSaveSearch-nameInput']")
    WebElement savedSearchNameInput

    @FindBy(css = "input[class*='-wSharingPermissions-radioPublic']")
    WebElement publicRadioButton

    @FindBy(xpath = "//button[contains(@class,'ebBtn') and text() = 'Save']")
    WebElement addButton

    @Override
    void waitForLoad() {
        waitAjax().until().element(savedSearchNameInput).is().present()
    }

    void setSavedSearchName(String name) {
        waitAjax().until().element(savedSearchNameInput).is().enabled()
        savedSearchNameInput.sendKeys(name)
    }

    void setPublic() {
        waitAjax().until().element(publicRadioButton).is().enabled()
        publicRadioButton.click()
    }

    void add() {
        waitAjax().until().element(addButton).is().enabled()
        addButton.click()
        waitModel().until().element(addButton).is().not().present()
    }
}