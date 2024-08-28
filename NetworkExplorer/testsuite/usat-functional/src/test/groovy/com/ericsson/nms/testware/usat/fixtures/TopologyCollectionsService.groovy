package com.ericsson.nms.testware.usat.fixtures

import groovy.json.JsonBuilder
import io.restassured.response.Response

/**
 * Fixture containing the required utilities to perform search requests on MOs.
 */
class TopologyCollectionsService {

    final static String REST_URI_OBJECT_CONFIGURATION_V1 = "/object-configuration/v1"
    final static String REST_URI_OBJECT_CONFIGURATION_V2 = "/object-configuration/collections/v2"
    final static String REST_URI_SAVED_SEARCHES = "/topologyCollections/savedSearches"

    @Delegate
    RestAssuredFixture restAssuredFixture = new RestAssuredFixture()

    // Collections

    /**
     * Get collections
     * @param category
     * @param user
     * @return a RestAssured response instance
     */
    Response getCollections(category = null, user = "administrator") {
        def response = defaultRequest(user)
                .header("X-Tor-Application","networkexplorer")
                .queryParam('category', category)
                .get("$REST_URI_OBJECT_CONFIGURATION_V1/collections")
        response.then().log().ifError()
        return response
    }

    /**
     * Create a collection TODO - UNTESTED
     * @param name
     * @param category
     * @param idList
     * @param user
     * @return a RestAssured response instance
     */
    Response createCollection(name = null, category = null, idList = null, user = "administrator") {
        def data = [
            name: name,
            category: category
        ]
        if (idList != null) {
            data.objects = idList.collect {[id: it]}
        }
        def builder = new JsonBuilder(data)
        def response = defaultRequest(user)
                .header("X-Tor-Application","networkexplorer")
                .body(builder.toString())
                .post("$REST_URI_OBJECT_CONFIGURATION_V1/collections")
        response.then().log().ifError()
        return response
    }

    /**
     * Delete a collection
     * @param poid
     * @param user
     * @return a RestAssured response instance
     */
    Response deleteCollection(poid = null, user = "administrator") {
        def response = defaultRequest(user)
                .header("X-Tor-Application","networkexplorer")
                .delete("$REST_URI_OBJECT_CONFIGURATION_V1/collections/$poid")
        response.then().log().ifError()
        return response
    }

    static List<String> getCollectionsIds(response) {
        return getObjects(response, 'collections.id')
    }

    // Saved Searches

    /**
     * Get saved searches
     * @param poid
     * @param user
     * @return a RestAssured response instance
     */
    Response getSavedSearches(category = null, user = "administrator") {
        def response = defaultRequest(user)
                .header("X-Tor-Application","networkexplorer")
                .queryParam('category',category)
                .get(REST_URI_SAVED_SEARCHES)
        response.then().log().ifError()
        return response
    }

    /**
     * Delete a saved search
     * @param poid
     * @param user
     * @return a RestAssured response instance
     */
    Response deleteSavedSearch(poid = null, user = "administrator") {
        def response = defaultRequest(user)
                .header("X-Tor-Application","networkexplorer")
                .delete("$REST_URI_SAVED_SEARCHES/$poid")
        response.then().log().ifError()
        return response
    }

    static List<String> getSavedSearchesIds(response) {
        return getObjects(response, 'poId')
    }

    // Common

    /**
     * Extract a list of poids from a response
     * @param response
     * @return
     */
    static List<String> getObjects(response, jsonPath) {
        if (response.statusCode == 200) {
            return response.getBody().jsonPath().get(jsonPath) as List
        } else {
            throw new RuntimeException("[TopologyCollectionsService] Error parsing content with response code $response.statusCode")
        }
    }

}
