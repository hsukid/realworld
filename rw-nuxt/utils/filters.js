import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'

dayjs.extend(advancedFormat)
export const dater = (t) => dayjs(t).format('MMM D, YYYY')
