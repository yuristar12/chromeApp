import { AwemeList, TypeByDouyinCore, TypeByDouyinHandle, TypeByHandleStatus, TypeByInjectUtils, TypeByUserInfo, TypeByUserVideoList } from "../type";

export async function injectByAutoHandle() {


    const douyinHandle: TypeByDouyinHandle = {
        startAuto: () => {
            const { limitByWaiteTime } = douyinHandle.getCore().limitParams;
            return new Promise(async (resolve, reject) => {

                const loginInfo = await window.douyinCore.judgeByLogin();
                let result: TypeByHandleStatus = { status: false, message: '', douyinAccount: loginInfo.nickname };
                if (!douyinHandle.isInject) {
                    result.status = false;
                    result.message = '插件代码注入失败'
                    resolve(result)
                }
                douyinHandle.getNextVideoButton().click();
                setTimeout(async () => {
                    const wrap = douyinHandle.getActiveVideo();
                    if (wrap) {
                        const videoId = douyinHandle.getActivityId(wrap);
                        const videoInfo = douyinHandle.getVideoMap().get(videoId);
                        if (videoInfo) {
                            // 判断广告视频
                            if (videoInfo.is_ads) {
                                result.status = false;
                                result.message = '广告视频'
                                resolve(result);
                            }

                            // todo
                            // if (videoInfo.user_digged === 1) {
                            //     result.status = false;
                            //     result.message = '视频已点赞'
                            //     resolve(result);
                            // }

                            result = await douyinHandle.judgeByPublicUserInfo(videoInfo);
                        } else {
                            result.status = false;
                            result.message = '未获取到视频数据'
                            resolve(result);
                        }

                    } else {
                        result.status = false;
                        result.message = '直播视频'
                        resolve(result);
                    }
                    resolve(result);
                }, limitByWaiteTime * 1000);

            })

        },

        getActivityId: (wrap: Element) => {
            return wrap.getAttribute('data-e2e-vid');
        },


        isInject: () => {
            return douyinHandle.getCore().isInject;
        },

        getInjectUtils: () => {
            return (window[`injectUtils`] as TypeByInjectUtils);
        }, getCore: () => {
            return (window[`douyinCore`] as TypeByDouyinCore);
        }, // 获取上一个视频按钮
        getPreVideoButton: () => {
            return document.querySelector(".xgplayer-icon div[data-e2e='video-switch-prev-arrow']");
        }, // 获取下一个视频按钮
        getNextVideoButton: () => {
            return document.querySelector(".xgplayer-icon div[data-e2e='video-switch-next-arrow']");
        }, // 获取 activityvideo 容器
        getActiveVideo: () => {
            const nodeList = document.querySelectorAll("#slidelist div[data-e2e='feed-active-video']");
            if (nodeList.length > 0) {
                return nodeList[0];
            }
            return null;
        }, getVideoMap: () => {
            return douyinHandle.getCore().videoMap;
        },

        getFollowButton: () => {

            const videoWrap = douyinHandle.getActiveVideo();

            if (videoWrap) {
                try {
                    const followButton = videoWrap.querySelectorAll("div[data-e2e='feed-follow-icon']")[0].childNodes[0].childNodes[0] as (Element & { click: () => void });
                    return followButton;
                } catch (error) {
                    return null;
                }
            }

            return null;
        },

        // 视频发布者详情
        getByUserInfo: async (videoInfo: AwemeList): Promise<TypeByUserInfo | null> => {
            try {
                const res = await douyinHandle.getInjectUtils().requestByGet({
                    url: 'https://www.douyin.com/aweme/v1/web/user/profile/other/', query: {
                        ...douyinHandle.getCore().auth,
                        publish_video_strategy_type: 2,
                        source: "channel_pc_web",
                        sec_user_id: videoInfo.author.sec_uid,
                        personal_center_strategy: 1,
                    }
                })
                return res as TypeByUserInfo;
            } catch (error) {
                return null;
            }
        },

        getByUserVideoList: async (videoInfo: AwemeList): Promise<TypeByUserVideoList | null> => {

            try {
                const res = await douyinHandle.getInjectUtils().requestByGet({
                    url: 'https://www.douyin.com/aweme/v1/web/aweme/post/', query: {
                        ...douyinHandle.getCore().auth,
                        publish_video_strategy_type: 2,
                        source: "channel_pc_web",
                        max_cursor: 0,
                        locate_item_id: videoInfo.aweme_id,
                        locate_query: false,
                        show_live_replay_strategy: 1,
                        need_time_list: 1,
                        time_list_query: 0,
                        whale_cut_token: '',
                        cut_version: 1,
                        count: 18,
                        sec_user_id: videoInfo.author.sec_uid,
                        personal_center_strategy: 1,
                    }
                })
                return res as TypeByUserVideoList
            } catch (error) {
                return null;
            }

        },


        getLastVideoTime: async (videoInfo: AwemeList) => {
            try {
                const params = await douyinHandle.getByUserVideoList(videoInfo);
                const list = params.aweme_list;
                const flag = list.findLastIndex(item => {
                    return item.is_top === 1;
                })

                if (flag > -1) {
                    if (flag + 1 === list.length) {
                        return list[flag].create_time;
                    } else {
                        return list[flag + 1].create_time;
                    }

                } else {
                    console.log('最后发布视频时间：', list[0].create_time)
                    return list[0].create_time;
                }
            } catch (error) {
                return null;
            }
        },

        postByFlower: async (userInfo: TypeByUserInfo) => {
            // try {
            //     const formData = new FormData();
            //     formData.append('type', "1");
            //     formData.append('user_id', userInfo.user.uid);
            //     const res = await douyinHandle.getInjectUtils().requestByPost({
            //         query: {
            //             ...douyinHandle.getCore().auth,
            //         }, url: 'https://www.douyin.com/aweme/v1/web/commit/follow/user/', data: formData, isFormData: true,

            //     })
            //     return res;
            // } catch (error) {
            //     return null;
            // }
            const loginInfo = await douyinHandle.getCore().judgeByLogin();
            let result: TypeByHandleStatus = { status: false, message: '', douyinAccount: loginInfo.nickname };
            const button = douyinHandle.getFollowButton();
            if (button) {
                // todo
                // button.click();
                // const limitParams = douyinHandle.getCore().limitParams;
                // const sleepTime = (douyinHandle.getCore().getRangeByRandom(limitParams.likeTimeByMin, limitParams.likeTimeByMax) * 1000)
                // await douyinHandle.getCore().sleep(sleepTime);
                // return `success:${userInfo.user.nickname}:关注成功！`
                // result.status = true;
                // result.message = `success:${userInfo.user.nickname}:关注成功！`;
                return result;

            } else {
                result.status = false;
                result.message = `获取关注按钮失败`;
                return result;
            }

        },

        judgeByVideoLikeNum: (videoInfo: AwemeList) => {
            // todo
            // const limitParams = douyinHandle.getCore().limitParams;
            // const { limitByLike } = limitParams;
            // if (limitByLike === 0) {
            //     console.log('忽略视频点赞数量');
            //     return true;
            // }
            // return videoInfo.statistics.digg_count <= limitByLike;
            return true

        },


        hasJudgeByFollowerAndFollowing: (userInfo: TypeByUserInfo) => {
            // todo
            // const limitParams = douyinHandle.getCore().limitParams;
            // const { limitByFansNum, limitByFocusNum } = limitParams;
            // const { following_count, follower_count } = userInfo.user;
            // console.log('用户关注数：', following_count);
            // console.log('用户粉丝数：', follower_count);
            // console.log('过滤粉丝数：', limitByFansNum);
            // console.log('过滤关注数：', limitByFocusNum);
            // if (limitByFansNum === 0 && limitByFocusNum > 0) {
            //     return following_count <= limitByFocusNum;
            // } else if (limitByFocusNum === 0 && limitByFansNum > 0) {
            //     return follower_count <= limitByFansNum;
            // } else if (limitByFansNum === 0 && limitByFocusNum === 0) {
            //     console.log('已忽略关注数与被关注数！')
            //     return true;
            // } else {
            //     return follower_count <= limitByFansNum && following_count <= limitByFocusNum;
            // }

            return true
        },

        hasJudgeByAge: (userInfo: TypeByUserInfo) => {
            const limitParams = douyinHandle.getCore().limitParams;
            const { ageByMax, ageByMin } = limitParams;
            const { user_age } = userInfo.user;
            console.log('用户年龄:', user_age);
            console.log('过滤最小年龄:', ageByMin);
            console.log('过滤最大年龄:', ageByMax);
            if ((ageByMin === 0 && ageByMax === 0)) {
                console.log('已忽略年龄！')
                return true;
            } else {
                if (!user_age) {
                    return false;
                }

                if (user_age >= ageByMin && user_age <= ageByMax) {
                    return true;
                }
            }
            return false;
            // return true;

        },

        judgeByPublicUserInfo: async (videoInfo: AwemeList) => {


            const loginInfo = await window.douyinCore.judgeByLogin();
            let result: TypeByHandleStatus = {
                status: false,
                message: '',
                userInfo: null,
                douyinAccount: loginInfo.nickname
            };
            try {
                const userInfo = await douyinHandle.getByUserInfo(videoInfo);
                // todo
                // if (userInfo.user.follow_status === 1) {
                //     result.status = false;
                //     result.message = '已关注用户无需关注'
                //     return result;
                // }
                // 判断性别
                if (userInfo.user.gender === 2) {
                    userInfo.user.source_video_id = videoInfo.aweme_id;
                    userInfo.user.source_video_time = videoInfo.create_time
                    // todo
                    // // 判断关注与被关注数量
                    // const limitParams = douyinHandle.getCore().limitParams;
                    // if (!douyinHandle.hasJudgeByFollowerAndFollowing(userInfo)) {
                    //     result.status = false;
                    //     result.message = '关注数与被关注数不满足条件'
                    //     return result;
                    // }
                    if (!douyinHandle.hasJudgeByAge(userInfo)) {
                        result.status = false;
                        result.message = '年龄不满足要求或者年龄不存在'
                        return result;
                    }
                    userInfo.user.last_activity_time = await douyinHandle.getLastVideoTime(videoInfo);
                    console.log("最后发布时间：", userInfo.user.last_activity_time)
                    result.userInfo = userInfo;

                    // const flagByLike = douyinHandle.judgeByVideoLikeNum(videoInfo);
                    // if (flagByLike) {
                    //     result = await douyinHandle.postByLike(videoInfo);
                    // } else {
                    //     result.status = false;
                    //     result.message = '视频点赞数量不符合要求'
                    //     return result;
                    // }
                    // const sleepTime = (douyinHandle.getCore().getRangeByRandom(limitParams.likeTimeByMin, limitParams.likeTimeByMax) * 1000)
                    // console.log('等待关注间隔', sleepTime);
                    // await douyinHandle.getCore().sleep(sleepTime);
                    // result = {
                    //     ...await douyinHandle.postByFlower(userInfo),
                    //     ...result
                    // };

                } else {
                    result.status = false;
                    result.message = '不明性别或男性'

                }

            } catch (error) {
                result.status = false;
                result.message = '发布者信息接口获取失败'
            }
            return result;

        }, postByLike: async (videoInfo: AwemeList) => {
            let result = {
                status: false,
                message: ''
            }
            // try {
            //     const limitParams = douyinHandle.getCore().limitParams;
            //     const formData = new FormData();
            //     formData.append('aweme_id', videoInfo.aweme_id);
            //     formData.append('item_type', "0");
            //     formData.append('type', "1");
            //     await douyinHandle.getInjectUtils().requestByPost({
            //         query: {
            //             ...douyinHandle.getCore().auth
            //         }, url: 'https://www.douyin.com/aweme/v1/web/commit/item/digg/', isFormData: true, data: formData,
            //     })

            // } catch (error) {
            //     message = 'error:点赞视频失败'
            // }

            const button = douyinHandle.getDiggButton();
            if (button) {
                // todo
                // button.click();
                // result.message = '点赞成功'
            } else {
                result.message = '获取点赞按钮失败'
            }
            console.log(result);
            return result;
        },
        getDiggButton: () => {
            const videoWrap = douyinHandle.getActiveVideo();
            if (videoWrap) {
                try {
                    const button = videoWrap.querySelectorAll("div[data-e2e='video-player-digg']")[0].childNodes[0] as (Element & { click: () => void });
                    return button;
                } catch (error) {
                    return null;
                }


            }

            return null;

        }
    }
    window[`douyinHandle`] = douyinHandle;
    return true;

}


