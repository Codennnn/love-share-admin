<template>
  <div class="pt-6">
    <!-- 统计卡片 -->
    <UserStatistics />

    <!-- 用户列表 -->
    <div class="p-4 radius bg-semi overflow-hidden">
      <vs-table
        search
        pagination
        noDataText="暂无数据"
        :max-items="4"
        :data="userList"
      >
        <template slot="thead">
          <vs-th>头像</vs-th>
          <vs-th>昵称</vs-th>
          <vs-th>信用度</vs-th>
          <vs-th>乐享值</vs-th>
          <vs-th>注册时间</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr
            v-for="(tr, i) in data"
            :key="i"
          >
            <vs-td>
              <vs-avatar
                size="40px"
                :src="`${tr.avatar_url}?imageView2/2/w/40`"
              />
            </vs-td>
            <vs-td class="font-bold">{{ tr.nickname }}</vs-td>
            <vs-td>
              <vs-progress
                :height="8"
                :title="`${tr.credit_value}分`"
                :percent="(tr.credit_value / 1000) * 100"
                :color="setCreditColor(tr.credit_value)"
              ></vs-progress>
            </vs-td>
            <vs-td>
              <p class="ml-4 font-bold">{{ tr.share_value }}</p>
            </vs-td>
            <vs-td>
              <p>{{ $dayjs(tr.created_at).format('YYYY/MM/DD') }}</p>
            </vs-td>
            <vs-td>
              <div class="text-center">
                <vs-dropdown>
                  <i class="el-icon-more-outline"></i>
                  <vs-dropdown-menu class="w-24">
                    <vs-dropdown-item class="text-center">
                      <i class="el-icon-chat-round mr-2"></i>
                      <span>联系</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item
                      class="text-center"
                      @click="$router.push({
                              path: '/user-detail',
                              query: { userId: tr._id }
                            })"
                    >
                      <i class="el-icon-news mr-2"></i>
                      <span>查看</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item
                      class="text-center danger"
                      divider
                    >
                      <i class="el-icon-delete mr-2"></i>
                      <span>删除</span>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <!-- 新增用户统计图 -->
    <p class="pt-6 pb-4 text-xl text-primary font-bold">
      日新增用户统计
    </p>
    <div class="px-6 radius bg-gray">
      <div class="pt-6 pb-4 px-8 flex justify-between items-center">
        <div>
          <span class="primary text-sm mr-3 cursor-pointer">最近一周</span>
          <span class="text-semi text-sm mr-3 cursor-pointer">最近15天</span>
        </div>

        <div
          title="导出统计图"
          class="py-2 px-3 rounded-lg cursor-pointer"
          style="background: rgba(var(--vs-primary), 0.1);"
          @click="$refs.userChart.downloadPNG()"
        >
          <DownloadIcon
            size="1.3x"
            class="primary"
          />
        </div>
      </div>
      <LineChart
        ref="userChart"
        :settings="settings"
        :series="series"
        @downloadPNG="downloadPNG"
      />
    </div>
  </div>
</template>

<script>
import _cloneDeepWith from 'lodash/cloneDeepWith'
import { DownloadIcon } from 'vue-feather-icons'
import { setCreditColor } from '@/utils/util'
import UserStatistics from './components/UserStatistics.vue'
import LineChart from '@/components/LineChart.vue'

import { getUserList, getUserDailyStatistics } from '@/request/api/user'

const chartSettings = {
  type: 'area',
  height: '400px',
  chartOptions: {
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
  },
}
export default {
  name: 'UserList',
  components: {
    UserStatistics, DownloadIcon, LineChart,
  },

  data: () => ({
    setCreditColor,
    chartSettings,
    userList: [],
    series: [],
  }),

  computed: {
    settings() {
      const theme = this.$store.state.themeStyle
      if (theme === 'light') {
        this.$set(this.chartSettings.chartOptions.grid, 'borderColor', '#ddd')
        this.$set(this.chartSettings.chartOptions.xaxis.axisBorder, 'color', '#ddd')
        this.$set(this.chartSettings.chartOptions.xaxis.labels.style, 'colors', '#8b99a8')
        this.$set(this.chartSettings.chartOptions.yaxis.labels.style, 'color', '#8b99a8')
        return _cloneDeepWith(this.chartSettings)
      }
      this.$set(this.chartSettings.chartOptions.grid, 'borderColor', '#525465')
      this.$set(this.chartSettings.chartOptions.xaxis.axisBorder, 'color', '#525465')
      this.$set(this.chartSettings.chartOptions.xaxis.labels.style, 'colors', '#9c9ea6')
      this.$set(this.chartSettings.chartOptions.yaxis.labels.style, 'color', '#9c9ea6')
      return _cloneDeepWith(this.chartSettings)
    },
  },

  created() {
    this.getUserList()
    this.getUserDailyStatistics()
  },

  methods: {
    async getUserList() {
      const { code, data } = await getUserList()
      if (code === 2000) {
        this.userList = data.user_list
      }
    },

    async getUserDailyStatistics() {
      const dateNow = Date.now()
      const date_list = [...Array(7)].map((v, i) => this.$dayjs(dateNow).subtract(i, 'day').format('YYYY-MM-DD'))
      const { code, data } = await getUserDailyStatistics({ date_list: date_list.reverse() })
      if (code === 2000) {
        this.$set(this.chartSettings.chartOptions.xaxis, 'categories', date_list)
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

<style lang="scss" scoped>
</style>
