<template>
  <div class="config-wrap">
    <a-typography-title :heading="4" style="margin: 0;">
      抖音插件
    </a-typography-title>
    <a-divider style="margin: 4px 0px;" />

    <div class="config-content">
      <a-typography-title :heading="6" style="margin-top: 4px;">
        插件配置
      </a-typography-title>
      <a-space align="end" style="width: 100%; justify-content: space-between;">
        <a-typography-text>视频等待时间:</a-typography-text>
        <a-input-number
          v-model="limitParams.limitByWaiteTime"
          :hide-button="true"
          :min="3"
          :max="limitParams.likeTimeByMax"
          :style="{ width: '247px' }"
          placeholder="最小值（秒）"
          size="mini"
        >
          <template #append>
            <a-typography-text>（秒）</a-typography-text>
          </template>
        </a-input-number>
      </a-space>
      <a-divider style="margin: 8px 0 0 0;" />
      <a-space align="end" style="width: 100%; justify-content: space-between;">
        <a-typography-text>随机关注间隔:</a-typography-text>
        <a-input-group>
          <a-input-number
            v-model="limitParams.likeTimeByMin"
            :hide-button="true"
            :min="3"
            :disabled="disabledConfig"
            :max="limitParams.likeTimeByMax"
            :style="{ width: '110px' }"
            placeholder="最小值（秒）"
            size="mini"
          >
            <template #append>
              <a-typography-text>（秒）</a-typography-text>
            </template>
          </a-input-number>
          <a-divider
            style="margin: 0px 4px; width: 20px; min-width: 1px !important;"
          />
          <a-input-number
            v-model="limitParams.likeTimeByMax"
            :hide-button="true"
            :disabled="disabledConfig"
            :min="limitParams.likeTimeByMin"
            :style="{ width: '110px' }"
            placeholder="最大值（秒）"
            size="mini"
          >
            <template #append>
              <a-typography-text>（秒）</a-typography-text>
            </template>
          </a-input-number>
        </a-input-group>
      </a-space>
      <a-divider style="margin: 8px 0 0 0;" />
      <a-space
        align="end"
        style="width: 100%; justify-content: space-between; margin-top: 8px;"
      >
        <a-typography-text>随机下一个视频:</a-typography-text>
        <a-input-group>
          <a-input-number
            v-model="limitParams.nextVideoTimeMin"
            :hide-button="true"
            :min="3"
            :disabled="disabledConfig"
            :max="limitParams.nextVideoTimeMax"
            :style="{ width: '110px' }"
            placeholder="最小值（秒）"
            size="mini"
          >
            <template #append>
              <a-typography-text>（秒）</a-typography-text>
            </template>
          </a-input-number>

          <a-divider
            style="margin: 0px 4px; width: 20px; min-width: 1px !important;"
          />
          <a-input-number
            v-model="limitParams.nextVideoTimeMax"
            :hide-button="true"
            :disabled="disabledConfig"
            :min="limitParams.nextVideoTimeMin"
            :style="{ width: '110px' }"
            placeholder="最大值（秒）"
            size="mini"
          >
            <template #append>
              <a-typography-text>（秒）</a-typography-text>
            </template>
          </a-input-number>
        </a-input-group>
      </a-space>
      <a-divider style="margin: 8px 0 0 0;" />
      <a-space
        align="end"
        style="width: 100%; justify-content: space-between; margin-top: 8px;"
      >
        <div>
          <a-typography-text>粉丝过滤:</a-typography-text>
          <a-tooltip content="粉丝过滤为 0 忽略该过滤要求">
            <icon-info-circle-fill />
          </a-tooltip>
        </div>
        <a-input-number
          v-model="limitParams.limitByFansNum"
          :hide-button="true"
          :min="0"
          :disabled="disabledConfig"
          :style="{ width: '247px' }"
          placeholder=""
          size="mini"
        >
          <template #append>
            <a-typography-text>以下关注</a-typography-text>
          </template>
        </a-input-number>
      </a-space>
      <a-divider style="margin: 8px 0 0 0;" />
      <a-space
        align="end"
        style="width: 100%; justify-content: space-between; margin-top: 8px;"
      >
        <div>
          <a-typography-text>关注过滤:</a-typography-text>
          <a-tooltip content="关注过滤为 0 忽略该过滤要求">
            <icon-info-circle-fill />
          </a-tooltip>
        </div>

        <a-input-number
          v-model="limitParams.limitByFocusNum"
          :hide-button="true"
          :min="0"
          :style="{ width: '247px' }"
          placeholder=""
          size="mini"
          :disabled="disabledConfig"
        >
          <template #append>
            <a-typography-text>以下关注</a-typography-text>
          </template>
        </a-input-number>
      </a-space>
      <a-divider style="margin: 8px 0 0 0;" />
      <a-space
        align="end"
        style="width: 100%; justify-content: space-between; margin-top: 8px;"
      >
        <div>
          <a-typography-text>年龄过滤:</a-typography-text>
          <a-tooltip content="最小年龄与最大年龄为 0 忽略该过滤要求">
            <icon-info-circle-fill />
          </a-tooltip>
        </div>

        <a-input-group>
          <a-input-number
            v-model="limitParams.ageByMin"
            :hide-button="true"
            :max="limitParams.ageByMax"
            :style="{ width: '110px' }"
            placeholder="最小年龄"
            size="mini"
          >
            <template #append>
              <a-typography-text>（岁）</a-typography-text>
            </template>
          </a-input-number>
          <a-divider
            style="margin: 0px 4px; width: 20px; min-width: 1px !important;"
          />
          <a-input-number
            v-model="limitParams.ageByMax"
            :hide-button="true"
            :min="limitParams.ageByMin"
            :style="{ width: '110px' }"
            placeholder="最大年龄"
            size="mini"
          >
            <template #append>
              <a-typography-text>（岁）</a-typography-text>
            </template>
          </a-input-number>
        </a-input-group>
      </a-space>

      <a-divider style="margin: 8px 0 0 0;" />
      <a-space
        align="end"
        style="width: 100%; justify-content: space-between; margin-top: 8px;"
      >
        <div>
          <a-typography-text>视频点赞数量过滤:</a-typography-text>
          <a-tooltip content="数量 0 为忽略过滤要求">
            <icon-info-circle-fill />
          </a-tooltip>
        </div>
        <a-input-number
          v-model="limitParams.limitByLike"
          :hide-button="true"
          :min="0"
          :style="{ width: '247px' }"
          placeholder=""
          size="mini"
          :disabled="disabledConfig"
        >
          <template #append>
            <a-typography-text>以下点赞</a-typography-text>
          </template>
        </a-input-number>
      </a-space>
      <a-divider style="margin: 8px 0 0 0;" />
      <a-space
        align="end"
        style="width: 100%; justify-content: space-between; margin-top: 8px;"
      >
        <div>
          <a-typography-text>执行次数:</a-typography-text>
          <a-tooltip content="执行超过设置次数后将终止脚本执行">
            <icon-info-circle-fill />
          </a-tooltip>
        </div>
        <a-input-number
          v-model="handlingStatus.executeNum"
          :hide-button="true"
          :min="0"
          :style="{ width: '247px' }"
          placeholder=""
          size="mini"
        >
          <template #append>
            <a-typography-text>次数</a-typography-text>
          </template>
        </a-input-number>
      </a-space>
    </div>

    <div class="config_footer-wrap">
      <a-button
        long
        status="warning"
        style="margin-bottom: 4px;"
        type="primary"
        @click="onEditParamsConfig"
      >
        保存配置修改
      </a-button>

      <a-button
        v-if="!handlingStatus.ing"
        long
        type="primary"
        @click="onStartAutoHandle"
      >
        开始执行插件
      </a-button>
      <a-button
        v-if="handlingStatus.ing"
        long
        status="danger"
        @click="onHandleByPause"
      >
        暂停插件
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRaw } from 'vue'
import {
  TypeByHandleLimitParams,
  TypeByHandleStatus,
  TypeByHandlingStatus,
} from '../type'
import { Message } from '@arco-design/web-vue'
import { ref } from 'vue'

