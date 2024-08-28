package com.ericsson.nms.testware.usat.pagemodel.fragment

import org.jboss.arquillian.graphene.Graphene
import org.openqa.selenium.By
import org.openqa.selenium.NoSuchElementException

import static org.jboss.arquillian.graphene.Graphene.waitModel

/**
 * Created by eeoicon on 06/12/2017.
 */
class Results implements PageFragment {

    def messageHeaderCss = "elNetworkExplorerLib-rResults-messageHeader"

    def collectionIsEmpty = "Collection is Empty"

    private List tempResults

    @Override
    void waitForLoad() {
        waitPresent(getRoot())
    }

    /**
     * A collection was loaded but does not contain valid elements
     * @return true if an empty collection was loaded
     */
    boolean isEmptyCollection() {
        try {
            return getXpathElement("//span[contains(@class,'$messageHeaderCss')][text()='$collectionIsEmpty']").isDisplayed()
        } catch (NoSuchElementException e) {
            return false
        }
    }

    /**
     * The search query was valid, but it did not match any items in the database
     * @return true if a search that returns no results was executed successfully
     */
    boolean areNoResultsFound() {
        try {
            return getXpathElement("//div[contains(@class,'elNetworkExplorerLib-rResults-noResultsMessage')]").isDisplayed()
        } catch (NoSuchElementException e) {
            return false
        }
    }

    def getCurrentResultsTotal() {
        return waitVisible(getXpathElement("//p[contains(@class,'-resultCount')]")).getText().replaceAll(",","")
    }

    void storeResults(def headers) {
        tempResults = getTable().getCurrentResults(headers)
    }

    def setStoredResults(def newResults) {
        tempResults = newResults
    }

    def getStoredResults() {
        return tempResults
    }

    def compareToStoredResults (def results) {
        return results.toString() == tempResults.toString()
    }

    Table getTable() {
        waitNotVisible(getCssElement("div[class*='-rResults-loadingAnimation']", getRoot()))
        def xpath = "(.//div[contains(@class,'-wResultsTable')])[1]"
        waitModel().until().element(getRoot(), By.xpath(xpath)).is().visible()
        return Graphene.createPageFragment(Table.class, getRoot().findElement(By.xpath(xpath)))
    }
}
