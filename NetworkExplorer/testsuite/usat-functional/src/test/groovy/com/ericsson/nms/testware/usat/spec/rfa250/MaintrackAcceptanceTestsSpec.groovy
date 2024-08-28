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

package com.ericsson.nms.testware.usat.spec.rfa250

import com.ericsson.nms.testware.usat.fixtures.TopologyCollectionsService
import com.ericsson.nms.testware.usat.pagemodel.page.CollectionManagementPage
import com.ericsson.nms.testware.usat.pagemodel.page.MainPage
import com.ericsson.nms.testware.usat.pagemodel.utils.Configuration
import com.ericsson.nms.testware.usat.spec.BaseSpecification
import org.jboss.arquillian.graphene.page.Page
import org.jboss.arquillian.spock.ArquillianSputnik
import org.junit.runner.RunWith
import spock.lang.Shared

@RunWith(ArquillianSputnik)
class MaintrackAcceptanceTestsSpec extends BaseSpecification {

    @Page
    MainPage mainPage

    @Page
    CollectionManagementPage collectionsPage

    @Shared
    def testNode = Configuration.getTestERBSNodeName()

    @Shared
    def topologyCollectionsService = new TopologyCollectionsService()

    def clear() {
        def collectionsResponse = topologyCollectionsService.getCollections('Private')
        def ids = TopologyCollectionsService.getCollectionsIds(collectionsResponse)
        collectionsResponse = topologyCollectionsService.getCollections('Public')
        ids.addAll(TopologyCollectionsService.getCollectionsIds(collectionsResponse))
        ids.each { id ->
            topologyCollectionsService.deleteCollection(id)
        }
    }

    /**
     * Prerequisite - user has no private or public collections defined
     */
    def 'Check search, collections and favorites work end-to-end (see Q2_Functional_NETWORK_EXPLORER_SCENARIO_5)'() {
        given: 'The prerequisites'
            clear()
            open(mainPage)
        when: 'a set of EUtranCellRelations is returned from a search result'
            def firstQuery = "select all objects of type EUtranCellRelation from node $testNode where name=1*"
            def firstHeaders = Configuration.getDefaultHeaders()
            def collectionName = "collection_" + System.currentTimeMillis()
            def secondQuery = "select all objects of type MeContext from node $testNode"
            def secondHeaders = ['Name','MO Type','Node Name','Sync Status','Parent MO','neType']
            def thirdQuery = "select MeContext,EUtranCellRelation where name=1* or name=LTE* from node $testNode"
            def fourthQuery = "select NetworkElement from node $testNode"
            mainPage.executeSearch(firstQuery)
        and: 'we use the "Add to a new Collection" action'
            mainPage.getResultsTable().selectAll()
            mainPage.createCollection(collectionName)
            mainPage.storeCurrentResults(firstHeaders)
        then: 'a collection named #collectionName is created'
            openUrl("/#networkexplorer/collections")
            collectionsPage.setNameFilter(collectionName)
            collectionsPage.selectAllCollections()
            collectionsPage.viewContents()
            assert mainPage.isACollectionLoaded()
        and: 'it can be marked as a favorite'
            assert mainPage.compareCurrentResultsToStored(firstHeaders)
            assert !mainPage.isFavorited()
            mainPage.favorite()
            assert mainPage.isFavorited()
            mainPage.closeCollection()
        when: 'we use the "Append to an existing Collection" action to add different objects to the collection'
            mainPage.executeSearch(secondQuery)
            mainPage.getResultsTable().selectAll()
            mainPage.addToExistingCollection(collectionName)
        then: 'the existing collection is updated'
            openUrl("/#networkexplorer/collections")
            collectionsPage.setNameFilter(collectionName)
            collectionsPage.selectAllCollections()
            collectionsPage.viewContents()
            assert mainPage.isACollectionLoaded()
            mainPage.storeCurrentResults(secondHeaders)
        and: 'the existing collection contains both sets of objects'
            mainPage.executeSearch(thirdQuery)
            assert mainPage.compareCurrentResultsToStored(secondHeaders)
            mainPage.executeSearch(collectionName)
            assert mainPage.compareCurrentResultsToStored(secondHeaders)
        when: 'we use the "Overwrite an existing Collection" action'
            mainPage.executeSearch(fourthQuery)
            mainPage.getResultsTable().selectAll()
            mainPage.overwriteExistingCollection(collectionName)
            mainPage.storeCurrentResults(secondHeaders)
        then: 'only the objects from the last action are in the collection'
            mainPage.executeSearch(collectionName)
            assert mainPage.compareCurrentResultsToStored(secondHeaders)
        when: 'we remove all contents from a collection'
            openUrl("/#networkexplorer/collections")
            collectionsPage.setNameFilter(collectionName)
            collectionsPage.selectAllCollections()
            collectionsPage.viewContents()
            assert mainPage.isACollectionLoaded()
            mainPage.emptyCollection()
        then: 'the collection no longer has any contents'
            assert mainPage.isACollectionLoaded()
            assert mainPage.isAnEmptyCollectionLoaded()
        when: 'we delete a collection'
            openUrl("/#networkexplorer/collections")
            collectionsPage.setNameFilter(collectionName)
            collectionsPage.selectAllCollections()
            collectionsPage.deleteSelected()
        then: 'the collection no longer returns any results when we search for it'
            openUrl("/#networkexplorer")
            mainPage.executeSearch(collectionName)
            assert mainPage.areNoResultsFound()
    }
}