const disabledConfig = ref(true)

const limitParams = reactive<TypeByHandleLimitParams>({
  likeTimeByMin: 0,
  likeTimeByMax: 0,
  nextVideoTimeMin: 0,
  nextVideoTimeMax: 0,
  limitByFansNum: 0,
  limitByFocusNum: 0,
  ageByMin: 0,
  ageByMax: 0,
  limitByLike: 0,
  limitByWaiteTime: 0,
})

const handlingStatus = reactive<TypeByHandlingStatus>({
  ing: false,
  ingStatusList: [],
  isInit: false,
  executeNum: 1000,
})

const onExecutedItem = async (value: TypeByHandleStatus) => {
  const {
    nickname,
    ip_location,
    uid,
    unique_id,
    aweme_count,
    city,
    gender,
    follower_count,
    following_count,
    user_age,
    signature,
    source_video_id,
    source_video_time,
    last_activity_time,
  } = value.userInfo.user
  await requestByPost({
    data: {
      dyAccount: value.douyinAccount,
      message: value.message,
      status: value.status,
      nickname,
      ipLocation: ip_location,
      uid,
      uniqueId: unique_id,
      awemeCount: aweme_count,
      city,
      gender,
      followerCount: follower_count,
      followingCount: following_count,
      userAge: user_age,
      signature,
      sourceVideoid: source_video_id,
      sourceVideoTime: source_video_time,
      lastActivityTime: last_activity_time,
      result: '',
    },
    url: 'https://oaadmin.meixioa.com/api/statistic/dy',
  })
}

