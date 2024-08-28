package com.ericsson.nms.testware.usat.fixtures

import io.restassured.http.ContentType
import io.restassured.http.Header
import io.restassured.specification.RequestSpecification

import static io.restassured.RestAssured.given
/**
 * Fixture containing utilities to iteract with RestAssured
 */
class RestAssuredFixture {

    RequestSpecification defaultRequest(String userName, boolean logAll) {

        def request = given()
                .accept(ContentType.JSON)
                .contentType(ContentType.JSON)

        if (userName) {
            request.header(new Header("X-Tor-UserId", userName))
        }

        if (logAll) {
            request.log().all()
        } else {
            request.log().ifValidationFails()
        }

        return request
    }

    RequestSpecification defaultRequest(String userName) {
        return defaultRequest(userName, true)
    }

}
