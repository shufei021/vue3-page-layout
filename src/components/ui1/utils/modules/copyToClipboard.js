/**
 * 复制字符串到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} - 成功返回 true，失败返回 false
 */
export default async  function copyToClipboard(text) {
  if (typeof text !== 'string') {
    console.error('copyToClipboard: 参数必须是字符串');
    return false;
  }

  // 检查是否支持 Clipboard API
  if (!navigator.clipboard) {
    console.warn('当前环境不支持 navigator.clipboard，请使用 HTTPS 或 localhost');
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    console.log('✅ 文本已复制到剪贴板:', text);
    return true;
  } catch (err) {
    console.error('❌ 复制失败:', err);
    return false;
  }
}