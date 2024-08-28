package com.ericsson.nms.testware.usat.pagemodel.fragment

import org.openqa.selenium.By
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

import static org.jboss.arquillian.graphene.Graphene.waitGui
import static org.jboss.arquillian.graphene.Graphene.waitModel

/**
 * Created by eeoicon on 02/02/2018.
 */
class CriteriaBuilder implements PageFragment {

    @FindBy(css = "button[class*='clear-link']")
    WebElement clearQuery

    @FindBy(css = "button[class*='switchToSearch-link']")
    WebElement switchToSearch

    @FindBy(css = "button[class*='bottomControls-searchBtn']")
    WebElement search

    @FindBy(css = "span[class*='wModelDrivenComboBox'] input[placeholder='Node Type']")
    WebElement nodeType

    @FindBy(css = "div[class*='wQueryItem'] input[placeholder='Node Name (Optional)']")
    WebElement nodeName

    void waitForLoad() {
        waitModel().until().element(nodeType).is().enabled()
    }

    void clearQuery() {
        clearQuery.click()
    }

    void switchToSearchBox() {
        switchToSearch.click()
    }

    void clickNodeType() {
        waitModel().until().element(nodeType).is().present()
        nodeType.click()
    }

    void setNodeType(def type) {
        waitGui().until().element(nodeType).is().present()
        waitModel().until().element(nodeType).is().enabled()
        nodeType.sendKeys(type)
    }

    void setNodeName(def name) {
        waitGui().until().element(nodeName).is().present()
        nodeName.sendKeys(name)
    }

    void addChild(index = 0) {
        waitPresent(getAddChildButton(index)).click()
    }

    void setManagedObject(value, index = 0) {
        def moc = getManagedObjectCombo(index)
        moc.click()
        moc.sendKeys(value)
    }

    void hideObject(index = 0) {
        // +1 accounts for unhideable node type box
        getHideObjectButton(index + 1).click()
    }

    void showObject(index = 0) {
        // +1 accounts for unhideable node type box
        getShowObjectButton(index + 1).click()
    }

    void clickAddCriteria(index = 0) {
        getAddCriteriaLink(index)click()
    }

    void addNewCriteria(conjunction, attribute, operator, value, index = 0) {
        if (conjunction) {
            getXpathElement("(//button[contains(@class,'-wCriteriaAttribute-addMoreLink')])[" + index + "]").click()
            getXpathElement("(//span[contains(@class,'-wCriteriaAttribute-conjunctionSelectBoxHolder')])[" + (index + 1) + "]").click()
            getListItem(conjunction).click()
        }
        getXpathElement("(//span[contains(@class,'-wCriteriaAttribute-attributeCombobox')])[" + (index + 1) + "]").click()
        getListItem(attribute).click()
        if (operator) {
            getXpathElement("(//span[contains(@class,'-wCriteriaAttribute-operatorSelectBox')])[" + (index+1) + "]").click()
            getListItem(operator).click()
            def valueWrapper = getXpathElement("(//div[contains(@class,'-wCriteriaAttribute-valueInputWrapper')])[" + (index+1) + "]")
            def textinput = valueWrapper.findElement(By.cssSelector("input[class*='-wCriteriaAttribute-valueInput']"))
            if (textinput.isDisplayed()) {
                textinput.sendKeys(value)
            } else {
                def select = valueWrapper.findElement(By.cssSelector("span[class*='-wCriteriaAttribute-valueSelectBox']"))
                select.click()
                getListItem(value).click()
            }
        }
    }

    void clickDone(index = 0) {
        waitVisible(getXpathElement("(//button[contains(@class,'wCriteria-done')])[" + (index+1) + "]")).click()
    }

    void clickSearch() {
        waitClickable(search).click()
    }

    def getHideObjectButton(index = 0) {
        def xpath = "(//span[contains(@class,'wQueryItem-shownEyeIcon')])[" + (index+1) + "]"
        return getXpathElement(xpath)
    }

    def getShowObjectButton(index = 0) {
        def xpath = "(//span[contains(@class,'wQueryItem-hiddenEyeIcon')])[" + (index+1) + "]"
        return getXpathElement(xpath)
    }

    def getAddChildButton(index = 0) {
        def xpath = "(//span[contains(@class,'wQueryItem-addChild_hasChildren')])[" + (index+1) + "]"
        return getXpathElement(xpath)
    }

    def getManagedObjectCombo(index = 0) {
        def xpath = "(//input[contains(@placeholder,'Managed Object')])[" + (index+1) + "]"
        return getXpathElement(xpath)
    }

    def getAddCriteriaLink(index = 0) {
        def xpath = "(//span[contains(@class,'wCriteria-addEditLink-text')])[" + (index+1) + "]"
        return getXpathElement(xpath)
    }

    def getListItem(text) {
        return getXpathElement("//div[contains(@class,'ebComponentList-item')][text()='" + text + "']")
    }

}
