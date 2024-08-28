package com.ericsson.nms.testware.usat.spec.stkpi

import com.ericsson.nms.testware.usat.pagemodel.page.MainPage
import com.ericsson.nms.testware.usat.spec.BaseSpecification
import org.jboss.arquillian.graphene.page.Page
import org.jboss.arquillian.spock.ArquillianSputnik
import org.junit.runner.RunWith

@RunWith(ArquillianSputnik)
class SearchForLockedCells extends BaseSpecification {

    @Page
    MainPage mainPage

    def 'Measure a search query time: #context'() {
        given: 'open the Network Explorer search page'
            open(mainPage)
        when: 'we execute the LOCKED cells query'
            mainPage.executeSearch(query)
        then: 'record approximately how long it took to return'
            def startTime = System.nanoTime()
            def results = mainPage.getResultsRegion()
            results.waitVisible(results.getTable().getHeaderCheckbox())
            def endTime = System.nanoTime()
        and: 'check that it was less than 5 seconds'
            def timeTakenInSeconds = ( (endTime - startTime) / 1000000000 )
            timeTakenInSeconds <= seconds
        where:
            query                                                     | context                                    | seconds
            "select EUtranCellFDD with attr administrativeState"      | "Simple functional test"                   | 5
          //"select EUtranCellFDD where administrativeState = LOCKED" | "KPI test when no. of locked cells = 1000" | 5
    }
}