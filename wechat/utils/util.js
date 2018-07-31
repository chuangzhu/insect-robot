
/**
 * 根据背景色计算前景色
 * 背景颜色较浅时，前景为黑色。反之为白色。
 * @param backgroundColor
 * hex 表达的背景色，不包括 '#'
 */
function getForeColor(backgroundColor) {
  var rgb = [0, 0, 0]
  for (var i = 0; i <= 2; i++)
    rgb[i] = parseInt(backgroundColor.slice(2 * i, 2 * i + 2), 16)
  // 公式来源：https://en.wikipedia.org/wiki/Grayscale
  var gray = rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
  return (gray > 127) ? '#000000' : '#ffffff'
}

/**
 * 通过语言代码获取 trans 下的语言包
 * Get language pack using langCode
 * @param langCode
 * 语言代码，诸如 zh、en
 * Such as zh, en
 */
function getTrans(langCode) {
  return require({
    zh: '../trans/zh.js',
    en: '../trans/en.js'
  }[langCode] || '../trans/zh.js')
  // 如果本地储存中 language 为 zh 则显示中文
  // if 'language' in local storage is 'en', then display English
  // 如果没有 language 储存，则默认显示中文
  // if 'language' is not exist in local storage, then diaplay Chinese
}

module.exports = {
  getForeColor: getForeColor,
  getTrans: getTrans
}
