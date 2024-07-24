export type TypeByDouyinCore = {
    isInject: boolean
    videoMap: Map<string, AwemeList>,
    auth?: TypeByAuthonParams,
    sleep: (time: number) => Promise<boolean>
    limitParams: TypeByHandleLimitParams,
    getRangeByRandom: (min: number, max: number) => number,
    judgeByLogin: () => Promise<boolean | {
        uid: string,
        nickname: string,
        avatarUrl: string
    }>
    reload: () => void;
}

export type TypeByHandleLimitParams = {
    limitByWaiteTime: number,
    likeTimeByMin: number,
    likeTimeByMax: number,
    nextVideoTimeMin: number,
    nextVideoTimeMax: number,
    limitByFansNum: number,
    limitByFocusNum: number,
    limitByLike: number,
    ageByMin: number,
    ageByMax: number
}

export type TypeByHandleStatus = {
    status: boolean,
    message: string,
    userInfo?: TypeByUserInfo,
    douyinAccount?: string,
}


export type TypeByHandlingStatus = {
    ing: boolean,
    isInit: boolean,
    ingStatusList: TypeByHandleStatus[],
    executeNum: number
}




export type TypeByDouyinHandle = {
    startAuto: () => Promise<TypeByHandleStatus>,
    getActivityId: (wrap: Element) => string,
    isInject: () => boolean,
    getInjectUtils: () => TypeByInjectUtils,
    getCore: () => TypeByDouyinCore,
    getPreVideoButton: () => Element & { click: () => void };
    getNextVideoButton: () => Element & { click: () => void };
    getFollowButton: () => (Element & { click: () => void }) | null;
    getDiggButton: () => (Element & { click: () => void }) | null;
    getActiveVideo: () => Element | null,
    getVideoMap: () => TypeByDouyinCore['videoMap'],
    getByUserInfo: (videoInfo: AwemeList) => Promise<null | TypeByUserInfo>,
    postByFlower: (userInfo: TypeByUserInfo) => Promise<TypeByHandleStatus>,
    postByLike: (videoInfo: AwemeList) => Promise<TypeByHandleStatus>,
    judgeByVideoLikeNum: (videoInfo: AwemeList) => boolean,
    judgeByPublicUserInfo: (videoInfo: AwemeList) => Promise<TypeByHandleStatus>,
    hasJudgeByFollowerAndFollowing: (userInfo: TypeByUserInfo) => boolean
    hasJudgeByAge: (userInfo: TypeByUserInfo) => boolean;
    getByUserVideoList: (videoInfo: AwemeList) => Promise<null | TypeByUserVideoList>

    getLastVideoTime: (videoInfo: AwemeList) => Promise<number | null>;
}

export type TypeByInjectUtils = {
    setup: () => void;
    isInject: () => boolean;
    registerRequestHookByResponse: () => void;
    registerRequestHookByRequest: () => void;
    getCore: () => TypeByDouyinCore;
    injectByXhrRequest: () => void;
    deParseUrlParams: (url: string) => object;
    parseUrlParams: (params: object) => string;
    requestHookMapByResponse: Map<any, any>;
    requestHookMapByRequest: Map<any, any>;
    requestByGet: (params: {
        query?: object,
        url: string
    }) => Promise<any>,
    requestByPost: (params: {
        query?: object,
        url: string,
        data?: any,
        isFormData?: boolean
    }) => Promise<any>
}



export interface InterFaceByVideoParams {
    status_code: number
    min_cursor: number
    max_cursor: number
    has_more: number
    aweme_list: AwemeList[]
    time_list: any
    log_pb: LogPb
    has_locate_item: boolean
    locate_item_available: boolean
    locate_item_cursor: number
    request_item_cursor: number
    post_serial: number
    replace_series_cover: number
}

