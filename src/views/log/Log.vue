<template>
  <div>
    <vs-table
      search
      pagination
      max-items="10"
      noDataText="暂无数据"
      :data="logList"
    >
      <template slot="thead">
        <vs-th>商品名称</vs-th>
        <vs-th>买家</vs-th>
        <vs-th>卖家</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          v-for="tr in data"
          :key="tr._id"
        >
          <vs-td>{{ tr.err }}</vs-td>
          <vs-td>{{ tr.detail }}</vs-td>
          <vs-td>{{ tr.info }}</vs-td>
          <vs-td>{{ $timeDiff(tr.created_at) }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { getLogList } from '@/request/api/log'

export default {
  name: 'Log',
  data: () => ({
    logList: [],
  }),
  created() {
    this.getLogList()
  },

  methods: {
    async getLogList() {
      const { code, data: { log_list } } = await getLogList()
      if (code === 2000) {
        this.logList = log_list
      }
    },
  },
}
</script>
