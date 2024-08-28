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

import org.openqa.selenium.By
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

class Table implements PageFragment {

    @FindBy(xpath = ".//thead[contains(@class,'elTablelib-Table-header')]")
    WebElement tableHeader

    @FindBy(xpath = ".//th[contains(@class,'elTablelib-CheckboxHeaderCell')]")
    WebElement headerCheckbox

    @FindBy(xpath = ".//tbody[contains(@class,'elTablelib-Table-body')]")
    WebElement tableBody

    @Override
    void waitForLoad() {
        waitPresent(tableBody)
    }

    void selectAll() {
        waitVisible(headerCheckbox)
        headerCheckbox.click()
    }

    void selectFirstRow() {
        waitVisible(getFirstTableRow()).click()
    }

    void clickRowCheckbox(index = 0) {
        waitPresent(getTableBodyCheckbox(index)).click()
    }

    def getTableBodyCheckbox(index = 0) {
        return getXpathElement("(.//tbody//input[contains(@class,'ebCheckbox')])[" + (index + 1) + "]", root)
    }

    def getCurrentResults(userHeaders) {
        return filterByHeader(getCurrentResults(), userHeaders)
    }

    def getCurrentResults() {
        waitVisible(getFirstTableRow())
        def _tempResults = []
        def headers = new HashMap<>()
        def headerCells = tableHeader.findElements(By.cssSelector("th"))
        headerCells.eachWithIndex { header, index ->
            def columnName = header.getText()
            if (columnName != "") {
                headers."$index" = columnName
            }
        }
        def rows = tableBody.findElements(By.cssSelector("tr"))
        rows.each { row ->
            def result = new Expando()
            def cells = row.findElements(By.cssSelector("td"))
            cells.eachWithIndex { cell, index ->
                def columnName = headers."$index"
                if (columnName != null) {
                    result."$columnName" = cell.getText()
                }
            }
            _tempResults += result
        }
        return _tempResults
    }

    WebElement getFirstTableRow() {
        getCssElement("tr", root) // wait
        return getXpathElement("(.//tbody//tr)[1]", root)
    }

    def filterByHeader(List results, def headers) {
        def filteredResults = []
        results.each { result ->
            def filteredResult = new Expando()
            headers.each { header ->
                if (result."$header" != null)
                    filteredResult."$header" = result."$header"
            }
            filteredResults += filteredResult
        }
        return filteredResults
    }
}