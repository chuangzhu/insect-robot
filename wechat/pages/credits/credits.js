// pages/credits/credits.js
const app = getApp()
const lang = app.globalData.trans.credits

Page({

  /**
   * Initial data
   */
  data: {
    lang: lang,
  },

  onLoad: function () {
    wx.setNavigationBarTitle({ title: lang.title })
    var checked = {}
    checked[app.globalData.language] = 'true'
    this.setData({
      checked: checked
    })
  },

  /**
   * 点击链接时 复制链接
   */
  clickLink: function (text) {
    wx.setClipboardData({
      data: text.target.id,
      fail: function () {
        wx.showModal({
          title: lang.copyFailTitle,
          content: lang.copyFailInfo + text.target.id,
          showCancel: false,
          confirmText: lang.copyConfirm
        })
      },
      success: function () {
        wx.showModal({
          title: lang.copySuccessTitle,
          content: lang.copySuccessInfo + text.target.id,
          showCancel: false,
          confirmText: lang.copyConfirm
        })
      }
    })
  },

  /**
   * 改变语言单选按钮
   */
  langChange: function (e) {
    wx.setStorage({
      key: 'language',
      data: e.detail.value,
      success: function () {
        app.globalData.language = e.detail.value
        wx.showToast({
          // 用户选择了什么语言就显示什么语言的弹窗
          title: require('../../utils/util.js')
            .getTrans(e.detail.value).credits.takeEffectNextStart,
          icon: 'none'
        })
      }
    })
  }
})