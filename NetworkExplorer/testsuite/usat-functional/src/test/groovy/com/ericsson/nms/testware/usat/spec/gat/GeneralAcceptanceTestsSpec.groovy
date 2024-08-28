package com.ericsson.nms.testware.usat.spec.gat

import com.ericsson.nms.testware.usat.fixtures.TopologyCollectionsService
import com.ericsson.nms.testware.usat.pagemodel.page.CollectionManagementPage
import com.ericsson.nms.testware.usat.pagemodel.page.MainPage
import com.ericsson.nms.testware.usat.pagemodel.page.SavedSearchesPage
import com.ericsson.nms.testware.usat.pagemodel.utils.Configuration
import com.ericsson.nms.testware.usat.spec.BaseSpecification
import org.jboss.arquillian.graphene.page.Page
import org.jboss.arquillian.spock.ArquillianSputnik
import org.junit.runner.RunWith
import spock.lang.Shared
import spock.lang.Unroll

import com.ericsson.nms.testware.usat.fixtures.PersistentObjectService
import com.ericsson.nms.testware.usat.fixtures.TopologySearchService

@RunWith(ArquillianSputnik)
class GeneralAcceptanceTestsSpec extends BaseSpecification {
    @Page
    MainPage mainPage

    @Page
    CollectionManagementPage collectionsPage

    @Page
    SavedSearchesPage savedSearchesPage

    @Delegate
    TopologySearchService topologySearchService = new TopologySearchService()

    @Delegate
    PersistentObjectService persistentObjectService = new PersistentObjectService()

    @Shared
    String testNode = Configuration.getTestERBSNodeName()

    @Shared
    String testPartialNode = Configuration.getTestERBSPartialNodeName()

    @Shared
    String testCellName = Configuration.getTestERBSLockedCellName()

    @Shared
    def topologyCollectionsService = new TopologyCollectionsService()

    def lockCell (name) {
        def searchResponse = topologySearchService.search("select EUtranCellFDD where name = $name")
        def id = topologySearchService.getObjects(searchResponse)[0]
        persistentObjectService.setObjectAttributes(id, '{"attributes":[{"key":"administrativeState","value":"LOCKED"}]}')
    }

    /**
     * Prerequisite - user has no private or public collections defined
     * Prerequisite - user has no private or public saved searches defined
     */
    def clear() {
        def collectionsResponse = topologyCollectionsService.getCollections('Private')
        def ids = TopologyCollectionsService.getCollectionsIds(collectionsResponse)
        collectionsResponse = topologyCollectionsService.getCollections('Public')
        ids.addAll(TopologyCollectionsService.getCollectionsIds(collectionsResponse))
        ids.each { id ->
            topologyCollectionsService.deleteCollection(id)
        }
        def savedsearchesResponse = topologyCollectionsService.getSavedSearches('Private')
        def poids = TopologyCollectionsService.getSavedSearchesIds(savedsearchesResponse)
        savedsearchesResponse = topologyCollectionsService.getSavedSearches('Public')
        poids.addAll(TopologyCollectionsService.getSavedSearchesIds(savedsearchesResponse))
        poids.each { poid ->
            topologyCollectionsService.deleteSavedSearch(poid)
        }
    }

