<template>
  <div>
    <div class="flex items-start">
      <!-- 左侧 -->
      <div
        class="pr-8"
        style="width: 75%;"
      >
        <div class="mb-8 p-5 radius bg-gray">
          <table class="w-full">
            <tr>
              <td class="label text-primary">微 信</td>
              <td class="value text-gray">{{ detail.wechat }}</td>
              <td class="label text-primary">邮 箱</td>
              <td class="value text-gray">{{ detail.email || '未填写' }}</td>
            </tr>
            <tr>
              <td class="label text-primary">Q Q</td>
              <td class="value text-gray">{{ detail.qq }}</td>
              <td class="label text-primary">电 话</td>
              <td class="value text-gray">{{ detail.phone }}</td>
            </tr>
            <tr>
              <td class="label text-primary">真实姓名</td>
              <td class="value text-gray">{{ detail.real_name }}</td>
              <td class="label text-primary">性 别</td>
              <td class="value text-gray">{{ detail.gender === '0' ? '女' : '男' }}</td>
            </tr>
            <tr>
              <td class="label text-primary">个人简介</td>
              <td class="value text-gray">{{ detail.introduction || '未填写' }}
              </td>
            </tr>
          </table>
        </div>

        <HeatmapChart
          :settings="chartSettings"
          :series="series"
        />

        <div class="">
          <vs-table
            class="radius"
            search
            pagination
            noDataText="暂无数据"
            :max-items="5"
            :data="detail.published_goods || []"
          >
            <template slot="header">
              <div class="w-full flex items-center p-4">
                <div class="text-xl text-primary font-semibold">发布的商品</div>
              </div>
            </template>
            <template slot="thead">
              <vs-th>商品名称</vs-th>
              <vs-th>商品名称</vs-th>
              <vs-th>价格</vs-th>
              <vs-th>创建时间</vs-th>
              <vs-th>最后修改</vs-th>
              <vs-th>状态</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr
                v-for="(tr, i) in data"
                :key="i"
              >
                <vs-td>
                  <vs-image
                    class="w-24 h-24 base-shadow"
                    :src="`${tr.img_list[0]}?imageView2/2/w/100`"
                  ></vs-image>
                </vs-td>
                <vs-td>{{ tr.name }}</vs-td>
                <vs-td class="font-bold">
                  ￥{{ Number(tr.price).toFixed(2) }}
                </vs-td>
                <vs-td>
                  {{ $dayjs(tr.created_at).format('YYYY/MM/DD') }}
                </vs-td>
                <vs-td>
                  {{ $dayjs(tr.updated_at).format('YYYY/MM/DD') }}
                </vs-td>
                <vs-td>
                  <div
                    class="w-16 py-1 px-2 text-center whitespace-no-wrap"
                    style="border-radius: 0.4rem;"
                    :class="status[tr.status].color"
                    :style="`background: rgba(var(--vs-${status[tr.status].color}), 0.2);`"
                  >{{ status[tr.status].text }}</div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>

      <!-- 右侧 -->
      <div
        class="py-10 px-6 flex flex-col items-center radius bg-gray"
        style="width: 25%;"
      >
        <div
          class="relative"
          style="width: 100px;"
        >
          <div :title="`信用度：${detail.credit_value}`">
            <SvgCircle
              :progress="detail.credit_value / 1000"
              :progressOption="options"
            />
          </div>
          <vs-avatar
            class="absolute m-0"
            style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
            size="80px"
            :src="detail.avatar_url"
          />
        </div>
        <div class="mt-4 mb-1 text-primary font-bold">{{ detail.nickname }}</div>
        <div
          v-if="detail.school"
          class="text-semi text-sm"
        >{{ detail.school.name }}</div>
        <div class="w-full my-6 flex">
          <div
            title="粉丝"
            class="py-2 flex-1 flex flex-col items-center border-primary"
            style="border-width: 0 1px 0 0; border-style: solid;"
          >
            <div
              class="w-10 h-10 mb-1 flex justify-center items-center rounded-full"
              style="background: rgba(var(--vs-primary), 0.2);"
            >
              <i class="el-icon-user primary"></i>
            </div>
            <p class="font-bold text-primary">{{ detail.fans_num }}</p>
          </div>
          <div
            title="关注的人"
            class="py-2 flex-1 flex flex-col items-center"
          >
            <div
              class="w-10 h-10 mb-1 flex justify-center items-center rounded-full"
              style="background: rgba(var(--vs-warning), 0.2);"
            >
              <i class="el-icon-view warning"></i>
            </div>
            <p class="font-bold text-primary">{{ detail.follow_num }}</p>
          </div>
        </div>
        <p class="mb-1 self-start text-primary text-sm">信用度</p>
        <vs-progress
          class="mb-4"
          :title="detail.credit_value"
          :percent="detail.credit_value / 1000 * 100"
        ></vs-progress>
        <p class="mb-1 self-start text-primary text-sm">乐享值</p>
        <vs-progress
          :title="detail.share_value"
          :percent="detail.share_value / 1000 * 100"
        ></vs-progress>
        <el-popover
          class="w-full text-center"
          placement="top"
          width="220"
          trigger="click"
        >
          <div>
            <div class="my-3 px-4 py-2 flex justify-between items-center rounded-lg bg-gray-100">
              <div class="text-center">
                <i class="el-icon-money text-3xl text-gray-600"></i>
                <div class="text-gray-600 text-sm">余 额</div>
              </div>
              <div class="text-xl font-bold">{{ detail.beans }}</div>
            </div>
            <div class="mb-3 px-4 py-2 flex justify-between items-center rounded-lg bg-gray-100">
              <div class="text-center">
                <i class="el-icon-cherry text-3xl text-gray-600"></i>
                <div class="text-gray-600 text-sm">乐 豆</div>
              </div>
              <div class="text-xl font-bold">{{ detail.beans }}</div>
            </div>
            <div class="mb-3 px-4 py-2 flex justify-between items-center rounded-lg bg-gray-100">
              <div class="-ml-1 text-center">
                <i class="el-icon-cherry text-3xl text-gray-600"></i>
                <div class="text-gray-600 text-sm">优惠券</div>
              </div>
              <div class="text-xl font-bold">{{ detail.beans }}</div>
            </div>
          </div>
          <vs-button
            slot="reference"
            class="w-3/4 mt-8"
          >账号安全</vs-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import SvgCircle from '@/components/SvgCircle.vue'
