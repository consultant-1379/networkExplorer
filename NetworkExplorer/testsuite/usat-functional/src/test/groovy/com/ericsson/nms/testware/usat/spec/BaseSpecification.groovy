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

package com.ericsson.nms.testware.usat.spec

import com.ericsson.nms.testware.usat.pagemodel.trait.InteractAble
import org.jboss.arquillian.drone.api.annotation.Drone
import org.jboss.arquillian.test.api.ArquillianResource
import org.junit.runner.RunWith
import org.openqa.selenium.Dimension
import org.openqa.selenium.JavascriptExecutor
import org.openqa.selenium.WebDriver
import org.spockframework.runtime.Sputnik
import spock.lang.Specification

@RunWith(Sputnik.class)
class BaseSpecification extends Specification {

    @Drone
    private WebDriver browser

    @ArquillianResource
    private URL url

    def open(InteractAble pageObject) {
        browser.get(url.toString())
        browser.manage().window().setSize(new Dimension(1600,900))
        pageObject.waitForLoad()
    }

    void openUrl(String newUrl) {
        browser.get(url.toString() + newUrl)
    }

    WebDriver getBrowser() {
        return browser
    }

    URL getUrl() {
        return url
    }

    JavascriptExecutor getJavascriptExecutor() {
        return (JavascriptExecutor) browser
    }

    void scrollToBottom() {
        getJavascriptExecutor().executeScript(
                "window.scrollTo(0, document.body.scrollHeight)")
    }

    String getBrowserWindowSize() {
        return browser.manage().window().size
    }
}
