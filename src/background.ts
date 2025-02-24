import browser from "webextension-polyfill";
import { GetRangeByRandom, GetTabsIdByUrl, Sleep } from "./utils/utils";
import {
    TypeByHandleLimitParams, TypeByHandleStatus, TypeByHandlingStatus,
} from "./type";
import { injectByDouyinCore } from "./DouYinTool/injectByDouyinCore";
import { injectByXhrRequest } from "./DouYinTool/injectByXhrRequest";
import { injectByAutoHandle } from "./DouYinTool/injectByAutoHandle";
import { syncMainPageLimitParams } from "./DouYinTool/syncMainPageLimitParams";

browser.runtime.onInstalled.addListener((details) => {


});


let limitParams: TypeByHandleLimitParams = {
    likeTimeByMin: 5,
    likeTimeByMax: 13,
    nextVideoTimeMin: 3,
    nextVideoTimeMax: 5,
    limitByFansNum: 500,
    limitByFocusNum: 500,
    ageByMin: 20,
    ageByMax: 50,
    limitByLike: 50,
    limitByWaiteTime: 3
}


const handlingStatus: TypeByHandlingStatus = {
    ing: false, ingStatusList: [], isInit: false, executeNum: 1000,
}


/**
 * 开始执行脚本
 */
async function beforeStartHandle(callback: (params: TypeByHandleStatus) => void) {
    handlingStatus.ing = true;
    // 检查是否登录
    const result: TypeByHandleStatus = {
        status: false, message: ''
    }

    return new Promise(async (resolve) => {
        if (handlingStatus.executeNum <= 0) {
            result.status = false;
            result.message = '请设置执行次数！';
            resolve(result);
        }

        const id = await GetTabsIdByUrl('https://www.douyin.com');
        if (id) {
            chrome.scripting.executeScript({
                target: { tabId: id }, func: async () => {
                    const resultByLogin = await window.douyinCore.judgeByLogin();
                    if (!resultByLogin) {

                        return {
                            status: false, message: '未登录抖音账号，请登录后使用！'
                        }
                    } else {
                        return {
                            status: true, message: '已登录开始执行脚本'
                        }
                    }
                }, world: "MAIN"
            }).then((res) => {
                if (Array.isArray(res)) {
                    const result: TypeByHandleStatus = res[0].result;
                    if (!result.status) {
                        callback(result);
                    } else {
                        callback({ status: true, message: '脚本开始执行！' })
                        startHandle();
                    }
                }
            })
        } else {
            result.status = false;
            result.message = '未找到抖音页面！'
            callback(result);
            resolve(result);
        }
    });

}


/**
 * 开始脚本
 */
async function startHandle() {
    while (handlingStatus.ing) {
        const res = await startHandleItem();
        handlingStatus.ingStatusList.push(res);
        let nextTime = 0;
        if ((res.message).indexOf('广告') !== -1) {
            nextTime = 1000;
        } else if ((res.message).indexOf('未获取') !== -1) {
            nextTime = 1000;
        }
        else {
            if (res.userInfo) {
                chrome.runtime.sendMessage({ key: 'onExecutedItem', value: res });
            }
            nextTime = GetRangeByRandom((limitParams as TypeByHandleLimitParams).nextVideoTimeMin, (limitParams as TypeByHandleLimitParams).nextVideoTimeMax) * 1000;
        }
        if (handlingStatus.ing) {
            await Sleep(nextTime);
        }
        handlingStatus.executeNum -= 1;
        if (handlingStatus.executeNum <= 0) {




            onExecuted();
        }

    }
}









async function onExecuted() {
    handlingStatus.ing = false;
    chrome.runtime.sendMessage({ key: 'onExecuted', value: handlingStatus });
    const id = await GetTabsIdByUrl('https://www.douyin.com');
    chrome.scripting.executeScript({
        target: { tabId: id }, func: async () => {
            window.douyinCore.reload();
            handlingStatus.executeNum = 99;
            return true;
        }, world: "MAIN"
    }).then(res => {
        chrome.notifications.create({
            title: '魅熙抖音插件',
            message: '已完成上次任务设置的次数，已刷新页面！',
            iconUrl: 'https://test-technology.oss-cn-hangzhou.aliyuncs.com/Web/system/20240715/image/bdb0c9b0c30dce2e399b52055b9e197e.png',
            type: 'basic'
        });
    })
}