    /*
     * Objective
     *  Perform searches using the search box.
     * Pass/Fail Criteria
     *  The user is able to perform a search using the search box and the results are displayed in the results table.
     * Prerequisites
     *  Any of the supported nodes are added and synced to the network.
     *  Network Explorer has been launched.
     */
    @Unroll
    def 'Using the Network Explorer search box to search on a node (using #moType)'() {
        given: 'The prerequisites'
            open(mainPage)
            mainPage.waitForLoad()
        when: 'In the search box enter the following "#moType" and press search'
            mainPage.executeSearch("$moType")
        then: 'A list of all objects matching your selected moType are displayed in the results table'
            mainPage.storeCurrentResults(["MO Type"])
            mainPage.updateStoredResults({ results -> return [results[0]] })
            mainPage.compareResultsToStored([new Expando("MO Type":moType)]) == true
        when: 'In the search box enter the following "$moType with attr $attr" and press search'
            mainPage.executeSearch("$moType with attr $attr")
            mainPage.areResultsFound() == true
        then: 'A list of all objects matching your selected moType are displayed in the results table with the appropriate attribute'
            mainPage.storeCurrentResults([attr])
            mainPage.getStoredResults()[0][attr] in String
        when: 'In the search box enter MO type #moType and the name of a node and press search'
            mainPage.executeSearch("$moType where name = $moId")
            mainPage.areResultsFound() == true
        then: 'An object matching your selected node name and MO Type is displayed in the results table'
            mainPage.storeCurrentResults(["Name","MO Type"])
            mainPage.getStoredResults()[0]["Name"] == moId
            mainPage.getStoredResults()[0]["MO Type"] == moType
        where:
            moType           | attr           | moId
            "MeContext"      | "platformType" | testNode
            "ManagedElement" | "release"      | "1"
            "NetworkElement" | "neType"       | testNode
    }

    /*
     * Objective
     *  Perform searches using the search box.
     * Pass/Fail Criteria
     *  The user is able to perform a search using the search box and the results are displayed in the results table.
     * Prerequisites
     *   ERBS nodes are added and synced to the network.
      *  FDD cells exist on the nodes.
     */
    def 'Search the network for Managed Objects using the Network Explorer search box'() {
        given: 'The prerequisites'
            open(mainPage)
            mainPage.waitForLoad()
        when: 'In the search box enter "ManagedElement" and press search'
            mainPage.executeSearch("ManagedElement")
            mainPage.storeCurrentResults(["MO Type"])
            def meResultsCount = mainPage.getStoredResults().size()
        then: 'A list of all ManagedElement objects is displayed in the results table'
            mainPage.compareResultsToStored((1..meResultsCount).collect{new Expando("MO Type":"ManagedElement")}) == true
        when: 'In the search box enter "ManagedElement with attr healthCheckResult" and press search'
            mainPage.executeSearch("ManagedElement with attr healthCheckResult")
            mainPage.storeCurrentResults(["healthCheckResult"])
            def mehcrResultsCount = mainPage.getStoredResults().size()
        then: 'A list of all ManagedElement objects is displayed in the results table with the attribute healthCheckResult. ManagedElements for nodes that do not have this attribute will display a dash in the attribute value cell'
            mainPage.getStoredResults().collect { result ->
                return result.healthCheckResult == "-" || result.healthCheckResult.startsWith("startTime")
            } == (1..mehcrResultsCount).collect{ true }
        when: 'In the search box enter "EUtranCellFDD" and press search'
            mainPage.executeSearch("EUtranCellFDD")
            mainPage.storeCurrentResults(["MO Type"])
            def eucResultsCount = mainPage.getStoredResults().size()
        then: 'A list of all EUtranCellFDD objects is displayed in the results table'
            mainPage.compareResultsToStored((1..eucResultsCount).collect{new Expando("MO Type":"EUtranCellFDD")}) == true
        when: 'In the search box enter a partial name for an EUtranCellFDD with a wildcard'
            mainPage.storeCurrentResults(["Name"])
            def cellPart = mainPage.getStoredResults()[0].Name.substring(0,5)
            mainPage.executeSearch("EUtranCellFDD name = $cellPart*")
            mainPage.storeCurrentResults(["Name"])
            def eucnResultsCount = mainPage.getStoredResults().size()
        then: 'A list of all EUtranCellFDDs with the partial name within the EUtranCellFDD name is displayed in the results table.'
            mainPage.getStoredResults().collect { result ->
                return result.Name.startsWith(cellPart)
            } == (1..eucnResultsCount).collect{ true }
    }

