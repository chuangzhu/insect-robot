
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

module.exports = {
  getForeColor: getForeColor
}
