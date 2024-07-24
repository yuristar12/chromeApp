import { InterFaceByVideoParams, TypeByAuthonParams, TypeByDouyinCore, TypeByInjectUtils } from "../type";

export function injectByXhrRequest() {
    const injectUtils: TypeByInjectUtils = {

        requestHookMapByResponse: new Map(),
        requestHookMapByRequest: new Map(),

        setup: () => {
            if (!injectUtils.isInject()) {
                injectUtils.registerRequestHookByResponse();
                injectUtils.registerRequestHookByRequest();
                injectUtils.injectByXhrRequest();
            }
        },
        isInject: () => {
            return injectUtils.getCore().isInject;
        },
        registerRequestHookByResponse: () => {
            injectUtils.requestHookMapByResponse.set('/feed/', (response: InterFaceByVideoParams) => {
                const map = injectUtils.getCore().videoMap;
                if (Array.isArray(response.aweme_list)) {
                    response.aweme_list.forEach(item => {
                        map.set(item.aweme_id, item);
                    })

                    window['douyinCore'].videoMap = map;
                }
            });
        },

        registerRequestHookByRequest: () => {
            injectUtils.requestHookMapByRequest.set('/feed/', (request: XMLHttpRequest) => {
                injectUtils.getCore().auth = (injectUtils.deParseUrlParams(request.responseURL) as TypeByAuthonParams);
            })


        },

        getCore: () => {
            return (window[`douyinCore`] as TypeByDouyinCore);
        },

        injectByXhrRequest: () => {
            // // // 保存原始的 open 和 send 方法
            const originalXHROpen = window.XMLHttpRequest.prototype.open;
            const originalXHRSend = window.XMLHttpRequest.prototype.send;

            window.XMLHttpRequest.prototype.open = function (method, url) {
                this._url = url;  // 保存请求的 URL
                return originalXHROpen.apply(this, arguments);
            };
            window.XMLHttpRequest.prototype.send = function (body) {
                this.addEventListener('load', function () {
                    const that: (XMLHttpRequest & { _url }) = this;
                    if (that.response && typeof that.response === 'string') {
                        try {
                            const parseData = JSON.parse(that.response);
                            injectUtils.requestHookMapByResponse.forEach((value: (data: any) => void, key: string) => {
                                if ((that._url as string).indexOf(key) !== -1) {
                                    value(parseData);
                                }
                            })

                            injectUtils.requestHookMapByRequest.forEach((value: (data: any) => void, key: string) => {
                                if ((that._url as string).indexOf(key) !== -1) {
                                    value(that);
                                }
                            })
                        } catch (error) {

                        }
                    }
                });
                return originalXHRSend.apply(this, arguments);
            };
            injectUtils.getCore().isInject = true;
        },



        deParseUrlParams: (url: string) => {
            const params = {};
            const queryString = url.split('?')[1];
            if (queryString) {
                const pairs = queryString.split('&');
                pairs.forEach(pair => {
                    const [key, value] = pair.split('=');
                    params[key] = value;
                });
            }
            return params;
        },

        parseUrlParams: (params: object) => {
            let url = '';
            for (const key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {
                    const value = params[key];
                    const item = `${key}=${value}&`
                    if (!url) {
                        url = `?${item}`
                    } else {
                        url = `${url}${item}`
                    }
                }
            }
            return url;
        },

        requestByGet: async (params) => {

            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                let url = params.url;
                if (params.query) {
                    url = `${url}${injectUtils.parseUrlParams(params.query)}`
                }
                // 配置请求的 URL 和方法（POST）
                xhr.open('GET', url, true);

                // 设置请求头，指定发送的数据类型为 JSON
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

                // 设置响应类型为 JSON
                xhr.responseType = 'json';


                // 定义请求完成时的回调函数
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // // 请求成功，处理响应数据
                        resolve(xhr.response);
                    } else {
                        // 请求失败，处理错误
                        reject('获取失败');
                    }
                };


                xhr.send();

            })



        },

        requestByPost: async (params) => {


            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                let url = params.url;
                if (params.query) {
                    url = `${url}${injectUtils.parseUrlParams(params.query)}`
                }
                // 配置请求的 URL 和方法（POST）
                xhr.open('POST', url, true);

                // 设置请求头，指定发送的数据类型为 JSON
                if (!params.isFormData) {
                    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                }


                // 设置响应类型为 JSON
                xhr.responseType = 'json';


                // 定义请求完成时的回调函数
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // // 请求成功，处理响应数据
                        resolve(xhr.response);
                    } else {
                        // 请求失败，处理错误
                        reject('请求失败');
                    }
                };

                if (params.data) {
                    if (!params.isFormData) {
                        xhr.send(JSON.stringify(params.data));
                    } else {
                        xhr.send(params.data);
                    }

                } else {
                    xhr.send();
                }



            })

        }




    }
    injectUtils.setup();

    window[`injectUtils`] = injectUtils;
    return true;



}
