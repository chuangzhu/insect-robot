// pages/credits/credits.js

const lang = require('../../trans/en.js').credits

Page({

  /**
   * Initial data
   */
  data: {
    lang: lang
  },

  clickLink: function (text) {
    wx.setNavigationBarTitle({ title: lang.title })
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
  }
})