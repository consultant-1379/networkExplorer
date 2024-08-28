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

import org.openqa.selenium.NoSuchElementException
import org.openqa.selenium.WebElement

class ActionBar implements PageFragment {

    @Override
    void waitForLoad() {
        waitPresent(root)
    }

    boolean isButtonDisplayed(final String buttonText) {
        waitForLoad()
        try {
            return getXpathElement(getButtonSelectorXPath(buttonText)).isDisplayed()
        } catch (NoSuchElementException e) {
            return false
        }
    }

    void clickActionBarButton(final String buttonText) {
        WebElement actionBarButton = getXpathElement(getButtonSelectorXPath(buttonText))
        waitVisible(actionBarButton).click()
    }

    private String getButtonSelectorXPath(final String buttonText) {
        waitForLoad()
        return "//div[contains(@class,'elLayouts-QuickActionBar-items')]//*[text()='$buttonText']"
    }

}
