<template>
  <div>
    <div class="mt-4 mb-8 py-6 px-4 radius bg-semi overflow-hidden">
      <vs-table
        search
        pagination
        noDataText="暂无数据"
        :max-items="itemsPerPage"
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

    <div class="p-6 radius bg-gray">
      <LineChart :settings="settings" />
    </div>
  </div>
</template>

<script>
import _cloneDeepWith from 'lodash/cloneDeepWith'
import { setCreditColor } from '@/utils/util'
import LineChart from '@/components/LineChart.vue'

import { getUserList } from '@/request/api/user'

export default {
  name: 'userList',
  components: { LineChart },

  data: () => ({
    setCreditColor,
    itemsPerPage: 4,
    userList: [],
    chartSettings: {
      type: 'line',
      height: '400px',
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
          axisBorder: {},
          labels: {
            style: {
              colors: [],
            },
          },
        },
        yaxis: {
          axisBorder: {},
          labels: {
            style: {
              fontSize: '14px',
              colors: [],
            },
          },
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
      series: [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70],
      }],
    },
  }),

  computed: {
    settings() {
      const theme = this.$store.state.themeStyle
      if (theme === 'light') {
        this.$set(this.chartSettings.chartOptions.chart, 'background', '#fff')
        this.$set(this.chartSettings.chartOptions.grid, 'borderColor', '#ddd')
        this.$set(this.chartSettings.chartOptions.xaxis.axisBorder, 'color', '#ddd')
        this.$set(this.chartSettings.chartOptions.xaxis.labels.style, 'colors', ['#8b99a8', '#8b99a8', '#8b99a8', '#8b99a8', '#8b99a8', '#8b99a8', '#8b99a8'])
        this.$set(this.chartSettings.chartOptions.yaxis.labels.style, 'color', '#8b99a8')
        return _cloneDeepWith(this.chartSettings)
      }
      this.$set(this.chartSettings.chartOptions.chart, 'background', '#555')
      this.$set(this.chartSettings.chartOptions.grid, 'borderColor', '#000')
      this.$set(this.chartSettings.chartOptions.xaxis.axisBorder, 'color', '#000')
      this.$set(this.chartSettings.chartOptions.xaxis.labels.style, 'colors', ['#aaa', '#aaa', '#aaa', '#aaa', '#aaa', '#aaa', '#aaa'])
      this.$set(this.chartSettings.chartOptions.yaxis.labels.style, 'color', '#aaa')
      return _cloneDeepWith(this.chartSettings)
    },
  },

  created() {
    this.getUserList()
  },

  methods: {
    async getUserList() {
      const { code, data } = await getUserList()
      if (code === 2000) {
        this.userList = data.user_list
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
