// pages/console/console.js
var app = getApp()

function str2buf(str) {
  var buf = new ArrayBuffer(str.length)
  var bufView = new Uint8Array(buf)
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

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
    wx.getBLEDeviceServices({
      deviceId: app.globalData.connectDev,
      success: function(res) {console.log(res)},
    })
  },

  eleClick: function (button) {
    var self = this
    var message, direction
    if (button.target.id == 'button-left') {
      message = 'EL:LLL'
      direction = 'right'
    } else if (button.target.id == 'button-right') {
      message = 'EL:RRR'
      direction = 'left'
    }
    wx.writeBLECharacteristicValue({
      deviceId: app.globalData.connectDev,
      serviceId: '0000FFE5-0000-1000-8000-00805F9B34FB',
      characteristicId: '0000FFE9-0000-1000-8000-00805F9B34FB',
      value: str2buf(message),
      success: function (res) { self.beetleAni(direction) },
      fail: function (res) {
        wx.showToast({ title: '操作失败', icon: 'none' })
        console.log(res)
      }
    })
  },

  beetleAni: function (direction) {
    if (direction === 'left')
      this.animation.rotate(-45).step()
    else if (direction === 'right')
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
  }
})
