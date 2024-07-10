import browser from "webextension-polyfill";
import {GetTabsIdByUrl} from "./utils/utils";

browser.runtime.onInstalled.addListener((details) => {


});


chrome.runtime.onMessage.addListener(async (message: string) => {

    console.log(message);

    if (message === 'onPopupMounted') {

        const id = await GetTabsIdByUrl('https://developer.chrome.google.cn/docs/extensions?hl=zh-cn');
        console.log(id);

        if (id) {
            chrome.scripting.executeScript({
                target: {tabId: id},
                func: test
            })
        }
    }
    return true;

});

function test() {
    const div = document.querySelector("body > section > devsite-header > div > div.devsite-top-logo-row-wrapper-wrapper > div > div > devsite-appearance-selector").shadowRoot.querySelector("button");
    if (div) {
        div.click();
    }
}


