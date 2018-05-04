// pages/console/console.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('page console onload')
    console.log(app.globalData.connectDev)
    this.animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
      transformOrigin: 'center'
    })
  },

  beetleAni: function (info) {
    if (info.target.id === 'button-right')
      this.animation.rotate(-45).step()
    else
      this.animation.rotate(45).step()
    this.animation.rotate(0).step()
    this.setData({
      //export() 会清除之前的动画操作
      animation: this.animation.export()
    })
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
    wx.closeBLEConnection({
      deviceId: app.globalData.connectDev
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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