    /*
     * Objective
     *  Perform searches using the Criteria Builder.
     * Pass/Fail Criteria
     *  The user is able to perform a search using the Criteria Builder and the results are displayed in the results table.
     * Prerequisites
     *   ERBS nodes are added and synced to the network.
     *   FDD cells exist on the nodes.
     *   An EUtranCellFDD exists with administrativeState=LOCKED.
     *   Network Explorer has been launched
     */
    def 'Search on Managed Objects filtering results with attributes using the Network Explorer Criteria Builder'() {
        given: 'The prerequisites'
            lockCell(testCellName)
            open(mainPage)
            mainPage.waitForLoad()
        when: 'On the Network Explorer main page select the link to "Switch to Criteria Builder".'
            mainPage.switchToCriteriaBuilder()
        and: 'On the Criteria Builder page click the box "Node Type"'
            mainPage.getCriteriaBuilder().clickNodeType()
        and: 'Select "ERBS" from the dropdown menu. Select "Has Child" from the bottom of the tree.'
            mainPage.getCriteriaBuilder().setNodeType("ERBS")
            mainPage.getCriteriaBuilder().addChild(0)
        and: 'In the box labeled "Managed Object", start typing "EUtranCellFDD" and select it in the dropdown menu when it appears.'
            mainPage.getCriteriaBuilder().setManagedObject("EUtranCellF")
            mainPage.getCriteriaBuilder().getListItem("EUtranCellFDD").click()
        and: 'Click the "Add Criteria" button. Click the attribute dropdown and select "administrativeState". Click the operator dropdown and select equals. Click the value dropdown and select "LOCKED".'
            mainPage.getCriteriaBuilder().clickAddCriteria()
            mainPage.getCriteriaBuilder().addNewCriteria("", "administrativeState","=","LOCKED")
        and: 'Click "Done" and press the "Search" button.'
            mainPage.getCriteriaBuilder().clickDone(0)
            mainPage.getCriteriaBuilder().clickSearch()
        then: 'A list of EUtranCellFDDs is displayed along with the administrativeState column which should show all listed cells as LOCKED.'
            mainPage.storeCurrentResults(["MO Type","administrativeState"])
            def resultsCount = mainPage.getStoredResults().size()
            mainPage.getStoredResults().collect { result ->
                return result["MO Type"] == "EUtranCellFDD" && result["administrativeState"] == "LOCKED"
            } == (1..resultsCount).collect{ true }
    }