export interface AwemeList {
    aweme_id: string
    desc: string
    create_time: number
    author: Author
    music: Music
    friend_interaction: number
    video: Video
    share_url: string
    user_digged: number
    statistics: Statistics
    status: Status
    image_comment: ImageComment
    text_extra: TextExtra[]
    is_top: number
    authentication_token: string
    share_info: ShareInfo2
    xigua_base_info: XiguaBaseInfo
    video_labels: any
    slides_music_beats: any
    is_ads: boolean
    duration: number
    aweme_type: number
    caption: string
    video_share_edit_status: number
    image_infos: any
    risk_infos: RiskInfos
    jump_tab_info_list: any
    collection_corner_mark: number
    position: any
    uniqid_position: any
    comment_list: any
    author_user_id: number
    trends_infos: any
    geofencing: any[]
    create_scale_type: any
    reply_smart_emojis: any
    region: string
    video_text: any
    packed_clips: any
    collect_stat: number
    label_top_text: any
    promotions: any[]
    group_id: string
    prevent_download: boolean
    nickname_position: any
    challenge_position: any
    yumme_recreason: any
    disable_relation_bar: number
    item_warn_notification: ItemWarnNotification
    long_video: any
    image_crop_ctrl: number
    distribute_circle: DistributeCircle
    origin_text_extra: any
    mark_largely_following: boolean
    interaction_stickers: any
    ref_voice_modify_id_list: any
    origin_comment_ids: any
    commerce_config_data: any
    original: number
    video_control: VideoControl
    aweme_control: AwemeControl
    is_use_music: boolean
    enable_comment_sticker_rec: boolean
    ref_tts_id_list: any
    media_type: number
    anchors: any
    hybrid_label: any
    geofencing_regions: any
    item_title: string
    aweme_acl?: AwemeAcl
    visual_search_info: VisualSearchInfo
    is_story: number
    video_game_data_channel_config: VideoGameDataChannelConfig
    user_recommend_status: number
    is_24_story: number
    cover_labels: any
    entertainment_product_info: EntertainmentProductInfo
    voice_modify_id_list: any
    guide_btn_type: number
    boost_status: number
    tts_id_list: any
    images?: Image[]
    relation_labels: any
    activity_video_type: number
    impression_data: ImpressionData
    dislike_dimension_list_v2: any
    author_mask_tag: number
    libfinsert_task_id: string
    social_tag_list: any
    suggest_words?: SuggestWords
    show_follow_button: ShowFollowButton
    duet_aggregate_in_music_tab: boolean
    is_duet_sing: boolean
    comment_permission_info: CommentPermissionInfo
    original_images: any
    is_multi_content?: number
    series_paid_info: SeriesPaidInfo
    category_da?: number
    img_bitrate?: any[]
    comment_gid: number
    image_album_music_info: ImageAlbumMusicInfo
    video_tag: VideoTag[]
    is_collects_selected: number
    chapter_list: any
    feed_comment_config: FeedCommentConfig
    is_image_beat: boolean
    dislike_dimension_list: any
    standard_bar_info_list: any
    photo_search_entrance: PhotoSearchEntrance
    is_life_item: boolean
    main_arch_common?: string
    image_list: any
    component_info_v2: string
    common_bar_info: string
    image_item_quality_level?: number
    vtag_search?: VtagSearch
}

export interface Author {
    uid: string
    personal_tag_list: any
    nickname: string
    not_seen_item_id_list_v2: any
    verification_permission_ids: any
    avatar_thumb: AvatarThumb
    familiar_visitor_user: any
    offline_info_list: any
    follow_status: number
    not_seen_item_id_list: any
    private_relation_list: any
    risk_notice_text: string
    custom_verify: string
    homepage_bottom_toast: any
    user_tags: any
    card_entries: any
    profile_mob_params: any
    sec_uid: string
    share_info: ShareInfo
    display_info: any
    need_points: any
    batch_unfollow_relation_desc: any
    enterprise_verify_reason: string
    is_ad_fake: boolean
    creator_tag_list: any
    interest_tags: any
    white_cover_url: any
    avatar_schema_list: any
    card_sort_priority: any
    im_role_ids: any
    ban_user_functions: any
    prevent_download: boolean
    endorsement_info_list: any
    special_people_labels: any
    cf_list: any
    follower_status: number
    data_label_list: any
    text_extra: any
    contrail_list: any
    cover_url: CoverUrl[]
    link_item_list: any
    user_permissions: any
    follower_list_secondary_information_struct: any
    card_entries_not_display: any
    signature_extra: any
    can_set_geofencing: any
    batch_unfollow_contain_tabs: any
}

