/* eslint max-len: 0 */
export const subscribersGained = {
  series: [{
    name: '用户数',
    data: [28, 40, 36, 52, 38, 60, 55],
  }],
  chartOptions: {
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
  },
}

export const ordersRecevied = {
  series: [{
    name: '交易量',
    data: [10, 15, 8, 15, 7, 12, 8],
  }],
  chartOptions: {
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
    colors: ['#FF9F43'],
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
  },
}

export const salesBar = {
  series: [{
    name: '交易额',
    data: [75, 125, 225, 175, 125, 75, 25],
  }],
  chartOptions: {
    chart: {
      type: 'bar',
      sparkline: { enabled: true },
      toolbar: { show: false },
    },
    states: {
      hover: {
        filter: 'none',
      },
    },
    colors: ['#e6edf7', '#e6edf7', '#6165f7', '#e6edf7', '#e6edf7', '#e6edf7'],
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
        endingShape: 'rounded',
      },
    },
    tooltip: {
      x: { show: false },
    },
  },
}

export const userRank = [
  {
    avatar_url: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/avatar-s-6.0c96c10d.jpg', nickname: '令狐冲', description: '二句三年得，一吟双泪流。', amount: 4752,
  },
  {
    avatar_url: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/avatar-s-19.697c72c8.jpg', nickname: '郭靖', description: '举头望明月，低头思故乡', amount: 3875.5,
  },
  {
    avatar_url: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/avatar-s-6.0c96c10d.jpg', nickname: '杨过', description: '记得当年草上飞，红军队里每相违。', amount: 3512,
  },
  {
    avatar_url: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/avatar-s-17.2a01b307.jpg', nickname: '段誉', description: '举头西北浮云，倚天万里须长剑。', amount: 2845,
  },
  {
    avatar_url: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/avatar-s-14.c352e978.jpg', nickname: '小龙女', description: '满堂花醉三千客，一剑霜寒十四州。', amount: 2200,
  },
  {
    avatar_url: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/avatar-s-17.2a01b307.jpg', nickname: '黄蓉', description: '水作青龙盘石堤，桃花夹岸鲁门西。', amount: 1874.4,
  },
  {
    avatar_url: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/avatar-s-17.2a01b307.jpg', nickname: '段誉', description: '举头西北浮云，倚天万里须长剑。', amount: 1423.8,
  },
]

export const keywordList = [
  {
    rank: 1, word: '关键词1', count: 978, user_num: 921, increase: 56,
  },
  {
    rank: 2, word: '关键词2', count: 854, user_num: 874, increase: 12,
  },
  {
    rank: 3, word: '关键词3', count: 784, user_num: 741, increase: 41,
  },
  {
    rank: 4, word: '关键词4', count: 741, user_num: 645, increase: 20,
  },
  {
    rank: 5, word: '关键词5', count: 712, user_num: 636, increase: 30,
  },
  {
    rank: 6, word: '关键词6', count: 687, user_num: 612, increase: 11,
  },
  {
    rank: 7, word: '关键词7', count: 654, user_num: 689, increase: 14,
  },
  {
    rank: 8, word: '关键词8', count: 621, user_num: 540, increase: 18,
  },
]

export const salesMonthBar = {
  series: [{
    name: '交易额',
    data: [75, 125, 225, 175, 125, 125, 75, 140, 80, 55, 125],
  }],
  chartOptions: {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      labels: {
        style: {
          colors: '#999',
        },
      },
      position: 'bottom',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#999',
          fontSize: '14px',
        },
      },
    },
    states: {
      hover: {
        filter: 'none',
      },
    },
    colors: ['#6165f7'],
    plotOptions: {
      bar: {
        columnWidth: '40%',
        distributed: true,
        endingShape: 'rounded',
      },
    },
    tooltip: {
      x: { show: false },
    },
  },
}
