package com.ericsson.nms.testware.usat.fixtures

import io.restassured.response.Response

/**
 * Fixture containing the required utilities to work with MOs.
 */
class PersistentObjectService {

    final static String REST_URI_GET_OBJECT = "/persistentObject/{id}?includeNonPersistent=false"
    final static String REST_URI_PUT_OBJECT = "/persistentObject/{id}"

    @Delegate
    RestAssuredFixture restAssuredFixture = new RestAssuredFixture()

    /**
     * Given an MO's poid, get attributes of the MO
     * @param poid
     * @param user
     * @return a RestAssured response instance
     */
    Response getObject(String poid, String user="administrator") {
        def response = defaultRequest(user)
                .post(REST_URI_GET_OBJECT.replace('{id}',poid))
        response.then().log().ifError()
        return response
    }

    /**
     * Given an MO's poid, set attributes of the MO
     * @param poid
     * @param body
     * @param user
     * @return a RestAssured response instance
     */
    Response setObjectAttributes(String poid, String body, String user="administrator") {
        def response = defaultRequest(user)
                .body(body)
                .put(REST_URI_PUT_OBJECT.replace('{id}',poid))
        response.then().log().ifError()
        return response
    }
}
