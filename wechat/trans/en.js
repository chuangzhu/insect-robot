/**
 * There is no privilege for mimi programs to read files
 * So I use a JS object to store translations
 * Then we can import this module using require.js
 */

module.exports = {
  devices: {
    title: 'Devices Around',

    btWarn: 'Please activate bluetooth in settings',
    selectDev: 'Select your device below: ',
    searchBtn: 'Search again',
    tryConsole: 'Try console',

    searchingToast: 'Searching...',
    unAvaDevModalTitle: 'Not an Avalable Device',
    unAvaDevModalContent: 'An avalable device should be named with "$sect", and is colored',
    unAvaDevModalConfirm: 'Got it',
    connectingToast: 'Connecting...',
    connectedToast: 'Connected',
    connectFailedToast: 'Connect failed'
  },
  console: {
    title: 'Console Panel',
    cdToast: 'Cooling Down',
    writeFailToast: 'Operation Failed'
  },
  credits: {
    title: 'Credits',
    openAnnounce: 'An open source hardware (OSHW) project, all code and design documents are accessable in the link below. Follow the introductions to make a device yourself.',
    ghLink: 'GitHub Link Address: \n',
    materialCredit: 'Credits of Materials',

    copyFailTitle: 'Failed to Copy',
    copyFailInfo: 'Checkout the privilege of WeChat, this link is ',
    copyConfirm: 'OK',
    copySuccessTitle: 'Link Copied',
    copySuccessInfo: 'Paste it in your browser, ',
  }
}