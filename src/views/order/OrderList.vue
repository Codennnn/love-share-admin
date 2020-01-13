<template>
  <div>
    <!-- 统计表格 -->
    <div
      v-if="initFinished"
      class="pt-3 pb-6 flex"
    >
      <div class="w-1/3 pr-3">
        <div class="bg-semi radius base-shadow overflow-hidden">
          <area-chart
            statistic="9K"
            label="交易额"
            icon="el-icon-coin"
            color="primary"
            type="area"
            :chartData="chartData1"
          ></area-chart>
        </div>
      </div>
      <div class="w-1/3 px-2">
        <div class="bg-semi radius base-shadow overflow-hidden">
          <area-chart
            statistic="9K"
            label="成交量"
            icon="el-icon-finished"
            color="warning"
            type="area"
            :chartData="chartData2"
          ></area-chart>
        </div>
      </div>
      <div class="w-1/3 pl-3">
        <div class="bg-semi radius base-shadow overflow-hidden">
          <area-chart
            statistic="9K"
            label="订单数"
            icon="el-icon-collection"
            color="success"
            type="area"
            :chartData="chartData3"
          ></area-chart>
        </div>
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
            <div class="ml-auto">
              <el-date-picker
                v-model="date"
                type="daterange"
                align="right"
                unlink-panels
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
          <template v-for="(item) in data">
            <vs-tr
              v-for="(tr, i) in item.goods_list"
              :key="i"
              @dblclick.native="viewDetail(tr._id)"
            >
              <vs-td>{{ tr.goods.name }}</vs-td>
              <vs-td :title="`ID: ${tr.goods.buyer._id}`">{{ tr.goods.buyer.nickname }}</vs-td>
              <vs-td :title="`ID: ${tr.goods.seller._id}`">{{ tr.goods.seller.nickname }}</vs-td>
              <vs-td class="font-bold">
                ￥{{ Number(tr.goods.price).toFixed(2) }}
              </vs-td>
              <vs-td :title="$dayjs(tr.goods.created_at).format('YYYY/MM/DD HH:mm:ss')">
                {{ timeDiff(tr.goods.created_at) }}
              </vs-td>
              <vs-td class="font-bold">{{ payments[item.payment] }}</vs-td>
              <vs-td>
                <vs-chip
                  :style="{background: `rgba(var(--vs-${status[item.status].color}), 0.2)`}"
                  :class="['font-bold', status[item.status].color]"
                >
                  {{ status[item.status].text }}
                </vs-chip>
              </vs-td>

              <vs-td>
                <vs-dropdown>
                  <i class="el-icon-more px-2 text-lg text-gray"></i>
                  <vs-dropdown-menu>
                    <vs-dropdown-item>
                      <div
                        class="w-24 text-center"
                        @click="onCopy(tr._id)"
                      >复制单号</div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        class="w-24 text-center"
                        @click="viewDetail(tr._id)"
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
      </vs-table>
    </div>
  </div>
</template>

<script>
import _cloneDeepWith from 'lodash/cloneDeepWith'
import AreaChart from '@/components/AreaChart.vue'

import {
  getOrderList,
  getOrderTransactionAmount,
  getOrderVolume,
  getOrderNum,
} from '@/request/api/order'
import { timeDiff, areaChartOptions } from '@/utils/util'

export default {
  name: 'OrderList',
  components: { AreaChart },

  data: () => ({
    timeDiff,
    initFinished: false,
    chartData1: {},
    chartData2: {},
    chartData3: {},
    orderList: [], // 订单列表
    selected: [], // 列表选中的行
    searchText: '',
    date: null, // 搜索日期
    pickerOptions: {
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
    },
    payments: {
      huabei: '余额支付',
      weixin: '微信支付',
      zhifubao: '支付宝支付',
      yinlian: '银行卡支付',
    },
    status: {
      1: {
        text: '已付款',
        color: 'success',
      },
      2: {
        text: '待付款',
        color: 'warning',
      },
      3: {
        text: '支付失败',
        color: 'danger',
      },
    },
  }),

  mounted() {
    this.initCharts()
    this.getOrderList()
  },

  methods: {
    async initCharts() {
      const [data1, data2, data3] = await Promise.all(
        [getOrderTransactionAmount(), getOrderVolume(), getOrderNum()],
      )
      const options1 = _cloneDeepWith(areaChartOptions)
      const options2 = _cloneDeepWith(areaChartOptions)
      const options3 = _cloneDeepWith(areaChartOptions)
      options1.colors = ['#6165f7']
      options2.colors = ['#FF9F43']
      options3.colors = ['#5DC76F']
      this.chartData1 = { series: [data1.data], chartOptions: options1 }
      this.chartData2 = { series: [data2.data], chartOptions: options2 }
      this.chartData3 = { series: [data3.data], chartOptions: options3 }
      this.initFinished = true
    },

    async getOrderList() {
      if (this.tableLoading) return

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
        }
      } catch {
        // TODO
      }

      this.$vs.loading.close('#table-loading > .con-vs-loading')
    },

    onSearch() {
      this.getOrderList()
    },

    // 按日期获取商品
    onDateChange(date) {
      console.log(date)
      this.getOrders()
    },

    // 查看商品详情
    viewDetail(id) {
      this.$router.push({
        path: '/order-detail',
        query: { orderID: id },
      })
    },

    deleteOrder(id) {
      this.orderList.forEach((el, i, _) => {
        if (el.order_id === id) {
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
</style>
