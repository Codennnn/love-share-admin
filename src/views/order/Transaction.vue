<template>
  <div>
    <div
      id="table-loading"
      class="radius vs-con-loading__container"
    >
      <vs-table
        pagination
        noDataText="暂无数据"
        :max-items="15"
        :data="recordList"
      >
        <template slot="header">
          <div class="w-full flex flex-wrap items-center p-4">
            <div class="text-xl text-primary font-semibold">交易记录</div>
          </div>
        </template>
        <template slot="thead">
          <vs-th>单号</vs-th>
          <vs-th>账号</vs-th>
          <vs-th>金额</vs-th>
          <vs-th>支付方式</vs-th>
          <vs-th>状态</vs-th>
          <vs-th>创建时间</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr
            v-for="(tr, i) in data"
            :key="i"
          >
            <vs-td>{{ tr._id }}</vs-td>
            <vs-td>{{ tr.seller.nickname }}</vs-td>
            <vs-td class="font-bold">
              ￥{{ $numFixed(tr.amount) }}
            </vs-td>
            <vs-td>{{ payments[tr.payment] }}</vs-td>
            <vs-td>
              <div :class="status[tr.status].color">{{ status[tr.status].text }}</div>
            </vs-td>
            <vs-td>
              {{ $dayjs(tr.created_at).format('YYYY-MM-DD HH:mm:ss') }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
const payments = {
  1: '余额支付',
  2: '微信支付',
  3: '支付宝支付',
  4: '银行卡支付',
}
const status = {
  1: { color: 'success', text: '支付成功' },
  2: { color: 'warning', text: '待支付' },
  3: { color: 'danger', text: '取消支付' },
}
export default {
  name: 'Transaction',

  data: () => ({
    payments,
    status,
    recordList: [],
  }),

  created() {
    // 模拟
    const record = []
    const data = [
      {
        _id: '1257896452453',
        payment: 1,
        amount: 58,
        status: 1,
        created_at: 1657896452453,
        seller: {
          nickname: '刘德华',
        },
      },
      {
        _id: '1975466452453',
        payment: 2,
        amount: 69,
        status: 1,
        created_at: 1657896452783,
        seller: {
          nickname: '张学友',
        },
      },
      {
        _id: '1975465647353',
        payment: 3,
        amount: 99,
        status: 2,
        created_at: 1657897862783,
        seller: {
          nickname: '郭富城',
        },
      },
      {
        _id: '1145685647353',
        payment: 3,
        amount: 104,
        status: 3,
        created_at: 16572297862783,
        seller: {
          nickname: '黎明',
        },
      },
    ]
    Array.from({ length: 10 }).forEach(() => {
      record.push(...data)
    })
    this.recordList = record
  },

  methods: {},
}
</script>