    /*
     * Objective
     *  Perform searches using the Criteria Builder.
     * Pass/Fail Criteria
     *  The user is able to perform a search using the Criteria Builder and the results are displayed in the results table.
     * Prerequisites
     *   ERBS nodes are added and synced to the network.
     *   FDD cells exist on the nodes.
     *   An EUtranCellFDD exists with administrativeState=LOCKED.
     *   Network Explorer has been launched
     */
    def 'Search on Managed Objects using the Network Explorer Criteria Builder'() {
        given: 'The prerequisites'
            lockCell(testCellName)
            open(mainPage)
            mainPage.waitForLoad()
        when: 'On the Network Explorer main page select the link to "Switch to Criteria Builder".'
            mainPage.switchToCriteriaBuilder()
        and: 'On the Criteria Builder page click the box "Node Type"'
            mainPage.getCriteriaBuilder().clickNodeType()
        and: 'Select "ERBS" from the dropdown menu. Select "Has Child" from the bottom of the tree.'
            mainPage.getCriteriaBuilder().setNodeType("ERBS")
            mainPage.getCriteriaBuilder().addChild(0)
        and: 'In the box labeled "Managed Object" as created by the previous step, start typing "MeContext" and select it in the dropdown menu when it appears. Select "Has Child" from the bottom of the tree, then click on the "Managed Object" box that appears. From the dropdown menu that appears, select "ManagedElement".'
            mainPage.getCriteriaBuilder().setManagedObject("meco")
            mainPage.getCriteriaBuilder().getListItem("MeContext").click()
            mainPage.getCriteriaBuilder().addChild(0)
            mainPage.getCriteriaBuilder().setManagedObject("", 1)
            mainPage.getCriteriaBuilder().getListItem("ManagedElement").click()
        and: 'Select "Has Child" from bottom of the tree. Click the box labeled "Managed Object" and from the dropdown menu, select "ENodeBFunction".'
            mainPage.getCriteriaBuilder().addChild(1)
            mainPage.getCriteriaBuilder().setManagedObject("", 2)
            mainPage.getCriteriaBuilder().getListItem("ENodeBFunction").click()
        and: 'Select "Has Child" from the bottom of the tree. Click the box labeled "Managed Object" and from the dropdown menu, select "EUtranCellFDD". Click the "Add Criteria" link underneath "EUtranCellFDD". Click the attribute dropdown and select "administrativeState". Click the operator dropdown and select equals. Click the value dropdown and select "LOCKED". Click "Done" and press the "Search" button.'
            mainPage.getCriteriaBuilder().addChild(2)
            mainPage.getCriteriaBuilder().setManagedObject("", 3)
            mainPage.getCriteriaBuilder().getListItem("EUtranCellFDD").click()
            mainPage.getCriteriaBuilder().clickAddCriteria(3)
            mainPage.getCriteriaBuilder().addNewCriteria("", "administrativeState","=","LOCKED")
            mainPage.getCriteriaBuilder().clickDone(3)
            mainPage.getCriteriaBuilder().clickSearch()
        then: 'A list of MeContexts, ManagedElements, ENodeBFunctions that have child EUtranCellFDD cells with an administrativeState of LOCKED are displayed in the results section below the Criteria Builder.'
            mainPage.storeCurrentResults(["MO Type","administrativeState"])
            def resultsCount = mainPage.getStoredResults().size()
            mainPage.getStoredResults().collect { result ->
                return (result["MO Type"] in ["MeContext","ManagedElement","ENodeBFunction"] && result["administrativeState"] == "-") ||
                       (result["MO Type"] in ["EUtranCellFDD"] && result["administrativeState"] == "LOCKED")
            } == (1..resultsCount).collect{ true }
        and: 'Select the "Show/Hide Object" button (the eye icon next to the drop down buttons) beside "ManagedElement".'
            mainPage.getCriteriaBuilder().hideObject(1)
        and:'Execute the search again by pressing the Search button.'
            mainPage.getCriteriaBuilder().clickSearch()
        then: 'ManagedElement objects are no longer shown in the list of results.'
            mainPage.storeCurrentResults(["MO Type","administrativeState"])
            def resultsWithoutManagedElementCount = mainPage.getStoredResults().size()
            mainPage.getStoredResults().collect { result ->
                return (result["MO Type"] in ["MeContext","ENodeBFunction"] && result["administrativeState"] == "-") ||
                        (result["MO Type"] in ["EUtranCellFDD"] && result["administrativeState"] == "LOCKED")
            } == (1..resultsWithoutManagedElementCount).collect{ true }
    }

