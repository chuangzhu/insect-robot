// pages/devices/devices.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errDisplay: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    //不断尝试打开蓝牙
    this.blueInt = setInterval(function () {
      wx.openBluetoothAdapter({
        fail: function (res) {
          self.setData({ errDisplay: 'block' })
        },
        success: function (res) {
          clearInterval(self.blueInt) //成功后停止尝试
          self.setData({ errDisplay: 'none' })
          setInterval(wx.startPullDownRefresh, 3500)
        },
      })
    }, 500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this
    this.deviceList = []
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})