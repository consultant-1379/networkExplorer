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

class Search implements PageFragment {

    @FindBy(css = "span[class*='-searchCancel']")
    WebElement clearButton

    @FindBy(css = "input[class*='-searchInput']")
    WebElement searchField

    @FindBy(css = "button[class*='-searchBtn']")
    WebElement searchButton

    @FindBy(css = "button[class*='-switchToBuilder']")
    WebElement switchToBuilderButton

    @Override
    void waitForLoad() {
        waitPresent(searchField)
    }

    void clearQuery() {
        waitForLoad()
        if(clearButton.isDisplayed()) {
            waitClickable(clearButton).click()
        }
    }

    void enterText(final String text) {
        waitPresent(searchField).sendKeys(text)
    }

    void clickSearch() {
        waitClickable(searchButton).click()
    }

    void executeSearch(final String query) {
        clearQuery()
        enterText(query)
        clickSearch()
        waitVisible(getXpathElement("//span[contains(@class,'-rInfoBar-infoName')][text() = 'Unsaved Search']"))
    }

    void switchToBuilder() {
        waitClickable(switchToBuilderButton).click()
    }

}