    /*
     * Objective
     *  Perform searches using the Criteria Builder.
     * Pass/Fail Criteria
     *  The user is able to perform a search using the Criteria Builder and the results are displayed in the results table.
     * Prerequisites
     *   ERBS nodes are added and synced to the network.
     *   Network Explorer has been launched
     */
    def 'Search on Node(s) using the Network Explorer Criteria Builder'() {
        given: 'The prerequisites'
            open(mainPage)
            mainPage.waitForLoad()
        when: 'On the Network Explorer main page select the link to "Switch to Criteria Builder"'
            mainPage.switchToCriteriaBuilder()
        and: 'On the Criteria Builder page click the box labeled "NodeType"'
            mainPage.getCriteriaBuilder().clickNodeType()
        and: 'Select ERBS from the dropdown menu and press Search'
            mainPage.getCriteriaBuilder().setNodeType("ERBS")
            mainPage.getCriteriaBuilder().clickSearch()
        then: 'In the Node Name (Optional) box enter a partial name for an ERBS node with a wildcard. Press the Search button'
            mainPage.storeCurrentResults(["neType"])
            mainPage.getStoredResults().collect { result ->
                return (result["neType"] == "ERBS")
            } == (1..mainPage.getStoredResults().size()).collect{ true }
            mainPage.getCriteriaBuilder().setNodeName(testPartialNode)
            mainPage.getCriteriaBuilder().clickSearch()
        then: 'All ERBS nodes with the partial name matching the ERBS name are displayed in the results table.'
            mainPage.storeCurrentResults(["Name"])
            mainPage.getStoredResults().collect { result ->
                return (result["Name"].contains(testPartialNode.replaceAll("\\*","")))
            } == (1..mainPage.getStoredResults().size()).collect{ true }
    }

    /*
     * Objective
     *  Create a collection of objects, view the Collection contents and delete the Collection.
     * Pass/Fail Criteria
     *  The user is able to create a collection of objects for reuse, view its contents, update the contents and delete the Collection.
     * Preconditions
     *  Network Explorer has been launched from the ENM launcher.
     *  The managed object instances on the system do not change while the test is in progress.
     */
    def 'Create, View, update and Delete a Collection of Managed Objects'() {
        given: 'The prerequisites'
            clear()
            open(mainPage)
            mainPage.waitForLoad()
        when: 'On the Network Explorer main page enter the following moType in the search box: #moType'
            mainPage.executeSearch("$moType")
        then: 'A list of all objects matching your selected moType are displayed in the results table'
            mainPage.storeCurrentResults(["MO Type"])
            mainPage.getStoredResults().collect { result ->
                return (result["MO Type"] == moType)
            } == (1..mainPage.getStoredResults().size()).collect{ true }
            mainPage.storeCurrentResults(Configuration.getDefaultHeaders())
            def expectedCollectionContents = [mainPage.getStoredResults().get(0)]
        and: 'Using the tick boxes select a number of objects. Take a note of which objects and the number of objects you select'
            mainPage.getResultsTable().clickRowCheckbox(0)
        then: 'Select the "Add to a Collection" option in the action bar, select the "Add to a new Collection" radio button and give the collection the name "gat_collection". Choose public sharing permissions. Click "Add"'
            mainPage.createCollection("gat_collection")
        then: 'Select the View All link on the Collections part of the "Collections & Searches" side bar'
            mainPage.viewAllCollections()
        and: 'Click the ‘View Contents’ button in the action bar to view the Collection'
            collectionsPage.setNameFilter("gat_collection")
            collectionsPage.selectAllCollections()
        and: 'Ensure the contents of the collection are all as expected by referring to notes made when selecting objects.'
            collectionsPage.viewContents()
            assert mainPage.isACollectionLoaded()
        then: 'On the Network Explorer main page enter the following moType in the search box: #moType'
            mainPage.executeSearch("$moType")
            mainPage.storeCurrentResults(Configuration.getDefaultHeaders())
        and: 'Using the tick boxes select a different object. Take a note of which object and the number of objects you selected, if more than one.'
            expectedCollectionContents.add(mainPage.getStoredResults().get(1))
            mainPage.getResultsTable().clickRowCheckbox(1)
        and: 'Select the "Add to a Collection" option in the action bar, select the "Add to an existing Collection" radio button. Start typing "gat_collection" in the box labelled "Filter By Name", select your collection "gat_collection" and click "Add"'
            mainPage.addToExistingCollection("gat_collection")
        and: 'Again, select the View All link on the Collections part of the "Collections & Searches" side bar.'
            mainPage.viewAllCollections()
            collectionsPage.setNameFilter("gat_collection")
        and: 'Click the checkbox of your Collection'
            collectionsPage.selectAllCollections()
        and: 'Click the ‘View Contents’ button in the action bar to view the Collection'
            collectionsPage.viewContents()
            assert mainPage.isACollectionLoaded()
        and: 'Select an object in the collection "gat_collection"'
            mainPage.getResultsTable().clickRowCheckbox(1)
        and: 'Select the "Remove from this Collection" option in the action bar'
            mainPage.removeFromCollection()
            assert mainPage.isACollectionLoaded()
            expectedCollectionContents.pop()
            mainPage.storeCurrentResults(Configuration.getDefaultHeaders())
            def realCollectionContents = mainPage.getStoredResults()
            realCollectionContents.size() == expectedCollectionContents.size()
            realCollectionContents.eachWithIndex {
                result, index -> result == expectedCollectionContents[index]
            }
        and: 'Again, select the View All link on the Collections part of the "Collections & Searches" side bar'
            mainPage.viewAllCollections()
            collectionsPage.setNameFilter("gat_collection")
        and: 'Click the checkbox of your Collection'
            collectionsPage.selectAllCollections()
        then: 'Delete the Collection you created by clicking the "Delete" button in the action bar and confirming your deletion on the dialog.'
            collectionsPage.deleteSelected()
        where:
            moType      |_
            "MeContext" |_
    }

