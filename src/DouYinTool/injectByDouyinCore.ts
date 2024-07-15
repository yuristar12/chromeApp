import { TypeByDouyinCore } from "../type";

export function injectByDouyinCore() {
    const douyinCore: TypeByDouyinCore = {
        isInject: false,
        videoMap: new Map(),
        auth: null,
        sleep: async (time: number) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, time);
            })
        },
        limitParams: {
            likeTimeByMin: 5,
            likeTimeByMax: 13,
            nextVideoTimeMin: 3,
            nextVideoTimeMax: 5,
            limitByFansNum: 500,
            limitByFocusNum: 500,
            ageByMin: 20,
            ageByMax: 50,
            limitByLike:500,

        },
        getRangeByRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        judgeByLogin: async () => {
            const userInfo = window.localStorage.getItem('user_info');
            return userInfo ? true : false
        }

    }

    if (window.douyinCore?.isInject) {
        console.log('插件已经注入，无需重复注入')
        return false;

    };
    window[`douyinCore`] = douyinCore;
    return true;
}