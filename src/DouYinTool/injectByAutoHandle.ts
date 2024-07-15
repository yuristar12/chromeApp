import { AwemeList, TypeByDouyinCore, TypeByDouyinHandle, TypeByInjectUtils, TypeByUserInfo } from "../type";

export async function injectByAutoHandle() {


    const douyinHandle: TypeByDouyinHandle = {
        startAuto: () => {
            return new Promise(async (resolve, reject) => {

                let message = '';
                if (!douyinHandle.isInject) {
                    message = 'error:插件代码注入失败'
                    resolve(message)
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
                                message = 'error:广告视频'
                                resolve(message);
                            }

                            if (videoInfo.user_digged === 1) {
                                message = 'error:视频已点赞'
                                resolve(message);
                            }

                            message = await douyinHandle.judgeByPublicUserInfo(videoInfo);
                        } else {
                            message = 'error:未获取到视频数据';
                            resolve(message);
                        }

                    } else {
                        message = 'error:直播视频';
                        resolve(message);
                    }
                    resolve(message);
                }, 2000);

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
            const button = douyinHandle.getFollowButton();
            if (button) {
                button.click();
                const limitParams = douyinHandle.getCore().limitParams;
                const sleepTime = (douyinHandle.getCore().getRangeByRandom(limitParams.likeTimeByMin, limitParams.likeTimeByMax) * 1000)
                await douyinHandle.getCore().sleep(sleepTime);
                return 'success:关注成功！'

            } else {
                return 'error:获取关注按钮失败'
            }

        },

        judgeByVideoLikeNum: (videoInfo: AwemeList) => {
            const limitParams = douyinHandle.getCore().limitParams;
            const { limitByLike } = limitParams;
            if (limitByLike === 0) {
                console.log('忽略视频点赞数量');
                return true;
            }
            return videoInfo.statistics.digg_count <= limitByLike;

        },


        hasJudgeByFollowerAndFollowing: (userInfo: TypeByUserInfo) => {
            const limitParams = douyinHandle.getCore().limitParams;
            const { limitByFansNum, limitByFocusNum } = limitParams;
            const { following_count, follower_count } = userInfo.user;
            console.log('用户关注数：', following_count);
            console.log('用户粉丝数：', follower_count);
            console.log('过滤粉丝数：', limitByFansNum);
            console.log('过滤关注数：', limitByFocusNum);
            if (limitByFansNum === 0 && limitByFocusNum > 0) {
                return following_count <= limitByFocusNum;
            } else if (limitByFocusNum === 0 && limitByFansNum > 0) {
                return follower_count <= limitByFansNum;
            } else if (limitByFansNum === 0 && limitByFocusNum === 0) {
                console.log('已忽略关注数与被关注数！')
                return true;
            } else {
                return follower_count <= limitByFansNum && following_count <= limitByFocusNum;
            }

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

        },

        judgeByPublicUserInfo: async (videoInfo: AwemeList) => {

            let message = '';
            try {
                const userInfo = await douyinHandle.getByUserInfo(videoInfo);
                if (userInfo.user.follow_status === 1) {
                    message = 'error:已关注用户无需关注'
                    return message;
                }
                // 判断性别
                if (userInfo.user.gender === 2) {
                    // 判断关注与被关注数量
                    const limitParams = douyinHandle.getCore().limitParams;
                    if (!douyinHandle.hasJudgeByFollowerAndFollowing(userInfo)) {
                        message = 'error:关注数与被关注数不满足条件';
                        return message;
                    }
                    if (!douyinHandle.hasJudgeByAge(userInfo)) {
                        message = 'error:年龄不满足要求或者年龄不存在';
                        return message;
                    }

                    const flagByLike = douyinHandle.judgeByVideoLikeNum(videoInfo);
                    if (flagByLike) {
                        message = await douyinHandle.postByLike(videoInfo);
                    } else {
                        message = 'error:视频点赞数量不符合要求'
                        return message;
                    }
                    const sleepTime = (douyinHandle.getCore().getRangeByRandom(limitParams.likeTimeByMin, limitParams.likeTimeByMax) * 1000)
                    console.log('等待关注间隔', sleepTime);
                    await douyinHandle.getCore().sleep(sleepTime);
                    message = await douyinHandle.postByFlower(userInfo);
                    // if (res) {
                    //     message = 'success:关注成功';
                    // } else {
                    //     message = 'error:关注失败'
                    // }
                } else {
                    message = 'error:不明性别或男性';
                }

            } catch (error) {
                message = 'error:发布者信息接口获取失败';
            }
            return message;

        }, postByLike: async (videoInfo: AwemeList) => {
            let message = '';
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
                button.click();
                message = '点赞成功'
            } else {
                message = 'error:获取点赞按钮失败'
            }
            console.log(message);
            return message;
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
