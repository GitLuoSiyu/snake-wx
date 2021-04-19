// pages/home/home.js

import {
    Theme
} from "../../models/theme";
import {
    Banner
} from "../../models/banner";
import {
    Category
} from "../../models/category";
import {
    Activity
} from "../../models/activity";
import {
    SpuPaging
} from "../../models/spu-paging";
import {
    CouponCenterType
} from "../../core/enum";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        bannerB: {
            "id": 2,
            "name": "b-2",
            "description": "热销商品banner",
            "img": "http://i2.sleeve.7yue.pro/m4.png",
            "title": null,
            "items": [
                {
                    "id": 5,
                    "img": "http://i2.sleeve.7yue.pro/m6.png",
                    "keyword": "28",
                    "type": 1,
                    "name": "left",
                    "banner_id": 2
                },
                {
                    "id": 6,
                    "img": "http://i2.sleeve.7yue.pro/m7.png",
                    "keyword": "26",
                    "type": 1,
                    "name": "right-top",
                    "banner_id": 2
                },
                {
                    "id": 7,
                    "img": "http://i2.sleeve.7yue.pro/m8.png",
                    "keyword": "27",
                    "type": 1,
                    "name": "right-bottom",
                    "banner_id": 2
                }
            ]
        },
        grid: [],
        activityD: null,
        spuPaging: null,
        loadingType: 'loading'
    },

    async onLoad(options) {
        // this.initAllData()
        // this.initBottomSpuList()
    },

    async initBottomSpuList() {
        const paging = SpuPaging.getLatestPaging()
        this.data.spuPaging = paging
        const data = await paging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
    },

    async initAllData() {
        const theme = new Theme()
        await theme.getThemes()

        const themeA = theme.getHomeLocationA()
        const themeE = theme.getHomeLocationE()
        let themeESpu = []

        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }

        const themeF = theme.getHomeLocationF()

        const bannerB = await Banner.getHomeLocationB()
        const grid = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()

        const bannerG = await Banner.getHomeLocationG()

        const themeH = theme.getHomeLocationH()

        this.setData({
            themeA,
            bannerB,
            grid,
            activityD,
            themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH
        })
    },

    onGoToCoupons(event) {
        const name = event.currentTarget.dataset.aname
        wx.navigateTo({
            url: `/pages/coupon/coupon?name=${name}&type=${CouponCenterType.ACTIVITY}`
        })
    },

    onGoToTheme(event) {
        const tName = event.currentTarget.dataset.tname
        wx.navigateTo({
            url: `/pages/theme/theme?tname=${tName}`
        })
    },

    onGoToBanner(event) {
        const keyword = event.currentTarget.dataset.keyword
        const type = event.currentTarget.dataset.type
        Banner.gotoTarget(type, keyword)
    },

    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
        if (!data.moreData) {
            this.setData({
                loadingType: 'end'
            })
        }
    },

    onPullDownRefresh: function () {

    },


    onShareAppMessage: function () {

    }
})