    /*
     * Objective
     *  Save a search query, re-execute the search and delete it.
     * Pass/Fail Criteria
     *  The user is able to save a search query, re-run the query and delete the Saved Search.
     * Preconditions
     *  Network Explorer has been launched.
     *  The managed object instances on the system do not change while the test is in progress.
     */
    @Unroll
    def 'Create, Execute and Delete a Saved Search'() {
        given: 'The prerequisites'
            clear()
            open(mainPage)
            mainPage.waitForLoad()
        when: 'On the Network Explorer main page enter the following moType in the search box: #moType'
            mainPage.executeSearch("$moType")
        then: 'A list of all objects matching your selected moType are displayed in the results table. Make a note of the total number of results returned.'
            mainPage.storeCurrentResults(["MO Type"])
            mainPage.getStoredResults().collect { result ->
                return (result["MO Type"] == moType)
            } == (1..mainPage.getStoredResults().size()).collect{ true }
            def resultsCount = mainPage.getCurrentResultsTotal()
        and: 'Choose "Save Search" from the action bar above. Give the search the name "gat_search_$moType" and choose public sharing permissions. Click "Save".'
            mainPage.saveSearch("gat_search_$moType", true)
            // The Saved Search appears on the left menu under "Saved Searches".
        and: 'Select the View All link on the "Saved Searches" part of the "Collections & Searches" side bar.'
            mainPage.viewAllSavedSearches()
            // Your Saved Search should be listed.
        and: 'Click the checkbox of your Saved Search.'
            savedSearchesPage.selectExactSavedSearch("gat_search_$moType")
            // Result Actions you can perform on the Saved Search show in the action bar.
        and: 'Click the “Execute Search” button in the action bar to view the Saved Search'
            savedSearchesPage.executeSearch()
            resultsCount == mainPage.getCurrentResultsTotal()
            // Result Ensure the contents of the result set are all as expected by referring to notes made in Action 1.
        and: 'Again, select the View All link on the "Saved Searches" part of the "Collections & Searches" side bar.'
            mainPage.viewAllSavedSearches()
            // Result All Saved Searches are displayed.
        and: 'Click the checkbox of your Saved Search'
            savedSearchesPage.selectExactSavedSearch("gat_search_$moType")
            // Result Actions you can perform on the Saved Search shown in the action bar
        and: 'Delete the Saved Search you created by clicking the “Delete” button in the action bar and confirming your deletion on the dialog'
            savedSearchesPage.deleteSelected()
            // Result Your Saved Search is deleted from the list.
        where:
            moType           |_
            "MeContext"      |_
            "ManagedElement" |_
            "NetworkElement" |_
    }
}
