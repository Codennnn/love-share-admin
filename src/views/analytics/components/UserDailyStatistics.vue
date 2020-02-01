<template>
  <div>
    <p class="pt-6 pb-4 text-xl text-primary font-bold">
      每日新增用户统计
    </p>
    <div class="px-6 radius bg-gray">
      <div class="pt-6 pb-4 px-8 flex justify-between items-center">
        <div>
          <span class="primary text-sm mr-3 cursor-pointer">最近一周</span>
          <span class="text-semi text-sm mr-3 cursor-pointer">最近15天</span>
        </div>

        <div
          title="导出统计图"
          class="py-2 px-3 rounded-lg primary-semi bg-main-10 cursor-pointer"
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
        :options="options"
        :series="series"
        @downloadPNG="downloadPNG"
      />
    </div>
  </div>
</template>

<script>
import _cloneDeepWith from 'lodash/cloneDeepWith'
import LineChart from '@/components/LineChart.vue'

import { getUserDailyStatistics } from '@/request/api/user'

const chartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
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
  dataLabels: {
    enabled: false,
  },
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
      right: 20,
      bottom: 0,
      left: 20,
    },
  },
  colors: ['#6165f7'],
}
export default {
  name: 'UserDailyStatistics',
  components: { LineChart },

  data: () => ({
    userList: [],
    series: [],
  }),

  computed: {
    options() {
      const opt = _cloneDeepWith(chartOptions)
      const theme = this.$store.state.themeStyle
      if (theme === 'light') {
        this.$set(opt.grid, 'borderColor', '#ddd')
        this.$set(opt.xaxis.axisBorder, 'color', '#ddd')
        this.$set(opt.xaxis.labels.style, 'colors', '#8b99a8')
        this.$set(opt.yaxis.labels.style, 'color', '#8b99a8')
        return opt
      }
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
    async getUserDailyStatistics() {
      const dateNow = Date.now()
      const date_list = [...Array(7)].map((v, i) => this.$dayjs(dateNow).subtract(i, 'day').format('YYYY-MM-DD'))
      const { code, data } = await getUserDailyStatistics({ date_list: date_list.reverse() })
      if (code === 2000) {
        this.$set(chartOptions.xaxis, 'categories', date_list)
        this.series = data.series
        this.series = [{
          name: '用户数量',
          data: [10, 7, 11, 13, 10, 14, 12],
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
