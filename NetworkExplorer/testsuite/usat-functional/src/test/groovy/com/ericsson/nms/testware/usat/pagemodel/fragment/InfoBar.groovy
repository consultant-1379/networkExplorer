package com.ericsson.nms.testware.usat.pagemodel.fragment

import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy

/**
 * Created by eeoicon on 06/12/2017.
 */
class InfoBar implements PageFragment {

    @FindBy(css = ".eaNetworkExplorer-rInfoBar-infoName")
    WebElement infoName

    @FindBy(css = ".eaNetworkExplorer-rInfoBar-closeCollection")
    WebElement collectionCloseButton

    @FindBy(css = ".eaNetworkExplorer-rInfoBar-favoriteIcon")
    WebElement favoriteIcon

    @FindBy(css = ".eaNetworkExplorer-rInfoBar-favoriteIcon_favorited")
    WebElement goldStar

    @Override
    void waitForLoad() {
        waitPresent(infoName)
    }

    boolean isCollection() {
        try {
            waitPresent(collectionCloseButton)
            return collectionCloseButton.isEnabled()
        } catch (Exception e) {
            return false
        }
    }

    void closeCollection() {
        waitClickable(collectionCloseButton).click()
    }

    boolean isFavorite() {
        try {
            waitPresent(goldStar)
            return true
        } catch (Exception e) {
            return false
        }
    }

    void clickFavoriteIcon() {
        waitClickable(favoriteIcon).click()
    }
}
