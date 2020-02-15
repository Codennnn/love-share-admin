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
    avatar_url: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/avatar-s-19.697c72c8.jpg', nickname: '郭靖', description: '', amount: 3875.5,
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
