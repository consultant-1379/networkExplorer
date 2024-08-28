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

import org.jboss.arquillian.graphene.page.Location
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

@Location("/#launcher/groups")
class ApplicationLauncherPage implements PageObject {

    @FindBy(css = ".eaLauncher-title")
    WebElement pageHeader

    @FindBy(xpath = "//a[@class='eaLauncher-ListItem-label' and contains(@title, 'Network Explorer')]")
    WebElement appLink
    
    void waitForLoad() {
        waitVisible(appLink)
    }
    
    void navigateToAppLandingPage() {
        appLink.click()
    }

    String getPageHeaderText() {
        waitVisible(pageHeader)
        return pageHeader.getText()
    }
}
