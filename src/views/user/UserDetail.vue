<template>
  <div>
    <div class="flex items-start">
      <!-- 左侧 -->
      <div
        class="pr-8"
        style="width: 75%;"
      >
        <div class="mb-6 p-5 radius bg-gray">
          <table class="info-table w-full">
            <tr>
              <td>微 信</td>
              <td>{{ detail.wechat || '未填写' }}</td>
              <td>邮 箱</td>
              <td>{{ detail.email || '未填写' }}</td>
            </tr>
            <tr>
              <td>Q Q</td>
              <td>{{ detail.qq || '未填写' }}</td>
              <td>电 话</td>
              <td>{{ detail.phone }}</td>
            </tr>
            <tr>
              <td>真实姓名</td>
              <td>{{ detail.real_name }}</td>
              <td>性 别</td>
              <td>{{ detail.gender === '0' ? '女' : '男' }}</td>
            </tr>
            <tr>
              <td>个人简介</td>
              <td>{{ detail.introduction || '未填写' }}
              </td>
            </tr>
          </table>
        </div>

        <div class="flex">
          <div class="w-1/4">
            <div class="mb-3 px-4 py-2 flex justify-between items-center rounded-lg bg-gray">
              <div class="flex-col-center">
                <feather
                  class="mb-1 text-gray"
                  type="dollar-sign"
                ></feather>
                <div class="text-gray text-sm">余 额</div>
              </div>
              <div class="text-semi text-xl font-bold">
                {{ detail.beans ? $numFixed(detail.beans) : 0.00 }}
              </div>
            </div>
            <div class="mb-3 px-4 py-2 flex justify-between items-center rounded-lg bg-gray">
              <div class="flex-col-center">
                <i class="el-icon-cherry text-3xl text-gray"></i>
                <div class="text-gray text-sm">乐 豆</div>
              </div>
              <div class="text-semi text-xl font-bold">{{ detail.beans || 0 }}</div>
            </div>
            <div class="mb-3 px-4 py-2 flex justify-between items-center rounded-lg bg-gray">
              <div class="-ml-1 flex-col-center">
                <feather
                  class="mb-1 text-gray"
                  type="archive"
                ></feather>
                <div class="text-gray text-sm">优惠券</div>
              </div>
              <div class="text-semi text-xl font-bold">{{ detail.beans || 0  }}</div>
            </div>
          </div>

          <div class="w-3/4 pl-6">
            <p class="text-primary text-xl font-bold">签到表</p>
            <p class="text-gray text-sm">已累计签到 {{ '13' }} 天</p>
            <vue-apex-charts
              type="heatmap"
              :width="450"
              :height="200"
              :options="heatmapOptions"
              :series="series"
            ></vue-apex-charts>
          </div>
        </div>

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
                  ￥{{ $numFixed(tr.price) }}
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
        class="pt-5 pb-10 px-6 flex flex-col items-center radius bg-gray"
        style="width: 25%;"
      >
        <!-- 头像 -->
        <div
          class="relative"
          style="width: 190px;"
        >
          <vue-apex-charts
            type="radialBar"
            width="100%"
            :options="radialBarOptions"
            :series="radialBarValue"
          ></vue-apex-charts>
          <vs-avatar
            class="absolute m-0"
            style="top: 50%; left: 50%; transform: translate(-50%, -65%);"
            size="80px"
            :src="detail.avatar_url"
          />
        </div>

        <div class="mb-1 text-primary font-bold">{{ detail.nickname }}</div>
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
              class="w-12 h-12 mb-1 flex-row-center rounded-full"
              style="background: rgba(var(--vs-primary), 0.15);"
            >
              <feather
                class="primary"
                size="22"
                type="user-check"
              ></feather>
            </div>
            <p class="font-bold text-primary">{{ detail.fans_num }}</p>
          </div>
          <div
            title="关注的人"
            class="py-2 flex-1 flex flex-col items-center"
          >
            <div
              class="w-12 h-12 mb-1 flex-row-center rounded-full"
              style="background: rgba(var(--vs-warning), 0.15);"
            >
              <feather
                class="warning"
                size="22"
                type="eye"
              ></feather>
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
        <vs-button
          slot="reference"
          class="w-3/4 mt-8"
        >账号安全</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

import { getUserDetailByAdmin } from '@/request/api/user'

const status = {
  1: { color: 'warning', text: '待出售' },
  2: { color: 'primary', text: '已出售' },
  3: { color: 'danger', text: '已下架' },
}
const series = [
  {
    name: 'Metric1',
    data: [1, 1, 1, 5, 1, 5, 5, 1, 1],
  }, {
    name: 'Metric2',
    data: [1, 1, 1, 5, 1, 5, 1, 1, 5],
  }, {
    name: 'Metric3',
    data: [1, 1, 1, 5, 5, 1, 5, 1, 5],
  }, {
    name: 'Metric4',
    data: [1, 1, 1, 5, 5, 1, 1, 5, 1],
  },
]
const heatmapOptions = {
  chart: {
    offsetX: -20,
    offsetY: -12,
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    axisBorder: { show: false },
    tooltip: { enabled: false },
    labels: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  plotOptions: {
    heatmap: {
      radius: 4,
      colorScale: {
        min: 1,
        max: 10,
      },
    },
  },
  colors: ['#6165f7'],
}
const radialBarOptions = {
  tooltip: {
    enabled: true,
    fillSeriesColor: false,
    theme: 'dark',
    y: {
      formatter: v => v * 10,
      title: 'Size: ',
    },
  },
  labels: ['信用度'],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 15,
        size: '70%',
        background: 'transparent',
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 1,
        },
      },
      track: {
        background: '#ddd',
      },
      dataLabels: { show: false },
    },
  },
  stroke: { lineCap: 'round' },
  colors: ['#6165f7'],
}
export default {
  name: 'UserDetail',
  components: { VueApexCharts },

  data: () => ({
    status,
    series,
    heatmapOptions,
    radialBarOptions,

    detail: {},
  }),

  computed: {
    radialBarValue() {
      const percent = (this.detail.credit_value / 1000 * 100) || 0
      return [percent]
    },
  },

  mounted() {
    this.getUserDetailByAdmin(this.$route.query.userId)
  },

  methods: {
    async getUserDetailByAdmin(user_id) {
      const { code, data } = await getUserDetailByAdmin({ user_id })
      if (code === 2000) {
        this.detail = data.user_detail
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@include themeify {
  .info-table {
    td:nth-child(odd) {
      color: themed("text-color-primary") !important;
    }
    td:nth-child(even) {
      color: themed("text-color-semi") !important;
    }
  }
}

.info-table {
  td:nth-child(odd) {
    width: 120px;
  }
  td:nth-child(even) {
    width: 180px;
    font-size: 0.9rem;
  }
}
</style>
