/* eslint no-console: 0 */

import _cloneDeepWith from 'lodash/cloneDeepWith'
import { Notification } from 'element-ui'

export function timeDiff(time) {
  let date
  if (typeof time === 'number') {
    if (String(time).length === 13) {
      date = this.$dayjs(time)
    } else {
      date = this.$dayjs.unix(time)
    }
  } if (typeof time === 'string') {
    date = this.$dayjs(time)
  }

  const now = this.$dayjs()
  const diff = now.diff(date, 'day')
  if (diff < 30) {
    if (diff === 0) {
      const diffHour = now.diff(date, 'hour')
      if (diffHour < 1) {
        const diffMin = now.diff(date, 'minute')
        if (diffMin < 1) {
          return `${now.diff(date, 'second')}秒前`
        }
        return `${diffMin}分钟前`
      }
      if (diffHour <= 24) {
        return `${diffHour}小时前`
      }
      return '今天'
    }
    if (diff === 1) {
      return '昨天'
    }
    return `${diff}天前`
  }
  if (diff >= 30 && diff < 365) {
    return `${now.diff(date, 'month')}个月前`
  } if (diff >= 365 && diff < 365 * 2) {
    return `${now.diff(date, 'year')}年前`
  }
  return date.format('YYYY-MM-DD')
}

export function setCreditColor(val) {
  if (val >= 500 && val <= 690) {
    return 'primary'
  }
  if (val > 690) {
    return 'success'
  }
  if (val < 490 && val >= 390) {
    return 'warning'
  }
  if (val < 390) {
    return 'danger'
  }
  return 'primary'
}

export function numFixed(num, digit = 2) {
  return Number(num).toFixed(digit)
}

export async function loading(fn, {
  color = 'primary', type = 'default', scale = 1, text = '', background = 'rgba(255, 255, 255,.8)', container,
}, finallyMethod, catchMethod) {
  this.$vs.loading({
    color, scale, type, text, container, background,
  })
  try {
    await fn()
  } catch (err) {
    if (catchMethod) catchMethod(err)
  } finally {
    this.$vs.loading.close(`${container} > .con-vs-loading`)
    if (finallyMethod) finallyMethod()
  }
}

export function errorNotify({
  title = '哎呀！', message = '出错啦！', duration = 5000,
} = {}) {
  Notification.error({ title, message, duration })
}

export const areaChartOptions = {
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  chart: {
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2.5,
  },
  colors: ['#7367F0'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.7,
      opacityTo: 0.5,
      stops: [0, 80, 100],
    },
  },
  xaxis: {
    type: 'numeric',
    lines: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: { show: false },
  },
  yaxis: [{
    y: 0,
    offsetX: 0,
    offsetY: 0,
    padding: { left: 0, right: 0 },
  }],
  tooltip: {
    x: { show: false },
  },
}

export function consoleLog(log, leftLabel = 'Axios', rightLabel = 'error') {
  if (process.env.NODE_ENV !== 'production') {
    const baseStyle = 'padding:0.2rem 0.3rem;color:white;'
    const style1 = `${baseStyle}border-radius:1rem 0 0 1rem;background: rgb(53,73,94);`
    const style2 = `${baseStyle}border-radius:0 1rem 1rem 0;background: #EA5455;`
    console.log(`%c${leftLabel}%c${rightLabel}`, style1, style2, log)
  }
}

export const cloneDeepWith = _cloneDeepWith
