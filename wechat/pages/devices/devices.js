// pages/devices/devices.js
var app = getApp()

function buf2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf))
}

function buf2hex(buf) {
  var res = ''
  for (var x of new Uint8Array(buf))
    res += ('00' + x.toString(16)).slice(-2) //complete to two hex digit.
  return res
}

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

  deviceList: [],

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this
    wx.onBluetoothDeviceFound(function(res){
      for (var item of res.devices) {
        var color
        // 只有名称为 '$sect' 才获取颜色
        if (item.name == '$sect') {
          color = buf2hex(item.advertisData)
        } else color = 'ffffff' // 否则为白色
        self.deviceList.push({ name: item.name, id: item.deviceId, color: color })
      }
      self.setData({ deviceList: self.deviceList })
      console.log(res.devices)
    })
    //开始寻找设备
    wx.startBluetoothDevicesDiscovery()
    setTimeout(function () {
      wx.stopBluetoothDevicesDiscovery()
      self.setData({ deviceList: self.deviceList })
      wx.stopPullDownRefresh()
    }, 2000)
  },

  /** Re-search Ble devices */
  searchButtonClick: function () {
    var self = this
    self.deviceList = []
    wx.closeBluetoothAdapter({
      fail: function (res) {
        self.setData({ errDisplay: 'block' })
        console.log(res)
      },
      success: function () {
        wx.openBluetoothAdapter({
          fail: function (res) {
            self.setData({ errDisplay: 'block' })
            console.log(res)
          },
          success: function () {
            self.setData({ errDisplay: 'none' })
            wx.showToast({ title: '搜索中...', icon: 'loading' })
            wx.startPullDownRefresh()
          }
        })
      }
    })
  },

  /**
   * 选择设备
   */
  deviceClick: function (tap) {
    for (var i of this.deviceList)
      if ((i.id == tap.target.id) && (i.name != '$sect')){
        wx.showModal({
          title: '这不是可用的设备',
          content: '可用的设备应该以 “$sect” 为名，并且显示为彩色',
          showCancel: false,
          confirmText: '知道了'
        })
        return // 退出函数 
      }
    var self = this
    var id = tap.target.id
    console.log(id)
    wx.showToast({ title: '正在连接...', icon:'loading' })
    // 连接BLE
    wx.createBLEConnection({
      deviceId: id,
      success: function(res) {
        wx.showToast({ title: '连接成功', icon: 'ok' })
        wx.redirectTo({
          url: '../console/console?id=' + id,
        })
      },
      fail: function(res) {
        wx.showToast({ title: '连接失败', icon: 'none' })
        console.log(res)
      }
    })
  },

  /**
 * 生命周期函数--监听页面隐藏
 */
  onHide: function () {
    // 停止自动刷新
    clearInterval(this.refreshInt)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('page devices unload')
  }
})
