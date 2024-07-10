import browser from "webextension-polyfill";
import {GetTabsIdByUrl} from "./utils/utils";

browser.runtime.onInstalled.addListener((details) => {


});


chrome.runtime.onMessage.addListener(async (message: string) => {
    if (message === 'onPopupMounted') {

        // const id = await GetTabsIdByUrl('https://developer.chrome.google.cn/docs/extensions?hl=zh-cn');
        // console.log(id);
        //
        // if (id) {
        //     chrome.scripting.executeScript({
        //         target: {tabId: id},
        //         func: test
        //     })
        // }
    }
    return true;
});




