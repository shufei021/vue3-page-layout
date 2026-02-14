
const t = (v)=>{
  return v
}
// 表单校验：确保开始时间 >= 当前时间
export default function validateTimeRange(rule, value, callback) {
  if (!value || !value[0] || !value[1]) {
    return callback(new Error(t('voucher.date.selectCompleteTimeRange')));
  }

  const [startStr, endStr] = value
  const startTime = new Date(startStr).getTime()
  const endTime = new Date(endStr).getTime()
  const now = Date.now()

  if (startTime < now) {
    callback(new Error(t('voucher.date.startTimeNotEarlierThanNow')))
  } else if (endTime <= startTime) {
    callback(new Error(t('voucher.date.endTimeLaterThanStart')))
  } else {
    callback()
  }
}