async function startHandleItem(): Promise<TypeByHandleStatus> {

    return new Promise(async (resolve) => {

        const id = await GetTabsIdByUrl('https://www.douyin.com');
        if (id) {
            chrome.scripting.executeScript({
                target: { tabId: id }, func: async () => {
                    const res = await window.douyinHandle.startAuto();
                    console.log(res);
                    return res;
                }, world: "MAIN"
            }).then(res => {
                console.log(res);
                if (Array.isArray(res)) {
                    resolve(res[0].result);
                }
                resolve({ status: false, message: '未知问题' });
            })
        }
    })

}


/**
 *  当插件界面唤起时
 */
const onPopupMounted = async () => {
    const id = await GetTabsIdByUrl('https://www.douyin.com');
    if (id) {
        chrome.scripting.executeScript({
            target: { tabId: id }, func: injectByDouyinCore, world: "MAIN"
        }).then((res) => {

            if (Array.isArray(res)) {
                if (res[0].result) {
                    console.log('注入成功核心成功！');
                    chrome.scripting.executeScript({
                        target: { tabId: id }, func: injectByXhrRequest, world: "MAIN"
                    }).then(() => {
                        console.log('注入xhr成功！');
                        chrome.scripting.executeScript({
                            target: { tabId: id }, func: injectByAutoHandle, world: "MAIN"
                        }).then(res => {
                            handlingStatus.isInit = true;
                        })
                    })
                }
            }

        })
    }
}


const initStorage = async (callback: (params: any) => void) => {
    const _limitParams = await chrome.storage.local.get('limitParams');
    if (_limitParams.limitParams) {

        for (const key in _limitParams.limitParams) {
            if (Object.prototype.hasOwnProperty.call(_limitParams.limitParams, key)) {
                const value = _limitParams.limitParams[key];

                if (Object.prototype.hasOwnProperty.call(limitParams, key)) {
                    limitParams[`${key}`] = value;
                }
            }
        }
    }
    await syncStorage(limitParams as TypeByHandleLimitParams, callback)
}


const syncStorage = async (params: TypeByHandleLimitParams, callback: (params: any) => void) => {
    return new Promise(async (resolve) => {
        limitParams = params;
        await chrome.storage.local.set({
            "limitParams": limitParams
        });
        callback({
            isInit: false, value: {
                limitParams: limitParams,
                handlingStatus: handlingStatus,
            }
        });
        const id = await GetTabsIdByUrl('https://www.douyin.com');
        if (id) {
            chrome.scripting.executeScript({
                target: { tabId: id }, args: [limitParams], world: "MAIN", func: syncMainPageLimitParams
            }).then(() => {
                resolve(true);
            })
        }
    })
}


const syncHandleStatusByMain = (params: TypeByHandlingStatus) => {
    Object.assign(handlingStatus, params);
}


const syncHandleStatusByRender = (callback: (value: { isInit: boolean, value: TypeByHandlingStatus }) => void) => {
    callback({ isInit: true, value: handlingStatus });
}


chrome.runtime.onMessage.addListener((message: { key: string, value: any }, sender, sendResponse) => {
    switch (message.key) {
        case 'onPopupMounted':
            initStorage(sendResponse);
            if (!handlingStatus.isInit) {
                onPopupMounted();
            }
            break;
        case 'onSyncStorage':
            handlingStatus.ing = false;
            syncStorage(message.value.limitParams, sendResponse);
            Object.assign(handlingStatus, handlingStatus);
            break;
        case 'onStartAutoHandle':
            beforeStartHandle(sendResponse);
            break;
        case 'onPauseScript':
            syncHandleStatusByMain(message.value);
            break;
        default:
            break;
    }
    return true;
});




