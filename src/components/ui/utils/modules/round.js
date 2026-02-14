/**
 * 四舍五入到指定位数
 * @param {Number} n:小数
 * @param {Number} decimals ：四舍五入到指定位数
 */
const round = function (n, decimals) {
    if (decimals === undefined) return n
    return Number(Math.round(n + 'e' + (decimals || 0)) + 'e-' + (decimals || 0))
}
export default round