export interface AvatarThumb {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface ShareInfo {
    share_url: string
    share_weibo_desc: string
    share_desc: string
    share_title: string
    share_qrcode_url: ShareQrcodeUrl
    share_title_myself: string
    share_title_other: string
    share_desc_info: string
}

export interface ShareQrcodeUrl {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface CoverUrl {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface Music {
    id: number
    id_str: string
    title: string
    author: string
    album: string
    cover_hd: CoverHd
    cover_large: CoverLarge
    cover_medium: CoverMedium
    cover_thumb: CoverThumb
    play_url: PlayUrl
    schema_url: string
    source_platform: number
    start_time: number
    end_time: number
    duration: number
    extra: string
    user_count: number
    position: any
    collect_stat: number
    status: number
    offline_desc: string
    owner_nickname: string
    is_original: boolean
    mid: string
    binded_challenge_id: number
    redirect: boolean
    is_restricted: boolean
    author_deleted: boolean
    is_del_video: boolean
    is_video_self_see: boolean
    owner_handle: string
    author_position: any
    prevent_download: boolean
    strong_beat_url?: StrongBeatUrl
    unshelve_countries: any
    prevent_item_download_status: number
    external_song_info: any[]
    avatar_thumb?: AvatarThumb2
    avatar_medium?: AvatarMedium
    avatar_large?: AvatarLarge
    preview_start_time: number
    preview_end_time: number
    is_commerce_music: boolean
    is_original_sound: boolean
    audition_duration: number
    shoot_duration: number
    reason_type: number
    artists: any[]
    lyric_short_position: any
    mute_share: boolean
    tag_list: any
    dmv_auto_show: boolean
    is_pgc: boolean
    is_matched_metadata: boolean
    is_audio_url_with_cookie: boolean
    music_chart_ranks: any
    can_background_play: boolean
    music_status: number
    video_duration: number
    pgc_music_type: number
    author_status?: number
    search_impr: SearchImpr
    artist_user_infos: any
    dsp_status: number
    musician_user_infos: any
    music_collect_count: number
    music_cover_atmosphere_color_value: string
    cover_color_hsv?: CoverColorHsv
    song?: Song
    music_image_beats?: MusicImageBeats
    owner_id?: string
    sec_uid?: string
}

export interface CoverHd {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface CoverLarge {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface CoverMedium {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface CoverThumb {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface PlayUrl {
    uri: string
    url_list: string[]
    width: number
    height: number
    url_key: string
}

export interface StrongBeatUrl {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface AvatarThumb2 {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface AvatarMedium {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface AvatarLarge {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface SearchImpr {
    entity_id: string
}

export interface CoverColorHsv {
    h: number
    s: number
    v: number
}

export interface Song {
    id: number
    id_str: string
    title: string
    artists: any
    chorus: Chorus
    chorus_v3_infos: any
}

export interface Chorus {
    start_ms: number
    duration_ms: number
}

export interface MusicImageBeats {
    music_image_beats_url: MusicImageBeatsUrl
    music_image_beats_raw: string
}

export interface MusicImageBeatsUrl {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface Video {
    play_addr: PlayAddr
    cover: Cover
    height: number
    width: number
    dynamic_cover?: DynamicCover
    origin_cover: OriginCover
    ratio: string
    bit_rate_audio: any
    big_thumbs?: BigThumb[]
    video_model?: string
    bit_rate?: BitRate[]
    duration: number
    gaussian_cover?: GaussianCover
    audio: Audio
    play_addr_265?: PlayAddr265
    is_source_HDR?: number
    play_addr_h264?: PlayAddrH264
    format?: string
    animated_cover?: AnimatedCover
    meta: string
}

export interface PlayAddr {
    uri: string
    url_list: string[]
    width: number
    height: number
    url_key: string
    data_size?: number
    file_hash?: string
    file_cs?: string
}

export interface Cover {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface DynamicCover {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface OriginCover {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface BigThumb {
    img_num: number
    uri: string
    img_url: string
    img_x_size: number
    img_y_size: number
    img_x_len: number
    img_y_len: number
    duration: number
    interval: number
    fext: string
    uris: string[]
    img_urls: string[]
}

export interface BitRate {
    gear_name: string
    quality_type: number
    bit_rate: number
    play_addr: PlayAddr2
    is_h265: number
    is_bytevc1: number
    HDR_type: string
    HDR_bit: string
    FPS: number
    video_extra: string
    format: string
}

export interface PlayAddr2 {
    uri: string
    url_list: string[]
    width: number
    height: number
    url_key: string
    data_size: number
    file_hash: string
    file_cs: string
}

export interface GaussianCover {
    uri: string
    url_list: string[]
    width: number
    height: number
}

export interface Audio {
    original_sound_infos: any
}

export interface PlayAddr265 {
    uri: string
    url_list: string[]
    width: number
    height: number
    url_key: string
    data_size: number
    file_hash: string
    file_cs: string
}

export interface PlayAddrH264 {
    uri: string
    url_list: string[]
    width: number
    height: number
    url_key: string
    data_size: number
    file_hash: string
    file_cs: string
}

export interface AnimatedCover {
    uri: string
    url_list: string[]
}

export interface Statistics {
    admire_count: number
    comment_count: number
    digg_count: number
    collect_count: number
    play_count: number
    share_count: number
}

export interface Status {
    listen_video_status: number
    is_delete: boolean
    allow_share: boolean
    is_prohibited: boolean
    in_reviewing: boolean
    part_see: number
    private_status: number
    review_result: ReviewResult
}

export interface ReviewResult {
    review_status: number
}

export interface ImageComment { }

export interface TextExtra {
    start: number
    end: number
    type: number
    hashtag_name?: string
    hashtag_id?: string
    is_commerce?: boolean
    caption_start: number
    caption_end: number
}

export interface ShareInfo2 {
    share_url: string
    share_link_desc: string
}

export interface XiguaBaseInfo {
    status: number
    star_altar_order_id: number
    star_altar_type: number
    item_id: number
}

export interface RiskInfos {
    vote: boolean
    warn: boolean
    risk_sink: boolean
    type: number
    content: string
}

export interface ItemWarnNotification {
    type: number
    show: boolean
    content: string
}

export interface DistributeCircle {
    distribute_type: number
    campus_block_interaction: boolean
    is_campus: boolean
}

export interface VideoControl {
    allow_download: boolean
    share_type: number
    show_progress_bar: number
    draft_progress_bar: number
    allow_duet: boolean
    allow_react: boolean
    prevent_download_type: number
    allow_dynamic_wallpaper: boolean
    timer_status: number
    allow_music: boolean
    allow_stitch: boolean
    allow_douplus: boolean
    allow_share: boolean
    share_grayed: boolean
    download_ignore_visibility: boolean
    duet_ignore_visibility: boolean
    share_ignore_visibility: boolean
    download_info: DownloadInfo
    duet_info: DuetInfo
    allow_record: boolean
    disable_record_reason: string
}

export interface DownloadInfo {
    level: number
    fail_info?: FailInfo
}

export interface FailInfo {
    code: number
    reason: string
    msg: string
}

export interface DuetInfo {
    level: number
    fail_info?: FailInfo2
}

export interface FailInfo2 {
    code: number
    reason: string
    msg?: string
}

export interface AwemeControl {
    can_forward: boolean
    can_share: boolean
    can_comment: boolean
    can_show_comment: boolean
}

export interface AwemeAcl {
    download_mask_panel: DownloadMaskPanel
}

export interface DownloadMaskPanel {
    code: number
    show_type: number
}

export interface VisualSearchInfo {
    is_show_img_entrance: boolean
    is_ecom_img: boolean
    visual_search_longpress?: number
}

export interface VideoGameDataChannelConfig { }

export interface EntertainmentProductInfo {
    sub_title: any
    market_info: MarketInfo
}

export interface MarketInfo {
    limit_free: LimitFree
    marketing_tag: any
}

export interface LimitFree {
    in_free: boolean
}

export interface Image {
    uri: string
    url_list: string[]
    download_url_list: string[]
    height: number
    width: number
    mask_url_list: any
    interaction_stickers: any
}

export interface ImpressionData {
    group_id_list_a: number[]
    group_id_list_b: number[]
    similar_id_list_a: any
    similar_id_list_b: any
    group_id_list_c: any[]
}

export interface SuggestWords {
    suggest_words: SuggestWord[]
}

export interface SuggestWord {
    words: Word[]
    scene: string
    icon_url: string
    hint_text: string
}

export interface Word {
    word: string
    word_id: string
    info: string
}

export interface ShowFollowButton { }

export interface CommentPermissionInfo {
    comment_permission_status: number
    can_comment: boolean
    item_detail_entry: boolean
    press_entry: boolean
    toast_guide: boolean
}

export interface SeriesPaidInfo {
    series_paid_status: number
    item_price: number
}

export interface ImageAlbumMusicInfo {
    begin_time: number
    end_time: number
    volume: number
}

export interface VideoTag {
    tag_id: number
    tag_name: string
    level: number
}

export interface FeedCommentConfig { }

export interface PhotoSearchEntrance {
    ecom_type: number
}

export interface VtagSearch {
    vtag_enable: boolean
    vtag_delay_ts: number
}

export interface LogPb {
    impr_id: string
}



export type TypeByAuthonParams = {
    device_platform: string
    aid: string
    channel: string
    app_name: string
    format: string
    group_id: string
    item_id: string
    start_time: string
    end_time: string
    authentication_token: string
    duration: string
    update_version_code: string
    pc_client_type: string
    version_code: string
    version_name: string
    cookie_enabled: string
    screen_width: string
    screen_height: string
    browser_language: string
    browser_platform: string
    browser_name: string
    browser_version: string
    browser_online: string
    engine_name: string
    engine_version: string
    os_name: string
    os_version: string
    cpu_core_num: string
    device_memory: string
    platform: string
    downlink: string
    effective_type: string
    round_trip_time: string
    webid: string
    verifyFp: string
    fp: string
    msToken: string
    a_bogus: string
}


export type TypeByUserInfo = {

    extra: {
        fatal_item_ids: Array<any>
        logid: string
        now: number
    }
    log_pb: {
        impr_id: string
    }
    status_code: number
    status_msg: any
    user: {
        account_cert_info: string
        apple_account: number
        avatar_168x168: {
            height: number
            uri: string
            url_list: Array<string>
            width: number
        }
        avatar_300x300: {
            height: number
            uri: string
            url_list: Array<string>
            width: number
        }
        avatar_larger: {
            height: number
            uri: string
            url_list: Array<string>
            width: number
        }
        avatar_medium: {
            height: number
            uri: string
            url_list: Array<string>
            width: number
        }
        avatar_thumb: {
            height: number
            uri: string
            url_list: Array<string>
            width: number
        }
        aweme_count: number
        aweme_count_correction_threshold: number
        birthday_hide_level: number
        can_set_item_cover: boolean
        can_show_group_card: number
        city: string
        close_friend_type: number
        commerce_info: {
            challenge_list: any
            head_image_list: any
            offline_info_list: Array<any>
            smart_phone_list: any
            task_list: any
        }
        commerce_user_info: {
            ad_revenue_rits: any
            has_ads_entry: boolean
        }
        commerce_user_level: number
        country: string
        cover_and_head_image_info: {
            cover_list: any
            profile_cover_list: Array<{
                cover_url: {
                    uri: string
                    url_list: Array<string>
                }
                dark_cover_color: string
                light_cover_color: string
            }>
        }
        cover_colour: string
        cover_url: Array<{
            uri: string
            url_list: Array<string>
        }>
        custom_verify: string
        district: string
        dongtai_count: number
        dynamic_cover: {}
        enable_ai_double: number
        enable_wish: boolean
        enterprise_user_info: string
        enterprise_verify_reason: string
        favorite_permission: number
        favoriting_count: number
        follow_guide: boolean
        follow_status: number
        follower_count: number
        follower_request_status: number
        follower_status: number
        following_count: number
        forward_count: number
        gender: number
        general_permission: {
            following_follower_list_toast: number
        }
        has_e_account_role: boolean
        has_subscription: boolean
        image_send_exempt: boolean
        ins_id: string
        ip_location: string
        is_activity_user: boolean
        is_ban: boolean
        is_block: boolean
        is_blocked: boolean
        is_effect_artist: boolean
        is_gov_media_vip: boolean
        is_mix_user: boolean
        is_not_show: boolean
        is_series_user: boolean
        is_sharing_profile_user: number
        is_star: boolean
        life_story_block: {
            life_story_block: boolean
        }
        live_commerce: boolean
        live_status: number
        max_follower_count: number
        message_chat_entry: boolean
        mix_count: number
        mplatform_followers_count: number
        nickname: string
        original_musician: {
            digg_count: number
            music_count: number
            music_used_count: number
        }
        pigeon_daren_status: string
        pigeon_daren_warn_tag: string
        profile_show: {
            identify_auth_infos: any
        }
        profile_tab_type: number
        province: string
        public_collects_count: number
        publish_landing_tab: number
        r_fans_group_info: {}
        recommend_reason_relation: string
        recommend_user_reason_source: number
        risk_notice_text: string
        room_id: number
        room_id_str: string
        school_name: any
        sec_uid: string
        secret: number
        series_count: number
        share_info: {
            bool_persist: number
            life_share_ext: string
            share_desc: string
            share_image_url: {
                uri: string
                url_list: Array<string>
            }
            share_qrcode_url: {
                uri: string
                url_list: Array<any>
            }
            share_title: string
            share_url: string
            share_weibo_desc: string
        }
        short_id: string
        show_favorite_list: boolean
        show_subscription: boolean
        signature: string
        signature_display_lines: number
        signature_language: string
        special_follow_status: number
        sync_to_toutiao: number
        tab_settings: {
            private_tab: {
                private_tab_style: number
                show_private_tab: boolean
            }
        }
        total_favorited: number
        total_favorited_correction_threshold: number
        twitter_id: string
        twitter_name: string
        uid: string
        unique_id: string
        urge_detail: {
            ctl_map: string
            user_urged: number
        }
        user_age: number
        user_not_see: number
        user_not_show: number
        verification_type: number
        video_cover: {}
        video_icon: {
            height: number
            uri: string
            url_list: Array<any>
            width: number
        }
        watch_status: boolean
        white_cover_url: Array<{
            uri: string
            url_list: Array<string>
        }>
        with_commerce_enterprise_tab_entry: boolean
        with_commerce_entry: boolean
        with_fusion_shop_entry: boolean
        with_new_goods: boolean
        youtube_channel_id: string
        youtube_channel_title: string,
    } & TypeByExtendUserinfo
}

export type TypeByExtendUserinfo = {
    source_video_id: string,
    source_video_time: number,
    last_activity_time: number,
}

export type TypeByUserVideoList = {

    status_code: number
    min_cursor: number
    max_cursor: number
    has_more: number
    aweme_list: Array<{
        aweme_id: string
        desc: string
        create_time: number
        author: {
            uid: string
            ban_user_functions: any
            nickname: string
            cf_list: any
            link_item_list: any
            avatar_thumb: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            avatar_schema_list: any
            signature_extra: any
            follow_status: number
            risk_notice_text: string
            private_relation_list: any
            follower_list_secondary_information_struct: any
            custom_verify: string
            can_set_geofencing: any
            batch_unfollow_contain_tabs: any
            display_info: any
            verification_permission_ids: any
            need_points: any
            share_info: {
                share_url: string
                share_weibo_desc: string
                share_desc: string
                share_title: string
                share_qrcode_url: {
                    uri: string
                    url_list: Array<string>
                    width: number
                    height: number
                }
                share_title_myself: string
                share_title_other: string
                share_desc_info: string
            }
            familiar_visitor_user: any
            homepage_bottom_toast: any
            batch_unfollow_relation_desc: any
            enterprise_verify_reason: string
            is_ad_fake: boolean
            account_cert_info: string
            interest_tags: any
            user_tags: any
            profile_mob_params: any
            card_entries_not_display: any
            not_seen_item_id_list: any
            card_entries: any
            prevent_download: boolean
            text_extra: any
            sec_uid: string
            im_role_ids: any
            follower_status: number
            not_seen_item_id_list_v2: any
            contrail_list: any
            data_label_list: any
            cover_url: Array<{
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }>
            user_permissions: any
            offline_info_list: any
            endorsement_info_list: any
            card_sort_priority: any
            personal_tag_list: any
            white_cover_url: any
            creator_tag_list: any
            special_people_labels: any
        }
        music: {
            id: number
            id_str: string
            title: string
            author: string
            album: string
            cover_hd: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            cover_large: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            cover_medium: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            cover_thumb: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            play_url: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
                url_key: string
            }
            schema_url: string
            source_platform: number
            start_time: number
            end_time: number
            duration: number
            extra: string
            user_count: number
            position: any
            collect_stat: number
            status: number
            offline_desc: string
            owner_id?: string
            owner_nickname: string
            is_original: boolean
            mid: string
            binded_challenge_id: number
            redirect: boolean
            is_restricted: boolean
            author_deleted: boolean
            is_del_video: boolean
            is_video_self_see: boolean
            owner_handle: string
            author_position: any
            prevent_download: boolean
            unshelve_countries: any
            prevent_item_download_status: number
            external_song_info: Array<any>
            sec_uid?: string
            avatar_thumb?: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            avatar_medium?: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            avatar_large?: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            preview_start_time: number
            preview_end_time: number
            is_commerce_music: boolean
            is_original_sound: boolean
            audition_duration: number
            shoot_duration: number
            reason_type: number
            artists: Array<{
                uid: string
                sec_uid: string
                nick_name: string
                handle: string
                avatar: {
                    uri: string
                    url_list: Array<string>
                }
                is_verified: boolean
                enter_type: number
            }>
            lyric_short_position: any
            mute_share: boolean
            tag_list: any
            dmv_auto_show: boolean
            is_pgc: boolean
            is_matched_metadata: boolean
            is_audio_url_with_cookie: boolean
            music_chart_ranks: any
            can_background_play: boolean
            music_status: number
            video_duration: number
            pgc_music_type: number
            author_status?: number
            search_impr: {
                entity_id: string
            }
            artist_user_infos: any
            dsp_status: number
            musician_user_infos: any
            music_collect_count: number
            music_cover_atmosphere_color_value: string
            strong_beat_url?: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            cover_color_hsv?: {
                h: number
                s: number
                v: number
            }
            song?: {
                id: number
                id_str: string
                title?: string
                artists: any
                chorus?: {
                    start_ms: number
                    duration_ms: number
                }
                chorus_v3_infos: any
            }
            music_image_beats?: {
                music_image_beats_url: {
                    uri: string
                    url_list: Array<string>
                    width: number
                    height: number
                }
            }
            matched_pgc_sound?: {
                author: string
                title: string
                mixed_title: string
                mixed_author: string
                cover_medium: {
                    uri: string
                    url_list: Array<string>
                    width: number
                    height: number
                }
            }
        }
        friend_interaction: number
        video: {
            play_addr: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
                url_key: string
                data_size?: number
                file_hash?: string
                file_cs?: string
            }
            cover: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            height: number
            width: number
            dynamic_cover?: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            origin_cover: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            ratio: string
            bit_rate_audio: any
            big_thumbs?: Array<{
                img_num: number
                uri: string
                img_url: string
                img_x_size: number
                img_y_size: number
                img_x_len: number
                img_y_len: number
                duration: number
                interval: number
                fext: string
                uris: Array<string>
                img_urls: Array<string>
            }>
            meta: string
            bit_rate?: Array<{
                gear_name: string
                quality_type: number
                bit_rate: number
                play_addr: {
                    uri: string
                    url_list: Array<string>
                    width: number
                    height: number
                    url_key: string
                    data_size: number
                    file_hash: string
                    file_cs: string
                }
                is_h265: number
                is_bytevc1: number
                HDR_type: string
                HDR_bit: string
                FPS: number
                video_extra: string
                format: string
            }>
            duration: number
            gaussian_cover?: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            audio: {
                original_sound_infos: any
            }
            play_addr_265?: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
                url_key: string
                data_size: number
                file_hash: string
                file_cs: string
            }
            is_source_HDR?: number
            play_addr_h264?: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
                url_key: string
                data_size: number
                file_hash: string
                file_cs: string
            }
            format?: string
            animated_cover?: {
                uri: string
                url_list: Array<string>
            }
            optimized_cover?: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            use_static_cover?: boolean
            video_model?: string
            horizontal_type?: number
            is_long_video?: number
        }
        share_url: string
        user_digged: number
        statistics: {
            admire_count: number
            comment_count: number
            digg_count: number
            collect_count: number
            play_count: number
            share_count: number
        }
        status: {
            listen_video_status: number
            is_delete: boolean
            allow_share: boolean
            is_prohibited: boolean
            in_reviewing: boolean
            part_see: number
            private_status: number
            review_result: {
                review_status: number
            }
        }
        image_comment: {}
        text_extra: Array<{
            start: number
            end: number
            type: number
            hashtag_name?: string
            hashtag_id?: string
            is_commerce?: boolean
            caption_start: number
            caption_end: number
        }>
        is_top: number
        authentication_token: string
        share_info: {
            share_url: string
            share_link_desc: string
        }
        xigua_base_info: {
            status: number
            star_altar_order_id: number
            star_altar_type: number
            item_id: number
        }
        video_labels: any
        slides_music_beats: any
        is_ads: boolean
        duration: number
        aweme_type: number
        caption: string
        video_share_edit_status: number
        image_infos: any
        risk_infos: {
            vote: boolean
            warn: boolean
            risk_sink: boolean
            type: number
            content: string
        }
        jump_tab_info_list: any
        collection_corner_mark: number
        position: any
        uniqid_position: any
        comment_list: any
        author_user_id: number
        trends_infos: any
        geofencing: Array<any>
        create_scale_type?: Array<string>
        reply_smart_emojis: any
        region: string
        video_text: any
        packed_clips: any
        collect_stat: number
        label_top_text: any
        promotions: Array<any>
        group_id: string
        prevent_download: boolean
        nickname_position: any
        challenge_position: any
        yumme_recreason: any
        disable_relation_bar: number
        item_warn_notification: {
            type: number
            show: boolean
            content: string
        }
        long_video: any
        image_crop_ctrl: number
        distribute_circle: {
            distribute_type: number
            campus_block_interaction: boolean
            is_campus: boolean
        }
        origin_text_extra: any
        mark_largely_following: boolean
        interaction_stickers: any
        ref_voice_modify_id_list: any
        origin_comment_ids: any
        commerce_config_data: any
        original: number
        video_control: {
            allow_download: boolean
            share_type: number
            show_progress_bar: number
            draft_progress_bar: number
            allow_duet: boolean
            allow_react: boolean
            prevent_download_type: number
            allow_dynamic_wallpaper: boolean
            timer_status: number
            allow_music: boolean
            allow_stitch: boolean
            allow_douplus: boolean
            allow_share: boolean
            share_grayed: boolean
            download_ignore_visibility: boolean
            duet_ignore_visibility: boolean
            share_ignore_visibility: boolean
            download_info: {
                level: number
                fail_info?: {
                    code: number
                    reason: string
                    msg: string
                }
            }
            duet_info: {
                level: number
                fail_info?: {
                    code: number
                    reason: string
                }
            }
            allow_record: boolean
            disable_record_reason: string
        }
        aweme_control: {
            can_forward: boolean
            can_share: boolean
            can_comment: boolean
            can_show_comment: boolean
        }
        is_use_music: boolean
        mix_info?: {
            mix_id: string
            mix_name: string
            cover_url: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
            }
            status: {
                status: number
                is_collected: number
            }
            statis: {
                play_vv: number
                collect_vv: number
                current_episode: number
                updated_to_episode: number
            }
            desc: string
            extra: string
            share_info: {
                share_url: string
                share_weibo_desc: string
                share_desc: string
                share_title: string
                share_title_myself: string
                share_title_other: string
                share_desc_info: string
            }
            mix_type: number
            create_time: number
            update_time: number
            ids: any
            watched_item: string
            is_serial_mix: number
            mix_pic_type: number
            enable_ad: number
            is_iaa: number
        }
        enable_comment_sticker_rec: boolean
        ref_tts_id_list: any
        media_type: number
        anchors: any
        hybrid_label: any
        geofencing_regions: any
        item_title: string
        aweme_acl?: {
            download_mask_panel: {
                code: number
                show_type: number
            }
        }
        visual_search_info: {
            is_show_img_entrance: boolean
            is_ecom_img: boolean
        }
        is_story: number
        video_game_data_channel_config: {}
        user_recommend_status: number
        is_24_story: number
        cover_labels: any
        entertainment_product_info: {
            sub_title: any
            market_info: {
                limit_free: {
                    in_free: boolean
                }
                marketing_tag: any
            }
        }
        voice_modify_id_list: any
        guide_btn_type: number
        boost_status: number
        tts_id_list: any
        images?: Array<{
            uri: string
            url_list: Array<string>
            download_url_list: Array<string>
            height: number
            width: number
            mask_url_list: any
            interaction_stickers: any
        }>
        relation_labels: any
        activity_video_type: number
        impression_data: {
            group_id_list_a: Array<number>
            group_id_list_b: Array<number>
            similar_id_list_a: any
            similar_id_list_b: any
            group_id_list_c: Array<number>
        }
        dislike_dimension_list_v2: any
        author_mask_tag: number
        libfinsert_task_id: string
        social_tag_list: any
        suggest_words: {
            suggest_words: Array<{
                words: Array<{
                    word: string
                    word_id: string
                    info: string
                }>
                scene: string
                icon_url: string
                hint_text: string
            }>
        }
        enterprise_info: {
            tag_infos: any
        }
        show_follow_button: {}
        duet_aggregate_in_music_tab: boolean
        is_duet_sing: boolean
        comment_permission_info: {
            comment_permission_status: number
            can_comment: boolean
            item_detail_entry: boolean
            press_entry: boolean
            toast_guide: boolean
        }
        original_images: any
        series_paid_info: {
            series_paid_status: number
            item_price: number
        }
        img_bitrate?: Array<any>
        comment_gid: number
        image_album_music_info: {
            begin_time: number
            end_time: number
            volume: number
        }
        video_tag: Array<{
            tag_id: number
            tag_name: string
            level: number
        }>
        is_collects_selected: number
        chapter_list: any
        feed_comment_config: {}
        is_image_beat: boolean
        dislike_dimension_list: any
        standard_bar_info_list: any
        photo_search_entrance: {
            ecom_type: number
        }
        danmaku_control?: {
            enable_danmaku: boolean
            post_privilege_level: number
            is_post_denied: boolean
            post_denied_reason: string
            skip_danmaku: boolean
            danmaku_cnt: number
            activities: any
        }
        is_life_item: boolean
        image_list: any
        component_info_v2: string
        common_bar_info: string
        favour_rp_no?: string
        horizontal_type?: number
        image_item_quality_level?: number
        is_multi_content?: number
        anchor_info?: {
            type: number
            id: string
            icon: {
                uri: string
                url_list: Array<string>
                width: number
                height: number
                url_key: string
            }
            title: string
            open_url: string
            web_url: string
            mp_url: string
            title_tag: string
            display_info: {
                after_play_ms: number
            }
            content: string
            style_info: {
                default_icon: string
                scene_icon: string
                extra: string
            }
            extra: string
            log_extra: string
        }
    }>
    time_list: Array<string>
    log_pb: {
        impr_id: string
    }
    request_item_cursor: number
    post_serial: number
    replace_series_cover: number


}