// pages/devices/devices.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    errDisplay: 'none',
    searchButtonDisabled: true
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
          self.setData({ errDisplay: 'block' }) //显示错误提示
        },
        success: function (res) {
          clearInterval(self.blueInt) //成功后停止尝试
          self.setData({ errDisplay: 'none' })
          wx.startPullDownRefresh()
          self.setData({ searchButtonDisabled: false })
          self.refreshInt = setInterval(wx.startPullDownRefresh, 8000)
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this
    self.deviceList = []
    wx.onBluetoothDeviceFound(function(res){
      for (var item of res.devices) {
        self.deviceList.push({ name: item.name, id: item.deviceId })
      }
      self.setData({deviceList: self.deviceList})
      console.log(res.devices)
    })
    //开始寻找设备
    wx.startBluetoothDevicesDiscovery()
    setTimeout(function () {
      wx.stopBluetoothDevicesDiscovery()
      wx.stopPullDownRefresh()      
    }, 2000)
  },

  searchButtonClick: function () {
    wx.showToast({ title: 'Searching ...', icon: 'loading' })
    wx.startPullDownRefresh()
  },

  /**
   * 选择设备
   */
  deviceClick: function (tap) {
    var self = this
    var id = tap.target.id
    console.log(id)
    //连接BLE
    wx.createBLEConnection({
      deviceId: id,
      success: function(res) {
        clearTimeout(self.refreshInt)
        app.globalData.connectDev = id
        wx.redirectTo({
          url: '../console/console',
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('page devices unload')
  }

})