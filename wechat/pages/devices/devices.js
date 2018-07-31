// pages/devices/devices.js
const app = getApp()
const util = require('../../utils/util.js')
// 导入语言包，该小程序支持多语言
// Import language pack, this program support multilanguage
const trans = app.globalData.trans.devices

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
    trans: trans,
    errDisplay: 'none',
    searchButtonDisabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: trans.title })
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
   * 储存设备的数组
   * 每个设备的格式为 {name, id, color, fore}
   */
  deviceList: [],

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this
    wx.onBluetoothDeviceFound(function(res){
      for (var item of res.devices) {
        var color // 背景颜色
        // 只有名称为 '$sect' 才获取颜色
        if (item.name == '$sect') {
          color = buf2hex(item.advertisData)
        } else color = 'ffffff' // 否则为白色
        self.deviceList.push({
          name: item.name,
          id: item.deviceId,
          color: color,
          fore: util.getForeColor(color) // 前景色
        })
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

  /**
   * Re-search Ble devices
   * 重新搜索 BLE 设备
   */
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
            wx.showToast({ title: trans.searchingToast, icon: 'loading' })
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
    var dev = {} // {name, id, color, fore} 对象
    for (var i of this.deviceList) {
      if (i.id === tap.target.id) {
        dev = i
      }
    }
    console.log(dev.id)
    // 选择了非可用设备时的提示
    if (dev.name != '$sect') {
      wx.showModal({
        title: trans.unAvaDevModalTitle,
        content: trans.unAvaDevModalContent,
        showCancel: false,
        confirmText: trans.unAvaDevModalConfirm
      })
      return // 退出函数 
    }
    var self = this
    wx.showToast({ title: trans.connectingToast, icon:'loading' })
    // 连接BLE
    wx.createBLEConnection({
      deviceId: dev.id,
      success: function(res) {
        wx.showToast({ title: trans.connectedToast, icon: 'ok' })
        // 停止自动刷新
        clearInterval(self.refreshInt)
        // 这里使用重定向，因为有返回键的时候极易误操作，滑动返回
        wx.redirectTo({
          url: `../console/console?id=${dev.id}&color=${dev.color}`,
        })
      },
      fail: function(res) {
        wx.showToast({ title: trans.connectFailedToast, icon: 'none' })
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
