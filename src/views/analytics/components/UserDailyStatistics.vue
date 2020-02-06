<template>
  <div>
    <p class="pt-6 pb-4 text-xl text-primary font-bold">
      每日新增用户统计
    </p>
    <div class="px-10 radius bg-gray">
      <div class="pt-6 pb-4 flex justify-end items-center">
        <div class="mr-auto">
          <span class="primary text-sm mr-3 cursor-pointer">最近一周</span>
          <span class="text-semi text-sm mr-3 cursor-pointer">最近15天</span>
        </div>

        <div class="w-40 h-10 mr-4 flex-row-center text-sm text-semi
         bg-primary rounded-lg cursor-pointer">
          <span>用户数量(人)</span>
          <feather
            size="20"
            type="chevron-down"
            class="ml-3"
          ></feather>
        </div>
        <div
          title="导出统计图"
          class="w-10 h-10 flex-row-center rounded-lg primary-semi bg-primary cursor-pointer"
          @click="$refs.userChart.downloadPNG()"
        >
          <feather
            size="22"
            type="download"
          ></feather>
        </div>
      </div>
      <LineChart
        ref="userChart"
        height="400px"
        type="area"
        :options="options"
        :series="series"
        @downloadPNG="downloadPNG"
      />
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'

import { getUserDailyStatistics } from '@/request/api/user'

const chartOptions = {
  chart: {
    toolbar: { show: false },
  },
  xaxis: {
    categories: [],
    axisBorder: {},
    labels: {
      style: {
        colors: '',
      },
    },
  },
  yaxis: {
    axisBorder: {},
    labels: {
      style: {
        fontSize: '14px',
        colors: '',
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 100],
    },
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3, lineCap: 'round' },
  grid: {
    show: true,
    strokeDashArray: 0,
    position: 'back',
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    row: {
      colors: undefined,
      opacity: 0.5,
    },
    column: {
      colors: undefined,
      opacity: 0.5,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 10,
    },
  },
  colors: ['#6165f7'],
}
export default {
  name: 'UserDailyStatistics',
  components: { LineChart },

  data: () => ({
    userList: [],
    categories: [],
    series: [],
  }),

  computed: {
    options() {
      const opt = this.$cloneDeepWith(chartOptions)
      opt.xaxis.categories = this.categories
      const theme = this.$store.state.themeStyle
      if (theme === 'light') {
        this.$set(opt.chart, 'background', '#fff')
        this.$set(opt.grid, 'borderColor', '#ddd')
        this.$set(opt.xaxis.axisBorder, 'color', '#ddd')
        this.$set(opt.xaxis.labels.style, 'colors', '#8b99a8')
        this.$set(opt.yaxis.labels.style, 'color', '#8b99a8')
        return opt
      }
      this.$set(opt.chart, 'background', '#333644')
      this.$set(opt.grid, 'borderColor', '#525465')
      this.$set(opt.xaxis.axisBorder, 'color', '#525465')
      this.$set(opt.xaxis.labels.style, 'colors', '#9c9ea6')
      this.$set(opt.yaxis.labels.style, 'color', '#9c9ea6')
      return opt
    },
  },

  activated() {
    this.getUserDailyStatistics()
  },

  methods: {
    // 获取用户每日新增人数数据
    async getUserDailyStatistics() {
      const dateNow = Date.now()
      const date_list = [...Array(7)].map((v, i) => this.$dayjs(dateNow).subtract(i, 'day').format('YYYY-MM-D'))
      const date = date_list.map(el => this.$dayjs(el).format('M-DD')).reverse()
      const { code, data } = await getUserDailyStatistics({ date_list: date_list.reverse() })
      if (code === 2000) {
        this.categories = date
        this.series = data.series
        this.series = [{
          name: '用户数量',
          data: [10, 12, 9, 13, 10, 14, 12],
        }]
      }
    },

    // 导出统计图
    downloadPNG(base64) {
      const link = document.createElement('a')
      link.href = base64
      link.download = '新增用户统计表格.png'
      link.click()
    },
  },
}
</script>
