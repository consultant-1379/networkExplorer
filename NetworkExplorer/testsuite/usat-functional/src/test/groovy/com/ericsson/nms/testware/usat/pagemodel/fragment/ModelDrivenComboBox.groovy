package com.ericsson.nms.testware.usat.pagemodel.fragment

import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

import static org.jboss.arquillian.graphene.Graphene.waitGui

/**
 * Created by eeoicon on 02/02/2018.
 */
class ModelDrivenComboBox implements PageFragment {

    @FindBy(css = "input[class*='-wQueryItem-valueInput']")
    WebElement textBox

    @FindBy(css = ".ebCombobox-helper")
    WebElement dropdownButton

    @Override
    void waitForLoad() {}

    void clickValueField() {
        waitGui().until().element(textBox).is().present()
        textBox.click()
    }

    void enterText(def text) {
        textBox.sendKeys(text)
    }

    void openDropdown() {
        dropdownButton.click()
    }

}
