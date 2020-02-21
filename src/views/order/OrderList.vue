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
        pagination
        noDataText="暂无数据"
        :max-items="10"
        :data="orderList"
      >
        <template slot="header">
          <div class="w-full flex flex-wrap items-center p-4">
            <div class="text-xl text-primary font-semibold">订单列表</div>
            <div class="ml-auto mr-4 text-sm text-semi">
              共查询到 {{ pagination.total }} 个订单, {{ totalGoodsNum }} 个商品
            </div>
            <el-date-picker
              unlink-panels
              type="daterange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="date"
              :picker-options="pickerOptions"
              @change="onDateChange"
            ></el-date-picker>
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
          <template v-for="order in data">
            <template v-for="sub in order.sub_order">
              <template v-for="td in sub.goods_list">
                <vs-tr
                  v-if="td.goods"
                  :key="td._id"
                  @dblclick.native="viewOrderDetail(order._id, sub._id)"
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
                    ￥{{ $numFixed(td.goods.price) }}
                  </vs-td>
                  <vs-td :title="$dayjs(td.goods.created_at).format('YYYY/MM/DD HH:mm:ss')">
                    {{ $timeDiff(td.goods.created_at) }}
                  </vs-td>
                  <vs-td class="font-bold">{{ payments[order.payment] }}</vs-td>
                  <vs-td>
                    <vs-chip
                      :style="{background: `rgba(var(--vs-${status[sub.status].color}), 0.12)`}"
                      :class="status[sub.status].color"
                    >
                      {{ status[sub.status].text }}
                    </vs-chip>
                  </vs-td>
                  <vs-td>
                    <el-dropdown>
                      <i class="el-icon-more px-2 text-lg text-gray"></i>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="onCopy(sub._id)">
                          复制单号
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="viewOrderDetail(order._id, sub._id)">
                          查看详情
                        </el-dropdown-item>
                        <el-dropdown-item
                          divider
                          class="danger"
                          @click.native="deleteOrder(order._id)"
                        >
                          删除订单
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </vs-td>
                </vs-tr>
              </template>
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

// 模拟
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

  computed: {
    // 获取所有订单中包含的商品个数
    totalGoodsNum() {
      return this.orderList.reduce((total, or) => total + or.sub_order.reduce((all, sub) => all + sub.goods_list.filter(li => li.goods).length, 0), 0)
    },
  },

  activated() {
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
    viewOrderDetail(orderId, subId) {
      this.$router.push({
        path: '/order-detail',
        query: { orderId, subId },
      })
    },

    // 伪删除订单
    deleteOrder(id) {
      this.orderList.forEach((el, i, _) => {
        if (el._id === id) {
          _.splice(i, 1)
        }
      })
    },

    // 复制订单号
    onCopy(id) {
      this.$copyText(id).then(() => {
        this.$message(`已复制订单号：${id}  🎉`)
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
