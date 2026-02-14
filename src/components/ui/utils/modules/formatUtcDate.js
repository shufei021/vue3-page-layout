
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

/**
 * 将输入日期（本地时间）转换为 UTC 时间字符串（用于搜索）
 * @param {string | Date | Dayjs} date
 * @param {'normal' | 'start' | 'end'} type
 * @returns {string | undefined}
 */
export default function formatUtcDate(date, type = "normal") {
  if (!date) return;

  const localDay = dayjs(date); // 统一解析为本地时间

  let result;
  if (type === "start") {
    result = localDay.startOf('day').utc();
  } else if (type === "end") {
    result = localDay.endOf('day').utc();
  } else {
    result = localDay.utc();
  }

  return result.toISOString(); 
}