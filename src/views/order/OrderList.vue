<template>
  <div>
    <!-- 统计表格 -->
    <div
      v-if="charts.length > 0"
      class="grid pt-3 pb-6"
    >
      <div
        class="bg-semi radius base-shadow overflow-hidden"
        v-for="(it, i) in charts"
        :key="i"
      >
        <area-chart
          :statistic="it.statistic"
          :label="it.label"
          :color="it.color"
          :options="it.options"
          :series="it.series"
        >
          <feather
            slot="icon"
            :class="it.color"
            :type="it.icon"
          ></feather>
        </area-chart>
      </div>
    </div>

    <!-- 高级搜索 -->
    <div class="bg-white rounded-lg">
    </div>

    <!-- 订单列表 -->
    <div
      id="table-loading"
      class="radius vs-con-loading__container"
    >
      <vs-table
        search
        pagination
        max-items="10"
        noDataText="暂无数据"
        :data="orderList"
      >
        <template slot="header">
          <div class="w-full flex items-center p-4">
            <div class="text-xl text-primary font-semibold">订单列表</div>
            <div class="ml-auto mr-4 text-sm text-semi">
              共查询到 {{ pagination.total }} 条数据
            </div>
            <div class="">
              <el-date-picker
                type="daterange"
                align="right"
                unlink-panels
                v-model="date"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="onDateChange"
              ></el-date-picker>
            </div>
          </div>
        </template>
        <template slot="thead">
          <vs-th>商品名称</vs-th>
          <vs-th>买家</vs-th>
          <vs-th>卖家</vs-th>
          <vs-th>总价</vs-th>
          <vs-th>创建时间</vs-th>
          <vs-th>支付方式</vs-th>
          <vs-th>状态</vs-th>
          <vs-th></vs-th>
        </template>

        <template slot-scope="{data}">
          <template v-for="tr in data">
            <template v-for="sub in tr.sub_order">
              <vs-tr
                v-for="td in sub.goods_list"
                :key="td._id"
                @dblclick.native="viewDetail(td._id)"
              >
                <vs-td>{{ td.goods.name }}</vs-td>
                <vs-td>
                  <span
                    class="cursor-pointer"
                    @click="$router.push({
                    path: '/user-detail',
                    query: {userId: td.goods.buyer._id},
                  })"
                  >{{ td.goods.buyer.nickname }}</span>
                </vs-td>
                <vs-td>
                  <span
                    class="primary cursor-pointer"
                    @click="$router.push({
                    path: '/user-detail',
                    query: {userId: td.goods.seller._id},
                  })"
                  >@{{ td.goods.seller.nickname }}</span>
                </vs-td>
                <vs-td class="font-bold">
                  ￥{{ Number(td.goods.price).toFixed(2) }}
                </vs-td>
                <vs-td :title="$dayjs(td.goods.created_at).format('YYYY/MM/DD HH:mm:ss')">
                  {{ $timeDiff(td.goods.created_at) }}
                </vs-td>
                <vs-td class="font-bold">{{ payments[tr.payment] }}</vs-td>
                <vs-td>
                  <vs-chip
                    :style="{background: `rgba(var(--vs-${status[sub.status].color}), 0.15)`}"
                    :class="['font-bold', status[sub.status].color]"
                  >
                    {{ status[sub.status].text }}
                  </vs-chip>
                </vs-td>
                <vs-td>
                  <vs-dropdown>
                    <i class="el-icon-more px-2 text-lg text-gray"></i>
                    <vs-dropdown-menu>
                      <vs-dropdown-item>
                        <div
                          class="w-24 text-center"
                          @click="onCopy(sub._id)"
                        >复制单号</div>
                      </vs-dropdown-item>
                      <vs-dropdown-item>
                        <div
                          class="w-24 text-center"
                          @click="viewDetail(sub._id)"
                        >查看详情</div>
                      </vs-dropdown-item>
                      <vs-dropdown-item divider>
                        <div
                          class="w-24 danger text-center"
                          @click="deleteOrder(tr._id)"
                        >删除订单</div>
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </vs-td>
              </vs-tr>
            </template>
          </template>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import AreaChart from '@/components/AreaChart.vue'
import { areaChartOptions } from '@/utils/util'

import {
  getOrderList,
  getOrderListByDateRange,
  getOrderTransactionAmount,
  getOrderVolume,
  getOrderNum,
} from '@/request/api/order'

const gridCharts = [
  {
    statistic: 3200, label: '交易额', color: 'primary', icon: 'dollar-sign',
  },
  {
    statistic: 800, label: '成交量', color: 'warning', icon: 'check-circle',
  },
  {
    statistic: 1900, label: '订单数', color: 'success', icon: 'bar-chart-2',
  },
]
const payments = {
  huabei: '余额支付',
  weixin: '微信支付',
  zhifubao: '支付宝支付',
  yinlian: '银行卡支付',
}
const status = {
  1: { text: '进行中', color: 'primary' },
  2: { text: '已完成', color: 'success' },
  3: { text: '派送中', color: 'warning' },
  4: { text: '已取消', color: 'danger' },
}
const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    },
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    },
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    },
  }],
}
export default {
  name: 'OrderList',
  components: { AreaChart },

  data: () => ({
    status,
    payments,
    pickerOptions,

    charts: [], // 卡片统计
    date: [], // 日期范围
    orderList: [], // 订单列表
    pagination: {}, // 分页信息
    searchText: '',
  }),

  mounted() {
    this.initCharts()
    this.getOrderList()
  },

  methods: {
    async initCharts() {
      const colors = ['#6165f7', '#FF9F43', '#5DC76F']
      const res = await Promise.all(
        [getOrderTransactionAmount(), getOrderVolume(), getOrderNum()],
      )
      this.charts = gridCharts.map((el, i) => {
        const options = this.$cloneDeepWith(areaChartOptions)
        options.colors = [colors[i]]
        return Object.assign(el, { options }, { series: [res[i].data] })
      })
    },

    async getOrderList() {
      this.$vs.loading({
        type: 'point',
        container: '#table-loading',
        scale: 1,
      })

      try {
        const { code, data } = await getOrderList({
          page: 1,
          page_size: 100,
        })
        if (code === 2000) {
          this.orderList = data.order_list
          this.pagination = data.pagination
        }
      } finally {
        this.$vs.loading.close('#table-loading > .con-vs-loading')
      }
    },

    onSearch() {
      this.getOrderList()
    },

    // 按日期获取商品
    async onDateChange(date) {
      this.$vs.loading({
        type: 'point',
        container: '#table-loading',
        scale: 1,
      })
      if (date) {
        try {
          const date_range = date.map(el => this.$dayjs(el).format('YYYY-MM-DD'))
          const { code, data } = await getOrderListByDateRange({
            date_range,
            page: 1,
            page_size: 100,
          })
          if (code === 2000) {
            this.orderList = data.order_list
            this.pagination = data.pagination
          }
        } finally {
          this.$vs.loading.close('#table-loading > .con-vs-loading')
        }
      } else {
        this.getOrderList()
      }
    },

    // 查看商品详情
    viewDetail(id) {
      this.$router.push({
        path: '/order-detail',
        query: { orderId: id },
      })
    },

    deleteOrder(id) {
      this.orderList.forEach((el, i, _) => {
        if (el._id === id) {
          _.splice(i, 1)
        }
      })
    },

    onCopy(id) {
      this.$copyText(id).then(() => {
        this.$message(`已复制订单编号：${id}  🎉`)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
}
</style>
