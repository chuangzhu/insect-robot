// pages/credits/credits.js
Page({

  /**
   * Initial data
   */
  data: {},

  clickLink: function (text) {
    wx.setClipboardData({
      data: text.target.id,
      fail: function () {
        wx.showModal({
          title: '链接复制失败',
          content: '请检查微信的权限。这个链接是 ' + text.target.id,
          showCancel: false,
          confirmText: '好的'
        })
      },
      success: function () {
        wx.showModal({
          title: '链接已复制到你的剪贴板',
          content: '请在浏览器中粘贴访问，' + text.target.id,
          showCancel: false,
          confirmText: '好的'
        })
      }
    })
  }
})