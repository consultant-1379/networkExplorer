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

import com.ericsson.nms.testware.usat.pagemodel.trait.InteractAble
import org.jboss.arquillian.graphene.fragment.Root
import org.openqa.selenium.By
import org.openqa.selenium.WebElement

import static org.jboss.arquillian.graphene.Graphene.waitModel

trait PageFragment implements InteractAble {

    @Root
    WebElement root

    def getCssElement(cssSelector, WebElement fromElement = root) {
        waitModel().until().element(fromElement, By.cssSelector(cssSelector)).is().present()
        return fromElement.findElement(By.cssSelector(cssSelector))
    }

    def getXpathElement(xpath, WebElement fromElement = root) {
        waitModel().until().element(fromElement, By.xpath(xpath)).is().present()
        return fromElement.findElement(By.xpath(xpath))
    }

    void click(PageFragment fragment = this) {
        waitClickable(fragment.getRoot()).click()
    }
}