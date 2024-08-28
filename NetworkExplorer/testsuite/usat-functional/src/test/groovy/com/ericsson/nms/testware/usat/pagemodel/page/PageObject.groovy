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

import com.ericsson.nms.testware.usat.pagemodel.fragment.Dialog
import com.ericsson.nms.testware.usat.pagemodel.trait.InteractAble
import org.jboss.arquillian.graphene.Graphene
import org.jboss.arquillian.graphene.fragment.Root
import org.openqa.selenium.By
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

import static org.jboss.arquillian.graphene.Graphene.waitModel

trait PageObject implements InteractAble {

    @Root
    WebElement root

    @FindBy(tagName = 'body')
    WebElement body

    void waitForLoad() {
        Graphene.waitModel().until().element(root).is().present()
    }

    def getDialog() {
        return Graphene.createPageFragment(Dialog.class, getElement(By.cssSelector('.ebDialog'), body))
    }

    def getElement(By by, WebElement fromRootElement = root) {
        waitModel().until().element(fromRootElement, by).is().present()
        return fromRootElement.findElement(by)
    }
}