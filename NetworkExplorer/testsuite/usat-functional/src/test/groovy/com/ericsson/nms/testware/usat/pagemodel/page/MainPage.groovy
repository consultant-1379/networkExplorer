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
import org.jboss.arquillian.graphene.Graphene
import org.jboss.arquillian.graphene.page.Location
import org.openqa.selenium.By
import org.openqa.selenium.NoSuchElementException
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

import static org.jboss.arquillian.graphene.Graphene.waitModel

@Location("/#networkexplorer/")
class MainPage implements PageObject {

    @FindBy(css = ".elLayouts-QuickActionBarWrapper")
    ActionBar actionBar

    @FindBy(css = "div[class*='-rSearch']")
    Search search

    @FindBy(css = "div[class*='-rResults']")
    Results resultsRegion

    @FindBy(css = "div[class*='-rInfoBar']")
    InfoBar infoBar

    @FindBy(css = "div[class*='-rQueryBuilder']")
    CriteriaBuilder criteriaBuilder

    @FindBy(css = "a[href='#networkexplorer/collections/my']")
    WebElement viewAllCollections

    @FindBy(css = "a[href='#networkexplorer/savedsearches/my']")
    WebElement viewAllSavedSearches

    @FindBy(css = "button[class*='_collectionsAndSearches']")
    WebElement collectionsAndSearchesButton

    @FindBy(css = ".eaFlyout_show")
    AddToCollectionFlyout addToCollectionFlyout

    @FindBy(css = ".eaFlyout_show")
    AddToSavedSearchFlyout addToSavedSearchFlyout

    void waitForLoad() {
        try {
            waitPresent(search.getRoot())
        } finally {
            waitVisible(search.getRoot())
        }
    }

    ActionBar getActionBar() {
        waitVisible(actionBar.getRoot())
        return actionBar
    }

    Results getResultsRegion() {
        waitVisible(resultsRegion.getRoot())
        return resultsRegion
    }

    Search getSearch() {
        waitVisible(search.getRoot())
        return search
    }

    Table getResultsTable() {
        return getResultsRegion().getTable()
    }

    void executeSearch(final String query) {
        getSearch().executeSearch(query)
    }

    void switchToCriteriaBuilder() {
        getSearch().switchToBuilder()
    }

    def getCriteriaBuilder() {
        waitVisible(criteriaBuilder.getRoot())
        return criteriaBuilder
    }

    boolean isActionButtonDisplayed(final String buttonText) {
        return getActionBar().isButtonDisplayed(buttonText)
    }

    void clickActionBarButton(final String buttonText) {
        isActionButtonDisplayed(buttonText)
        getActionBar().clickActionBarButton(buttonText)
    }

    void createCollection(String collectionName, boolean isPublic = false) {
        clickActionBarButton("Add to a Collection")
        addToANewCollection(collectionName, isPublic)
    }

    void addToExistingCollection(String collectionName) {
        clickActionBarButton("Add to a Collection")
        addToAnExistingCollection(collectionName, false)
    }

    void overwriteExistingCollection(String collectionName) {
        clickActionBarButton("Add to a Collection")
        addToAnExistingCollection(collectionName, true)
    }

    void addToANewCollection(String collectionName, boolean isPublic) {
        waitVisible(addToCollectionFlyout.getRoot())
        addToCollectionFlyout.waitForLoad()
        addToCollectionFlyout.setAddToNewCollection()
        addToCollectionFlyout.setCollectionName(collectionName)
        if (isPublic) {
            addToCollectionFlyout.setPublic()
        }
        addToCollectionFlyout.add()
        addToCollectionFlyout.waitForUnload()
    }

    void addToAnExistingCollection(String collectionName, boolean overwrite) {
        waitVisible(addToCollectionFlyout.getRoot())
        addToCollectionFlyout.waitForLoad()
        addToCollectionFlyout.setAddToExistingCollection()
        if (overwrite) {
            addToCollectionFlyout.setOverwriteExistingCollection()
        }
        addToCollectionFlyout.selectCollectionByName(collectionName)
        addToCollectionFlyout.add()
        addToCollectionFlyout.waitForUnload()
    }

    void removeFromCollection() {
        clickActionBarButton("Remove from this Collection")
    }

    void emptyCollection() {
        getResultsTable().selectAll()
        clickActionBarButton("Remove from this Collection")
    }

    boolean isACollectionLoaded() {
        waitVisible(infoBar.getRoot())
        infoBar.waitForLoad()
        return infoBar.isCollection()
    }

    boolean isAnEmptyCollectionLoaded() {
        return getResultsRegion().isEmptyCollection()
    }

    void saveSearch(String searchName, boolean setPublic = false) {
        clickActionBarButton("Save Search")
        waitVisible(addToSavedSearchFlyout.getRoot())
        addToSavedSearchFlyout.waitForLoad()
        addToSavedSearchFlyout.setSavedSearchName(searchName)
        if (setPublic) {
            addToSavedSearchFlyout.setPublic()
        }
        addToSavedSearchFlyout.add()
        addToSavedSearchFlyout.waitForUnload()
    }

    boolean areResultsFound() {
        try {
            getResultsTable()
            return true
        } catch (NoSuchElementException e) {
            return false
        }
    }

    boolean areNoResultsFound() {
        return getResultsRegion().areNoResultsFound()
    }

    void closeCollection() {
        infoBar.waitForLoad()
        infoBar.closeCollection()
    }

    boolean isFavorited() {
        infoBar.waitForLoad()
        return infoBar.isFavorite()
    }

    void favorite() {
        infoBar.waitForLoad()
        infoBar.clickFavoriteIcon()
    }

    void storeCurrentResults(def headers) {
        getResultsRegion().storeResults(headers)
    }

    def getStoredResults() {
        return getResultsRegion().getStoredResults()
    }

    def getCurrentResultsTotal() {
        return getResultsRegion().getCurrentResultsTotal()
    }

    void updateStoredResults(Closure transformationClosure) {
        getResultsRegion().setStoredResults(transformationClosure(getResultsRegion().getStoredResults()))
    }

    boolean compareResultsToStored(def results) {
        getResultsRegion().compareToStoredResults(results)
    }

    boolean compareCurrentResultsToStored(def headers) {
        getResultsRegion().compareToStoredResults(getResultsTable().getCurrentResults(headers))
    }

    void viewAllCollections() {
        viewAll(viewAllCollections)
    }

    void viewAllSavedSearches() {
        viewAll(viewAllSavedSearches)
    }

    void viewAll(item) {
        waitPresent(item)
        if (!item.isDisplayed()) {
            collectionsAndSearchesButton.click()
        }
        waitClickable(item).click()
    }
}
