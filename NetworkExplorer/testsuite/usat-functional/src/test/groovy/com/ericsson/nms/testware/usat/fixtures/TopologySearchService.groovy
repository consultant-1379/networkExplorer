package com.ericsson.nms.testware.usat.fixtures

import io.restassured.response.Response

/**
 * Fixture containing the required utilities to perform search requests on MOs.
 */
class TopologySearchService {

    final static String REST_URI_SEARCH_NETEX = "/managedObjects/search/v2"

    @Delegate
    RestAssuredFixture restAssuredFixture = new RestAssuredFixture()

    /**
     * Execute a search query
     * @param query
     * @param user
     * @return a RestAssured response instance
     */
    Response search(query, user = "administrator") {
        def response = defaultRequest(user)
                .header("X-Tor-Application","networkexplorer")
                .queryParam('query',query)
                .queryParam('orderby','moName')
                .queryParam('orderdirection','asc')
                .get(REST_URI_SEARCH_NETEX)
        response.then().log().ifError()
        return response
    }

    /**
     * Extract a list of poids from a successful search query response
     * @param response
     * @return
     */
    List<String> getObjects(response) {
        if (response.statusCode == 200) {
            return response.getBody().jsonPath().get("objects.id") as List
        } else {
            throw new RuntimeException("[TopologySearchService] Error executing request: " + response.statusCode)
        }
    }

}
