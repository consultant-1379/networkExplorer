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

package com.ericsson.nms.testware.usat.pagemodel.fragment

import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

import static org.jboss.arquillian.graphene.Graphene.waitAjax
import static org.jboss.arquillian.graphene.Graphene.waitModel

class Flyout implements PageFragment  {

    @FindBy(css = ".eaFlyout")
    WebElement flyout

    @Override
    void waitForLoad() {
        waitAjax().until().element(flyout).is().present()
    }

    void waitForUnload() {
        waitModel().until().element(flyout).is().not().present()
    }
}