import HeatmapChart from '@/components/LineChart.vue'

import { getUserDetailByAdmin } from '@/request/api/user'

const status = {
  1: {
    color: 'warning',
    text: '待出售',
  },
  2: {
    color: 'primary',
    text: '已出售',
  },
  3: {
    color: 'danger',
    text: '已下架',
  },
}
const chartSettings = {
  type: 'heatmap',
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
  name: 'UserDetail',
  components: { SvgCircle, HeatmapChart },

  data: () => ({
    status,
    chartSettings,
    detail: {},
    option: {
      radius: 50, strokeWidth: 2, startColor: [157, 161, 248], endColor: [97, 101, 247],
    },
    series: [{
      name: 'Metric1',
      data: [1, 2, 3],
    }],
    chartOptions: {
      chart: {
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#008FFB'],
      title: {
        text: 'HeatMap Chart (Single color)',
      },
    },
  }),

  computed: {
    options() {
      const theme = this.$store.state.themeStyle
      if (theme === 'light') {
        return { ...this.option, backColor: '#ddd' }
      }
      return { ...this.option, backColor: '#555' }
    },
  },

  mounted() {
    this.getUserDetailByAdmin(this.$route.query.userId)
  },

  methods: {
    async getUserDetailByAdmin(user_id) {
      try {
        const { code, data } = await getUserDetailByAdmin({ user_id })
        if (code === 2000) {
          this.detail = data.user_detail
        }
      } catch {
        // TODO
      }
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  .label {
    min-width: 80px;
  }
  .value {
    font-size: 0.9rem;
  }
}
</style>
