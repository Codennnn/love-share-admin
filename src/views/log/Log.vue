<template>
  <div class="pt-6">
    <vs-button
      @click="deleteLog()"
      color="danger"
    >清空日志</vs-button>
    <vs-table
      class="px-2 pb-4 radius overflow-hidden"
      pagination
      max-items="15"
      noDataText="暂无数据"
      :data="logList"
    >
      <template slot="thead">
        <vs-th>错误信息</vs-th>
        <vs-th>所在组件</vs-th>
        <vs-th>路由</vs-th>
        <vs-th>摘要</vs-th>
        <vs-th>发生于</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          v-for="tr in data"
          :key="tr._id"
        >
          <vs-td>
            <div
              :title="JSON.stringify(tr.err)"
              class="text-overflow-clip"
            >
              {{ tr.err }}
            </div>
          </vs-td>
          <vs-td>{{ tr.detail.component_name }}</vs-td>
          <vs-td>{{ tr.detail.route }}</vs-td>
          <vs-td>{{ tr.info }}</vs-td>
          <vs-td>{{ $timeDiff(tr.created_at) }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { getLogList, deleteLog } from '@/request/api/log'

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

    async deleteLog() {
      const log_id_list = this.logList.map(el => el._id)
      const { code } = await deleteLog({ log_id_list })
      if (code === 2000) {
        this.getLogList()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.text-overflow-clip {
  @include textOverflow($width: 12rem, $line: 3);
}
</style>
