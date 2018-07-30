/**
 * 微信小程序没有读取文件的权能
 * 它的 require 也不像标准版本那样可以读取 JSON
 * 所以我用 JS 对象来储存翻译
 * 这样就可以通过 require 导入这个模块
 */

module.exports = {
  devices: {
    title: '周围的设备',

    btWarn: '请在设置中打开蓝牙',
    selectDev: '选择你的设备：',
    searchBtn: '重新搜索',
    tryConsole: '尝试使用控制台',

    searchingToast: '搜索中...',
    unAvaDevModalTitle: '这不是可用的设备',
    unAvaDevModalContent: '可用的设备应该以 “$sect” 为名，并且显示为彩色',
    unAvaDevModalConfirm: '知道了',
    connectingToast: '正在连接...',
    connectedToast: '连接成功',
    connectFailedToast: '连接失败'
  },
  console: {
    title: '控制台',
    cdToast: '技能 CD 中',
    writeFailToast: '操作失败'
  },
  credits: {
    title: '有关',
    openAnnounce: '这个项目是开源的，你可以在项目链接中获取所有代码和设计文件。也可以按照链接中的说明，自己制作一个这样的设备。',
    ghLink: 'GitHub 链接：\n',
    materialCredit: '素材鸣谢',

    copyFailTitle: '链接复制失败',
    copyFailInfo: '请检查微信的权限。这个链接是 ',
    copyConfirm: '好的',
    copySuccessTitle: '链接已复制到你的剪贴板',
    copySuccessInfo: '请在浏览器中粘贴访问，',
    takeEffectNextStart: '下次启动时生效'
  }
}