onMounted(() => {
  chrome.runtime.onMessage.addListener(
    (message: { key: string; value: any }) => {
      switch (message.key) {
        case 'onExecuted':
          Object.assign(handlingStatus, message.value)
          break
        case 'onExecutedItem':
          onExecutedItem(message.value)
          break
        default:
          break
      }
      return true
    },
  )

  chrome.runtime.sendMessage(
    {
      key: 'onPopupMounted',
      value: {},
    },
    // @ts-ignore
    (response: {
      isInit: boolean
      value: {
        limitParams: TypeByHandleLimitParams
        handlingStatus: TypeByHandlingStatus
      }
    }) => {
      Object.assign(handlingStatus, response.value.handlingStatus)
      Object.assign(limitParams, response.value.limitParams)
    },
  )
})

const onStartAutoHandle = () => {
  // handlingStatus.ing = true
  chrome.runtime.sendMessage(
    {
      key: 'onStartAutoHandle',
    },
    // @ts-ignore
    (response: TypeByHandleStatus) => {
      if (response.status) {
        Message.success(response.message)
        handlingStatus.ing = true
      } else {
        Message.error(response.message)
      }
    },
  )
}

const onEditParamsConfig = () => {
  handlingStatus.ing = false
  Message.info('已暂停脚本，请稍候手动执行脚本！')
  chrome.runtime.sendMessage(
    {
      key: 'onSyncStorage',
      value: {
        limitParams: toRaw(limitParams),
        handlingStatus: toRaw(handlingStatus),
      },
    },
    // @ts-ignore
    (response: TypeByHandleLimitParams) => {
      console.log(response)
    },
  )
}

const onHandleByPause = () => {
  handlingStatus.ing = false
  chrome.runtime.sendMessage(
    {
      key: 'onPauseScript',
      value: toRaw(handlingStatus),
    },
    // @ts-ignore
    (response: TypeByHandleLimitParams) => {},
  )
}

const parseUrlParams = (params: object) => {
  let url = ''
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key]
      const item = `${key}=${value}&`
      if (!url) {
        url = `?${item}`
      } else {
        url = `${url}${item}`
      }
    }
  }
  return url
}

// await requestByPost({
//             data: {
//                 dyAccount: res.douyinAccount,
//                 result: JSON.stringify(res)
//             },
//             url: 'http://192.168.31.24/static/dy',
//         });

async function requestByPost(params: {
  query?: object
  url: string
  data?: any
  isFormData?: boolean
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    let url = params.url
    if (params.query) {
      url = `${url}${parseUrlParams(params.query)}`
    }
    // 配置请求的 URL 和方法（POST）
    xhr.open('POST', url, true)

    // 设置请求头，指定发送的数据类型为 JSON
    if (!params.isFormData) {
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    }

    // 设置响应类型为 JSON
    xhr.responseType = 'json'

    // 定义请求完成时的回调函数
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // // 请求成功，处理响应数据
        resolve(xhr.response)
      } else {
        // 请求失败，处理错误
        reject('请求失败')
      }
    }

    if (params.data) {
      if (!params.isFormData) {
        xhr.send(JSON.stringify(params.data))
      } else {
        xhr.send(params.data)
      }
    } else {
      xhr.send()
    }
  })
}
</script>

<style lang="less">
.config-wrap {
  width: 100%;
  height: 100%;

  .config-content {
    height: calc(100% - 116px);
  }

  .config_footer-wrap {
    margin-top: 8px;
  }
}
</style>
