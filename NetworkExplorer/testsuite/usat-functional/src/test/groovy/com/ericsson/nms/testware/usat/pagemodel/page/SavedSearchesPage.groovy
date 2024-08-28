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

import com.ericsson.nms.testware.usat.pagemodel.fragment.ActionBar
import com.ericsson.nms.testware.usat.pagemodel.fragment.Dialog
import com.ericsson.nms.testware.usat.pagemodel.fragment.Table
import org.jboss.arquillian.graphene.page.Location
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

@Location("/#networkexplorer/collections/")
class SavedSearchesPage implements PageObject {

    @FindBy(css = ".elLayouts-QuickActionBarWrapper")
    ActionBar actionBar

    @FindBy(css = ".elNetworkExplorerLib-FilterSelection-filters-filterByName")
    WebElement nameFilter

    @FindBy(css = ".eaSavedSearchManagement-Main-Content")
    Table savedSearchesTable

    @Override
    void waitForLoad() {
        savedSearchesTable.waitForLoad()
    }

    boolean isActionButtonDisplayed(final String buttonText) {
        return actionBar.isButtonDisplayed(buttonText)
    }

    void clickActionBarButton(final String buttonText) {
        isActionButtonDisplayed(buttonText)
        actionBar.clickActionBarButton(buttonText)
    }

    void selectExactSavedSearch(String name) {
        setNameFilter(name)
        savedSearchesTable.getXpathElement("(.//td[text() = '$name'])[1]").click()
    }

    void setNameFilter(String name) {
        waitPresent(nameFilter)
        waitVisible(nameFilter)
        nameFilter.sendKeys(name)
    }

    void selectAllSavedSearches() {
        getSavedSearchesTable().selectAll()
    }

    void executeSearch() {
        clickActionBarButton("Execute Search")
    }

    void deleteSelected() {
        clickActionBarButton("Delete")
        getDialog().clickConfirmButton()
    }
}
