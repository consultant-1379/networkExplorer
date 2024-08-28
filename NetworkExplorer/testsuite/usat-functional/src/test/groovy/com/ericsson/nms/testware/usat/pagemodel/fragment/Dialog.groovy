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

import java.util.concurrent.TimeUnit

import static org.jboss.arquillian.graphene.Graphene.waitGui

class Dialog implements PageFragment {

    @FindBy(css = ".ebDialogBox-primaryText")
    WebElement dialogBoxHeader

    @FindBy(css = ".ebDialogBox-secondaryText")
    WebElement secondaryText

    @FindBy(xpath = ".//span[@class = 'ebBtn-caption' and text() != 'Cancel']")
    WebElement confirmButton

    @FindBy(xpath = ".//span[@class = 'ebBtn-caption' and text() = 'Cancel']")
    WebElement cancelButton

    @Override
    void waitForLoad() { }

    String getDialogBoxHeader() {
        return dialogBoxHeader.getText()
    }

    String getSecondaryText() {
        return secondaryText.getText()
    }

    void clickConfirmButton() {
        click(confirmButton)
    }

    boolean isDialogBoxHolderDisplayed() {
        waitGui().withTimeout(1, TimeUnit.SECONDS)
        return falseOnException { dialogBoxHeader.isDisplayed() }
    }

    void clickCancelButton() {
        click(cancelButton)
    }
}