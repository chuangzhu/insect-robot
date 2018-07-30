//app.js
App({
  onLaunch: function () {
    const self = this
    // 必须采用同步方式来阻塞线程
    // 否则页面会先于 globalData 加载
    var language = wx.getStorageSync('language') || 'zh'
    self.globalData.language = language
    self.globalData.trans = require('./utils/util.js').getTrans(language)
  },
  globalData: {
    language: 'zh',
    trans: {}
  }
})