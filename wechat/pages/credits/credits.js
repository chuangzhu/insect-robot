// pages/credits/credits.js
Page({

  /**
   * Initial data
   */
  data: {},

  showLink: function (text) {
    wx.showToast({
      title: text.target.id,
      icon: 'none'
    })
  }
})